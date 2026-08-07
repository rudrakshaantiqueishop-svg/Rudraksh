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
    folder: "rudraksh/banners",
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

  console.log("Starting banner Cloudinary upload and database seeding…");

  const festivalImageUrl = await uploadLocalImage(
    "public/assets/images/home/god.png",
    "festival_banner_god"
  );
  console.log(`✅ Festival Banner Cloudinary URL: ${festivalImageUrl}`);

  const indramalaImageUrl = await uploadLocalImage(
    "public/assets/images/home/rudraksh.png",
    "indramala_banner_rudraksh"
  );
  console.log(`✅ Indramala Banner Cloudinary URL: ${indramalaImageUrl}`);

  // Upsert Festival Banner
  const festivalBanner = await prisma.banner.upsert({
    where: { key: "festival_banner" },
    update: {
      name: "Festival Banner (Shivratri)",
      title: "This Shivratri, get the divine blessings of Bhagwaan Shiv",
      titleHighlight: "Shivratri",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: festivalImageUrl,
      ctaText: "SHOP NOW",
      ctaLink: "#",
      gradientFrom: "#298FC2",
      gradientTo: "#FFFFFF",
      isActive: true,
      sortOrder: 0,
    },
    create: {
      key: "festival_banner",
      name: "Festival Banner (Shivratri)",
      title: "This Shivratri, get the divine blessings of Bhagwaan Shiv",
      titleHighlight: "Shivratri",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: festivalImageUrl,
      ctaText: "SHOP NOW",
      ctaLink: "#",
      gradientFrom: "#298FC2",
      gradientTo: "#FFFFFF",
      isActive: true,
      sortOrder: 0,
    },
  });
  console.log(`✅ Upserted Festival Banner in DB (id: ${festivalBanner.id})`);

  // Upsert Indramala Banner
  const indramalaBanner = await prisma.banner.upsert({
    where: { key: "indramala_banner" },
    update: {
      name: "Indramala Banner",
      title: "Indramala",
      titleHighlight: "Indramala",
      subtitle:
        "Experience the pinnacle of divine craftsmanship, blessed by all Gods and Goddesses. Each meticulously chosen Rudraksha bead forms a conduit of sacred energy, bestowing profound blessings, heightened intuition, and spiritual harmony upon its wearer.",
      imageUrl: indramalaImageUrl,
      ctaText: "SHOP NOW",
      ctaLink: "#",
      gradientFrom: "#F89F20",
      gradientTo: "#FFFFFF",
      isActive: true,
      sortOrder: 1,
    },
    create: {
      key: "indramala_banner",
      name: "Indramala Banner",
      title: "Indramala",
      titleHighlight: "Indramala",
      subtitle:
        "Experience the pinnacle of divine craftsmanship, blessed by all Gods and Goddesses. Each meticulously chosen Rudraksha bead forms a conduit of sacred energy, bestowing profound blessings, heightened intuition, and spiritual harmony upon its wearer.",
      imageUrl: indramalaImageUrl,
      ctaText: "SHOP NOW",
      ctaLink: "#",
      gradientFrom: "#F89F20",
      gradientTo: "#FFFFFF",
      isActive: true,
      sortOrder: 1,
    },
  });
  console.log(`✅ Upserted Indramala Banner in DB (id: ${indramalaBanner.id})`);

  console.log("\n🎉 Banner seeding completed successfully!");
}

main()
  .catch((err) => {
    console.error("Fatal error during banner seeding:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
