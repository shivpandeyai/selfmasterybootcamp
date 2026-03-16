/* ===== Self Mastery Bootcamp — Premium Interactions v2 ===== */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Sticky Nav Shadow & Background --- */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  const handleScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    lastScroll = y;
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* --- Mobile Nav Toggle --- */
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* --- FAQ Accordion with smooth animation --- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // close all open items with animation
      document.querySelectorAll('.faq-q').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const a = b.nextElementSibling;
        if (a) a.style.maxHeight = null;
      });
      // open the clicked one if it was closed
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        const answer = btn.nextElementSibling;
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* --- Scroll Fade-Up Animation with stagger --- */
  const faders = document.querySelectorAll('.fade-up');
  const observerOpts = { threshold: 0.1, rootMargin: '0px 0px -30px 0px' };
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObserver.unobserve(e.target);
      }
    });
  }, observerOpts);
  faders.forEach(el => fadeObserver.observe(el));

  /* --- Active Nav Highlighting --- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navItems.forEach(a => {
      const isActive = a.getAttribute('href') === '#' + current;
      a.style.color = isActive ? '#fff' : '';
      // also activate the underline
      const after = a.querySelector('::after');
      if (isActive) { a.classList.add('nav-active'); }
      else { a.classList.remove('nav-active'); }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* --- Smooth offset scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
