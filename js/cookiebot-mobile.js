(function () {
  var SWIPE_THRESHOLD = 70;
  var MOBILE_MAX = 768;

  function isMobile() {
    return window.matchMedia("(max-width: " + MOBILE_MAX + "px)").matches;
  }

  function declineConsent() {
    if (window.Cookiebot && Cookiebot.dialog && typeof Cookiebot.dialog.submitDecline === "function") {
      Cookiebot.dialog.submitDecline();
      return;
    }

    var declineBtn = document.getElementById("CybotCookiebotDialogBodyButtonDecline")
      || document.getElementById("CybotCookiebotDialogBodyLevelButtonLevelOptinDeclineAll");
    if (declineBtn) declineBtn.click();
  }

  function bindSwipe(dialog) {
    if (!isMobile() || !dialog || dialog.dataset.spotlessSwipe === "1") return;
    dialog.dataset.spotlessSwipe = "1";

    var handle = dialog.querySelector(".spotless-cookiebot-handle");
    if (!handle) {
      handle = document.createElement("div");
      handle.className = "spotless-cookiebot-handle";
      handle.setAttribute("aria-hidden", "true");
      dialog.insertBefore(handle, dialog.firstChild);
    }

    var startY = 0;
    var deltaY = 0;
    var dragging = false;

    function resetTransform() {
      dialog.classList.remove("spotless-cookiebot-dismiss");
      dialog.style.transform = "";
    }

    function onStart(event) {
      if (!dialog.classList.contains("CybotCookiebotDialogActive")) return;
      dragging = true;
      startY = event.touches[0].clientY;
      deltaY = 0;
      dialog.style.transition = "none";
    }

    function onMove(event) {
      if (!dragging) return;
      deltaY = Math.max(0, event.touches[0].clientY - startY);
      dialog.style.transform = "translateY(" + deltaY + "px)";
      if (deltaY > 10) event.preventDefault();
    }

    function onEnd() {
      if (!dragging) return;
      dragging = false;
      dialog.style.transition = "transform 0.22s ease";

      if (deltaY >= SWIPE_THRESHOLD) {
        dialog.classList.add("spotless-cookiebot-dismiss");
        dialog.style.transform = "translateY(110%)";
        window.setTimeout(declineConsent, 220);
      } else {
        resetTransform();
      }
    }

    handle.addEventListener("touchstart", onStart, { passive: true });
    handle.addEventListener("touchmove", onMove, { passive: false });
    handle.addEventListener("touchend", onEnd);
    handle.addEventListener("touchcancel", onEnd);
  }

  function init() {
    var dialog = document.getElementById("CybotCookiebotDialog");
    if (dialog) bindSwipe(dialog);
  }

  function watchDialog() {
    init();

    if (window.__spotlessCookiebotObserver) return;
    window.__spotlessCookiebotObserver = new MutationObserver(init);
    window.__spotlessCookiebotObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  window.addEventListener("CookiebotOnDialogDisplay", init);
  window.addEventListener("CookiebotOnLoad", watchDialog);
  window.addEventListener("resize", init);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", watchDialog);
  } else {
    watchDialog();
  }
})();
