import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Checking for remaining local image references in DB...\n");

  // ProductVariant.image
  const variants = await prisma.productVariant.findMany({
    select: { id: true, image: true, label: true, product: { select: { slug: true } } },
  });
  const localVariants = variants.filter(
    (v) => v.image && !v.image.startsWith("http") && v.image.startsWith("/")
  );
  console.log(`ProductVariants with local refs: ${localVariants.length}`);
  localVariants.slice(0, 20).forEach((v) =>
    console.log(` - [${v.product.slug}] "${v.label}": ${v.image}`)
  );

  // Category fields
  const cats = await prisma.category.findMany({
    select: { slug: true, image: true, pageContent: true },
  });
  let localCatCount = 0;
  for (const c of cats) {
    const pc = (c.pageContent as any) || {};
    if (c.image && !c.image.startsWith("http")) {
      console.log(` Cat [${c.slug}] image: ${c.image}`);
      localCatCount++;
    }
    if (pc.introImage && !pc.introImage.startsWith("http")) {
      console.log(` Cat [${c.slug}] introImage: ${pc.introImage}`);
      localCatCount++;
    }
    if (pc.fitCheckImage && !pc.fitCheckImage.startsWith("http")) {
      console.log(` Cat [${c.slug}] fitCheckImage: ${pc.fitCheckImage}`);
      localCatCount++;
    }
  }
  console.log(`Categories with local refs: ${localCatCount}`);

  // ProductImage.url
  const pImages = await prisma.productImage.findMany({
    select: { url: true, product: { select: { slug: true } } },
  });
  const localPImages = pImages.filter(
    (p) => p.url && !p.url.startsWith("http")
  );
  console.log(`\nTotal ProductImages: ${pImages.length}`);
  console.log(`ProductImages with local refs: ${localPImages.length}`);
  localPImages.slice(0, 20).forEach((p) =>
    console.log(` - [${p.product.slug}]: ${p.url}`)
  );

  // Subcategory.image
  const subcats = await prisma.subcategory.findMany({
    select: { slug: true, image: true },
  });
  const localSubcats = subcats.filter(
    (s) => s.image && !s.image.startsWith("http")
  );
  console.log(`\nSubcategories with local refs: ${localSubcats.length}`);
  localSubcats.slice(0, 10).forEach((s) =>
    console.log(` - [${s.slug}]: ${s.image}`)
  );

  console.log("\n=== SUMMARY ===");
  console.log(`ProductVariants local: ${localVariants.length}`);
  console.log(`Category fields local: ${localCatCount}`);
  console.log(`ProductImages local: ${localPImages.length}`);
  console.log(`Subcategories local: ${localSubcats.length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
