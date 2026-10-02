import 'dotenv/config';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Update Antique Collection Category
  const category = await prisma.category.findUnique({
    where: { slug: 'antique-collection' }
  });

  if (category) {
    const pageContent = category.pageContent as any;
    // update page content image
    if (pageContent) {
        pageContent.introImage = '/assets/images/DSC_3403.jpg';
        if (pageContent.exploreDesigns && pageContent.exploreDesigns.items) {
            pageContent.exploreDesigns.items[0].image = '/assets/images/DSC_3403.jpg';
        }
    }

    await prisma.category.update({
      where: { id: category.id },
      data: {
        image: '/assets/images/DSC_3403.jpg',
        pageContent: pageContent
      }
    });
    console.log('Updated Antique Collection Category');
  }

  // Update 1008 Beads Product Images
  const product = await prisma.product.findFirst({
    where: { name: { contains: '1008 Beads' } }
  });

  if (product) {
    await prisma.productImage.deleteMany({
      where: { productId: product.id }
    });

    const roles = ['MAIN', 'GALLERY_LEFT', 'GALLERY_TOP_RIGHT', 'GALLERY_BOTTOM_RIGHT'];
    const images = [
      '/assets/images/DSC_3402.jpg',
      '/assets/images/DSC_3403.jpg',
      '/assets/images/DSC_3402.jpg',
      '/assets/images/DSC_3403.jpg'
    ];

    for (let i = 0; i < roles.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: images[i],
          alt: `1008 Beads - ${roles[i]}`,
          role: roles[i] as any,
          sortOrder: i
        }
      });
    }
    console.log('Updated 1008 Beads Product Images');
  }

  console.log('Done');
}

main().catch(console.error).finally(() => prisma.$disconnect());
