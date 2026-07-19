import "dotenv/config";
import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { CATALOG, rotationImage, type SubcategorySeed } from "./catalog-data";
import { blogs } from "./blog-seed-data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SHIPPING_INFO =
  "Orders are processed within 1-2 business days and shipped via tracked courier. Domestic orders typically arrive within 2-4 working days, while international orders take 7-12 working days depending on destination and customs clearance. A tracking link is emailed as soon as your order ships, and free shipping applies to all domestic orders over $200.";

const PACKAGING_INFO =
  "Every piece is wrapped in a soft protective pouch and placed in a branded box with a printed authenticity card. Malas and bracelets are cushioned to prevent bead movement during transit, and fragile items such as murtis and singing bowls are additionally wrapped in bubble layers inside a rigid outer carton.";

const RETURNS_INFO =
  "If you're not satisfied, you can request a return within 30 days of delivery for a full refund, provided the item is unused and returned in its original packaging with the authenticity card. Energised items and made-to-order combinations are non-returnable once the energization process has been completed. Cancellations made before an order ships are processed immediately; once shipped, the standard return process applies.";

const SIZES = ["<18mm", "<20mm", "<24mm", "<28mm"];

// Minimum products generated per subcategory ("type").
const PRODUCTS_PER_SUBCATEGORY = 10;

// "Shop By Purpose" collections (unchanged from the original catalog).
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

// Blog categorySlugs from the old catalog remapped onto the new 11 categories.
const BLOG_CATEGORY_REMAP: Record<string, string> = {
  murtis: "idols-singing-bowls",
  combinations: "bracelets",
  "singing-bowls": "idols-singing-bowls",
  necklaces: "gemstones",
  antiques: "antique-collection",
};

// ── Deterministic attribute helpers (no randomness → repeatable seeds) ──
const ORIGINS = ["Nepal", "Indonesia", "India"];
const CHAKRAS = ["Root", "Sacral", "Solar Plexus", "Heart", "Throat", "Third Eye", "Crown"];
const COLLECTION_SLUGS = collections.map((c) => c.slug);
const GRADES = [
  "Premium",
  "Nepal Origin",
  "Collector Grade",
  "Lab Certified",
  "Energized",
  "Classic",
  "Deluxe",
  "Standard",
  "Handpicked",
  "Signature",
];

type GeneratedProduct = {
  slug: string;
  name: string;
  breadcrumbLabel: string;
  categorySlug: string;
  subcategorySlug: string;
  description: string;
  priceCents: number;
  compareAtPriceCents: number | null;
  stockCount: number;
  ratingAvg: number;
  ratingCount: number;
  isBestseller: boolean;
  images: { url: string; alt: string; role: string; sortOrder: number }[];
  collectionSlugs: string[];
  attrs: {
    mukhi: number | null;
    origin: string | null;
    gemstoneType: string | null;
    certified: boolean;
    energized: boolean;
    weightGrams: number | null;
    sizeMm: number | null;
    zodiac: string | null;
    planet: string | null;
    chakra: string | null;
  };
};

const ROLES = ["MAIN", "GALLERY_LEFT", "GALLERY_TOP_RIGHT", "GALLERY_BOTTOM_RIGHT"] as const;

// Base price (in rupees) per category — products vary around it.
const CATEGORY_BASE_PRICE: Record<string, number> = {
  rudraksha: 1600,
  "antique-collection": 3200,
  "siddha-mala": 4500,
  "rudraksha-kavach": 3800,
  "japa-mala": 1200,
  bracelets: 900,
  "idols-singing-bowls": 2500,
  gemstones: 5500,
  "sphatik-collection": 1400,
  "shree-yantra-shivling": 2100,
  "shankh-collection": 1800,
};

function buildProductsForSubcategory(
  categorySlug: string,
  sub: SubcategorySeed,
  subIndex: number
): GeneratedProduct[] {
  const base = CATEGORY_BASE_PRICE[categorySlug] ?? 2000;
  const out: GeneratedProduct[] = [];

  for (let i = 0; i < PRODUCTS_PER_SUBCATEGORY; i++) {
    const grade = GRADES[i % GRADES.length];
    // First product keeps the canonical subcategory slug so recommendation
    // slugs like "5-mukhi-rudraksha" resolve to a real product.
    const slug = i === 0 ? sub.slug : `${sub.slug}-${i + 1}`;
    const name = i === 0 ? sub.name : `${sub.name} — ${grade}`;
    const priceRupees = base + i * Math.round(base * 0.12);
    const priceCents = priceRupees * 100;
    const origin = ORIGINS[(subIndex + i) % ORIGINS.length];
    const certified = i % 2 === 0;
    const energized = i % 3 !== 0;

    const images = ROLES.map((role, r) => ({
      url: rotationImage(subIndex + i + r),
      alt: `${name} — ${role.toLowerCase().replace(/_/g, " ")}`,
      role,
      sortOrder: r,
    }));

    // Two purpose tags, rotated so every collection stays populated.
    const collectionSlugs = [
      COLLECTION_SLUGS[(subIndex + i) % COLLECTION_SLUGS.length],
      COLLECTION_SLUGS[(subIndex + i + 3) % COLLECTION_SLUGS.length],
    ].filter((v, idx, arr) => arr.indexOf(v) === idx);

    out.push({
      slug,
      name,
      breadcrumbLabel: sub.name,
      categorySlug,
      subcategorySlug: sub.slug,
      description: `${sub.name} — ${grade.toLowerCase()} selection. Each piece is sourced from trusted suppliers, physically examined for authenticity and finish, and cared for in the traditional way before it is listed. ${
        certified ? "This item is lab certified. " : ""
      }${energized ? "Energized on request before dispatch. " : ""}What you see is representative of the quality you will receive.`,
      priceCents,
      compareAtPriceCents: Math.round(priceCents * 1.15),
      stockCount: 4 + ((subIndex + i) % 18),
      ratingAvg: Number((4.4 + ((i * 7) % 6) / 10).toFixed(1)),
      ratingCount: 40 + ((subIndex * 13 + i * 7) % 360),
      // Mark the first product of every 4th subcategory as a bestseller so the
      // homepage bestseller row stays populated across categories.
      isBestseller: i === 0 && subIndex % 4 === 0,
      images,
      collectionSlugs,
      attrs: {
        mukhi: sub.attrs?.mukhi ?? null,
        origin,
        gemstoneType: sub.attrs?.gemstoneType ?? null,
        certified,
        energized,
        weightGrams: Number((3 + ((subIndex + i) % 20) * 1.5).toFixed(1)),
        sizeMm: Number((14 + ((subIndex + i) % 14)).toFixed(1)),
        zodiac: sub.attrs?.zodiac ?? null,
        planet: sub.attrs?.planet ?? null,
        chakra: sub.attrs?.chakra ?? CHAKRAS[(subIndex + i) % CHAKRAS.length],
      },
    });
  }

  return out;
}

async function main() {
  // Clean slate — cascades to images/variants/addOns/sizes/reviews, the
  // implicit product<->collection join, and subcategories (FK cascade).
  await prisma.blog.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.category.deleteMany();

  // Categories + subcategories
  const categoryIdBySlug = new Map<string, string>();
  const subcategoryIdBySlug = new Map<string, string>(); // key: `${catSlug}::${subSlug}`

  for (const c of CATALOG) {
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

    for (let s = 0; s < c.subcategories.length; s++) {
      const sub = c.subcategories[s];
      const createdSub = await prisma.subcategory.create({
        data: {
          name: sub.name,
          slug: sub.slug,
          group: sub.group ?? null,
          image: sub.image,
          sortOrder: s,
          categoryId: created.id,
        },
      });
      subcategoryIdBySlug.set(`${c.slug}::${sub.slug}`, createdSub.id);
    }
  }

  // Collections
  const collectionIdBySlug = new Map<string, string>();
  for (const col of collections) {
    const created = await prisma.collection.create({ data: col });
    collectionIdBySlug.set(col.slug, created.id);
  }

  // Products — generated per subcategory. Inserted in BULK (createMany) rather
  // than nested creates, so ~1000 products seed in seconds over a remote DB.
  const generatedAll: GeneratedProduct[] = [];
  const usedSlugs = new Set<string>();
  let subIndex = 0;
  for (const c of CATALOG) {
    for (const sub of c.subcategories) {
      for (const p of buildProductsForSubcategory(c.slug, sub, subIndex)) {
        if (usedSlugs.has(p.slug)) continue; // defensive: skip any slug collision
        usedSlugs.add(p.slug);
        generatedAll.push(p);
      }
      subIndex++;
    }
  }

  // 1) Bulk insert the product rows (no relations).
  await prisma.product.createMany({
    data: generatedAll.map((p) => ({
      slug: p.slug,
      name: p.name,
      breadcrumbLabel: p.breadcrumbLabel,
      categoryId: categoryIdBySlug.get(p.categorySlug)!,
      subcategoryId: subcategoryIdBySlug.get(`${p.categorySlug}::${p.subcategorySlug}`)!,
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
      mukhi: p.attrs.mukhi,
      origin: p.attrs.origin,
      gemstoneType: p.attrs.gemstoneType,
      certified: p.attrs.certified,
      energized: p.attrs.energized,
      weightGrams: p.attrs.weightGrams,
      sizeMm: p.attrs.sizeMm,
      zodiac: p.attrs.zodiac,
      planet: p.attrs.planet,
      chakra: p.attrs.chakra,
    })),
    skipDuplicates: true,
  });

  // 2) Map slug -> id for the freshly inserted products.
  const inserted = await prisma.product.findMany({ select: { id: true, slug: true } });
  const idBySlug = new Map(inserted.map((p) => [p.slug, p.id]));

  // 3) Bulk insert images + sizes.
  await prisma.productImage.createMany({
    data: generatedAll.flatMap((p) =>
      p.images.map((img) => ({
        productId: idBySlug.get(p.slug)!,
        url: img.url,
        alt: img.alt,
        role: img.role as Prisma.ProductImageCreateManyInput["role"],
        sortOrder: img.sortOrder,
      }))
    ),
  });
  await prisma.productSize.createMany({
    data: generatedAll.flatMap((p) =>
      SIZES.map((label, idx) => ({ productId: idBySlug.get(p.slug)!, label, sortOrder: idx }))
    ),
  });

  // 4) Purpose collections: connect all products for each collection in one
  // update (8 round trips total instead of one per product).
  for (const col of collections) {
    const productIds = generatedAll
      .filter((p) => p.collectionSlugs.includes(col.slug))
      .map((p) => ({ id: idBySlug.get(p.slug)! }));
    if (productIds.length === 0) continue;
    await prisma.collection.update({
      where: { id: collectionIdBySlug.get(col.slug)! },
      data: { products: { connect: productIds } },
    });
  }

  const productCount = generatedAll.length;

  // Blogs (categorySlug remapped to the new taxonomy)
  for (const b of blogs) {
    const remapped = b.categorySlug ? BLOG_CATEGORY_REMAP[b.categorySlug] ?? b.categorySlug : null;
    const categoryId = remapped ? categoryIdBySlug.get(remapped) ?? null : null;
    await prisma.blog.create({
      data: {
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        body: b.body,
        coverImage: b.coverImage,
        readTimeMinutes: b.readTimeMinutes,
        publishedAt: b.publishedAt,
        categoryId,
      },
    });
  }

  const subTotal = CATALOG.reduce((n, c) => n + c.subcategories.length, 0);
  console.log(
    `Seeded ${CATALOG.length} categories, ${subTotal} subcategories, ${collections.length} collections, ${productCount} products, ${blogs.length} blogs.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
