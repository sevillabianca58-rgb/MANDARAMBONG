document.documentElement.classList.add('js');
const $=s=>document.querySelector(s);
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),3200)};
const cvd=$('#cvDialog');
$('#cv').onclick=()=>cvd.showModal();
$('#cvClose').onclick=()=>cvd.close();
cvd.addEventListener('click',e=>{if(e.target===cvd)cvd.close()});
$('#theme').onclick=()=>{const r=document.documentElement;const dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=dark?'light':'dark'};
$('#form').addEventListener('submit',e=>{e.preventDefault();const em=$('#em').value.trim(),m=$('#msg').value.trim();
  if(!/^\S+@\S+\.\S+$/.test(em)||!m){$('#err').style.display='block';return}
  $('#err').style.display='none';
  location.href='mailto:santiagokatrinakim@gmail.com?subject='+encodeURIComponent('Portfolio message from '+em)+'&body='+encodeURIComponent(m+'\n\nReply to: '+em);
  toast('Opening your email app to send the message.')});
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
// press-to-reveal pictures
document.querySelectorAll('.peek-card').forEach(c=>{const tog=()=>{const o=c.classList.toggle('open');c.setAttribute('aria-expanded',o);c.querySelector('.hint').textContent=o?'Tap to hide':'Tap to view'};c.addEventListener('click',tog);c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tog()}})});
const fl=document.querySelector('.flip');
if(fl){const tf=()=>{const o=fl.classList.toggle('open');fl.setAttribute('aria-expanded',o)};fl.addEventListener('click',tf);fl.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tf()}})}
const imgd=$('#imgDialog'),imgv=$('#imgView');
document.querySelectorAll('.cert').forEach(b=>b.addEventListener('click',()=>{const im=b.querySelector('img');imgv.src=im.src;imgv.alt=im.alt;imgd.showModal()}));
$('#imgClose').onclick=()=>imgd.close();
imgd.addEventListener('click',e=>{if(e.target===imgd)imgd.close()});
document.querySelectorAll('.honor-card').forEach(hc=>{const hh=hc.querySelector('.honor-head'),many=hc.querySelectorAll('.cert').length>1;
hh.addEventListener('click',()=>{const o=hc.classList.toggle('open');hh.setAttribute('aria-expanded',o);hh.querySelector('.hint').textContent=o?'Tap to hide':'Tap to view certificate'+(many?'s':'')})});
// star particles
(function(){const c=$('#stars'),x=c.getContext('2d');let w,h,P=[];
function size(){w=c.width=innerWidth;h=c.height=innerHeight;P=Array.from({length:Math.min(70,w/18|0)},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.8+.4,v:Math.random()*.25+.05,p:Math.random()*6}))}
size();addEventListener('resize',size);
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function draw(t){x.clearRect(0,0,w,h);P.forEach(s=>{const a=.35+.45*Math.sin(t/900+s.p);x.fillStyle='rgba(157,123,255,'+a+')';x.shadowColor='#9D7BFF';x.shadowBlur=8;x.beginPath();x.arc(s.x,s.y,s.r,0,6.3);x.fill();if(!reduce){s.y-=s.v;if(s.y<-5)s.y=h+5}});if(!reduce)requestAnimationFrame(draw)}
requestAnimationFrame(draw)})();
