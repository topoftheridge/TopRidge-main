// ---- Nav scroll effect ----
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Mobile nav toggle ----
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  const isOpen = links.classList.toggle('open');
  toggle.classList.toggle('active');
  if (isOpen) lockScroll(); else unlockScroll();
});

// Close mobile menu when clicking a non-dropdown link
links.querySelectorAll('a').forEach(a => {
  if (!a.classList.contains('nav-dropdown-toggle')) {
    a.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
      unlockScroll();
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
    });
  }
});

// Mobile dropdown toggle (tap to expand/collapse)
document.querySelectorAll('.nav-dropdown-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      btn.closest('.nav-dropdown').classList.toggle('open');
    }
  });
});

// Lock body scroll when mobile menu is open
const lockScroll = () => document.body.style.overflow = 'hidden';
const unlockScroll = () => document.body.style.overflow = '';

// ---- Scroll reveal ----
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-up to animatable elements
document.querySelectorAll(
  '.approach-card, .system-card, .process-step, .result-card, .section-header, .cta-content'
).forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Form handling ----
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button');
  btn.textContent = 'Sent — We\'ll be in touch.';
  btn.disabled = true;
  btn.style.opacity = '0.6';
});
