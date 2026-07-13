(function () {
  var delay = window.SPOTLESS_COOKIEBOT_DELAY_MS || 5000;
  var showAt = Date.now() + delay;
  var revealed = false;

  document.documentElement.classList.add("spotless-cookiebot-waiting");

  function hasConsent() {
    return window.Cookiebot && Cookiebot.consent && Cookiebot.consent.stamp;
  }

  function hideBanner() {
    if (window.Cookiebot && typeof Cookiebot.hide === "function") {
      Cookiebot.hide();
    }
  }

  function revealBanner() {
    document.documentElement.classList.remove("spotless-cookiebot-waiting");

    if (revealed || hasConsent()) {
      revealed = true;
      return;
    }

    revealed = true;

    if (window.Cookiebot && typeof Cookiebot.show === "function") {
      Cookiebot.show();
    }
  }

  function scheduleReveal() {
    window.setTimeout(revealBanner, Math.max(0, showAt - Date.now()));
  }

  window.addEventListener("CookiebotOnDialogDisplay", function () {
    if (!revealed && Date.now() < showAt) {
      hideBanner();
    }
  });

  window.addEventListener("CookiebotOnLoad", function () {
    if (hasConsent()) {
      document.documentElement.classList.remove("spotless-cookiebot-waiting");
      revealed = true;
      return;
    }

    hideBanner();
    scheduleReveal();
  });

  scheduleReveal();
})();
