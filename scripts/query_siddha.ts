import 'dotenv/config';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const cat = await prisma.category.findUnique({
    where: { slug: 'siddha-mala' },
    select: { pageContent: true }
  });
  console.log(JSON.stringify(cat?.pageContent, null, 2));
}
main().finally(() => prisma.$disconnect());
