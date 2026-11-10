/* Read-only capture of the approved master. Local files are fulfilled by Playwright;
 * this also works when managed Chromium blocks file://. No web files are changed. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const output = path.resolve(process.argv[2] || path.join(root, 'powerpoint/layout.json'));
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1504, height: 982 }, offline: true, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.route('http://presentation.local/**', async route => {
    const name = decodeURIComponent(new URL(route.request().url()).pathname);
    const file = path.resolve(root, '.' + name);
    if (!file.startsWith(root + path.sep)) throw Error('Invalid local resource');
    await route.fulfill({ body: fs.readFileSync(file), contentType: ({ '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' })[path.extname(file)] || 'application/octet-stream' });
  });
  await page.goto('http://presentation.local/index.html');
  await page.evaluate(() => document.fonts.ready);
  const result = { width: 1440, height: 810, slides: [], originals: {} };
  // Include the real selected platform font names in the audit.
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  const { root: documentRoot } = await cdp.send('DOM.getDocument');
  const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: documentRoot.nodeId, selector: '.cover h1' });
  result.browserFonts = (await cdp.send('CSS.getPlatformFontsForNode', { nodeId })).fonts;
  for (let i = 0; i < 39; i++) {
    await page.evaluate(n => { location.hash = String(n + 1); }, i);
    await page.waitForFunction(n => document.querySelector('.slide.active')?.dataset.index === String(n), i);
    const captured = await page.evaluate(() => {
      const slide = document.querySelector('.slide.active');
      const sr = slide.getBoundingClientRect(), scale = sr.width / 1440;
      const rect = el => { const r = el.getBoundingClientRect(); return { x: (r.x - sr.x) / scale, y: (r.y - sr.y) / scale, w: r.width / scale, h: r.height / scale }; };
      const style = el => { const s = getComputedStyle(el); return { color: s.color, fontSize: parseFloat(s.fontSize), fontWeight: s.fontWeight, fontStyle: s.fontStyle, fontFamily: s.fontFamily, letterSpacing: parseFloat(s.letterSpacing) || 0, lineHeight: parseFloat(s.lineHeight), textAlign: s.textAlign, textTransform: s.textTransform, background: s.backgroundColor, backgroundImage: s.backgroundImage, radius: parseFloat(s.borderTopLeftRadius), borders: ['Top','Right','Bottom','Left'].map(side => ({ width: parseFloat(s['border'+side+'Width']), color: s['border'+side+'Color'], style: s['border'+side+'Style'] })), padding: ['Top','Right','Bottom','Left'].map(side => parseFloat(s['padding'+side])) }; };
      function lines(el) {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        const output = [];
        let node;
        while ((node = walker.nextNode())) {
          if (node.parentElement.closest('svg')) continue;
          const cs = style(node.parentElement);
          for (let k = 0; k < node.textContent.length; k++) {
            let char = node.textContent[k];
            if(cs.textTransform==='uppercase')char=char.toUpperCase();
            else if(cs.textTransform==='lowercase')char=char.toLowerCase();
            const range = document.createRange();range.setStart(node,k);range.setEnd(node,k+1);
            const r = range.getBoundingClientRect();
            if (!r.height || /[\r\n\t]/.test(char)) continue;
            const x = (r.x-sr.x)/scale, y = (r.y-sr.y)/scale;
            let line = output.find(l => Math.abs(l.y-y)<Math.min(l.h,r.height/scale)*.45);
            if(!line) { line = { x,y,w:0,h:r.height/scale,fontSize:cs.fontSize,runs:[] }; output.push(line); }
            line.x=Math.min(line.x,x);line.w=Math.max(line.w,x+r.width/scale-line.x);
            const last = line.runs[line.runs.length-1];
            const key = JSON.stringify(cs);
            if(last && last.key===key) last.text+=char;
            else line.runs.push({text:char,style:cs,key});
          }
        }
        for(const line of output) for(const r of line.runs) delete r.key;
        return output;
      }
      const objects = [], texts = [], tables = [];
      function walk(el) {
        if(el.classList.contains('command-panel')) {
          const cells=[el.querySelector('h3'),...el.querySelectorAll('dl > div')];
          const rows=cells.map(cell=>{const st=style(cell);if(st.background==='rgba(0, 0, 0, 0)')st.background=style(el).background;return {h:rect(cell).h,cells:[{rect:rect(cell),style:st,lines:lines(cell),text:cell.innerText}]};});
          const first=rect(cells[0]);
          const table={rect:{x:first.x,y:first.y,w:first.w,h:rows.reduce((a,r)=>a+r.h,0)},rows};
          objects.push({type:'table',table});tables.push(table);return;
        }
        if(el.tagName==='TABLE') {
          const table = { rect:rect(el), rows:[...el.rows].map(row=>({ h:rect(row).h,cells:[...row.cells].map(cell=>({rect:rect(cell),style:style(cell),lines:lines(cell),text:cell.innerText})) })) };
          objects.push({type:'table',table});tables.push(table);return;
        }
        if(el.tagName.toLowerCase()==='svg') {
          objects.push({type:'svg',rect:rect(el),style:style(el),viewBox:el.getAttribute('viewBox'),stroke:el.getAttribute('stroke-width')||1.5,parts:[...el.children].map(child=>({tag:child.tagName,attrs:Object.fromEntries([...child.attributes].map(a=>[a.name,a.value]))}))});return;
        }
        const r=rect(el),s=style(el);
        if(el!==slide && (s.background!=='rgba(0, 0, 0, 0)' || s.borders.some(b=>b.width && b.style!=='none')))objects.push({type:'box',rect:r,style:s,name:el.className||el.tagName});
        if(el.tagName==='IMG') { objects.push({type:'image',rect:r,src:el.getAttribute('src'),naturalWidth:el.naturalWidth,naturalHeight:el.naturalHeight});return; }
        if(el.classList.contains('connection'))objects.push({type:'arrow',rect:r,direction:el.classList.contains('left')?'left':'right'});
        if(el.parentElement?.classList.contains('steps') && el.nextElementSibling)objects.push({type:'stepArrow',rect:{x:r.x+r.w+12,y:r.y+r.h*.45,w:26,h:24}});
        for(const child of el.children)walk(child);
      }
      walk(slide);
      const selector='h1,h2,h3,p,dt,dd,.eyebrow,.section-number,.card-number,.slide-footer>span:first-child,.page,.team-member strong,.team-member small,.member-no,.cover-meta,.takeaway,.exchange>span,.device-stack>div>span';
      for(const el of slide.querySelectorAll(selector)) {
        if(el.closest('table,.command-panel'))continue;
        const item={type:'text',tag:el.tagName,role:el.className,rect:rect(el),style:style(el),text:el.innerText,lines:lines(el)};
        texts.push(item);objects.push(item);
      }
      return { title:slide.querySelector('h1,h2').innerText, objects, textItems:texts, tables, visibleText:slide.innerText };
    });
    result.slides.push(captured);
    const imagesDir = path.join(path.dirname(output),'reference-html');fs.mkdirSync(imagesDir,{recursive:true});
    await page.locator('#deck').screenshot({path:path.join(imagesDir,`${String(i+1).padStart(2,'0')}.png`)});
  }
  if(errors.length)throw Error(errors.join('\n'));
  for(const file of ['index.html','css/styles.css','js/script.js','js/slides.js','assets/coverage.json','README.md','assets/images/image1.jpeg','assets/images/image2.png','assets/images/image3.jpg'])result.originals[file]=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
  fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify(result,null,2));
  console.log(`Exported ${result.slides.length} slides to ${output}`);console.log(result.browserFonts);
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
