/* Travel — premium interactions */
(function () {
  const header = document.querySelector('.header');
  const reveals = document.querySelectorAll('.reveal, .reveal-stagger');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('header--solid', window.scrollY > 60);
  }

  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  window.toggleMenu = function toggleMenu() {
    const nav = document.querySelector('.header nav');
    const toggleButton = document.querySelector('.menu-toggle');
    if (!nav || !toggleButton) return;
    nav.classList.toggle('open');
    document.body.classList.toggle('menu-open', nav.classList.contains('open'));
    const icon = toggleButton.querySelector('i');
    if (!icon) return;
    if (nav.classList.contains('open')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  };

  if (!document.body.classList.contains('page-home') && header) {
    header.classList.add('header--solid');
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  initReveal();

  /* Stagger children inside reveal-stagger */
  document.querySelectorAll('.reveal-stagger').forEach((parent) => {
    parent.querySelectorAll('.reveal-child').forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
    });
  });
})();
