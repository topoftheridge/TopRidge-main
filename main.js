// ---- Nav scroll effect ----
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ---- Mobile nav toggle ----
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(a => {
    if (!a.classList.contains('nav-dropdown-toggle')) {
      a.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
        document.body.style.overflow = '';
        document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
      });
    }
  });

  document.querySelectorAll('.nav-dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        btn.closest('.nav-dropdown').classList.toggle('open');
      }
    });
  });
}

// ---- Scroll reveal ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.approach-card, .system-card, .process-step, .process-step-item, .section-header, .cta-content, .outcome-item, .pricing-card, .pn-card, .pn-step, .pn-service-card, .pn-benefit'
).forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 6) * 0.06}s`;
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

// ---- Contact form handling ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    btn.textContent = 'Sent — We\'ll be in touch.';
    btn.disabled = true;
    btn.style.opacity = '0.6';
  });
}
