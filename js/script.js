/* Aplicación estática: no usa fetch, módulos, servicios ni recursos externos. */
(() => {
  'use strict';
  const slides = window.PRESENTATION_SLIDES;
  const $ = (id) => document.getElementById(id);
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const chapters = {intro:'Apertura',cdp:'Descubrimiento · CDP y LLDP',ntp:'Sincronización · NTP',snmp:'Monitoreo · SNMP',syslog:'Eventos · Syslog',backup:'Respaldo de configuraciones',ios:'Administración de imágenes IOS',demo:'Demostración práctica',end:'Conclusión'};
  const chapterCodes = {intro:'UNAH-VS / REDES II',cdp:'01 / DESCUBRIMIENTO',ntp:'02 / SINCRONIZACIÓN',snmp:'03 / MONITOREO',syslog:'04 / REGISTRO DE EVENTOS',backup:'05 / CONTINUIDAD',ios:'06 / SISTEMA OPERATIVO',demo:'DE LA TEORÍA A LA PRÁCTICA',end:'UNA VISIÓN INTEGRADA'};
  const members = [
    ['Angel Michael Acosta Maldonado','20232000632'],
    ['Bella Arely Fernández Sabillon','20192000242'],
    ['Karin Jafet Mejia Maradiaga','20222030948'],
    ['Ricardo Javier Isaula Bardales','20232000313'],
    ['Carlos Enrique Izaguirre Sagastume','20221004549']
  ];
  const icon = '<svg class="node-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="8" y="8" width="32" height="22" rx="4"/><path d="M17 38h14M24 30v8M15 19h18M19 15l-4 4 4 4M29 15l4 4-4 4"/></svg>';
  const footer = (s,i) => `<footer class="slide-footer"><span>${s.layout === 'cover' ? 'EXPOSICIÓN UNIVERSITARIA · 09 / 11 / 2026' : `Expone <strong>${escape(s.presenter)}</strong>`}</span><span class="page">${String(i+1).padStart(2,'0')} <span aria-hidden="true">/</span> ${slides.length}</span></footer>`;
  function renderSlide(s,i) {
    if (s.layout === 'cover') return `<section class="slide cover" data-index="${i}" aria-label="${i+1}. ${escape(s.title)}" aria-hidden="true"><div class="institution"><img src="assets/images/image1.jpeg" alt="Escudo de la UNAH"><p>Universidad Nacional Autonoma de Honduras<br>en el Valle de Sula <span>· UNAH-VS</span></p></div><div class="cover-body"><div><span class="eyebrow">REDES DE COMPUTADORAS II · SECCIÓN 2000</span><h1>Administración<br>de redes</h1><p class="cover-subtitle">Descubrir, supervisar y recuperar<br>una infraestructura de red.</p><div class="cover-meta"><strong>Catedrático</strong><br>MSc. Luis Andres Pineda Zuniga<br><span>Asignación: Informe Administración de Redes</span></div></div><div class="team"><p class="team-label">INTEGRANTES DEL GRUPO</p>${members.map(([name,id],j)=>`<div class="team-member"><span class="member-no">0${j+1}</span><div><strong>${escape(name)}</strong><small>${id}</small></div></div>`).join('')}</div></div>${footer(s,i)}</section>`;
    let content='';
    if(s.image) content+=`<figure><img src="assets/images/${escape(s.image)}" alt="${escape(s.imageAlt)}" loading="eager"></figure>`;
    if(s.cards.length) content+=`<div class="cards ${s.cards.length===2?'two':''}">${s.cards.map((c,j)=>`<article class="card"><span class="card-number" aria-hidden="true">0${j+1} —</span><h3>${escape(c.title)}</h3><p>${escape(c.text)}</p></article>`).join('')}</div>`;
    if(s.flow) content+=`<div class="flow" aria-label="Proceso">${s.flow.map(c=>`<div class="flow-node">${icon}<h3>${escape(c.title)}</h3><p>${escape(c.text)}</p></div>`).join('')}</div>`;
    if(s.commands && s.section==='cdp') {
      content+=`<div class="command-panels">${['CDP','LLDP'].map((name,k)=>`<div class="command-panel"><h3>${name}</h3><dl>${s.table.rows.slice(k*4,k*4+4).map(row=>`<div><dt><code>${escape(row[0])}</code></dt><dd>${escape(row[1])}</dd></div>`).join('')}</dl></div>`).join('')}</div>`;
    }
    if(s.table && !(s.commands && s.section==='cdp')) content+=`<table><thead><tr>${s.table.headers.map(h=>`<th scope="col">${escape(h)}</th>`).join('')}</tr></thead><tbody>${s.table.rows.map(row=>`<tr>${row.map((cell,j)=>`<td>${s.commands&&j===0?`<code>${escape(cell)}</code>`:escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    if(s.note) content+=`<p class="note">${escape(s.note)}</p>`;
    if(s.takeaway) content+=`<aside class="takeaway">${escape(s.takeaway)}</aside>`;
    return `<section class="slide ${s.layout||''} ${s.commands?'commands':''} ${s.title.length>65?'long-title':''}" data-index="${i}" aria-label="${i+1}. ${escape(s.title)}" aria-hidden="true"><div class="slide-top"><span class="eyebrow">${chapterCodes[s.section]}</span><span class="section-number">ADMINISTRACIÓN DE REDES</span></div><h2>${escape(s.title)}</h2><p class="lead">${escape(s.lead)}</p><div class="slide-content">${content}</div>${footer(s,i)}</section>`;
  }
  $('deck').innerHTML=slides.map(renderSlide).join('');
  const sections=[...document.querySelectorAll('.slide')];
  const firstInChapter=Object.keys(chapters).map(section=>({section,index:slides.findIndex(s=>s.section===section)}));
  $('chapterDots').innerHTML=firstInChapter.map(c=>`<button class="chapter-dot" data-go="${c.index}" aria-label="Ir a ${escape(chapters[c.section])}" title="${escape(chapters[c.section])}"></button>`).join('');
  let lastChapter='';
  $('outlineList').innerHTML=slides.map((s,i)=>{
    let group='';if(s.section!==lastChapter){lastChapter=s.section;group=`<h3 class="outline-group">${escape(chapters[s.section])}</h3>`;}
    return `${group}<button class="outline-item ${s.source?.level===2?'level-2':''}" data-go="${i}"><span class="outline-number">${String(i+1).padStart(2,'0')}</span><span>${escape(s.title)}</span></button>`;
  }).join('');
  let current=-1;
  function go(index,updateHash=true){
    index=Math.max(0,Math.min(slides.length-1,index));
    if(index===current)return;
    if(current>=0){sections[current].classList.remove('active');sections[current].setAttribute('aria-hidden','true');}
    current=index;sections[current].classList.add('active');sections[current].setAttribute('aria-hidden','false');
    $('counter').textContent=`${index+1} / ${slides.length}`;
    $('progress').style.width=`${(index+1)/slides.length*100}%`;
    document.querySelector('.progress-track').setAttribute('aria-valuenow',index+1);
    $('previous').disabled=index===0;$('next').disabled=index===slides.length-1;
    document.querySelectorAll('.chapter-dot').forEach((b,j)=>b.classList.toggle('active',firstInChapter[j].section===slides[index].section));
    document.querySelectorAll('.outline-item').forEach((b,j)=>b.setAttribute('aria-current',j===index?'true':'false'));
    document.title=`${index+1} · ${slides[index].title} | Administración de redes`;
    if(updateHash)location.hash=String(index+1);
  }
  function fromHash(){const n=Number(location.hash.slice(1));go(Number.isInteger(n)&&n>=1?n-1:0,false);}
  window.addEventListener('hashchange',fromHash);fromHash();
  $('previous').addEventListener('click',()=>go(current-1));$('next').addEventListener('click',()=>go(current+1));
  function openOutline(){ $('outline').showModal();$('outlineButton').setAttribute('aria-expanded','true');const selected=$('outlineList').querySelector('[aria-current="true"]');selected?.focus(); }
  function closeOutline(){ $('outline').close(); }
  $('outlineButton').addEventListener('click',openOutline);$('closeOutline').addEventListener('click',closeOutline);
  $('outline').addEventListener('close',()=>{$('outlineButton').setAttribute('aria-expanded','false');$('outlineButton').focus();});
  $('outline').addEventListener('click',e=>{if(e.target===$('outline')){const r=$('outline').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeOutline();}});
  document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>{go(Number(b.dataset.go));if($('outline').open)closeOutline();}));
  let noticeTimer;
  function notify(text){$('notification').textContent=text;$('notification').hidden=false;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>$('notification').hidden=true,4500);}
  async function fullscreen(){
    try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else notify('Usa F11 o el menú de tu navegador para activar pantalla completa.');}
    catch{notify('Activa la pantalla completa desde el menú del navegador o con F11.');}
  }
  $('fullscreenButton').addEventListener('click',fullscreen);
  document.addEventListener('fullscreenchange',()=>{$('fullscreenButton').setAttribute('aria-label',document.fullscreenElement?'Salir de pantalla completa':'Activar pantalla completa');resize();});
  document.addEventListener('keydown',e=>{
    if(e.altKey||e.ctrlKey||e.metaKey||e.target.matches('input,textarea,select,[contenteditable]'))return;
    if($('outline').open)return;
    const actions={ArrowRight:()=>go(current+1),ArrowDown:()=>go(current+1),PageDown:()=>go(current+1),' ':()=>go(current+1),ArrowLeft:()=>go(current-1),ArrowUp:()=>go(current-1),PageUp:()=>go(current-1),Home:()=>go(0),End:()=>go(slides.length-1),f:fullscreen,F:fullscreen,i:openOutline,I:openOutline};
    if((e.key===' '||e.key==='Enter')&&e.target.closest('button,a'))return;
    if(actions[e.key]){e.preventDefault();actions[e.key]();}
  });
  let touchStart;
  $('viewport').addEventListener('touchstart',e=>{touchStart={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};},{passive:true});
  $('viewport').addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5)go(current+(dx<0?1:-1));touchStart=null;},{passive:true});
  function resize(){const v=$('viewport'),style=getComputedStyle(v);const width=v.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);const height=v.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom);document.documentElement.style.setProperty('--scale',Math.max(.05,Math.min(width/1440,height/810)));}
  new ResizeObserver(resize).observe($('viewport'));window.addEventListener('resize',resize);resize();
})();
