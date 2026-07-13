import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Additive seed for sample blog posts across all three workflow states
 * (DRAFT, REVIEW, PUBLISHED).
 *
 * - Does NOT wipe existing blogs.
 * - Idempotent: re-running upserts by slug.
 * - Attaches an author (a WRITER if one exists, otherwise an ADMIN) so the
 *   admin blog list shows a real byline.
 * - One PUBLISHED post uses rich HTML (h4, table, horizontal rule, YouTube
 *   embed, list) to exercise the new renderer.
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
  readTimeMinutes: number;
  status: "DRAFT" | "REVIEW" | "PUBLISHED";
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  publishedAt: Date;
};

const PLAIN = (paras: string[]) => paras.join("\n\n");

const blogs: BlogSeed[] = [
  // ---- PUBLISHED --------------------------------------------------------
  {
    slug: "sample-five-mukhi-rudraksha-daily-practice",
    title: "The Five Mukhi Rudraksha in Daily Practice",
    excerpt:
      "Why the five-faced bead is the most widely worn Rudraksha, and how people fit it into an everyday routine.",
    body: [
      "<p>The five mukhi (five-faced) Rudraksha is the most common and most widely worn bead. Because it is abundant, it is also the most accessible starting point for anyone new to a Rudraksha practice.</p>",
      "<h2>Why it is so widely worn</h2>",
      "<p>Traditionally associated with calm, focus, and steadiness, the five mukhi is considered gentle enough for continuous daily wear. Many people begin here before exploring rarer mukhi counts.</p>",
      "<h3>A simple daily rhythm</h3>",
      "<p>You do not need an elaborate ritual. A short, consistent routine tends to be more sustainable than an ambitious one you cannot keep up.</p>",
      "<h4>Morning</h4>",
      "<ul><li>Hold the mala for a few quiet breaths before the day begins.</li><li>Set a single intention rather than a long list.</li></ul>",
      "<h4>Evening</h4>",
      "<ul><li>A few minutes of counting breaths on the beads to wind down.</li><li>Store the mala in its pouch, away from direct sunlight.</li></ul>",
      "<hr>",
      "<h3>Quick comparison</h3>",
      "<table><thead><tr><th>Attribute</th><th>Five Mukhi</th></tr></thead><tbody><tr><td>Availability</td><td>Very common</td></tr><tr><td>Typical use</td><td>Everyday wear</td></tr><tr><td>Best for</td><td>Beginners &amp; continuous practice</td></tr></tbody></table>",
      "<h3>A short introduction</h3>",
      '<div data-youtube-video><iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" width="640" height="360" allowfullscreen></iframe></div>',
      "<p>As always, we describe traditional associations as context for your own practice rather than guaranteed outcomes.</p>",
    ].join(""),
    coverImage: "/assets/images/about/about-p02.png",
    readTimeMinutes: 5,
    status: "PUBLISHED",
    tags: ["Rudraksha", "Five Mukhi", "Daily Practice", "Beginners"],
    metaTitle: "The Five Mukhi Rudraksha in Daily Practice | Rudraksha Antiquei",
    metaDescription:
      "A practical look at the most widely worn Rudraksha bead and how to fit a simple five-mukhi routine into everyday life.",
    publishedAt: new Date("2026-05-02"),
  },
  {
    slug: "sample-what-makes-a-rudraksha-authentic",
    title: "What Makes a Rudraksha Authentic",
    excerpt:
      "A plain-language summary of the checks that separate a genuine bead from a carved or altered one.",
    body: PLAIN([
      "Authenticity comes down to natural growth patterns. Genuine mukhi lines run from top to bottom without tool marks, and the surface texture is irregular in a way that is difficult to fake convincingly.",
      "Weight and density offer supporting evidence, but they vary by mukhi type and size, so they are best read alongside other checks rather than on their own.",
      "Where possible, non-destructive testing such as X-ray confirms the internal structure matches the mukhi count on the surface — a step we complete before any bead is listed.",
    ]),
    coverImage: "/assets/images/about/about-principle-1.png",
    readTimeMinutes: 4,
    status: "PUBLISHED",
    tags: ["Authenticity", "Buying Guide"],
    metaTitle: "What Makes a Rudraksha Authentic",
    metaDescription:
      "The practical checks — mukhi lines, texture, density, and X-ray testing — that confirm a Rudraksha is genuine.",
    publishedAt: new Date("2026-04-18"),
  },
  // ---- REVIEW -----------------------------------------------------------
  {
    slug: "sample-rudraksha-and-meditation-review",
    title: "Rudraksha and Meditation: Finding a Comfortable Grip",
    excerpt:
      "Small adjustments to how you hold and rotate a mala that make longer sessions easier.",
    body: PLAIN([
      "The way a mala sits in the hand matters more than most people expect. A grip that feels fine for two minutes can become distracting over twenty.",
      "Rotating beads with the thumb, keeping the index finger clear of the count, and letting the mala hang rather than gripping it tightly all reduce fatigue during longer sessions.",
      "This post is awaiting review before publication.",
    ]),
    coverImage: "/assets/images/about/about-sacred-2.png",
    readTimeMinutes: 3,
    status: "REVIEW",
    tags: ["Meditation", "Mala", "Technique"],
    metaTitle: "Rudraksha and Meditation: Finding a Comfortable Grip",
    metaDescription:
      "Practical grip and rotation tips that make longer mala-based meditation sessions more comfortable.",
    publishedAt: new Date("2026-06-10"),
  },
  {
    slug: "sample-choosing-cord-and-clasp-review",
    title: "Choosing the Right Cord and Clasp for Everyday Wear",
    excerpt: "Elastic, knotted, or fixed — how the stringing choice affects daily durability.",
    body: PLAIN([
      "For a bead you wear every day, construction matters as much as the bead itself. Elastic cords are easy to slip on but wear faster; knotted cords last longer but are less forgiving to resize.",
      "Consider how and where you will wear it. A bracelet that spends time near water or under a sleeve has different demands than one worn occasionally.",
      "Draft submitted for editorial review.",
    ]),
    coverImage: "/assets/images/about/about-p02.png",
    readTimeMinutes: 3,
    status: "REVIEW",
    tags: ["Bracelet", "Buying Guide", "Durability"],
    publishedAt: new Date("2026-06-22"),
  },
  // ---- DRAFT ------------------------------------------------------------
  {
    slug: "sample-mukhi-counts-explained-draft",
    title: "Mukhi Counts Explained: A Work in Progress",
    excerpt: "An early draft mapping out the traditional associations of each mukhi count.",
    body: PLAIN([
      "This is an early draft. The plan is to walk through mukhi counts from one to fourteen, with a short, honest note on the traditional association for each.",
      "TODO: add a comparison table and a few reference images before submitting for review.",
    ]),
    coverImage: "/assets/images/about/about-principle-1.png",
    readTimeMinutes: 6,
    status: "DRAFT",
    tags: ["Mukhi", "Reference"],
    publishedAt: new Date("2026-07-01"),
  },
  {
    slug: "sample-caring-for-your-mala-draft",
    title: "Caring for Your Mala Through the Seasons",
    excerpt: "Notes toward a seasonal care guide — humidity, sunlight, and storage.",
    body: PLAIN([
      "Rough outline for a seasonal care post. Humidity in monsoon months and dry heat in summer both affect the cord and the bead's natural oils differently.",
      "Still gathering practical, non-alarmist advice. Not ready for review yet.",
    ]),
    coverImage: "/assets/images/about/about-sacred-2.png",
    readTimeMinutes: 4,
    status: "DRAFT",
    tags: ["Care", "Maintenance"],
    publishedAt: new Date("2026-07-08"),
  },
];

async function main() {
  // Prefer a writer as the author; fall back to an admin; otherwise leave null.
  const author =
    (await prisma.user.findFirst({ where: { role: "WRITER" }, select: { id: true, email: true } })) ??
    (await prisma.user.findFirst({ where: { role: "ADMIN" }, select: { id: true, email: true } }));

  if (author) {
    console.log(`Attributing sample posts to: ${author.email}`);
  } else {
    console.log("No WRITER or ADMIN user found — seeding posts without an author.");
  }

  for (const b of blogs) {
    const data = {
      title: b.title,
      excerpt: b.excerpt,
      body: b.body,
      coverImage: b.coverImage,
      readTimeMinutes: b.readTimeMinutes,
      status: b.status,
      tags: b.tags,
      metaTitle: b.metaTitle ?? null,
      metaDescription: b.metaDescription ?? null,
      publishedAt: b.publishedAt,
      authorId: author?.id ?? null,
    };

    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: data,
      create: { slug: b.slug, ...data },
    });
    console.log(`  ✓ ${b.status.padEnd(9)} ${b.slug}`);
  }

  const counts = await prisma.blog.groupBy({ by: ["status"], _count: true });
  console.log("\nBlog counts by status:");
  for (const c of counts) console.log(`  ${c.status}: ${c._count}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
