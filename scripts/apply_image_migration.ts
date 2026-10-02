import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function applyMigration() {
  console.log("================================================================================");
  console.log("             Applying Image Migration: Local -> Cloudinary Assets               ");
  console.log("================================================================================\n");

  const auditPath = join(process.cwd(), "scripts", "audit_results.json");
  const auditEntries: Array<{
    sourceLocation: string;
    currentReference: string;
    cloudinaryUrl: string | null;
    action: string;
  }> = JSON.parse(readFileSync(auditPath, "utf8"));

  const urlMap = new Map<string, string>();
  for (const entry of auditEntries) {
    if (entry.action === "REPLACE LOCAL REFERENCE" && entry.cloudinaryUrl) {
      urlMap.set(entry.currentReference, entry.cloudinaryUrl);
    }
  }

  console.log(`Loaded ${urlMap.size} replacement mappings from audit results.\n`);

  // 1. Update Categories
  console.log("--- 1. Updating Categories ---");
  const categories = await prisma.category.findMany();
  let updatedCatCount = 0;

  for (const cat of categories) {
    let hasChanges = false;
    let newBanner = cat.image;
    if (cat.image && urlMap.has(cat.image)) {
      newBanner = urlMap.get(cat.image)!;
      console.log(`[Category: ${cat.slug}] image: ${cat.image} -> ${newBanner}`);
      hasChanges = true;
    }

    const pc = (cat.pageContent as any) || {};
    let newIntro = pc.introImage;
    if (pc.introImage && urlMap.has(pc.introImage)) {
      newIntro = urlMap.get(pc.introImage)!;
      console.log(`[Category: ${cat.slug}] introImage: ${pc.introImage} -> ${newIntro}`);
      hasChanges = true;
    }

    let newFitCheck = pc.fitCheckImage;
    if (pc.fitCheckImage && urlMap.has(pc.fitCheckImage)) {
      newFitCheck = urlMap.get(pc.fitCheckImage)!;
      console.log(`[Category: ${cat.slug}] fitCheckImage: ${pc.fitCheckImage} -> ${newFitCheck}`);
      hasChanges = true;
    }

    if (hasChanges) {
      await prisma.category.update({
        where: { id: cat.id },
        data: {
          image: newBanner,
          pageContent: {
            ...pc,
            introImage: newIntro,
            fitCheckImage: newFitCheck,
          },
        },
      });
      updatedCatCount++;
      console.log(`✅ Saved Category [${cat.slug}]\n`);
    }
  }
  console.log(`Updated ${updatedCatCount} categories.\n`);

  // 2. Update ProductVariants
  console.log("--- 2. Updating ProductVariants ---");
  const variants = await prisma.productVariant.findMany({
    include: { product: { select: { slug: true } } },
  });
  let updatedVariantCount = 0;

  for (const v of variants) {
    if (v.image && urlMap.has(v.image)) {
      const newImg = urlMap.get(v.image)!;
      await prisma.productVariant.update({
        where: { id: v.id },
        data: { image: newImg },
      });
      updatedVariantCount++;
      console.log(`✅ Updated Variant [${v.product.slug}] "${v.label}": ${v.image} -> ${newImg}`);
    }
  }
  console.log(`\nUpdated ${updatedVariantCount} product variants.\n`);

  console.log("================================================================================");
  console.log("                         MIGRATION COMPLETE                                     ");
  console.log(`Total Categories Updated:       ${updatedCatCount}`);
  console.log(`Total ProductVariants Updated:  ${updatedVariantCount}`);
  console.log("================================================================================\n");
}

applyMigration()
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
