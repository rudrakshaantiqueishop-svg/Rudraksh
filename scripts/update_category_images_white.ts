import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function uploadAndSetImage(categorySlug: string, localFilePath: string, publicId: string) {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "rudraksh/home",
      public_id: publicId,
      overwrite: true,
      resource_type: "image",
      format: "webp",
      transformation: [{ quality: "auto" }],
    });
    
    console.log(`Uploaded ${categorySlug} image successfully:`, result.secure_url);
    
    await prisma.category.update({
      where: { slug: categorySlug },
      data: { image: result.secure_url }
    });
    console.log(`Updated ${categorySlug} category in DB.`);
    
  } catch (err) {
    console.error(`Failed for ${categorySlug}:`, err);
  }
}

async function main() {
  const idolsImage = "C:\\Users\\bijal\\.gemini\\antigravity-ide\\brain\\4b4c2848-6cc0-464a-9956-6fa46c3a0f2f\\idols_bowls_white_1790540214180.jpg";
  const sphatikImage = "C:\\Users\\bijal\\.gemini\\antigravity-ide\\brain\\4b4c2848-6cc0-464a-9956-6fa46c3a0f2f\\sphatik_mala_white_1790540227039.jpg";

  await uploadAndSetImage('idols-singing-bowls', idolsImage, 'idols-singing-bowls-hero');
  await uploadAndSetImage('sphatik-collection', sphatikImage, 'sphatik-collection-hero');
}

main().finally(() => prisma.$disconnect());
