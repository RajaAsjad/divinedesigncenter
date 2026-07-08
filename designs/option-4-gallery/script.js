/**
 * Option 4 — contact form tabs & hash deep-linking
 */
(function () {
  'use strict';

  const TAB_MAP = {
    'contact-call': { tab: 'contact-call', value: 'intro-call' },
    'contact-showroom': { tab: 'contact-showroom', value: 'showroom' },
    'contact-lookbook': { tab: 'contact-lookbook', value: 'lookbook' },
    'contact-email': { tab: 'contact-email', value: 'email' },
  };

  function activateTab(tabId) {
    const config = TAB_MAP[tabId];
    if (!config) return;

    document.querySelectorAll('.form-tab').forEach((btn) => {
      const active = btn.id === config.tab;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active);
    });

    const hidden = document.getElementById('inquiryType');
    if (hidden) hidden.value = config.value;
  }

  document.querySelectorAll('.form-tab').forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.id));
  });

  function handleHash() {
    const hash = window.location.hash.replace('#', '');
    if (TAB_MAP[hash]) {
      activateTab(hash);
      const contact = document.getElementById('contact');
      if (contact) {
        setTimeout(() => contact.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }

  window.addEventListener('hashchange', handleHash);
  document.addEventListener('DOMContentLoaded', handleHash);

  document.querySelector('.contact__form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.contact__submit');
    if (btn) {
      btn.textContent = 'Thank you. We\'ll be in touch soon.';
      btn.disabled = true;
    }
  });
})();
