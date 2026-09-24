/**
 * migrate_catalog_images_to_cloudinary.ts
 *
 * This script:
 * 1. Reads the cloudinary_assets_cache.json to get all uploaded asset URLs
 * 2. Updates all real_*_catalog.json files to replace local image paths with Cloudinary URLs
 * 3. Reports which images could NOT be found in Cloudinary (stay local / pool)
 * 4. Updates the ProductImage records in the DB directly for all catalog products
 */

import "dotenv/config";
import { readFileSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";
import { PrismaClient, ProductImageRole } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const ROOT = process.cwd();

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugify(segment: string): string {
  return segment
    .toLowerCase()
    .trim()
    .replace(/[()]/g, " ")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

/** Convert local image path like /images/products/rudraksha/1-mukhi-rudraksha/role_0.webp
 *  to Cloudinary public_id like rudraksh/products/rudraksha/1-mukhi-rudraksha/role_0 */
function localPathToPublicId(localPath: string): string {
  // Remove leading slash
  let rel = localPath.startsWith("/") ? localPath.slice(1) : localPath;

  // Remove extension
  const parsed = parse(rel);
  rel = join(parsed.dir, parsed.name).replace(/\\/g, "/");

  // If it starts with "images/", strip that and prepend "rudraksh/"
  if (rel.startsWith("images/")) {
    rel = rel.slice("images/".length);
  } else if (rel.startsWith("public/images/")) {
    rel = rel.slice("public/images/".length);
  } else if (rel.startsWith("public/")) {
    rel = rel.slice("public/".length);
  }

  // Slugify each segment
  const parts = rel.split("/").map(slugify).filter(Boolean);
  return ["rudraksh", ...parts].join("/");
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=================================================================");
  console.log("       Migrating Catalog Images: Local → Cloudinary URLs");
  console.log("=================================================================\n");

  // Load Cloudinary cache
  const cachePath = join(ROOT, "scripts", "cloudinary_assets_cache.json");
  const cloudinaryCache: Record<string, { public_id: string; secure_url: string; format: string; bytes: number }> =
    JSON.parse(readFileSync(cachePath, "utf-8"));

  console.log(`Cloudinary cache loaded: ${Object.keys(cloudinaryCache).length} assets\n`);

  let totalMapped = 0;
  let totalNotFound = 0;
  const notFoundPaths: string[] = [];

  // Helper to convert a local path to a Cloudinary URL (or return null if not found)
  function toCloudinaryUrl(localPath: string): string | null {
    if (!localPath || localPath.startsWith("http")) return localPath; // already URL or empty
    const pubId = localPathToPublicId(localPath);
    const asset = cloudinaryCache[pubId];
    if (asset) {
      totalMapped++;
      return asset.secure_url;
    }
    // Try without slugification
    notFoundPaths.push(`${localPath} → ${pubId}`);
    totalNotFound++;
    return null;
  }

  // ─── Step 1: Update catalog JSON files ────────────────────────────────────
  const CATALOG_FILES = [
    { file: "real_rudraksha_catalog.json", imageFormat: "object" },
    { file: "real_bracelets_catalog.json", imageFormat: "object" },
    { file: "real_gemstone_catalog.json", imageFormat: "object" },
    { file: "real_idols_catalog.json", imageFormat: "object" },
    { file: "real_antiques_catalog.json", imageFormat: "object" },
    { file: "real_malas_catalog.json", imageFormat: "string_array" },
  ];

  for (const { file, imageFormat } of CATALOG_FILES) {
    const filePath = join(ROOT, "scripts", file);
    const catalog = JSON.parse(readFileSync(filePath, "utf-8"));
    let fileUpdates = 0;
    let fileNotFound = 0;

    for (const item of catalog) {
      if (!item.images || item.images.length === 0) continue;

      if (imageFormat === "object") {
        // Format: item.images = [{ url, alt, role, sortOrder }]
        for (const img of item.images) {
          if (img.url && !img.url.startsWith("http")) {
            const cUrl = toCloudinaryUrl(img.url);
            if (cUrl) {
              img.url = cUrl;
              fileUpdates++;
            } else {
              fileNotFound++;
            }
          }
        }
      } else if (imageFormat === "string_array") {
        // Format: item.images = ["/images/..."]
        const updatedImages: string[] = [];
        for (const imgPath of item.images) {
          if (typeof imgPath === "string" && !imgPath.startsWith("http")) {
            const cUrl = toCloudinaryUrl(imgPath);
            updatedImages.push(cUrl ?? imgPath);
            if (cUrl) {
              fileUpdates++;
            } else {
              fileNotFound++;
            }
          } else {
            updatedImages.push(imgPath);
          }
        }
        item.images = updatedImages;
      }
    }

    writeFileSync(filePath, JSON.stringify(catalog, null, 2), "utf-8");
    console.log(`✅ ${file}: ${fileUpdates} image URLs updated, ${fileNotFound} not found in Cloudinary`);
  }

  console.log(`\nTotal mapped to Cloudinary: ${totalMapped}`);
  console.log(`Total NOT found in Cloudinary: ${totalNotFound}`);

  if (totalNotFound > 0) {
    console.log("\n⚠️  Images NOT found in Cloudinary (kept as local):");
    notFoundPaths.slice(0, 30).forEach((p) => console.log(`   ${p}`));
  }

  // ─── Step 2: Update DB ProductImage records ────────────────────────────────
  console.log("\n=================================================================");
  console.log("            Updating Database ProductImage Records");
  console.log("=================================================================\n");

  // Also check shankh and sphatik catalogs (in different format scripts)
  const EXTRA_CATALOG_FILES = [
    "shankh_catalog_ready.json",
    "new_idols_catalog_ready.json",
  ];

  let dbUpdated = 0;
  let dbSkipped = 0;
  let dbNotMapped = 0;

  // Get all ProductImages that are pool images
  const allProductImages = await prisma.productImage.findMany({
    select: {
      id: true,
      url: true,
      productId: true,
      product: { select: { slug: true } },
    },
  });

  const poolImages = allProductImages.filter((p) => p.url?.includes("/pool/"));
  console.log(`Total pool images in DB: ${poolImages.length}`);

  // Group by productId
  const productImagesByProductId = new Map<string, typeof allProductImages>();
  for (const img of poolImages) {
    if (!productImagesByProductId.has(img.productId)) {
      productImagesByProductId.set(img.productId, []);
    }
    productImagesByProductId.get(img.productId)!.push(img);
  }

  console.log(`Products with pool images: ${productImagesByProductId.size}`);

  // For each product with pool images, check if we have real Cloudinary images
  const slugsWithPoolImages = new Set<string>(poolImages.map((p) => p.product.slug));
  console.log("Products with pool images:", Array.from(slugsWithPoolImages).slice(0, 10).join(", "), "...");

  // Load all catalog data to build slug -> images mapping
  interface CatalogImageRef {
    url: string;
    alt?: string;
    role?: string;
    sortOrder?: number;
  }

  const slugToImages = new Map<string, CatalogImageRef[]>();

  // Load updated catalog JSONs
  for (const { file, imageFormat } of CATALOG_FILES) {
    const filePath = join(ROOT, "scripts", file);
    const catalog = JSON.parse(readFileSync(filePath, "utf-8"));
    for (const item of catalog) {
      if (!item.slug || !item.images || item.images.length === 0) continue;
      if (imageFormat === "object") {
        slugToImages.set(item.slug, item.images);
      } else if (imageFormat === "string_array") {
        // Convert to object format
        const imgRefs: CatalogImageRef[] = item.images.map((url: string, i: number) => ({
          url,
          alt: `${item.name || item.slug} - view ${i + 1}`,
          role: i === 0 ? "MAIN" : "GALLERY",
          sortOrder: i,
        }));
        slugToImages.set(item.slug, imgRefs);
      }
    }
  }

  console.log(`\nLoaded image mappings for ${slugToImages.size} products from catalog files.\n`);

  // Now update DB for each product that has pool images AND has catalog images
  for (const [productId, poolImgs] of productImagesByProductId) {
    const slug = poolImgs[0].product.slug;
    const catalogImages = slugToImages.get(slug);

    if (!catalogImages || catalogImages.length === 0) {
      dbSkipped++;
      continue;
    }

    // Check if any catalog image is a real Cloudinary URL (not pool)
    const realCloudinaryImages = catalogImages.filter(
      (img) => img.url && img.url.startsWith("https://res.cloudinary.com") && !img.url.includes("/pool/")
    );

    if (realCloudinaryImages.length === 0) {
      console.log(`⏭️  [${slug}] No Cloudinary images found in catalog - skipping`);
      dbNotMapped++;
      continue;
    }

    // Delete pool images and insert real ones
    await prisma.productImage.deleteMany({ where: { productId } });
    await prisma.productImage.createMany({
      data: realCloudinaryImages.map((img) => ({
        productId,
        url: img.url,
        alt: img.alt || slug,
        role: (img.role as ProductImageRole) || ProductImageRole.MAIN,
        sortOrder: img.sortOrder ?? 0,
      })),
    });

    console.log(`✅ [${slug}] Replaced ${poolImgs.length} pool images with ${realCloudinaryImages.length} real Cloudinary images`);
    dbUpdated++;
  }

  console.log(`\n=================================================================`);
  console.log(`Products updated with real Cloudinary images:  ${dbUpdated}`);
  console.log(`Products skipped (no catalog mapping):         ${dbSkipped}`);
  console.log(`Products with catalog but no Cloudinary found: ${dbNotMapped}`);
  console.log(`=================================================================\n`);
}

main()
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
