import "dotenv/config";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Guarantees every product has all 4 gallery images
 * (MAIN, GALLERY_LEFT, GALLERY_TOP_RIGHT, GALLERY_BOTTOM_RIGHT).
 *
 * Strategy: upload one set of 4 images PER CATEGORY to Cloudinary
 * (folder rudraksh/products/<category>, format webp, quality auto),
 * then assign that set to every product in the category — but only to
 * slots that are missing or still point at a local "/assets/..." placeholder.
 * Slots that already hold a real http(s)/Cloudinary URL are left untouched.
 *
 * Run with: npx tsx scripts/upload-product-images.ts
 */
const ROLES = ["MAIN", "GALLERY_LEFT", "GALLERY_TOP_RIGHT", "GALLERY_BOTTOM_RIGHT"] as const;
type Role = (typeof ROLES)[number];

// Fallback set used for any category without an explicit entry below,
// or for any individual slot whose category-specific URL fails to download.
const DEFAULT_SET: Record<Role, string> = {
  MAIN: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80&fm=jpg&fit=crop",
  GALLERY_LEFT: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=80&fm=jpg&fit=crop",
  GALLERY_TOP_RIGHT: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80&fm=jpg&fit=crop",
  GALLERY_BOTTOM_RIGHT: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80&fm=jpg&fit=crop",
};

// Per-category 4-image sets. Any role omitted falls back to DEFAULT_SET.
const CATEGORY_IMAGE_SETS: Record<string, Partial<Record<Role, string>>> = {
  rudraksha: {
    MAIN: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80&fm=jpg&fit=crop",
    GALLERY_LEFT: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=80&fm=jpg&fit=crop",
    GALLERY_TOP_RIGHT: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80&fm=jpg&fit=crop",
    GALLERY_BOTTOM_RIGHT: "https://images.unsplash.com/photo-1591291621164-2c6367723315?w=1200&q=80&fm=jpg&fit=crop",
  },
  bracelets: {
    MAIN: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80&fm=jpg&fit=crop",
    GALLERY_LEFT: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=80&fm=jpg&fit=crop",
    GALLERY_TOP_RIGHT: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=80&fm=jpg&fit=crop",
    GALLERY_BOTTOM_RIGHT: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80&fm=jpg&fit=crop",
  },
  murtis: {
    MAIN: "https://images.unsplash.com/photo-1567591414240-e9c1d9a3f2f9?w=1200&q=80&fm=jpg&fit=crop",
    GALLERY_LEFT: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=1200&q=80&fm=jpg&fit=crop",
  },
  "siddha-mala": {
    MAIN: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80&fm=jpg&fit=crop",
    GALLERY_LEFT: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=80&fm=jpg&fit=crop",
  },
  gemstones: {
    MAIN: "https://images.unsplash.com/photo-1551122089-4e3e72477432?w=1200&q=80&fm=jpg&fit=crop",
    GALLERY_LEFT: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80&fm=jpg&fit=crop",
  },
  antiques: {
    MAIN: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=1200&q=80&fm=jpg&fit=crop",
  },
  combinations: {
    MAIN: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=80&fm=jpg&fit=crop",
  },
  "singing-bowls": {
    MAIN: "https://images.unsplash.com/photo-1591291621164-2c6367723315?w=1200&q=80&fm=jpg&fit=crop",
  },
  necklaces: {
    MAIN: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80&fm=jpg&fit=crop",
  },
  rings: {
    MAIN: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80&fm=jpg&fit=crop",
  },
  earrings: {
    MAIN: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=80&fm=jpg&fit=crop",
  },
  charms: {
    MAIN: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=80&fm=jpg&fit=crop",
  },
};

const ROLE_LABEL: Record<Role, string> = {
  MAIN: "main view",
  GALLERY_LEFT: "side view",
  GALLERY_TOP_RIGHT: "detail view",
  GALLERY_BOTTOM_RIGHT: "in use",
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

function isRealUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
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

/** Resolve & upload the 4-image set for a category. Returns role -> secure_url (only successful ones). */
async function buildCategorySet(categorySlug: string): Promise<Partial<Record<Role, string>>> {
  const overrides = CATEGORY_IMAGE_SETS[categorySlug] ?? {};
  const set: Partial<Record<Role, string>> = {};

  for (const role of ROLES) {
    const primary = overrides[role] ?? DEFAULT_SET[role];
    const fallback = DEFAULT_SET[role];
    const publicId = `${categorySlug}/${role.toLowerCase()}`;

    try {
      set[role] = await downloadAndUpload(`${categorySlug}-${role}`, primary, publicId);
    } catch (primaryErr) {
      const reason = primaryErr instanceof Error ? primaryErr.message : String(primaryErr);
      if (primary !== fallback) {
        try {
          set[role] = await downloadAndUpload(`${categorySlug}-${role}`, fallback, publicId);
          console.warn(`   ↪ ${role}: primary failed (${reason}), used fallback`);
          continue;
        } catch {
          /* fall through to warning below */
        }
      }
      console.warn(`   ⚠ ${role}: could not source an image (${reason})`);
    }
  }

  return set;
}

async function main() {
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Missing CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env");
  }

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      products: {
        select: { id: true, name: true, images: { select: { id: true, role: true, url: true } } },
      },
    },
    orderBy: { sortOrder: "asc" },
  });

  await mkdir(TEMP_DIR, { recursive: true });

  let productsUpdated = 0;
  let slotsWritten = 0;
  const incompleteProducts: string[] = [];

  for (const category of categories) {
    if (category.products.length === 0) continue;

    console.log(`\n📦 ${category.name} (${category.products.length} product${category.products.length === 1 ? "" : "s"})`);
    const set = await buildCategorySet(category.slug);

    for (const product of category.products) {
      let touched = false;

      for (const role of ROLES) {
        const existing = product.images.find((img) => img.role === role);
        // Keep slots that already hold a real uploaded image.
        if (existing && isRealUrl(existing.url)) continue;

        const url = set[role];
        if (!url) continue; // couldn't source this role's image

        const alt = `${product.name} — ${ROLE_LABEL[role]}`;
        const sortOrder = ROLES.indexOf(role);

        if (existing) {
          await prisma.productImage.update({
            where: { id: existing.id },
            data: { url, alt, sortOrder },
          });
        } else {
          await prisma.productImage.create({
            data: { productId: product.id, url, alt, role, sortOrder },
          });
        }
        slotsWritten++;
        touched = true;
      }

      if (touched) productsUpdated++;

      // Verify all 4 roles now resolvable (existing-real OR newly-set).
      const hasAll = ROLES.every((role) => {
        const existing = product.images.find((img) => img.role === role);
        return (existing && isRealUrl(existing.url)) || !!set[role];
      });
      if (!hasAll) incompleteProducts.push(product.name);
    }
  }

  console.log("\n── Summary ──────────────────────────────");
  console.log(`Products touched: ${productsUpdated}`);
  console.log(`Image slots written: ${slotsWritten}`);
  if (incompleteProducts.length > 0) {
    console.log(`\n⚠ Products still missing one or more gallery images (image source failed):`);
    for (const name of incompleteProducts) console.log(`  • ${name}`);
    console.log(`Fix the failing URL(s) in the script and re-run — it's idempotent.`);
  } else {
    console.log(`✅ Every product now has all 4 gallery images.`);
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
