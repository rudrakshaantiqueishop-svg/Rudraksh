import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("=== UPDATING CATEGORY & SUBCATEGORY IMAGES ===");
  console.log("Using the main image of the first product in each category/subcategory.");

  let subcatsUpdated = 0;
  let catsUpdated = 0;

  // Update Subcategories
  const subcategories = await prisma.subcategory.findMany({
    include: {
      products: {
        take: 1,
        include: {
          images: {
            where: { role: "MAIN" },
            take: 1
          }
        }
      }
    }
  });

  for (const sub of subcategories) {
    if (sub.products.length > 0 && sub.products[0].images.length > 0) {
      const imgUrl = sub.products[0].images[0].url;
      await prisma.subcategory.update({
        where: { id: sub.id },
        data: { image: imgUrl }
      });
      subcatsUpdated++;
      console.log(`✅ Subcategory [${sub.slug}] image updated to ${imgUrl}`);
    } else {
      console.log(`⚠️ Subcategory [${sub.slug}] has no products with images.`);
    }
  }

  // Update Categories
  const categories = await prisma.category.findMany({
    include: {
      products: {
        take: 1,
        include: {
          images: {
            where: { role: "MAIN" },
            take: 1
          }
        }
      }
    }
  });

  for (const cat of categories) {
    let imgUrl = null;
    
    if (cat.products.length > 0 && cat.products[0].images.length > 0) {
      imgUrl = cat.products[0].images[0].url;
    } else {
      // Try to get an image from a subcategory if no direct products
      const firstSubWithImg = await prisma.subcategory.findFirst({
        where: { categoryId: cat.id, image: { not: "" } }
      });
      if (firstSubWithImg && firstSubWithImg.image) {
        imgUrl = firstSubWithImg.image;
      }
    }

    if (imgUrl) {
      const updateData: any = {
        image: imgUrl,
      };
      
      if (cat.image) updateData.image = imgUrl;

      // Update pageContent images if they exist
      if (cat.pageContent && typeof cat.pageContent === 'object') {
        const pc: any = { ...cat.pageContent };
        let pcUpdated = false;
        if (pc.introImage) { pc.introImage = imgUrl; pcUpdated = true; }
        if (pc.fitCheckImage) { pc.fitCheckImage = imgUrl; pcUpdated = true; }
        if (pcUpdated) {
          updateData.pageContent = pc;
        }
      }

      await prisma.category.update({
        where: { id: cat.id },
        data: updateData
      });
      catsUpdated++;
      console.log(`✅ Category [${cat.slug}] images updated to ${imgUrl}`);
    } else {
      console.log(`⚠️ Category [${cat.slug}] has no products/subcategories with images.`);
    }
  }

  console.log(`\nDone! Updated ${subcatsUpdated} subcategories and ${catsUpdated} categories.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
