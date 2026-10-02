import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const CLOUDINARY_CHECKLIST_IMAGES: [string, string] = [
  "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790884867/rudraksh/verification/rudraksha-branch-authenticity.webp",
  "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790884868/rudraksh/verification/rudraksha-palm-authenticity.webp",
];

async function main() {
  const categories = await prisma.category.findMany();
  
  for (const cat of categories) {
    const pc = (cat.pageContent as Record<string, any>) || {};
    const updatedContent = {
      ...pc,
      checklistImages: CLOUDINARY_CHECKLIST_IMAGES,
    };

    await prisma.category.update({
      where: { id: cat.id },
      data: {
        pageContent: updatedContent,
      },
    });

    console.log(`Updated category "${cat.name}" (${cat.slug}) checklist images.`);
  }
}

main()
  .catch((err) => {
    console.error("Failed to update categories:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
