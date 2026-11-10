#!/usr/bin/env python3
"""Build a native, editable PPTX from the read-only browser layout export.

Usage: python scripts/generate_powerpoint.py /tmp/pptx-review/layout.json
No HTML, CSS, JavaScript, or original assets are written by this program.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import math
import re
from pathlib import Path
from zipfile import ZipFile
from collections import Counter
from lxml import etree
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR
from pptx.enum.text import MSO_AUTO_SIZE, MSO_ANCHOR, PP_ALIGN
from pptx.oxml.xmlchemy import OxmlElement
from pptx.util import Inches, Pt
from svgpathtools import parse_path

ROOT = Path(__file__).resolve().parent.parent
EMU = 914400 / 108  # 1440 CSS px = 13 1/3 inches
FONT_SCALE = 72 / 108
BG = '101C30'
CYAN = '59D8EB'

def units(px):
    return round(float(px) * EMU)

def color(value):
    if isinstance(value, str) and re.fullmatch(r'[0-9a-fA-F]{6}', value):
        return value.upper(), 1.0
    nums = re.findall(r'[\d.]+', value or '')
    if len(nums) < 3:
        return BG, 0.0
    return ''.join(f'{round(float(v)):02X}' for v in nums[:3]), float(nums[3]) if len(nums)>3 else 1.0

def fill_color(fill, value):
    rgb, alpha = color(value)
    if alpha == 0:
        fill.background()
        return
    fill.solid(); fill.fore_color.rgb = RGBColor.from_string(rgb)
    if alpha < 1:
        node=fill._xPr.find('.//{http://schemas.openxmlformats.org/drawingml/2006/main}srgbClr')
        a=OxmlElement('a:alpha');a.set('val', str(round(alpha*100000)));node.append(a)

def line_color(line, value, width=1):
    fill_color(line.fill,value);line.width=units(width)

def rect_shape(slide, r, fill=None, border=None, radius=0, name='Panel'):
    shape=slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE,
                                 units(r['x']),units(r['y']),units(r['w']),units(r['h']))
    shape.name=name
    if radius:
        shape.adjustments[0]=min(.45, radius/max(1,min(r['w'],r['h'])))
    if fill:fill_color(shape.fill,fill)
    else:shape.fill.background()
    if border:line_color(shape.line,border[0],border[1])
    else:shape.line.fill.background()
    return shape

def connector(slide,x1,y1,x2,y2,c=CYAN,width=1,head=False,tail=False,name='Conector editable'):
    if abs(x2-x1)+abs(y2-y1)<.01:return
    sh=slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT,units(x1),units(y1),units(x2),units(y2));sh.name=name
    line_color(sh.line,c,width)
    for tag,enabled in [('tailEnd',head),('headEnd',tail)]:
        if enabled:
            el=OxmlElement('a:'+tag);el.set('type','arrow');el.set('w','sm');el.set('len','sm');sh.line._get_or_add_ln().append(el)
    return sh

def font_name(css):
    return 'Courier New' if any(x in css for x in ['Consolas','Courier','monospace']) else 'Arial'

def style_run(run, style):
    run.font.name=font_name(style.get('fontFamily',''))
    run.font.size=Pt(style['fontSize']*FONT_SCALE)
    run.font.bold=int(style.get('fontWeight',400))>=600
    run.font.italic=style.get('fontStyle')=='italic'
    run.font.color.rgb=RGBColor.from_string(color(style['color'])[0])
    rpr=run._r.get_or_add_rPr()
    rpr.set('lang','es-HN')
    rpr.set('spc',str(round(style.get('letterSpacing',0)*FONT_SCALE*100)))
    # Avoid PowerPoint's default character-spacing compression on long titles.
    rpr.set('kern','120000')

def add_text(slide,obj):
    for n,line in enumerate(obj['lines']):
        # A textbox per visible line preserves browser wrapping while remaining editable.
        if not ''.join(r['text'] for r in line['runs']).strip():continue
        sh=slide.shapes.add_textbox(units(line['x']),units(line['y']),units(line['w']+4),units(line['h']+7))
        sh.name=f"Texto editable · {obj['role'] or obj['tag']} · línea {n+1}"
        tf=sh.text_frame;tf.clear();tf.word_wrap=False;tf.auto_size=MSO_AUTO_SIZE.NONE
        tf.margin_left=tf.margin_right=tf.margin_top=tf.margin_bottom=0
        tf.vertical_anchor=MSO_ANCHOR.TOP
        p=tf.paragraphs[0];p.space_before=p.space_after=Pt(0)
        p.line_spacing=Pt(line['h']*FONT_SCALE)
        alignment=obj['style']['textAlign']
        p.alignment=PP_ALIGN.CENTER if alignment=='center' else PP_ALIGN.LEFT
        for r in line['runs']:
            run=p.add_run();run.text=r['text'];style_run(run,r['style'])

def cell_border(cell,side,width,c):
    tcpr=cell._tc.get_or_add_tcPr();name='a:ln'+side
    ln=OxmlElement(name);ln.set('w',str(units(width)))
    if width:
        fill=OxmlElement('a:solidFill');cl=OxmlElement('a:srgbClr');cl.set('val',color(c)[0]);fill.append(cl);ln.append(fill)
    else:ln.append(OxmlElement('a:noFill'))
    # DrawingML cell borders precede fill nodes and have a fixed L/R/T/B order.
    order={'lnL':0,'lnR':1,'lnT':2,'lnB':3,'lnTlToBr':4,'lnBlToTr':5,'cell3D':6}
    rank=order['ln'+side]
    position=next((i for i,child in enumerate(tcpr) if order.get(etree.QName(child).localname,7)>rank),len(tcpr))
    tcpr.insert(position,ln)

def add_table(slide,table):
    r=table['rect'];rows=table['rows'];cols=len(rows[0]['cells'])
    shape=slide.shapes.add_table(len(rows),cols,units(r['x']),units(r['y']),units(r['w']),units(r['h']))
    shape.name='Tabla nativa editable de PowerPoint';t=shape.table
    # Remove the default theme's banding and first/last column effects.
    for attr in ['firstRow','firstCol','lastRow','lastCol','bandRow','bandCol']:t._tbl.tblPr.attrib.pop(attr,None)
    for j,c in enumerate(rows[0]['cells']):t.columns[j].width=units(c['rect']['w'])
    for i,row in enumerate(rows):
        t.rows[i].height=units(row['h'])
        for j,data in enumerate(row['cells']):
            cell=t.cell(i,j);style=data['style'];fill_color(cell.fill,style['background'])
            pt,pr,pb,pl=style['padding']
            # CSS permits a long MAC address to overflow its padding. Native tables
            # wrap it instead: preserve the font and column width, reclaim padding.
            longest=max((line['w'] for line in data['lines']),default=0)
            if longest>data['rect']['w']-pl-pr-2:
                allowance=max(2,data['rect']['w']-longest-8)
                pl=min(pl,max(1,allowance-1));pr=min(pr,max(1,allowance-pl))
            cell.margin_left=units(pl);cell.margin_right=units(pr);cell.margin_top=units(pt);cell.margin_bottom=units(pb)
            cell.vertical_anchor=MSO_ANCHOR.MIDDLE
            for side,b in zip(['T','R','B','L'],style['borders']):cell_border(cell,side,b['width'] if b['style']!='none' else 0,b['color'])
            tf=cell.text_frame;tf.clear();tf.word_wrap=False;tf.auto_size=MSO_AUTO_SIZE.NONE
            for k,line in enumerate(data['lines']):
                p=tf.paragraphs[0] if k==0 else tf.add_paragraph()
                p.space_before=p.space_after=Pt(0)
                spacing=(data['lines'][k+1]['y']-line['y']) if k+1<len(data['lines']) else (style['lineHeight'] or line['h']*1.15)
                p.line_spacing=Pt(spacing*FONT_SCALE)
                for item in line['runs']:
                    run=p.add_run();run.text=item['text'];style_run(run,item['style'])
    return shape

def add_svg(slide,obj):
    r=obj['rect'];vb=[float(x) for x in obj['viewBox'].split()];sx=r['w']/vb[2];sy=r['h']/vb[3]
    stroke=obj['style']['color'];width=float(obj['stroke'])*sx
    def coords(x,y,w,h):return {'x':r['x']+float(x)*sx,'y':r['y']+float(y)*sy,'w':float(w)*sx,'h':float(h)*sy}
    for part in obj['parts']:
        a=part['attrs'];tag=part['tag']
        if tag in ['rect','circle','ellipse']:
            if tag=='rect':
                q=coords(a.get('x',0),a.get('y',0),a['width'],a['height']);radius=float(a.get('rx',0))*sx
                rect_shape(slide,q,border=(stroke,width),radius=radius,name='Icono editable · dispositivo')
            else:
                rx=float(a.get('rx',a.get('r',0)));ry=float(a.get('ry',a.get('r',0)))
                q=coords(float(a['cx'])-rx,float(a['cy'])-ry,rx*2,ry*2)
                sh=slide.shapes.add_shape(MSO_SHAPE.OVAL,units(q['x']),units(q['y']),units(q['w']),units(q['h']));sh.fill.background();line_color(sh.line,stroke,width);sh.name='Icono editable · elipse'
        elif tag=='path':
            for sub in parse_path(a['d']).continuous_subpaths():
                points=[]
                for seg in sub:
                    samples=1 if type(seg).__name__=='Line' else 14
                    if not points:points.append(seg.start)
                    points.extend(seg.point(k/samples) for k in range(1,samples+1))
                if not points:continue
                first=points[0];builder=slide.shapes.build_freeform(units(r['x']+first.real*sx),units(r['y']+first.imag*sy),scale=1)
                builder.add_line_segments([(units(r['x']+z.real*sx),units(r['y']+z.imag*sy)) for z in points[1:]],close=sub.isclosed())
                sh=builder.convert_to_shape();sh.fill.background();line_color(sh.line,stroke,width);sh.name='Icono editable · trazado vectorial'

def add_box(slide,obj):
    r=obj['rect'];s=obj['style'];bs=s['borders'];uniform=all(b==bs[0] for b in bs)
    if s['background']!='rgba(0, 0, 0, 0)' or uniform and bs[0]['width']:
        shape=rect_shape(slide,r,s['background'],(bs[0]['color'],bs[0]['width']) if uniform and bs[0]['width'] else None,s['radius'],f"Forma editable · {obj['name']}")
        if s.get('backgroundImage','').startswith('linear-gradient'):
            colors=re.findall(r'rgba?\([^)]*\)',s['backgroundImage'])
            if len(colors)==2:
                sppr=shape._element.spPr
                for old in list(sppr):
                    if etree.QName(old).localname in ['noFill','solidFill','gradFill']:sppr.remove(old)
                grad=OxmlElement('a:gradFill');stops=OxmlElement('a:gsLst')
                for pos,value in zip(['0','100000'],colors):
                    rgb,alpha=color(value);stop=OxmlElement('a:gs');stop.set('pos',pos)
                    cl=OxmlElement('a:srgbClr');cl.set('val',rgb);opacity=OxmlElement('a:alpha');opacity.set('val',str(round(alpha*100000)));cl.append(opacity);stop.append(cl);stops.append(stop)
                grad.append(stops);lin=OxmlElement('a:lin');lin.set('ang','5400000');lin.set('scaled','1');grad.append(lin);sppr.insert(next((i for i,c in enumerate(sppr) if etree.QName(c).localname=='ln'),len(sppr)),grad)
    if not uniform:
        xy=[(r['x'],r['y'],r['x']+r['w'],r['y']),(r['x']+r['w'],r['y'],r['x']+r['w'],r['y']+r['h']),(r['x'],r['y']+r['h'],r['x']+r['w'],r['y']+r['h']),(r['x'],r['y'],r['x'],r['y']+r['h'])]
        for b,points in zip(bs,xy):
            if b['width'] and b['style']!='none':connector(slide,*points,b['color'],b['width'],name='Borde editable')

def background(slide,cover=False):
    slide.background.fill.solid();slide.background.fill.fore_color.rgb=RGBColor.from_string(BG)
    sh=rect_shape(slide,{'x':0,'y':0,'w':1440,'h':810},name='Fondo tecnológico · gradiente nativo')
    # An editable radial gradient approximates the CSS radial background.
    sppr=sh._element.spPr
    for old in list(sppr):
        if etree.QName(old).localname in ['noFill','solidFill','gradFill','blipFill','pattFill','grpFill']:sppr.remove(old)
    grad=OxmlElement('a:gradFill');gslist=OxmlElement('a:gsLst')
    for pos,c in [('0','17283F'),('100000','101C30')]:
        gs=OxmlElement('a:gs');gs.set('pos',pos);cl=OxmlElement('a:srgbClr');cl.set('val',c);gs.append(cl);gslist.append(gs)
    grad.append(gslist)
    radial=OxmlElement('a:path');radial.set('path','circle');center=OxmlElement('a:fillToRect')
    for key,value in ({'l':'95000','t':'45000','r':'5000','b':'55000'} if cover else {'l':'100000','t':'0','r':'0','b':'100000'}).items():center.set(key,value)
    radial.append(center);grad.append(radial);sppr.insert(next((i for i,c in enumerate(sppr) if etree.QName(c).localname=='ln'),len(sppr)),grad)
    if cover:
        connector(slide,1000,0,900,130,'36556C');connector(slide,900,130,1410,130,'36556C')
    else:
        connector(slide,1095,0,1078,22,'36556C');connector(slide,1078,22,1375,22,'36556C')
    sh=slide.shapes.add_shape(MSO_SHAPE.OVAL,units(1372),units(19),units(6),units(6));sh.fill.background();line_color(sh.line,CYAN,1)
    sh.name='Detalle tecnológico editable'

def normalize(s):return re.sub(r'\s+',' ',s).strip()

def main():
    ap=argparse.ArgumentParser();ap.add_argument('layout',type=Path);ap.add_argument('--output',type=Path,default=ROOT/'powerpoint/Expo_Administracion_de_Redes.pptx');args=ap.parse_args()
    layout=json.loads(args.layout.read_text());assert len(layout['slides'])==39
    for name,digest in layout['originals'].items():assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==digest,f'Master changed: {name}'
    prs=Presentation();prs.slide_width=units(1440);prs.slide_height=units(810)
    prs.core_properties.title='Administración de Redes · UNAH-VS'
    prs.core_properties.subject='Versión editable del HTML aprobado; 39 diapositivas'
    prs.core_properties.author='Grupo de Redes de Computadoras II · UNAH-VS'
    expected=[];exceptions=[];counts=Counter()
    for i,data in enumerate(layout['slides']):
        slide=prs.slides.add_slide(prs.slide_layouts[6]);background(slide,i==0)
        texts=[]
        for obj in data['objects']:
            kind=obj['type'];counts[kind]+=1
            if kind=='box':add_box(slide,obj)
            elif kind=='text':
                add_text(slide,obj)
                texts.extend(''.join(r['text'] for r in line['runs']) for line in obj['lines'])
            elif kind=='table':
                add_table(slide,obj['table'])
                for row in obj['table']['rows']:
                    for cell in row['cells']:texts.extend(''.join(r['text'] for r in line['runs']) for line in cell['lines'])
            elif kind=='svg':add_svg(slide,obj)
            elif kind=='arrow':
                r=obj['rect'];connector(slide,r['x'],r['y'],r['x']+r['w'],r['y'],head=obj['direction']=='right',tail=obj['direction']=='left')
            elif kind=='stepArrow':
                r=obj['rect'];connector(slide,r['x'],r['y']+r['h']/2,r['x']+r['w'],r['y']+r['h']/2,head=True)
            elif kind=='image':
                r=obj['rect'];scale=min(r['w']/obj['naturalWidth'],r['h']/obj['naturalHeight']);w=obj['naturalWidth']*scale;h=obj['naturalHeight']*scale
                slide.shapes.add_picture(str(ROOT/obj['src']),units(r['x']+(r['w']-w)/2),units(r['y']+(r['h']-h)/2),units(w),units(h))
                exceptions.append({'slide':i+1,'image':obj['src'],'reason':'Imagen original del informe, conservada como imagen; su texto interno no es editable.'})
        # Explicit geometry and colors must not inherit shadows from the Office theme.
        for shape in slide.shapes:
            theme_style=shape._element.find('{http://schemas.openxmlformats.org/presentationml/2006/main}style')
            if theme_style is not None:shape._element.remove(theme_style)
        expected.append(Counter(normalize(x) for x in texts if normalize(x)))
        slide.notes_slide.notes_text_frame.text='Fuente: versión HTML maestra aprobada. '+data['title']+'\nLos objetos son editables salvo las imágenes originales del informe.'
    args.output.parent.mkdir(parents=True,exist_ok=True);prs.save(args.output)
    # Reopen the package and verify every text line and every native table.
    reopened=Presentation(args.output);assert len(reopened.slides)==39
    assert reopened.slide_width*9==reopened.slide_height*16
    for i,slide in enumerate(reopened.slides):
        actual=[]
        for sh in slide.shapes:
            if sh.has_table:
                actual.extend(p.text for row in sh.table.rows for cell in row.cells for p in cell.text_frame.paragraphs)
            elif sh.has_text_frame:actual.extend(p.text for p in sh.text_frame.paragraphs)
        assert Counter(normalize(x) for x in actual if normalize(x))==expected[i],f'Text differs: {i+1}'
        # Also compare every visible word against the HTML, independent of object order.
        html_words=Counter(normalize(layout['slides'][i]['visibleText']).split())
        ppt_words=Counter(normalize(' '.join(actual)).split())
        assert html_words==ppt_words,(i+1,html_words-ppt_words,ppt_words-html_words)
    with ZipFile(args.output) as z:
        assert z.testzip() is None
        for name in z.namelist():
            if name.endswith('.xml'):etree.fromstring(z.read(name))
    report={'slides':39,'aspectRatio':'16:9','sizeInches':[40/3,7.5],'allTextMatchesHtml':True,'font':'Arial; Courier New para comandos','sourceElements':dict(counts),'nativeObjects':{'shapes':sum(len(sl.shapes) for sl in reopened.slides),'textBoxesWithContent':sum(bool(sh.text.strip()) for sl in reopened.slides for sh in sl.shapes if sh.has_text_frame),'tables':sum(sh.has_table for sl in reopened.slides for sh in sl.shapes),'connectors':sum(sh._element.tag.endswith('cxnSp') for sl in reopened.slides for sh in sl.shapes),'images':3},'imageExceptions':exceptions,'masterSha256':layout['originals'],'browserFonts':layout['browserFonts'],'verification':'Reabierto con python-pptx, XML validado y cotejo de todas las palabras visibles con HTML. Ver la revisión renderizada por separado.'}
    (args.output.parent/'verificacion.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print(f'Saved and verified {args.output} ({args.output.stat().st_size:,} bytes)');print(json.dumps(dict(counts)))

if __name__=='__main__':main()
