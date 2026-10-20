// Typing effect
(function(){
  const words=["Developer","Web Designer","Database Builder","Problem-Solver"];
  const el=document.getElementById('typed');
  let w=0,i=0,del=false;
  function tick(){
    const word=words[w];
    el.textContent=word.slice(0,i);
    if(!del&&i<word.length){i++;setTimeout(tick,110)}
    else if(!del){del=true;setTimeout(tick,1400)}
    else if(i>0){i--;setTimeout(tick,55)}
    else{del=false;w=(w+1)%words.length;setTimeout(tick,300)}
  }
  tick();
})();

// Mobile menu
const nav=document.getElementById('nav');
document.getElementById('burger').onclick=()=>nav.classList.toggle('open');
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// Scroll reveal + skill bars
const io=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('show');
      e.target.querySelectorAll?.('.fill').forEach(f=>f.style.width=f.dataset.w);
      if(e.target.classList.contains('bars')) e.target.querySelectorAll('.fill').forEach(f=>f.style.width=f.dataset.w);
    }
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Active link, progress bar, back-to-top
const sections=[...document.querySelectorAll('section')];
const links=[...document.querySelectorAll('nav a.link')];
const prog=document.getElementById('progress');
const topBtn=document.getElementById('topBtn');
function onScroll(){
  const h=document.documentElement;
  prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
  topBtn.classList.toggle('show',h.scrollTop>500);
  let cur='';
  sections.forEach(s=>{if(h.scrollTop>=s.offsetTop-160)cur=s.id});
  links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+cur));
}
window.addEventListener('scroll',onScroll);onScroll();
topBtn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

// Achievements tabs
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.ach-panel').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  const p=document.getElementById(t.dataset.t);
  p.classList.add('active');
  p.querySelectorAll('.ach').forEach((a,i)=>a.style.animationDelay=(i*.08)+'s');
});

// Project modal
const modal=document.getElementById('modal');
document.querySelectorAll('.proj .btn').forEach(b=>b.onclick=()=>{
  document.getElementById('mTitle').textContent=b.dataset.title;
  document.getElementById('mDesc').textContent=b.dataset.desc;
  document.getElementById('mTech').textContent=b.dataset.tech;
  modal.classList.add('open');
});
document.getElementById('closeModal').onclick=()=>modal.classList.remove('open');
modal.onclick=e=>{if(e.target===modal)modal.classList.remove('open')};
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});

// Contact form -> opens email app
document.getElementById('form').addEventListener('submit',e=>{
  e.preventDefault();
  const n=document.getElementById('fname').value.trim();
  const em=document.getElementById('femail').value.trim();
  const m=document.getElementById('fmsg').value.trim();
  const body=encodeURIComponent(`Name: ${n}\nEmail: ${em}\n\n${m}`);
  window.location.href=`mailto:biancasico109@gmail.com?subject=${encodeURIComponent('Portfolio message from '+n)}&body=${body}`;
  document.getElementById('formMsg').textContent='Opening your email app… Salamat!';
});
