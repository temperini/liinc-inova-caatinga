
(()=>{'use strict';const $=s=>document.querySelector(s);const slides=[...document.querySelectorAll('.slide')];const deck=$('#deck');let current=0;let running=false;let timerStarted=false;let remaining=900;let started=0;let touchX=0;
function fit(){document.documentElement.style.setProperty('--scale',Math.min(innerWidth/1600,innerHeight/900))}addEventListener('resize',fit);fit();
function notes(){const s=window.AURA_SLIDES[current];$('#notes').innerHTML='<h3>SLIDE '+(current+1)+' · '+s.time+'</h3><p>'+s.note+'</p><p class="note-meta">'+s.source+'</p>'}
function go(i){current=Math.max(0,Math.min(slides.length-1,i));slides.forEach((s,n)=>{s.classList.toggle('active',n===current);s.setAttribute('aria-hidden',n!==current);s.inert=n!==current});deck.classList.toggle('light-active',slides[current].classList.contains('light'));$('#count').textContent=String(current+1).padStart(2,'0')+' / '+slides.length;$('#progress').style.width=((current+1)/slides.length*100)+'%';$('#prev').disabled=current===0;$('#next').disabled=current===slides.length-1;history.replaceState(null,'','#'+(current+1));notes();if(current===1&&!timerStarted)timeToggle()}
$('#prev').onclick=()=>go(current-1);$('#next').onclick=()=>go(current+1);
function toggleNotes(){const n=$('#notes');n.hidden=!n.hidden;$('#notes-toggle').setAttribute('aria-pressed',!n.hidden)}$('#notes-toggle').onclick=toggleNotes;
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),2500)}
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{toast('Use F11 para ampliar a janela.')}}$('#fullscreen').onclick=fullscreen;
function timeToggle(){timerStarted=true;if(running){remaining=Math.max(0,remaining-Math.floor((Date.now()-started)/1000));running=false}else{if(!remaining)remaining=900;started=Date.now();running=true}$('#timer').hidden=false;$('#timer-toggle').setAttribute('aria-pressed',running);drawTimer()}function drawTimer(){const s=Math.max(0,remaining-(running?Math.floor((Date.now()-started)/1000):0));$('#timer').textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');if(s===0&&running){running=false;remaining=0;toast('15 minutos. Hora de concluir.')}}setInterval(drawTimer,500);$('#timer-toggle').onclick=timeToggle;
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
const overview=$('#overview-list');slides.forEach((slide,i)=>{const heading=slide.querySelector('h1,h2').cloneNode(true);heading.querySelectorAll('br').forEach(br=>br.replaceWith(' '));heading.querySelectorAll('span').forEach(span=>{span.before(' ');span.after(' ')});const title=heading.textContent.replace(/\s+/g,' ').trim();const kind=slide.classList.contains('comparison-avoid')?' — Evite':slide.classList.contains('comparison-clear')?' — Escreva com clareza':'';const button=document.createElement('button');button.dataset.goto=i;button.textContent=String(i+1).padStart(2,'0')+' · '+title+kind;overview.appendChild(button)});document.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>{go(+b.dataset.goto);$('#overview-dialog').close()});$('#overview').onclick=()=>$('#overview-dialog').showModal();
addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.target.matches('textarea,input'))return;if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();go(current+1)}if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();go(current-1)}if(e.key==='Home')go(0);if(e.key==='End')go(slides.length-1);if(e.key.toLowerCase()==='f')fullscreen();if(e.key.toLowerCase()==='n')toggleNotes();if(e.key.toLowerCase()==='t')timeToggle();if(e.key.toLowerCase()==='g')$('#overview-dialog').showModal()});
deck.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].screenX},{passive:true});deck.addEventListener('touchend',e=>{const d=e.changedTouches[0].screenX-touchX;if(Math.abs(d)>65)go(current+(d<0?1:-1))},{passive:true});
const config=window.AURA_CONFIG||{};if(config.prompt){$('#prompt-pending').hidden=true;$('#prompt-text').hidden=false;$('#prompt-text').value=config.prompt;$('#copy-prompt').disabled=false}$('#show-prompt').onclick=()=>$('#prompt-dialog').showModal();
$('#copy-prompt').onclick=async()=>{const b=$('#copy-prompt');try{await navigator.clipboard.writeText(config.prompt);b.textContent='✓ Prompt copiado';b.classList.remove('copied');void b.offsetWidth;b.classList.add('copied');$('#copy-feedback').textContent='Prompt copiado. Adicione o texto como uma fonte no Gemini Notebook.';setTimeout(()=>{b.textContent='Copiar novamente';b.classList.remove('copied')},2500)}catch{$('#prompt-text').focus();$('#prompt-text').select();$('#copy-feedback').textContent='Selecione o texto e use Ctrl+C ou Copiar no celular.'}};
const initial=parseInt(location.hash.slice(1),10);go(Number.isFinite(initial)?initial-1:0);
})();

// Fagulhas decorativas apenas nas telas de aura e pontuação.
(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const targets=[...document.querySelectorAll('.cover,.score-focus,.gratitude')];
  let layer=null, timer=null, finishTimer=null, fadeTimer=null;
  function stop(){if(timer!==null)clearInterval(timer);if(finishTimer!==null)clearTimeout(finishTimer);if(fadeTimer!==null)clearTimeout(fadeTimer);timer=null;finishTimer=null;fadeTimer=null;if(layer)layer.remove();layer=null}
  function emit(){
    if(!layer||reduced.matches||document.hidden)return;
    const spark=document.createElement('span');spark.className='aura-spark';
    const cover=layer.parentElement.classList.contains('cover');
    const end=layer.parentElement.classList.contains('gratitude');
    const x=(cover||end?56:12)+Math.random()*(cover||end?42:76);
    spark.style.setProperty('--x',x+'%');spark.style.setProperty('--y',(35+Math.random()*53)+'%');
    spark.style.setProperty('--size',(3+Math.random()*8)+'px');
    spark.style.setProperty('--duration',(1.7+Math.random()*2.5)+'s');
    spark.style.setProperty('--drift',(-42+Math.random()*84)+'px');
    spark.style.setProperty('--rise',(85+Math.random()*175)+'px');
    spark.addEventListener('animationend',()=>spark.remove(),{once:true});layer.appendChild(spark);
  }
  function sync(){stop();if(reduced.matches)return;const active=targets.find(el=>el.classList.contains('active'));if(!active)return;layer=document.createElement('div');layer.className='aura-sparks';layer.setAttribute('aria-hidden','true');active.appendChild(layer);for(let i=0;i<4;i++)emit();timer=setInterval(emit,300);if(active.classList.contains('score-focus')){fadeTimer=setTimeout(()=>{if(timer!==null)clearInterval(timer);timer=null;if(layer)layer.classList.add('is-fading')},4200);finishTimer=setTimeout(stop,5000)}}
  const observer=new MutationObserver(sync);targets.forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class']}));
  reduced.addEventListener('change',sync);sync();
})();
