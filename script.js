/**
 * =====================================================================
 * SCRIPT PRINCIPAL DU PASSEPORT NUMÉRIQUE
 * =====================================================================
 * Gère : génération des pages depuis activities.js, navigation
 * (boutons, clavier, swipe), transitions, accessibilité.
 * Rien à modifier ici pour changer le contenu -> voir activities.js
 * =====================================================================
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ICONS = {
    music: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="2"/></svg>',
    video: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="5" width="15" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M17 10l5-3v10l-5-3" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    map: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2"/></svg>',
    photo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="10" r="1.5" stroke="currentColor" stroke-width="2"/><path d="M21 16l-5.5-5.5L4 21" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    link: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    heart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'
  };
  const DEFAULT_ICON = ICONS.link;

  const screenHome = document.getElementById('screen-home');
  const screenPassport = document.getElementById('screen-passport');
  const btnOpen = document.getElementById('btn-open');
  const btnHome = document.getElementById('btn-home');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const track = document.getElementById('pages-track');
  const progressText = document.getElementById('progress-text');
  const progressBar = document.getElementById('progress-bar');
  const dotsWrap = document.getElementById('dots');
  const announcer = document.getElementById('sr-announcer');

  const total = activities.length;
  let current = 0;

  /* ---------- Champs autorisant du HTML simple (ex: <br>) ---------- */
  const HTML_ALLOWED_FIELDS = new Set(['subtitle', 'polaroidCaption', 'badgeNote']);

  /* ---------- Appliquer les textes d'accueil depuis la config ---------- */
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

  /* ---------- Génération des pages du passeport ---------- */
  function buildPages() {
    const frag = document.createDocumentFragment();

    activities.forEach((activity, index) => {
      const page = document.createElement('article');
      page.className = 'page';
      page.setAttribute('role', 'group');
      page.setAttribute('aria-roledescription', 'page du passeport');
      page.setAttribute('aria-label', 'Page ' + (index + 1) + ' sur ' + total);
      page.id = 'page-' + (index + 1);

      const card = document.createElement('div');
      card.className = 'page-card';

      if (activity.stamp) {
        const stamp = document.createElement('span');
        stamp.className = 'page-stamp';
        stamp.setAttribute('aria-hidden', 'true');
        stamp.textContent = activity.stamp;
        card.appendChild(stamp);
      }

      const frame = document.createElement('div');
      frame.className = 'page-image-frame';
      const img = document.createElement('img');
      img.src = activity.image;
      img.alt = activity.alt || (activity.title ? activity.title : ('Photo ' + (index + 1)));
      img.loading = index === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.width = 800;
      img.height = 1000;
      frame.appendChild(img);
      card.appendChild(frame);

      if (activity.title || activity.description) {
        const textWrap = document.createElement('div');
        textWrap.className = 'page-text';
        if (activity.title) {
          const h2 = document.createElement('h2');
          h2.className = 'page-title';
          h2.textContent = activity.title;
          textWrap.appendChild(h2);
        }
        if (activity.description) {
          const p = document.createElement('p');
          p.className = 'page-description';
          p.textContent = activity.description;
          textWrap.appendChild(p);
        }
        card.appendChild(textWrap);
      }

      if (activity.links && activity.links.length > 0) {
        const linksWrap = document.createElement('div');
        linksWrap.className = 'page-links';
        activity.links.forEach((link) => {
          const a = document.createElement('a');
          a.className = 'page-link';
          a.href = link.url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.setAttribute('aria-label', link.label);
          const iconSvg = (link.icon && ICONS[link.icon]) ? ICONS[link.icon] : DEFAULT_ICON;
          a.innerHTML = iconSvg + '<span>' + escapeHtml(link.label) + '</span>';
          linksWrap.appendChild(a);
        });
        card.appendChild(linksWrap);
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
        card.appendChild(restartBtn);
      }

      page.appendChild(card);
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

    progressText.textContent = 'Page ' + (current + 1) + ' / ' + total;
    progressBar.style.width = (((current + 1) / total) * 100) + '%';
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

  /* ---------- Swipe tactile ---------- */
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

  /* ---------- Clavier ---------- */
  document.addEventListener('keydown', (e) => {
    const passportActive = screenPassport.classList.contains('is-active');
    if (!passportActive) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'Escape') { e.preventDefault(); backToHome(); }
  });

  /* ---------- Listeners boutons ---------- */
  btnOpen.addEventListener('click', openPassport);
  btnHome.addEventListener('click', backToHome);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  /* ---------- Init ---------- */
  applyHomeTexts();
  buildPages();
  buildDots();
  updateUI(false);
})();
