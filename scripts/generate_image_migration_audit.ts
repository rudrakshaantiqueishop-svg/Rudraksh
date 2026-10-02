import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { resolve, join, parse, relative, extname } from "node:path";
import { existsSync, statSync, readFileSync, writeFileSync } from "node:fs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const CLOUDINARY_MAX_FILE_BYTES = 10485760;

function slugify(segment: string): string {
  return segment
    .toLowerCase()
    .trim()
    .replace(/[()]/g, " ")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function computePublicId(relPath: string): string {
  const normalized = relPath.replace(/\\/g, "/");
  const parsed = parse(normalized);

  let relativeFolder = "";
  if (normalized.startsWith("public/images/")) {
    const sub = normalized.slice("public/images/".length);
    relativeFolder = parse(sub).dir;
  } else if (normalized.startsWith("public/")) {
    const sub = normalized.slice("public/".length);
    relativeFolder = parse(sub).dir;
  } else {
    relativeFolder = parsed.dir;
  }

  const folderParts = relativeFolder
    ? relativeFolder.split("/").filter(Boolean).map(slugify).filter(Boolean)
    : [];
  const fileNameSlug = slugify(parsed.name);

  return ["rudraksh", ...folderParts, fileNameSlug].filter(Boolean).join("/");
}

interface ImageAuditEntry {
  sourceLocation: string; // e.g. "Category [gemstones].bannerImage"
  currentReference: string; // e.g. "/images/products/gemstones/gemstones-hero.webp"
  correspondingLocalFile: string; // e.g. "public/images/products/gemstones/gemstones-hero.webp"
  localFileExists: boolean;
  localFileSizeMB: string;
  isOversized: boolean;
  cloudinaryPublicId: string;
  cloudinaryUrl: string | null;
  uploadedSuccessfully: "YES" | "NO";
  action: "REPLACE LOCAL REFERENCE" | "KEEP LOCAL";
}

async function runAudit() {
  const rootDir = resolve(process.cwd());
  const cachePath = join(rootDir, "scripts", "cloudinary_assets_cache.json");
  const cloudinaryCache: Record<string, { public_id: string; secure_url: string }> = JSON.parse(
    readFileSync(cachePath, "utf8")
  );

  const entries: ImageAuditEntry[] = [];

  function processReference(sourceLocation: string, ref: string | null | undefined) {
    if (!ref) return;
    if (ref.includes("cloudinary.com")) return; // already Cloudinary
    if (!ref.startsWith("/")) return;

    // Resolve local file relative to project root
    // Typically in public/
    let localRel = ref.startsWith("/") ? ref.slice(1) : ref;
    let localPathOnDisk = "";
    if (existsSync(join(rootDir, "public", localRel))) {
      localPathOnDisk = `public/${localRel}`.replace(/\\/g, "/");
    } else if (existsSync(join(rootDir, localRel))) {
      localPathOnDisk = localRel.replace(/\\/g, "/");
    } else {
      // Check if .png exists instead of .webp or vice-versa
      const parsed = parse(localRel);
      for (const ext of [".webp", ".png", ".jpg", ".jpeg"]) {
        const altRel = join(parsed.dir, parsed.name + ext).replace(/\\/g, "/");
        if (existsSync(join(rootDir, "public", altRel))) {
          localPathOnDisk = `public/${altRel}`;
          break;
        } else if (existsSync(join(rootDir, altRel))) {
          localPathOnDisk = altRel;
          break;
        }
      }
    }

    const absLocal = localPathOnDisk ? join(rootDir, localPathOnDisk) : join(rootDir, "public", localRel);
    const exists = existsSync(absLocal);
    let sizeBytes = 0;
    if (exists) {
      try {
        sizeBytes = statSync(absLocal).size;
      } catch {}
    }

    const relForPublicId = localPathOnDisk || `public/${localRel}`;
    const pubId = computePublicId(relForPublicId);
    const isOver = sizeBytes > CLOUDINARY_MAX_FILE_BYTES;

    // Check Cloudinary asset
    const cAsset = cloudinaryCache[pubId];
    const uploadedSuccess = cAsset ? "YES" : "NO";
    const cUrl = cAsset ? cAsset.secure_url : null;

    let action: "REPLACE LOCAL REFERENCE" | "KEEP LOCAL" = "KEEP LOCAL";
    if (uploadedSuccess === "YES" && !isOver) {
      action = "REPLACE LOCAL REFERENCE";
    }

    entries.push({
      sourceLocation,
      currentReference: ref,
      correspondingLocalFile: localPathOnDisk || `public/${localRel} (MISSING)`,
      localFileExists: exists,
      localFileSizeMB: (sizeBytes / (1024 * 1024)).toFixed(2) + " MB",
      isOversized: isOver,
      cloudinaryPublicId: pubId,
      cloudinaryUrl: cUrl,
      uploadedSuccessfully: uploadedSuccess,
      action,
    });
  }

  // 1. Audit Categories
  const categories = await prisma.category.findMany();
  for (const c of categories) {
    processReference(`Category [${c.slug}].image`, c.image);
    const pc = c.pageContent as any;
    if (pc) {
      processReference(`Category [${c.slug}].pageContent.introImage`, pc.introImage);
      processReference(`Category [${c.slug}].pageContent.fitCheckImage`, pc.fitCheckImage);
      // We don't touch checklistImages if they are static site /assets/, but let's check:
      if (Array.isArray(pc.checklistImages)) {
        pc.checklistImages.forEach((img: string, idx: number) => {
          // If it's a product image, process it
          if (img && img.startsWith("/images/products")) {
            processReference(`Category [${c.slug}].pageContent.checklistImages[${idx}]`, img);
          }
        });
      }
    }
  }

  // 2. Audit Product Variants
  const variants = await prisma.productVariant.findMany({
    include: { product: { select: { slug: true, category: { select: { slug: true } } } } },
    orderBy: [{ product: { slug: "asc" } }, { sortOrder: "asc" }],
  });
  for (const v of variants) {
    processReference(`ProductVariant [${v.product.slug}] "${v.label}"`, v.image);
  }

  // 3. Audit Codebase references
  processReference(`src/components/products/CategoryDisabledView.tsx:39`, `/images/products/sphatik-collection/sphatik-hero.png`);
  processReference(`src/components/ShopByCategory.tsx:14`, `/images/consultation/consultancy-card.webp`);

  console.log(`Total audited entries: ${entries.length}`);
  const replaceCount = entries.filter((e) => e.action === "REPLACE LOCAL REFERENCE").length;
  const keepCount = entries.filter((e) => e.action === "KEEP LOCAL").length;
  console.log(`  - To Replace with Cloudinary: ${replaceCount}`);
  console.log(`  - To Keep Local: ${keepCount}`);

  // Write full audit JSON for inspection
  const outJson = join(rootDir, "scripts", "audit_results.json");
  writeFileSync(outJson, JSON.stringify(entries, null, 2), "utf8");
  console.log(`Wrote audit results to ${outJson}`);
}

runAudit().catch(console.error).finally(() => prisma.$disconnect());
