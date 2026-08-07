import "dotenv/config";
import { join } from "node:path";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadLocalImage(relativePath: string, publicId: string): Promise<string> {
  const filePath = join(process.cwd(), relativePath);
  console.log(`☁ Uploading ${relativePath} to Cloudinary as ${publicId}…`);
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "rudraksh/inspired",
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
    format: "webp",
    transformation: [{ quality: "auto" }],
  });
  return result.secure_url;
}

async function main() {
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Missing CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env");
  }

  console.log("Uploading distinct product photos & review covers to Cloudinary…");

  // Cover background images
  const cover1 = await uploadLocalImage("public/assets/images/about/about-sacred-1.png", "cover_sacred_1");
  const cover2 = await uploadLocalImage("public/assets/images/about/about-sacred-2.png", "cover_sacred_2");
  const cover3 = await uploadLocalImage("public/assets/images/about/about-founding-1.png", "cover_founding_1");
  const cover4 = await uploadLocalImage("public/assets/images/about/about-founding-2.png", "cover_founding_2");

  // Distinct product review thumbnail images
  const prodNecklace = await uploadLocalImage("public/assets/images/products/category-necklace.png", "prod_thumb_necklace");
  const prodBracelet = await uploadLocalImage("public/assets/images/products/category-bracelets.png", "prod_thumb_bracelet");
  const prodRing = await uploadLocalImage("public/assets/images/products/category-rings.png", "prod_thumb_ring");
  const prodEarrings = await uploadLocalImage("public/assets/images/products/category-earrings.png", "prod_thumb_earrings");

  const itemsData = [
    {
      title: "Sacred Store Visit & Mala Review",
      type: "video",
      videoUrl: "https://youtube.com/shorts/OEgdSN09sBw?si=VXwcmgqbD8sg5xsH",
      imageUrl: cover1,
      productImageUrl: prodNecklace,
      price: "$230.00",
      originalPrice: "$250.00",
      sortOrder: 0,
      isActive: true,
    },
    {
      title: "Energized Rudraksha Bracelet Review",
      type: "video",
      videoUrl: "https://youtube.com/shorts/OEgdSN09sBw?si=VXwcmgqbD8sg5xsH",
      imageUrl: cover2,
      productImageUrl: prodBracelet,
      price: "$120.00",
      originalPrice: "$140.00",
      sortOrder: 1,
      isActive: true,
    },
    {
      title: "Divine Rudraksha Ring Experience",
      type: "video",
      videoUrl: "https://youtube.com/shorts/OEgdSN09sBw?si=VXwcmgqbD8sg5xsH",
      imageUrl: cover3,
      productImageUrl: prodRing,
      price: "$180.00",
      originalPrice: "$200.00",
      sortOrder: 2,
      isActive: true,
    },
    {
      title: "Authentic Rudraksha Earrings Review",
      type: "video",
      videoUrl: "https://youtube.com/shorts/OEgdSN09sBw?si=VXwcmgqbD8sg5xsH",
      imageUrl: cover4,
      productImageUrl: prodEarrings,
      price: "$280.00",
      originalPrice: "$300.00",
      sortOrder: 3,
      isActive: true,
    },
  ];

  await prisma.inspiredItem.deleteMany({});
  for (const data of itemsData) {
    const created = await prisma.inspiredItem.create({ data });
    console.log(`✅ Seeded (${created.title}): Product Cloudinary Image = ${created.productImageUrl}`);
  }

  console.log("\n🎉 Cloudinary product images & database seeding finished!");
}

main()
  .catch((err) => {
    console.error("Fatal error during seeding:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
