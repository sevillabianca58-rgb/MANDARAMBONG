document.documentElement.classList.add('js');

/* ---------- EDIT YOUR CONTENT HERE ---------- */
var CONFIG = {
  email: 'sevillabianca58@gmail.com',
  facebook: 'https://www.facebook.com/share/1Sp9om5mPA/',
  instagram: 'https://www.instagram.com/bangky_pixie?srtk=MWZ5MjF5cThkMTBvbw==',
  github: 'https://sevillabianca58-rgb.github.io/MANDARAMBONG/'
};
var INFO = [
  ['Full name','Bianca A. Sevilla','user'],
  ['Nickname','Sevsev','smile'],
  ['Course and section','BSCS-2C','book'],
  ['Year level','Second Year','cal'],
  ['Team role','Designer','pen']
];
var ICONS = {
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.400 3.600-7 8-7s8 2.600 8 7"/>',
  smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14c1 1.500 2.300 2.200 4 2.200s3-.7 4-2.200M9 9.500h.01M15 9.500h.01"/>',
  book:'<path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path d="M12 6v14"/>',
  cal:'<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  pen:'<path d="M4 20l1-5L16 4l4 4L9 19z"/><path d="M14 6l4 4"/>',
  spark:'<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
  code:'<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
  tool:'<path d="M14 6a4 4 0 0 0 5 5l-9 9a2.800 2.800 0 0 1-4-4z"/><path d="M14 6l3-3 4 4-3 3"/>'
};
function ic(n){return '<span class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">'+ICONS[n]+'</svg></span>'}
var SKILLS = [
  ['Design','pen',['Canva','Basic UI/UX Design','Wireframing','Layout and Color Selection','Basic Prototyping']],
  ['Programming','code',['Python','MYSQL','VB.NET','HTML','CSS','Basic JavaScript']],
  ['Tools','tool',['PyCharm','Visual Studio Code','Visual Studio','Canva','Data Modeler']]
];
/* Set url to a live demo or repository to turn "Project Preview" into "View Project". Add tools:'...' once confirmed. */
var PROJECTS = [
  {n:'01',t:'Rental Tracking and Payment System',d:'A system designed to help organize rental information, monitor payment records, and keep track of rental transactions. The goal is to make rental management easier and more organized.',url:'',tools:'',cls:'s1',mock:'dash'},
  {n:'02',t:'Reverse Vending Machine System',d:'A project based on a reverse vending machine concept, where users can return recyclable containers through a system designed to support recycling and encourage responsible waste disposal.',url:'',tools:'',cls:'s2',mock:'rvm'},
  {n:'03',t:'Food Frenzy Game',d:'A burger-themed game project with both solo and two-player modes on the same screen. Players can enjoy a food-themed challenge while testing their timing, coordination, and gameplay skills.',url:'',tools:'',cls:'s3',mock:'game'},
  {n:'04',t:'Sari-Sari Store System',d:'A VB.NET project inspired by the neighborhood sari-sari store we all grew up with. We wanted to turn the way a small store runs every day into a program that feels easier and tidier than a notebook and pen.',url:'',tools:'VB.NET',cls:'s4',mock:'store'},
  {n:'05',t:'Class Fund System',d:'Our room handles a class fund together, so we are building a system to keep it clear and easy to follow for everyone. It is something we are working on right now, and it is still growing.',url:'',tools:'',cls:'s5',mock:'fund',status:'In progress'},
  {n:'06',t:'MANDARAMBONG',d:'Our team website, built together with my classmates. Every one of us gets our own portfolio inside it, so the site ends up being a mix of all our personalities. We are still building it right now.',url:'index.html',tools:'',cls:'s6',mock:'site',status:'In progress'}
];
/* ---------- /EDIT ---------- */

var BURGER='<svg viewBox="0 0 100 90" aria-hidden="true"><path d="M12 36C12 14 88 14 88 36z" fill="#E8A55B"/><circle cx="34" cy="26" r="2" fill="#fff3d6"/><circle cx="52" cy="22" r="2" fill="#fff3d6"/><circle cx="68" cy="27" r="2" fill="#fff3d6"/><path d="M10 38q8 8 16 0t16 0 16 0 16 0 16 0v6H10z" fill="#7CC27A"/><rect x="12" y="46" width="76" height="12" rx="6" fill="#6b3b2a"/><path d="M14 58h72l-8 10-10-6-10 6-10-6-10 6-10-6z" fill="#F6C945"/><path d="M12 70h76c0 10-8 14-18 14H30c-10 0-18-4-18-14z" fill="#E8A55B"/></svg>';
var MOCKS = {
 dash:'<div class="win reveal-img"><div class="bar"><i></i><i></i><i></i></div><div class="dash"><div class="side"><span class="a">Records</span><span>Payments</span><span>Units</span></div><div class="main"><div class="stats"><div><b>Units</b>Sample</div><div><b>Paid</b>Sample</div><div><b>Due</b>Sample</div></div><table class="tbl"><thead><tr><th>Unit</th><th>Due date</th><th>Status</th></tr></thead><tbody><tr><td>Unit A</td><td>Day 05</td><td><span class="pill paid">Paid</span></td></tr><tr><td>Unit B</td><td>Day 10</td><td><span class="pill pend">Pending</span></td></tr><tr><td>Unit C</td><td>Day 15</td><td><span class="pill paid">Paid</span></td></tr><tr><td>Unit D</td><td>Day 20</td><td><span class="pill over">Overdue</span></td></tr></tbody></table></div></div></div>',
 rvm:'<svg class="mock-svg reveal-img" viewBox="0 0 420 380" role="img" aria-label="Illustration of a reverse vending machine concept with bottles"><rect x="90" y="14" width="240" height="330" rx="34" fill="#30232B"/><rect x="108" y="32" width="204" height="134" rx="20" fill="#FFF9F3"/><circle cx="140" cy="62" r="11" fill="#7CC27A"/><path d="M135 62l4 4 7-8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="160" y="67" font-family="DM Sans,Arial" font-weight="700" font-size="15" fill="#30232B">Recycle here</text><text x="126" y="102" font-family="DM Sans,Arial" font-size="13" fill="#5b4753">Insert a container</text><rect x="126" y="116" width="168" height="34" rx="17" fill="#F8DDE9"/><text x="210" y="138" text-anchor="middle" font-family="DM Sans,Arial" font-weight="700" font-size="14" fill="#30232B">Containers: 3</text><rect x="128" y="186" width="164" height="54" rx="27" fill="#14090f"/><rect x="140" y="204" width="140" height="18" rx="9" fill="#3a2a33"/><rect x="108" y="262" width="204" height="62" rx="16" fill="#7CC27A"/><path d="M180 293a14 14 0 0 1 24-8m0 0v-9m0 9h-9M240 293a14 14 0 0 1-24 8m0 0v9m0-9h9" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="rotate(-18 52 300)"><rect x="40" y="260" width="24" height="70" rx="9" fill="#EFA2C1"/><rect x="46" y="244" width="12" height="20" rx="4" fill="#EFA2C1"/><rect x="43" y="278" width="18" height="22" rx="3" fill="#fff9f3" opacity=".7"/></g><g transform="rotate(14 370 310)"><rect x="358" y="270" width="24" height="70" rx="9" fill="#B8A3E8"/><rect x="364" y="254" width="12" height="20" rx="4" fill="#B8A3E8"/><rect x="361" y="288" width="18" height="22" rx="3" fill="#fff9f3" opacity=".7"/></g><rect x="30" y="350" width="360" height="12" rx="6" fill="#30232B" opacity=".18"/></svg>',
 store:'<div class="win reveal-img"><div class="bar"><i></i><i></i><i></i><span class="wt">Sari-Sari Store</span></div><div class="store"><div class="items"><span>Biscuits</span><span>Candy</span><span>Soap</span><span>Noodles</span><span>Soda</span><span>Coffee</span></div><div class="order"><b>Order</b><p>Noodles <em>x2</em></p><p>Soda <em>x1</em></p><p>Candy <em>x5</em></p><div class="tot">Total</div></div></div></div>',
 fund:'<div class="win reveal-img"><div class="bar"><i></i><i></i><i></i><span class="wt">Class Fund</span></div><div class="fund"><svg class="ring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="48" fill="none" stroke="#F8DDE9" stroke-width="14"/><circle cx="60" cy="60" r="48" fill="none" stroke="#EFA2C1" stroke-width="14" stroke-linecap="round" stroke-dasharray="205 302" transform="rotate(-90 60 60)"/><text x="60" y="58" text-anchor="middle">Class</text><text x="60" y="76" text-anchor="middle">Fund</text></svg><table class="tbl"><thead><tr><th>Member</th><th>Status</th></tr></thead><tbody><tr><td>Member 1</td><td><span class="pill paid">Paid</span></td></tr><tr><td>Member 2</td><td><span class="pill pend">Pending</span></td></tr><tr><td>Member 3</td><td><span class="pill paid">Paid</span></td></tr></tbody></table></div></div>',
 site:'<div class="win reveal-img"><div class="bar"><i></i><i></i><i></i><span class="url">mandarambong</span></div><div class="site"><b class="logo2">MANDARAMBONG</b><div class="pgrid"><div class="pt me"><span class="av"></span>Sevsev</div><div class="pt"><span class="av"></span>Portfolio</div><div class="pt"><span class="av"></span>Portfolio</div><div class="pt"><span class="av"></span>Portfolio</div><div class="pt"><span class="av"></span>Portfolio</div><div class="pt"><span class="av"></span>Portfolio</div></div></div></div>',
 game:'<div class="game reveal-img"><div class="top"><span>Food Frenzy</span><div class="modes"><span>Solo</span><span class="a">2 Players</span></div></div><div class="screens"><div class="half">Player 1<span class="ord"> Order up!</span>'+BURGER+'</div><div class="half">Player 2<span class="ord"> Order up!</span>'+BURGER+'</div></div></div>'
};

/* opening animation: letters assemble, ink burst */
(function(){
  function build(el,txt,off){txt.split('').forEach(function(c,i){var s=document.createElement('span');s.className='ch';var a=Math.random()*6.283,d=150+Math.random()*260;s.style.setProperty('--x',Math.round(Math.cos(a)*d)+'px');s.style.setProperty('--y',Math.round(Math.sin(a)*d*.6)+'px');s.style.setProperty('--r',Math.round((Math.random()-.5)*320)+'deg');s.style.setProperty('--i',i+off);s.textContent=c;el.appendChild(s)})}
  build(document.getElementById('tt'),'Port',0);build(document.getElementById('tt2'),'folio',4);
  var b=document.getElementById('burst'),cols=['#30232B','#EFA2C1','#B8A3E8','#B77B96','#30232B'];
  for(var i=0;i<28;i++){var p=document.createElement('span'),a=Math.random()*6.283,d=80+Math.random()*300,dash=i%3===0,sz=dash?14:5+Math.random()*8;
    p.className='pc'+(dash?' dash':'');p.style.width=sz+'px';p.style.height=(dash?3.5:sz)+'px';p.style.background=cols[i%cols.length];
    p.style.setProperty('--dx',Math.round(Math.cos(a)*d)+'px');p.style.setProperty('--dy',Math.round(Math.sin(a)*d*.7)+'px');p.style.setProperty('--rot',Math.round(Math.random()*360)+'deg');
    p.style.animationDelay=(1.0+Math.random()*.12)+'s';b.appendChild(p)}
})();

/* info */
document.getElementById('infoGrid').innerHTML=INFO.map(function(r,i){return '<div class="tile rv" style="--rd:'+(i%3)*.08+'s">'+ic(r[2])+'<div><small>'+r[0]+'</small><b>'+r[1]+'</b></div></div>'}).join('');
/* skills */
document.getElementById('skillGrid').innerHTML=SKILLS.map(function(g,i){return '<div class="sk rv" style="--rd:'+i*.1+'s"><h3>'+ic(g[1])+g[0]+'</h3><ul class="badges">'+g[2].map(function(s){return '<li>'+s+'</li>'}).join('')+'</ul></div>'}).join('');
/* projects: fan-out card deck (hover to fan, click a card to open its details) */
(function(){
  var plist=document.getElementById('plist'),n=PROJECTS.length;
  function inner(p){
    var btn=p.url?'<a class="btn" href="'+p.url+'"'+(/^https?:/.test(p.url)?' target="_blank" rel="noopener"':'')+'>View Project</a>':'<button class="btn" type="button" data-p="'+PROJECTS.indexOf(p)+'">Project Preview</button>';
    return '<div class="copy"><div class="ptop"><span class="pno">Project '+p.n+'</span>'+(p.status?'<span class="stat">'+p.status+'</span>':'')+'</div><h3>'+p.t+'</h3><p>'+p.d+'</p>'+(p.tools?'<p><b>Made with:</b> '+p.tools+'</p>':'')+btn+'</div><div class="shot '+p.cls+'">'+MOCKS[p.mock]+'</div>';
  }
  plist.innerHTML='<div class="deckwrap rv"><div class="deck" id="deck">'+PROJECTS.map(function(p,i){
    return '<div class="pcard" role="button" tabindex="0" data-card="'+i+'" style="--off:'+(i-(n-1)/2)+'" aria-label="Project '+p.n+': '+p.t+'"><span class="pcard-face"><span class="pcard-shot '+p.cls+'" aria-hidden="true"><span class="pcard-mock">'+MOCKS[p.mock]+'</span></span><span class="pcard-no">Project '+p.n+'</span><span class="pcard-t">'+p.t+'</span></span></div>';
  }).join('')+'</div><p class="deck-hint">Hover over the cards to fan them out, then tap one to see its details.</p></div><div id="pdetail"><article class="card" aria-live="polite"></article></div>';

  var deck=document.getElementById('deck'),art=plist.querySelector('#pdetail .card'),cards=[].slice.call(deck.querySelectorAll('.pcard'));
  function select(i,first){
    cards.forEach(function(c,k){
      c.style.setProperty('--z',(n-Math.abs(k-i))*2+(k>i?0:1));
      c.classList.toggle('is-active',k===i);
      c.setAttribute('aria-pressed',k===i);
    });
    art.innerHTML=inner(PROJECTS[i]);
    if(!first){art.classList.remove('vis');requestAnimationFrame(function(){requestAnimationFrame(function(){art.classList.add('vis')})})}
  }
  deck.addEventListener('click',function(e){var b=e.target.closest('.pcard');if(b)select(+b.dataset.card)});
  deck.addEventListener('keydown',function(e){var b=e.target.closest('.pcard');if(b&&(e.key==='Enter'||e.key===' ')){e.preventDefault();select(+b.dataset.card)}});
  /* scale the project pictures to the card width */
  function fit(){deck.style.setProperty('--k',(cards[0].offsetWidth*.9/460).toFixed(4))}
  fit();addEventListener('resize',fit);addEventListener('load',fit);
  /* touch screens have no hover: a tap fans the deck out, a tap elsewhere folds it back */
  deck.addEventListener('pointerdown',function(e){if(e.pointerType==='touch')deck.classList.add('open')});
  document.addEventListener('pointerdown',function(e){if(!deck.contains(e.target))deck.classList.remove('open')});
  select(0,true);
})();
/* socials */
var SV={fb:'<svg viewBox="0 0 24 24"><path d="M13.500 21v-8h2.700l.5-3.200h-3.200V7.900c0-.9.400-1.700 1.800-1.700h1.500V3.400S15.500 3.200 14.300 3.200c-2.600 0-4.200 1.500-4.200 4.300v2.300H7.300V13h2.800v8z"/></svg>',
ig:'<svg viewBox="0 0 24 24"><path d="M7.500 3h9A4.500 4.500 0 0 1 21 7.500v9a4.500 4.500 0 0 1-4.500 4.500h-9A4.500 4.500 0 0 1 3 16.500v-9A4.500 4.500 0 0 1 7.500 3zm0 1.800A2.700 2.700 0 0 0 4.800 7.500v9a2.700 2.700 0 0 0 2.700 2.700h9a2.700 2.700 0 0 0 2.700-2.700v-9a2.700 2.700 0 0 0-2.700-2.700zM12 7.500a4.500 4.500 0 1 1 0 9 4.500 4.500 0 0 1 0-9zm0 1.800a2.700 2.700 0 1 0 0 5.400 2.700 2.700 0 0 0 0-5.400zm4.800-2.900a1.100 1.100 0 1 1 0 2.200 1.100 1.100 0 0 1 0-2.200z"/></svg>',
gh:'<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.200 19.500c.5.100.7-.2.7-.5v-1.800c-2.800.6-3.400-1.200-3.400-1.200-.5-1.200-1.100-1.500-1.100-1.500-.9-.6.100-.6.100-.6 1 .1 1.600 1 1.600 1 .9 1.500 2.400 1.100 3 .8.100-.7.400-1.100.6-1.400-2.200-.3-4.600-1.100-4.600-5 0-1.100.4-2 1-2.700-.1-.3-.4-1.300.1-2.700 0 0 .8-.3 2.800 1a9.600 9.600 0 0 1 5 0c1.900-1.300 2.800-1 2.800-1 .5 1.400.2 2.400.1 2.700.6.700 1 1.600 1 2.700 0 3.900-2.400 4.700-4.600 5 .4.300.7.900.7 1.800v2.700c0 .3.200.6.700.5A10 10 0 0 0 12 2z"/></svg>',
ml:'<svg viewBox="0 0 24 24"><path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1.500 2L12 12.200 18.500 7z"/></svg>'};
function soc(l,h,i){return '<a class="soc" href="'+h+'" target="_blank" rel="noopener" aria-label="'+l+' (opens in a new tab)">'+SV[i]+l+'</a>'}
var gh=CONFIG.github?soc('GitHub',CONFIG.github,'gh'):'<a class="soc" aria-disabled="true" role="link" tabindex="-1">'+SV.gh+'GitHub link coming soon</a>';
document.getElementById('socials').innerHTML='<a class="soc" href="mailto:'+CONFIG.email+'">'+SV.ml+'Email</a>'+soc('Facebook',CONFIG.facebook,'fb')+soc('Instagram',CONFIG.instagram,'ig')+gh;
if(!CONFIG.github)document.getElementById('ghNote').textContent='My GitHub profile will be linked here soon.';

/* copy email */
document.getElementById('copyMail').addEventListener('click',function(){
  var b=this,t=document.getElementById('mailText');
  function ok(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy email'},1800)}
  function sel(){var r=document.createRange();r.selectNodeContents(t);var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selected'}
  try{navigator.clipboard.writeText(CONFIG.email).then(ok,sel)}catch(e){sel()}
});

/* dialog */
var dlg=document.getElementById('dlg');
document.getElementById('plist').addEventListener('click',function(e){
  var b=e.target.closest('[data-p]');if(!b)return;var p=PROJECTS[b.dataset.p];
  document.getElementById('dlgT').textContent=p.t;document.getElementById('dlgP').textContent=p.d;
  document.getElementById('dlgN').textContent=p.status?'This project is still in progress, so there is no demo or repository to open yet. The mockup on the card is an interface concept.':'A live demo or repository for this project has not been added yet. The mockup on the card is an interface concept.';
  if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');
});
document.getElementById('dlgX').addEventListener('click',function(){dlg.close?dlg.close():dlg.removeAttribute('open')});
dlg.addEventListener('click',function(e){if(e.target===dlg&&dlg.close)dlg.close()});

/* nav */
var sbBurger=document.getElementById('sbBurger'),sbLinks=[].slice.call(document.querySelectorAll('#sbLinks a'));
function sbOpen(o){document.body.classList.toggle('sb-open',o);sbBurger.setAttribute('aria-expanded',o);sbBurger.setAttribute('aria-label',o?'Close menu':'Open menu')}
sbBurger.addEventListener('click',function(){sbOpen(!document.body.classList.contains('sb-open'))});
document.getElementById('sbScrim').addEventListener('click',function(){sbOpen(false)});
sbLinks.forEach(function(a){a.addEventListener('click',function(){sbOpen(false)})});
var navLinks=sbLinks;
var secs=['home','about','skills','projects','achievements','hobbies','moments','contact'].map(function(i){return document.getElementById(i)});
/* dark / light mode */
(function(){
  var root=document.documentElement;
  function setTheme(m){root.setAttribute('data-theme',m);try{localStorage.setItem('sevsev-theme',m)}catch(e){}}
  [].forEach.call(document.querySelectorAll('.sb-sw button'),function(b){b.addEventListener('click',function(){setTheme(b.dataset.m)})});
})();
/* resume viewer: set the file path once, on the Download button in sevsev.html */
(function(){
  var rm=document.getElementById('sbRm'),fr=document.getElementById('sbFrame'),url=document.getElementById('sbCvDl').getAttribute('href');
  document.getElementById('sbRmDl').setAttribute('href',url);document.getElementById('sbRmOpen').setAttribute('href',url);
  function set(o){rm.classList.toggle('on',o);rm.setAttribute('aria-hidden',!o);document.body.style.overflow=o?'hidden':'';
    if(o){if(!fr.getAttribute('src'))fr.setAttribute('src',url+'#view=FitH');document.getElementById('sbRmX').focus()}else document.getElementById('sbCvView').focus()}
  document.getElementById('sbCvView').addEventListener('click',function(){set(true)});
  document.getElementById('sbRmX').addEventListener('click',function(){set(false)});
  rm.addEventListener('click',function(e){if(e.target===rm)set(false)});
  document.addEventListener('keydown',function(e){if(e.key!=='Escape')return;if(rm.classList.contains('on'))set(false);else sbOpen(false)});
})();
var topBtn=document.getElementById('topBtn');
function onScroll(){
  var y=scrollY,cur=0;
  secs.forEach(function(s,i){if(s.getBoundingClientRect().top<innerHeight*.4)cur=i});
  navLinks.forEach(function(a,i){a.classList.toggle('on',i===cur)});
  topBtn.classList.toggle('show',y>700);
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
topBtn.addEventListener('click',function(){scrollTo({top:0})});

/* reveal */
(function(){
  var els=[].slice.call(document.querySelectorAll('.rv,.card'));
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('vis')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(e){io.observe(e)});
})();

/* gentle pointer parallax on floating objects (desktop only) */
if(matchMedia('(hover:hover)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  var ow=[].slice.call(document.querySelectorAll('.hero .obj-w')),raf;
  document.querySelector('.hero').addEventListener('mousemove',function(e){
    cancelAnimationFrame(raf);raf=requestAnimationFrame(function(){
      var x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);
      ow.forEach(function(o){var d=+o.dataset.depth;o.style.transform='translate('+x*d+'px,'+y*d+'px)'});
    });
  });
}

/* things I enjoy carousel */
(function(){
  var car=document.getElementById('hcar');if(!car)return;
  var track=document.getElementById('hTrack'),slides=[].slice.call(track.children),dotsEl=document.getElementById('hDots'),tabsEl=document.getElementById('hTabs');
  var bases=['images/thingsienjoy-sevsev/','image/thingsienjoy-sevsev/'],exts=['jpg','jpeg','png','webp','JPG','JPEG','PNG','jfif'];
  var alt={'cats-dogs':['cats-dogs','cats&dogs','cats_dogs','catsdogs','cats and dogs']};
  var i=0,n=slides.length,dots=[],tabs=[];
  function load(img,name){
    var names=alt[name]||[name],list=[];
    bases.forEach(function(b){names.forEach(function(nm){exts.forEach(function(x){list.push(b+encodeURIComponent(nm)+'.'+x)})})});
    var t=0;
    img.onerror=function(){t++;if(t<list.length)img.src=list[t];else img.style.visibility='hidden'};
    img.src=list[0];
  }
  slides.forEach(function(s,k){
    load(s.querySelector('img'),s.getAttribute('data-img'));
    var d=document.createElement('button');d.type='button';d.setAttribute('role','tab');d.setAttribute('aria-label','Go to hobby '+(k+1));
    d.addEventListener('click',function(){go(k)});dotsEl.appendChild(d);dots.push(d);
    var b=document.createElement('button');b.type='button';b.className='htab';b.textContent=s.getAttribute('data-tab');
    b.addEventListener('click',function(){go(k)});tabsEl.appendChild(b);tabs.push(b);
  });
  function go(k){
    i=(k+n)%n;track.style.transform='translateX(-'+(i*100)+'%)';
    slides.forEach(function(s,m){s.classList.toggle('on',m===i);s.setAttribute('aria-hidden',m===i?'false':'true')});
    dots.forEach(function(d,m){d.classList.toggle('on',m===i);d.setAttribute('aria-selected',m===i?'true':'false')});
    tabs.forEach(function(b,m){b.classList.toggle('on',m===i);b.setAttribute('aria-pressed',m===i?'true':'false')});
  }
  document.getElementById('hPrev').addEventListener('click',function(){go(i-1)});
  document.getElementById('hNext').addEventListener('click',function(){go(i+1)});
  car.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')go(i-1);else if(e.key==='ArrowRight')go(i+1)});
  var x0=null;
  car.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  car.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>45)go(dx<0?i+1:i-1);x0=null});
  go(0);
})();

/* moments I treasure: photo stacks + swipeable gallery */
(function(){
  var BASE='images/moments-sevsev/';
  var EXTS=['jpg','jpeg','png','webp','JPG','JPEG','PNG'];
  var GROUPS=[['family','Family','#F8DDE9','#EFA2C1'],['friends','Friends','#e9e0fa','#B8A3E8'],['bf','Boyfriend','#ffe9c2','#F4B94D'],['me','Me','#d9f1e3','#a8e0bd'],['random','Random','#ffd9c9','#F8DDE9']];
  /* Photos are found automatically when named 1.jpg, 2.jpg, 3.jpg... inside each folder.
     To use your own file names instead, list them here, e.g. FILES.family=['mama.jpg','lunch.jpg']; */
  var FILES={};
  var CAM='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
  var $=function(i){return document.getElementById(i)};
  if(!$('mStacks'))return;
  var photos={},cur='all',list=[],pos=0,opener=null,x0=null,moved=false;
  GROUPS.forEach(function(g){photos[g[0]]=[]});
  function all(){var a=[];GROUPS.forEach(function(g){photos[g[0]].forEach(function(u){a.push({g:g[0],n:g[1],u:u})})});return a}
  function count(k){return k==='all'?all().length:photos[k].length}
  function bg(u){return u?'background-image:url(&quot;'+encodeURI(u)+'&quot;)':''}
  function stacks(){
    $('mStacks').innerHTML=GROUPS.map(function(g){
      var p=photos[g[0]],n=p.length;
      return '<button class="mstack" type="button" data-c="'+g[0]+'" style="--a:'+g[2]+';--b:'+g[3]+'"><span class="mfan"><i style="--r:-8deg;--x:-10px;'+bg(p[2])+'"></i><i style="--r:7deg;--x:10px;'+bg(p[1])+'"></i><i style="--r:-1deg;--x:0px;'+bg(p[0])+'">'+(p[0]?'':CAM)+'</i></span><b>'+g[1]+'</b><small>'+(n?n+(n===1?' photo':' photos'):'No photos yet')+'</small></button>';
    }).join('');
  }
  var T=[['all','All photos']].concat(GROUPS.map(function(g){return [g[0],g[1]]}));
  $('mTxt').innerHTML=T.map(function(t){return '<button type="button" data-c="'+t[0]+'">'+t[1]+'</button>'}).join('');
  function tabs(){$('mTabs').innerHTML=T.map(function(t){return '<button type="button" role="tab" data-c="'+t[0]+'" class="'+(t[0]===cur?'on':'')+'" aria-selected="'+(t[0]===cur)+'">'+t[1]+' ('+count(t[0])+')</button>'}).join('')}
  function label(k){return T.filter(function(t){return t[0]===k})[0][1]}
  function grid(){
    list=all().filter(function(p){return cur==='all'||p.g===cur});pos=0;
    $('mGrid').innerHTML=list.length?list.map(function(p,i){return '<button class="mth" type="button" data-i="'+i+'" style="--i:'+i+'" aria-label="Open '+p.n+' photo '+(i+1)+' of '+list.length+'"><img src="'+encodeURI(p.u)+'" alt="" draggable="false" loading="lazy"></button>'}).join(''):'<p class="mempty" style="grid-column:1/-1">No photos here yet.</p>';
    $('mGrid').scrollTop=0;
  }
  function stage(){
    $('mStage').innerHTML=list.map(function(p,i){return '<figure class="msl"><span class="mtape"></span><img src="'+encodeURI(p.u)+'" alt="'+p.n+' photo '+(i+1)+'" draggable="false"></figure>'}).join('');
  }
  function one(i){pos=i;stage();place();$('mBackT').textContent=label(cur);$('mGal').classList.add('one');$('mBack').focus()}
  function back(){var p=pos;$('mGal').classList.remove('one');var t=$('mGrid').children[p];if(t&&t.classList.contains('mth')){t.focus();t.scrollIntoView({block:'nearest'})}}
  function place(){
    [].forEach.call($('mStage').querySelectorAll('.msl'),function(el,i){
      var d=i-pos,a=Math.abs(d);
      el.style.setProperty('--d',d);el.style.setProperty('--a',Math.min(a,3));el.style.setProperty('--z',10-a);
      el.classList.toggle('far',a>2);el.dataset.i=i;
    });
    $('mCnt').textContent=(pos+1)+' / '+list.length;
  }
  function go(n){if(!list.length)return;pos=Math.max(0,Math.min(list.length-1,n));place()}
  function open(k,from){cur=k;opener=from||null;$('mGal').classList.remove('one');tabs();grid();$('mLb').classList.add('on');$('mLb').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('mX').focus()}
  function close(){$('mLb').classList.remove('on');$('mGal').classList.remove('one');$('mLb').setAttribute('aria-hidden','true');document.body.style.overflow='';if(opener)opener.focus()}
  document.addEventListener('click',function(e){var b=e.target.closest('.mstack,.mtxt button');if(b)open(b.dataset.c,b)});
  $('mTabs').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;cur=b.dataset.c;tabs();grid()});
  $('mGrid').addEventListener('click',function(e){var t=e.target.closest('.mth');if(t)one(+t.dataset.i)});
  $('mBack').onclick=back;$('mX').onclick=close;$('mPv').onclick=function(){go(pos-1)};$('mNx').onclick=function(){go(pos+1)};
  $('mLb').addEventListener('click',function(e){if(e.target===$('mLb'))close()});
  $('mStage').addEventListener('click',function(e){var s=e.target.closest('.msl');if(s&&!moved)go(+s.dataset.i)});
  document.addEventListener('keydown',function(e){if(!$('mLb').classList.contains('on'))return;var v=$('mGal').classList.contains('one');if(e.key==='Escape'){v?back():close()}else if(v&&e.key==='ArrowLeft')go(pos-1);else if(v&&e.key==='ArrowRight')go(pos+1)});
  $('mStage').addEventListener('pointerdown',function(e){x0=e.clientX;moved=false});
  $('mStage').addEventListener('pointermove',function(e){if(x0!==null&&Math.abs(e.clientX-x0)>8)moved=true});
  window.addEventListener('pointerup',function(e){if(x0===null)return;var dx=e.clientX-x0;x0=null;if(Math.abs(dx)>45)go(dx<0?pos+1:pos-1);setTimeout(function(){moved=false},0)});
  function loads(u){return new Promise(function(r){var im=new Image();im.onload=function(){r(true)};im.onerror=function(){r(false)};im.src=encodeURI(u)})}
  function findN(g,n){var i=0;function next(){if(i>=EXTS.length)return Promise.resolve(null);var u=BASE+g+'/'+n+'.'+EXTS[i++];return loads(u).then(function(ok){return ok?u:next()})}return next()}
  function scan(g){
    if(FILES[g]&&FILES[g].length)return Promise.resolve(FILES[g].map(function(f){return BASE+g+'/'+f}));
    var out=[];function step(n){if(n>60)return Promise.resolve(out);return findN(g,n).then(function(u){if(!u)return out;out.push(u);return step(n+1)})}
    return step(1);
  }
  stacks();
  Promise.all(GROUPS.map(function(g){return scan(g[0])})).then(function(r){
    GROUPS.forEach(function(g,i){photos[g[0]]=r[i]});stacks();
    if($('mLb').classList.contains('on')){$('mGal').classList.remove('one');tabs();grid()}
  });
})();
