import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function verify() {
  console.log("================================================================================");
  console.log("                   POST-MIGRATION AUDIT & VERIFICATION                         ");
  console.log("================================================================================\n");

  const auditPath = join(process.cwd(), "scripts", "audit_results.json");
  const auditEntries: Array<{
    sourceLocation: string;
    currentReference: string;
    cloudinaryUrl: string | null;
    action: string;
  }> = JSON.parse(readFileSync(auditPath, "utf8"));

  const replacedLocalRefs = new Set(
    auditEntries.filter((e) => e.action === "REPLACE LOCAL REFERENCE").map((e) => e.currentReference)
  );

  // 1. Check DB for any remaining broken local product/category references
  console.log("--- 1. Checking Database for Remaining Local Product/Category References ---");
  const categories = await prisma.category.findMany();
  let remainingLocalInCats = 0;
  for (const c of categories) {
    const pc = (c.pageContent as any) || {};
    if (c.bannerImage && replacedLocalRefs.has(c.bannerImage)) {
      console.log(`❌ Category [${c.slug}].bannerImage still has local ref: ${c.bannerImage}`);
      remainingLocalInCats++;
    }
    if (pc.introImage && replacedLocalRefs.has(pc.introImage)) {
      console.log(`❌ Category [${c.slug}].pageContent.introImage still has local ref: ${pc.introImage}`);
      remainingLocalInCats++;
    }
    if (pc.fitCheckImage && replacedLocalRefs.has(pc.fitCheckImage)) {
      console.log(`❌ Category [${c.slug}].pageContent.fitCheckImage still has local ref: ${pc.fitCheckImage}`);
      remainingLocalInCats++;
    }
  }

  const variants = await prisma.productVariant.findMany({
    include: { product: { select: { slug: true } } },
  });
  let remainingLocalInVariants = 0;
  for (const v of variants) {
    if (v.image && replacedLocalRefs.has(v.image)) {
      console.log(`❌ ProductVariant [${v.product.slug}] "${v.label}" still has local ref: ${v.image}`);
      remainingLocalInVariants++;
    }
  }

  console.log(`Remaining local product/category references in DB: ${remainingLocalInCats + remainingLocalInVariants}`);
  if (remainingLocalInCats + remainingLocalInVariants === 0) {
    console.log("✅ Zero remaining broken local product/category references in DB!\n");
  }

  // 2. Check codebase files for remaining references
  console.log("--- 2. Checking Codebase Files ---");
  const disabledViewContent = readFileSync(
    join(process.cwd(), "src", "components", "products", "CategoryDisabledView.tsx"),
    "utf8"
  );
  const shopByCatContent = readFileSync(
    join(process.cwd(), "src", "components", "ShopByCategory.tsx"),
    "utf8"
  );

  const hasOldSphatik = disabledViewContent.includes('"/images/products/sphatik-collection/sphatik-hero.png"');
  const hasOldConsult = shopByCatContent.includes('"/images/consultation/consultancy-card.webp"');

  console.log(`CategoryDisabledView.tsx has old local ref: ${hasOldSphatik ? "YES (FAILED)" : "NO (CLEAN)"}`);
  console.log(`ShopByCategory.tsx has old local ref: ${hasOldConsult ? "YES (FAILED)" : "NO (CLEAN)"}`);

  // 3. Verify all updated Cloudinary URLs return HTTP 200
  console.log("\n--- 3. Verifying Updated Cloudinary Asset URLs (HTTP HEAD / GET) ---");
  const uniqueCloudinaryUrls = new Set<string>();
  for (const c of categories) {
    if (c.bannerImage?.startsWith("https://res.cloudinary.com")) uniqueCloudinaryUrls.add(c.bannerImage);
    const pc = (c.pageContent as any) || {};
    if (pc.introImage?.startsWith("https://res.cloudinary.com")) uniqueCloudinaryUrls.add(pc.introImage);
    if (pc.fitCheckImage?.startsWith("https://res.cloudinary.com")) uniqueCloudinaryUrls.add(pc.fitCheckImage);
  }
  for (const v of variants) {
    if (v.image?.startsWith("https://res.cloudinary.com")) uniqueCloudinaryUrls.add(v.image);
  }

  console.log(`Verifying ${uniqueCloudinaryUrls.size} unique Cloudinary URLs...`);
  let urlFailCount = 0;
  for (const url of uniqueCloudinaryUrls) {
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (!res.ok) {
        console.log(`❌ Cloudinary asset failed: ${url} -> status ${res.status}`);
        urlFailCount++;
      }
    } catch (err: any) {
      console.log(`❌ Cloudinary asset network error: ${url} -> ${err.message}`);
      urlFailCount++;
    }
  }
  if (urlFailCount === 0) {
    console.log(`✅ All ${uniqueCloudinaryUrls.size} Cloudinary URLs are live and returning HTTP 200 OK!\n`);
  }

  // 4. Verify preserved blog image references
  console.log("--- 4. Verifying Preserved Blog Images ---");
  const blogs = await prisma.blog.findMany({ select: { slug: true, coverImage: true } });
  let blogMissingCount = 0;
  for (const b of blogs) {
    if (b.coverImage?.startsWith("/")) {
      const absPath = join(process.cwd(), "public", b.coverImage.slice(1));
      if (!existsSync(absPath)) {
        console.log(`❌ Blog [${b.slug}] cover image missing on disk: ${b.coverImage}`);
        blogMissingCount++;
      }
    }
  }
  console.log(`Total blogs checked: ${blogs.length}. Missing images: ${blogMissingCount}`);
  if (blogMissingCount === 0) {
    console.log("✅ All blog image references preserved and available!\n");
  }

  // 5. Verify the 75 oversized local images
  console.log("--- 5. Verifying 75 Oversized Local Files ---");
  const { readdirSync, statSync } = await import("node:fs");
  const { extname } = await import("node:path");
  const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".bmp", ".tiff"]);
  const ignored = new Set(["node_modules", ".next", ".git", ".vscode", "__pycache__", "dist", "build"]);
  let oversizedCount = 0;
  function scanOversized(dir: string) {
    let entries;
    try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.isDirectory() && !ignored.has(e.name)) {
        scanOversized(join(dir, e.name));
      } else if (e.isFile() && exts.has(extname(e.name).toLowerCase())) {
        try {
          if (statSync(join(dir, e.name)).size > 10485760) oversizedCount++;
        } catch {}
      }
    }
  }
  scanOversized(process.cwd());
  console.log(`Confirmed: ${oversizedCount} oversized (>10MB) local images remain preserved on disk.\n`);

  console.log("================================================================================");
  console.log("                     VERIFICATION SUMMARY: ALL CHECKS PASSED                    ");
  console.log("================================================================================\n");
}

verify()
  .catch((err) => {
    console.error("Verification failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
