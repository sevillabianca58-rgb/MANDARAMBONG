(()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const lowPower=(navigator.hardwareConcurrency||4)<=4||innerWidth<700;
let hidden=false; document.addEventListener('visibilitychange',()=>hidden=document.hidden);

/* Nav: glass on scroll, mobile menu, active link */
const nav=$('#nav'),links=$('#links'),burger=$('#burger');
burger.onclick=()=>{const o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
links.onclick=e=>{if(e.target.tagName==='A')links.classList.remove('open')};
addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>30),{passive:true});
const secs=$$('section');
secs.forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('.links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+s.id))}),{rootMargin:'-45% 0px -50% 0px'}).observe(s));

/* Custom cursor */
const dot=$('#cdot'),ring=$('#cring');let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
if(matchMedia('(hover:hover) and (pointer:fine)').matches){document.body.classList.add('cc')}
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px)`});
document.addEventListener('mouseover',e=>ring.classList.toggle('big',!!e.target.closest('a,button,input,textarea,.card')));

/* Typewriter */
const roles=['BSCS Student','UI Designer','Project Coordinator','Aspiring Software Developer'];
let ri=0,ci=0,del=false;const roleEl=$('#role');
(function type(){const w=roles[ri];
  if(reduce){roleEl.textContent=w;ri=(ri+1)%roles.length;return setTimeout(type,2200)}
  roleEl.textContent=w.slice(0,ci+=del?-1:1);
  let t=del?40:85;
  if(!del&&ci===w.length){del=true;t=1500}else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;t=350}
  setTimeout(type,t)})();

/* Dao rune circle: rings, trigrams, rune glyphs */
const sv=$('#runes'),NS='http://www.w3.org/2000/svg';
const mk=(t,a,p=sv)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e};
[[190,1.5,''],[172,1,'4 6'],[130,1.5,''],[96,1,'2 5']].forEach(([r,w,d])=>mk('circle',{r,fill:'none',stroke:'#e0142f','stroke-width':w,'stroke-dasharray':d,opacity:.8}));
const runes='道天玄黃宇宙洪荒日月盈昃辰宿列張劍氣靈火雷';
for(let i=0;i<24;i++){const a=i/24*360;const t=mk('text',{x:0,y:-148,'text-anchor':'middle','font-size':16,fill:'#d9a066',transform:`rotate(${a})`,opacity:.9});t.textContent=runes[i%runes.length]}
const tri=[['☰'],['☱'],['☲'],['☳'],['☴'],['☵'],['☶'],['☷']];
tri.forEach((g,i)=>{const t=mk('text',{x:0,y:-108,'text-anchor':'middle','font-size':22,fill:'#e0142f',transform:`rotate(${i*45})`});t.textContent=g[0]});
mk('polygon',{points:'0,-96 83,-48 83,48 0,96 -83,48 -83,-48',fill:'none',stroke:'#d9a066','stroke-width':.8,opacity:.6});

/* Aura burst on load, then name flash */
addEventListener('load',()=>{setTimeout(()=>{$('#hero').classList.add('go');$('#name').classList.add('show')},200)});
if(reduce)$('#name').style.opacity=1;

/* Scroll reveals + sword streak + gauges + timeline */
const gaugeData=[['Problem-solving',4],['UI/UX Design',3],['Database Management',3],['Teamwork and Collaboration',4],['Project Planning',3],['Communication Skills',3]];
const realms=['Qi Condensation','Foundation Establishment','Divine Flame Realm','Immortal Dao Realm'];
$('#gauges').innerHTML=gaugeData.map(([n,l])=>`<div class="skill"><div class="top"><b>${n}</b><span>${realms[l-1]}</span></div><div class="gauge" role="img" aria-label="${n}: ${realms[l-1]}"><i data-w="${l*25}"></i></div></div>`).join('');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){
  e.target.classList.add('in');
  e.target.querySelectorAll('.gauge i').forEach(i=>i.style.width=i.dataset.w+'%');
  io.unobserve(e.target)}}),{threshold:.15});
$$('section:not(#home), .rv').forEach(el=>io.observe(el));
const tio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('on'),250)}}),{threshold:.5});
$$('.tl li').forEach(l=>tio.observe(l));

/* 3D tilt cards */
if(!reduce&&matchMedia('(hover:hover)').matches)$$('.card').forEach(c=>{
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    c.style.transform=`perspective(800px) rotateY(${x*9}deg) rotateX(${-y*9}deg)`});
  c.addEventListener('mouseleave',()=>c.style.transform='')});

/* Qi particles (canvas) reacting to mouse + parallax sky */
const cv=$('#qi'),cx=cv.getContext('2d');let W,H,P=[];
const N=lowPower?70:220;
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight}
addEventListener('resize',size);size();
const spawn=(init)=>({x:Math.random()*W,y:init?Math.random()*H:H+10,r:Math.random()*2.2+.5,v:Math.random()*.6+.2,d:Math.random()*Math.PI*2,gold:Math.random()<.3,a:Math.random()*.6+.3});
for(let i=0;i<N;i++)P.push(spawn(true));
const moon=$('#moon'),stars=$('#stars');
/* Lightning arcs around portrait ring */
const ac=$('#arc'),ax=ac.getContext('2d');let arcs=[],nextArc=0;
function sizeArc(){ac.width=ac.offsetWidth;ac.height=ac.offsetHeight}sizeArc();addEventListener('resize',sizeArc);
function makeArc(){const w=ac.width,c=w/2,R=w*.5*.78,a=Math.random()*6.28,pts=[],n=9,span=.5+Math.random()*.4;
  for(let i=0;i<=n;i++){const t=a+span*i/n,rr=R+(Math.random()-.5)*w*.06;pts.push([c+Math.cos(t)*rr,c+Math.sin(t)*rr])}
  arcs.push({pts,life:1})}
/* Main loop */
function frame(t){requestAnimationFrame(frame);if(hidden)return;
  cx.clearRect(0,0,W,H);
  for(const p of P){p.y-=p.v;p.d+=.01;p.x+=Math.sin(p.d)*.4;
    const dx=p.x-mx,dy=p.y-my,dist=Math.hypot(dx,dy);if(dist<120){p.x+=dx/dist*1.5;p.y+=dy/dist*1.5}
    if(p.y<-10)Object.assign(p,spawn(false));
    cx.beginPath();cx.fillStyle=p.gold?`rgba(217,160,102,${p.a})`:`rgba(224,20,47,${p.a})`;
    cx.shadowBlur=8;cx.shadowColor=p.gold?'#d9a066':'#e0142f';cx.arc(p.x,p.y,p.r,0,6.28);cx.fill()}
  /* cursor ring trail */
  rx+=(mx-rx)*.15;ry+=(my-ry)*.15;ring.style.transform=`translate(${rx}px,${ry}px)`;
  /* parallax */
  const sy=scrollY;moon.style.transform=`translateY(${sy*.06}px)`;stars.style.transform=`translateY(${sy*.03}px)`;
  /* arcs */
  ax.clearRect(0,0,ac.width,ac.height);
  if(t>nextArc){const k=1+(Math.random()*2|0);for(let i=0;i<k;i++)makeArc();nextArc=t+700+Math.random()*1800}
  arcs=arcs.filter(a=>a.life>0);
  for(const a of arcs){ax.beginPath();a.pts.forEach(([x,y],i)=>i?ax.lineTo(x+(Math.random()-.5)*4,y+(Math.random()-.5)*4):ax.moveTo(x,y));
    ax.strokeStyle=`rgba(255,${200+Math.random()*40|0},170,${a.life})`;ax.lineWidth=1.6;ax.shadowBlur=14;ax.shadowColor='#e0142f';ax.stroke();a.life-=.08}
}
if(!reduce)requestAnimationFrame(frame);

/* Contact form: opens the visitor's email app */
$('#form').onsubmit=e=>{e.preventDefault();const f=e.target;
  location.href=`mailto:kianxyruz93@gmail.com?subject=${encodeURIComponent('Portfolio message from '+f.n.value)}&body=${encodeURIComponent(f.m.value+'\n\nFrom: '+f.e.value)}`};
})();
