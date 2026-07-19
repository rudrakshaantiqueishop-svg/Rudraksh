// ---------------------------------------------------------------------
// Catalog taxonomy — the 11 client categories and every subcategory
// ("type") under them. Consumed by prisma/seed.ts.
//
// Images here are LOCAL placeholder assets. The Cloudinary refresh script
// (scripts/refresh-images.ts) overwrites product / category / subcategory
// images with a shared pool of stock photos after seeding.
// ---------------------------------------------------------------------

export type SubcategorySeed = {
  name: string;
  slug: string;
  group?: string;
  image: string;
  // Attribute defaults applied to every product generated under this
  // subcategory (individual products still vary origin/energized/etc).
  attrs?: {
    mukhi?: number;
    gemstoneType?: string;
    planet?: string;
    chakra?: string;
    zodiac?: string;
  };
};

export type CategorySeed = {
  name: string;
  slug: string;
  image: string;
  sortOrder: number;
  pageContent: CategoryPageContent;
  subcategories: SubcategorySeed[];
};

// Keep this shape in sync with src/lib/product-utils.ts CategoryPageContent.
export type CategoryPageContent = {
  heroTitle: string;
  heroSubtitle: string;
  introHeading: string;
  introDescription: string;
  introImage: string;
  checklistHeading: string;
  checklist: string[];
  checklistImages: [string, string];
  fitCheckRightLabel: string;
  fitCheckRightItems: string[];
  fitCheckWrongLabel: string;
  fitCheckWrongItems: string[];
  fitCheckImage: string;
  exploreDesigns: {
    heading: string;
    description: string;
    items: { title: string; description: string; image: string }[];
  };
};

// A small rotation of existing local assets used as placeholders before the
// Cloudinary refresh runs.
const IMG = {
  rudraksh: "/assets/images/home/rudraksh.png",
  beads: "/assets/images/home/beads.png",
  god: "/assets/images/home/god.png",
  bracelet: "/assets/images/products/category-bracelets.png",
  necklace: "/assets/images/products/category-necklace.png",
  sacred1: "/assets/images/about/about-sacred-1.png",
  sacred2: "/assets/images/about/about-sacred-2.png",
  founding1: "/assets/images/about/about-founding-1.png",
  founding2: "/assets/images/about/about-founding-2.png",
  gem: "/assets/images/about/about-p01-3021a5.png",
  p02: "/assets/images/about/about-p02.png",
  p04: "/assets/images/about/about-p04.png",
  principle3: "/assets/images/about/about-principle-3.png",
} as const;

const PLACEHOLDER_ROTATION = Object.values(IMG);

// Deterministically pick a placeholder from the rotation by index.
export function rotationImage(i: number): string {
  return PLACEHOLDER_ROTATION[i % PLACEHOLDER_ROTATION.length];
}

// Builds a full CategoryPageContent block from a few inputs so we don't have
// to hand-author 11 of them. Existing categories keep their richer copy where
// it matters; the rest get this sensible default.
function buildPageContent(opts: {
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  introHeading: string;
  introDescription: string;
  image: string;
  altImage?: string;
}): CategoryPageContent {
  const alt = opts.altImage ?? opts.image;
  return {
    heroTitle: opts.heroTitle,
    heroSubtitle: opts.heroSubtitle,
    introHeading: opts.introHeading,
    introDescription: opts.introDescription,
    introImage: opts.image,
    checklistHeading: `Every ${opts.name} Item You See Here Is`,
    checklist: [
      "Physically examined for authenticity and finish",
      "Sourced from trusted, traditional suppliers",
      "Quality-checked before it is listed",
      "Provided with certification where applicable",
      "Final-checked and cleansed before dispatch",
    ],
    checklistImages: [IMG.sacred1, IMG.sacred2],
    fitCheckRightLabel: `${opts.name} May Be Right for You If:`,
    fitCheckRightItems: [
      "You value authenticity over appearance",
      "You're seeking spiritual grounding and traditional guidance",
      "You want honest information, not exaggerated claims",
    ],
    fitCheckWrongLabel: `${opts.name} May Not Be Right for You If:`,
    fitCheckWrongItems: [
      "You're looking for instant or guaranteed outcomes",
      "You prefer purely decorative pieces with no context",
      "You're unsure and don't want any guidance",
    ],
    fitCheckImage: alt,
    exploreDesigns: {
      heading: "Explore Our Collection",
      description: `Browse the different types of ${opts.name.toLowerCase()} available, each verified and cared for the same way.`,
      items: [
        { title: "Traditional", description: "Classic forms for regular spiritual use.", image: opts.image },
        { title: "Everyday", description: "Comfortable, ready-to-wear or ready-to-place pieces.", image: alt },
        { title: "Premium", description: "Higher-grade selections for collectors and gifting.", image: IMG.gem },
        { title: "Energized", description: "Cleansed and energized on request before dispatch.", image: IMG.sacred2 },
      ],
    },
  };
}

// slug helper
function slug(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[()']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Rudraksha subcategories: 1–21 Mukhi + the four named beads ──────────
const RUDRAKSHA_SUBS: SubcategorySeed[] = [
  ...Array.from({ length: 21 }, (_, i): SubcategorySeed => {
    const n = i + 1;
    return {
      name: `${n} Mukhi Rudraksha`,
      slug: `${n}-mukhi-rudraksha`,
      image: rotationImage(i),
      attrs: { mukhi: n },
    };
  }),
  { name: "Gauri Shankar Rudraksha", slug: "gauri-shankar-rudraksha", image: IMG.rudraksh },
  { name: "Ganesh Rudraksha", slug: "ganesh-rudraksha", image: IMG.beads },
  { name: "Garbh Gauri Rudraksha", slug: "garbh-gauri-rudraksha", image: IMG.sacred1 },
  { name: "Trijuti Rudraksha", slug: "trijuti-rudraksha", image: IMG.sacred2 },
];

function subs(names: string[], group?: string, startIdx = 0): SubcategorySeed[] {
  return names.map((name, i) => ({
    name,
    slug: slug(name),
    group,
    image: rotationImage(startIdx + i),
  }));
}

const GEMSTONE_LOOSE: SubcategorySeed[] = [
  ["Ruby (Manik)", "Sun", "Leo"],
  ["Pearl (Moti)", "Moon", "Cancer"],
  ["Red Coral (Moonga)", "Mars", "Aries"],
  ["Emerald (Panna)", "Mercury", "Gemini"],
  ["Yellow Sapphire (Pukhraj)", "Jupiter", "Sagittarius"],
  ["Diamond (Heera)", "Venus", "Taurus"],
  ["Blue Sapphire (Neelam)", "Saturn", "Capricorn"],
  ["Hessonite (Gomed)", "Rahu", ""],
  ["Cat's Eye (Lehsunia)", "Ketu", ""],
].map(([name, planet, zodiac], i): SubcategorySeed => ({
  name,
  slug: slug(name),
  group: "Loose Gemstones",
  image: rotationImage(i + 3),
  attrs: {
    gemstoneType: name.replace(/\s*\(.*\)/, "").trim(),
    planet,
    zodiac: zodiac || undefined,
  },
}));

export const CATALOG: CategorySeed[] = [
  {
    name: "Rudraksha",
    slug: "rudraksha",
    image: IMG.rudraksh,
    sortOrder: 0,
    pageContent: buildPageContent({
      name: "Rudraksha",
      heroTitle: "Authentic Rudraksha, Chosen with Care",
      heroSubtitle:
        "Every Rudraksha listed here is physically examined, scientifically verified, and handled with traditional respect—so you can explore with confidence, not confusion.",
      introHeading: "Rudraksha Beads",
      introDescription:
        "Rudraksha beads have been worn for centuries for spiritual grounding, focus, and inner balance. This collection brings together verified beads categorized by mukhi, origin, and form, so you can make an informed choice without pressure.",
      image: IMG.rudraksh,
      altImage: IMG.beads,
    }),
    subcategories: RUDRAKSHA_SUBS,
  },
  {
    name: "Antique Collection",
    slug: "antique-collection",
    image: IMG.founding2,
    sortOrder: 1,
    pageContent: buildPageContent({
      name: "Antique Collection",
      heroTitle: "Handcrafted Antiques & Spiritual Artifacts",
      heroSubtitle:
        "Handmade idols, stone carvings, and crystal artifacts—each piece finished by artisans and checked for quality before it reaches you.",
      introHeading: "Antique & Handmade Collection",
      introDescription:
        "From handmade Ganesha and elephant idols to crystal artifacts and decorative collectibles, this collection celebrates traditional craftsmanship for your home and altar.",
      image: IMG.founding2,
      altImage: IMG.god,
    }),
    subcategories: subs(
      [
        "Handmade Ganesha Idols",
        "Handmade Elephant Idols",
        "Stone Ganesha Collection",
        "Crystal Artifacts",
        "Decorative Spiritual Collectibles",
      ],
      undefined,
      1
    ),
  },
  {
    name: "Siddha Mala",
    slug: "siddha-mala",
    image: IMG.sacred1,
    sortOrder: 2,
    pageContent: buildPageContent({
      name: "Siddha Mala",
      heroTitle: "Siddha Mala, Strung with Intention",
      heroSubtitle:
        "Complete Rudraksha malas combining all mukhis—collected, customized, and energized for dedicated spiritual practice.",
      introHeading: "Siddha Mala Collection",
      introDescription:
        "A Siddha Mala brings together beads of different mukhis into a single powerful mala. Choose from ready collections, fully customized strings, or pre-energized malas.",
      image: IMG.sacred1,
      altImage: IMG.necklace,
    }),
    subcategories: subs(
      ["Siddha Mala Collection", "Customized Siddha Mala", "Energized Siddha Mala"],
      undefined,
      2
    ),
  },
  {
    name: "Rudraksha Kavach",
    slug: "rudraksha-kavach",
    image: IMG.sacred2,
    sortOrder: 3,
    pageContent: buildPageContent({
      name: "Rudraksha Kavach",
      heroTitle: "Rudraksha Kavach for Focused Intentions",
      heroSubtitle:
        "Purpose-built Rudraksha combinations—assembled and energized around a specific goal like protection, health, wealth, or spiritual growth.",
      introHeading: "Rudraksha Kavach",
      introDescription:
        "A Kavach is a curated combination of Rudraksha beads assembled for a particular intention. Explore Kavach sets for protection, health, wealth, success, and spiritual progress.",
      image: IMG.sacred2,
      altImage: IMG.rudraksh,
    }),
    subcategories: subs(
      [
        "Personal Protection Kavach",
        "Health Kavach",
        "Wealth Kavach",
        "Success Kavach",
        "Spiritual Kavach",
      ],
      undefined,
      3
    ),
  },
  {
    name: "Japa Mala",
    slug: "japa-mala",
    image: IMG.necklace,
    sortOrder: 4,
    pageContent: buildPageContent({
      name: "Japa Mala",
      heroTitle: "Japa Mala for Daily Practice",
      heroSubtitle:
        "108-bead malas in Rudraksha, tulsi, sandalwood, lotus seed, crystal, and gemstone—crafted for comfortable, consistent japa.",
      introHeading: "Japa Mala Collection",
      introDescription:
        "A japa mala supports mantra repetition and meditation. Choose the material that suits your practice—each mala is knotted for durability and counted for accuracy.",
      image: IMG.necklace,
      altImage: IMG.beads,
    }),
    subcategories: subs(
      [
        "Rudraksha Japa Mala",
        "Tulsi Mala",
        "Sandalwood Mala",
        "Lotus Seed Mala (Kamal Gatta)",
        "Crystal (Sphatik) Mala",
        "Gemstone Japa Mala",
      ],
      undefined,
      4
    ),
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    image: IMG.bracelet,
    sortOrder: 5,
    pageContent: buildPageContent({
      name: "Bracelets",
      heroTitle: "Sacred Bracelets, Worn with Intention",
      heroSubtitle:
        "Rudraksha and gemstone bracelets—checked for quality and energised on request, so they feel personal, not generic.",
      introHeading: "Rudraksha & Gemstone Bracelets",
      introDescription:
        "Bracelets keep Rudraksha and gemstone energy close through the day. Choose single-mukhi, combination, and designer Rudraksha bracelets, or crystal, chakra, zodiac, and healing gemstone bracelets.",
      image: IMG.bracelet,
      altImage: IMG.gem,
    }),
    subcategories: [
      ...subs(["Single Mukhi Bracelets", "Combination Bracelets", "Designer Bracelets"], "Rudraksha Bracelets", 5),
      ...subs(
        ["Crystal Bracelets", "Seven Chakra Bracelets", "Zodiac Bracelets", "Healing Bracelets"],
        "Gemstone Bracelets",
        8
      ),
    ],
  },
  {
    name: "Idols & Singing Bowls",
    slug: "idols-singing-bowls",
    image: IMG.god,
    sortOrder: 6,
    pageContent: buildPageContent({
      name: "Idols & Singing Bowls",
      heroTitle: "Divine Idols & Tibetan Singing Bowls",
      heroSubtitle:
        "Hand-finished deity idols and resonant Tibetan singing bowls for your altar, meditation, and sound practice.",
      introHeading: "Divine Idols & Singing Bowls",
      introDescription:
        "Bring presence to your space with deity idols—Ganesha, Shiva, Lakshmi, and more—and Tibetan singing bowls, handmade or machine made, sold individually or as sets.",
      image: IMG.god,
      altImage: IMG.p04,
    }),
    subcategories: [
      ...subs(
        ["Ganesha", "Shiva", "Lakshmi", "Saraswati", "Hanuman", "Buddha", "Nandi", "Other Deities"],
        "Divine Idols",
        0
      ).map((s) => ({ ...s, slug: `${s.slug}-idol` })),
      ...subs(
        ["Handmade Singing Bowls", "Machine Made Singing Bowls", "Singing Bowl Sets"],
        "Tibetan Singing Bowls",
        8
      ),
    ],
  },
  {
    name: "Gemstones",
    slug: "gemstones",
    image: IMG.gem,
    sortOrder: 7,
    pageContent: buildPageContent({
      name: "Gemstones",
      heroTitle: "Certified Gemstones, Chosen with Care",
      heroSubtitle:
        "Loose Navaratna gemstones and gemstone jewelry—lab-certified and selected for authenticity and astrological suitability.",
      introHeading: "Loose Gemstones & Jewelry",
      introDescription:
        "Explore the nine Navaratna gemstones as loose stones, or set into rings, pendants, bracelets, chains, necklaces, and earrings. Each stone is graded and certified.",
      image: IMG.gem,
      altImage: IMG.necklace,
    }),
    subcategories: [
      ...GEMSTONE_LOOSE,
      ...subs(
        ["Rings", "Pendants", "Bracelets", "Chains", "Necklaces", "Earrings"],
        "Gemstone Jewelry",
        3
      ).map((s) => ({ ...s, slug: `gemstone-${s.slug}` })),
    ],
  },
  {
    name: "Sphatik Collection",
    slug: "sphatik-collection",
    image: IMG.p02,
    sortOrder: 8,
    pageContent: buildPageContent({
      name: "Sphatik Collection",
      heroTitle: "Sphatik (Crystal Quartz) Collection",
      heroSubtitle:
        "Natural crystal quartz malas, bracelets, shivlings, yantras, and idols—prized for clarity and cooling energy.",
      introHeading: "Sphatik Collection",
      introDescription:
        "Sphatik (clear quartz) is valued for purity and calm. Explore sphatik malas, bracelets, shivlings, shree yantras, tortoises, pyramids, and idols.",
      image: IMG.p02,
      altImage: IMG.gem,
    }),
    subcategories: subs(
      [
        "Sphatik Mala",
        "Sphatik Bracelets",
        "Sphatik Shivling",
        "Sphatik Shree Yantra",
        "Sphatik Tortoise",
        "Sphatik Pyramid",
        "Sphatik Idols",
      ],
      undefined,
      6
    ),
  },
  {
    name: "Shree Yantra & Shivling",
    slug: "shree-yantra-shivling",
    image: IMG.principle3,
    sortOrder: 9,
    pageContent: buildPageContent({
      name: "Shree Yantra & Shivling",
      heroTitle: "Shree Yantra & Shivling",
      heroSubtitle:
        "Sacred yantras and shivlings in sphatik, brass, copper, crystal, and natural stone—for worship and prosperity.",
      introHeading: "Shree Yantra & Shivling",
      introDescription:
        "The Shree Yantra is revered for abundance, and the Shivling for devotion to Lord Shiva. Choose from sphatik, brass, copper, and crystal yantras, and sphatik, Narmadeshwar, black stone, marble, and quartz shivlings.",
      image: IMG.principle3,
      altImage: IMG.p02,
    }),
    subcategories: [
      ...subs(
        ["Sphatik Shree Yantra", "Brass Shree Yantra", "Copper Shree Yantra", "Crystal Shree Yantra"],
        "Shree Yantra",
        0
      ).map((s) => ({ ...s, slug: `sy-${s.slug}` })),
      ...subs(
        ["Sphatik Shivling", "Narmadeshwar Shivling", "Black Stone Shivling", "Marble Shivling", "Quartz Shivling"],
        "Shivling",
        4
      ).map((s) => ({ ...s, slug: `sl-${s.slug}` })),
    ],
  },
  {
    name: "Shankh Collection",
    slug: "shankh-collection",
    image: IMG.p04,
    sortOrder: 10,
    pageContent: buildPageContent({
      name: "Shankh Collection",
      heroTitle: "Sacred Shankh (Conch) Collection",
      heroSubtitle:
        "Dakshinavarti, Vamavarti, Gomukhi, Lakshmi, and other conches—selected for authenticity and used in puja and prosperity rituals.",
      introHeading: "Shankh Collection",
      introDescription:
        "The shankh is central to Hindu ritual and is believed to invite auspicious energy. Explore Dakshinavarti, Vamavarti, Gomukhi, Lakshmi, Ganesh, Moti, and puja shankhs.",
      image: IMG.p04,
      altImage: IMG.sacred1,
    }),
    subcategories: subs(
      [
        "Dakshinavarti Shankh",
        "Vamavarti Shankh",
        "Gomukhi Shankh",
        "Lakshmi Shankh",
        "Ganesh Shankh",
        "Moti Shankh",
        "Puja Shankh",
      ],
      undefined,
      0
    ),
  },
];
