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
  const rawPath = path.join(__dirname, "../temp_check/user_step2.jpg");
  const optPath = path.join(__dirname, "../temp_check/energisation_step_2_opt.webp");

  console.log("Optimizing step 2 image with sharp...");
  await sharp(rawPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(optPath);

  const optStat = fs.statSync(optPath);
  console.log(`Optimized size: ${(optStat.size / 1024).toFixed(1)} KB`);

  console.log("Uploading step 2 image to Cloudinary...");
  const res = await cloudinary.uploader.upload(optPath, {
    folder: "rudraksh/energisation",
    public_id: "energisation-step-2-cleansing-handling",
    overwrite: true,
    resource_type: "image",
    format: "webp",
  });

  console.log("\n--- RESULT CLOUDINARY URL ---");
  console.log("STEP_2_URL:", res.secure_url);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
