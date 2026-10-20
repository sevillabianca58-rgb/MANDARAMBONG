(function(){
  const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

  // theme toggle (dark / light), remembered per visitor
  const root=document.documentElement,tbtn=$('#themeBtn'),meta=$('meta[name="theme-color"]');
  function setTheme(t,save){
    root.setAttribute('data-theme',t);
    if(meta)meta.setAttribute('content',t==='light'?'#fff9ed':'#12070b');
    tbtn.setAttribute('aria-pressed',t==='light');
    tbtn.setAttribute('aria-label',t==='light'?'Switch to dark mode':'Switch to light mode');
    if(save){try{localStorage.setItem('theme',t)}catch(e){}}
  }
  setTheme(root.getAttribute('data-theme')==='light'?'light':'dark');
  tbtn.addEventListener('click',()=>setTheme(root.getAttribute('data-theme')==='light'?'dark':'light',true));

  // skills marquee: duplicate the row for a seamless loop, keep a steady speed on any screen width
  const track=$('#skillTrack');
  if(track&&!reduce){
    [...track.children].forEach(li=>{const c=li.cloneNode(true);c.setAttribute('aria-hidden','true');$('a',c).tabIndex=-1;track.appendChild(c)});
    const speed=()=>track.style.setProperty('--mq-dur',(track.scrollWidth/2/55).toFixed(1)+'s');
    speed();addEventListener('resize',speed);
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(speed);
  }

  // skills marquee: clicking an icon scrolls to its skill card and highlights it
  if(track)track.addEventListener('click',e=>{
    const a=e.target.closest('a.mq-link');if(!a)return;
    const card=document.getElementById(a.getAttribute('href').slice(1));if(!card)return;
    e.preventDefault();
    card.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});
    card.classList.remove('flash');void card.offsetWidth;card.classList.add('flash');
    clearTimeout(card._ft);card._ft=setTimeout(()=>card.classList.remove('flash'),2200);
  });

  // projects: stacked cards that settle on top of each other while scrolling
  const cards=$$('#pstack .pcard'),inner=cards.map(c=>$('.pcard-in',c));
  let ticking=false;
  function stack(){
    ticking=false;
    if(reduce||!cards.length)return inner.forEach(el=>{el.style.removeProperty('--s');el.style.removeProperty('--b')});
    let cover=0;
    for(let i=cards.length-1;i>=0;i--){
      if(i<cards.length-1){
        const h=inner[i].offsetHeight,top=parseFloat(getComputedStyle(cards[i]).top)||0,nextTop=cards[i+1].getBoundingClientRect().top;
        const step=parseFloat(getComputedStyle(cards[i+1]).top)-top||26;
        cover+=Math.min(1,Math.max(0,(top+h-nextTop)/Math.max(h-step,1)));
      }
      inner[i].style.setProperty('--s',(1-0.035*cover).toFixed(4));
      inner[i].style.setProperty('--b',(1-0.22*Math.min(cover,1.5)).toFixed(3));
    }
  }
  const tick=()=>{if(!ticking){ticking=true;requestAnimationFrame(stack)}};
  addEventListener('scroll',tick,{passive:true});addEventListener('resize',tick);stack();

  // resume: full-size viewer + print
  const rImg=$('#resumeImg'),lb=$('#lightbox'),lbImg=$('img',lb),sheet=$('#print-sheet img');
  let lastFocus=null;
  function openLb(){lastFocus=document.activeElement;lbImg.src=rImg.currentSrc||rImg.src;lb.hidden=false;document.body.style.overflow='hidden';$('#lbClose').focus()}
  function closeLb(){lb.hidden=true;document.body.style.overflow='';lastFocus&&lastFocus.focus&&lastFocus.focus()}
  $('#resumeOpen').addEventListener('click',openLb);
  $('#lbClose').addEventListener('click',closeLb);
  lb.addEventListener('click',e=>{if(e.target!==lbImg)closeLb()});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)closeLb()});
  // printing: only the resume sheet is printed (button, Ctrl/Cmd+P, or the browser's print menu)
  sheet.src=rImg.src;
  const body=document.body,pmq=matchMedia('print');
  let printing=false;
  function startPrint(){printing=true;body.classList.add('print-resume')}
  function endPrint(){printing=false;body.classList.remove('print-resume')}
  addEventListener('beforeprint',startPrint);
  addEventListener('afterprint',endPrint);
  (pmq.addEventListener?pmq.addEventListener('change',e=>{if(!e.matches&&printing)endPrint()}):pmq.addListener&&pmq.addListener(e=>{if(!e.matches&&printing)endPrint()}));
  $('#resumePrint').addEventListener('click',()=>{
    startPrint();
    // safety net: if a browser never reports the dialog closing, restore the page on the next interaction
    setTimeout(()=>['pointerdown','keydown','touchstart'].forEach(t=>addEventListener(t,function h(){removeEventListener(t,h);if(printing)endPrint()},{once:true})),400);
    const go=()=>{try{window.print()}catch(e){endPrint()}};
    (sheet.decode?sheet.decode().then(go,go):go());
  });
  // fallback if printing from the page is blocked (some in-app previews): open the PDF itself
  const pdfLink=$('#resumePdfOpen');
  if(pdfLink)pdfLink.addEventListener('click',async e=>{
    e.preventDefault();const href=pdfLink.getAttribute('href');
    try{const r=await fetch(href);const b=await r.blob();window.open(URL.createObjectURL(b),'_blank')}
    catch(err){window.open(href,'_blank')}
  });

  // sticky nav style
  const bar=$('#topbar');const onScroll=()=>bar.classList.toggle('scrolled',scrollY>20);onScroll();addEventListener('scroll',onScroll,{passive:true});

  // mobile menu
  const links=$('#links'),btn=$('#menuBtn');
  btn.addEventListener('click',()=>{const o=links.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
  $$('a',links).forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');btn.setAttribute('aria-expanded',false)}));

  // active link
  const map=new Map($$('a',links).map(a=>[a.getAttribute('href').slice(1),a]));
  map.set('interests',map.get('achievements'));
  const secs=$$('main section[id]');
  const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$$('a',links).forEach(a=>a.classList.remove('active'));const a=map.get(e.target.id);a&&a.classList.add('active')}}),{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(s=>spy.observe(s));

  // repeatable reveal + counters
  const counted=new WeakSet();
  function count(el){
    if(counted.has(el))return;counted.add(el);
    const t=+el.dataset.count,pad=+el.dataset.pad||0,fmt=n=>String(n).padStart(pad,'0');
    if(reduce){el.textContent=fmt(t);return}
    const st=performance.now(),dur=1200;
    (function step(now){const p=Math.min((now-st)/dur,1),e=1-Math.pow(1-p,3);el.textContent=fmt(Math.round(t*e));if(p<1)requestAnimationFrame(step)})(st);
  }
  const rv=new IntersectionObserver(es=>es.forEach(e=>{
    e.target.classList.toggle('in',e.isIntersecting);
    if(e.isIntersecting)$$('[data-count]',e.target).forEach(count);
  }),{threshold:.12});
  $$('.reveal').forEach(el=>rv.observe(el));

  // portrait tilt
  const tilt=$('#tilt');
  if(tilt&&!reduce&&matchMedia('(hover:hover)').matches){
    const art=tilt.parentElement;
    art.addEventListener('pointermove',e=>{const r=art.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`rotate(${3-x*4}deg) rotateY(${x*14}deg) rotateX(${-y*14}deg)`});
    art.addEventListener('pointerleave',()=>tilt.style.transform='');
  }

  // contact form -> mailto
  $('#contactForm').addEventListener('submit',e=>{
    e.preventDefault();const f=new FormData(e.target);
    const body=`${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`;
    location.href=`mailto:balingitkrisha@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry')}&body=${encodeURIComponent(body)}`;
  });
})();
