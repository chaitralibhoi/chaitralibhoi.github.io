// small helpers: set year, reveal on scroll, smooth scroll
document.addEventListener('DOMContentLoaded', function () {
  // year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
        history.replaceState(null, '', href);
      }
    });
  });

  // reveal on scroll using IntersectionObserver
  const revealEls = document.querySelectorAll('.reveal');
  const revealSectionEls = document.querySelectorAll('.reveal-section');

  const obs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(entry.target.classList.contains('reveal-section') ? 'revealed-section' : 'revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  revealEls.forEach(el => obs.observe(el));
  revealSectionEls.forEach(el => obs.observe(el));
});
