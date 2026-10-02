import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const cats = await prisma.category.findMany({
    select: { slug: true, image: true }
  });

  console.log("=== CATEGORY IMAGES ===");
  for (const c of cats) {
    console.log(`[${c.slug}]`);
    console.log(`  image:          ${c.image}`);
  }

  const subcats = await prisma.subcategory.findMany({
    select: { slug: true, image: true, category: { select: { slug: true } } }
  });

  console.log("\n=== SUBCATEGORY IMAGES ===");
  for (const s of subcats) {
    console.log(`[${s.category.slug} / ${s.slug}] image: ${s.image}`);
  }
}

main().finally(() => prisma.$disconnect());
