/* =========================================================
   BOOT INTRO  (separate block, independent of the code below)
   Runs once per page load. Does nothing if #bootIntro is missing.
========================================================= */
(function () {
  'use strict';
  var intro = document.getElementById('bootIntro');
  if (!intro) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DURATION = reduce ? 1200 : 3600;   /* progress time (ms) */
  var READY_HOLD = reduce ? 150 : 450;   /* pause on READY before exit */
  var EXIT_MS = reduce ? 320 : 880;

  var msgEl = document.getElementById('bootMsg');
  var fill = document.getElementById('bootFill');
  var l1 = document.getElementById('bootLine1');
  var l2 = document.getElementById('bootLine2');
  var state = document.getElementById('bootState');

  /* Make the page behind the overlay unreachable by keyboard / screen readers */
  var behind = Array.prototype.filter.call(document.body.children, function (el) {
    return el !== intro && el.tagName !== 'SCRIPT';
  });
  behind.forEach(function (el) { el.setAttribute('inert', ''); });

  var stages = [
    { at: 0,   text: 'INITIALIZING' },
    { at: 0.22, text: 'LOADING ASSETS' },
    { at: 0.52, text: 'COMPILING' },
    { at: 0.86, text: 'READY' }
  ];
  var HEX = '0123456789ABCDEF';
  function hex() {
    var s = '0x';
    for (var i = 0; i < 8; i++) s += HEX.charAt((Math.random() * 16) | 0);
    return s;
  }
  function pad3(n) { return ('00' + n).slice(-3); }

  /* Eased progress with a few small "stalls" so it feels like real work */
  function curve(t) {
    var e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    return Math.min(1, Math.max(0, .55 * e + .45 * t));
  }

  var start = null, current = '', finished = false, lastHex = 0;

  function frame(now) {
    if (start === null) start = now;
    var t = Math.min(1, (now - start) / DURATION);
    var p = curve(t);
    var pct = Math.round(p * 100);

    fill.style.width = (p * 100) + '%';

    for (var i = stages.length - 1; i >= 0; i--) {
      if (p >= stages[i].at) { if (stages[i].text !== current) { current = stages[i].text; msgEl.textContent = current; } break; }
    }

    if (pct < 100) {
      l1.innerHTML = '&gt;&gt; SYS.MEM.ALLOCATING&nbsp; [' + pad3(pct) + '%]';
      if (now - lastHex > 90) { l2.textContent = '>> ' + hex() + ' ...'; lastHex = now; }
    } else {
      l1.innerHTML = '&gt;&gt; SYS.MEM.READY&nbsp; [100%]&nbsp; [OK]';
      l2.textContent = '>> BOOT SEQUENCE COMPLETE.';
      state.textContent = 'ONLINE';
    }

    if (t < 1) { requestAnimationFrame(frame); }
    else { setTimeout(leave, READY_HOLD); }
  }

  function leave() {
    if (finished) return;
    finished = true;
    intro.classList.add('is-leaving');
    var removed = false;
    function cleanup() {
      if (removed) return;
      removed = true;
      behind.forEach(function (el) { el.removeAttribute('inert'); });
      if (intro.parentNode) intro.parentNode.removeChild(intro);   /* also unlocks scrolling */
    }
    intro.addEventListener('transitionend', cleanup);
    setTimeout(cleanup, EXIT_MS + 150);   /* safety net so the overlay can never get stuck */
  }

  /* Optional: let visitors skip with Esc / Enter / Space */
  document.addEventListener('keydown', function skip(e) {
    if (finished) { document.removeEventListener('keydown', skip); return; }
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') leave();
  });

  requestAnimationFrame(frame);
  /* Absolute fallback in case rAF is throttled (hidden tab) */
  setTimeout(leave, DURATION + READY_HOLD + 2500);
})();

/* =========================================================
   MANDARAMBONG | Group Portfolio  -  script.js
   Menu, member + project pop-ups, project filters,
   contact form and scroll effects.
========================================================= */
(function () {
  'use strict';

  /* Put the team's email here to make the contact form open an email draft. */
  var TEAM_EMAIL = '';

  document.documentElement.classList.add('js');

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('#menuBtn');
  var mobileMenu = $('#mobileMenu');

  function setMenu(open) {
    if (!menuBtn || !mobileMenu) return;
    mobileMenu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? '✕' : '☰';
  }
  if (menuBtn && mobileMenu) {
    menuBtn.setAttribute('aria-controls', 'mobileMenu');
    menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.addEventListener('click', function () { setMenu(!mobileMenu.classList.contains('open')); });
    $$('a', mobileMenu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    window.addEventListener('resize', function () { if (window.innerWidth > 820) setMenu(false); });
  }

  /* ---------- Navbar: solid background + active link ---------- */
  var navbar = $('.navbar');
  var navLinks = $$('.navbar nav a, .mobile-menu a');
  var sections = ['home', 'members', 'projects', 'about', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function onScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
    var current = sections.length ? sections[0].id : '';
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= window.innerHeight * 0.35) current = s.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Modal helpers ---------- */
  var lastFocus = null;

  function openModal(modal) {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    var close = $('.close-modal', modal);
    if (close) close.focus();
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    if (!$('.modal.active')) document.body.classList.remove('modal-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $$('.modal').forEach(function (modal) {
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(modal); });
  });
  $$('.close-modal').forEach(function (btn) {
    btn.setAttribute('aria-label', 'Close');
    btn.addEventListener('click', function () { closeModal(btn.closest('.modal')); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') $$('.modal.active').forEach(closeModal);
  });

  function fillChips(el, text) {
    if (!el) return;
    el.innerHTML = '';
    el.classList.add('chips');
    String(text || '').split(',').forEach(function (item) {
      item = item.trim();
      if (!item) return;
      var chip = document.createElement('span');
      chip.textContent = item;
      el.appendChild(chip);
    });
  }

  /* ---------- Members: pop-up with details, link to each portfolio ---------- */
  var memberModal = $('#memberModal');

  function openMember(card) {
    var d = card.dataset;
    $('#modalName').textContent = d.name || '';
    $('#modalCourse').textContent = [d.course, d.year].filter(Boolean).join(' • ');
    $('#modalDescription').textContent = d.description || '';
    fillChips($('#modalSkills'), d.skills);
    fillChips($('#modalProjects'), d.projects);

    var photo = $('.modal-photo', memberModal);
    var img = $('img', card);
    photo.innerHTML = '';
    if (img) {
      var big = document.createElement('img');
      big.src = img.getAttribute('src');
      big.alt = d.name || '';
      photo.appendChild(big);
    } else {
      photo.textContent = 'PHOTO';
    }

    /* Add a button to the member's own portfolio page */
    var oldLink = $('.modal-portfolio-link', memberModal);
    if (oldLink) oldLink.remove();
    var link = $('a.view-profile[href], a[href$=".html"]', card);
    if (link) {
      var go = document.createElement('a');
      go.className = 'btn primary-btn modal-portfolio-link';
      go.href = link.getAttribute('href');
      go.textContent = 'Open full portfolio →';
      go.style.marginTop = '24px';
      $('.modal-info', memberModal).appendChild(go);
    }
    openModal(memberModal);
  }

  $$('.member-card').forEach(function (card) {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', function (e) {
      /* let "View Profile" / "View Portfolio" links navigate normally */
      if (e.target.closest('a, .view-profile')) return;
      openMember(card);
    });
    card.addEventListener('keydown', function (e) {
      if (e.target === card && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        openMember(card);
      }
    });
  });

  /* A <button> placed inside an <a> does not navigate in every browser; make it reliable. */
  $$('button.view-profile').forEach(function (btn) {
    var a = btn.closest('a');
    if (!a) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = a.getAttribute('href');
    });
  });

  /* ---------- Projects: filters + pop-up ---------- */
  var filterButtons = $$('.filter-btn');
  var projectCards = $$('.project-card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.filter;
      filterButtons.forEach(function (b) { b.classList.toggle('active', b === btn); });
      projectCards.forEach(function (card) {
        card.classList.toggle('hide', !(f === 'all' || card.dataset.category === f));
      });
    });
  });

  var projectModal = $('#projectModal');
  function openProject(card) {
    var d = card.dataset;
    var label = $('.project-image', card);
    $('.project-modal-image', projectModal).textContent = label ? label.textContent.trim() : 'PROJECT';
    $('#projectModalTitle').textContent = d.title || '';
    $('#projectModalDescription').textContent = d.description || '';
    fillChips($('#projectModalTechnologies'), d.technologies);
    $('#projectModalRole').textContent = d.role || '';
    openModal(projectModal);
  }
  projectCards.forEach(function (card) {
    card.addEventListener('click', function () { openProject(card); });
  });
  $$('.project-buttons .btn', projectModal).forEach(function (btn) {
    var original = btn.textContent;
    btn.addEventListener('click', function () {
      btn.textContent = 'Coming soon';
      setTimeout(function () { btn.textContent = original; }, 1600);
    });
  });

  /* ---------- Contact form ---------- */
  var form = $('#contactForm');
  var note = $('#formMessage');

  $$('.social-link[href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  if (form && note) {
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#name').value.trim();
      var email = $('#email').value.trim();
      var message = $('#message').value.trim();
      note.classList.remove('error');

      if (!name || !email || !message) {
        note.classList.add('error');
        note.textContent = 'Please fill in your name, email, and message.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.classList.add('error');
        note.textContent = 'Please enter a valid email address.';
        return;
      }
      if (TEAM_EMAIL) {
        var body = message + '\n\nFrom: ' + name + ' (' + email + ')';
        window.location.href = 'mailto:' + TEAM_EMAIL + '?subject=' +
          encodeURIComponent('Message from ' + name) + '&body=' + encodeURIComponent(body);
        note.textContent = 'Opening your email app…';
      } else {
        note.textContent = 'Thanks, ' + name + '! Your message is ready, but the team email is not connected to this form yet.';
      }
      form.reset();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealTargets = $$('.section-heading, .member-card, .project-card, .glass-box, .timeline-item, .project-filters');
  revealTargets.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.setProperty('--d', ((i % 4) * 0.07) + 's');
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }
})();
