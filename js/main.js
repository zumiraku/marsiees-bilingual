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

  var form = document.getElementById('contactForm');
  if (form) {
    var inputs = form.querySelectorAll('[required]');

    function check(input) {
      var field = input.closest('.field');
      var error = field.querySelector('.field__error');
      var valid = input.checkValidity();
      field.classList.toggle('is-error', !valid);
      input.setAttribute('aria-invalid', String(!valid));
      if (valid) {
        if (error) error.remove();
        return true;
      }
      if (!error) {
        error = document.createElement('p');
        error.className = 'field__error';
        error.id = input.name + '-error';
        input.setAttribute('aria-describedby', error.id);
        field.appendChild(error);
      }
      if (input.type === 'checkbox') error.textContent = 'Please agree to the privacy policy.';
      else if (input.validity.typeMismatch) error.textContent = 'Please enter a valid email address.';
      else error.textContent = 'Please fill in this field.';
      return false;
    }

    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener(input.type === 'checkbox' ? 'change' : 'input', function () {
        if (input.closest('.field').classList.contains('is-error')) check(input);
      });
    });

    form.addEventListener('submit', function (e) {
      var firstInvalid = null;
      Array.prototype.forEach.call(inputs, function (input) {
        if (!check(input) && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        e.preventDefault();
        firstInvalid.focus();
        return;
      }
      if (!form.getAttribute('action')) {
        e.preventDefault();
        var status = document.getElementById('formStatus');
        status.textContent = 'This is a preview. The form will be connected when the page goes live, so this message was not sent.';
        status.hidden = false;
      }
    });
  }
})();
