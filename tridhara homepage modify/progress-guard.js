/* ==========================================================================
   TRIDHARA — PROGRESS GATE (front-end only, no backend)
   ==========================================================================
   Include this with a plain, NON-deferred <script src="..."> tag as early as
   possible in <head> — before any other inline script on the page reads a
   level-unlock flag. Because it is not deferred/async, it runs synchronously
   the moment the parser reaches it, guaranteeing it always executes before
   later inline scripts that render "locked/unlocked" level UI.

   WHAT IT DOES
   ------------
   "Logged in" here means the player has saved a Player Profile (see
   player-profile.js) — a name + avatar in localStorage. There is no real
   auth, so this is the only signal we have of "this is a returning,
   identified player."

     - If NO profile is saved (guest / signed out): every known progress key
       below is wiped on this page load. Guests never carry level-unlock
       progress between page loads, so every visit starts fresh.

     - If a profile IS saved (signed in): nothing is touched. Progress
       persists exactly as it was left.

   USAGE FROM GAME SCRIPTS
   ------------------------
   Before writing any "level unlocked" flag, check TridharaProgress.canSave():

       if (window.TridharaProgress && window.TridharaProgress.canSave()) {
           localStorage.setItem("chitraLevel2Unlocked", "true");
       }

   This keeps guests from ever persisting progress, even within one tab,
   and keeps this file as the single place that knows every progress key
   used across the site.
   ========================================================================== */
(function () {
  'use strict';

  var PROFILE_KEY = 'itihasaPlayerProfile';

  function isPlayerLoggedIn() {
    try {
      var raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return false;
      var profile = JSON.parse(raw);
      return !!(profile && typeof profile.name === 'string' && profile.name.trim());
    } catch (e) {
      return false;
    }
  }

  /* Every progress-bearing localStorage key used anywhere on the site.
     Add a new game's keys here so it's covered by the same guest reset. */
  var PROGRESS_KEYS = [
    /* Chitra — dance/art matching levels */
    'chitraLevel2Unlocked',
    'chitraLevel3Unlocked',

    /* Itihasa — Ancient / Medieval / Modern eras */
    'ancientLevel2Unlocked', 'ancientLevel3Unlocked', 'ancientLevel4Unlocked', 'ancientLevel5Unlocked',
    'medievalLevel2Unlocked', 'medievalLevel3Unlocked', 'medievalLevel4Unlocked', 'medievalLevel5Unlocked',
    'mordernLevel2Unlocked', 'mordernLevel3Unlocked', 'mordernLevel4Unlocked', 'mordernLevel5Unlocked',

    /* Kaalchakra — Bharat Time Machine (single combined save object) */
    'bharatTimeMachine'
  ];

  var loggedIn = isPlayerLoggedIn();

  if (!loggedIn) {
    PROGRESS_KEYS.forEach(function (key) {
      try { localStorage.removeItem(key); } catch (e) { /* storage unavailable — nothing to do */ }
    });
  }

  window.TridharaProgress = {
    isLoggedIn: isPlayerLoggedIn,
    canSave: isPlayerLoggedIn,
    keys: PROGRESS_KEYS
  };
})();
