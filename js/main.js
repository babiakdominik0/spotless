function toWebpSrc(src) {
  if (!src || !/\.(png|jpe?g)$/i.test(src)) return null;
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
}

function buildPictureMarkup(src, { alt = "", loading, fetchPriority, className, width, height } = {}) {
  const webp = toWebpSrc(src);
  const imgAttrs = [
    `src="${src}"`,
    alt !== undefined ? `alt="${alt}"` : "",
    loading ? `loading="${loading}"` : "",
    fetchPriority ? `fetchpriority="${fetchPriority}"` : "",
    className ? `class="${className}"` : "",
    width ? `width="${width}"` : "",
    height ? `height="${height}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!webp) return `<img ${imgAttrs}>`;

  return `<picture>${webp ? `<source srcset="${webp}" type="image/webp">` : ""}<img ${imgAttrs}></picture>`;
}

function hasStaticContent(container) {
  return container?.dataset.staticContent === "true" || container.children.length > 0;
}

function bindGalleryItems(container, lightboxItems) {
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
  initServiceCards();
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
    renderReviews(config);
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
    const picture = heroImg.closest("picture");
    const webp = toWebpSrc(hero.image);
    if (picture && webp) {
      const source = picture.querySelector("source");
      if (source) source.srcset = webp;
    }
    heroImg.src = hero.image;
    heroImg.alt = hero.imageAlt || "";
  }
  if (trustEl && hero.trustPoints?.length && !hasStaticContent(trustEl)) {
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
  if (!container || !config.faq?.length || hasStaticContent(container)) return;

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
  if (!container || !config.services || hasStaticContent(container)) return;

  container.className = "features-grid features-grid--expandable";
  container.innerHTML = config.services
    .map(
      (s) => `
    <article class="feature-card feature-card--expandable">
      <div class="feature-card__head">
        <div class="feature-icon" aria-hidden="true">${s.icon}</div>
        <h3>${s.title}</h3>
        <p class="feature-card__teaser">${s.text}</p>
        <span class="feature-card__more">Čítať ďalej</span>
      </div>
      <div class="feature-card__detail" aria-hidden="true">
        <div class="feature-card__detail-inner">${s.detail || ""}<button type="button" class="feature-card__less">Čítať menej</button></div>
      </div>
    </article>
  `
    )
    .join("");
}

function initServiceCards() {
  const grid = document.getElementById("services-grid");
  if (!grid?.classList.contains("features-grid--expandable")) return;

  const cards = grid.querySelectorAll(".feature-card--expandable");
  const desktopQuery = window.matchMedia("(min-width: 640px)");

  const collapseCard = (card, instant = false) => {
    if (instant) card.classList.add("is-instant");
    card.classList.remove("is-expanded");
    card.setAttribute("aria-expanded", "false");
    const detail = card.querySelector(".feature-card__detail");
    if (detail) detail.setAttribute("aria-hidden", "true");
    if (instant) {
      requestAnimationFrame(() => card.classList.remove("is-instant"));
    }
  };

  const clearExpanded = () => {
    grid.classList.remove("features-grid--expanded", "is-switching");
    cards.forEach((c) => collapseCard(c, true));
  };

  const expandCard = (card, { instant = false } = {}) => {
    card.classList.add("is-expanded");
    card.setAttribute("aria-expanded", "true");
    const detail = card.querySelector(".feature-card__detail");
    if (detail) detail.setAttribute("aria-hidden", "false");
    if (desktopQuery.matches) {
      grid.classList.add("features-grid--expanded");
    }
    if (instant) {
      card.classList.add("is-instant");
      requestAnimationFrame(() => card.classList.remove("is-instant"));
    }
    if (!desktopQuery.matches) {
      requestAnimationFrame(() => {
        card.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  };

  const activateCard = (card) => {
    const current = grid.querySelector(".feature-card--expandable.is-expanded");

    if (current === card) {
      clearExpanded();
      return;
    }

    if (desktopQuery.matches && current) {
      grid.classList.add("is-switching", "features-grid--expanded");
      collapseCard(current, true);
      expandCard(card, { instant: true });
      requestAnimationFrame(() => grid.classList.remove("is-switching"));
      return;
    }

    clearExpanded();
    expandCard(card);
  };

  cards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", "false");
    const detail = card.querySelector(".feature-card__detail");
    if (detail) detail.setAttribute("aria-hidden", "true");

    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      if (e.target.closest(".feature-card__less")) return;
      activateCard(card);
    });

    card.querySelector(".feature-card__less")?.addEventListener("click", (e) => {
      e.stopPropagation();
      clearExpanded();
    });

    card.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      if (e.target.closest("a") || e.target.closest(".feature-card__less")) return;
      e.preventDefault();
      activateCard(card);
    });
  });

  document.addEventListener("click", (e) => {
    if (grid.contains(e.target)) return;
    clearExpanded();
  });

  desktopQuery.addEventListener("change", () => {
    const expanded = grid.querySelector(".feature-card--expandable.is-expanded");
    if (!expanded) return;
    if (desktopQuery.matches) {
      grid.classList.add("features-grid--expanded");
    } else {
      grid.classList.remove("features-grid--expanded", "is-switching");
    }
  });
}

function renderStarString(rating = 5) {
  const value = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  return "★".repeat(value) + "☆".repeat(5 - value);
}

function renderReviews(config) {
  const grid = document.getElementById("reviews-grid");
  if (!grid || !config.reviews?.length) return;

  const gb = config.googleBusiness || {};
  const summary = document.querySelector(".reviews-summary");
  if (summary) {
    const score = summary.querySelector(".reviews-summary__score");
    const meta = summary.querySelector(".reviews-summary__meta");
    const stars = summary.querySelector(".review-stars--lg");
    const link = summary.querySelector(".reviews-summary__link");
    const rating = gb.rating ?? 5;
    const count = gb.reviewCount ?? config.reviews.length;

    if (score) score.textContent = rating.toFixed(1).replace(".", ",");
    if (meta) {
      const label = count === 1 ? "recenzia" : count >= 2 && count <= 4 ? "recenzie" : "recenzií";
      meta.textContent = `${count} ${label} na Google`;
    }
    if (stars) {
      stars.textContent = renderStarString(rating);
      stars.setAttribute("aria-label", `Hodnotenie ${rating} z 5`);
    }
    if (link && gb.url) link.href = gb.url;
  }

  if (hasStaticContent(grid)) return;

  grid.innerHTML = config.reviews
    .map((review) => {
      const rating = review.rating ?? 5;
      const stars = renderStarString(rating);
      const textBlock = review.text
        ? `<blockquote class="review-card__text">„${review.text}“</blockquote>`
        : "";
      const ratingOnlyClass = review.text ? "" : " review-card--rating-only";

      return `
    <article class="review-card${ratingOnlyClass}">
      <div class="review-stars" aria-label="${rating} z 5 hviezdičiek">${stars}</div>
      ${textBlock}
      <footer class="review-card__footer">
        <cite class="review-card__author">${review.author}</cite>
        <span class="review-card__source">Google</span>
      </footer>
    </article>
  `;
    })
    .join("");
}

function renderPricing(config) {
  const container = document.getElementById("pricing-grid");
  if (!container || hasStaticContent(container)) return;

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
  if (!select || !config.contactServices || select.options.length > 1) return;

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

  if (hasStaticContent(container)) {
    if (isPage) container.className = "gallery-grid gallery-grid--page";
    bindGalleryItems(container, lightboxItems);
    return;
  }

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
        ${buildPictureMarkup(item.src, { alt: item.alt, loading: "lazy" })}
      </div>
      ${item.caption ? `<figcaption class="gallery-caption">${item.caption}</figcaption>` : ""}
    </figure>
  `;
    })
    .join("");

  bindGalleryItems(container, lightboxItems);
}

function renderReels(config, containerId = "reels-track", options = { linked: true }) {
  const track = document.getElementById(containerId);
  const reelsConfig = config.instagramReels;
  if (!track || !reelsConfig?.items?.length) return;

  const duration = reelsConfig.previewDuration || 2;
  const linked = options.linked !== false;
  const videoMarkup = (videoSrc) =>
    `<video class="reel-card__video" muted playsinline preload="none" data-src="${videoSrc}" aria-hidden="true"></video>`;

  track.innerHTML = reelsConfig.items
    .map((reel) => {
      const dataAttrs = `data-start="${reel.startTime || 0}" data-duration="${duration}"`;
      const inner = `
        <span class="reel-card__ring">
          <span class="reel-card__inner">
            ${videoMarkup(reel.video)}
          </span>
        </span>`;

      if (linked) {
        return `<a href="${reel.url}" class="reel-card" target="_blank" rel="noopener noreferrer" ${dataAttrs} aria-label="Instagram reel">${inner}</a>`;
      }
      return `<div class="reel-card reel-card--home" ${dataAttrs} role="group">
          <span class="reel-card__inner">
            ${videoMarkup(reel.video)}
          </span>
        </div>`;
    })
    .join("");

  initReelsHover(track);
}

function ensureReelVideoSource(video) {
  if (!video || video.dataset.loaded === "true") return;
  const src = video.dataset.src;
  if (!src) return;

  video.dataset.loaded = "true";
  const source = document.createElement("source");
  source.src = src;
  source.type = "video/mp4";
  video.appendChild(source);
  video.preload = "metadata";
  video.load();
}

function initReelPoster(card, video, start, delayMs = 0) {
  const preparePoster = () => {
    if (card.dataset.posterReady === "true") return;
    card.dataset.posterReady = "true";
    ensureReelVideoSource(video);

    const showPosterFrame = () => {
      if (card.classList.contains("is-playing")) return;

      try {
        video.currentTime = start;
      } catch {
        /* ignore seek before frame is ready */
      }
      video.pause();
      card.classList.add("is-ready");
    };

    if (video.readyState >= 2) {
      showPosterFrame();
      return;
    }

    video.addEventListener("loadeddata", showPosterFrame, { once: true });
  };

  const schedulePoster = () => {
    if (delayMs > 0) {
      window.setTimeout(preparePoster, delayMs);
    } else {
      preparePoster();
    }
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            schedulePoster();
            observer.disconnect();
          }
        });
      },
      { rootMargin: "80px", threshold: 0.15 }
    );
    observer.observe(card);
    return;
  }

  schedulePoster();
}

function initReelTouchScrollPlay(card, playPreview, clearPreview) {
  const SCROLL_THRESHOLD = 12;
  let startX = 0;
  let startY = 0;
  let tracking = false;
  let scrollTriggered = false;
  let blockLinkUntil = 0;

  card.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length !== 1) return;
      tracking = true;
      scrollTriggered = false;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    },
    { passive: true }
  );

  card.addEventListener(
    "touchmove",
    (event) => {
      if (!tracking || scrollTriggered || card.classList.contains("is-playing")) return;

      const dx = event.touches[0].clientX - startX;
      const dy = event.touches[0].clientY - startY;
      if (Math.hypot(dx, dy) < SCROLL_THRESHOLD) return;

      scrollTriggered = true;
      tracking = false;
      blockLinkUntil = Date.now() + 450;
      playPreview();
    },
    { passive: true }
  );

  const resetTouch = () => {
    tracking = false;
  };

  card.addEventListener("touchend", resetTouch, { passive: true });
  card.addEventListener("touchcancel", resetTouch, { passive: true });

  if (card.tagName === "A") {
    card.addEventListener(
      "click",
      (event) => {
        if (Date.now() < blockLinkUntil || card.classList.contains("is-playing")) {
          event.preventDefault();
        }
      },
      true
    );
  }

  if ("IntersectionObserver" in window) {
    const pauseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && card.classList.contains("is-playing")) {
            clearPreview();
          }
        });
      },
      { threshold: 0.12 }
    );
    pauseObserver.observe(card);
  }
}

function initReelsHover(track) {
  const cards = track.querySelectorAll(".reel-card");
  const touchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  const reelControllers = [];

  const stopOtherReels = (activeCard) => {
    reelControllers.forEach(({ card, clearPreview }) => {
      if (card !== activeCard) clearPreview();
    });
  };

  cards.forEach((card, index) => {
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

    const resetPreviewHandlers = () => {
      if (timeUpdateHandler) {
        video.removeEventListener("timeupdate", timeUpdateHandler);
        timeUpdateHandler = null;
      }
      if (endedHandler) {
        video.removeEventListener("ended", endedHandler);
        endedHandler = null;
      }
    };

    const clearPreview = () => {
      resetPreviewHandlers();
      video.pause();
      try {
        video.currentTime = start;
      } catch {
        /* ignore seek before frame is ready */
      }
      card.classList.remove("is-playing");
    };

    const beginPlayback = () => {
      if (!card.classList.contains("is-playing")) return;

      video.muted = true;
      video.playsInline = true;

      const playFromStart = () => {
        if (!card.classList.contains("is-playing")) return;
        video.play().catch(() => clearPreview());
      };

      const seekToStart = () => {
        if (Math.abs(video.currentTime - start) < 0.05) {
          playFromStart();
          return;
        }

        const onSeeked = () => {
          video.removeEventListener("seeked", onSeeked);
          playFromStart();
        };

        video.addEventListener("seeked", onSeeked);
        try {
          video.currentTime = start;
        } catch {
          video.removeEventListener("seeked", onSeeked);
          playFromStart();
          return;
        }

        if (!video.seeking) {
          video.removeEventListener("seeked", onSeeked);
          playFromStart();
        }
      };

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        seekToStart();
      } else {
        video.addEventListener(
          "loadeddata",
          () => {
            if (card.classList.contains("is-playing")) seekToStart();
          },
          { once: true }
        );
      }
    };

    const loopPreview = () => {
      beginPlayback();
    };

    const playPreview = () => {
      stopOtherReels(card);
      ensureReelVideoSource(video);
      video.preload = "auto";
      resetPreviewHandlers();
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

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        beginPlayback();
      } else {
        video.addEventListener(
          "canplay",
          () => {
            if (card.classList.contains("is-playing")) beginPlayback();
          },
          { once: true }
        );
      }
    };

    video.addEventListener("loadedmetadata", () => {
      if (video.dataset.loaded === "true" && !card.classList.contains("is-playing")) {
        video.currentTime = start;
      }
    });

    reelControllers.push({ card, clearPreview, playPreview });

    initReelPoster(card, video, start, index * 180);

    if (touchDevice) {
      initReelTouchScrollPlay(card, playPreview, clearPreview);
      return;
    }

    card.addEventListener("mouseenter", playPreview);
    card.addEventListener("mouseleave", clearPreview);
  });
}

function initScrollAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = document.querySelectorAll(
    ".section, .showcase-panel, .gallery-grid--page .gallery-item, .reels-section, .reel-card, .feature-card, .review-card, .cta-block, .pricing-category, .contact-form, .seo-content, .faq-item"
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
