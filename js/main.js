(function () {
  'use strict';

  var header = document.getElementById('header');
  var menuBtn = document.getElementById('menuBtn');
  var gnav = document.getElementById('gnav');
  var pagetop = document.querySelector('.pagetop');

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10);
    if (pagetop) pagetop.classList.toggle('is-show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    gnav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? menuBtn.dataset.close : menuBtn.dataset.open);
  }

  menuBtn.addEventListener('click', function () {
    setMenu(!gnav.classList.contains('is-open'));
  });

  gnav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  var slides = document.querySelectorAll('.hero__slide');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (slides.length > 1 && !reduceMotion) {
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 6000);
  }
})();
