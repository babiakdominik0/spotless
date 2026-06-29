(function () {
  const id =
    typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.seo?.ga4MeasurementId
      ? SITE_CONFIG.seo.ga4MeasurementId.trim()
      : "";
  if (!id || document.getElementById("ga4-script")) return;

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);
})();
