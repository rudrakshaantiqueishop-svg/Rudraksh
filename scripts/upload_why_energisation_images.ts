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
  const tempDir = path.join(__dirname, "../temp_drive_thumbs");
  const rawPath1 = path.join(tempDir, "why_1.jpg");
  const rawPath2 = path.join(tempDir, "why_2.jpg");

  const optPath1 = path.join(tempDir, "why_energisation_mala.webp");
  const optPath2 = path.join(tempDir, "why_energisation_bracelet.webp");

  console.log("Optimizing why_1 with sharp...");
  await sharp(rawPath1)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(optPath1);

  console.log("Optimizing why_2 with sharp...");
  await sharp(rawPath2)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(optPath2);

  console.log("Uploading image 1 (mala) to Cloudinary...");
  const res1 = await cloudinary.uploader.upload(optPath1, {
    folder: "rudraksh/energisation",
    public_id: "why-energisation-mala",
    overwrite: true,
    resource_type: "image",
    format: "webp",
  });
  console.log("Uploaded Image 1 URL:", res1.secure_url);

  console.log("Uploading image 2 (bracelet) to Cloudinary...");
  const res2 = await cloudinary.uploader.upload(optPath2, {
    folder: "rudraksh/energisation",
    public_id: "why-energisation-bracelet",
    overwrite: true,
    resource_type: "image",
    format: "webp",
  });
  console.log("Uploaded Image 2 URL:", res2.secure_url);

  console.log("\n--- RESULT URLS ---");
  console.log("MALA_URL:", res1.secure_url);
  console.log("BRACELET_URL:", res2.secure_url);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
