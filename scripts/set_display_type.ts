import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  // Set these categories to PRODUCT_LISTING display type
  const directListingSlugs = ["shankh-collection", "sphatik-collection", "idols-singing-bowls", "siddha-mala"];

  for (const slug of directListingSlugs) {
    const result = await prisma.category.updateMany({
      where: { slug },
      data: { displayType: "PRODUCT_LISTING" },
    });
    console.log(`${slug}: updated ${result.count} row(s) to PRODUCT_LISTING`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
