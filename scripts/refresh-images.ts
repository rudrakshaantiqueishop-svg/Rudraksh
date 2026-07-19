import "dotenv/config";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Cloudinary refresh for the re-categorised catalog.
 *
 * 1. PURGE: deletes every asset under rudraksh/products and rudraksh/categories
 *    (old demo images). rudraksh/blogs is left untouched.
 * 2. POOL: uploads a shared pool of ~12 stock images to rudraksh/pool.
 * 3. ASSIGN: reuses those pool images across ALL products (4 gallery slots
 *    each), categories, and subcategories — no unique image per item.
 *
 * Real photos can be swapped in later per-product via the admin form.
 *
 * Run: npx tsx scripts/refresh-images.ts
 */

const ROLES = ["MAIN", "GALLERY_LEFT", "GALLERY_TOP_RIGHT", "GALLERY_BOTTOM_RIGHT"] as const;
type Role = (typeof ROLES)[number];

const ROLE_LABEL: Record<Role, string> = {
  MAIN: "main view",
  GALLERY_LEFT: "side view",
  GALLERY_TOP_RIGHT: "detail view",
  GALLERY_BOTTOM_RIGHT: "in use",
};

// Shared pool — 12 known-good stock images (spiritual beads, gemstones,
// idols, bowls). Reused everywhere.
const POOL_SOURCES = [
  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80&fm=jpg&fit=crop",
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=80&fm=jpg&fit=crop",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80&fm=jpg&fit=crop",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80&fm=jpg&fit=crop",
  "https://images.unsplash.com/photo-1591291621164-2c6367723315?w=1200&q=80&fm=jpg&fit=crop",
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=80&fm=jpg&fit=crop",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=80&fm=jpg&fit=crop",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80&fm=jpg&fit=crop",
  "https://images.unsplash.com/photo-1567591414240-e9c1d9a3f2f9?w=1200&q=80&fm=jpg&fit=crop",
  "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=1200&q=80&fm=jpg&fit=crop",
  "https://images.unsplash.com/photo-1551122089-4e3e72477432?w=1200&q=80&fm=jpg&fit=crop",
  "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?w=1200&q=80&fm=jpg&fit=crop",
];

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

async function purgeFolder(prefix: string) {
  try {
    await cloudinary.api.delete_resources_by_prefix(prefix, { resource_type: "image" });
    await cloudinary.api.delete_folder(prefix).catch(() => {});
    console.log(`   🗑  purged ${prefix}`);
  } catch (err) {
    console.warn(`   ⚠ could not fully purge ${prefix}: ${err instanceof Error ? err.message : err}`);
  }
}

async function uploadPool(): Promise<string[]> {
  await mkdir(TEMP_DIR, { recursive: true });
  const urls: string[] = [];

  for (let i = 0; i < POOL_SOURCES.length; i++) {
    const src = POOL_SOURCES[i];
    try {
      const res = await fetch(src, {
        headers: { "User-Agent": "Mozilla/5.0 (rudraksh-image-seeder)" },
        redirect: "follow",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.startsWith("image/")) {
        throw new Error(`not an image (${contentType})`);
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      const filePath = join(TEMP_DIR, `pool-${i}.${extFromContentType(contentType)}`);
      await writeFile(filePath, buffer);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: "rudraksh/pool",
        public_id: `pool-${i}`,
        overwrite: true,
        resource_type: "image",
        format: "webp",
        transformation: [{ quality: "auto" }],
      });
      urls.push(result.secure_url);
      console.log(`   ⬆  pool-${i}`);
    } catch (err) {
      console.warn(`   ⚠ pool-${i} failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  if (urls.length === 0) throw new Error("No pool images uploaded — aborting.");
  return urls;
}

async function main() {
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Missing CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env");
  }

  console.log("\n🧹 Purging old Cloudinary images…");
  await purgeFolder("rudraksh/products");
  await purgeFolder("rudraksh/categories");

  console.log("\n📤 Uploading shared image pool…");
  const pool = await uploadPool();
  const pick = (i: number) => pool[i % pool.length];

  // ── Products: replace all gallery images in BULK (delete + createMany) ──
  const products = await prisma.product.findMany({
    select: { id: true, name: true },
    orderBy: { createdAt: "asc" },
  });

  console.log(`\n🖼  Rebuilding gallery images for ${products.length} products…`);
  await prisma.productImage.deleteMany({});
  const imageRows = products.flatMap((product, p) =>
    ROLES.map((role, r) => ({
      productId: product.id,
      url: pick(p + r), // offset per role so a product's 4 slots differ
      alt: `${product.name} — ${ROLE_LABEL[role]}`,
      role,
      sortOrder: r,
    }))
  );
  await prisma.productImage.createMany({ data: imageRows });
  const slots = imageRows.length;

  // ── Categories & subcategories (one updateMany per pool image bucket) ──
  const categories = await prisma.category.findMany({ select: { id: true }, orderBy: { sortOrder: "asc" } });
  await Promise.all(
    categories.map((c, i) => prisma.category.update({ where: { id: c.id }, data: { image: pick(i) } }))
  );
  const subcategories = await prisma.subcategory.findMany({ select: { id: true }, orderBy: { sortOrder: "asc" } });
  // Batched in parallel chunks to stay within the connection pool.
  const CHUNK = 20;
  for (let i = 0; i < subcategories.length; i += CHUNK) {
    const batch = subcategories.slice(i, i + CHUNK);
    await Promise.all(
      batch.map((s, j) => prisma.subcategory.update({ where: { id: s.id }, data: { image: pick(i + j + 2) } }))
    );
  }

  console.log("\n── Summary ──────────────────────────────");
  console.log(`Pool images:        ${pool.length}`);
  console.log(`Product slots set:  ${slots}`);
  console.log(`Categories:         ${categories.length}`);
  console.log(`Subcategories:      ${subcategories.length}`);
  console.log("✅ Image refresh complete.");
}

main()
  .catch((error) => {
    console.error("\nFatal error:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await rm(TEMP_DIR, { recursive: true, force: true }).catch(() => {});
    await prisma.$disconnect();
  });
