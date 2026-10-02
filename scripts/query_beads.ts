import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

prisma.product.findFirst({
  where: { name: { contains: '1008 Beads' } },
  include: { images: true }
}).then(p => {
  console.log(JSON.stringify(p?.images, null, 2));
  process.exit(0);
});
