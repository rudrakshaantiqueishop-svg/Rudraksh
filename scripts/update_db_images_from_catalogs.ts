/**
 * update_db_images_from_catalogs.ts
 *
 * Updates the DB ProductImage records for all products that currently
 * have pool images, replacing them with real Cloudinary images from the
 * updated catalog JSON files.
 *
 * Valid ProductImageRole values: MAIN, GALLERY_LEFT, GALLERY_TOP_RIGHT, GALLERY_BOTTOM_RIGHT, EXTRA
 */

import "dotenv/config";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient, ProductImageRole } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const ROOT = process.cwd();

// Valid role values for ProductImageRole enum
const VALID_ROLES: ProductImageRole[] = [
  "MAIN",
  "GALLERY_LEFT",
  "GALLERY_TOP_RIGHT",
  "GALLERY_BOTTOM_RIGHT",
  "EXTRA",
];

/** Normalize any role string to a valid ProductImageRole enum value */
function normalizeRole(role: string | undefined | null, index: number): ProductImageRole {
  if (!role) return index === 0 ? "MAIN" : "EXTRA";
  if (VALID_ROLES.includes(role as ProductImageRole)) return role as ProductImageRole;

  // Map non-standard roles to valid ones
  const upper = role.toUpperCase();
  if (upper === "MAIN") return "MAIN";
  if (upper.includes("LEFT") || upper === "GALLERY_1") return "GALLERY_LEFT";
  if (upper.includes("TOP_RIGHT") || upper === "GALLERY_2") return "GALLERY_TOP_RIGHT";
  if (upper.includes("BOTTOM_RIGHT") || upper === "GALLERY_3") return "GALLERY_BOTTOM_RIGHT";
  if (upper.startsWith("GALLERY") || upper.startsWith("EXTRA")) return "EXTRA";

  // Default by position
  const POSITIONAL: ProductImageRole[] = [
    "MAIN",
    "GALLERY_LEFT",
    "GALLERY_TOP_RIGHT",
    "GALLERY_BOTTOM_RIGHT",
    "EXTRA",
  ];
  return POSITIONAL[Math.min(index, POSITIONAL.length - 1)];
}

interface CatalogImageRef {
  url: string;
  alt?: string;
  role?: string;
  sortOrder?: number;
}

async function main() {
  console.log("=================================================================");
  console.log("        Updating DB Product Images from Catalog Files");
  console.log("=================================================================\n");

  const CATALOG_FILES = [
    { file: "real_rudraksha_catalog.json", imageFormat: "object" },
    { file: "real_bracelets_catalog.json", imageFormat: "object" },
    { file: "real_gemstone_catalog.json", imageFormat: "object" },
    { file: "real_idols_catalog.json", imageFormat: "object" },
    { file: "real_antiques_catalog.json", imageFormat: "object" },
    { file: "real_malas_catalog.json", imageFormat: "string_array" },
  ];

  // Build slug → images mapping from all catalog files
  const slugToImages = new Map<string, CatalogImageRef[]>();

  for (const { file, imageFormat } of CATALOG_FILES) {
    const filePath = join(ROOT, "scripts", file);
    const catalog = JSON.parse(readFileSync(filePath, "utf-8"));

    for (const item of catalog) {
      if (!item.slug || !item.images || item.images.length === 0) continue;

      if (imageFormat === "object") {
        slugToImages.set(item.slug, item.images as CatalogImageRef[]);
      } else if (imageFormat === "string_array") {
        const imgRefs: CatalogImageRef[] = (item.images as string[]).map((url, i) => ({
          url,
          alt: `${item.name || item.slug} - view ${i + 1}`,
          role: i === 0 ? "MAIN" : i === 1 ? "GALLERY_LEFT" : i === 2 ? "GALLERY_TOP_RIGHT" : i === 3 ? "GALLERY_BOTTOM_RIGHT" : "EXTRA",
          sortOrder: i,
        }));
        slugToImages.set(item.slug, imgRefs);
      }
    }
  }

  console.log(`Loaded catalog mappings for ${slugToImages.size} products.\n`);

  // Get all ProductImages grouped by product
  const allProductImages = await prisma.productImage.findMany({
    select: {
      id: true,
      url: true,
      productId: true,
      product: { select: { slug: true } },
    },
  });

  // Find products where ALL images are pool images
  const productIdToImages = new Map<string, typeof allProductImages>();
  for (const img of allProductImages) {
    if (!productIdToImages.has(img.productId)) {
      productIdToImages.set(img.productId, []);
    }
    productIdToImages.get(img.productId)!.push(img);
  }

  let dbUpdated = 0;
  let dbSkipped = 0;
  let dbNotInCatalog = 0;
  let dbAlreadyReal = 0;

  for (const [productId, productImages] of productIdToImages) {
    const slug = productImages[0].product.slug;
    const hasPoolImages = productImages.some((p) => p.url?.includes("/pool/"));
    const hasRealImages = productImages.some(
      (p) => p.url?.startsWith("https://res.cloudinary.com") && !p.url?.includes("/pool/")
    );

    if (hasRealImages) {
      // Already has real images - skip
      dbAlreadyReal++;
      continue;
    }

    if (!hasPoolImages) {
      dbSkipped++;
      continue;
    }

    // Look up catalog images
    const catalogImages = slugToImages.get(slug);
    if (!catalogImages || catalogImages.length === 0) {
      console.log(`⚠️  [${slug}] Not found in any catalog - skipping`);
      dbNotInCatalog++;
      continue;
    }

    // Filter to only real Cloudinary images
    const realImages = catalogImages.filter(
      (img) => img.url && img.url.startsWith("https://res.cloudinary.com") && !img.url.includes("/pool/")
    );

    if (realImages.length === 0) {
      console.log(`⚠️  [${slug}] Catalog has no Cloudinary images (only local/pool)`);
      dbSkipped++;
      continue;
    }

    // Delete pool images, insert real ones
    await prisma.productImage.deleteMany({ where: { productId } });

    const imageData = realImages.map((img, i) => ({
      productId,
      url: img.url,
      alt: img.alt || slug,
      role: normalizeRole(img.role, img.sortOrder ?? i),
      sortOrder: img.sortOrder ?? i,
    }));

    await prisma.productImage.createMany({ data: imageData });
    console.log(`✅ [${slug}] ${productImages.length} pool → ${realImages.length} real Cloudinary images`);
    dbUpdated++;
  }

  console.log("\n=================================================================");
  console.log(`✅ Products updated with real images:          ${dbUpdated}`);
  console.log(`⏭️  Products already had real images:          ${dbAlreadyReal}`);
  console.log(`⚠️  Products not in any catalog:               ${dbNotInCatalog}`);
  console.log(`⏸️  Products skipped (no pool imgs or no URLs): ${dbSkipped}`);
  console.log("=================================================================\n");

  // Now also update ProductVariant images for products where the variant image is a pool image
  console.log("--- Updating ProductVariant images ---\n");
  const allVariants = await prisma.productVariant.findMany({
    select: {
      id: true,
      image: true,
      label: true,
      sortOrder: true,
      product: { select: { slug: true } },
    },
  });

  let variantUpdated = 0;
  const variantsByProduct = new Map<string, typeof allVariants>();
  for (const v of allVariants) {
    const slug = v.product.slug;
    if (!variantsByProduct.has(slug)) variantsByProduct.set(slug, []);
    variantsByProduct.get(slug)!.push(v);
  }

  for (const [slug, variants] of variantsByProduct) {
    const catalogImages = slugToImages.get(slug);
    if (!catalogImages || catalogImages.length === 0) continue;

    const mainCatalogImage = catalogImages.find((img) => img.role === "MAIN" || img.sortOrder === 0);
    if (!mainCatalogImage || !mainCatalogImage.url.startsWith("https://res.cloudinary.com")) continue;

    for (const v of variants) {
      if (v.image && v.image.includes("/pool/")) {
        await prisma.productVariant.update({
          where: { id: v.id },
          data: { image: mainCatalogImage.url },
        });
        variantUpdated++;
      }
    }
  }

  console.log(`✅ ProductVariants updated with real images: ${variantUpdated}`);
  console.log("\nDone! 🎉\n");
}

main()
  .catch((err) => {
    console.error("Failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
