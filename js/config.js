const SITE_CONFIG = {
  businessName: "Spotless",
  logoText: "SPOTLESS",
  logo: "/images/logo-spotless.png",
  tagline: "Profesionálne tepovanie a umývanie okien — Levice a okolie",
  description:
    "Hĺbkové tepovanie sedačiek, kobercov, áut a umývanie okien v Leviciach a Nitre. Vráťte čistotu svojmu domovu či vozidlu.",

  seo: {
    siteUrl: "https://www.spotlesscleaning.sk",
    siteName: "Spotless Cleaning",
    locale: "sk_SK",
    homeTitle: "Tepovanie a umývanie okien Levice & Nitra | Spotless",
    homeDescription:
      "Hĺbkové tepovanie sedačiek, kobercov, áut a umývanie okien v Leviciach a Nitre. Vráťte čistotu svojmu domovu či vozidlu. Objednajte si overenú kvalitu.",
    ogImage: "/images/og-image.jpg",
    ogImageWidth: 1200,
    ogImageHeight: 630,
    logo: "/images/favicon-192.png",
    // Google Analytics 4 → Admin → Data Streams → Measurement ID (G-XXXXXXXXXX)
    ga4MeasurementId: "G-7Y9ZVSKEVJ",
  },

  hero: {
    headline: "Profesionálne tepovanie a umývanie okien",
    subheadline:
      "Hĺbkové čistenie sedačiek, kobercov a áut pre domácnosti aj firmy. Pôsobíme v Leviciach, Nitre a okolí — doprava v Leviciach zdarma.",
    ctaPrimary: {
      text: "Chcem nezáväznú kalkuláciu",
      textMobile: "Nezáväzná kalkulácia",
      link: "#objednavka",
    },
    ctaSecondary: { text: "Cenník služieb", link: "/cennik" },
    image: "/images/hero-cleaning.png",
    imageAlt: "Profesionálne tepovanie sedačiek a umývanie okien — Spotless Cleaning",
    trustPoints: [
      "Levice, Nitra a okolie",
      "Doprava v Leviciach zdarma",
      "Odpoveď do 24 hodín",
    ],
  },

  faq: [
    {
      question: "Koľko stojí tepovanie auta?",
      answer:
        "Cena závisí od veľkosti vozidla a miery znečistenia. Kompletný prehľad nájdete v našom cenníku. Pre zákazníkov v Leviciach platí doprava zdarma, pre Nitru a okolie ju kalkulujeme individuálne.",
    },
    {
      question: "Ako dlho po tepovaní schne sedačka alebo koberec?",
      answer:
        "Doba schnutia po hĺbkovom tepovaní sedačiek a kobercov zvyčajne trvá 6 až 12 hodín v závislosti od teploty v miestnosti, vlhkosti vzduchu a typu materiálu. Odporúčame miestnosť po našom odchode dobre vyvetrať.",
    },
    {
      question: "Čo všetko zahŕňa čistenie kože a ošetrenie kožených sedačiek?",
      answer:
        "Proces zahŕňa vysávanie nečistôt, jemné ručné čistenie špeciálnym penovým čističom na kožu, odstránenie mastnoty a následné ošetrenie balzamom (impregnáciou). To koži vráti pružnosť a chráni ju pred UV žiarením a popraskaním.",
    },
    {
      question: "Vykonávate umývanie okien v domácnosti aj počas zimy?",
      answer:
        "Áno, umývanie okien a čistenie okien realizujeme aj počas chladnejších mesiacov, pokiaľ teploty neklesnú výrazne pod bod mrazu, kedy by čistiace prípravky na skle zamŕzali.",
    },
    {
      question: "Prečo si vybrať Spotless Cleaning?",
      answer:
        "Sme lokálny špecialista s osobným prístupom. Používame profesionálnu techniku a ekologické prostriedky bezpečné pre deti aj domácich miláčikov. Pôsobíme v Leviciach, Nitre a okolí — doprava v rámci mesta Levice je zdarma.",
    },
  ],

  sections: {
    services: {
      eyebrow: "Naše služby",
      title: "Tepovanie, umývanie okien a čistenie kože",
      subtitle:
        "Kompletné čistiace služby pre domácnosti aj firmy — sedačky, koberce, autá aj okná.",
    },
    gallery: {
      eyebrow: "Referencie",
      title: "Pred a po — naša práca",
      subtitle:
        "Reálne výsledky tepovania sedačiek, kobercov a interiérov áut.",
    },
    order: {
      eyebrow: "Objednávka",
      title: "Vráťte svojmu domovu alebo autu čistotu a lesk",
      subtitle:
        "Zarezervujte si termín na tepovanie sedačky, kobercov alebo umývanie okien ešte dnes. Ozveme sa vám s ponukou termínu do 24 hodín.",
    },
  },

  pages: {
    pricing: {
      eyebrow: "Cenník",
      title: "Cenník tepovania, čistenia okien a ozónovania",
      subtitle:
        "Transparentné ceny bez skrytých poplatkov. Doprava v rámci mesta Levice je zdarma.",
      metaDescription:
        "Cenník tepovania sedačiek, kobercov a áut, čistenie okien a ozónovania v Leviciach. Doprava v meste zdarma.",
    },
    gallery: {
      eyebrow: "Galéria",
      title: "Galéria — fotky pred a po",
      subtitle:
        "Reálne výsledky tepovania sedačiek, kobercov, kresiel a interiérov áut. Kliknite na fotku pre zväčšenie.",
      metaDescription:
        "Galéria Spotless Cleaning — fotky pred a po tepovaní sedačiek, kobercov a áut v Leviciach a okolí.",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Kontakt a objednávka",
      subtitle:
        "Zavolajte, napíšte email alebo vyplňte formulár. Ozveme sa do 24 hodín s termínom čistenia.",
      metaDescription:
        "Objednávka tepovania — Spotless Cleaning. Telefón +421 951 093 781, email, formulár. Odpoveď do 24 hodín.",
    },
  },

  cta: {
    pricing: {
      eyebrow: "Individuálna ponuka",
      title: "Chcete presnú cenu na mieru?",
      subtitle:
        "Cena sa môže líšiť podľa miery znečistenia. Zavolajte alebo napíšte — pripravíme ponuku.",
      primary: { text: "Nezáväzná objednávka", link: "/kontakt" },
      secondary: { text: "Zavolať teraz", link: "tel:+421951093781" },
      note: "Odpoveď do 24 hodín · Doprava v Leviciach zdarma",
    },
    gallery: {
      eyebrow: "Objednávka",
      title: "Chcete rovnaký výsledok u vás doma?",
      subtitle:
        "Objednajte tepovanie sedačky, koberca, auta alebo čistenie okien — ozveme sa s termínom do 24 hodín.",
      primary: { text: "Objednať tepovanie", link: "/kontakt" },
      secondary: { text: "Pozrieť cenník", link: "/cennik" },
      note: "Doprava v Leviciach zdarma",
    },
  },

  navCta: {
    text: "Objednať čistenie",
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
    areaServed: "Levice, Nitra a okolie",
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
      text: "Hlboké tepovanie sedačiek, kresiel, postelí a kobercov — viditeľný výsledok pred a po.",
    },
    {
      icon: "🚗",
      title: "Tepovanie interiéru auta",
      text: "Čistenie sedadiel a kompletný interiér hatchbacku, sedanu alebo SUV. Kufor aj koberce.",
    },
    {
      icon: "🪟",
      title: "Umývanie okien",
      text: "Okná, balkónové dvere, francúzske okná a žalúzie — bez šmúh, pre domácnosti aj firmy.",
    },
    {
      icon: "🌿",
      title: "Ozónovanie a dezinfekcia",
      text: "Dezinfekcia priestorov ozónom. Možnosť prenájmu ozónového stroja od 15 €.",
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
      src: "/images/tepovanie-sedaciek-levice-pred-a-po.png",
      alt: "Tepovanie sedačky — porovnanie pred a po čistení",
      caption: "Tepovanie sedačky — pred a po",
      wide: true,
    },
    {
      src: "/images/tepovanie-autosedaciek-nitra.png",
      alt: "Tepovanie autosedačiek — pred a po čistení",
      caption: "Tepovanie autosedačiek — pred a po",
      wide: true,
    },
    {
      src: "/images/umyvanie-okien-v-domacnosti.png",
      alt: "Umývanie okien v domácnosti — čistenie skiel a rámov",
      caption: "Umývanie okien v domácnosti",
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
