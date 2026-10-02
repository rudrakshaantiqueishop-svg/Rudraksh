import 'dotenv/config';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const cat = await prisma.category.findUnique({
    where: { slug: 'siddha-mala' },
    select: { pageContent: true, id: true }
  });
  
  const existingContent: any = cat?.pageContent || {};
  
  // Create missing content defaults
  const checklistHeading = `Every Siddha Mala Item You See Here Is`;
  const checklist = [
    "Physically examined for authenticity and finish",
    "Sourced from trusted, traditional suppliers",
    "Quality-checked before it is listed",
    "Provided with certification where applicable",
    "Final-checked and cleansed before dispatch",
  ];
  const checklistImages = [
    "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790887071/rudraksh/verification/siddha-mala-authenticity-wear.webp",
    "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790887073/rudraksh/verification/siddha-mala-authenticity-kantha.webp",
  ];
  
  const fitCheckRightLabel = `Siddha Mala May Be Right for You If:`;
  const fitCheckRightItems = [
    "You value authenticity over appearance",
    "You're seeking spiritual grounding and traditional guidance",
    "You want honest information, not exaggerated claims",
  ];
  
  const fitCheckWrongLabel = `Siddha Mala May Not Be Right for You If:`;
  const fitCheckWrongItems = [
    "You're looking for instant or guaranteed outcomes",
    "You prefer purely decorative pieces with no context",
    "You're unsure and don't want any guidance",
  ];
  const fitCheckImage = "/assets/images/products/category-necklace.png";
  
  const exploreDesigns = {
    heading: "Explore Our Collection",
    description: `Browse the different types of siddha mala available, each verified and cared for the same way.`,
    items: [
      { title: "Traditional", description: "Classic forms for regular spiritual use.", image: "/assets/images/about/about-sacred-1.png" },
      { title: "Everyday", description: "Comfortable, ready-to-wear or ready-to-place pieces.", image: "/assets/images/products/category-necklace.png" },
      { title: "Premium", description: "Higher-grade selections for collectors and gifting.", image: "/assets/images/about/about-p01-3021a5.png" },
      { title: "Energized", description: "Cleansed and energized on request before dispatch.", image: "/assets/images/about/about-sacred-2.png" },
    ],
  };

  const updatedContent = {
    ...existingContent,
    checklistHeading,
    checklist,
    checklistImages,
    fitCheckRightLabel,
    fitCheckRightItems,
    fitCheckWrongLabel,
    fitCheckWrongItems,
    fitCheckImage,
    exploreDesigns
  };

  await prisma.category.update({
    where: { id: cat!.id },
    data: { pageContent: updatedContent }
  });

  console.log("Updated Siddha Mala pageContent successfully.");
}
main().finally(() => prisma.$disconnect());
