import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const GEMSTONE_CHECKLIST_IMAGES: [string, string] = [
  "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790155992/rudraksh/products/gemstones/amethyst-gemstone-necklace/role_3.webp",
  "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790156047/rudraksh/products/japa-mala/7-chakra-rudraksha-gemstone-mala/role_ls_4.webp",
];

async function main() {
  const cat = await prisma.category.findUnique({
    where: { slug: "gemstones" },
  });

  if (!cat) {
    console.error("Gemstones category not found");
    process.exit(1);
  }

  const pc = (cat.pageContent as Record<string, any>) || {};
  const updatedContent = {
    ...pc,
    checklistImages: GEMSTONE_CHECKLIST_IMAGES,
  };

  await prisma.category.update({
    where: { slug: "gemstones" },
    data: {
      pageContent: updatedContent,
    },
  });

  console.log("Updated Gemstones checklistImages successfully:", GEMSTONE_CHECKLIST_IMAGES);
}

main()
  .catch((err) => {
    console.error("Error updating gemstone checklist images:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
