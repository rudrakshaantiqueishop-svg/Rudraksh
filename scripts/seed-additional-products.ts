import "dotenv/config";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { newProducts, NEW_PRODUCT_IMAGE_SETS } from "../prisma/new-products";

/**
 * Additive seed for the products defined in prisma/new-products.ts.
 *
 * Flow (matches the established image pipeline):
 *   1. Download each product's Unsplash images into scripts/temp-images.
 *   2. Upload them to Cloudinary (folder rudraksh/products, webp, quality auto).
 *   3. Upsert the product into the DB using the resulting Cloudinary URLs.
 *   4. Delete the local temp images.
 *
 * It does NOT wipe the catalog — existing products are left untouched.
 * Idempotent: re-running overwrites the same Cloudinary public_ids and
 * refreshes each product's rows.
 *
 * Run with: npx tsx scripts/seed-additional-products.ts
 */

const ROLES = ["MAIN", "GALLERY_LEFT", "GALLERY_TOP_RIGHT", "GALLERY_BOTTOM_RIGHT"] as const;
const ROLE_LABEL: Record<string, string> = {
  MAIN: "main view",
  GALLERY_LEFT: "side view",
  GALLERY_TOP_RIGHT: "detail view",
  GALLERY_BOTTOM_RIGHT: "in use",
};

const SIZES = ["<18mm", "<20mm", "<24mm", "<28mm"];

const SHIPPING_INFO =
  "Orders are processed within 1-2 business days and shipped via tracked courier. Domestic orders typically arrive within 2-4 working days, while international orders take 7-12 working days depending on destination and customs clearance. A tracking link is emailed as soon as your order ships, and free shipping applies to all domestic orders over $200.";
const PACKAGING_INFO =
  "Every piece is wrapped in a soft protective pouch and placed in a branded box with a printed authenticity card. Malas and bracelets are cushioned to prevent bead movement during transit, and fragile items such as murtis and singing bowls are additionally wrapped in bubble layers inside a rigid outer carton.";
const RETURNS_INFO =
  "If you're not satisfied, you can request a return within 30 days of delivery for a full refund, provided the item is unused and returned in its original packaging with the authenticity card. Energised items and made-to-order combinations are non-returnable once the energization process has been completed. Cancellations made before an order ships are processed immediately; once shipped, the standard return process applies.";

const TEMP_DIR = join(process.cwd(), "scripts", "temp-images");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function extFromContentType(contentType: string | null): string {
  if (!contentType) return "jpg";
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  return "jpg";
}

async function downloadAndUpload(name: string, url: string, publicId: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (rudraksh-image-seeder)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.startsWith("image/")) {
    throw new Error(`expected an image, got "${contentType ?? "unknown"}"`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const filePath = join(TEMP_DIR, `${name}.${extFromContentType(contentType)}`);
  await writeFile(filePath, buffer);

  const result = await cloudinary.uploader.upload(filePath, {
    folder: "rudraksh/products",
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
    format: "webp",
    transformation: [{ quality: "auto" }],
  });
  return result.secure_url;
}

async function main() {
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Missing CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env");
  }

  // Resolve category + collection ids up front.
  const categories = await prisma.category.findMany({ select: { id: true, slug: true } });
  const categoryIdBySlug = new Map(categories.map((c) => [c.slug, c.id]));
  const collections = await prisma.collection.findMany({ select: { id: true, slug: true } });
  const collectionIdBySlug = new Map(collections.map((c) => [c.slug, c.id]));

  await mkdir(TEMP_DIR, { recursive: true });

  let created = 0;
  let updated = 0;
  let skipped = 0;
  const failures: string[] = [];

  for (const p of newProducts) {
    const categoryId = categoryIdBySlug.get(p.categorySlug);
    if (!categoryId) {
      failures.push(`${p.slug} — unknown category "${p.categorySlug}"`);
      console.warn(`⚠ ${p.slug}: category "${p.categorySlug}" not found, skipping`);
      continue;
    }

    // Skip products that already exist with a complete set of Cloudinary
    // images — keeps re-runs fast and avoids re-hitting transient upload errors.
    const imageSet = NEW_PRODUCT_IMAGE_SETS[p.slug] ?? {};
    const expectedImageCount = Object.keys(imageSet).length || p.images.length;
    const existingForSkip = await prisma.product.findUnique({
      where: { slug: p.slug },
      select: { images: { select: { url: true } } },
    });
    if (
      existingForSkip &&
      existingForSkip.images.length >= expectedImageCount &&
      existingForSkip.images.every((img) => img.url.startsWith("http"))
    ) {
      skipped++;
      console.log(`\n📦 ${p.name}\n   ⏭ already complete, skipping`);
      continue;
    }

    console.log(`\n📦 ${p.name}`);

    // 1 + 2: download each role's image and upload to Cloudinary.
    const uploaded: { url: string; alt: string; role: string; sortOrder: number }[] = [];
    for (let i = 0; i < ROLES.length; i++) {
      const role = ROLES[i];
      const sourceUrl = imageSet[role];
      if (!sourceUrl) continue;
      try {
        const secureUrl = await downloadAndUpload(`${p.slug}-${role}`, sourceUrl, `${p.slug}/${role.toLowerCase()}`);
        uploaded.push({ url: secureUrl, alt: `${p.name} — ${ROLE_LABEL[role]}`, role, sortOrder: i });
        console.log(`   ☁ ${role} → uploaded`);
      } catch (err) {
        const reason = err instanceof Error ? err.message : String(err);
        console.warn(`   ⚠ ${role}: ${reason}`);
      }
    }

    // Fallback: if nothing uploaded, keep the local placeholder MAIN.
    const images = (uploaded.length > 0 ? uploaded : p.images) as Prisma.ProductImageCreateWithoutProductInput[];

    // 3: upsert the product. Relations are reset explicitly for idempotency.
    const existing = await prisma.product.findUnique({ where: { slug: p.slug }, select: { id: true } });

    const scalarData = {
      name: p.name,
      breadcrumbLabel: p.breadcrumbLabel,
      categoryId,
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
    };

    const collectionConnect = p.collectionSlugs
      .map((slug) => collectionIdBySlug.get(slug))
      .filter((id): id is string => Boolean(id))
      .map((id) => ({ id }));

    if (existing) {
      await prisma.productImage.deleteMany({ where: { productId: existing.id } });
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          ...scalarData,
          images: { create: images },
          collections: { set: collectionConnect },
        },
      });
      // Ensure sizes exist without duplicating them.
      const sizeCount = await prisma.productSize.count({ where: { productId: existing.id } });
      if (sizeCount === 0) {
        await prisma.productSize.createMany({
          data: SIZES.map((label, i) => ({ productId: existing.id, label, sortOrder: i })),
        });
      }
      updated++;
      console.log(`   ✅ updated`);
    } else {
      await prisma.product.create({
        data: {
          slug: p.slug,
          ...scalarData,
          images: { create: images },
          sizes: { create: SIZES.map((label, i) => ({ label, sortOrder: i })) },
          collections: { connect: collectionConnect },
        },
      });
      created++;
      console.log(`   ✅ created`);
    }
  }

  console.log("\n── Summary ──────────────────────────────");
  console.log(`Created: ${created} | Updated: ${updated} | Skipped: ${skipped} | Total defined: ${newProducts.length}`);
  if (failures.length > 0) {
    console.log(`Failures: ${failures.length}`);
    for (const f of failures) console.log(`  • ${f}`);
  }
}

main()
  .catch((error) => {
    console.error("\nFatal error:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    // 4: delete local temp images regardless of outcome.
    await rm(TEMP_DIR, { recursive: true, force: true }).catch(() => {});
    await prisma.$disconnect();
  });
