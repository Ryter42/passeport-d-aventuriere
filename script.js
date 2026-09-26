/**
 * =====================================================================
 * SCRIPT PRINCIPAL DU PASSEPORT NUMÉRIQUE
 * =====================================================================
 * Chaque page affiche l'image entière (non rognée) dans un cadre avec
 * une légère bordure dorée, avec le numéro de page et la navigation en
 * overlay. Les champs title/description/links de activities.js sont
 * conservés dans la structure de données mais ne sont pas affichés.
 * =====================================================================
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const screenHome = document.getElementById('screen-home');
  const screenPassport = document.getElementById('screen-passport');
  const btnOpen = document.getElementById('btn-open');
  const btnHome = document.getElementById('btn-home');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const track = document.getElementById('pages-track');
  const progressText = document.getElementById('progress-text');
  const dotsWrap = document.getElementById('dots');
  const announcer = document.getElementById('sr-announcer');

  const total = activities.length;
  let current = 0;

  const HTML_ALLOWED_FIELDS = new Set(['subtitle', 'polaroidCaption', 'badgeNote']);

  function applyHomeTexts() {
    const cfg = (typeof PASSPORT_CONFIG !== 'undefined') ? PASSPORT_CONFIG.home : null;
    if (!cfg) return;
    const fields = ['kicker', 'title', 'titleScript', 'edition', 'subtitle', 'polaroidCaption', 'badgeLabel', 'badgeValue', 'badgeNote', 'openButton', 'footer'];
    fields.forEach((key) => {
      if (!cfg[key]) return;
      const el = document.querySelector('[data-i="' + key + '"]');
      if (!el) return;
      if (HTML_ALLOWED_FIELDS.has(key)) {
        el.innerHTML = cfg[key];
      } else {
        el.textContent = cfg[key];
      }
    });
  }

  function buildPages() {
    const frag = document.createDocumentFragment();

    activities.forEach((activity, index) => {
      const page = document.createElement('article');
      page.className = 'page';
      page.setAttribute('role', 'group');
      page.setAttribute('aria-roledescription', 'page du passeport');
      page.setAttribute('aria-label', 'Page ' + (index + 1) + ' sur ' + total);
      page.id = 'page-' + (index + 1);

      const frame = document.createElement('div');
      frame.className = 'page-image-frame';
      const img = document.createElement('img');
      img.src = activity.image;
      img.alt = activity.alt || (activity.title ? activity.title : ('Photo ' + (index + 1)));
      img.loading = index === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.width = 1200;
      img.height = 1500;
      frame.appendChild(img);
      page.appendChild(frame);

      if (activity.stamp) {
        const stamp = document.createElement('span');
        stamp.className = 'page-stamp';
        stamp.setAttribute('aria-hidden', 'true');
        stamp.textContent = activity.stamp;
        page.appendChild(stamp);
      }

      if (index === total - 1) {
        const restartBtn = document.createElement('button');
        restartBtn.type = 'button';
        restartBtn.className = 'page-restart';
        const label = (typeof PASSPORT_CONFIG !== 'undefined' && PASSPORT_CONFIG.restartButtonLabel)
          ? PASSPORT_CONFIG.restartButtonLabel : 'Recommencer';
        restartBtn.setAttribute('aria-label', label);
        restartBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 10a8 8 0 0 0-14.6-4.6M4 14a8 8 0 0 0 14.6 4.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span>' + escapeHtml(label) + '</span>';
        restartBtn.addEventListener('click', () => goTo(0));
        page.appendChild(restartBtn);
      }

      frag.appendChild(page);
    });

    track.appendChild(frag);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function buildDots() {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' is-active' : '');
      frag.appendChild(dot);
    }
    dotsWrap.appendChild(frag);
  }

  function updateDots() {
    const dots = dotsWrap.querySelectorAll('.dot');
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
  }

  function updateUI(animate) {
    const offset = -current * 100;
    track.style.transition = animate && !prefersReducedMotion
      ? 'transform 440ms cubic-bezier(0.22,1,0.36,1)'
      : 'none';
    track.style.transform = 'translateX(' + offset + '%)';

    progressText.textContent = (current + 1) + ' / ' + total;
    updateDots();

    btnPrev.disabled = current === 0;
    btnNext.disabled = current === total - 1;
    btnNext.setAttribute('aria-label', current === total - 1 ? 'Dernière page' : 'Page suivante');

    announcer.textContent = 'Page ' + (current + 1) + ' sur ' + total;

    preloadNeighbors();
  }

  function preloadNeighbors() {
    [current - 1, current + 1].forEach((idx) => {
      if (idx >= 0 && idx < total) {
        const img = document.querySelector('#page-' + (idx + 1) + ' img');
        if (img && img.loading === 'lazy') img.loading = 'eager';
      }
    });
  }

  function goTo(index, opts) {
    opts = opts || {};
    if (index < 0 || index > total - 1) return;
    if (index === current && !opts.force) return;
    current = index;
    updateUI(opts.animate !== false);
  }

  function next() { if (current < total - 1) goTo(current + 1); }
  function prev() { if (current > 0) goTo(current - 1); }

  function openPassport() {
    screenHome.classList.add('leaving');
    screenPassport.classList.add('is-active');
    screenPassport.setAttribute('aria-hidden', 'false');
    screenHome.setAttribute('aria-hidden', 'true');
    goTo(0, { animate: false, force: true });
    window.setTimeout(() => {
      btnPrev.focus({ preventScroll: true });
    }, prefersReducedMotion ? 0 : 470);
  }

  function backToHome() {
    screenPassport.classList.remove('is-active');
    screenPassport.setAttribute('aria-hidden', 'true');
    screenHome.classList.remove('leaving');
    screenHome.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => btnOpen.focus({ preventScroll: true }), 50);
  }

  let touchStartX = 0;
  let touchStartY = 0;
  let touchDeltaX = 0;
  let isSwiping = false;
  const SWIPE_THRESHOLD = 50;

  const viewport = document.getElementById('pages-viewport');

  viewport.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
    touchDeltaX = 0;
    isSwiping = true;
    track.style.transition = 'none';
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const t = e.touches[0];
    touchDeltaX = t.clientX - touchStartX;
    const deltaY = t.clientY - touchStartY;
    if (Math.abs(touchDeltaX) > Math.abs(deltaY)) {
      const base = -current * (viewport.clientWidth);
      track.style.transform = 'translateX(' + (base + touchDeltaX) + 'px)';
    }
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    if (!isSwiping) return;
    isSwiping = false;
    if (touchDeltaX <= -SWIPE_THRESHOLD && current < total - 1) {
      next();
    } else if (touchDeltaX >= SWIPE_THRESHOLD && current > 0) {
      prev();
    } else {
      updateUI(true);
    }
    touchDeltaX = 0;
  });

  document.addEventListener('keydown', (e) => {
    const passportActive = screenPassport.classList.contains('is-active');
    if (!passportActive) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'Escape') { e.preventDefault(); backToHome(); }
  });

  btnOpen.addEventListener('click', openPassport);
  btnHome.addEventListener('click', backToHome);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  applyHomeTexts();
  buildPages();
  buildDots();
  updateUI(false);
})();
