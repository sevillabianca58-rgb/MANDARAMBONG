/* To use real pictures, put the image URL or data URI in "src" below. */
var ACH=[{t:"Top 10",l:"MATHEMATICS"},{t:"Top 10",l:"ENGLISH"},{t:"Top 10",l:"MAPEH"},{t:"With Honors",l:""},{t:"Dean's Lister",l:"DL"}];
var PRJ=[{n:"Pharmacia Garay and General Merchandise",src:"images/pharmacia.jpg"},{n:"Borrowing System",src:"",pending:true},{n:"WebCraft Solution",src:"images/webcraft.jpg",c:"ct"}];
function media(s,alt,c){return s?'<img class="'+(c||'')+'" src="'+s+'" alt="'+alt+'" loading="lazy">':'<div class="ph" role="img" aria-label="'+alt+' placeholder"><svg viewBox="0 0 24 24"><use href="#pic"/></svg></div>'}
document.getElementById('gal').innerHTML=ACH.map(function(a){return '<div class="tc rv"><h3>'+a.t+'</h3>'+(a.l?'<span>'+a.l+'</span>':'')+'</div>'}).join('');
document.getElementById('pg').innerHTML=PRJ.map(function(p){return '<article class="pj rv"><div class="img">'+media(p.src,p.n+' screenshot',p.c)+(p.pending?'<span class="pend">PENDING</span>':'')+'</div><h3>'+p.n+'</h3></article>'}).join('');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(el,i){el.style.transitionDelay=(i%3)*.08+'s';io.observe(el)});
var lb=document.getElementById('lb'),lc=document.getElementById('lc'),last;
document.getElementById('gal').addEventListener('click',function(e){var b=e.target.closest('.ach');if(!b)return;last=b;var m=b.querySelector('img,.ph');lc.innerHTML=m.outerHTML;lb.classList.add('on');document.getElementById('lx').focus()});
function close(){lb.classList.remove('on');if(last)last.focus()}
document.getElementById('lx').onclick=close;lb.onclick=function(e){if(e.target===lb)close()};
document.addEventListener('keydown',function(e){if(e.key==='Escape'){close();menu(false)}});
var lk=document.getElementById('lk'),bg=document.getElementById('bg');
function menu(o){lk.classList.toggle('open',o);bg.setAttribute('aria-expanded',o)}
bg.onclick=function(){menu(!lk.classList.contains('open'))};
lk.addEventListener('click',function(e){if(e.target.tagName==='A')menu(false)});
document.getElementById('top').onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};
var fp=document.getElementById('fp');
function fpv(){fp.classList.toggle('show',window.scrollY>window.innerHeight*.6)}
window.addEventListener('scroll',fpv,{passive:true});fpv();
fp.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};
/* Light / dark mode */
var root=document.documentElement,tg=document.getElementById('tg');
function setTheme(t,save){root.setAttribute('data-theme',t);tg.setAttribute('aria-label',t==='dark'?'Switch to light mode':'Switch to dark mode');if(save){try{localStorage.setItem('jeca-theme',t)}catch(e){}}}
var saved=null;try{saved=localStorage.getItem('jeca-theme')}catch(e){}
setTheme(saved||(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),false);
tg.onclick=function(){setTheme(root.getAttribute('data-theme')==='dark'?'light':'dark',true)};
/* Hire me -> resume */
var rs=document.getElementById('rs'),hire=document.getElementById('hire');
function rsOpen(){rs.classList.add('on');document.body.style.overflow='hidden';document.getElementById('rx').focus()}
function rsClose(){rs.classList.remove('on');document.body.style.overflow='';hire.focus()}
hire.onclick=function(e){e.preventDefault();rsOpen()};
document.getElementById('rx').onclick=rsClose;
document.getElementById('rb').onclick=function(e){e.preventDefault();rsClose()};
rs.onclick=function(e){if(e.target===rs)rsClose()};
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&rs.classList.contains('on'))rsClose()});
