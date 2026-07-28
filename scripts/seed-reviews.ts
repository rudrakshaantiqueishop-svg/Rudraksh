import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SAMPLE_REVIEWS = [
  {
    authorName: "Aarav Mehta",
    title: "Incredible energy, highly authentic",
    body: "I purchased the 5 Mukhi Rudraksha Japa Mala and could feel the calming energy almost instantly. It is extremely well-packaged and came with an authenticity certificate. Highly recommend to everyone looking for genuine beads.",
    rating: 5,
  },
  {
    authorName: "Ananya Sharma",
    title: "Beautiful craftmanship and purity",
    body: "The Sphatik bracelet is stunning. The crystal beads are exceptionally clear and cool to the touch. The caps look very elegant. Shipping was fast to Delhi. Will order again soon.",
    rating: 5,
  },
  {
    authorName: "Rajesh Kumar",
    title: "Very satisfied with the purchase",
    body: "Bought a Shree Yantra for my home temple. The engraving is clean and precise. I opted for the Vedic Puja energisation and it was performed beautifully. Very satisfied.",
    rating: 4,
  },
  {
    authorName: "Priya Patel",
    title: "Pure Sidhha Mala - Simply divine",
    body: "The energy from this Siddha Mala is profound. Excellent quality of beads, very sturdy thread, and the lab certificate gives peace of mind. Exceptional customer service too.",
    rating: 5,
  },
  {
    authorName: "Vikram Singh",
    title: "Genuine Indonesian Rudraksha",
    body: "Purchased the 7 Mukhi bead cap bracelet. The beads are Indonesian as described and have a nice weight. Standard delivery took 3 days. Good product.",
    rating: 4,
  },
  {
    authorName: "Meera Nair",
    title: "Awesome singing bowl",
    body: "The sound vibration from the singing bowl is beautiful and lingers for a long time. Ideal for meditation. Packing was done with a lot of care.",
    rating: 5,
  },
  {
    authorName: "Sanjay Joshi",
    title: "Excellent quality and packaging",
    body: "I got a 1 Mukhi Rudraksha bead from Nepal. It looks very natural and has clear lines. Very professional packaging and authentic certificate.",
    rating: 5,
  },
  {
    authorName: "Neha Gupta",
    title: "Stunning gemstone pendant",
    body: "The Emerald gemstone ring I bought is absolutely clear and gorgeous. Looking forward to ordering more planetary combinations in the future.",
    rating: 5,
  }
];

async function main() {
  console.log("Fetching products from database...");
  const products = await prisma.product.findMany({
    take: 15,
    select: { id: true, name: true, slug: true },
  });

  if (products.length === 0) {
    console.error("No products found in the database. Please seed products first.");
    return;
  }

  console.log(`Found ${products.length} products. Seeding reviews...`);

  let count = 0;
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const review1 = SAMPLE_REVIEWS[(i * 2) % SAMPLE_REVIEWS.length];
    const review2 = SAMPLE_REVIEWS[(i * 2 + 1) % SAMPLE_REVIEWS.length];

    const reviewsToSeed = [review1, review2];

    for (const rev of reviewsToSeed) {
      try {
        await prisma.review.create({
          data: {
            productId: product.id,
            authorName: rev.authorName,
            title: rev.title,
            body: rev.body,
            rating: rev.rating,
          },
        });
        count++;
      } catch (err) {
        // Skip duplicate errors if they arise
      }
    }

    const agg = await prisma.review.aggregate({
      where: { productId: product.id },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await prisma.product.update({
      where: { id: product.id },
      data: {
        ratingAvg: agg._avg.rating ?? 0,
        ratingCount: agg._count.rating,
      },
    });
  }

  console.log(`Successfully seeded ${count} reviews!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
