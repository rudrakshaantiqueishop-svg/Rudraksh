import "dotenv/config";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Downloads a real image per category, uploads it to Cloudinary
 * (folder: rudraksh/categories, format: webp, quality: auto), then
 * writes the resulting secure_url into each Category.image column.
 *
 * Run with: npx tsx scripts/upload-category-images.ts
 *
 * Images are keyed by category slug. Edit a URL below to swap an image —
 * any download that fails (404, non-image, network error) is skipped and
 * reported at the end rather than aborting the whole run.
 */
const IMAGE_URLS: Record<string, string> = {
  rudraksha:
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80&fm=jpg&fit=crop",
  bracelets:
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80&fm=jpg&fit=crop",
  murtis:
    "https://images.unsplash.com/photo-1567591414240-e9c1d9a3f2f9?w=1200&q=80&fm=jpg&fit=crop",
  "siddha-mala":
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80&fm=jpg&fit=crop",
  gemstones:
    "https://images.unsplash.com/photo-1551122089-4e3e72477432?w=1200&q=80&fm=jpg&fit=crop",
  antiques:
    "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=1200&q=80&fm=jpg&fit=crop",
  combinations:
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=80&fm=jpg&fit=crop",
  "singing-bowls":
    "https://images.unsplash.com/photo-1591291621164-2c6367723315?w=1200&q=80&fm=jpg&fit=crop",
  necklaces:
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80&fm=jpg&fit=crop",
  rings:
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80&fm=jpg&fit=crop",
  earrings:
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=80&fm=jpg&fit=crop",
  charms:
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=80&fm=jpg&fit=crop",
};

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

async function downloadImage(slug: string, url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (rudraksh-image-seeder)" },
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.startsWith("image/")) {
    throw new Error(`expected an image, got "${contentType ?? "unknown"}"`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const filePath = join(TEMP_DIR, `${slug}.${extFromContentType(contentType)}`);
  await writeFile(filePath, buffer);
  return filePath;
}

async function main() {
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Missing CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env");
  }

  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { sortOrder: "asc" },
  });

  if (categories.length === 0) {
    console.log("No categories found in the database. Nothing to do.");
    return;
  }

  await mkdir(TEMP_DIR, { recursive: true });

  const succeeded: string[] = [];
  const skipped: { slug: string; reason: string }[] = [];

  for (const category of categories) {
    const url = IMAGE_URLS[category.slug];
    if (!url) {
      skipped.push({ slug: category.slug, reason: "no image URL configured" });
      console.warn(`⏭  ${category.name} (${category.slug}) — no image URL configured, skipping`);
      continue;
    }

    try {
      console.log(`⬇  ${category.name} — downloading…`);
      const filePath = await downloadImage(category.slug, url);

      console.log(`☁  ${category.name} — uploading to Cloudinary…`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "rudraksh/categories",
        public_id: category.slug,
        overwrite: true,
        resource_type: "image",
        format: "webp",
        transformation: [{ quality: "auto" }],
      });

      await prisma.category.update({
        where: { id: category.id },
        data: { image: result.secure_url },
      });

      succeeded.push(category.slug);
      console.log(`✅ ${category.name} — ${result.secure_url}`);
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      skipped.push({ slug: category.slug, reason });
      console.error(`❌ ${category.name} (${category.slug}) — ${reason}`);
    }
  }

  console.log("\n── Summary ──────────────────────────────");
  console.log(`Updated: ${succeeded.length}/${categories.length}`);
  if (skipped.length > 0) {
    console.log(`Skipped: ${skipped.length}`);
    for (const { slug, reason } of skipped) {
      console.log(`  • ${slug} — ${reason}`);
    }
  }
}

main()
  .catch((error) => {
    console.error("\nFatal error:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    // Clean up temp images regardless of outcome.
    await rm(TEMP_DIR, { recursive: true, force: true }).catch(() => {});
    await prisma.$disconnect();
  });
