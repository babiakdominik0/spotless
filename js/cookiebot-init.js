(function () {
  var id = window.SPOTLESS_COOKIEBOT_ID;
  if (!id || typeof id !== "string" || !id.trim()) return;

  if (document.getElementById("Cookiebot")) return;

  var script = document.createElement("script");
  script.id = "Cookiebot";
  script.src = "https://consent.cookiebot.com/uc.js";
  script.type = "text/javascript";
  script.setAttribute("data-cbid", id.trim());
  script.setAttribute("data-blockingmode", "auto");

  var first = document.getElementsByTagName("script")[0];
  if (first && first.parentNode) {
    first.parentNode.insertBefore(script, first);
  } else {
    document.head.appendChild(script);
  }
})();
