#!/usr/bin/env python3
"""Audit editable objects and compare all 39 rendered slides with the HTML master.

Usage: python scripts/verify_powerpoint.py /tmp/pptx-review/layout.json \
  /tmp/pptx-review/render/Expo_Administracion_de_Redes.pdf --review-dir /tmp/pptx-review/comparison
A PDF exported from the PPTX is required; the PDF is validation, never source art.
"""
from pathlib import Path
from zipfile import ZipFile
from collections import Counter
import argparse, hashlib, json, re
import fitz
from PIL import Image, ImageDraw, ImageChops, ImageStat
from pptx import Presentation

ROOT=Path(__file__).resolve().parent.parent
# PDF extraction inserts spaces between deliberately tracked heading letters.
# Package-level validation verifies exact words/lines; render validation verifies
# every non-whitespace character and additionally checks native table line counts.
TOKEN=re.compile(r'\S',re.UNICODE)

def main():
    ap=argparse.ArgumentParser();ap.add_argument('layout',type=Path);ap.add_argument('pdf',type=Path)
    ap.add_argument('--pptx',type=Path,default=ROOT/'powerpoint/Expo_Administracion_de_Redes.pptx')
    ap.add_argument('--review-dir',type=Path,default=Path('/tmp/pptx-review/comparison'));args=ap.parse_args()
    layout=json.loads(args.layout.read_text());prs=Presentation(args.pptx);pdf=fitz.open(args.pdf)
    assert len(prs.slides)==len(pdf)==len(layout['slides'])==39
    assert prs.slide_width*9==prs.slide_height*16
    for name,digest in layout['originals'].items():assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==digest,name
    with ZipFile(args.pptx) as z:
        media=[n for n in z.namelist() if n.startswith('ppt/media/')]
        expected={hashlib.sha256(p.read_bytes()).hexdigest() for p in (ROOT/'assets/images').iterdir()}
        assert len(media)==3
        assert {hashlib.sha256(z.read(n)).hexdigest() for n in media}==expected
    args.review_dir.mkdir(parents=True,exist_ok=True)
    report=[];text_differences=[];out_of_bounds=[];table_wrap_differences=[]
    for i,page in enumerate(pdf):
        expected=Counter(TOKEN.findall(layout['slides'][i]['visibleText']))
        actual=Counter(TOKEN.findall(page.get_text()))
        missing=expected-actual;extra=actual-expected
        if missing or extra:text_differences.append({'slide':i+1,'missing':dict(missing),'extra':dict(extra)})
        for block in page.get_text('dict')['blocks']:
            for line in block.get('lines',[]):
                for span in line['spans']:
                    x0,y0,x1,y1=span['bbox']
                    if x0<-.5 or y0<-.5 or x1>page.rect.width+.5 or y1>page.rect.height+.5:out_of_bounds.append({'slide':i+1,'text':span['text'],'bbox':span['bbox']})
        spans=[span for block in page.get_text('dict')['blocks'] for line in block.get('lines',[]) for span in line['spans'] if span['text'].strip()]
        for table in layout['slides'][i]['tables']:
            for row in table['rows']:
                for cell in row['cells']:
                    r=cell['rect'];baselines=[]
                    for span in spans:
                        x0,y0,x1,y1=[v*1.5 for v in span['bbox']]
                        cx=(x0+x1)/2;cy=(y0+y1)/2
                        if r['x']<=cx<=r['x']+r['w'] and r['y']<=cy<=r['y']+r['h']:
                            baseline=span['origin'][1]*1.5
                            if not any(abs(v-baseline)<8 for v in baselines):baselines.append(baseline)
                    if len(baselines)!=len(cell['lines']):table_wrap_differences.append({'slide':i+1,'cell':cell['text'],'expectedLines':len(cell['lines']),'renderedLines':len(baselines)})
        pix=page.get_pixmap(matrix=fitz.Matrix(1.5,1.5),alpha=False)
        image=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
        ref=Image.open(args.layout.parent/'reference-html'/f'{i+1:02}.png').convert('RGB')
        image=image.resize(ref.size)
        image.save(args.review_dir/f'pptx-{i+1:02}.png')
        pair=Image.new('RGB',(ref.width*2,ref.height+36),'#080f1c');draw=ImageDraw.Draw(pair)
        draw.text((20,10),f'{i+1:02} HTML aprobado',fill='white');draw.text((ref.width+20,10),'PowerPoint renderizado',fill='white')
        pair.paste(ref,(0,36));pair.paste(image,(ref.width,36));pair.save(args.review_dir/f'pair-{i+1:02}.jpg',quality=90)
        delta=ImageStat.Stat(ImageChops.difference(ref,image)).mean
        report.append({'slide':i+1,'allRenderedTextPresent':not(missing or extra),'meanPixelDifferenceRgb':round(sum(delta)/3,3)})
    for start in range(0,39,8):
        batch=report[start:start+8];sheet=Image.new('RGB',(1280,384*len(batch)),'#080f1c')
        for row,item in enumerate(batch):
            pair=Image.open(args.review_dir/f"pair-{item['slide']:02}.jpg");pair.thumbnail((1280,376));sheet.paste(pair,(0,row*384))
        sheet.save(args.review_dir/f'contact-{start+1:02}.jpg',quality=90)
    result={'slides':report,'renderedCharacterDifferences':text_differences,'tableWrapDifferences':table_wrap_differences,'textOutsideSlide':out_of_bounds,'nativeTables':sum(sh.has_table for s in prs.slides for sh in s.shapes),'nativeShapes':sum(len(s.shapes) for s in prs.slides),'editableTextBoxes':sum(bool(sh.text.strip()) for s in prs.slides for sh in s.shapes if sh.has_text_frame),'connectors':sum(sh._element.tag.endswith('cxnSp') for s in prs.slides for sh in s.shapes),'onlyOriginalImages':True,'masterFilesUnchanged':True,'microsoftPowerPointTested':False,'renderEngine':'LibreOfficeDev 26.8 / PDF'}
    (args.review_dir/'render-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items() if k!='slides'},ensure_ascii=False,indent=2))
    if text_differences or out_of_bounds or table_wrap_differences:raise SystemExit('Rendered validation failed; inspect render-audit.json')

if __name__=='__main__':main()
