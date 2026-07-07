function initSite() {
  const config = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
  const page = document.body.dataset.page;

  applyConfig(config);
  injectLocalBusinessSchema(config);
  injectFaqSchema(config);
  initFloatingCall(config.contact);
  initNavCta(config);
  initNavigation(page);
  initMobileMenu();
  initGallery();
  initContactForm();
  renderPageContent(config, page);
  initScrollAnimations();
}

function applyConfig(config) {
  document.querySelectorAll("[data-business-name]").forEach((el) => {
    el.textContent = config.businessName || "";
  });

  document.querySelectorAll("[data-tagline]").forEach((el) => {
    el.textContent = config.tagline || "";
  });

  document.title = document.title.replace(
    "%BUSINESS%",
    config.businessName || "Web"
  );

  const footerYear = document.getElementById("footer-year");
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  renderSocialLinks(config.social);
  renderContactInfo(config.contact);

  if (config.logo) {
    document.querySelectorAll(".logo-mark").forEach((img) => {
      img.src = config.logo;
    });
  }

  const logoLabel = config.logoText || config.businessName;
  if (logoLabel) {
    document.querySelectorAll(".logo-text").forEach((el) => {
      el.textContent = logoLabel.toUpperCase();
    });
  }
}

function renderSocialLinks(social = {}) {
  const containers = document.querySelectorAll("[data-social-links]");
  const icons = {
    instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
    facebook: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    tiktok: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>`,
  };

  containers.forEach((container) => {
    container.innerHTML = "";
    Object.entries(social).forEach(([network, url]) => {
      if (!url) return;
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = container.dataset.socialStyle === "footer" ? "" : "social-link";
      link.setAttribute("aria-label", network);
      link.innerHTML = icons[network] || network;
      container.appendChild(link);
    });
  });
}

function renderContactInfo(contact = {}) {
  const addressEl = document.getElementById("contact-address");
  const hoursEl = document.getElementById("contact-hours");

  const phoneHtml = contact.phone
    ? `<a href="tel:${contact.phone.replace(/\s/g, "")}">${contact.phone}</a>`
    : "";
  const emailHtml = contact.email
    ? `<a href="mailto:${contact.email}">${contact.email}</a>`
    : "";

  document.querySelectorAll("#contact-phone").forEach((el) => {
    el.innerHTML = phoneHtml;
  });
  document.querySelectorAll("#contact-email, #contact-email-footer").forEach((el) => {
    el.innerHTML = emailHtml;
  });
  if (addressEl) {
    if (contact.mapsUrl && contact.address) {
      addressEl.innerHTML = `<a href="${contact.mapsUrl}" target="_blank" rel="noopener noreferrer">${contact.address}</a>`;
    } else {
      addressEl.textContent = contact.address || "";
    }
  }
  if (hoursEl) hoursEl.textContent = contact.hours || "";
}

function trackEvent(eventName, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

function initNavCta(config = {}) {
  const navCta = config.navCta || {};
  const isHome = document.body.dataset.page === "home";
  const href = isHome ? "#objednavka" : "/kontakt";

  document.querySelectorAll("[data-nav-cta]").forEach((cta) => {
    cta.href = href;
    if (navCta.text) cta.textContent = navCta.text;
  });
}

function applySectionCopy(config) {
  document.querySelectorAll("[data-section]").forEach((section) => {
    const copy = config.sections?.[section.dataset.section];
    if (!copy) return;

    const eyebrow = section.querySelector("[data-section-eyebrow]");
    const title = section.querySelector("[data-section-title]");
    const subtitle = section.querySelector("[data-section-subtitle]");

    if (eyebrow && copy.eyebrow) eyebrow.textContent = copy.eyebrow;
    if (title && copy.title) title.textContent = copy.title;
    if (subtitle && copy.subtitle) subtitle.textContent = copy.subtitle;
  });
}

function renderPageHeader(config, page) {
  const copy = config.pages?.[page];
  if (!copy) return;

  const eyebrow = document.querySelector("[data-page-eyebrow]");
  const title = document.querySelector("[data-page-title]");
  const subtitle = document.querySelector("[data-page-subtitle]");

  if (eyebrow && copy.eyebrow) eyebrow.textContent = copy.eyebrow;
  if (title && copy.title) title.textContent = copy.title;
  if (subtitle && copy.subtitle) subtitle.textContent = copy.subtitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && copy.metaDescription) metaDesc.content = copy.metaDescription;
}

function renderCtaBlocks(config) {
  document.querySelectorAll("[data-cta]").forEach((block) => {
    const copy = config.cta?.[block.dataset.cta];
    if (!copy) return;

    const eyebrow = block.querySelector("[data-cta-eyebrow]");
    const title = block.querySelector("[data-cta-title]");
    const subtitle = block.querySelector("[data-cta-subtitle]");
    const note = block.querySelector("[data-cta-note]");
    const primary = block.querySelector("[data-cta-primary]");
    const secondary = block.querySelector("[data-cta-secondary]");

    if (eyebrow && copy.eyebrow) eyebrow.textContent = copy.eyebrow;
    if (title && copy.title) title.textContent = copy.title;
    if (subtitle && copy.subtitle) subtitle.textContent = copy.subtitle;
    if (note && copy.note) note.textContent = copy.note;
    if (primary && copy.primary) {
      primary.textContent = copy.primary.text;
      primary.href = copy.primary.link;
    }
    if (secondary && copy.secondary) {
      secondary.textContent = copy.secondary.text;
      secondary.href = copy.secondary.link;
    }
  });
}

function injectLocalBusinessSchema(config) {
  if (document.getElementById("local-business-schema")) return;

  const seo = config.seo || {};
  const contact = config.contact || {};
  const lb = config.localBusiness || {};
  const siteUrl = seo.siteUrl || "";
  const phone = contact.phone ? contact.phone.replace(/\s/g, "") : "";
  const sameAs = Object.values(config.social || {}).filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: lb.legalName || seo.siteName || config.businessName,
    url: siteUrl || undefined,
    image: siteUrl ? `${siteUrl}${config.seo?.logo || config.logo || "/images/favicon-192.png"}` : undefined,
    logo: siteUrl ? `${siteUrl}${config.seo?.logo || "/images/favicon-192.png"}` : undefined,
    telephone: phone || undefined,
    email: contact.email || undefined,
    description: config.description || config.tagline || undefined,
    priceRange: lb.priceRange || "€",
    address: {
      "@type": "PostalAddress",
      streetAddress: lb.streetAddress || contact.address,
      postalCode: lb.postalCode,
      addressLocality: lb.addressLocality,
      addressRegion: lb.addressRegion,
      addressCountry: lb.addressCountry || "SK",
    },
    areaServed: lb.areaServed || config.tagline,
    sameAs: sameAs.length ? sameAs : undefined,
  };

  if (config.services?.length) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Služby Spotless Cleaning",
      itemListElement: config.services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.text,
        },
      })),
    };
  }

  const script = document.createElement("script");
  script.id = "local-business-schema";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function injectFaqSchema(config) {
  if (document.getElementById("faq-schema") || !config.faq?.length) return;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const script = document.createElement("script");
  script.id = "faq-schema";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function initFloatingCall(contact = {}) {
  if (!contact.phone || document.getElementById("floating-call")) return;

  const tel = contact.phone.replace(/\s/g, "");
  const link = document.createElement("a");
  link.id = "floating-call";
  link.className = "floating-call";
  link.href = `tel:${tel}`;
  link.setAttribute("aria-label", `Zavolať ${contact.phone}`);
  link.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>Zavolať</span>`;
  document.body.appendChild(link);
}

function renderContactMap(contact = {}) {
  const container = document.getElementById("contact-map");
  if (!container || !contact.address) return;

  const query = encodeURIComponent(contact.address);
  const src =
    contact.mapsEmbedUrl ||
    `https://www.google.com/maps?q=${query}&hl=sk&z=13&output=embed`;

  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.title = `Mapa — ${contact.address}`;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.allowFullscreen = true;

  container.replaceChildren(iframe);
}

function initNavigation(currentPage) {
  document.querySelectorAll(".nav-desktop a, .nav-mobile a").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });
}

function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".nav-mobile");
  if (!toggle || !mobileNav) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    mobileNav.classList.toggle("open");
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("open");
    });
  });
}

function renderPageContent(config, page) {
  applySectionCopy(config);
  renderPageHeader(config, page);
  renderCtaBlocks(config);

  if (page === "home") {
    renderHome(config);
    renderServices(config);
    const previewCount = config.homeGalleryPreview || 3;
    const preview = config.gallery?.slice(0, previewCount);
    renderGallery(preview, "gallery-preview", config.gallery);
    renderReels(config, "home-reels-track", { linked: false });
    renderContactServices(config);
    renderFaq(config);
  }
  if (page === "pricing") renderPricing(config);
  if (page === "gallery") {
    renderGallery(config.gallery, "gallery-full", config.gallery);
    renderReels(config, "reels-track", { linked: true });
  }
  if (page === "contact") {
    renderContactServices(config);
    renderContactMap(config.contact);
  }
}

function renderHome(config) {
  const hero = config.hero || {};
  const headline = document.getElementById("hero-headline");
  const subheadline = document.getElementById("hero-subheadline");
  const ctaPrimary = document.getElementById("hero-cta-primary");
  const ctaSecondary = document.getElementById("hero-cta-secondary");
  const heroImg = document.getElementById("hero-image");
  const trustEl = document.getElementById("hero-trust");

  if (headline) headline.textContent = hero.headline || "";
  if (subheadline) subheadline.textContent = hero.subheadline || "";
  if (ctaPrimary && hero.ctaPrimary) {
    const desktopText = hero.ctaPrimary.text || "";
    const mobileText = hero.ctaPrimary.textMobile || desktopText;
    ctaPrimary.innerHTML =
      `<span class="btn-label btn-label--desktop">${desktopText}</span>` +
      `<span class="btn-label btn-label--mobile">${mobileText}</span>`;
    ctaPrimary.href = hero.ctaPrimary.link || "#objednavka";
  }
  if (ctaSecondary && hero.ctaSecondary) {
    ctaSecondary.textContent = hero.ctaSecondary.text;
    ctaSecondary.href = hero.ctaSecondary.link || "/cennik";
  }
  if (heroImg && hero.image) {
    heroImg.src = hero.image;
    heroImg.alt = hero.imageAlt || "";
  }
  if (trustEl && hero.trustPoints?.length) {
    trustEl.innerHTML = hero.trustPoints.map((point) => `<li>${point}</li>`).join("");
  }

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && config.description) metaDesc.content = config.description;

  const seo = config.seo || {};
  if (seo.homeTitle) document.title = seo.homeTitle;
  if (seo.homeDescription) {
    if (metaDesc) metaDesc.content = seo.homeDescription;
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (ogDesc) ogDesc.content = seo.homeDescription;
    if (twDesc) twDesc.content = seo.homeDescription;
  }
  if (seo.homeTitle) {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (ogTitle) ogTitle.content = seo.homeTitle;
    if (twTitle) twTitle.content = seo.homeTitle;
  }
}

function renderFaq(config) {
  const container = document.getElementById("faq-list");
  if (!container || !config.faq?.length) return;

  container.innerHTML = config.faq
    .map(
      (item) => `
    <details class="faq-item">
      <summary>${item.question}</summary>
      <p>${item.answer}</p>
    </details>
  `
    )
    .join("");
}

function renderServices(config) {
  const container = document.getElementById("services-grid");
  if (!container || !config.services) return;

  container.innerHTML = config.services
    .map(
      (s) => `
    <article class="feature-card">
      <div class="feature-icon" aria-hidden="true">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </article>
  `
    )
    .join("");
}

function renderPricing(config) {
  const container = document.getElementById("pricing-grid");
  if (!container) return;

  if (config.pricingCategories) {
    container.className = "pricing-tables";
    container.innerHTML = config.pricingCategories
      .map(
        (cat) => `
      <article class="pricing-category${cat.highlight ? " pricing-category--windows" : ""}">
        <h3>${cat.title}</h3>
        ${cat.items
          .map(
            (item) => `
          <div class="pricing-row">
            <span>${item.name}</span>
            <span>${item.price}</span>
          </div>
        `
          )
          .join("")}
      </article>
    `
      )
      .join("");

    const notesEl = document.getElementById("pricing-notes");
    if (notesEl && config.pricingNotes) {
      notesEl.innerHTML = `<ul>${config.pricingNotes.map((n) => `<li>${n}</li>`).join("")}</ul>`;
    }

    return;
  }

  if (!config.pricing) return;
  container.innerHTML = config.pricing
    .map(
      (plan) => `
    <article class="pricing-card ${plan.recommended ? "recommended" : ""}">
      ${plan.recommended ? '<span class="pricing-badge">Odporúčané</span>' : ""}
      <h3>${plan.name}</h3>
      <div class="pricing-price">${plan.price}</div>
      <div class="pricing-period">${plan.period}</div>
      <p class="pricing-desc">${plan.description}</p>
      <ul class="pricing-features">
        ${plan.features.map((f) => `<li>${f}</li>`).join("")}
      </ul>
      <a href="/kontakt" class="btn btn-primary btn-block">${plan.cta || "Objednať"}</a>
    </article>
  `
    )
    .join("");
}

function renderContactServices(config) {
  const select = document.getElementById("service");
  if (!select || !config.contactServices) return;

  select.innerHTML =
    `<option value="">Vyberte službu</option>` +
    config.contactServices
      .map((s) => `<option value="${s.toLowerCase().replace(/\s+/g, "-")}">${s}</option>`)
      .join("");
}

function renderGallery(items, containerId, lightboxSource) {
  const container = document.getElementById(containerId);
  if (!container || !items?.length) return;

  const isPreview = containerId === "gallery-preview";
  const isPage = containerId === "gallery-full";
  const lightboxItems = lightboxSource || items;

  if (isPage) container.className = "gallery-grid gallery-grid--page";

  container.innerHTML = items
    .map((item, i) => {
      const lightboxIndex = isPreview
        ? lightboxItems.findIndex((g) => g.src === item.src)
        : i;
      const wideClass = !isPreview && !isPage && item.wide ? " gallery-item--wide" : "";
      return `
    <figure class="gallery-item${wideClass}" data-index="${lightboxIndex}" tabindex="0" role="button" aria-label="Otvoriť: ${item.alt}">
      <div class="gallery-item__frame">
        <img src="${item.src}" alt="${item.alt}" loading="lazy">
      </div>
      ${item.caption ? `<figcaption class="gallery-caption">${item.caption}</figcaption>` : ""}
    </figure>
  `;
    })
    .join("");

  container.querySelectorAll(".gallery-item").forEach((item) => {
    const open = () =>
      openLightbox(lightboxItems, parseInt(item.dataset.index, 10));
    item.addEventListener("click", open);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

function renderReels(config, containerId = "reels-track", options = { linked: true }) {
  const track = document.getElementById(containerId);
  const reelsConfig = config.instagramReels;
  if (!track || !reelsConfig?.items?.length) return;

  const duration = reelsConfig.previewDuration || 2;
  const linked = options.linked !== false;

  track.innerHTML = reelsConfig.items
    .map((reel) => {
      const dataAttrs = `data-start="${reel.startTime || 0}" data-duration="${duration}"`;
      const inner = `
        <span class="reel-card__ring">
          <span class="reel-card__inner">
            <video class="reel-card__video" muted playsinline preload="metadata" aria-hidden="true">
              <source src="${reel.video}" type="video/mp4">
            </video>
          </span>
        </span>`;

      if (linked) {
        return `<a href="${reel.url}" class="reel-card" target="_blank" rel="noopener noreferrer" ${dataAttrs} aria-label="Instagram reel">${inner}</a>`;
      }
      return `<div class="reel-card reel-card--home" ${dataAttrs} role="group">
          <span class="reel-card__inner">
            <video class="reel-card__video" muted playsinline preload="metadata" aria-hidden="true">
              <source src="${reel.video}" type="video/mp4">
            </video>
          </span>
        </div>`;
    })
    .join("");

  initReelsHover(track);
}

function initReelsHover(track) {
  const cards = track.querySelectorAll(".reel-card");

  cards.forEach((card) => {
    const video = card.querySelector("video");
    if (!video) return;

    const start = parseFloat(card.dataset.start) || 0;
    const duration = parseFloat(card.dataset.duration) || 2;
    let timeUpdateHandler = null;
    let endedHandler = null;

    const getStopAt = () => {
      const stop = start + duration;
      if (video.duration && !Number.isNaN(video.duration)) {
        return Math.min(stop, video.duration);
      }
      return stop;
    };

    const clearPreview = () => {
      if (timeUpdateHandler) {
        video.removeEventListener("timeupdate", timeUpdateHandler);
        timeUpdateHandler = null;
      }
      if (endedHandler) {
        video.removeEventListener("ended", endedHandler);
        endedHandler = null;
      }
      video.pause();
      video.currentTime = start;
      card.classList.remove("is-playing");
    };

    const loopPreview = () => {
      video.currentTime = start;
      video.play().catch(() => clearPreview());
    };

    const playPreview = () => {
      clearPreview();
      card.classList.add("is-playing");

      timeUpdateHandler = () => {
        if (video.currentTime >= getStopAt() - 0.05) {
          loopPreview();
        }
      };

      endedHandler = () => {
        if (card.classList.contains("is-playing")) {
          loopPreview();
        }
      };

      video.addEventListener("timeupdate", timeUpdateHandler);
      video.addEventListener("ended", endedHandler);
      loopPreview();
    };

    video.addEventListener("loadedmetadata", () => {
      video.currentTime = start;
    });

    card.addEventListener("mouseenter", playPreview);
    card.addEventListener("mouseleave", clearPreview);
  });
}

function initScrollAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = document.querySelectorAll(
    ".section, .showcase-panel, .gallery-grid--page .gallery-item, .reels-section, .reel-card, .feature-card, .cta-block, .pricing-category, .contact-form, .seo-content, .faq-item"
  );

  targets.forEach((el, i) => {
    el.classList.add("animate-on-scroll");
    el.style.setProperty("--delay", `${(i % 5) * 0.07}s`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
}

let lightboxItems = [];

function initGallery() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightbox-close");
  if (!lightbox) return;

  closeBtn?.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

function openLightbox(items, index) {
  lightboxItems = items;
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  if (!lightbox || !img) return;

  const item = items[index];
  img.src = item.src;
  img.alt = item.alt;
  if (caption) caption.textContent = item.caption || "";
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

function initContactForm() {
  const forms = document.querySelectorAll(".contact-form");
  if (!forms.length) return;

  const config = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
  const formConfig = config.form || {};
  const page = document.body.dataset.page || "unknown";

  forms.forEach((form) => {
    const success = form.querySelector(".form-success");
    const error = form.querySelector(".form-error");
    const submitBtn = form.querySelector("[type=submit]");
    const phoneInput = form.querySelector('input[name="phone"]');

    if (phoneInput && formConfig.phonePlaceholder) {
      phoneInput.placeholder = formConfig.phonePlaceholder;
    }

    const responseTimeEl = form.querySelector("[data-response-time]");
    if (responseTimeEl && formConfig.responseTime) {
      responseTimeEl.textContent = formConfig.responseTime;
    }

    const hideMessages = () => {
      success?.classList.remove("show");
      error?.classList.remove("show");
    };

    const showSuccess = () => {
      if (!success) return;
      success.textContent =
        formConfig.successMessage ||
        "Ďakujeme za správu! Ozveme sa vám do 24 hodín.";
      success.classList.add("show");
      trackEvent("generate_lead", { method: "contact_form", page });
      setTimeout(() => success.classList.remove("show"), 8000);
    };

    const showError = (message) => {
      if (!error) return;
      error.textContent = message || formConfig.errorMessage || "Odoslanie sa nepodarilo.";
      error.classList.add("show");
    };

    const getPayload = () => {
      const formData = new FormData(form);
      return {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        service: String(formData.get("service") || "").trim(),
        message: String(formData.get("message") || "").trim(),
        status: formConfig.orderStatus?.default || "Nová",
        submittedAt: new Date().toISOString(),
        source: window.location.origin || "spotless-cleaning",
        page: page === "home" ? "domov" : page,
      };
    };

    const sendToMake = async (webhookUrl, payload) => {
      const body = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        body.append(key, value);
      });

      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        body,
      });
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      hideMessages();

      const payload = getPayload();
      const webhookUrl = formConfig.makeWebhookUrl?.trim();

      if (!webhookUrl) {
        showSuccess();
        form.reset();
        return;
      }

      const originalLabel = submitBtn?.textContent || "Odoslať správu";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Odosielam…";
      }

      try {
        await sendToMake(webhookUrl, payload);
        showSuccess();
        form.reset();
      } catch (err) {
        showError();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initSite);
