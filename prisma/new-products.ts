// Additional products added to the catalog. Shared by:
//   • prisma/seed.ts                     — included in a full re-seed
//   • scripts/seed-additional-products.ts — additive insert + Cloudinary image upload
//
// Each product's gallery images are sourced from Unsplash (see
// NEW_PRODUCT_IMAGE_SETS). The script downloads them, uploads to Cloudinary,
// writes the resulting secure URLs into the DB, then deletes the local copies.
// The `images` field below holds local placeholders used only as a fallback
// when seeding without the upload step.

export type NewProductSeed = {
  slug: string;
  name: string;
  breadcrumbLabel: string;
  categorySlug: string;
  priceCents: number;
  compareAtPriceCents: number;
  stockCount: number;
  ratingAvg: number;
  ratingCount: number;
  isBestseller: boolean;
  description: string;
  images: { url: string; alt: string; role: string; sortOrder: number }[];
  collectionSlugs: string[];
};

const PLACEHOLDER = "/assets/images/home/rudraksh.png";
const mainOnly = (alt: string, url = PLACEHOLDER) => [{ url, alt, role: "MAIN", sortOrder: 0 }];

export const newProducts: NewProductSeed[] = [
  // ---- Rudraksha ---------------------------------------------------------
  {
    slug: "1-mukhi-rudraksha",
    name: "1 Mukhi Rudraksha",
    breadcrumbLabel: "1 Mukhi Rudraksha",
    categorySlug: "rudraksha",
    priceCents: 95000,
    compareAtPriceCents: 110000,
    stockCount: 3,
    ratingAvg: 4.9,
    ratingCount: 64,
    isBestseller: true,
    description:
      "The 1 Mukhi (single-faced) Rudraksha is the rarest and most revered bead, regarded as a direct symbol of Lord Shiva himself. It is traditionally worn for deep meditation, detachment, and clarity of purpose. Each bead is sourced with care, hand-inspected for a single continuous mukhi line, and verified before listing.",
    images: mainOnly("1 Mukhi Rudraksha", "/assets/images/about/about-sacred-1.png"),
    collectionSlugs: ["peace", "balance"],
  },
  {
    slug: "2-mukhi-rudraksha",
    name: "2 Mukhi Rudraksha",
    breadcrumbLabel: "2 Mukhi Rudraksha",
    categorySlug: "rudraksha",
    priceCents: 13000,
    compareAtPriceCents: 15000,
    stockCount: 14,
    ratingAvg: 4.7,
    ratingCount: 121,
    isBestseller: false,
    description:
      "The 2 Mukhi (two-faced) Rudraksha is associated with Ardhanarishvara—the union of Shiva and Shakti—and is traditionally worn for harmony in relationships, emotional balance, and unity. Each bead is hand-checked for its two natural mukhi lines before listing.",
    images: mainOnly("2 Mukhi Rudraksha", "/assets/images/about/about-sacred-2.png"),
    collectionSlugs: ["love", "peace"],
  },
  {
    slug: "3-mukhi-rudraksha",
    name: "3 Mukhi Rudraksha",
    breadcrumbLabel: "3 Mukhi Rudraksha",
    categorySlug: "rudraksha",
    priceCents: 14000,
    compareAtPriceCents: 16000,
    stockCount: 12,
    ratingAvg: 4.6,
    ratingCount: 88,
    isBestseller: false,
    description:
      "The 3 Mukhi (three-faced) Rudraksha is associated with Agni, the fire element, and is traditionally worn to release past regrets, build confidence, and support a fresh start. Each bead is sourced from Nepal and verified for natural mukhi structure before listing.",
    images: mainOnly("3 Mukhi Rudraksha", "/assets/images/about/about-founding-1.png"),
    collectionSlugs: ["courage", "health"],
  },
  {
    slug: "11-mukhi-rudraksha",
    name: "11 Mukhi Rudraksha",
    breadcrumbLabel: "11 Mukhi Rudraksha",
    categorySlug: "rudraksha",
    priceCents: 27000,
    compareAtPriceCents: 30000,
    stockCount: 7,
    ratingAvg: 4.7,
    ratingCount: 53,
    isBestseller: false,
    description:
      "The 11 Mukhi (eleven-faced) Rudraksha is associated with Lord Hanuman and is traditionally worn for courage, wisdom, and steady self-control. Each bead is hand-verified for authentic mukhi count and surface condition before it is photographed and listed.",
    images: mainOnly("11 Mukhi Rudraksha", "/assets/images/about/about-principle-1.png"),
    collectionSlugs: ["courage", "protection"],
  },
  {
    slug: "14-mukhi-rudraksha",
    name: "14 Mukhi Rudraksha",
    breadcrumbLabel: "14 Mukhi Rudraksha",
    categorySlug: "rudraksha",
    priceCents: 42000,
    compareAtPriceCents: 48000,
    stockCount: 4,
    ratingAvg: 4.8,
    ratingCount: 37,
    isBestseller: true,
    description:
      "The 14 Mukhi (fourteen-faced) Rudraksha, known as Deva Mani, is among the most prized beads, traditionally worn for intuition, decisiveness, and protection. Each bead is individually verified for its fourteen natural mukhi lines before listing.",
    images: mainOnly("14 Mukhi Rudraksha", "/assets/images/about/about-principle-2.png"),
    collectionSlugs: ["protection", "luck"],
  },
  {
    slug: "gauri-shankar-rudraksha",
    name: "Gauri Shankar Rudraksha",
    breadcrumbLabel: "Gauri Shankar Rudraksha",
    categorySlug: "rudraksha",
    priceCents: 30000,
    compareAtPriceCents: 34000,
    stockCount: 6,
    ratingAvg: 4.8,
    ratingCount: 72,
    isBestseller: false,
    description:
      "A Gauri Shankar Rudraksha is two naturally joined beads, symbolising the union of Shiva and Parvati. It is traditionally worn for harmony between partners, family unity, and emotional balance. Each piece is checked for a genuine natural join before listing.",
    images: mainOnly("Gauri Shankar Rudraksha", "/assets/images/about/about-principle-3.png"),
    collectionSlugs: ["love", "balance"],
  },

  // ---- Gemstones ---------------------------------------------------------
  {
    slug: "natural-blue-sapphire-ring",
    name: "Natural Blue Sapphire Ring (Neelam)",
    breadcrumbLabel: "Natural Blue Sapphire Ring (Neelam)",
    categorySlug: "gemstones",
    priceCents: 48000,
    compareAtPriceCents: 55000,
    stockCount: 4,
    ratingAvg: 4.7,
    ratingCount: 41,
    isBestseller: false,
    description:
      "A natural, untreated Blue Sapphire (Neelam) set in a silver or panchadhatu mount, traditionally worn to strengthen the influence of Saturn. The stone is checked for natural origin, clarity, and carat weight before setting, with basic guidance on wearing day and finger included.",
    images: mainOnly("Natural Blue Sapphire Ring (Neelam)", "/assets/images/products/category-rings.png"),
    collectionSlugs: ["protection", "balance"],
  },
  {
    slug: "natural-emerald-ring",
    name: "Natural Emerald Ring (Panna)",
    breadcrumbLabel: "Natural Emerald Ring (Panna)",
    categorySlug: "gemstones",
    priceCents: 38000,
    compareAtPriceCents: 43000,
    stockCount: 6,
    ratingAvg: 4.6,
    ratingCount: 49,
    isBestseller: false,
    description:
      "A natural Emerald (Panna) set in a simple silver mount, traditionally worn to strengthen the influence of Mercury and support communication and intellect. Each stone is checked for natural origin, colour, and clarity before setting.",
    images: mainOnly("Natural Emerald Ring (Panna)", "/assets/images/about/about-p01-3021a5.png"),
    collectionSlugs: ["wealth", "health"],
  },
  {
    slug: "natural-pearl-ring",
    name: "Natural Pearl Ring (Moti)",
    breadcrumbLabel: "Natural Pearl Ring (Moti)",
    categorySlug: "gemstones",
    priceCents: 16000,
    compareAtPriceCents: 19000,
    stockCount: 10,
    ratingAvg: 4.5,
    ratingCount: 63,
    isBestseller: false,
    description:
      "A natural Pearl (Moti) set in a silver mount, traditionally worn to strengthen the influence of the Moon and support calmness and emotional steadiness. Each pearl is checked for natural origin and surface quality before setting.",
    images: mainOnly("Natural Pearl Ring (Moti)", "/assets/images/about/about-p04.png"),
    collectionSlugs: ["peace", "love"],
  },

  // ---- Bracelets ---------------------------------------------------------
  {
    slug: "tiger-eye-bracelet",
    name: "Tiger Eye Bracelet",
    breadcrumbLabel: "Tiger Eye Bracelet",
    categorySlug: "bracelets",
    priceCents: 11000,
    compareAtPriceCents: 13000,
    stockCount: 18,
    ratingAvg: 4.6,
    ratingCount: 134,
    isBestseller: false,
    description:
      "Strung from polished Tiger Eye beads on a durable elastic cord, this bracelet is traditionally associated with courage, focus, and grounding. Each bead is matched for size and finish, and the elastic is tested for stretch and recoil before listing.",
    images: mainOnly("Tiger Eye Bracelet", "/assets/images/products/category-bracelets.png"),
    collectionSlugs: ["courage", "protection"],
  },

  // ---- Murtis ------------------------------------------------------------
  {
    slug: "brass-nataraj-murti",
    name: "Brass Nataraj Murti",
    breadcrumbLabel: "Brass Nataraj Murti",
    categorySlug: "murtis",
    priceCents: 42000,
    compareAtPriceCents: 48000,
    stockCount: 5,
    ratingAvg: 4.8,
    ratingCount: 38,
    isBestseller: false,
    description:
      "A solid brass murti of Nataraja—Shiva in his cosmic dance—finished with hand-detailing on the ring of fire and base. Suited for home altars and gifting, each piece is checked for casting quality, finish, and stability before listing.",
    images: mainOnly("Brass Nataraj Murti", "/assets/images/home/god.png"),
    collectionSlugs: ["peace", "courage"],
  },

  // ---- Siddha Mala -------------------------------------------------------
  {
    slug: "sphatik-crystal-mala-108",
    name: "Sphatik Crystal Mala (108 Beads)",
    breadcrumbLabel: "Sphatik Crystal Mala (108 Beads)",
    categorySlug: "siddha-mala",
    priceCents: 17000,
    compareAtPriceCents: 20000,
    stockCount: 12,
    ratingAvg: 4.7,
    ratingCount: 96,
    isBestseller: false,
    description:
      "A traditional 108-bead mala strung from natural Sphatik (clear quartz crystal) beads, traditionally associated with coolness, calmness, and clarity of mind. Hand-knotted and finished with a guru bead and tassel, with bead size and clarity checked before listing.",
    images: mainOnly("Sphatik Crystal Mala (108 Beads)", "/assets/images/about/about-sacred-2.png"),
    collectionSlugs: ["peace", "health"],
  },

  // ---- Antiques ----------------------------------------------------------
  {
    slug: "antique-silver-deity-pendant",
    name: "Antique Silver Deity Pendant",
    breadcrumbLabel: "Antique Silver Deity Pendant",
    categorySlug: "antiques",
    priceCents: 24000,
    compareAtPriceCents: 28000,
    stockCount: 3,
    ratingAvg: 4.6,
    ratingCount: 18,
    isBestseller: false,
    description:
      "An older silver pendant depicting a seated deity, sourced for its craftsmanship and patina. This one-of-a-kind piece shows natural age consistent with its history and is inspected for structural soundness before listing. Quantities are limited and not restocked once sold.",
    images: mainOnly("Antique Silver Deity Pendant", "/assets/images/about/about-founding-2.png"),
    collectionSlugs: ["protection", "balance"],
  },

  // ---- Combinations ------------------------------------------------------
  {
    slug: "2-6-mukhi-combination-bracelet",
    name: "2+6 Mukhi Combination Bracelet",
    breadcrumbLabel: "2+6 Mukhi Combination Bracelet",
    categorySlug: "combinations",
    priceCents: 19000,
    compareAtPriceCents: 22000,
    stockCount: 10,
    ratingAvg: 4.7,
    ratingCount: 44,
    isBestseller: false,
    description:
      "This bracelet combines 2 Mukhi (harmony) and 6 Mukhi (willpower) beads, a pairing traditionally worn together to support steady relationships and discipline. Each bead is individually verified for mukhi count before being strung on a durable elastic cord.",
    images: mainOnly("2+6 Mukhi Combination Bracelet", "/assets/images/about/about-principle-1.png"),
    collectionSlugs: ["love", "courage"],
  },

  // ---- Singing Bowls -----------------------------------------------------
  {
    slug: "tibetan-singing-bowl-small",
    name: "Tibetan Singing Bowl (Small)",
    breadcrumbLabel: "Tibetan Singing Bowl (Small)",
    categorySlug: "singing-bowls",
    priceCents: 12000,
    compareAtPriceCents: 14000,
    stockCount: 14,
    ratingAvg: 4.7,
    ratingCount: 71,
    isBestseller: false,
    description:
      "A compact hand-hammered singing bowl suited for personal sound meditation, travel, and small spaces. Each bowl is played and listened to for tone and sustain before listing, and comes with a matching wooden striker and cushion.",
    images: mainOnly("Tibetan Singing Bowl (Small)", "/assets/images/about/about-p04.png"),
    collectionSlugs: ["peace", "balance"],
  },

  // ---- Necklaces ---------------------------------------------------------
  {
    slug: "rudraksha-mala-necklace-54",
    name: "54 Bead Rudraksha Mala Necklace",
    breadcrumbLabel: "54 Bead Rudraksha Mala Necklace",
    categorySlug: "necklaces",
    priceCents: 18000,
    compareAtPriceCents: 21000,
    stockCount: 11,
    ratingAvg: 4.7,
    ratingCount: 88,
    isBestseller: false,
    description:
      "A 54-bead Rudraksha mala necklace strung on a knotted cord, sized to wear comfortably around the neck for daily use. Each bead is checked for mukhi and finish before stringing, and the cord is tested for strength before listing.",
    images: mainOnly("54 Bead Rudraksha Mala Necklace", "/assets/images/products/category-necklace.png"),
    collectionSlugs: ["health", "peace"],
  },

  // ======================================================================
  // Round 2 — bring every non-Rudraksha category up to at least 7 products
  // ======================================================================

  // ---- Bracelets (+4) ----------------------------------------------------
  {
    slug: "rudraksha-bracelet-8-mukhi",
    name: "Rudraksha Bracelet (8 Mukhi)",
    breadcrumbLabel: "Rudraksha Bracelet (8 Mukhi)",
    categorySlug: "bracelets",
    priceCents: 16000,
    compareAtPriceCents: 18000,
    stockCount: 12,
    ratingAvg: 4.7,
    ratingCount: 96,
    isBestseller: false,
    description:
      "Strung from 8 Mukhi Rudraksha beads on a durable elastic cord, this bracelet is traditionally associated with Lord Ganesha and worn before new ventures. Each bead is individually checked for mukhi count before stringing.",
    images: mainOnly("Rudraksha Bracelet (8 Mukhi)", "/assets/images/products/category-bracelets.png"),
    collectionSlugs: ["luck", "protection"],
  },
  {
    slug: "black-tourmaline-bracelet",
    name: "Black Tourmaline Bracelet",
    breadcrumbLabel: "Black Tourmaline Bracelet",
    categorySlug: "bracelets",
    priceCents: 13000,
    compareAtPriceCents: 15000,
    stockCount: 16,
    ratingAvg: 4.6,
    ratingCount: 112,
    isBestseller: false,
    description:
      "Strung from polished Black Tourmaline beads on an elastic cord, this bracelet is traditionally associated with grounding and protection. Each bead is matched for size and finish before listing.",
    images: mainOnly("Black Tourmaline Bracelet", "/assets/images/products/category-bracelets.png"),
    collectionSlugs: ["protection", "balance"],
  },
  {
    slug: "seven-chakra-bracelet",
    name: "Seven Chakra Bracelet",
    breadcrumbLabel: "Seven Chakra Bracelet",
    categorySlug: "bracelets",
    priceCents: 12000,
    compareAtPriceCents: 14000,
    stockCount: 20,
    ratingAvg: 4.5,
    ratingCount: 148,
    isBestseller: false,
    description:
      "A bracelet strung with seven natural stones representing the chakras, set between neutral spacer beads on an elastic cord. Each stone is checked for colour and finish before the bracelet is assembled.",
    images: mainOnly("Seven Chakra Bracelet", "/assets/images/products/category-bracelets.png"),
    collectionSlugs: ["balance", "health"],
  },
  {
    slug: "lava-stone-rudraksha-bracelet",
    name: "Lava Stone & Rudraksha Bracelet",
    breadcrumbLabel: "Lava Stone & Rudraksha Bracelet",
    categorySlug: "bracelets",
    priceCents: 11000,
    compareAtPriceCents: 13000,
    stockCount: 18,
    ratingAvg: 4.6,
    ratingCount: 87,
    isBestseller: false,
    description:
      "A bracelet combining porous lava stone beads with 5 Mukhi Rudraksha on an elastic cord, traditionally associated with grounding and calm. Each bead is checked for finish before stringing.",
    images: mainOnly("Lava Stone & Rudraksha Bracelet", "/assets/images/products/category-bracelets.png"),
    collectionSlugs: ["courage", "peace"],
  },

  // ---- Murtis (+4) -------------------------------------------------------
  {
    slug: "brass-hanuman-murti",
    name: "Brass Hanuman Murti",
    breadcrumbLabel: "Brass Hanuman Murti",
    categorySlug: "murtis",
    priceCents: 26000,
    compareAtPriceCents: 30000,
    stockCount: 8,
    ratingAvg: 4.8,
    ratingCount: 64,
    isBestseller: false,
    description:
      "A solid brass murti of Lord Hanuman in a standing posture, finished with hand-detailing on the mace and base. Suited for home altars and gifting, each piece is checked for casting quality and stability before listing.",
    images: mainOnly("Brass Hanuman Murti", "/assets/images/home/god.png"),
    collectionSlugs: ["courage", "protection"],
  },
  {
    slug: "marble-finish-durga-murti",
    name: "Marble-Finish Durga Murti",
    breadcrumbLabel: "Marble-Finish Durga Murti",
    categorySlug: "murtis",
    priceCents: 38000,
    compareAtPriceCents: 44000,
    stockCount: 5,
    ratingAvg: 4.7,
    ratingCount: 41,
    isBestseller: false,
    description:
      "A Durga murti cast in a marble-dust composite and hand-painted for a soft, stone-like finish. Sized for home temples, each piece is checked for proportion, paint finish, and base stability before dispatch.",
    images: mainOnly("Marble-Finish Durga Murti", "/assets/images/home/god.png"),
    collectionSlugs: ["protection", "courage"],
  },
  {
    slug: "brass-lakshmi-murti",
    name: "Brass Lakshmi Murti",
    breadcrumbLabel: "Brass Lakshmi Murti",
    categorySlug: "murtis",
    priceCents: 24000,
    compareAtPriceCents: 28000,
    stockCount: 9,
    ratingAvg: 4.8,
    ratingCount: 73,
    isBestseller: false,
    description:
      "A solid brass murti of Goddess Lakshmi seated on a lotus, finished with hand-detailing on the crown and base. Suited for home altars, especially around Diwali, and checked for finish and stability before listing.",
    images: mainOnly("Brass Lakshmi Murti", "/assets/images/home/god.png"),
    collectionSlugs: ["wealth", "luck"],
  },
  {
    slug: "resin-buddha-murti",
    name: "Resin Meditating Buddha Murti",
    breadcrumbLabel: "Resin Meditating Buddha Murti",
    categorySlug: "murtis",
    priceCents: 15000,
    compareAtPriceCents: 18000,
    stockCount: 14,
    ratingAvg: 4.6,
    ratingCount: 58,
    isBestseller: false,
    description:
      "A lightweight resin murti of the meditating Buddha, finished with a stone-like surface and suited for study tables, small altars, and travel. Each piece is checked for finish and base stability before listing.",
    images: mainOnly("Resin Meditating Buddha Murti", "/assets/images/home/god.png"),
    collectionSlugs: ["peace", "balance"],
  },

  // ---- Siddha Mala (+4) --------------------------------------------------
  {
    slug: "sandalwood-mala-108",
    name: "Sandalwood Mala (108 Beads)",
    breadcrumbLabel: "Sandalwood Mala (108 Beads)",
    categorySlug: "siddha-mala",
    priceCents: 14000,
    compareAtPriceCents: 16000,
    stockCount: 16,
    ratingAvg: 4.7,
    ratingCount: 102,
    isBestseller: false,
    description:
      "A traditional 108-bead mala strung from natural sandalwood beads, valued for their warm fragrance and used widely for japa and meditation. Hand-knotted and finished with a guru bead and tassel.",
    images: mainOnly("Sandalwood Mala (108 Beads)", "/assets/images/about/about-sacred-1.png"),
    collectionSlugs: ["peace", "balance"],
  },
  {
    slug: "lotus-seed-mala-108",
    name: "Lotus Seed Mala (108 Beads)",
    breadcrumbLabel: "Lotus Seed Mala (108 Beads)",
    categorySlug: "siddha-mala",
    priceCents: 12000,
    compareAtPriceCents: 14000,
    stockCount: 18,
    ratingAvg: 4.6,
    ratingCount: 84,
    isBestseller: false,
    description:
      "A 108-bead mala strung from natural lotus seeds, traditionally associated with purity and used for meditation counting. Each strand is hand-knotted and checked for bead consistency before listing.",
    images: mainOnly("Lotus Seed Mala (108 Beads)", "/assets/images/about/about-sacred-1.png"),
    collectionSlugs: ["peace", "love"],
  },
  {
    slug: "rudraksha-tulsi-mixed-mala-108",
    name: "Rudraksha-Tulsi Mixed Mala (108 Beads)",
    breadcrumbLabel: "Rudraksha-Tulsi Mixed Mala (108 Beads)",
    categorySlug: "siddha-mala",
    priceCents: 16000,
    compareAtPriceCents: 19000,
    stockCount: 12,
    ratingAvg: 4.7,
    ratingCount: 67,
    isBestseller: false,
    description:
      "A 108-bead mala alternating Rudraksha and Tulsi beads, combining the qualities traditionally associated with both. Hand-knotted between beads and finished with a guru bead and tassel.",
    images: mainOnly("Rudraksha-Tulsi Mixed Mala (108 Beads)", "/assets/images/about/about-sacred-2.png"),
    collectionSlugs: ["health", "peace"],
  },
  {
    slug: "7-mukhi-rudraksha-mala-108",
    name: "7 Mukhi Rudraksha Mala (108 Beads)",
    breadcrumbLabel: "7 Mukhi Rudraksha Mala (108 Beads)",
    categorySlug: "siddha-mala",
    priceCents: 42000,
    compareAtPriceCents: 48000,
    stockCount: 5,
    ratingAvg: 4.8,
    ratingCount: 39,
    isBestseller: false,
    description:
      "A premium 108-bead mala strung entirely from 7 Mukhi Rudraksha beads, traditionally associated with prosperity and stability. Each bead is verified for mukhi count before stringing.",
    images: mainOnly("7 Mukhi Rudraksha Mala (108 Beads)", "/assets/images/about/about-sacred-1.png"),
    collectionSlugs: ["wealth", "luck"],
  },

  // ---- Gemstones (+2) ----------------------------------------------------
  {
    slug: "natural-hessonite-ring",
    name: "Natural Hessonite Ring (Gomed)",
    breadcrumbLabel: "Natural Hessonite Ring (Gomed)",
    categorySlug: "gemstones",
    priceCents: 21000,
    compareAtPriceCents: 24000,
    stockCount: 7,
    ratingAvg: 4.5,
    ratingCount: 34,
    isBestseller: false,
    description:
      "A natural Hessonite (Gomed) set in a silver mount, traditionally worn to strengthen the influence of Rahu. The stone is checked for natural origin, clarity, and carat weight before setting.",
    images: mainOnly("Natural Hessonite Ring (Gomed)", "/assets/images/products/category-rings.png"),
    collectionSlugs: ["protection", "balance"],
  },
  {
    slug: "natural-cats-eye-ring",
    name: "Natural Cat's Eye Ring (Lehsunia)",
    breadcrumbLabel: "Natural Cat's Eye Ring (Lehsunia)",
    categorySlug: "gemstones",
    priceCents: 23000,
    compareAtPriceCents: 27000,
    stockCount: 6,
    ratingAvg: 4.6,
    ratingCount: 29,
    isBestseller: false,
    description:
      "A natural Cat's Eye (Lehsunia) set in a silver mount, traditionally worn to strengthen the influence of Ketu. Each stone is checked for its natural chatoyant band and surface quality before setting.",
    images: mainOnly("Natural Cat's Eye Ring (Lehsunia)", "/assets/images/products/category-rings.png"),
    collectionSlugs: ["protection", "luck"],
  },

  // ---- Antiques (+4) -----------------------------------------------------
  {
    slug: "antique-brass-oil-lamp",
    name: "Antique Brass Oil Lamp (Diya)",
    breadcrumbLabel: "Antique Brass Oil Lamp (Diya)",
    categorySlug: "antiques",
    priceCents: 19000,
    compareAtPriceCents: 23000,
    stockCount: 3,
    ratingAvg: 4.6,
    ratingCount: 21,
    isBestseller: false,
    description:
      "An older brass oil lamp (diya) with a tiered design, sourced for its craftsmanship and patina. This one-of-a-kind piece shows natural age and is inspected for structural soundness before listing.",
    images: mainOnly("Antique Brass Oil Lamp (Diya)", "/assets/images/about/about-founding-2.png"),
    collectionSlugs: ["peace", "luck"],
  },
  {
    slug: "antique-copper-kalash",
    name: "Antique Copper Kalash",
    breadcrumbLabel: "Antique Copper Kalash",
    categorySlug: "antiques",
    priceCents: 27000,
    compareAtPriceCents: 32000,
    stockCount: 2,
    ratingAvg: 4.7,
    ratingCount: 14,
    isBestseller: false,
    description:
      "An older copper kalash (ritual pot) with hand-worked detailing, used traditionally in puja and ceremonies. Sourced for craftsmanship and history, inspected for condition, and photographed as-is.",
    images: mainOnly("Antique Copper Kalash", "/assets/images/about/about-founding-2.png"),
    collectionSlugs: ["wealth", "peace"],
  },
  {
    slug: "antique-bronze-nandi-figurine",
    name: "Antique Bronze Nandi Figurine",
    breadcrumbLabel: "Antique Bronze Nandi Figurine",
    categorySlug: "antiques",
    priceCents: 31000,
    compareAtPriceCents: 36000,
    stockCount: 2,
    ratingAvg: 4.7,
    ratingCount: 12,
    isBestseller: false,
    description:
      "An older bronze figurine of Nandi, the sacred bull of Shiva, sourced for its craftsmanship and patina. A one-of-a-kind piece inspected for structural soundness and photographed as-is.",
    images: mainOnly("Antique Bronze Nandi Figurine", "/assets/images/about/about-founding-1.png"),
    collectionSlugs: ["protection", "balance"],
  },
  {
    slug: "antique-brass-puja-thali",
    name: "Antique Brass Puja Thali",
    breadcrumbLabel: "Antique Brass Puja Thali",
    categorySlug: "antiques",
    priceCents: 17000,
    compareAtPriceCents: 20000,
    stockCount: 4,
    ratingAvg: 4.6,
    ratingCount: 19,
    isBestseller: false,
    description:
      "An older engraved brass puja thali (ritual plate), used to hold lamps and offerings during worship. Sourced for craftsmanship, inspected for condition, and described honestly with its natural wear.",
    images: mainOnly("Antique Brass Puja Thali", "/assets/images/about/about-founding-2.png"),
    collectionSlugs: ["peace", "health"],
  },

  // ---- Combinations (+4) -------------------------------------------------
  {
    slug: "1-5-mukhi-combination-pendant",
    name: "1+5 Mukhi Combination Pendant",
    breadcrumbLabel: "1+5 Mukhi Combination Pendant",
    categorySlug: "combinations",
    priceCents: 30000,
    compareAtPriceCents: 34000,
    stockCount: 6,
    ratingAvg: 4.7,
    ratingCount: 33,
    isBestseller: false,
    description:
      "This pendant combines 1 Mukhi and 5 Mukhi Rudraksha in a single silver-capped setting, a pairing traditionally chosen for focus and calm together. Each bead is verified individually before being set.",
    images: mainOnly("1+5 Mukhi Combination Pendant", "/assets/images/about/about-principle-3.png"),
    collectionSlugs: ["peace", "balance"],
  },
  {
    slug: "3-8-mukhi-combination-bracelet",
    name: "3+8 Mukhi Combination Bracelet",
    breadcrumbLabel: "3+8 Mukhi Combination Bracelet",
    categorySlug: "combinations",
    priceCents: 20000,
    compareAtPriceCents: 23000,
    stockCount: 10,
    ratingAvg: 4.6,
    ratingCount: 38,
    isBestseller: false,
    description:
      "This bracelet combines 3 Mukhi and 8 Mukhi Rudraksha beads, a pairing traditionally worn for a fresh start and removal of obstacles. Each bead is verified for mukhi count before being strung on a durable elastic cord.",
    images: mainOnly("3+8 Mukhi Combination Bracelet", "/assets/images/about/about-principle-3.png"),
    collectionSlugs: ["courage", "luck"],
  },
  {
    slug: "6-7-mukhi-combination-bracelet",
    name: "6+7 Mukhi Combination Bracelet",
    breadcrumbLabel: "6+7 Mukhi Combination Bracelet",
    categorySlug: "combinations",
    priceCents: 21000,
    compareAtPriceCents: 24000,
    stockCount: 9,
    ratingAvg: 4.7,
    ratingCount: 31,
    isBestseller: false,
    description:
      "This bracelet combines 6 Mukhi and 7 Mukhi Rudraksha beads, a pairing traditionally worn for discipline and prosperity together. Each bead is verified individually before being strung.",
    images: mainOnly("6+7 Mukhi Combination Bracelet", "/assets/images/about/about-principle-3.png"),
    collectionSlugs: ["wealth", "balance"],
  },
  {
    slug: "9-12-mukhi-combination-pendant",
    name: "9+12 Mukhi Combination Pendant",
    breadcrumbLabel: "9+12 Mukhi Combination Pendant",
    categorySlug: "combinations",
    priceCents: 32000,
    compareAtPriceCents: 37000,
    stockCount: 5,
    ratingAvg: 4.7,
    ratingCount: 24,
    isBestseller: false,
    description:
      "This pendant combines 9 Mukhi and 12 Mukhi Rudraksha in a silver-capped setting, a pairing traditionally chosen for energy and confidence together. Each bead is verified individually before being set.",
    images: mainOnly("9+12 Mukhi Combination Pendant", "/assets/images/about/about-principle-2.png"),
    collectionSlugs: ["courage", "wealth"],
  },

  // ---- Singing Bowls (+4) ------------------------------------------------
  {
    slug: "full-moon-singing-bowl",
    name: "Full Moon Singing Bowl",
    breadcrumbLabel: "Full Moon Singing Bowl",
    categorySlug: "singing-bowls",
    priceCents: 24000,
    compareAtPriceCents: 28000,
    stockCount: 7,
    ratingAvg: 4.8,
    ratingCount: 52,
    isBestseller: false,
    description:
      "A hand-hammered Full Moon singing bowl, traditionally made on a full moon night, producing a deep, resonant tone. Each bowl is played and checked for sustain and balance before listing, and includes a wooden striker.",
    images: mainOnly("Full Moon Singing Bowl", "/assets/images/about/about-p04.png"),
    collectionSlugs: ["peace", "balance"],
  },
  {
    slug: "brass-singing-bowl-large",
    name: "Brass Singing Bowl (Large)",
    breadcrumbLabel: "Brass Singing Bowl (Large)",
    categorySlug: "singing-bowls",
    priceCents: 26000,
    compareAtPriceCents: 30000,
    stockCount: 6,
    ratingAvg: 4.7,
    ratingCount: 44,
    isBestseller: false,
    description:
      "A large brass singing bowl producing a deep, sustained tone suited for group meditation. Each bowl is checked for balance, rim contact, and tone before listing, and includes a wooden striker and cushion.",
    images: mainOnly("Brass Singing Bowl (Large)", "/assets/images/about/about-p04.png"),
    collectionSlugs: ["balance", "health"],
  },
  {
    slug: "engraved-tibetan-singing-bowl",
    name: "Engraved Tibetan Singing Bowl",
    breadcrumbLabel: "Engraved Tibetan Singing Bowl",
    categorySlug: "singing-bowls",
    priceCents: 22000,
    compareAtPriceCents: 26000,
    stockCount: 8,
    ratingAvg: 4.7,
    ratingCount: 48,
    isBestseller: false,
    description:
      "A Tibetan singing bowl with hand-engraved mantras and motifs around the rim and body, suited for sound meditation. Each bowl is played and checked for tone before listing, and includes a wooden striker.",
    images: mainOnly("Engraved Tibetan Singing Bowl", "/assets/images/about/about-p02.png"),
    collectionSlugs: ["peace", "protection"],
  },
  {
    slug: "meditation-singing-bowl-medium",
    name: "Meditation Singing Bowl (Medium)",
    breadcrumbLabel: "Meditation Singing Bowl (Medium)",
    categorySlug: "singing-bowls",
    priceCents: 17000,
    compareAtPriceCents: 20000,
    stockCount: 12,
    ratingAvg: 4.6,
    ratingCount: 61,
    isBestseller: false,
    description:
      "A medium hand-hammered singing bowl suited for individual meditation and yoga practice. Each bowl is played and listened to for tone and sustain before listing, and comes with a matching wooden striker.",
    images: mainOnly("Meditation Singing Bowl (Medium)", "/assets/images/about/about-p04.png"),
    collectionSlugs: ["peace", "balance"],
  },

  // ---- Necklaces (+4) ----------------------------------------------------
  {
    slug: "9-mukhi-pendant-necklace",
    name: "9 Mukhi Rudraksha Pendant Necklace",
    breadcrumbLabel: "9 Mukhi Rudraksha Pendant Necklace",
    categorySlug: "necklaces",
    priceCents: 26000,
    compareAtPriceCents: 29000,
    stockCount: 9,
    ratingAvg: 4.7,
    ratingCount: 54,
    isBestseller: false,
    description:
      "A 9 Mukhi Rudraksha bead set in a simple silver pendant on a fine chain, traditionally associated with courage and energy. The bead and chain are checked for finish and secure setting before listing.",
    images: mainOnly("9 Mukhi Rudraksha Pendant Necklace", "/assets/images/products/category-necklace.png"),
    collectionSlugs: ["courage", "protection"],
  },
  {
    slug: "rudraksha-silver-chain-necklace",
    name: "Rudraksha & Silver Chain Necklace",
    breadcrumbLabel: "Rudraksha & Silver Chain Necklace",
    categorySlug: "necklaces",
    priceCents: 28000,
    compareAtPriceCents: 32000,
    stockCount: 8,
    ratingAvg: 4.8,
    ratingCount: 47,
    isBestseller: false,
    description:
      "A Rudraksha bead alternating with silver links on a finished chain, designed for everyday wear with a refined look. Each bead is checked for mukhi and finish before assembly.",
    images: mainOnly("Rudraksha & Silver Chain Necklace", "/assets/images/products/category-necklace.png"),
    collectionSlugs: ["wealth", "love"],
  },
  {
    slug: "tulsi-bead-necklace",
    name: "Tulsi Bead Necklace",
    breadcrumbLabel: "Tulsi Bead Necklace",
    categorySlug: "necklaces",
    priceCents: 9000,
    compareAtPriceCents: 11000,
    stockCount: 20,
    ratingAvg: 4.6,
    ratingCount: 79,
    isBestseller: false,
    description:
      "A necklace strung from small Tulsi (holy basil) wood beads, traditionally associated with devotion and worn close throughout the day. Each strand is checked for bead consistency and cord strength before listing.",
    images: mainOnly("Tulsi Bead Necklace", "/assets/images/products/category-necklace.png"),
    collectionSlugs: ["peace", "love"],
  },
  {
    slug: "gemstone-pendant-necklace",
    name: "Gemstone Pendant Necklace",
    breadcrumbLabel: "Gemstone Pendant Necklace",
    categorySlug: "necklaces",
    priceCents: 19000,
    compareAtPriceCents: 22000,
    stockCount: 11,
    ratingAvg: 4.6,
    ratingCount: 42,
    isBestseller: false,
    description:
      "A single natural gemstone set in a silver pendant on a fine chain, for those who prefer to wear a stone as a necklace rather than a ring. The stone is checked for natural origin and secure setting before listing.",
    images: mainOnly("Gemstone Pendant Necklace", "/assets/images/products/category-rings.png"),
    collectionSlugs: ["wealth", "health"],
  },
];

// Unsplash sources per product (role -> URL). The seed script downloads these,
// uploads them to Cloudinary, and writes the secure URLs into the DB.
// IDs reused from the proven set in scripts/upload-product-images.ts so the
// downloads are reliable; each product gets a distinct ordering.
const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80&fm=jpg&fit=crop`;

const ROLE_ORDER = ["MAIN", "GALLERY_LEFT", "GALLERY_TOP_RIGHT", "GALLERY_BOTTOM_RIGHT"] as const;

function set(ids: [string, string, string, string]): Record<string, string> {
  const out: Record<string, string> = {};
  ROLE_ORDER.forEach((role, i) => (out[role] = u(ids[i])));
  return out;
}

export const NEW_PRODUCT_IMAGE_SETS: Record<string, Record<string, string>> = {
  "1-mukhi-rudraksha": set(["1611652022419-a9419f74343d", "1602173574767-37ac01994b2a", "1599643478518-a784e5dc4c8f", "1591291621164-2c6367723315"]),
  "2-mukhi-rudraksha": set(["1602173574767-37ac01994b2a", "1599643478518-a784e5dc4c8f", "1591291621164-2c6367723315", "1611652022419-a9419f74343d"]),
  "3-mukhi-rudraksha": set(["1599643478518-a784e5dc4c8f", "1591291621164-2c6367723315", "1611652022419-a9419f74343d", "1602173574767-37ac01994b2a"]),
  "11-mukhi-rudraksha": set(["1591291621164-2c6367723315", "1611652022419-a9419f74343d", "1602173574767-37ac01994b2a", "1599643478518-a784e5dc4c8f"]),
  "14-mukhi-rudraksha": set(["1611652022419-a9419f74343d", "1599643478518-a784e5dc4c8f", "1602173574767-37ac01994b2a", "1591291621164-2c6367723315"]),
  "gauri-shankar-rudraksha": set(["1602173574767-37ac01994b2a", "1611652022419-a9419f74343d", "1591291621164-2c6367723315", "1599643478518-a784e5dc4c8f"]),
  "natural-blue-sapphire-ring": set(["1551122089-4e3e72477432", "1605100804763-247f67b3557e", "1591291621164-2c6367723315", "1611652022419-a9419f74343d"]),
  "natural-emerald-ring": set(["1605100804763-247f67b3557e", "1551122089-4e3e72477432", "1611652022419-a9419f74343d", "1591291621164-2c6367723315"]),
  "natural-pearl-ring": set(["1605100804763-247f67b3557e", "1551122089-4e3e72477432", "1591291621164-2c6367723315", "1611652022419-a9419f74343d"]),
  "tiger-eye-bracelet": set(["1611591437281-460bfbe1220a", "1535632066927-ab7c9ab60908", "1573408301185-9146fe634ad0", "1605100804763-247f67b3557e"]),
  "brass-nataraj-murti": set(["1578500494198-246f612d3b3d", "1578500494198-246f612d3b3d", "1611652022419-a9419f74343d", "1602173574767-37ac01994b2a"]),
  "sphatik-crystal-mala-108": set(["1599643478518-a784e5dc4c8f", "1602173574767-37ac01994b2a", "1551122089-4e3e72477432", "1591291621164-2c6367723315"]),
  "antique-silver-deity-pendant": set(["1578500494198-246f612d3b3d", "1578500494198-246f612d3b3d", "1605100804763-247f67b3557e", "1602173574767-37ac01994b2a"]),
  "2-6-mukhi-combination-bracelet": set(["1602173574767-37ac01994b2a", "1611591437281-460bfbe1220a", "1573408301185-9146fe634ad0", "1535632066927-ab7c9ab60908"]),
  "tibetan-singing-bowl-small": set(["1591291621164-2c6367723315", "1578500494198-246f612d3b3d", "1578500494198-246f612d3b3d", "1605100804763-247f67b3557e"]),
  "rudraksha-mala-necklace-54": set(["1599643478518-a784e5dc4c8f", "1611652022419-a9419f74343d", "1602173574767-37ac01994b2a", "1591291621164-2c6367723315"]),

  // ---- Round 2 ----------------------------------------------------------
  // Bracelets
  "rudraksha-bracelet-8-mukhi": set(["1611591437281-460bfbe1220a", "1535632066927-ab7c9ab60908", "1573408301185-9146fe634ad0", "1605100804763-247f67b3557e"]),
  "black-tourmaline-bracelet": set(["1535632066927-ab7c9ab60908", "1611591437281-460bfbe1220a", "1605100804763-247f67b3557e", "1573408301185-9146fe634ad0"]),
  "seven-chakra-bracelet": set(["1573408301185-9146fe634ad0", "1535632066927-ab7c9ab60908", "1611591437281-460bfbe1220a", "1605100804763-247f67b3557e"]),
  "lava-stone-rudraksha-bracelet": set(["1611591437281-460bfbe1220a", "1573408301185-9146fe634ad0", "1535632066927-ab7c9ab60908", "1605100804763-247f67b3557e"]),
  // Murtis
  "brass-hanuman-murti": set(["1578500494198-246f612d3b3d", "1611652022419-a9419f74343d", "1602173574767-37ac01994b2a", "1591291621164-2c6367723315"]),
  "marble-finish-durga-murti": set(["1578500494198-246f612d3b3d", "1602173574767-37ac01994b2a", "1611652022419-a9419f74343d", "1591291621164-2c6367723315"]),
  "brass-lakshmi-murti": set(["1578500494198-246f612d3b3d", "1591291621164-2c6367723315", "1602173574767-37ac01994b2a", "1611652022419-a9419f74343d"]),
  "resin-buddha-murti": set(["1578500494198-246f612d3b3d", "1611652022419-a9419f74343d", "1591291621164-2c6367723315", "1602173574767-37ac01994b2a"]),
  // Siddha Mala
  "sandalwood-mala-108": set(["1599643478518-a784e5dc4c8f", "1602173574767-37ac01994b2a", "1611652022419-a9419f74343d", "1591291621164-2c6367723315"]),
  "lotus-seed-mala-108": set(["1602173574767-37ac01994b2a", "1599643478518-a784e5dc4c8f", "1591291621164-2c6367723315", "1611652022419-a9419f74343d"]),
  "rudraksha-tulsi-mixed-mala-108": set(["1611652022419-a9419f74343d", "1599643478518-a784e5dc4c8f", "1602173574767-37ac01994b2a", "1591291621164-2c6367723315"]),
  "7-mukhi-rudraksha-mala-108": set(["1599643478518-a784e5dc4c8f", "1611652022419-a9419f74343d", "1591291621164-2c6367723315", "1602173574767-37ac01994b2a"]),
  // Gemstones
  "natural-hessonite-ring": set(["1551122089-4e3e72477432", "1605100804763-247f67b3557e", "1591291621164-2c6367723315", "1611652022419-a9419f74343d"]),
  "natural-cats-eye-ring": set(["1605100804763-247f67b3557e", "1551122089-4e3e72477432", "1611652022419-a9419f74343d", "1591291621164-2c6367723315"]),
  // Antiques
  "antique-brass-oil-lamp": set(["1578500494198-246f612d3b3d", "1605100804763-247f67b3557e", "1602173574767-37ac01994b2a", "1611652022419-a9419f74343d"]),
  "antique-copper-kalash": set(["1605100804763-247f67b3557e", "1578500494198-246f612d3b3d", "1611652022419-a9419f74343d", "1602173574767-37ac01994b2a"]),
  "antique-bronze-nandi-figurine": set(["1578500494198-246f612d3b3d", "1602173574767-37ac01994b2a", "1605100804763-247f67b3557e", "1611652022419-a9419f74343d"]),
  "antique-brass-puja-thali": set(["1605100804763-247f67b3557e", "1578500494198-246f612d3b3d", "1602173574767-37ac01994b2a", "1591291621164-2c6367723315"]),
  // Combinations
  "1-5-mukhi-combination-pendant": set(["1602173574767-37ac01994b2a", "1611652022419-a9419f74343d", "1599643478518-a784e5dc4c8f", "1591291621164-2c6367723315"]),
  "3-8-mukhi-combination-bracelet": set(["1611652022419-a9419f74343d", "1602173574767-37ac01994b2a", "1591291621164-2c6367723315", "1599643478518-a784e5dc4c8f"]),
  "6-7-mukhi-combination-bracelet": set(["1599643478518-a784e5dc4c8f", "1591291621164-2c6367723315", "1611652022419-a9419f74343d", "1602173574767-37ac01994b2a"]),
  "9-12-mukhi-combination-pendant": set(["1591291621164-2c6367723315", "1599643478518-a784e5dc4c8f", "1602173574767-37ac01994b2a", "1611652022419-a9419f74343d"]),
  // Singing Bowls
  "full-moon-singing-bowl": set(["1591291621164-2c6367723315", "1578500494198-246f612d3b3d", "1611652022419-a9419f74343d", "1602173574767-37ac01994b2a"]),
  "brass-singing-bowl-large": set(["1578500494198-246f612d3b3d", "1591291621164-2c6367723315", "1602173574767-37ac01994b2a", "1611652022419-a9419f74343d"]),
  "engraved-tibetan-singing-bowl": set(["1591291621164-2c6367723315", "1602173574767-37ac01994b2a", "1578500494198-246f612d3b3d", "1611652022419-a9419f74343d"]),
  "meditation-singing-bowl-medium": set(["1602173574767-37ac01994b2a", "1591291621164-2c6367723315", "1611652022419-a9419f74343d", "1578500494198-246f612d3b3d"]),
  // Necklaces
  "9-mukhi-pendant-necklace": set(["1599643478518-a784e5dc4c8f", "1611652022419-a9419f74343d", "1602173574767-37ac01994b2a", "1591291621164-2c6367723315"]),
  "rudraksha-silver-chain-necklace": set(["1611652022419-a9419f74343d", "1599643478518-a784e5dc4c8f", "1591291621164-2c6367723315", "1602173574767-37ac01994b2a"]),
  "tulsi-bead-necklace": set(["1602173574767-37ac01994b2a", "1611652022419-a9419f74343d", "1599643478518-a784e5dc4c8f", "1591291621164-2c6367723315"]),
  "gemstone-pendant-necklace": set(["1605100804763-247f67b3557e", "1551122089-4e3e72477432", "1591291621164-2c6367723315", "1611652022419-a9419f74343d"]),
};
