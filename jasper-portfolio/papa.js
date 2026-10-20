/* Jasper's portfolio: navigation, reveal animations, project details dialog */
(function () {
  'use strict';

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.getElementById('nav-links');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    links.classList.toggle('is-open', open);
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav')) setMenu(false);
  });

  /* ---------- highlight the current section in the nav ---------- */
  var navLinks = Array.prototype.slice.call(links.querySelectorAll('a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);
  // "languages" sits between Skills and Projects; it belongs under Skills.
  var languages = document.getElementById('languages');

  function updateActive() {
    var y = window.scrollY + window.innerHeight * 0.35;
    var current = sections[0];
    sections.forEach(function (s) { if (s.offsetTop <= y) current = s; });
    if (languages && current && current.id === 'skills' && languages.offsetTop <= y) current = document.getElementById('skills');
    navLinks.forEach(function (a) {
      var on = current && a.getAttribute('href') === '#' + current.id;
      a.classList.toggle('is-active', !!on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () { updateActive(); ticking = false; });
    }
  }, { passive: true });
  window.addEventListener('resize', updateActive);
  updateActive();

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (document.documentElement.classList.contains('reveal-on') && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el, i) {
      // small stagger for siblings in the same card row
      el.style.transitionDelay = (i % 3) * 80 + 'ms';
      io.observe(el);
    });
  }

  /* ---------- project details dialog ---------- */
  var modal = document.getElementById('project-modal');
  var body = document.getElementById('modal-body');
  var closeBtn = modal.querySelector('.modal__close');
  var lastTrigger = null;

  document.querySelectorAll('[data-detail]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tpl = document.getElementById(btn.getAttribute('data-detail'));
      if (!tpl) return;
      body.innerHTML = '';
      body.appendChild(tpl.content.cloneNode(true));
      var h = body.querySelector('h3');
      if (h) h.id = 'modal-heading';
      lastTrigger = btn;
      if (typeof modal.showModal === 'function') modal.showModal();
      else modal.setAttribute('open', '');
      closeBtn.focus();
    });
  });

  function closeModal() {
    if (typeof modal.close === 'function') modal.close();
    else modal.removeAttribute('open');
    if (lastTrigger) lastTrigger.focus();
  }
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    // click on the dimmed backdrop (the dialog element itself) closes it
    if (e.target === modal) closeModal();
  });
  modal.addEventListener('close', function () {
    if (lastTrigger) lastTrigger.focus();
  });
})();
