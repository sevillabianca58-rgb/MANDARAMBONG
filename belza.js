// Zandher Belza portfolio — interactions
(function(){
 var P="images/zandher.jpg";
 document.querySelectorAll('[data-p]').forEach(function(i){i.src=P});
 var G=["images/gallery-1.jpg", "images/gallery-2.jpg", "images/gallery-3.jpg", "images/gallery-4.jpg", "images/gallery-5.jpg"];
 var gt=document.getElementById('gTrack');
 [0,1].forEach(function(r){G.forEach(function(src,i){var f=document.createElement('figure');f.className='shot';f.style.margin='0';if(r){f.setAttribute('aria-hidden','true')}var im=document.createElement('img');im.src=src;im.alt=r?'':'Photo of Zandher Belza, '+(i+1)+' of '+G.length;im.loading='lazy';im.decoding='async';f.appendChild(im);var sp=document.createElement('span');sp.textContent='0'+(i+1);f.appendChild(sp);gt.appendChild(f)})});
 document.getElementById('marquee').addEventListener('touchstart',function(){this.classList.add('paused')},{passive:true});
 document.getElementById('marquee').addEventListener('touchend',function(){var m=this;setTimeout(function(){m.classList.remove('paused')},1500)},{passive:true});
 document.getElementById('year').textContent=new Date().getFullYear();
 document.getElementById('contactForm').addEventListener('submit',function(event){event.preventDefault();const name=document.getElementById('visitorName').value.trim();const email=document.getElementById('visitorEmail').value.trim();const subject=document.getElementById('visitorSubject').value.trim();const message=document.getElementById('visitorMessage').value.trim();const body=encodeURIComponent(message+'\n\nFrom: '+name+'\nEmail: '+email);window.location.href='mailto:zandherbelza386@gmail.com?subject='+encodeURIComponent(subject)+'&body='+body;});
 var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

 // typewriter
 var words=['Learning every day','Designing clean interfaces','Building with Python & C#','Making games in Godot'],el=document.getElementById('typed'),w=0,c=0,del=false;
 function type(){var t=words[w];el.textContent=t.slice(0,c);if(!del&&c<t.length){c++;setTimeout(type,70)}else if(!del){del=true;setTimeout(type,1400)}else if(c>0){c--;setTimeout(type,34)}else{del=false;w=(w+1)%words.length;setTimeout(type,300)}}
 if(reduce){el.textContent=words[0]}else{setTimeout(type,2600)}

 // reveal
 var els=document.querySelectorAll('.reveal');
 if('IntersectionObserver' in window&&!reduce){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -5% 0px'});els.forEach(function(x){io.observe(x)})}else{els.forEach(function(x){x.classList.add('in')})}

 // spotlight
 document.querySelectorAll('.card').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});

 // tabs
 var tabs=[].slice.call(document.querySelectorAll('.tab')),ind=document.getElementById('tabInd');
 function place(){var a=document.querySelector('.tab[aria-selected=true]');if(!a)return;ind.style.width=a.offsetWidth+'px';ind.style.transform='translateX('+(a.offsetLeft-6)+'px)'}
 function setTab(n){tabs.forEach(function(t){t.setAttribute('aria-selected',t.dataset.tab===n)});document.querySelectorAll('.panel').forEach(function(p){p.classList.toggle('on',p.id==='p-'+n)});place()}
 tabs.forEach(function(t){t.addEventListener('click',function(){setTab(t.dataset.tab)})});
 document.querySelectorAll('a[data-tab]').forEach(function(a){a.addEventListener('click',function(){setTab(a.dataset.tab)})});
 window.addEventListener('resize',place);place();setTimeout(place,300);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(place);

 // resume: fit-to-width + print
 var sheet=document.getElementById('resumeSheet'),wrap=document.getElementById('paperWrap'),pr=document.getElementById('printRoot');
 function fit(){var k=Math.min(1,wrap.clientWidth/794);sheet.style.transform='scale('+k+')';wrap.style.height=(sheet.offsetHeight*k)+'px'}
 fit();window.addEventListener('resize',fit);window.addEventListener('load',fit);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
 pr.appendChild(sheet.cloneNode(true));
 document.getElementById('printResume').addEventListener('click',function(){window.print()});
 // theme toggle
 var root=document.documentElement,tb=document.getElementById('themeBtn'),meta=document.querySelector('meta[name=theme-color]');
 function sync(){var l=root.getAttribute('data-theme')==='light';tb.setAttribute('aria-label',l?'Switch to dark mode':'Switch to light mode');if(meta)meta.setAttribute('content',l?'#f6f3fc':'#08070c')}
 tb.addEventListener('click',function(){var n=root.getAttribute('data-theme')==='light'?'dark':'light';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}sync()});
 sync();
 // active nav
 var links=[].slice.call(document.querySelectorAll('.nav-links a')),secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
 function act(){var y=window.scrollY+200,cur=0;secs.forEach(function(s,i){if(s&&s.offsetTop<=y)cur=i});links.forEach(function(a,i){a.classList.toggle('active',i===cur)})}
 window.addEventListener('scroll',act,{passive:true});act();
})();
