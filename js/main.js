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
})();
