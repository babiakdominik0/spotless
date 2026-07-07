const SITE_CONFIG = {
  businessName: "Spotless",
  logoText: "SPOTLESS",
  logo: "/images/logo-spotless.png",
  tagline: "Profesionálne tepovanie a čistenie v Leviciach a okolí",
  description:
    "Spotless Cleaning — tepovanie sedačiek, kobercov a áut, čistenie okien a dezinfekcia ozónom v Leviciach. Doprava v meste zdarma. Transparentný cenník.",

  seo: {
    siteUrl: "https://www.spotlesscleaning.sk",
    siteName: "Spotless Cleaning",
    locale: "sk_SK",
    ogImage: "/images/og-image.jpg",
    ogImageWidth: 1200,
    ogImageHeight: 630,
    // Google Analytics 4 → Admin → Data Streams → Measurement ID (G-XXXXXXXXXX)
    ga4MeasurementId: "G-7Y9ZVSKEVJ",
  },

  hero: {
    headline:
      "Tepovanie sedačiek, kobercov, áut a okien v Leviciach",
    subheadline:
      "Spotless Cleaning — hlboké tepovanie nábytku, profesionálne čistenie okien a dezinfekcia ozónom v Leviciach a okolí. Doprava v meste zdarma, transparentný cenník.",
    ctaPrimary: { text: "Nezáväzná objednávka", link: "#objednavka" },
    ctaSecondary: { text: "Cenník tepovania", link: "/cennik" },
    image: "/images/hero-cleaning.png",
    imageAlt: "Profesionálne tepovanie sedačiek a kobercov Spotless Cleaning Levice",
    trustPoints: [
      "Doprava v Leviciach zdarma",
      "Odpoveď do 24 hodín",
      "Fotky pred a po",
    ],
  },

  sections: {
    services: {
      eyebrow: "Služby v Leviciach",
      title: "Tepovanie, čistenie okien a ozónovanie",
      subtitle:
        "Kompletné čistiace služby pre domácnosti aj firmy v Leviciach a okolí — sedačky, koberce, autá aj okná.",
    },
    gallery: {
      eyebrow: "Referencie",
      title: "Tepovanie pred a po — Levice",
      subtitle:
        "Reálne výsledky tepovania sedačiek, kobercov a interiérov áut od Spotless Cleaning.",
    },
    order: {
      eyebrow: "Objednávka v Leviciach",
      title: "Nezáväzná objednávka tepovania",
      subtitle:
        "Vyplňte formulár — ozveme sa vám do 24 hodín s termínom a cenovou ponukou. Alebo nás kontaktujte telefonicky.",
    },
  },

  contact: {
    phone: "+421 951 093 781",
    email: "spotlesslv.cleaning@gmail.com",
    address: "Dolná Seč 201, 935 31",
    mapsUrl: "https://www.google.com/maps/search/Dolná+Seč+201,+935+31",
    hours: "Objednávky: Po – Ne (po dohode)",
  },

  localBusiness: {
    legalName: "Spotless Cleaning",
    streetAddress: "Dolná Seč 201",
    postalCode: "935 31",
    addressLocality: "Dolná Seč",
    addressRegion: "Nitra",
    addressCountry: "SK",
    areaServed: "Levice a okolie",
    priceRange: "€",
  },

  // Make.com: Webhooks → Custom webhook → skopíruj URL sem
  form: {
    makeWebhookUrl: "https://hook.eu1.make.com/nisvq9k8xmvduoecyi46xfh1jmjd3c4q",
    phonePlaceholder: "+421xxxxxxxxx",
    responseTime: "Ozveme sa vám do 24 hodín.",
    successMessage: "Ďakujeme za správu! Ozveme sa vám do 24 hodín.",
    errorMessage:
      "Odoslanie sa nepodarilo. Skúste to znova alebo nás zavolajte na +421 951 093 781.",
    orderStatus: {
      default: "Nová",
      options: ["Nová", "Zavolané", "Potvrdené", "Hotové", "Zrušené"],
    },
  },

  social: {
    instagram: "https://www.instagram.com/spotless_cleaning__/",
    facebook: "https://www.facebook.com/p/Spotless-Cleaning-61558413235487/",
    tiktok: "",
  },

  services: [
    {
      icon: "🛋️",
      title: "Tepovanie sedačiek a kobercov",
      text: "Hlboké tepovanie sedačiek, kresiel, postelí a kobercov v Leviciach — viditeľný výsledok pred a po.",
    },
    {
      icon: "🚗",
      title: "Tepovanie interiéru auta",
      text: "Čistenie sedadiel a kompletný interiér hatchbacku, sedanu alebo SUV. Tepovanie auta v Leviciach a okolí.",
    },
    {
      icon: "🪟",
      title: "Čistenie okien Levice",
      text: "Okná, balkónové dvere, francúzske okná a žalúzie — bez šmúh, pre domácnosti aj firmy.",
    },
    {
      icon: "🌿",
      title: "Ozónovanie a dezinfekcia",
      text: "Dezinfekcia priestorov ozónom v Leviciach. Prenájom ozónového stroja od 15 €.",
    },
  ],

  pricingCategories: [
    {
      title: "Čistenie okien",
      highlight: true,
      items: [
        { name: "1-krídlo", price: "6 €" },
        { name: "2-krídla", price: "10 €" },
        { name: "3-krídla", price: "13 €" },
        { name: "Balkónové dvere", price: "13 €" },
        { name: "Francúzske okno", price: "od 10 €" },
        { name: "Žalúzie", price: "od 2 €" },
      ],
    },
    {
      title: "Tepovanie kobercov",
      items: [
        { name: "V domácnostiach", price: "od 2,50 €/m²" },
        { name: "Firemné priestory", price: "od 2 €/m²" },
        { name: "Koberce s dlhým vlasom", price: "od 3 €/m²" },
      ],
    },
    {
      title: "Tepovanie nábytku",
      items: [
        { name: "Sedačka — 1 miesto", price: "od 6 €" },
        { name: "Kreslo — 1 miesto", price: "od 7 €" },
        { name: "Stolička / taburetka", price: "od 4 €" },
        { name: "Jednolôžková posteľ", price: "od 7 €" },
        { name: "Manželská posteľ", price: "od 13 €" },
        { name: "Matrac", price: "od 7 €" },
        { name: "Vankúš", price: "od 3 €" },
      ],
    },
    {
      title: "Tepovanie automobilov",
      items: [
        { name: "Sedadlo", price: "od 6 €" },
        { name: "Komplet hatchback", price: "od 45 €" },
        { name: "Komplet coupé / sedan", price: "od 50 €" },
        { name: "Komplet combi / SUV", price: "od 60 €" },
      ],
    },
    {
      title: "Čistenie kože",
      items: [
        { name: "1 sedadlo (auto)", price: "od 15 €" },
        { name: "1 miesto (sedačka)", price: "od 10 €" },
        { name: "Kreslo", price: "od 20 €" },
        { name: "Stolička", price: "od 6 €" },
      ],
    },
    {
      title: "Dezinfekcia ozónom",
      items: [
        { name: "Dezinfekcia priestorov (vrátane prenájmu stroja)", price: "od 15 €" },
      ],
    },
    {
      title: "Doprava",
      items: [
        { name: "V rámci mesta Levice", price: "zdarma" },
        { name: "Mimo mesta", price: "0,25 €/km" },
      ],
    },
  ],

  pricingNotes: [
    "Počíta sa cesta tam aj späť.",
    "Cena tepovania a čistenia kože sa môže líšiť podľa miery znečistenia.",
    "Možná množstevná zľava pre firmy.",
  ],

  contactServices: [
    "Tepovanie sedačky / kresla",
    "Tepovanie koberca",
    "Tepovanie auta",
    "Čistenie okien",
    "Dezinfekcia ozónom",
    "Čistenie kože",
    "Iné / na mieru",
  ],

  gallery: [
    {
      src: "/images/pred-po-sedacka.png",
      alt: "Pred a po tepovaní sedačky",
      caption: "Tepovanie sedačky — pred a po",
      wide: true,
    },
    {
      src: "/images/pred-po-sedadlo-1.png",
      alt: "Pred a po tepovaní sedadla v aute",
      caption: "Sedadlo v aute — pred a po",
      wide: true,
    },
    {
      src: "/images/pred-po-sedadlo-2.png",
      alt: "Pred a po čistení autosedačky",
      caption: "Autosedačka — pred a po",
      wide: true,
    },
    {
      src: "/images/pred-po-kreslo.png",
      alt: "Pred a po tepovaní kresla",
      caption: "Tepovanie kresla — pred a po",
      wide: true,
    },
    {
      src: "/images/pred-po-auto.png",
      alt: "Pred a po tepovaní interiéru auta",
      caption: "Interiér auta — pred a po",
      wide: true,
    },
    {
      src: "/images/pred-po-kufor.png",
      alt: "Pred a po čistení kufra auta",
      caption: "Kufor auta — pred a po",
      wide: true,
    },
  ],

  homeGalleryPreview: 3,

  instagramReels: {
    profileUrl: "https://www.instagram.com/spotless_cleaning__/",
    profileHandle: "@spotless_cleaning__",
    previewDuration: 2,
    items: [
      {
        id: "C_3X2OftK-7",
        url: "https://www.instagram.com/reel/C_3X2OftK-7/",
        video: "/videos/reels/reel-1.mp4",
        startTime: 3,
        label: "Tepovanie",
      },
      {
        id: "DWCnrulDNaa",
        url: "https://www.instagram.com/reel/DWCnrulDNaa/",
        video: "/videos/reels/reel-2.mp4",
        startTime: 2.5,
        label: "Čistenie",
      },
      {
        id: "DYVML_fsQwL",
        url: "https://www.instagram.com/reel/DYVML_fsQwL/",
        video: "/videos/reels/reel-3.mp4",
        startTime: 2,
        label: "Výsledok",
      },
      {
        id: "DJ4msrLs9Rm",
        url: "https://www.instagram.com/reel/DJ4msrLs9Rm/",
        video: "/videos/reels/reel-4.mp4",
        startTime: 0.4,
        label: "Pred / po",
      },
    ],
  },
};
