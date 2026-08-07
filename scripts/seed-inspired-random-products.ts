import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SHORTS_URL = "https://youtube.com/shorts/OEgdSN09sBw?si=VXwcmgqbD8sg5xsH";

async function main() {
  console.log("Fetching 4 products from database to seed Get Inspired section…");

  // Get 4 products from the database with their main image
  const products = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        take: 1,
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (products.length === 0) {
    console.log("No products found in DB! Please seed products first.");
    return;
  }

  // Clear existing inspired items
  await prisma.inspiredItem.deleteMany({});

  const seeded = [];
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const imgUrl = p.images[0]?.url || "https://res.cloudinary.com/dkbr33fcx/image/upload/v1786124530/rudraksh/inspired/prod_thumb_necklace.webp";
    const priceStr = `$${(p.priceCents / 100).toFixed(2)}`;
    const origPriceStr = p.compareAtPriceCents ? `$${(p.compareAtPriceCents / 100).toFixed(2)}` : null;

    const item = await prisma.inspiredItem.create({
      data: {
        title: `${p.name} Review`,
        type: "video",
        videoUrl: SHORTS_URL,
        imageUrl: imgUrl,
        productImageUrl: imgUrl,
        price: priceStr,
        originalPrice: origPriceStr,
        productId: p.id,
        sortOrder: i,
        isActive: true,
      },
    });

    seeded.push(item);
    console.log(`✅ Seeded Inspired Item ${i + 1}: ${item.title}`);
    console.log(`   Product ID: ${p.id}`);
    console.log(`   Product Thumbnail: ${imgUrl}`);
    console.log(`   Price: ${priceStr}\n`);
  }

  console.log("🎉 Successfully seeded 4 inspired items linked to real products!");
}

main()
  .catch((err) => {
    console.error("Error during seeding:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
