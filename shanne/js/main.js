(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Welcome screen
  var loader = document.getElementById('loader');
  function hideLoader() { loader.classList.add('is-done'); document.body.style.overflow = ''; }
  if (reduce) { loader.remove(); } else {
    document.body.style.overflow = 'hidden';
    setTimeout(hideLoader, 2600);
  }

  // Mobile nav
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { links.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
  });

  // Active nav link
  var navLinks = [].slice.call(links.querySelectorAll('a')).filter(function (a) { return a.getAttribute('href').charAt(0) === '#'; });
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function setActive() {
    var y = window.scrollY + window.innerHeight * 0.35, cur = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) cur = i; });
    navLinks.forEach(function (a, i) { a.classList.toggle('is-active', i === cur); });
  }
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  // Scroll reveal
  var targets = document.querySelectorAll('.about__main > *, .about__photo, .stat, .story > *, .info__card, .interests, .showcase .display, .showcase__sub, .tabs, .contact .wrap > *, .panelbox');
  targets.forEach(function (el, i) { el.classList.add('reveal'); el.style.setProperty('--d', (i % 4) * 0.08 + 's'); });
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  } else { targets.forEach(function (el) { el.classList.add('is-in'); }); }

  // Tabs
  var tabs = [].slice.call(document.querySelectorAll('.tab'));
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      var n = e.key === 'ArrowRight' ? (i + 1) % tabs.length : e.key === 'ArrowLeft' ? (i + tabs.length - 1) % tabs.length : -1;
      if (n > -1) { e.preventDefault(); tabs[n].focus(); select(tabs[n]); }
    });
  });

  // Certificate lightbox
  var lb = document.getElementById('lightbox');
  document.getElementById('certOpen').addEventListener('click', function () { lb.hidden = false; document.getElementById('lbClose').focus(); });
  function closeLb() { lb.hidden = true; }
  document.getElementById('lbClose').addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  // Contact form: opens the visitor's email app (no backend)
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim(), email = form.email.value.trim(), msg = form.message.value.trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) {
      note.textContent = 'Please enter your name, a valid email, and a message.';
      note.classList.add('is-error'); return;
    }
    note.classList.remove('is-error');
    var subject = form.subject.value.trim() || 'Portfolio message from ' + name;
    var body = msg + '\n\n' + name + '\n' + email;
    window.location.href = 'mailto:ramirezshanne05@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    note.textContent = 'If your email app did not open, write to ramirezshanne05@gmail.com directly.';
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();

// Sidebar
(function () {
  'use strict';
  var sb = document.getElementById('sidebar');
  if (!sb) return;
  var toggle = document.getElementById('sbToggle');
  var search = document.getElementById('sbSearch');
  var list = document.getElementById('sbList');
  var items = [].slice.call(list.querySelectorAll('li'));
  var anchors = [].slice.call(list.querySelectorAll('a'));

  function setCollapsed(c, save) {
    document.body.classList.toggle('sb-collapsed', c);
    toggle.setAttribute('aria-expanded', String(!c));
    toggle.setAttribute('aria-label', c ? 'Expand sidebar' : 'Collapse sidebar');
    if (save) { try { localStorage.setItem('sb-collapsed', c ? '1' : '0'); } catch (e) {} }
  }
  var saved = null;
  try { saved = localStorage.getItem('sb-collapsed'); } catch (e) {}
  setCollapsed(saved === '1', false);
  toggle.addEventListener('click', function () { setCollapsed(!document.body.classList.contains('sb-collapsed'), true); });
  document.getElementById('sbSearchBox').addEventListener('click', function () {
    if (document.body.classList.contains('sb-collapsed')) { setCollapsed(false, true); }
    search.focus();
  });

  // Search filter
  var none = document.getElementById('sbNone');
  function filter() {
    var q = search.value.trim().toLowerCase(), shown = 0;
    items.forEach(function (li) {
      var hit = !q || li.textContent.toLowerCase().indexOf(q) > -1;
      li.hidden = !hit; if (hit) shown++;
    });
    none.hidden = shown > 0;
  }
  search.addEventListener('input', filter);
  search.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { var first = items.filter(function (li) { return !li.hidden; })[0]; if (first) first.querySelector('a').click(); }
    if (e.key === 'Escape') { search.value = ''; filter(); search.blur(); }
  });

  // Active item: section by scroll position, portfolio sub-items by selected tab
  var sectionIds = ['home', 'about', 'portfolio', 'contact'];
  function currentTabId() { var t = document.querySelector('.tab.is-active'); return t ? t.id : 'tab-projects'; }
  function update() {
    var y = window.scrollY + window.innerHeight * 0.35, cur = 'home';
    sectionIds.forEach(function (id) { var el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; });
    var key = cur === 'portfolio' ? currentTabId() : cur;
    anchors.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('data-spy') === key); });
  }
  window.addEventListener('scroll', update, { passive: true });
  document.querySelectorAll('.tab').forEach(function (t) { t.addEventListener('click', function () { setTimeout(update, 0); }); });
  update();

  // Tab items open the matching Portfolio tab
  anchors.forEach(function (a) {
    a.addEventListener('click', function () {
      var tab = a.getAttribute('data-tab');
      if (tab) { document.getElementById(tab).click(); }
      setTimeout(update, 50);
    });
  });
})();
