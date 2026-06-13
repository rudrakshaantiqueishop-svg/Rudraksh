import "dotenv/config";
import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SHIPPING_INFO =
  "Orders are processed within 1-2 business days and shipped via tracked courier. Domestic orders typically arrive within 2-4 working days, while international orders take 7-12 working days depending on destination and customs clearance. A tracking link is emailed as soon as your order ships, and free shipping applies to all domestic orders over $200.";

const PACKAGING_INFO =
  "Every piece is wrapped in a soft protective pouch and placed in a branded box with a printed authenticity card. Malas and bracelets are cushioned to prevent bead movement during transit, and fragile items such as murtis and singing bowls are additionally wrapped in bubble layers inside a rigid outer carton.";

const RETURNS_INFO =
  "If you're not satisfied, you can request a return within 30 days of delivery for a full refund, provided the item is unused and returned in its original packaging with the authenticity card. Energised items and made-to-order combinations are non-returnable once the energization process has been completed. Cancellations made before an order ships are processed immediately; once shipped, the standard return process applies.";

const SIZES = ["<18mm", "<20mm", "<24mm", "<28mm"];

const categories = [
  {
    name: "Rudraksha",
    slug: "rudraksha",
    image: "/assets/images/home/rudraksh.png",
    sortOrder: 0,
    pageContent: {
      heroTitle: "Authentic Rudraksha, Chosen with Care",
      heroSubtitle:
        "Every Rudraksha listed here is physically examined, scientifically verified, and handled with traditional respect—so you can explore with confidence, not confusion.",
      introHeading: "Rudraksha Beads",
      introDescription:
        "Rudraksha beads have been worn for centuries for spiritual grounding, focus, and inner balance. However, not every Rudraksha is the same—and choosing the right one depends on authenticity, structure, and personal suitability. This collection brings together verified Rudraksha beads, clearly categorized by mukhi, origin, and form, so you can make an informed choice without pressure.",
      introImage: "/assets/images/home/rudraksh.png",
      checklistHeading: "Every Rudraksha You See Here Is",
      checklist: [
        "Physically examined for natural structure",
        "Scientifically tested using non-destructive methods",
        "Mukhi confirmed manually and technically",
        "Provided with certification",
        "Final-checked before dispatch",
      ],
      checklistImages: ["/assets/images/about/about-sacred-1.png", "/assets/images/about/about-sacred-2.png"],
      fitCheckRightLabel: "Rudraksha May Be Right for You If:",
      fitCheckRightItems: [
        "You value authenticity over appearance",
        "You're seeking grounding, focus, or spiritual discipline",
        "You want traditional guidance, not exaggerated claims",
      ],
      fitCheckWrongLabel: "Rudraksha May Not Be Right for You If:",
      fitCheckWrongItems: [
        "You're looking for instant or guaranteed outcomes",
        "You prefer decorative jewelry with no traditional context",
        "You're unsure and don't want guidance",
      ],
      fitCheckImage: "/assets/images/home/rudraksh.png",
    },
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    image: "/assets/images/products/category-bracelets.png",
    sortOrder: 1,
    pageContent: {
      heroTitle: "Sacred Bracelets, Worn with Intention",
      heroSubtitle:
        "Each bracelet is strung with genuine Rudraksha and gemstone beads, checked for quality and energised on request—so it feels personal, not generic.",
      introHeading: "Rudraksha & Gemstone Bracelets",
      introDescription:
        "Bracelets are one of the simplest ways to keep Rudraksha and gemstone energy close throughout the day. Worn on the wrist, they sit near the pulse points and are easy to carry into work, travel, and daily routine. This collection brings together single-mukhi, multi-bead, and combination bracelets—strung on durable elastic or thread, sized for comfort, and finished with authentic beads sourced and verified the same way as our loose Rudraksha.",
      introImage: "/assets/images/products/category-bracelets.png",
      checklistHeading: "Every Bracelet You See Here Is",
      checklist: [
        "Strung with genuine, hand-selected beads",
        "Checked for size, finish, and thread strength",
        "Mukhi and bead type confirmed before listing",
        "Provided with certification on request",
        "Final-checked and cleaned before dispatch",
      ],
      checklistImages: ["/assets/images/products/category-bracelets.png", "/assets/images/about/about-founding-1.png"],
      fitCheckRightLabel: "Bracelets May Be Right for You If:",
      fitCheckRightItems: [
        "You want a simple, everyday way to stay connected to your practice",
        "You prefer something subtle that fits with daily life and work",
        "You're looking for an easy gift with genuine meaning",
      ],
      fitCheckWrongLabel: "Bracelets May Not Be Right for You If:",
      fitCheckWrongItems: [
        "You need a statement piece for formal occasions",
        "You're allergic to natural fibres or wood and need metal-only pieces",
        "You want something precisely adjustable without resizing",
      ],
      fitCheckImage: "/assets/images/products/category-bracelets.png",
    },
  },
  {
    name: "Murtis",
    slug: "murtis",
    image: "/assets/images/home/god.png",
    sortOrder: 2,
    pageContent: {
      heroTitle: "Murtis Crafted for the Home Temple",
      heroSubtitle:
        "Every murti is cast and finished with attention to proportion and detail, suited for daily worship and quiet reflection at home.",
      introHeading: "Deity Murtis & Idols",
      introDescription:
        "A murti anchors a home altar—it gives daily prayer a focal point and a sense of presence. This collection includes murtis of major deities in brass, marble-dust composite, and resin finishes, sized for home temples, study tables, and gifting. Each piece is checked for finish, proportion, and stability before it's listed, so what you see is what arrives.",
      introImage: "/assets/images/home/god.png",
      checklistHeading: "Every Murti You See Here Is",
      checklist: [
        "Checked for proportion, posture, and detailing",
        "Finished by hand to remove mould marks and rough edges",
        "Base-tested for stability on flat surfaces",
        "Packed with protective wrapping for safe transit",
        "Final quality-checked before dispatch",
      ],
      checklistImages: ["/assets/images/home/god.png", "/assets/images/about/about-founding-2.png"],
      fitCheckRightLabel: "Murtis May Be Right for You If:",
      fitCheckRightItems: [
        "You're setting up or refreshing a home altar",
        "You want a meaningful gift for a housewarming or festival",
        "You value craftsmanship and finish in devotional pieces",
      ],
      fitCheckWrongLabel: "Murtis May Not Be Right for You If:",
      fitCheckWrongItems: [
        "You need a very large piece for a temple hall (we focus on home-sized murtis)",
        "You're looking for antique or pre-owned pieces only",
        "You want a custom deity or pose not listed here",
      ],
      fitCheckImage: "/assets/images/home/god.png",
    },
  },
  {
    name: "Siddha Mala",
    slug: "siddha-mala",
    image: "/assets/images/about/about-sacred-1.png",
    sortOrder: 3,
    pageContent: {
      heroTitle: "Siddha Mala, Strung for Daily Practice",
      heroSubtitle:
        "Each mala is hand-strung to traditional bead counts and checked bead-by-bead, so it holds up to daily japa and long-term use.",
      introHeading: "Siddha Mala (108 Beads)",
      introDescription:
        "A Siddha Mala is a full 108-bead strand traditionally used for japa (mantra repetition), meditation counting, and as a worn or carried sacred object. This collection includes malas strung from Rudraksha, Tulsi, and mixed sacred beads, knotted between beads for durability, and finished with a guru bead and tassel. Bead size, count, and stringing are checked before each mala is listed.",
      introImage: "/assets/images/about/about-sacred-1.png",
      checklistHeading: "Every Siddha Mala You See Here Is",
      checklist: [
        "Strung to the correct traditional 108-bead count",
        "Hand-knotted between beads for durability",
        "Bead size and material verified before listing",
        "Finished with a guru bead and tassel",
        "Final-checked for thread strength before dispatch",
      ],
      checklistImages: ["/assets/images/about/about-sacred-1.png", "/assets/images/about/about-sacred-2.png"],
      fitCheckRightLabel: "A Siddha Mala May Be Right for You If:",
      fitCheckRightItems: [
        "You have a regular japa, mantra, or meditation practice",
        "You want a mala that can be worn as well as used for counting",
        "You prefer traditional bead counts and stringing methods",
      ],
      fitCheckWrongLabel: "A Siddha Mala May Not Be Right for You If:",
      fitCheckWrongItems: [
        "You're looking for a short, decorative-only necklace",
        "You need a mala pre-energised for a specific deity practice not listed",
        "You prefer machine-knotted, mass-produced strands",
      ],
      fitCheckImage: "/assets/images/about/about-sacred-2.png",
    },
  },
  {
    name: "Gemstones",
    slug: "gemstones",
    image: "/assets/images/about/about-p01-3021a5.png",
    sortOrder: 4,
    pageContent: {
      heroTitle: "Gemstones, Verified Before They Reach You",
      heroSubtitle:
        "Every gemstone is checked for cut, clarity, and weight before listing—so you know exactly what you're choosing for wear or remedy.",
      introHeading: "Natural Gemstones & Rings",
      introDescription:
        "Gemstones are widely used in Vedic astrology as a way to strengthen the influence of a particular planet for the wearer. This collection covers natural, untreated gemstones set in simple rings and pendants—chosen for clarity, cut, and carat weight rather than size alone. Each stone is checked before setting, and basic guidance on which finger and metal is traditionally recommended is included with the listing.",
      introImage: "/assets/images/about/about-p01-3021a5.png",
      checklistHeading: "Every Gemstone You See Here Is",
      checklist: [
        "Checked for natural origin before listing",
        "Verified for cut, clarity, and carat weight",
        "Set securely in tested metal mounts",
        "Provided with basic wearing guidance",
        "Final-checked before dispatch",
      ],
      checklistImages: ["/assets/images/about/about-p01-3021a5.png", "/assets/images/products/category-rings.png"],
      fitCheckRightLabel: "Gemstones May Be Right for You If:",
      fitCheckRightItems: [
        "You're exploring gemstones as part of an astrological remedy",
        "You want a natural stone with basic verification before purchase",
        "You're comfortable seeking a professional consultation for fit and timing",
      ],
      fitCheckWrongLabel: "Gemstones May Not Be Right for You If:",
      fitCheckWrongItems: [
        "You're looking for lab-created or synthetic stones",
        "You want guaranteed astrological results without consultation",
        "You need formal gemological certification included by default",
      ],
      fitCheckImage: "/assets/images/about/about-p01-3021a5.png",
    },
  },
  {
    name: "Antiques",
    slug: "antiques",
    image: "/assets/images/about/about-founding-2.png",
    sortOrder: 5,
    pageContent: {
      heroTitle: "Antiques, Sourced with Provenance in Mind",
      heroSubtitle:
        "Every antique piece is inspected for age, condition, and craftsmanship—so what you're buying is described honestly, not embellished.",
      introHeading: "Antique Religious Artefacts",
      introDescription:
        "This collection brings together older devotional and decorative pieces—pendants, boxes, figurines, and ritual items—sourced for their craftsmanship and history rather than mass appeal. Each piece is inspected for condition, listed with an honest description of wear and age, and photographed as-is so there are no surprises. Quantities are limited and pieces are not re-stocked once sold.",
      introImage: "/assets/images/about/about-founding-2.png",
      checklistHeading: "Every Antique Piece You See Here Is",
      checklist: [
        "Inspected for age, material, and condition",
        "Photographed as-is, including visible wear",
        "Described honestly with no exaggerated claims",
        "Cleaned gently without altering original finish",
        "Final-checked before dispatch",
      ],
      checklistImages: ["/assets/images/about/about-founding-2.png", "/assets/images/about/about-founding-1.png"],
      fitCheckRightLabel: "Antiques May Be Right for You If:",
      fitCheckRightItems: [
        "You appreciate older craftsmanship and natural wear",
        "You're comfortable with one-of-a-kind pieces that won't be restocked",
        "You want a collectible piece with character, not a uniform finish",
      ],
      fitCheckWrongLabel: "Antiques May Not Be Right for You If:",
      fitCheckWrongItems: [
        "You expect a brand-new, flawless finish",
        "You need an exact match to a specific reference piece",
        "You're looking for formal antique authentication paperwork",
      ],
      fitCheckImage: "/assets/images/about/about-founding-1.png",
    },
  },
  {
    name: "Combinations",
    slug: "combinations",
    image: "/assets/images/about/about-principle-3.png",
    sortOrder: 6,
    pageContent: {
      heroTitle: "Combinations, Paired with Purpose",
      heroSubtitle:
        "Every combination is assembled from individually verified beads—paired by traditional intention, not just by appearance.",
      introHeading: "Rudraksha Combination Sets",
      introDescription:
        "Some Rudraksha mukhis are traditionally worn together to support a specific intention—grounding, focus, courage, or balance. This collection brings together pre-assembled combination bracelets and pendants, where each bead is sourced and checked individually before being combined. Every combination listing explains which mukhis are included and the traditional reasoning behind the pairing.",
      introImage: "/assets/images/about/about-principle-3.png",
      checklistHeading: "Every Combination You See Here Is",
      checklist: [
        "Assembled from individually verified beads",
        "Paired according to traditional guidance, explained on the listing",
        "Checked for mukhi accuracy before combining",
        "Strung and finished to the same standard as single-bead pieces",
        "Final-checked before dispatch",
      ],
      checklistImages: ["/assets/images/about/about-principle-3.png", "/assets/images/about/about-principle-1.png"],
      fitCheckRightLabel: "Combinations May Be Right for You If:",
      fitCheckRightItems: [
        "You already know which mukhis you want to combine",
        "You're following guidance from a consultation or prior research",
        "You want one piece that covers more than one intention",
      ],
      fitCheckWrongLabel: "Combinations May Not Be Right for You If:",
      fitCheckWrongItems: [
        "You'd rather choose and combine single beads yourself",
        "You want a custom combination not listed here",
        "You're new to Rudraksha and unsure which combination suits you",
      ],
      fitCheckImage: "/assets/images/about/about-principle-1.png",
    },
  },
  {
    name: "Singing Bowls",
    slug: "singing-bowls",
    image: "/assets/images/about/about-p04.png",
    sortOrder: 7,
    pageContent: {
      heroTitle: "Singing Bowls, Tuned by Hand",
      heroSubtitle:
        "Every bowl is played and listened to before listing—so the tone, sustain, and finish meet the same standard, bowl to bowl.",
      introHeading: "Himalayan Singing Bowls",
      introDescription:
        "Singing bowls are used for sound meditation, relaxation practices, and as a closing or opening signal in yoga and ritual settings. This collection includes hand-hammered metal bowls in a range of sizes, each played and checked for tone, sustain, and balance before listing. A wooden striker is included with every bowl, and a basic guide on striking and rim-rubbing technique comes with the listing.",
      introImage: "/assets/images/about/about-p04.png",
      checklistHeading: "Every Singing Bowl You See Here Is",
      checklist: [
        "Played and listened to for tone and sustain",
        "Checked for balance and even rim contact",
        "Inspected for dents, cracks, or casting flaws",
        "Supplied with a matching wooden striker",
        "Final-checked and cleaned before dispatch",
      ],
      checklistImages: ["/assets/images/about/about-p04.png", "/assets/images/about/about-p02.png"],
      fitCheckRightLabel: "Singing Bowls May Be Right for You If:",
      fitCheckRightItems: [
        "You use sound as part of meditation, yoga, or relaxation practice",
        "You want a hand-finished bowl with a checked tone",
        "You're comfortable with natural variation in size and finish, bowl to bowl",
      ],
      fitCheckWrongLabel: "Singing Bowls May Not Be Right for You If:",
      fitCheckWrongItems: [
        "You need an exact, lab-tuned frequency for sound therapy work",
        "You want a perfectly uniform, machine-made finish",
        "You're looking for a decorative piece only and don't plan to play it",
      ],
      fitCheckImage: "/assets/images/about/about-p02.png",
    },
  },
  {
    name: "Necklaces",
    slug: "necklaces",
    image: "/assets/images/products/category-necklace.png",
    sortOrder: 8,
    pageContent: {
      heroTitle: "Necklaces, Finished for Everyday Wear",
      heroSubtitle:
        "Every necklace is strung and finished to sit comfortably for daily wear, with each bead checked the same way as our loose Rudraksha.",
      introHeading: "Rudraksha Necklaces",
      introDescription:
        "A Rudraksha necklace is one of the most common ways to keep a bead close throughout the day, worn under or over clothing. This collection includes single-bead pendants, multi-bead strands, and capped designs in silver, strung on adjustable cord or chain. Each bead is checked for mukhi and finish before stringing, and chain or cord length is listed clearly so sizing is predictable.",
      introImage: "/assets/images/products/category-necklace.png",
      checklistHeading: "Every Necklace You See Here Is",
      checklist: [
        "Strung with checked, genuine Rudraksha beads",
        "Finished with secure caps, clasps, or knots",
        "Length and adjustability listed clearly",
        "Mukhi and bead type confirmed before listing",
        "Final-checked before dispatch",
      ],
      checklistImages: ["/assets/images/products/category-necklace.png", "/assets/images/about/about-p02.png"],
      fitCheckRightLabel: "Necklaces May Be Right for You If:",
      fitCheckRightItems: [
        "You want to wear your Rudraksha visibly or under clothing throughout the day",
        "You prefer an adjustable cord or chain over a fixed-size piece",
        "You're looking for a versatile everyday or gifting piece",
      ],
      fitCheckWrongLabel: "Necklaces May Not Be Right for You If:",
      fitCheckWrongItems: [
        "You need a fixed, tailored chain length only",
        "You want gemstone-only necklaces with no Rudraksha",
        "You prefer wrist-worn pieces over neck-worn ones (see Bracelets)",
      ],
      fitCheckImage: "/assets/images/products/category-necklace.png",
    },
  },
];

const collections = [
  { name: "Wealth", slug: "wealth", icon: "/assets/icons/wealth.svg", sortOrder: 0 },
  { name: "Health", slug: "health", icon: "/assets/icons/health.svg", sortOrder: 1 },
  { name: "Love", slug: "love", icon: "/assets/icons/love.svg", sortOrder: 2 },
  { name: "Luck", slug: "luck", icon: "/assets/icons/luck.svg", sortOrder: 3 },
  { name: "Protection", slug: "protection", icon: "/assets/icons/protection.svg", sortOrder: 4 },
  { name: "Peace", slug: "peace", icon: "/assets/icons/peace.svg", sortOrder: 5 },
  { name: "Courage", slug: "courage", icon: "/assets/icons/courage.svg", sortOrder: 6 },
  { name: "Balance", slug: "balance", icon: "/assets/icons/balance.svg", sortOrder: 7 },
];

type ProductSeed = {
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
  variants?: { label: string; priceDeltaCents: number; image: string; sortOrder: number }[];
  addOns?: { label: string; priceDeltaCents: number; sortOrder: number }[];
  reviews?: { authorName: string; title: string; body: string; rating: number; createdAt: Date }[];
  collectionSlugs: string[];
};

const products: ProductSeed[] = [
  // ---- Rudraksha (7) -------------------------------------------------
  {
    slug: "4-mukhi-regular-rudraksha",
    name: "4 Mukhi (Regular) Rudraksha",
    breadcrumbLabel: "4 Mukhi (Regular) Rudraksha",
    categorySlug: "rudraksha",
    priceCents: 16000,
    compareAtPriceCents: 17000,
    stockCount: 3,
    ratingAvg: 5.0,
    ratingCount: 1200,
    isBestseller: true,
    description:
      "The 4 Mukhi (four-faced) Rudraksha is associated with Lord Brahma and is traditionally worn to support clarity of thought, communication, and learning. Each bead in this listing is sourced from Nepal, hand-inspected for natural mukhi lines, bead density, and surface condition, and verified before it is photographed and listed. What you see in the gallery is the actual bead you will receive, not a representative sample.",
    images: [
      { url: "/assets/images/about/about-sacred-2.png", alt: "4 Mukhi Rudraksha", role: "MAIN", sortOrder: 0 },
      { url: "/assets/images/products/category-necklace.png", alt: "4 Mukhi Rudraksha laid out", role: "GALLERY_LEFT", sortOrder: 1 },
      { url: "/assets/images/about/about-p02.png", alt: "4 Mukhi Rudraksha worn", role: "GALLERY_TOP_RIGHT", sortOrder: 2 },
      { url: "/assets/images/home/rudraksh.png", alt: "4 Mukhi Rudraksha detail", role: "GALLERY_BOTTOM_RIGHT", sortOrder: 3 },
    ],
    variants: [
      { label: "Loose Bead", priceDeltaCents: 0, image: "/assets/images/home/beads.png", sortOrder: 0 },
      { label: "Silver Capped", priceDeltaCents: 12000, image: "/assets/images/products/category-bracelets.png", sortOrder: 1 },
      { label: "Silver Chain", priceDeltaCents: 18000, image: "/assets/images/products/category-charms.png", sortOrder: 2 },
      { label: "Rudraksha Chain", priceDeltaCents: 22000, image: "/assets/images/products/category-earrings.png", sortOrder: 3 },
    ],
    addOns: [
      { label: "Free Touch Energization", priceDeltaCents: 0, sortOrder: 0 },
      { label: "Rudraksha Prana Pratishtha Pooja", priceDeltaCents: 29900, sortOrder: 1 },
      { label: "Maha Shivaratri Pooja at Pashupatinath - 2026", priceDeltaCents: 30100, sortOrder: 2 },
      { label: "Trividha Prana Pratishtha Pooja (3 Brahmans)", priceDeltaCents: 59900, sortOrder: 3 },
      { label: "Dwadasha Maha Prana Pratishtha Pooja (13 Brahmans)", priceDeltaCents: 120000, sortOrder: 4 },
    ],
    reviews: [
      {
        authorName: "Annette Black",
        title: "Exquisite Craftsmanship & Timeless Beauty",
        body: "Absolutely stunning! The craftsmanship and attention to detail are beyond compare. Truly timeless and elegant. Each piece is meticulously designed to bring out brilliance and sophistication, making every moment special.",
        rating: 5,
        createdAt: new Date("2025-02-25"),
      },
      {
        authorName: "Darrell Steward",
        title: "Perfect Gift for Any Occasion",
        body: "Bought a necklace for my wife, and she loved it! A perfect blend of luxury and charm. Designed to make every celebration memorable, our jewelry captures love, elegance, and personal style effortlessly.",
        rating: 5,
        createdAt: new Date("2025-02-25"),
      },
    ],
    collectionSlugs: ["health", "peace"],
  },
  {
    slug: "5-mukhi-rudraksha",
    name: "5 Mukhi Rudraksha",
    breadcrumbLabel: "5 Mukhi Rudraksha",
    categorySlug: "rudraksha",
    priceCents: 14000,
    compareAtPriceCents: 15000,
    stockCount: 10,
    ratingAvg: 4.8,
    ratingCount: 340,
    isBestseller: true,
    description:
      "The 5 Mukhi (five-faced) Rudraksha is the most commonly worn bead, associated with Lord Shiva in his Kalagni Rudra form. It is traditionally worn for general well-being, calmness, and balance in daily life, and is considered suitable for first-time wearers. Each bead is sourced from Nepal and hand-checked for natural mukhi lines and surface condition before listing.",
    images: [{ url: "/assets/images/about/about-sacred-1.png", alt: "5 Mukhi Rudraksha", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["wealth", "balance"],
  },
  {
    slug: "6-mukhi-rudraksha",
    name: "6 Mukhi Rudraksha",
    breadcrumbLabel: "6 Mukhi Rudraksha",
    categorySlug: "rudraksha",
    priceCents: 18000,
    compareAtPriceCents: 20000,
    stockCount: 10,
    ratingAvg: 4.7,
    ratingCount: 210,
    isBestseller: true,
    description:
      "The 6 Mukhi (six-faced) Rudraksha is associated with Lord Kartikeya and is traditionally worn to support willpower, discipline, and steady relationships. This bead is sourced and hand-verified for authentic mukhi structure before it is photographed and listed.",
    images: [{ url: "/assets/images/about/about-founding-1.png", alt: "6 Mukhi Rudraksha", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["love", "peace"],
  },
  {
    slug: "7-mukhi-rudraksha",
    name: "7 Mukhi Rudraksha",
    breadcrumbLabel: "7 Mukhi Rudraksha",
    categorySlug: "rudraksha",
    priceCents: 20000,
    compareAtPriceCents: 22000,
    stockCount: 10,
    ratingAvg: 4.8,
    ratingCount: 175,
    isBestseller: true,
    description:
      "The 7 Mukhi (seven-faced) Rudraksha is associated with Goddess Mahalakshmi and is traditionally worn for stability in finances and to ease long-standing obstacles. Each bead is individually checked for natural ridges and bead density before listing.",
    images: [{ url: "/assets/images/about/about-founding-2.png", alt: "7 Mukhi Rudraksha", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["luck", "protection"],
  },
  {
    slug: "8-mukhi-rudraksha",
    name: "8 Mukhi Rudraksha",
    breadcrumbLabel: "8 Mukhi Rudraksha",
    categorySlug: "rudraksha",
    priceCents: 23000,
    compareAtPriceCents: 25000,
    stockCount: 8,
    ratingAvg: 4.6,
    ratingCount: 132,
    isBestseller: true,
    description:
      "The 8 Mukhi (eight-faced) Rudraksha is associated with Lord Ganesha and is traditionally worn before starting new ventures, for clarity of purpose and removal of obstacles. This bead is hand-verified for authentic mukhi count and surface condition.",
    images: [{ url: "/assets/images/about/about-p04.png", alt: "8 Mukhi Rudraksha", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["protection", "courage"],
  },
  {
    slug: "9-mukhi-rudraksha",
    name: "9 Mukhi Rudraksha",
    breadcrumbLabel: "9 Mukhi Rudraksha",
    categorySlug: "rudraksha",
    priceCents: 24000,
    compareAtPriceCents: 25000,
    stockCount: 8,
    ratingAvg: 4.7,
    ratingCount: 156,
    isBestseller: true,
    description:
      "The 9 Mukhi (nine-faced) Rudraksha is associated with Goddess Durga and is traditionally worn for courage, energy, and protection during demanding periods. Each bead is sourced from Nepal and checked for natural mukhi lines before listing.",
    images: [{ url: "/assets/images/about/about-principle-3.png", alt: "9 Mukhi Rudraksha", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["courage", "wealth"],
  },
  {
    slug: "12-mukhi-rudraksha",
    name: "12 Mukhi Rudraksha",
    breadcrumbLabel: "12 Mukhi Rudraksha",
    categorySlug: "rudraksha",
    priceCents: 28000,
    compareAtPriceCents: 30000,
    stockCount: 6,
    ratingAvg: 4.6,
    ratingCount: 98,
    isBestseller: false,
    description:
      "The 12 Mukhi (twelve-faced) Rudraksha is associated with Surya, the Sun, and is traditionally worn to support confidence, leadership, and vitality. This bead is hand-verified for authentic mukhi structure and finish before it is listed.",
    images: [{ url: "/assets/images/about/about-p01-3021a5.png", alt: "12 Mukhi Rudraksha", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["balance", "peace"],
  },

  // ---- Bracelets (2) --------------------------------------------------
  {
    slug: "rudraksha-bracelet-5-mukhi",
    name: "Rudraksha Bracelet (5 Mukhi)",
    breadcrumbLabel: "Rudraksha Bracelet (5 Mukhi)",
    categorySlug: "bracelets",
    priceCents: 12000,
    compareAtPriceCents: 13000,
    stockCount: 15,
    ratingAvg: 4.7,
    ratingCount: 264,
    isBestseller: true,
    description:
      "Strung from eight 5 Mukhi Rudraksha beads on a durable elastic cord, this bracelet is designed for daily wear. Each bead is individually checked for authentic mukhi lines before stringing, and the elastic is tested for stretch and recoil so the bracelet keeps its fit over time.",
    images: [{ url: "/assets/images/products/category-bracelets.png", alt: "Rudraksha Bracelet (5 Mukhi)", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["protection", "luck"],
  },
  {
    slug: "navratna-gemstone-bracelet",
    name: "Navratna Gemstone Bracelet",
    breadcrumbLabel: "Navratna Gemstone Bracelet",
    categorySlug: "bracelets",
    priceCents: 15000,
    compareAtPriceCents: 17000,
    stockCount: 10,
    ratingAvg: 4.5,
    ratingCount: 87,
    isBestseller: false,
    description:
      "This bracelet combines nine traditional gemstones—ruby, pearl, coral, emerald, yellow sapphire, diamond, blue sapphire, hessonite, and cat's eye—set in small panels on an adjustable cord. Each stone is checked for natural origin and secure setting before the bracelet is assembled.",
    images: [{ url: "/assets/images/about/about-principle-1.png", alt: "Navratna Gemstone Bracelet", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["wealth", "balance"],
  },

  // ---- Murtis (2) -------------------------------------------------------
  {
    slug: "brass-lord-ganesha-murti",
    name: "Brass Lord Ganesha Murti",
    breadcrumbLabel: "Brass Lord Ganesha Murti",
    categorySlug: "murtis",
    priceCents: 18000,
    compareAtPriceCents: 21000,
    stockCount: 10,
    ratingAvg: 4.8,
    ratingCount: 142,
    isBestseller: false,
    description:
      "A solid brass murti of Lord Ganesha, finished with hand-detailing on the crown, ears, and base. Suited for home altars, study tables, and gifting, this piece is checked for casting quality, finish, and stability on flat surfaces before it is listed.",
    images: [{ url: "/assets/images/home/god.png", alt: "Brass Lord Ganesha Murti", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["peace", "health"],
  },
  {
    slug: "marble-finish-shiva-murti",
    name: "Marble-Finish Lord Shiva Murti",
    breadcrumbLabel: "Marble-Finish Lord Shiva Murti",
    categorySlug: "murtis",
    priceCents: 35000,
    compareAtPriceCents: 40000,
    stockCount: 6,
    ratingAvg: 4.7,
    ratingCount: 64,
    isBestseller: false,
    description:
      "This Lord Shiva murti is cast in a marble-dust composite and hand-painted for a soft, stone-like finish. It depicts Shiva in meditation posture and is sized for home temples. Each piece is checked for proportion, paint finish, and base stability before dispatch.",
    images: [{ url: "/assets/images/about/about-founding-1.png", alt: "Marble-Finish Lord Shiva Murti", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["peace", "courage"],
  },

  // ---- Siddha Mala (2) ----------------------------------------------------
  {
    slug: "rudraksha-siddha-mala-108",
    name: "Rudraksha Siddha Mala (108 Beads)",
    breadcrumbLabel: "Rudraksha Siddha Mala (108 Beads)",
    categorySlug: "siddha-mala",
    priceCents: 26000,
    compareAtPriceCents: 29000,
    stockCount: 8,
    ratingAvg: 4.8,
    ratingCount: 118,
    isBestseller: false,
    description:
      "A traditional 108-bead mala strung from small Rudraksha beads, hand-knotted between each bead for durability, and finished with a guru bead and cotton tassel. Suitable for japa, meditation counting, or wearing. Bead size and stringing are checked before listing.",
    images: [{ url: "/assets/images/about/about-sacred-1.png", alt: "Rudraksha Siddha Mala (108 Beads)", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["wealth", "health"],
  },
  {
    slug: "tulsi-siddha-mala-108",
    name: "Tulsi Siddha Mala (108 Beads)",
    breadcrumbLabel: "Tulsi Siddha Mala (108 Beads)",
    categorySlug: "siddha-mala",
    priceCents: 9000,
    compareAtPriceCents: 11000,
    stockCount: 20,
    ratingAvg: 4.6,
    ratingCount: 203,
    isBestseller: false,
    description:
      "Strung from 108 Tulsi (holy basil) wood beads, this mala is traditionally associated with devotion and is commonly used in Vaishnav practice for japa and meditation. Each strand is hand-knotted and finished with a tassel, and checked for bead consistency before listing.",
    images: [{ url: "/assets/images/about/about-sacred-2.png", alt: "Tulsi Siddha Mala (108 Beads)", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["peace", "love"],
  },

  // ---- Gemstones (2) ----------------------------------------------------
  {
    slug: "natural-yellow-sapphire-ring",
    name: "Natural Yellow Sapphire Ring (Pukhraj)",
    breadcrumbLabel: "Natural Yellow Sapphire Ring (Pukhraj)",
    categorySlug: "gemstones",
    priceCents: 32000,
    compareAtPriceCents: 36000,
    stockCount: 5,
    ratingAvg: 4.7,
    ratingCount: 76,
    isBestseller: false,
    description:
      "A natural, untreated Yellow Sapphire (Pukhraj) set in a simple panchadhatu or silver mount, traditionally worn to strengthen the influence of Jupiter. The stone is checked for natural origin, clarity, and carat weight before setting, and basic guidance on wearing day and finger is included with the listing.",
    images: [{ url: "/assets/images/about/about-p01-3021a5.png", alt: "Natural Yellow Sapphire Ring (Pukhraj)", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["wealth", "luck"],
  },
  {
    slug: "natural-red-coral-ring",
    name: "Natural Red Coral Ring (Moonga)",
    breadcrumbLabel: "Natural Red Coral Ring (Moonga)",
    categorySlug: "gemstones",
    priceCents: 19000,
    compareAtPriceCents: 21000,
    stockCount: 9,
    ratingAvg: 4.5,
    ratingCount: 58,
    isBestseller: false,
    description:
      "A natural Red Coral (Moonga) set in a silver mount, traditionally worn to strengthen the influence of Mars and support courage and confidence. The coral is checked for natural origin and surface quality before setting.",
    images: [{ url: "/assets/images/products/category-rings.png", alt: "Natural Red Coral Ring (Moonga)", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["courage", "protection"],
  },

  // ---- Antiques (2) -------------------------------------------------------
  {
    slug: "antique-brass-rudraksha-box",
    name: "Antique Brass Rudraksha Box",
    breadcrumbLabel: "Antique Brass Rudraksha Box",
    categorySlug: "antiques",
    priceCents: 22000,
    compareAtPriceCents: 26000,
    stockCount: 4,
    ratingAvg: 4.6,
    ratingCount: 31,
    isBestseller: false,
    description:
      "A hand-engraved brass box with a hinged lid, originally used to store malas and small devotional items. This piece shows natural age and patina consistent with its history, and is inspected for structural soundness and hinge function before listing. Quantities are limited.",
    images: [{ url: "/assets/images/about/about-founding-2.png", alt: "Antique Brass Rudraksha Box", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["balance", "peace"],
  },
  {
    slug: "antique-temple-bell",
    name: "Antique Temple Bell",
    breadcrumbLabel: "Antique Temple Bell",
    categorySlug: "antiques",
    priceCents: 18000,
    compareAtPriceCents: 21000,
    stockCount: 4,
    ratingAvg: 4.7,
    ratingCount: 22,
    isBestseller: false,
    description:
      "A brass temple bell with a carved handle, traditionally rung at the start and close of puja. This piece carries natural wear from age and use, and is inspected for sound, casting quality, and structural condition before listing. Quantities are limited and not restocked once sold.",
    images: [{ url: "/assets/images/about/about-founding-1.png", alt: "Antique Temple Bell", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["peace", "protection"],
  },

  // ---- Combinations (2) --------------------------------------------------
  {
    slug: "5-7-mukhi-combination-bracelet",
    name: "5+7 Mukhi Combination Bracelet",
    breadcrumbLabel: "5+7 Mukhi Combination Bracelet",
    categorySlug: "combinations",
    priceCents: 21000,
    compareAtPriceCents: 23000,
    stockCount: 12,
    ratingAvg: 4.7,
    ratingCount: 95,
    isBestseller: false,
    description:
      "This bracelet combines 5 Mukhi (Shiva) and 7 Mukhi (Mahalakshmi) beads, a pairing traditionally worn together for balance between discipline and prosperity. Each bead is individually verified for mukhi count before being strung on a durable elastic cord.",
    images: [{ url: "/assets/images/about/about-principle-3.png", alt: "5+7 Mukhi Combination Bracelet", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["wealth", "protection"],
  },
  {
    slug: "1-4-7-mukhi-combination-pendant",
    name: "1+4+7 Mukhi Combination Pendant",
    breadcrumbLabel: "1+4+7 Mukhi Combination Pendant",
    categorySlug: "combinations",
    priceCents: 26000,
    compareAtPriceCents: 29000,
    stockCount: 6,
    ratingAvg: 4.6,
    ratingCount: 41,
    isBestseller: false,
    description:
      "This pendant combines 1, 4, and 7 Mukhi Rudraksha beads in a single silver-capped setting, a combination traditionally chosen for clarity, communication, and removing obstacles together. Each bead is verified individually before being set and capped.",
    images: [{ url: "/assets/images/about/about-principle-2.png", alt: "1+4+7 Mukhi Combination Pendant", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["luck", "courage"],
  },

  // ---- Singing Bowls (2) --------------------------------------------------
  {
    slug: "himalayan-singing-bowl-medium",
    name: "Himalayan Singing Bowl (Medium)",
    breadcrumbLabel: "Himalayan Singing Bowl (Medium)",
    categorySlug: "singing-bowls",
    priceCents: 18000,
    compareAtPriceCents: 20000,
    stockCount: 10,
    ratingAvg: 4.8,
    ratingCount: 89,
    isBestseller: false,
    description:
      "A hand-hammered medium singing bowl suited for sound meditation and as a signal bowl in yoga practice. Each bowl is played and listened to for tone and sustain before listing, and comes with a matching wooden striker.",
    images: [{ url: "/assets/images/about/about-p04.png", alt: "Himalayan Singing Bowl (Medium)", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["peace", "balance"],
  },
  {
    slug: "seven-metal-singing-bowl-large",
    name: "Seven Metal Singing Bowl (Large)",
    breadcrumbLabel: "Seven Metal Singing Bowl (Large)",
    categorySlug: "singing-bowls",
    priceCents: 28000,
    compareAtPriceCents: 32000,
    stockCount: 5,
    ratingAvg: 4.9,
    ratingCount: 47,
    isBestseller: false,
    description:
      "A large singing bowl cast from a traditional seven-metal alloy, producing a deep, sustained tone suited for group meditation or therapy room use. Each bowl is checked for balance, rim contact, and tone before listing, and includes a wooden striker and cushion.",
    images: [{ url: "/assets/images/about/about-p02.png", alt: "Seven Metal Singing Bowl (Large)", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["balance", "health"],
  },

  // ---- Necklaces (2) -------------------------------------------------------
  {
    slug: "rudraksha-necklace-silver-cap",
    name: "Rudraksha Necklace with Silver Cap",
    breadcrumbLabel: "Rudraksha Necklace with Silver Cap",
    categorySlug: "necklaces",
    priceCents: 23000,
    compareAtPriceCents: 25000,
    stockCount: 12,
    ratingAvg: 4.8,
    ratingCount: 168,
    isBestseller: true,
    description:
      "A single 5 Mukhi Rudraksha bead, silver-capped and strung on an adjustable black cord, designed for everyday wear under or over clothing. The bead is verified for mukhi count and the cap is checked for secure fit before assembly.",
    images: [{ url: "/assets/images/products/category-necklace.png", alt: "Rudraksha Necklace with Silver Cap", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["love", "health"],
  },
  {
    slug: "5-mukhi-pendant-necklace",
    name: "5 Mukhi Rudraksha Pendant Necklace",
    breadcrumbLabel: "5 Mukhi Rudraksha Pendant Necklace",
    categorySlug: "necklaces",
    priceCents: 15000,
    compareAtPriceCents: 17000,
    stockCount: 14,
    ratingAvg: 4.6,
    ratingCount: 73,
    isBestseller: false,
    description:
      "A 5 Mukhi Rudraksha bead set in a simple silver pendant on a fine chain, designed as an everyday piece that pairs well with both traditional and contemporary outfits. The bead and chain are checked for finish and secure setting before listing.",
    images: [{ url: "/assets/images/about/about-p03.png", alt: "5 Mukhi Rudraksha Pendant Necklace", role: "MAIN", sortOrder: 0 }],
    collectionSlugs: ["wealth", "love"],
  },
];

async function main() {
  // Clean slate — cascades to images/variants/addOns/sizes/reviews and the
  // implicit product<->collection join table.
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.category.deleteMany();

  const categoryIdBySlug = new Map<string, string>();
  for (const c of categories) {
    const created = await prisma.category.create({
      data: {
        name: c.name,
        slug: c.slug,
        image: c.image,
        sortOrder: c.sortOrder,
        pageContent: c.pageContent as unknown as Prisma.InputJsonValue,
      },
    });
    categoryIdBySlug.set(c.slug, created.id);
  }

  const collectionIdBySlug = new Map<string, string>();
  for (const col of collections) {
    const created = await prisma.collection.create({
      data: { name: col.name, slug: col.slug, icon: col.icon, sortOrder: col.sortOrder },
    });
    collectionIdBySlug.set(col.slug, created.id);
  }

  for (const p of products) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        breadcrumbLabel: p.breadcrumbLabel,
        categoryId: categoryIdBySlug.get(p.categorySlug)!,
        description: p.description,
        shippingInfo: SHIPPING_INFO,
        packagingInfo: PACKAGING_INFO,
        returnsInfo: RETURNS_INFO,
        priceCents: p.priceCents,
        compareAtPriceCents: p.compareAtPriceCents,
        stockCount: p.stockCount,
        ratingAvg: p.ratingAvg,
        ratingCount: p.ratingCount,
        isBestseller: p.isBestseller,
        images: { create: p.images as Prisma.ProductImageCreateWithoutProductInput[] },
        variants: p.variants ? { create: p.variants } : undefined,
        addOns: p.addOns ? { create: p.addOns } : undefined,
        sizes: { create: SIZES.map((label, i) => ({ label, sortOrder: i })) },
        reviews: p.reviews ? { create: p.reviews } : undefined,
        collections: {
          connect: p.collectionSlugs.map((slug) => ({ id: collectionIdBySlug.get(slug)! })),
        },
      },
    });
  }

  console.log(`Seeded ${categories.length} categories, ${collections.length} collections, ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
