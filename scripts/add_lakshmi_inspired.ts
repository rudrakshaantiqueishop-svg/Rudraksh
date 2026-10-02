import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const lakshmiProduct = await prisma.product.findFirst({
    where: {
      OR: [
        { slug: "sacred-gemstone-inlaid-goddess-lakshmi-idol" },
        { name: { contains: "Lakshmi", mode: "insensitive" } },
      ],
    },
    include: {
      images: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!lakshmiProduct) {
    throw new Error("Could not find Goddess Lakshmi product in database");
  }

  console.log(`Found product: ${lakshmiProduct.name} (${lakshmiProduct.id}), slug: ${lakshmiProduct.slug}`);

  const primaryImage =
    lakshmiProduct.images[0]?.url ||
    "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790156028/rudraksh/products/idols-singing-bowls/sacred-gemstone-inlaid-goddess-lakshmi-idol/role_0.webp";

  const videoUrl = "https://www.youtube.com/shorts/VC7Hddui5Mw";

  // Check if item already exists
  const existing = await prisma.inspiredItem.findFirst({
    where: {
      OR: [
        { videoUrl: { contains: "VC7Hddui5Mw" } },
        { productId: lakshmiProduct.id },
      ],
    },
  });

  // Re-shift sort orders so this item is first (sortOrder = 0)
  const allItems = await prisma.inspiredItem.findMany({
    orderBy: { sortOrder: "asc" },
  });

  for (let i = 0; i < allItems.length; i++) {
    if (existing && allItems[i].id === existing.id) continue;
    await prisma.inspiredItem.update({
      where: { id: allItems[i].id },
      data: { sortOrder: i + 1 },
    });
  }

  if (existing) {
    const updated = await prisma.inspiredItem.update({
      where: { id: existing.id },
      data: {
        title: lakshmiProduct.name,
        type: "video",
        videoUrl,
        imageUrl: primaryImage,
        productImageUrl: primaryImage,
        price: "₹9,499",
        originalPrice: "₹14,999",
        productId: lakshmiProduct.id,
        sortOrder: 0,
        isActive: true,
      },
    });
    console.log("Updated existing inspired item:", updated);
  } else {
    const created = await prisma.inspiredItem.create({
      data: {
        title: lakshmiProduct.name,
        type: "video",
        videoUrl,
        imageUrl: primaryImage,
        productImageUrl: primaryImage,
        price: "₹9,499",
        originalPrice: "₹14,999",
        productId: lakshmiProduct.id,
        sortOrder: 0,
        isActive: true,
      },
    });
    console.log("Created new inspired item:", created);
  }
}

main()
  .catch((err) => {
    console.error("Error running add_lakshmi_inspired:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
