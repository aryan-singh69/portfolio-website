/* ═══════════════════════════════════════════════════════
   Aryan Singh — Portfolio Script
   Scroll reveal, nav tracking, marquee
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── SCROLL REVEAL ───
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('is-visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // ─── FLOATING NAV — active state tracking ───
  const navPills = document.querySelectorAll('.nav-pill');
  const sections = [];

  navPills.forEach(pill => {
    const sectionId = pill.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    if (section) sections.push({ el: section, pill: pill, id: sectionId });
  });

  function updateActiveNav() {
    const scrollY = window.scrollY + window.innerHeight * 0.35;

    let currentSection = sections[0];
    for (const sec of sections) {
      if (sec.el.offsetTop <= scrollY) {
        currentSection = sec;
      }
    }

    navPills.forEach(p => p.classList.remove('active'));
    if (currentSection) currentSection.pill.classList.add('active');
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ─── SMOOTH SCROLL for nav pills ───
  navPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const href = pill.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── HERO PARALLAX — subtle fade on scroll ───
  const hero = document.querySelector('.hero');
  if (hero) {
    const heroContent = hero.querySelector('.hero-content');
    const heroImage = hero.querySelector('.hero-image-wrap');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / vh, 1);

      if (heroContent) {
        heroContent.style.opacity = Math.max(1 - progress * 1.5, 0);
        heroContent.style.transform = `translateY(${progress * 40}px)`;
      }
      if (heroImage) {
        heroImage.style.opacity = Math.max(1 - progress * 1.5, 0);
        heroImage.style.transform = `translateY(${progress * 25}px)`;
      }
    }, { passive: true });
  }

})();
