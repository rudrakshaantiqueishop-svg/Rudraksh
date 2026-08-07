import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Checking categories in database…");
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  for (const c of categories) {
    console.log(`• Category [${c.slug}]: name="${c.name}", isActive=${c.isActive}`);
  }

  // Set Gemstones category to isActive = false
  const gemstones = await prisma.category.findUnique({ where: { slug: "gemstones" } });
  if (gemstones) {
    await prisma.category.update({
      where: { slug: "gemstones" },
      data: { isActive: false },
    });
    console.log("\n✅ Successfully set 'gemstones' category isActive = false so it displays the 'Currently Not Serving' paused page!");
  } else {
    console.log("\n'gemstones' category not found in DB.");
  }
}

main()
  .catch((err) => {
    console.error("Error checking categories:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
