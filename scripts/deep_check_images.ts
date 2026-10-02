import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Deep-checking all DB image URLs for broken patterns...\n");

  // Check ProductImages 
  const pImages = await prisma.productImage.findMany({
    select: { id: true, url: true, product: { select: { slug: true } } },
    take: 700,
  });

  const emptyUrl = pImages.filter(p => !p.url || p.url.trim() === "");
  const cloudinaryOk = pImages.filter(p => p.url?.startsWith("https://res.cloudinary.com"));
  const cloudinaryBad = pImages.filter(p => p.url?.startsWith("http") && !p.url?.includes("cloudinary.com"));
  const localRef = pImages.filter(p => p.url?.startsWith("/"));
  const poolImages = pImages.filter(p => p.url?.includes("pool-"));
  
  console.log(`Total ProductImages: ${pImages.length}`);
  console.log(`  Cloudinary URLs: ${cloudinaryOk.length}`);
  console.log(`  Pool images (in Cloudinary): ${poolImages.length}`);
  console.log(`  Other HTTP URLs: ${cloudinaryBad.length}`);
  console.log(`  Local refs (/): ${localRef.length}`);
  console.log(`  Empty/null URL: ${emptyUrl.length}`);
  
  if (cloudinaryBad.length > 0) {
    console.log("\nNon-Cloudinary HTTP URLs:");
    cloudinaryBad.slice(0, 10).forEach(p => console.log(`  [${p.product.slug}]: ${p.url}`));
  }
  
  // Sample 5 Cloudinary product image URLs to check if they're valid
  console.log("\nSample Cloudinary ProductImage URLs:");
  cloudinaryOk.slice(0, 5).forEach(p => console.log(`  [${p.product.slug}]: ${p.url}`));
  
  // ProductVariants
  const variants = await prisma.productVariant.findMany({
    select: { id: true, image: true, label: true, product: { select: { slug: true } } },
  });
  const noImgVariants = variants.filter(v => !v.image || v.image.trim() === "");
  const cloudinaryVariants = variants.filter(v => v.image?.startsWith("https://res.cloudinary.com"));
  const localVariants = variants.filter(v => v.image && !v.image.startsWith("http"));
  const poolVariants = variants.filter(v => v.image?.includes("pool-"));
  
  console.log(`\nProductVariants total: ${variants.length}`);
  console.log(`  Cloudinary URLs: ${cloudinaryVariants.length}`);
  console.log(`  Pool images (in Cloudinary): ${poolVariants.length}`);
  console.log(`  Local refs: ${localVariants.length}`);
  console.log(`  No/empty image: ${noImgVariants.length}`);
  
  // Show some pool image examples
  console.log("\nSample pool image variant URLs:");
  poolVariants.slice(0, 5).forEach(v => console.log(`  [${v.product.slug}] "${v.label}": ${v.image}`));

  // Products with NO images at all
  const products = await prisma.product.findMany({
    select: {
      slug: true,
      name: true,
      images: { select: { url: true } },
      variants: { select: { image: true } },
    },
  });

  const productsWithNoImages = products.filter(
    p => p.images.length === 0 && p.variants.every(v => !v.image || v.image.trim() === "")
  );
  
  console.log(`\nTotal Products: ${products.length}`);
  console.log(`Products with NO images (no ProductImage AND no variant image): ${productsWithNoImages.length}`);
  if (productsWithNoImages.length > 0) {
    productsWithNoImages.slice(0, 20).forEach(p => console.log(`  - ${p.slug}`));
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
