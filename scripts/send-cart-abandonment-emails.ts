import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { sendAbandonedCartEmail } from "../src/lib/email";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Searching for active shopping carts...");

  // Find all carts that have at least one item
  const activeCarts = await prisma.cart.findMany({
    where: {
      items: {
        some: {},
      },
    },
    include: {
      user: true,
      items: {
        include: {
          product: {
            include: {
              images: {
                where: { role: "MAIN" },
                take: 1,
              },
            },
          },
        },
      },
    },
  });

  console.log(`Found ${activeCarts.length} active carts in the system.`);

  let emailCount = 0;
  for (const cart of activeCarts) {
    if (!cart.user || !cart.user.email) {
      console.log(`Skipping cart ${cart.id} - no associated user email found.`);
      continue;
    }

    const cartItems = cart.items.map((item) => {
      const imageUrl = item.product.images[0]?.url;
      const price = `₹${(item.product.priceCents / 100).toLocaleString("en-IN")}`;
      return {
        name: item.product.name,
        price,
        imageUrl,
      };
    });

    console.log(`Sending cart abandonment email to ${cart.user.email}...`);
    try {
      await sendAbandonedCartEmail(
        cart.user.email,
        cart.user.name || "Valued Customer",
        cartItems
      );
      emailCount++;
    } catch (error) {
      console.error(`Failed to send email to ${cart.user.email}:`, error);
    }
  }

  console.log(`Successfully sent ${emailCount} cart abandonment notifications!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
