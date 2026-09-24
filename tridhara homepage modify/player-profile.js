/* ==========================================================================
   ITIHASA — PLAYER PROFILE (front-end only, no backend, no auth)
   ==========================================================================
   Drop this ONE file into any page of the site — the homepage, the quiz
   page, the results page — via:

       <script src="player-profile.js" defer></script>

   It injects its own styles and its own modal markup, so no other file
   needs to change except to add that one <script> tag and, optionally,
   a trigger button / badge spot (see the "HOOKING IT UP" notes below).

   STORAGE
   -------
   Everything lives in localStorage under one key, as plain JSON:
       { "name": "Arka", "avatar": "🦚" }
   Nothing is sent anywhere. Nothing is validated server-side. There is no
   concept of a "logged in" session — it's just a remembered display name
   and icon, scoped to this browser/device.

   HOOKING IT UP ON A PAGE
   ------------------------
   1) A button/link that should OPEN the profile popup:
        <button data-player-trigger>Edit Profile</button>

   2) A spot that should always show the current name (falls back to
      whatever text you put in data-player-badge-default, or "Profile"):
        <span data-player-badge-icon data-player-badge-icon-default="👤"></span>
        <span data-player-badge-name data-player-badge-default="Profile"></span>
      These auto-update the moment a profile is saved — no reload needed.

   3) On a quiz results screen, to render something like
      "Well played, Arka! 🦚" once the player finishes:
        <div id="resultGreeting"></div>
        <script>
          PlayerProfile.renderWellPlayed('#resultGreeting', {
            template: 'Well played, {name}!'
          });
        </script>
      If no profile has been saved yet, this renders nothing (or your
      `fallback` option, if you pass one) — it never blocks the result
      screen from showing the score.

   PUBLIC API (window.PlayerProfile)
   ----------------------------------
     PlayerProfile.getProfile()            -> {name, avatar} or null
     PlayerProfile.open()                  -> opens the popup (create/edit)
     PlayerProfile.close()                 -> closes the popup
     PlayerProfile.onChange(fn)            -> fn(profile) fires on save
     PlayerProfile.renderWellPlayed(target, opts)
     PlayerProfile.refreshTriggers()       -> call after adding new
                                               [data-player-trigger] buttons
                                               dynamically (e.g. on a
                                               results screen built by JS)

   This module never touches quiz questions, scoring, or level logic —
   it only reads/writes its own localStorage key and its own DOM nodes.
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'itihasaPlayerProfile';

  var AVATARS = [
    { icon: '👑', label: 'Crown' },
    { icon: '🦚', label: 'Peacock' },
    { icon: '🐘', label: 'Elephant' },
    { icon: '🐅', label: 'Tiger' },
    { icon: '🪷', label: 'Lotus' },
    { icon: '⚔️', label: 'Swords' },
    { icon: '🏹', label: 'Bow' },
    { icon: '🛕', label: 'Temple' },
    { icon: '📜', label: 'Scroll' },
    { icon: '🔱', label: 'Trident' }
  ];

  var changeListeners = [];
  var modalBuilt = false;
  var lastFocusedEl = null;
  var selectedAvatar = AVATARS[0].icon;
  var els = {};

  /* ---------------------------- storage ---------------------------- */

  function getProfile() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed.name === 'string' && typeof parsed.avatar === 'string' && parsed.name.trim()) {
        return parsed;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  function saveProfile(name, avatarIcon) {
    var profile = { name: name, avatar: avatarIcon };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      /* localStorage unavailable (private mode, quota, etc.) — the
         popup still works for this page view, it just won't persist. */
    }
    refreshBadges();
    changeListeners.forEach(function (fn) {
      try { fn(profile); } catch (e) { /* a bad listener shouldn't break saving */ }
    });
    return profile;
  }

  function onChange(fn) {
    if (typeof fn === 'function') changeListeners.push(fn);
  }

  /* ---------------------------- badges ---------------------------- */

  function refreshBadges() {
    var profile = getProfile();
    document.querySelectorAll('[data-player-badge-name]').forEach(function (el) {
      el.textContent = profile ? profile.name : (el.getAttribute('data-player-badge-default') || 'Profile');
    });
    document.querySelectorAll('[data-player-badge-icon]').forEach(function (el) {
      el.textContent = profile ? profile.avatar : (el.getAttribute('data-player-badge-icon-default') || '👤');
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderWellPlayed(target, opts) {
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    var profile = getProfile();
    opts = opts || {};
    if (!profile) {
      el.innerHTML = opts.fallback || '';
      return;
    }
    var tpl = opts.template || 'Well played, {name}!';
    var text = tpl.replace('{name}', escapeHtml(profile.name)).replace('{avatar}', '');
    el.innerHTML =
      '<span class="pp-wellplayed">' +
        '<span class="pp-wellplayed-avatar" aria-hidden="true">' + profile.avatar + '</span>' +
        '<span class="pp-wellplayed-text">' + text + '</span>' +
      '</span>';
  }

  /* ---------------------------- styles ---------------------------- */

  function injectStyles() {
    if (document.getElementById('pp-styles')) return;
    var css = [
      '.pp-overlay{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;',
      'padding:20px;background:rgba(8,5,2,0);opacity:0;visibility:hidden;',
      'transition:opacity .3s ease,visibility .3s ease,background .3s ease,backdrop-filter .3s ease;',
      'font-family:Georgia,"Times New Roman",serif;}',
      '.pp-overlay.pp-open{opacity:1;visibility:visible;background:rgba(8,5,2,.78);backdrop-filter:blur(6px);}',

      '.pp-modal{position:relative;width:min(430px,92vw);max-height:88vh;overflow-y:auto;',
      'background:linear-gradient(160deg,#241209 0%,#160b05 55%,#0c0603 100%);',
      'border:2px solid rgba(240,207,118,.55);border-radius:18px;',
      'box-shadow:0 25px 70px rgba(0,0,0,.65),0 0 0 1px rgba(0,0,0,.4) inset,0 0 46px rgba(240,207,118,.16);',
      'padding:34px 30px 28px;text-align:center;color:#f3e3c2;',
      'transform:scale(.86) translateY(8px);opacity:0;',
      'transition:transform .38s cubic-bezier(.2,.85,.2,1),opacity .3s ease;}',
      '.pp-overlay.pp-open .pp-modal{transform:scale(1) translateY(0);opacity:1;}',
      '.pp-modal.pp-shake{animation:ppShake .4s ease;}',
      '@keyframes ppShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}',

      '.pp-close{position:absolute;top:12px;right:14px;width:32px;height:32px;border-radius:50%;',
      'background:rgba(255,255,255,.05);border:1px solid rgba(240,207,118,.35);color:#e8c988;',
      'font-size:20px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;',
      'transition:background .15s ease,transform .15s ease;}',
      '.pp-close:hover{background:rgba(240,207,118,.18);transform:rotate(90deg);}',

      '.pp-ornament{color:rgba(240,207,118,.65);font-size:15px;letter-spacing:.3em;margin-bottom:6px;}',
      '.pp-title{margin:0 0 6px;font-size:clamp(20px,2.4vw,26px);letter-spacing:.03em;color:#f6dfa0;',
      'text-shadow:0 1px 3px rgba(0,0,0,.6);}',
      '.pp-subtitle{margin:0 0 22px;font-family:Arial,sans-serif;font-size:13px;color:#cbb384;line-height:1.4;}',

      '.pp-label{display:block;text-align:left;font-family:Arial,sans-serif;font-size:12px;',
      'letter-spacing:.08em;text-transform:uppercase;color:#d8b57e;margin:0 0 8px;}',

      '.pp-input{width:100%;box-sizing:border-box;padding:12px 14px;margin-bottom:6px;',
      'background:rgba(0,0,0,.35);border:1px solid rgba(240,207,118,.4);border-radius:10px;',
      'color:#fff7dc;font:16px Georgia,"Times New Roman",serif;outline:none;',
      'transition:border-color .15s ease,box-shadow .15s ease;}',
      '.pp-input::placeholder{color:rgba(243,227,194,.4);}',
      '.pp-input:focus{border-color:#f0cf76;box-shadow:0 0 0 3px rgba(240,207,118,.18);}',
      '.pp-input-error{border-color:#c65b4a !important;}',

      '.pp-error{text-align:left;color:#e6897a;font-family:Arial,sans-serif;font-size:12px;margin:-2px 0 14px;}',

      '.pp-avatar-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(54px,1fr));gap:10px;margin:0 0 26px;}',
      '.pp-avatar-tile{aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;font-size:24px;',
      'background:rgba(255,255,255,.04);border:1px solid rgba(240,207,118,.28);border-radius:12px;cursor:pointer;',
      'transition:transform .15s ease,border-color .15s ease,box-shadow .15s ease,background .15s ease;}',
      '.pp-avatar-tile:hover{transform:translateY(-2px);background:rgba(240,207,118,.08);}',
      '.pp-avatar-tile.selected{border-color:#f0cf76;background:rgba(240,207,118,.14);',
      'box-shadow:0 0 0 2px rgba(240,207,118,.35),0 0 18px rgba(240,207,118,.35);transform:translateY(-2px) scale(1.05);}',
      '.pp-avatar-tile:focus-visible,.pp-close:focus-visible{outline:2px solid #f0cf76;outline-offset:2px;}',

      '.pp-save-btn{width:100%;padding:13px 20px;border:1px solid rgba(255,220,126,.9);border-radius:999px;',
      'background:linear-gradient(135deg,#7b2030,#155a48);color:#fff7dc;',
      'font:700 16px Georgia,"Times New Roman",serif;letter-spacing:.02em;cursor:pointer;',
      'box-shadow:0 8px 20px rgba(0,0,0,.4);transition:filter .15s ease,transform .15s ease;}',
      '.pp-save-btn:hover{filter:brightness(1.12);transform:translateY(-1px);}',
      '.pp-save-btn.pp-saved{background:linear-gradient(135deg,#155a48,#0f2e21);}',

      '.pp-divider{border:none;border-top:1px solid rgba(240,207,118,.22);margin:18px 0 14px;}',
      '.pp-exit-btn{width:100%;padding:10px 20px;border:1px solid rgba(198,91,74,.55);border-radius:999px;',
      'background:transparent;color:#e6897a;',
      'font:600 13px Arial,sans-serif;letter-spacing:.03em;cursor:pointer;',
      'transition:background .15s ease,color .15s ease,border-color .15s ease;}',
      '.pp-exit-btn:hover{background:rgba(198,91,74,.14);color:#f3a99a;border-color:rgba(198,91,74,.85);}',

      '.pp-badge-icon{font-size:16px;line-height:1;display:inline-flex;align-items:center;}',

      '.pp-wellplayed{display:inline-flex;align-items:center;gap:10px;font-family:Georgia,"Times New Roman",serif;}',
      '.pp-wellplayed-avatar{font-size:1.4em;}',

      '@media(max-width:480px){.pp-modal{padding:28px 20px 22px;border-radius:14px;}.pp-avatar-tile{font-size:20px;}}',
      '@media(prefers-reduced-motion:reduce){.pp-modal,.pp-overlay{transition:none !important;}.pp-modal.pp-shake{animation:none !important;}}'
    ].join('');

    var style = document.createElement('style');
    style.id = 'pp-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---------------------------- modal ---------------------------- */

  function buildModal() {
    if (modalBuilt) return;
    modalBuilt = true;
    injectStyles();

    var overlay = document.createElement('div');
    overlay.id = 'ppOverlay';
    overlay.className = 'pp-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    var avatarButtons = AVATARS.map(function (a) {
      return '<button type="button" class="pp-avatar-tile" data-avatar="' + a.icon + '" ' +
        'aria-label="' + a.label + '" aria-pressed="false">' + a.icon + '</button>';
    }).join('');

    overlay.innerHTML =
      '<div class="pp-modal" role="dialog" aria-modal="true" aria-labelledby="ppTitle">' +
        '<button type="button" class="pp-close" id="ppClose" aria-label="Close">&times;</button>' +
        '<div class="pp-ornament" aria-hidden="true">&#10070;</div>' +
        '<h2 class="pp-title" id="ppTitle">Your Player Profile</h2>' +
        '<p class="pp-subtitle">Choose how you\u2019ll appear as you explore Itihasa.</p>' +
        '<label class="pp-label" for="ppNameInput">Display Name</label>' +
        '<input type="text" id="ppNameInput" class="pp-input" maxlength="20" autocomplete="off" placeholder="e.g. Arka">' +
        '<div class="pp-error" id="ppError" hidden>Please enter a display name.</div>' +
        '<div class="pp-label">Choose an Avatar</div>' +
        '<div class="pp-avatar-grid" id="ppAvatarGrid">' + avatarButtons + '</div>' +
        '<button type="button" class="pp-save-btn" id="ppSaveBtn"><span id="ppSaveBtnText">Save Profile</span></button>' +
        '<hr class="pp-divider">' +
        '<button type="button" class="pp-exit-btn" id="ppExitBtn">Exit Profile &amp; Reset Progress</button>' +
      '</div>';

    document.body.appendChild(overlay);

    els.overlay = overlay;
    els.modal = overlay.querySelector('.pp-modal');
    els.nameInput = overlay.querySelector('#ppNameInput');
    els.error = overlay.querySelector('#ppError');
    els.grid = overlay.querySelector('#ppAvatarGrid');
    els.saveBtn = overlay.querySelector('#ppSaveBtn');
    els.saveBtnText = overlay.querySelector('#ppSaveBtnText');
    els.closeBtn = overlay.querySelector('#ppClose');
    els.exitBtn = overlay.querySelector('#ppExitBtn');

    els.grid.addEventListener('click', function (e) {
      var tile = e.target.closest('.pp-avatar-tile');
      if (!tile) return;
      selectAvatar(tile.getAttribute('data-avatar'));
    });

    els.closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('pp-open')) closeModal();
    });

    els.saveBtn.addEventListener('click', handleSave);
    els.exitBtn.addEventListener('click', handleExit);
    els.nameInput.addEventListener('keydown', function (e) {
      hideError();
      if (e.key === 'Enter') { e.preventDefault(); handleSave(); }
    });
    els.nameInput.addEventListener('input', hideError);
  }

  function selectAvatar(icon) {
    selectedAvatar = icon;
    els.grid.querySelectorAll('.pp-avatar-tile').forEach(function (t) {
      var active = t.getAttribute('data-avatar') === icon;
      t.classList.toggle('selected', active);
      t.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function hideError() {
    els.error.hidden = true;
    els.nameInput.classList.remove('pp-input-error');
  }

  function showError() {
    els.error.hidden = false;
    els.nameInput.classList.add('pp-input-error');
    els.modal.classList.remove('pp-shake');
    void els.modal.offsetWidth; /* restart the shake animation */
    els.modal.classList.add('pp-shake');
  }

  function handleSave() {
    var name = els.nameInput.value.trim();
    if (!name) { showError(); els.nameInput.focus(); return; }
    saveProfile(name, selectedAvatar);
    els.saveBtnText.textContent = 'Saved \u2713';
    els.saveBtn.classList.add('pp-saved');
    setTimeout(function () {
      closeModal();
      setTimeout(function () {
        els.saveBtnText.textContent = 'Save Profile';
        els.saveBtn.classList.remove('pp-saved');
      }, 300);
    }, 550);
  }

  function handleExit() {
    var ok = window.confirm(
      'This will erase the saved profile and reset all progress on this ' +
      'device (every page). This cannot be undone. Continue?'
    );
    if (!ok) return;
    try {
      localStorage.clear();
    } catch (e) {
      /* localStorage unavailable — nothing to clear */
    }
    closeModal();
    /* Reload so this page (and its own on-load state, e.g. language,
       intro screen) reflects the wipe immediately. Other pages simply
       read the cleared localStorage the next time they're opened. */
    location.reload();
  }

  function openModal() {
    buildModal();
    var profile = getProfile();
    hideError();
    els.nameInput.value = profile ? profile.name : '';
    selectAvatar(profile ? profile.avatar : AVATARS[0].icon);
    lastFocusedEl = document.activeElement;
    els.overlay.classList.add('pp-open');
    els.overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { els.nameInput.focus(); }, 60);
  }

  function closeModal() {
    if (!els.overlay) return;
    els.overlay.classList.remove('pp-open');
    els.overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') lastFocusedEl.focus();
  }

  /* ---------------------------- wiring ---------------------------- */

  function wireTriggers() {
    document.querySelectorAll('[data-player-trigger]').forEach(function (el) {
      if (el._ppWired) return;
      el._ppWired = true;
      el.addEventListener('click', openModal);
    });
  }

  function init() {
    wireTriggers();
    refreshBadges();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.PlayerProfile = {
    getProfile: getProfile,
    open: openModal,
    close: closeModal,
    onChange: onChange,
    renderWellPlayed: renderWellPlayed,
    refreshTriggers: wireTriggers
  };
})();