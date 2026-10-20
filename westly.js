const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    navItems.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

// Update active navigation item while scrolling.
const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => sectionObserver.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();

// Typing effect for the short introduction in the hero section.
const intro = document.querySelector('.hero-intro');
if (intro) {
  const message = 'I create clean, modern, user-friendly designs.';
  const caret = intro.querySelector('.typing-caret');
  intro.textContent = '';
  if (caret) intro.appendChild(caret);
  let index = 0;
  const typeNext = () => {
    if (index < message.length) {
      intro.insertBefore(document.createTextNode(message.charAt(index)), caret || null);
      index += 1;
      window.setTimeout(typeNext, 42);
    }
  };
  window.setTimeout(typeNext, 500);
}
