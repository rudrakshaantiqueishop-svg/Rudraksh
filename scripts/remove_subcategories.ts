import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const slugs = ["shankh-collection", "sphatik-collection", "idols-singing-bowls", "siddha-mala"];
  
  for (const slug of slugs) {
    console.log(`Processing category: ${slug}`);
    const category = await prisma.category.findUnique({
      where: { slug }
    });
    
    if (category) {
      const deleted = await prisma.subcategory.deleteMany({
        where: { categoryId: category.id }
      });
      console.log(`Deleted ${deleted.count} subcategories for ${slug}.`);
    } else {
      console.log(`Category ${slug} not found.`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
