// Marquee text (duplicated for seamless loop)
const words = ['VB.NET','PYTHON','VB.NET','PYTHON'];
const track = document.getElementById('track');
const html = words.map(w => '<span>' + w + '</span>').join('');
track.innerHTML = html + html;

// Project "Read more"
document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.project');
    const open = card.classList.toggle('open');
    btn.textContent = open ? 'Show less' : 'Read more';
    btn.setAttribute('aria-expanded', open);
  });
});

// Copy email
const copyBtn = document.getElementById('copy');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('Francisjuan251@gmail.com');
    copyBtn.textContent = 'Copied';
  } catch (e) {
    copyBtn.textContent = 'Copy failed';
  }
  setTimeout(() => copyBtn.textContent = 'Copy email', 1800);
});

document.getElementById('year').textContent = new Date().getFullYear();

// Click-to-zoom: every card, project and tag opens with the same zoom animation
(function(){
  const SEL = '.tag, .card, .hero-card, .project, .contact';
  const DUR = 300;
  let open = null;

  document.querySelectorAll(SEL).forEach(el => {
    el.classList.add('zoomable');
    el.tabIndex = 0;
  });

  function place(clone, src){
    const f = clone.getBoundingClientRect();
    const r = src.getBoundingClientRect();
    const s = Math.min(r.width / f.width, 1);
    const dx = (r.left + r.width/2) - (f.left + f.width/2);
    const dy = (r.top + r.height/2) - (f.top + f.height/2);
    clone.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')';
  }

  function openZoom(src){
    if (open) return;
    const backdrop = document.createElement('div');
    backdrop.className = 'zoom-backdrop';
    let clone;
    if (src.dataset.desc) {
      clone = document.createElement('div');
      clone.className = 'zoom-detail';
      const bar = document.createElement('span'); bar.className = 'bar';
      const h = document.createElement('h3'); h.textContent = src.dataset.title || src.textContent;
      const p = document.createElement('p'); p.textContent = src.dataset.desc;
      if (src.dataset.img) {
        clone.classList.add('has-img');
        const pic = document.createElement('img');
        pic.className = 'detail-pic'; pic.src = src.dataset.img; pic.alt = src.dataset.alt || '';
        const body = document.createElement('div'); body.className = 'detail-body';
        body.append(bar, h, p);
        clone.append(pic, body);
      } else {
        clone.append(bar, h, p);
      }
    } else {
      clone = src.cloneNode(true);
    }
    clone.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
    clone.removeAttribute('id'); clone.removeAttribute('tabindex');
    clone.classList.remove('zoomable','reveal','in');
    clone.querySelectorAll('.reveal').forEach(n => n.classList.remove('reveal','in'));
    clone.style.removeProperty('--d');
    clone.classList.add('zoom-clone');
    if (src.classList.contains('tag') && !src.dataset.desc) clone.classList.add('is-tag');
    clone.setAttribute('role','dialog'); clone.setAttribute('aria-modal','true');
    const close = document.createElement('button');
    close.className = 'btn zoom-close'; close.textContent = 'Close';
    document.body.append(backdrop, clone, close);
    document.body.classList.add('zoom-open');
    place(clone, src);
    clone.getBoundingClientRect();           // force reflow
    requestAnimationFrame(() => {
      clone.style.transform = 'none';
      backdrop.classList.add('show'); close.classList.add('show');
    });
    open = {src, clone, backdrop, close};
    close.focus({preventScroll:true});
    backdrop.addEventListener('click', closeZoom);
    close.addEventListener('click', closeZoom);
  }

  function closeZoom(){
    if (!open) return;
    const {src, clone, backdrop, close} = open; open = null;
    place(clone, src);
    backdrop.classList.remove('show'); close.classList.remove('show');
    setTimeout(() => {
      clone.remove(); backdrop.remove(); close.remove();
      document.body.classList.remove('zoom-open');
      src.focus({preventScroll:true});
    }, DUR);
  }

  document.addEventListener('click', e => {
    if (open || e.target.closest('a, button, nav')) return;
    const t = e.target.closest(SEL);
    if (t) openZoom(t);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeZoom();
    else if (e.key === 'Enter' && !open && e.target.matches && e.target.matches(SEL)) openZoom(e.target);
  });
})();
// Scroll reveal: same animation for every header and block, every time you scroll
(function(){
  const TARGETS = '.hero-card, .role, .hero h1, .meta, h2, .marquee, section .card, .project, .contact, footer';
  const els = [...document.querySelectorAll(TARGETS)].filter(el => !el.closest('.contact') || el.matches('.contact'));
  const counts = new Map();
  els.forEach(el => {
    el.classList.add('reveal');
    const p = el.parentElement;
    const n = counts.get(p) || 0;
    counts.set(p, n + 1);
    el.style.setProperty('--d', Math.min(n * 0.14, 0.7) + 's');
  });
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  // plays every time the block enters the screen (scroll down or up); resets once it is fully out of view
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting && en.intersectionRatio >= 0.15) en.target.classList.add('in');
      else if (en.intersectionRatio === 0) en.target.classList.remove('in');
    });
  }, {threshold: [0, 0.15]});
  els.forEach(el => io.observe(el));
})();
