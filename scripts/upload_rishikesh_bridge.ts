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

async function main() {
  const inputPath = "C:/Users/bijal/.gemini/antigravity-ide/brain/8dd413b4-99b3-483c-b813-184d2d8588c7/.user_uploaded/media_1790975438664.jpg";
  const tempDir = path.join(__dirname, "../temp_drive_thumbs");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const optPath = path.join(tempDir, "rishikesh_bridge_night_opt.webp");

  console.log("Optimizing bridge night image...");
  await sharp(inputPath)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(optPath);

  const optStat = fs.statSync(optPath);
  console.log(`Optimized image size: ${(optStat.size / 1024).toFixed(1)} KB`);

  console.log("Uploading to Cloudinary...");
  const res = await cloudinary.uploader.upload(optPath, {
    folder: "rudraksh/contact",
    public_id: "rishikesh-bridge-night",
    overwrite: true,
    resource_type: "image",
    format: "webp",
  });

  console.log("Uploaded successfully!");
  console.log("Secure URL:", res.secure_url);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
