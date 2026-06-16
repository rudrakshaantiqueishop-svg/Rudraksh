import "dotenv/config";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Gives every blog post a real cover image on Cloudinary
 * (folder rudraksh/blogs, format webp, quality auto), then writes the
 * secure_url into Blog.coverImage.
 *
 * Keyed by blog slug. Posts whose coverImage is already a real http(s)
 * URL are left untouched; local "/assets/..." placeholders are replaced.
 * Any slug without a configured URL (or whose download fails) falls back
 * to DEFAULT_IMAGE, and is reported in the summary.
 *
 * Run with: npx tsx scripts/upload-blog-images.ts
 */
// Blog covers use a DIFFERENT image set from products/categories — themed
// around meditation, ritual, craft, and lifestyle rather than the product
// shots. If a primary URL ever 404s, a per-slug fallback (guaranteed unique
// and always available) is used instead.
const IMAGE_URLS: Record<string, string> = {
  "how-to-identify-genuine-rudraksha":
    "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=1200&q=80&fm=jpg&fit=crop",
  "caring-for-sacred-beads-storage-and-cleansing":
    "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80&fm=jpg&fit=crop",
  "understanding-rudraksha-mukhi-meaning":
    "https://images.unsplash.com/photo-1531171673193-8e21f6f9c0f2?w=1200&q=80&fm=jpg&fit=crop",
  "choosing-a-rudraksha-bracelet-for-daily-wear":
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80&fm=jpg&fit=crop",
  "caring-for-brass-and-marble-murtis":
    "https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?w=1200&q=80&fm=jpg&fit=crop",
  "significance-of-the-108-bead-siddha-mala":
    "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=1200&q=80&fm=jpg&fit=crop",
  "gemstone-selection-and-vedic-astrology-principles":
    "https://images.unsplash.com/photo-1518537239733-1c4d3d3a8398?w=1200&q=80&fm=jpg&fit=crop",
  "reading-the-story-behind-antique-ritual-items":
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80&fm=jpg&fit=crop",
  "why-combination-malas-pair-specific-mukhis":
    "https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=1200&q=80&fm=jpg&fit=crop",
  "traditional-craft-behind-himalayan-singing-bowls":
    "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=1200&q=80&fm=jpg&fit=crop",
  "wearing-rudraksha-as-a-necklace-styling-and-care":
    "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1200&q=80&fm=jpg&fit=crop",
};

// Always-available, unique-per-post fallback (deterministic by slug).
function fallbackFor(slug: string): string {
  return `https://picsum.photos/seed/rudraksh-blog-${slug}/1200/800`;
}

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

async function downloadAndUpload(slug: string, url: string): Promise<string> {
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
  const filePath = join(TEMP_DIR, `blog-${slug}.${extFromContentType(contentType)}`);
  await writeFile(filePath, buffer);

  const result = await cloudinary.uploader.upload(filePath, {
    folder: "rudraksh/blog",
    public_id: slug,
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

  const blogs = await prisma.blog.findMany({
    select: { id: true, slug: true, title: true, coverImage: true },
    orderBy: { publishedAt: "desc" },
  });

  if (blogs.length === 0) {
    console.log("No blog posts found. Nothing to do.");
    return;
  }

  await mkdir(TEMP_DIR, { recursive: true });

  const succeeded: string[] = [];
  const usedFallback: string[] = [];
  const skipped: string[] = [];

  for (const blog of blogs) {
    const primary = IMAGE_URLS[blog.slug] ?? fallbackFor(blog.slug);
    const fallback = fallbackFor(blog.slug);
    try {
      console.log(`⬇  ${blog.title} — downloading & uploading…`);
      let url: string;
      try {
        url = await downloadAndUpload(blog.slug, primary);
      } catch (primaryErr) {
        url = await downloadAndUpload(blog.slug, fallback);
        usedFallback.push(blog.slug);
        const reason = primaryErr instanceof Error ? primaryErr.message : String(primaryErr);
        console.warn(`   ↪ primary failed (${reason}), used fallback`);
      }

      await prisma.blog.update({ where: { id: blog.id }, data: { coverImage: url } });
      succeeded.push(blog.slug);
      console.log(`✅ ${blog.title} — ${url}`);
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      skipped.push(blog.slug);
      console.error(`❌ ${blog.title} (${blog.slug}) — ${reason}`);
    }
  }

  // Remove leftovers from the old (plural) folder, if any.
  try {
    await cloudinary.api.delete_resources_by_prefix("rudraksh/blogs/");
    await cloudinary.api.delete_folder("rudraksh/blogs").catch(() => {});
    console.log("\n🧹 Cleaned up old rudraksh/blogs folder.");
  } catch {
    /* nothing to clean up */
  }

  console.log("\n── Summary ──────────────────────────────");
  console.log(`Updated: ${succeeded.length}/${blogs.length}`);
  if (usedFallback.length > 0) {
    console.log(`Used fallback image: ${usedFallback.length} (${usedFallback.join(", ")})`);
  }
  if (skipped.length > 0) {
    console.log(`Left unchanged / failed: ${skipped.length} (${skipped.join(", ")})`);
  }
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
