import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Additive seed for sample blog posts across all three workflow states
 * (DRAFT, REVIEW, PUBLISHED).
 *
 * - Idempotent: re-running upserts by slug.
 * - Attaches author (WRITER/ADMIN) and real Category references.
 * - Contains rich HTML posts utilizing ALL Tiptap editor features:
 *   Headings (h2, h3, h4), formatting (bold, italic, underline, strike),
 *   lists (bullet, numbered), blockquotes, links, inline images,
 *   embedded YouTube videos, styled tables, horizontal rules, and SEO meta.
 *
 * Run with: npx tsx scripts/seed-sample-blogs.ts
 */

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

type BlogSeed = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  coverImageAlt?: string;
  readTimeMinutes: number;
  status: "DRAFT" | "REVIEW" | "PUBLISHED";
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  publishedAt: Date;
  categorySlug?: string;
};

const PLAIN = (paras: string[]) => paras.join("\n\n");

const blogs: BlogSeed[] = [
  // =========================================================================
  // ---- PUBLISHED BLOGS (Testing ALL Rich Text Editor Features) ------------
  // =========================================================================
  {
    slug: "complete-guide-to-rudraksha-mukhi-astrology-and-energization",
    title: "The Master Guide to Rudraksha Mukhi, Astrology & Sacred Energization",
    excerpt:
      "An in-depth reference exploring mukhi counts 1 through 14, ruling deities, planetary alignment, ritual energization, and care guidelines.",
    categorySlug: "rudraksha",
    coverImage: "/assets/images/about/about-p02.png",
    coverImageAlt: "Natural Rudraksha bead with mukhi examination under soft illumination",
    readTimeMinutes: 8,
    status: "PUBLISHED",
    tags: ["Rudraksha", "Mukhi Guide", "Astrology", "Energization", "Sacred Traditions"],
    metaTitle: "Master Guide to Rudraksha Mukhi & Sacred Energization | Rudraksha Antiquei",
    metaDescription:
      "Explore mukhi counts, ruling planets, sacred mantras, YouTube video walkthroughs, and complete comparison tables for authentic Rudraksha practice.",
    publishedAt: new Date("2026-05-15"),
    body: [
      "<p>Rudraksha beads are among the most revered spiritual treasures in Vedic tradition. Derived from the seeds of the <em>Elaeocarpus ganitrus</em> tree, each bead possesses natural clefts or lines known as <strong>mukhis</strong> (faces). Understanding how to choose, energize, and care for your bead transforms a physical item into a daily spiritual anchor.</p>",
      
      "<h2>1. Understanding Mukhi Clefts & Sacred Symbolic Meanings</h2>",
      "<p>The number of natural mukhis running from top to bottom dictates the specific energetic frequency associated with each bead. According to ancient scriptures like the <u>Shiva Purana</u> and <u>Srimad Devi Bhagavatam</u>, different mukhis resonate with particular deities and planetary vibrations.</p>",
      
      "<blockquote>\"Just as the sun illuminates all worlds, the sacred Rudraksha purifies the mind, grants inner tranquility, and shields the seeker from negative influences.\" — Sacred Vedic Commentary</blockquote>",
      
      "<h3>Key mukhi classifications in daily practice:</h3>",
      "<ul>",
      "  <li><strong>1 Mukhi (Ek Mukhi):</strong> Represents Lord Shiva; associated with supreme consciousness and ultimate clarity.</li>",
      "  <li><strong>5 Mukhi (Panch Mukhi):</strong> Represents Lord Kalagni Rudra; removes negative energy, fosters health, peace, and emotional balance.</li>",
      "  <li><strong>7 Mukhi (Sapt Mukhi):</strong> Goddess Lakshmi; brings prosperity, financial stability, and good fortune.</li>",
      "  <li><strong>9 Mukhi (Nav Mukhi):</strong> Goddess Durga; instills fearless courage, protective shielding, and willpower.</li>",
      "</ul>",
      
      "<hr />",
      
      "<h2>2. Comprehensive Mukhi Reference & Astrological Attributes</h2>",
      "<p>Below is a quick-reference guide detailing the ruling deity, planetary ruler, associated chakra, and primary mantra for popular mukhis:</p>",
      
      "<table>",
      "  <thead>",
      "    <tr>",
      "      <th>Mukhi</th>",
      "      <th>Ruling Deity</th>",
      "      <th>Ruling Planet</th>",
      "      <th>Associated Chakra</th>",
      "      <th>Bija Mantra</th>",
      "    </tr>",
      "  </thead>",
      "  <tbody>",
      "    <tr>",
      "      <td><strong>1 Mukhi</strong></td>",
      "      <td>Lord Shiva</td>",
      "      <td>Sun (Surya)</td>",
      "      <td>Sahasrara (Crown)</td>",
      "      <td><em>Om Hreem Namah</em></td>",
      "    </tr>",
      "    <tr>",
      "      <td><strong>5 Mukhi</strong></td>",
      "      <td>Kalagni Rudra</td>",
      "      <td>Jupiter (Guru)</td>",
      "      <td>Vishuddha (Throat)</td>",
      "      <td><em>Om Hreem Namah</em></td>",
      "    </tr>",
      "    <tr>",
      "      <td><strong>7 Mukhi</strong></td>",
      "      <td>Goddess Lakshmi</td>",
      "      <td>Venus (Shukra)</td>",
      "      <td>Anahata (Heart)</td>",
      "      <td><em>Om Hoom Namah</em></td>",
      "    </tr>",
      "    <tr>",
      "      <td><strong>9 Mukhi</strong></td>",
      "      <td>Goddess Durga</td>",
      "      <td>Rahu</td>",
      "      <td>Ajna (Third Eye)</td>",
      "      <td><em>Om Hreem Hoom Namah</em></td>",
      "    </tr>",
      "  </tbody>",
      "</table>",
      
      "<h2>3. Step-by-Step Prana Pratishtha (Energization Ritual)</h2>",
      "<p>To awaken the dormant energy of your bead before wearing it for the first time, follow these traditional sequential steps:</p>",
      
      "<ol>",
      "  <li><strong>Purification:</strong> Gently wash the bead with pure Gangajal or clean water mixed with raw milk.</li>",
      "  <li><strong>Anointing:</strong> Apply a small drop of natural sandalwood paste (Chandan) and pure unrefined mustard or sesame oil.</li>",
      "  <li><strong>Chanting & Invocation:</strong> Hold the bead in your right palm and chant the specific Bija Mantra 108 times using a Japa Mala.</li>",
      "  <li><strong>Consecration:</strong> Place the bead at your altar near an incense burner (Dhoop) for 5 minutes before placing it around your neck or wrist.</li>",
      "</ol>",
      
      "<h4>Visual Walkthrough & Demonstration Video</h4>",
      "<p>Watch our step-by-step video guide explaining physical verification checks and daily maintenance practices:</p>",
      
      '<div class="blog-video"><iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" width="640" height="360" allowfullscreen></iframe></div>',
      
      "<h2>4. Authenticity Checks & Physical Examination</h2>",
      "<p>Due to the high demand for rare mukhis, counterfeit beads are sometimes created by carving artificial grooves into common beads. Genuine beads exhibit:</p>",
      
      '<p><img src="/assets/images/about/about-p02.png" alt="Rudraksha Mukhi Verification and Laboratory Inspection" /></p>',
      
      "<ul>",
      "  <li><strike>Uniform smooth grooves</strike> &rarr; <strong>Natural, irregular deep channels</strong> extending continuously from top crown to bottom stalk without knife marks.</li>",
      "  <li>High density that feels substantial in the hand rather than hollow.</li>",
      "  <li>Internal seed compartment integrity confirmed through non-destructive X-ray certification.</li>",
      "</ul>",
      
      "<p>Explore our lab-certified collection of <a href=\"/products/category/rudraksha\">Authentic Rudrakshas</a> or learn more about curated <a href=\"/products/category/siddha-mala\">Siddha Malas</a> for deeper spiritual alignment.</p>",
    ].join("\n"),
  },

  {
    slug: "sample-five-mukhi-rudraksha-daily-practice",
    title: "The Five Mukhi Rudraksha in Daily Practice",
    excerpt:
      "Why the five-faced bead is the most widely worn Rudraksha, and how people fit it into an everyday routine.",
    categorySlug: "rudraksha",
    coverImage: "/assets/images/about/about-sacred-1.png",
    coverImageAlt: "Five Mukhi Rudraksha mala held during morning meditation",
    readTimeMinutes: 5,
    status: "PUBLISHED",
    tags: ["Rudraksha", "Five Mukhi", "Daily Practice", "Beginners"],
    metaTitle: "The Five Mukhi Rudraksha in Daily Practice | Rudraksha Antiquei",
    metaDescription:
      "A practical look at the most widely worn Rudraksha bead and how to fit a simple five-mukhi routine into everyday life.",
    publishedAt: new Date("2026-05-02"),
    body: [
      "<p>The five mukhi (five-faced) Rudraksha is the most common and most widely worn bead. Because it is abundant, it is also the most accessible starting point for anyone new to a Rudraksha practice.</p>",
      "<h2>Why it is so widely worn</h2>",
      "<p>Traditionally associated with calm, focus, and steadiness, the five mukhi is considered gentle enough for continuous daily wear. Many people begin here before exploring rarer mukhi counts.</p>",
      "<h3>A simple daily rhythm</h3>",
      "<p>You do not need an elaborate ritual. A short, consistent routine tends to be more sustainable than an ambitious one you cannot keep up.</p>",
      "<h4>Morning Routine</h4>",
      "<ul><li>Hold the mala for a few quiet breaths before the day begins.</li><li>Set a single clear intention rather than a overwhelming task list.</li></ul>",
      "<h4>Evening Wind-down</h4>",
      "<ul><li>A few minutes of counting breaths on the beads to calm the nervous system.</li><li>Store the mala in its soft velvet pouch, away from direct sunlight.</li></ul>",
      "<hr />",
      "<h3>Quick comparison</h3>",
      "<table><thead><tr><th>Attribute</th><th>Five Mukhi</th><th>Seven Mukhi</th></tr></thead><tbody><tr><td>Availability</td><td>Very common</td><td>Select harvest</td></tr><tr><td>Typical use</td><td>Everyday wear</td><td>Wealth &amp; Harmony</td></tr><tr><td>Best for</td><td>Beginners &amp; continuous practice</td><td>Business &amp; Leaders</td></tr></tbody></table>",
      "<h3>A short video guide</h3>",
      '<div class="blog-video"><iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" width="640" height="360" allowfullscreen></iframe></div>',
      "<p>As always, we describe traditional associations as context for your own practice rather than guaranteed outcomes.</p>",
    ].join(""),
  },

  {
    slug: "gemstones-and-rudraksha-combining-spiritual-energies",
    title: "Combining Gemstones & Rudraksha: Harmonizing Vedic Energies",
    excerpt:
      "How natural gemstones and sacred Rudraksha beads work together in custom combination malas and bracelets.",
    categorySlug: "gemstones",
    coverImage: "/assets/images/about/about-p01-3021a5.png",
    coverImageAlt: "Gemstone and Rudraksha combination bracelet with silver caps",
    readTimeMinutes: 6,
    status: "PUBLISHED",
    tags: ["Gemstones", "Rudraksha", "Combination Mala", "Astrology"],
    metaTitle: "Combining Gemstones & Rudraksha | Rudraksha Antiquei",
    metaDescription:
      "Learn how Yellow Sapphire, Emerald, and Ruby complement Rudraksha beads for balanced astrological harmony.",
    publishedAt: new Date("2026-04-20"),
    body: [
      "<p>In Vedic astrology (Jyotish), both natural gemstones and Rudraksha beads serve as potent energetic tools. While gemstones amplify specific planetary energies, Rudraksha beads provide grounding, balance, and spiritual protection.</p>",
      "<h2>Harmonizing Planetary Forces</h2>",
      "<p>When wearing a high-frequency gemstone like <strong>Yellow Sapphire (Pukhraj)</strong> or <strong>Emerald (Panna)</strong>, pairing it with a 5 Mukhi or 7 Mukhi Rudraksha helps stabilize the intense planetary currents.</p>",
      "<blockquote>\"Gemstones are like amplifiers; Rudraksha beads are like gentle stabilizers. Together, they create a balanced field of peace and prosperity.\"</blockquote>",
      "<h3>Popular Pairing Combinations:</h3>",
      "<ul>",
      "  <li><strong>Ruby + 1 Mukhi Rudraksha:</strong> Enhances leadership, solar vital energy, and personal charisma.</li>",
      "  <li><strong>Yellow Sapphire + 5 Mukhi:</strong> Fosters higher learning, wisdom, and spiritual growth under Jupiter's grace.</li>",
      "  <li><strong>Blue Sapphire + 14 Mukhi:</strong> Protects against Saturn (Shani) transits while enhancing focus and intuition.</li>",
      "</ul>",
      "<hr />",
      "<p>Explore our certified <a href=\"/products/category/gemstones\">Vedic Gemstones</a> to customize your spiritual jewelry.</p>",
    ].join("\n"),
  },

  // =========================================================================
  // ---- REVIEW BLOGS (Awaiting Admin Editorial Approval) -------------------
  // =========================================================================
  {
    slug: "sample-rudraksha-and-meditation-review",
    title: "Rudraksha and Meditation: Finding a Comfortable Grip",
    excerpt:
      "Small ergonomic adjustments to how you hold and rotate a mala that make longer sessions easier.",
    categorySlug: "rudraksha",
    coverImage: "/assets/images/about/about-sacred-2.png",
    coverImageAlt: "Hand holding Japa mala during silent meditation",
    readTimeMinutes: 4,
    status: "REVIEW",
    tags: ["Meditation", "Japa Mala", "Technique", "Ergonomics"],
    metaTitle: "Rudraksha & Meditation Grip Guide (In Review)",
    metaDescription: "Practical grip and rotation tips for comfortable mala meditation.",
    publishedAt: new Date("2026-06-10"),
    body: [
      "<p>The way a mala sits in your hand matters far more than most practitioners realize. A grip that feels effortless for 2 minutes can induce finger cramping or tension over a 30-minute session.</p>",
      "<h2>Ergonomic Hand Placement</h2>",
      "<p>Traditional protocol suggests holding the mala over the middle finger of the right hand and using the thumb to gently roll each bead inward toward your heart.</p>",
      "<blockquote>Ensure the index finger (symbolizing the ego) never touches the beads during Japa meditation practice.</blockquote>",
      "<h3>3 Tips for Smooth Rotation:</h3>",
      "<ol>",
      "  <li><strong>Keep elbows supported:</strong> Rest your wrist on a soft cushion to avoid shoulder strain.</li>",
      "  <li><strong>Cross the Guru bead properly:</strong> Never cross over the central Guru bead; reverse the mala directional sweep instead.</li>",
      "  <li><strong>Maintain relaxed tension:</strong> Allow the cord to hang loosely without pulling tightly.</li>",
      "</ol>",
      "<hr />",
      "<table><thead><tr><th>Technique</th><th>Benefit</th></tr></thead><tbody><tr><td>Middle Finger Support</td><td>Reduces wrist fatigue</td></tr><tr><td>Thumb Rolling</td><td>Enhances tactile awareness</td></tr></tbody></table>",
      "<p><em>Note: This article has been submitted by staff writer for editorial review.</em></p>",
    ].join("\n"),
  },

  {
    slug: "himalayan-singing-bowls-sound-healing-frequencies",
    title: "Himalayan Singing Bowls: Sound Healing & Frequencies",
    excerpt:
      "Understanding metal alloys, acoustic frequencies, and how hand-hammered singing bowls restore energetic balance.",
    categorySlug: "idols-singing-bowls",
    coverImage: "/assets/images/about/about-p04.png",
    coverImageAlt: "Hand-hammered Himalayan singing bowl with wooden mallet",
    readTimeMinutes: 5,
    status: "REVIEW",
    tags: ["Singing Bowls", "Sound Healing", "Vibrations", "Craftsmanship"],
    metaTitle: "Himalayan Singing Bowls & Frequencies | Rudraksha Antiquei",
    metaDescription: "Explore how multi-metal singing bowls create harmonic tones that soothe the mind.",
    publishedAt: new Date("2026-06-25"),
    body: [
      "<p>Hand-hammered Himalayan singing bowls produce complex harmonic overtones when struck or rubbed with a wooden wand. These acoustic vibrations resonate with the brain's alpha and theta waves, promoting profound relaxation.</p>",
      "<h2>The Craftsmanship Behind 7-Metal Alloys</h2>",
      "<p>Traditional bowls are forged from an alloy containing 7 metals representing celestial bodies: Gold (Sun), Silver (Moon), Copper (Venus), Iron (Mars), Mercury (Mercury), Tin (Jupiter), and Lead (Saturn).</p>",
      "<h3>Using Bowls for Space Purification:</h3>",
      "<ul>",
      "  <li>Strike the bowl gently at the outer rim with a leather-wrapped mallet.</li>",
      "  <li>Circle the wooden wand smoothly around the outer edge to sustain the resonant hum.</li>",
      "  <li>Allow the vibration to fill the room before meditating or starting yoga practice.</li>",
      "</ul>",
      "<p>Submitted for review by spiritual wellness team.</p>",
    ].join("\n"),
  },

  // =========================================================================
  // ---- DRAFT BLOGS (In Progress by Writers) -------------------------------
  // =========================================================================
  {
    slug: "sample-mukhi-counts-explained-draft",
    title: "Mukhi Counts 1 to 14 Explained: A Comprehensive Draft",
    excerpt: "An early draft mapping out the traditional associations and benefits of each mukhi count.",
    categorySlug: "rudraksha",
    coverImage: "/assets/images/about/about-principle-1.png",
    coverImageAlt: "Collection of various Mukhi Rudraksha beads",
    readTimeMinutes: 7,
    status: "DRAFT",
    tags: ["Mukhi", "Reference", "Draft"],
    metaTitle: "Mukhi Counts 1-14 Draft Guide",
    metaDescription: "Work in progress article mapping mukhi counts.",
    publishedAt: new Date("2026-07-01"),
    body: [
      "<h2>Mukhi Breakdown (Draft in Progress)</h2>",
      "<p>This is an active draft article being written by our content team. The goal is to create an authoritative catalog for mukhis 1 through 14.</p>",
      "<h3>Draft Outline:</h3>",
      "<ul>",
      "  <li><strong>1-4 Mukhi:</strong> Grounding, intellect, and memory enhancement.</li>",
      "  <li><strong>5-8 Mukhi:</strong> Health, peace, prosperity, and obstacle removal.</li>",
      "  <li><strong>9-14 Mukhi:</strong> Shielding, divine grace, higher intuition, and liberation.</li>",
      "</ul>",
      "<p><em>TODO: Add high-resolution macro photography and expert quotes before sending to REVIEW.</em></p>",
    ].join("\n"),
  },

  {
    slug: "seasonal-care-guide-for-sacred-malas-draft",
    title: "Seasonal Care Guide for Sacred Malas & Wooden Beads",
    excerpt: "Draft notes on maintaining oiling, cleaning, and cord strength during monsoon and summer months.",
    categorySlug: "siddha-mala",
    coverImage: "/assets/images/about/about-sacred-2.png",
    coverImageAlt: "Oiling and maintaining Rudraksha mala beads",
    readTimeMinutes: 4,
    status: "DRAFT",
    tags: ["Care", "Maintenance", "Seasonal Guide"],
    publishedAt: new Date("2026-07-12"),
    body: [
      "<h2>Monsoon Humidity vs Summer Dryness</h2>",
      "<p>Rudraksha beads are organic wood seeds. High atmospheric humidity during monsoon months can cause excess moisture absorption, whereas dry summer air can lead to surface cracking if un-oiled.</p>",
      "<h3>Seasonal Recommendations:</h3>",
      "<ul>",
      "  <li><strong>Monsoon:</strong> Keep mala stored with silica gel packets in a breathable cotton pouch.</li>",
      "  <li><strong>Summer:</strong> Lightly coat beads with natural unperfumed almond or sesame oil once every 3 months.</li>",
      "</ul>",
      "<p><em>Draft status: awaiting reviewer inputs.</em></p>",
    ].join("\n"),
  },
];

async function main() {
  // Fetch author (prefer WRITER role, fall back to ADMIN)
  const author =
    (await prisma.user.findFirst({ where: { role: "WRITER" }, select: { id: true, email: true } })) ??
    (await prisma.user.findFirst({ where: { role: "ADMIN" }, select: { id: true, email: true } }));

  // Map category slugs to real DB IDs
  const categories = await prisma.category.findMany({ select: { id: true, slug: true } });
  const categoryIdBySlug = new Map(categories.map((c) => [c.slug, c.id]));

  console.log(`Attributing blog seeds to author: ${author ? author.email : "None"}`);
  console.log(`Loaded ${categories.length} category IDs for mapping.`);

  for (const b of blogs) {
    const categoryId = b.categorySlug ? categoryIdBySlug.get(b.categorySlug) ?? null : null;

    const data = {
      title: b.title,
      excerpt: b.excerpt,
      body: b.body,
      coverImage: b.coverImage,
      coverImageAlt: b.coverImageAlt ?? null,
      readTimeMinutes: b.readTimeMinutes,
      status: b.status,
      tags: b.tags,
      metaTitle: b.metaTitle ?? null,
      metaDescription: b.metaDescription ?? null,
      publishedAt: b.publishedAt,
      authorId: author?.id ?? null,
      categoryId,
    };

    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: data,
      create: { slug: b.slug, ...data },
    });
    console.log(`  ✓ ${b.status.padEnd(9)} [${b.categorySlug ?? "no-cat"}] ${b.slug}`);
  }

  const counts = await prisma.blog.groupBy({ by: ["status"], _count: true });
  console.log("\nBlog counts by status:");
  for (const c of counts) {
    console.log(`  ${c.status}: ${c._count}`);
  }
}

main()
  .catch((err) => {
    console.error("Error seeding blogs:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

