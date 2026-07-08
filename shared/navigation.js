/**
 * Shared navigation & UX utilities for all design options
 */
(function () {
  'use strict';

  function initNavigation() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');

    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 60);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open);
        header.classList.toggle('menu-open', open);
        document.body.classList.toggle('nav-open', open);
      });

      nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          header.classList.remove('menu-open');
          document.body.classList.remove('nav-open');
        });
      });
    }
  }

  function initLazyImages() {
    document.querySelectorAll('img[data-src]').forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  function initVideoFallbacks() {
    document.querySelectorAll('.video-bg').forEach((wrap) => {
      const iframe = wrap.querySelector('iframe');
      const poster = wrap.querySelector('.video-bg__poster');
      if (!iframe || !poster) return;

      iframe.addEventListener('error', () => {
        iframe.style.display = 'none';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initLazyImages();
    initVideoFallbacks();
  });
})();
