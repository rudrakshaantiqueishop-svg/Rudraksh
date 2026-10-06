import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const items = [
  {
    name: "beyond-rishikesh-temple-ghat",
    inputPath: "C:/Users/bijal/.gemini/antigravity-ide/brain/8dd413b4-99b3-483c-b813-184d2d8588c7/.user_uploaded/media_1790976182487.jpg",
    publicId: "beyond-rishikesh-parmarth-niketan",
  },
  {
    name: "beyond-rishikesh-ganga-meditation",
    inputPath: "C:/Users/bijal/.gemini/antigravity-ide/brain/8dd413b4-99b3-483c-b813-184d2d8588c7/.user_uploaded/media_1790976154511.jpg",
    publicId: "beyond-rishikesh-ganga-aarti-ghat",
  },
];

async function main() {
  const tempDir = path.join(__dirname, "../temp_drive_thumbs");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const results: Record<string, string> = {};

  for (const item of items) {
    const optPath = path.join(tempDir, `${item.name}_opt.webp`);
    console.log(`Optimizing ${item.name}...`);
    await sharp(item.inputPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(optPath);

    const stat = fs.statSync(optPath);
    console.log(`Optimized ${item.name}: ${(stat.size / 1024).toFixed(1)} KB`);

    console.log(`Uploading ${item.name} to Cloudinary...`);
    const res = await cloudinary.uploader.upload(optPath, {
      folder: "rudraksh/contact",
      public_id: item.publicId,
      overwrite: true,
      resource_type: "image",
      format: "webp",
    });

    console.log(`Uploaded ${item.name}: ${res.secure_url}`);
    results[item.name] = res.secure_url;
  }

  console.log("\nResults:\n", JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
