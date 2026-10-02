import "dotenv/config";
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join, parse, relative, resolve, sep } from "node:path";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { execSync } from "node:child_process";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const CLOUDINARY_MAX_FILE_BYTES = 10485760; // 10MB

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".bmp", ".tiff"]);
const IGNORED_DIRECTORIES = new Set(["node_modules", ".next", ".git", ".vscode", "dist", "build", ".turbo", ".cache", "temp-images"]);

function slugify(segment: string): string {
  return segment.toLowerCase().trim().replace(/[()]/g, " ").replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").replace(/-+/g, "-");
}

function computePublicId(relPath: string): string {
  const normalized = relPath.split(sep).join("/");
  const parsed = parse(normalized);
  let relativeFolder = "";
  if (normalized.startsWith("public/images/")) relativeFolder = parse(normalized.slice("public/images/".length)).dir;
  else if (normalized.startsWith("public/")) relativeFolder = parse(normalized.slice("public/".length)).dir;
  else relativeFolder = parsed.dir;
  
  const folderParts = relativeFolder ? relativeFolder.split("/").filter(Boolean).map(slugify).filter(Boolean) : [];
  return ["rudraksh", ...folderParts, slugify(parsed.name)].filter(Boolean).join("/");
}

function findImageFiles(rootDir: string): any[] {
  const images: any[] = [];
  function scan(currentDir: string) {
    let entries;
    try { entries = readdirSync(currentDir, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!IGNORED_DIRECTORIES.has(entry.name)) scan(join(currentDir, entry.name));
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        if (IMAGE_EXTENSIONS.has(ext)) {
          const absPath = join(currentDir, entry.name);
          const relPath = relative(rootDir, absPath).replace(/\\/g, '/');
          images.push({
            relativePath: relPath,
            absolutePath: absPath,
            publicId: computePublicId(relPath),
            sizeBytes: statSync(absPath).size,
            name: entry.name
          });
        }
      }
    }
  }
  scan(rootDir);
  return images;
}

async function main() {
  const rootDir = resolve(process.cwd());
  const images = findImageFiles(rootDir);
  
  const cachePath = join(rootDir, "scripts", "cloudinary_assets_cache.json");
  const cloudinaryCache = JSON.parse(readFileSync(cachePath, "utf-8"));
  
  // Get all DB references
  const dbRefs = new Set<string>();
  const productImages = await prisma.productImage.findMany({ select: { url: true }});
  productImages.forEach(p => p.url && dbRefs.add(p.url));
  
  const categories = await prisma.category.findMany({ select: { image: true, pageContent: true }});
  categories.forEach(c => {
    if (c.image) dbRefs.add(c.image);
    if (c.pageContent && typeof c.pageContent === 'object') {
        const pc = c.pageContent as any;
        if (pc.introImage) dbRefs.add(pc.introImage);
        if (pc.fitCheckImage) dbRefs.add(pc.fitCheckImage);
    }
  });

  const subcategories = await prisma.subcategory.findMany({ select: { image: true }});
  subcategories.forEach(s => s.image && dbRefs.add(s.image));

  const blogs = await prisma.blog.findMany({ select: { coverImage: true }});
  blogs.forEach(b => b.coverImage && dbRefs.add(b.coverImage));
  
  const variants = await prisma.productVariant.findMany({ select: { image: true }});
  variants.forEach(v => v.image && dbRefs.add(v.image));

  let keepOversized = 0;
  let keepBlog = 0;
  let keepNoCloudinary = 0;
  let keepDbRef = 0;
  let keepCodeRef = 0;
  const toDelete: string[] = [];

  for (const img of images) {
    const isBlog = img.relativePath.toLowerCase().includes("blog");
    if (isBlog) { keepBlog++; continue; }

    if (img.sizeBytes > CLOUDINARY_MAX_FILE_BYTES) { keepOversized++; continue; }

    if (!cloudinaryCache[img.publicId]) { keepNoCloudinary++; continue; }

    // Check DB
    const possiblePaths = [
        "/" + img.relativePath,
        img.relativePath
    ];
    let inDb = false;
    for (const ref of dbRefs) {
      if (possiblePaths.some(p => ref.includes(p))) { inDb = true; break; }
    }
    if (inDb) { keepDbRef++; continue; }

    // Check Codebase (simple grep)
    try {
        const basename = img.name;
        // Search src and prisma directories for the filename
        const res = execSync(`git grep -l "${basename}" src/ prisma/`, { encoding: 'utf-8', stdio: 'pipe' });
        if (res.trim().length > 0) { keepCodeRef++; continue; }
    } catch(e) {
        // git grep exits with 1 if no match found
    }

    toDelete.push(img.relativePath);
  }

  const report = `
# Local Image Cleanup Plan

## Summary
- Total Images Found: ${images.length}
- Kept (Oversized >10MB): ${keepOversized}
- Kept (Blog Images): ${keepBlog}
- Kept (Not in Cloudinary): ${keepNoCloudinary}
- Kept (Referenced in DB): ${keepDbRef}
- Kept (Referenced in Code): ${keepCodeRef}
- **Safe to Delete**: ${toDelete.length}

## Safe to Delete List
\`\`\`text
${toDelete.slice(0, 100).join("\n")}
${toDelete.length > 100 ? `...and ${toDelete.length - 100} more files` : ""}
\`\`\`

## Cleanup Script
To execute the cleanup, run the following:
\`\`\`bash
npx tsx scripts/execute_cleanup.ts
\`\`\`
`;

  writeFileSync(join(rootDir, "scripts", "execute_cleanup.ts"), `
import { unlinkSync } from "fs";
import { join } from "path";

const filesToDelete = ${JSON.stringify(toDelete, null, 2)};

let deleted = 0;
for (const file of filesToDelete) {
    try {
        unlinkSync(join(process.cwd(), file));
        deleted++;
    } catch(e) {
        console.error("Failed to delete", file, e);
    }
}
console.log("Successfully deleted " + deleted + " files.");
`);

  console.log(report);
  writeFileSync(join(rootDir, "cleanup_plan.md"), report);
}

main().catch(console.error).finally(() => prisma.$disconnect());
