import "dotenv/config";
import { readdirSync, statSync } from "node:fs";
import { extname, join, parse, relative, resolve, sep } from "node:path";
import { v2 as cloudinary } from "cloudinary";

/**
 * Uploads all local image assets found in this Rudraksh codebase to Cloudinary.
 *
 * Safety & Invariant Guarantees:
 * 1. overwrite = false (never overwrites or replaces existing Cloudinary assets)
 * 2. If an asset with the public_id already exists in Cloudinary, it is skipped safely.
 * 3. Does NOT modify the database or website code.
 * 4. Does NOT delete or move any local files.
 * 5. Does NOT delete anything from Cloudinary.
 * 6. Preserves folder structure using clean, URL-safe slugs for public_ids.
 *
 * Usage:
 *   Dry run:     npx tsx scripts/upload-local-images-to-cloudinary.ts --dry-run
 *   Real upload: npx tsx scripts/upload-local-images-to-cloudinary.ts
 */

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".bmp",
  ".tiff",
]);

const IGNORED_DIRECTORIES = new Set([
  "node_modules",
  ".next",
  ".git",
  ".vscode",
  ".idea",
  "__pycache__",
  "dist",
  "build",
  ".turbo",
  ".cache",
  "temp-images",
  "coverage",
]);

// Cloudinary default plan upload limit is 10 MB (10,485,760 bytes)
const CLOUDINARY_MAX_FILE_BYTES = 10485760;

interface DiscoveredImage {
  relativePath: string;
  absolutePath: string;
  publicId: string;
  sizeBytes: number;
}

/**
 * Normalizes a single path segment into a URL-safe, clean Cloudinary slug:
 * - Converts to lowercase
 * - Strips parentheses and special symbols
 * - Replaces whitespace and underscores/runs of hyphens with single hyphens
 */
function slugify(segment: string): string {
  return segment
    .toLowerCase()
    .trim()
    .replace(/[()]/g, " ")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

/**
 * Generates the Cloudinary public_id preserving local folder hierarchy under 'rudraksh/'.
 *
 * Examples:
 *   public/images/1 mukhi/1.webp               -> rudraksh/1-mukhi/1
 *   real-product-images/5 mukhi/product-1.webp -> rudraksh/real-product-images/5-mukhi/product-1
 *   public/assets/images/about/hero.png        -> rudraksh/assets/images/about/hero
 */
function computePublicId(relPath: string): string {
  const normalized = relPath.split(sep).join("/");
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

/**
 * Recursively scans the repository for all eligible image files.
 */
function findImageFiles(rootDir: string): DiscoveredImage[] {
  const images: DiscoveredImage[] = [];

  function scan(currentDir: string) {
    let entries;
    try {
      entries = readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!IGNORED_DIRECTORIES.has(entry.name)) {
          scan(join(currentDir, entry.name));
        }
      } else if (entry.isFile()) {
        if (entry.name.startsWith(".") || entry.name.startsWith("~")) continue;

        const ext = extname(entry.name).toLowerCase();
        if (IMAGE_EXTENSIONS.has(ext)) {
          const absPath = join(currentDir, entry.name);
          const relPath = relative(rootDir, absPath);
          const publicId = computePublicId(relPath);
          let sizeBytes = 0;
          try {
            sizeBytes = statSync(absPath).size;
          } catch {
            /* ignore */
          }

          images.push({
            relativePath: relPath,
            absolutePath: absPath,
            publicId,
            sizeBytes,
          });
        }
      }
    }
  }

  scan(rootDir);
  return images;
}

function extractErrorMessage(err: unknown): string {
  if (!err) return "Unknown error";
  if (typeof err === "string") return err;
  if (typeof err === "object") {
    const obj = err as Record<string, unknown>;
    if (obj.message && typeof obj.message === "string") return obj.message;
    if (obj.error && typeof obj.error === "object") {
      const sub = obj.error as Record<string, unknown>;
      if (sub.message && typeof sub.message === "string") return sub.message;
    }
  }
  if (err instanceof Error) return err.message;
  return JSON.stringify(err);
}

// Concurrency limit for uploads
const CONCURRENCY_LIMIT = 3;

async function runPool<T, R>(
  items: T[],
  limit: number,
  iteratorFn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let currentIndex = 0;

  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (currentIndex < items.length) {
      const idx = currentIndex++;
      results[idx] = await iteratorFn(items[idx], idx);
    }
  });

  await Promise.all(workers);
  return results;
}

async function uploadSingleImage(
  img: DiscoveredImage,
  retryCount = 1
): Promise<{ status: "uploaded" | "skipped" | "failed"; error?: string }> {
  // Pre-check file size against Cloudinary's 10MB limit
  if (img.sizeBytes > CLOUDINARY_MAX_FILE_BYTES) {
    const mb = (img.sizeBytes / (1024 * 1024)).toFixed(2);
    return {
      status: "failed",
      error: `File size (${mb} MB) exceeds Cloudinary 10MB limit. Cloudinary plan requires <10MB.`,
    };
  }

  try {
    const res = await cloudinary.uploader.upload(img.absolutePath, {
      public_id: img.publicId,
      overwrite: false,
      resource_type: "image",
    });

    if (res && (res as { existing?: boolean }).existing) {
      return { status: "skipped" };
    }
    return { status: "uploaded" };
  } catch (err: unknown) {
    const message = extractErrorMessage(err);
    if (
      message.toLowerCase().includes("already exists") ||
      (typeof err === "object" && err !== null && "http_code" in err && (err as { http_code: number }).http_code === 409)
    ) {
      return { status: "skipped" };
    }

    // Retry once on transient network errors / timeouts
    if (retryCount > 0) {
      await new Promise((r) => setTimeout(r, 1000));
      return uploadSingleImage(img, retryCount - 1);
    }

    return { status: "failed", error: message };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");

  const rootDir = resolve(process.cwd());

  console.log("================================================================================");
  console.log("             Rudraksh Local Images -> Cloudinary Migration Script               ");
  console.log("================================================================================");
  console.log(`Working Directory: ${rootDir}`);
  console.log(`Execution Mode:    ${isDryRun ? "🔍 DRY-RUN (No uploads will occur)" : "🚀 REAL UPLOAD"}`);
  console.log(`Overwrite Policy:  false (Existing assets are strictly preserved)`);
  console.log("--------------------------------------------------------------------------------\n");

  console.log("🔍 Scanning repository for eligible image files...");
  const images = findImageFiles(rootDir);
  console.log(`Found ${images.length} eligible image file(s).\n`);

  if (images.length === 0) {
    console.log("No images found. Exiting.");
    return;
  }

  if (isDryRun) {
    console.log("--- Plan of Cloudinary Public IDs (Dry-Run) ---");
    images.forEach((img, idx) => {
      const pad = String(idx + 1).padStart(String(images.length).length, " ");
      const sizeMb = (img.sizeBytes / (1024 * 1024)).toFixed(2);
      const sizeNote = img.sizeBytes > CLOUDINARY_MAX_FILE_BYTES ? ` [>10MB: ${sizeMb}MB]` : "";
      console.log(`[${pad}/${images.length}] ${img.relativePath}  -->  ${img.publicId}${sizeNote}`);
    });

    console.log("\n================================================================================");
    console.log("                                DRY RUN SUMMARY                                 ");
    console.log("================================================================================");
    console.log(`Total images found:       ${images.length}`);
    console.log("Uploads attempted:        0 (Dry-run mode)");
    console.log("Ready for real run:       Run without --dry-run to start upload.");
    console.log("================================================================================\n");
    return;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error("❌ Cloudinary configuration error: missing required environment variables.");
    process.exit(1);
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  console.log(`Configured Cloudinary cloud: "${cloudName}"`);
  console.log(`Starting upload with concurrency ${CONCURRENCY_LIMIT}...\n`);

  let uploadedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  const failedFilePaths: Array<{ path: string; publicId: string; error: string }> = [];

  const total = images.length;
  const padLength = String(total).length;

  await runPool(images, CONCURRENCY_LIMIT, async (img, idx) => {
    const pad = String(idx + 1).padStart(padLength, " ");
    const outcome = await uploadSingleImage(img, 1);

    if (outcome.status === "uploaded") {
      uploadedCount++;
      console.log(`[${pad}/${total}] ✅ UPLOADED: ${img.publicId}`);
    } else if (outcome.status === "skipped") {
      skippedCount++;
      console.log(`[${pad}/${total}] ⏩ SKIPPED (already exists): ${img.publicId}`);
    } else {
      failedCount++;
      const err = outcome.error || "Unknown error";
      failedFilePaths.push({
        path: img.relativePath,
        publicId: img.publicId,
        error: err,
      });
      console.error(`[${pad}/${total}] ❌ FAILED: ${img.relativePath} (${img.publicId}) -> ${err}`);
    }
  });

  console.log("\n================================================================================");
  console.log("                             FINAL UPLOAD SUMMARY                               ");
  console.log("================================================================================");
  console.log(`Total images found:       ${total}`);
  console.log(`Successfully uploaded:    ${uploadedCount}`);
  console.log(`Already existed/skipped:  ${skippedCount}`);
  console.log(`Failed:                   ${failedCount}`);

  if (failedFilePaths.length > 0) {
    console.log("\nFailed file paths:");
    failedFilePaths.forEach((f) => {
      console.log(` - ${f.path} (public_id: ${f.publicId}): ${f.error}`);
    });
  } else {
    console.log("\nAll images processed without errors.");
  }
  console.log("================================================================================\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
