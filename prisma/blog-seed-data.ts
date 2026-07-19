// Blog demo content extracted from the original seed so the catalog
// restructure can rewrite prisma/seed.ts without losing blog seeds.

export type BlogSeed = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  readTimeMinutes: number;
  publishedAt: Date;
  categorySlug: string | null;
};

export const blogs: BlogSeed[] = [
  {
    slug: "how-to-identify-genuine-rudraksha",
    title: "How to Identify Genuine Rudraksha: A Practical Guide",
    excerpt:
      "Authentication relies on examining mukhi lines, surface texture, and structural integrity — here's what that looks like in practice.",
    body: [
      "Authentic Rudraksha beads have natural, irregular surface texture and mukhi lines that run consistently from top to bottom without breaks or tool marks. Carved or altered beads often show smoother, more uniform lines that don't quite match natural growth patterns.",
      "Density and weight can also be a useful indicator, though they vary by mukhi type and size, so they're best used alongside other checks rather than on their own.",
      "Where possible, non-destructive testing such as X-ray can confirm the internal structure matches what's expected for a given mukhi count — this is part of the verification process before any bead is listed.",
    ].join("\n\n"),
    coverImage: "/assets/images/about/about-p02.png",
    readTimeMinutes: 4,
    publishedAt: new Date("2026-01-03"),
    categorySlug: null,
  },
  {
    slug: "caring-for-sacred-beads-storage-and-cleansing",
    title: "Caring for Sacred Beads: Storage, Cleansing, and Respect",
    excerpt: "Simple, traditional practices for storing and maintaining Rudraksha malas between uses.",
    body: [
      "Between uses, malas are traditionally stored in a soft pouch or cloth, away from direct sunlight and humidity, which can affect both the cord and the beads' natural oils over time.",
      "Cleansing is usually a light, infrequent practice — a soft dry cloth for dust, and occasionally a very light wipe with a barely damp cloth if needed. Soaking or submerging beads is best avoided, as it can affect the cord and the bead's surface.",
      "How a mala is stored and handled is often as much about respect for the practice as it is about practical upkeep, so many people keep a dedicated space for it separate from everyday jewelry.",
    ].join("\n\n"),
    coverImage: "/assets/images/about/about-principle-1.png",
    readTimeMinutes: 3,
    publishedAt: new Date("2026-01-04"),
    categorySlug: null,
  },
  {
    slug: "understanding-rudraksha-mukhi-meaning",
    title: "Understanding Rudraksha Mukhi: What the Number of Faces Really Means",
    excerpt:
      "A guide to how mukhi (faces) are counted, why they matter, and how to read them honestly without overstating their significance.",
    body: [
      "Every Rudraksha bead is classified by its mukhi — the natural lines or segments running down its surface. These lines form during growth and are not added or carved afterward, which is why mukhi count is one of the first things examined during verification.",
      "Different mukhi counts are traditionally associated with different forms of Shiva and different areas of focus, from grounding and routine to clarity and discipline. These associations come from long-standing tradition rather than guaranteed outcomes, and we describe them as context for your practice rather than promises.",
      "Before a Rudraksha is listed, the mukhi lines are checked manually under good lighting and cross-checked using non-destructive testing, so the number you see described is the number that's actually present on the bead.",
    ].join("\n\n"),
    coverImage: "/assets/images/about/about-sacred-2.png",
    readTimeMinutes: 5,
    publishedAt: new Date("2026-01-15"),
    categorySlug: "rudraksha",
  },
  {
    slug: "choosing-a-rudraksha-bracelet-for-daily-wear",
    title: "How to Choose a Rudraksha Bracelet That Fits Your Daily Routine",
    excerpt: "From bead size to cord type, a few practical things to consider before picking a bracelet you'll wear every day.",
    body: [
      "A bracelet you wear daily needs to handle water, friction, and the occasional knock — so construction matters as much as the beads themselves. Look at how the beads are strung, whether the cord is elastic or fixed-knot, and how the clasp or closure is finished.",
      "Bead size affects both comfort and how the bracelet sits on the wrist. Smaller beads tend to sit closer and feel less bulky under a sleeve, while larger beads are easier to count or rotate during a short practice.",
      "If you're combining a bracelet with other Rudraksha or gemstone pieces, it helps to keep the overall look in mind — a silver-capped bracelet pairs differently with a chain than a plain elastic-cord one.",
    ].join("\n\n"),
    coverImage: "/assets/images/products/category-bracelets.png",
    readTimeMinutes: 4,
    publishedAt: new Date("2026-01-14"),
    categorySlug: "bracelets",
  },
  {
    slug: "caring-for-brass-and-marble-murtis",
    title: "Caring for Brass and Marble Murtis: A Simple Maintenance Guide",
    excerpt: "Practical, low-effort steps to keep a brass or marble-finish murti looking its best for years.",
    body: [
      "Brass murtis develop a natural patina over time, which many people consider part of their character. A soft, dry cloth is usually enough for regular dusting; if you want to retain the original shine, an occasional wipe with a brass-safe polish works, but avoid harsh chemical cleaners that can dull the detailing.",
      "Marble-finish pieces are generally a resin composite rather than solid stone, so they're lighter but can chip if dropped. Keep them away from direct, prolonged sunlight, which can fade the painted finish over time.",
      "For both materials, placement matters as much as cleaning — a stable shelf or table away from high-traffic areas reduces the risk of accidental knocks during daily handling.",
    ].join("\n\n"),
    coverImage: "/assets/images/home/god.png",
    readTimeMinutes: 3,
    publishedAt: new Date("2026-01-13"),
    categorySlug: "murtis",
  },
  {
    slug: "significance-of-the-108-bead-siddha-mala",
    title: "108 Beads, One Practice: The Significance of the Siddha Mala",
    excerpt: "Why malas are traditionally strung with 108 beads, and what that means for everyday use.",
    body: [
      "The number 108 appears across many spiritual traditions, and mala beads are traditionally strung to this count to support repeated counting during chanting or meditation. The extra guru bead at the end marks the start and end of a cycle without being counted itself.",
      "Whether strung from Rudraksha, Tulsi, or another material, the practical role of a mala is the same — it gives your hands something to do so your mind can stay on the practice rather than on counting.",
      "A well-made mala should sit comfortably in the hand and move smoothly bead to bead. Hand-knotting between beads helps maintain spacing and reduces wear at the connection points over years of use.",
    ].join("\n\n"),
    coverImage: "/assets/images/about/about-sacred-1.png",
    readTimeMinutes: 4,
    publishedAt: new Date("2026-01-12"),
    categorySlug: "siddha-mala",
  },
  {
    slug: "gemstone-selection-and-vedic-astrology-principles",
    title: "Gemstone Selection Based on Vedic Astrology Principles",
    excerpt: "An overview of how planetary associations inform gemstone choices, and why a considered approach matters.",
    body: [
      "In Vedic tradition, specific gemstones are associated with specific planets — Yellow Sapphire with Jupiter, Red Coral with Mars, and so on. These associations form the basis for recommending a stone based on a person's birth chart.",
      "Because the right stone depends on individual chart details, general guidance can only go so far. Where possible, it's worth consulting someone familiar with your chart rather than choosing based on a list alone.",
      "Once a stone is chosen, how it's set — ring, pendant, or otherwise — and which metal it's mounted in are typically guided by the same tradition, so it's worth asking about both the stone and its setting together.",
    ].join("\n\n"),
    coverImage: "/assets/images/about/about-p01-3021a5.png",
    readTimeMinutes: 6,
    publishedAt: new Date("2026-01-11"),
    categorySlug: "gemstones",
  },
  {
    slug: "reading-the-story-behind-antique-ritual-items",
    title: "Reading the Story Behind Antique Ritual Items",
    excerpt: "What to look for when examining brass boxes, temple bells, and figurines with history.",
    body: [
      "Antique ritual items carry signs of their age and use — worn edges, hand-finished surfaces, and small variations that machine-made pieces don't have. These details are part of what makes each piece distinct rather than a flaw to be corrected.",
      "Temple bells and boxes were often made for daily handling, so a certain amount of wear is expected and doesn't affect their function. Figurines and pendants are usually more delicate and benefit from careful, infrequent handling.",
      "When an item's exact origin or age can't be verified, we describe it honestly based on craftsmanship and condition rather than making claims we can't support.",
    ].join("\n\n"),
    coverImage: "/assets/images/about/about-founding-2.png",
    readTimeMinutes: 4,
    publishedAt: new Date("2026-01-10"),
    categorySlug: "antiques",
  },
  {
    slug: "why-combination-malas-pair-specific-mukhis",
    title: "Why Combination Malas Pair Specific Mukhis Together",
    excerpt: "A look at the reasoning behind common Rudraksha combinations like 5+7 mukhi or 1+4+7 mukhi.",
    body: [
      "Combination malas and bracelets bring together beads of different mukhi counts, each carrying its own traditional association. The idea is that wearing them together supports more than one area of focus at the same time — for example, pairing a bead associated with discipline alongside one associated with prosperity.",
      "There's no fixed rule for how many combinations exist; over time, certain pairings have become more commonly requested because of how their traditional meanings complement each other.",
      "If you're new to combinations, it can help to start with a pairing that addresses something specific to your routine, rather than choosing based on the number of beads alone.",
    ].join("\n\n"),
    coverImage: "/assets/images/about/about-principle-3.png",
    readTimeMinutes: 4,
    publishedAt: new Date("2026-01-09"),
    categorySlug: "combinations",
  },
  {
    slug: "traditional-craft-behind-himalayan-singing-bowls",
    title: "The Traditional Craft Behind Himalayan Singing Bowls",
    excerpt: "How hand-hammered bowls are made, and what affects the tone you hear.",
    body: [
      "Traditional singing bowls are shaped by hand-hammering a metal disc into a bowl form, a process that can take many passes to achieve an even thickness. The hammer marks left on the surface are part of the finished piece, not something polished away.",
      "Tone is influenced by the bowl's size, thickness, and the alloy used — some bowls are cast from a blend of several metals, which traditionally produces a richer, layered sound when struck or rung around the rim.",
      "A wooden striker suited to the bowl's size makes a noticeable difference in how easily it produces a sustained tone, which is why most bowls are paired with a matching striker and a cushion to rest on.",
    ].join("\n\n"),
    coverImage: "/assets/images/about/about-p04.png",
    readTimeMinutes: 5,
    publishedAt: new Date("2026-01-08"),
    categorySlug: "singing-bowls",
  },
  {
    slug: "wearing-rudraksha-as-a-necklace-styling-and-care",
    title: "Wearing Rudraksha as a Necklace: Styling and Care Tips",
    excerpt: "How to wear a Rudraksha pendant day-to-day, and how to keep the cord and bead in good condition.",
    body: [
      "A single Rudraksha bead set in a pendant is one of the simplest ways to wear it daily, working equally well layered under clothing or worn visibly with both traditional and everyday outfits.",
      "Cords and chains see the most wear over time, especially if the piece is worn during exercise or sleep. Removing it before swimming or heavy activity helps the cord last longer and keeps the bead from knocking against hard surfaces.",
      "If the bead is silver-capped, an occasional wipe with a soft cloth keeps the cap from tarnishing, while the bead itself generally just needs to be kept dry and away from strong fragrances or oils that can seep into its surface.",
    ].join("\n\n"),
    coverImage: "/assets/images/products/category-necklace.png",
    readTimeMinutes: 3,
    publishedAt: new Date("2026-01-07"),
    categorySlug: "necklaces",
  },
];
