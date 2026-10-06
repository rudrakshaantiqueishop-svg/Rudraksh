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
  const tempDir = path.join(__dirname, "../temp_wedn");
  const rawPath1 = path.join(tempDir, "img1.jpg");
  const rawPath2 = path.join(tempDir, "img2.jpg");

  const optPath1 = path.join(tempDir, "what_energisation_does_not.webp");
  const optPath2 = path.join(tempDir, "energisation_choice_and_consent.webp");

  console.log("Optimizing img1 with sharp...");
  await sharp(rawPath1)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(optPath1);

  console.log("Optimizing img2 with sharp...");
  await sharp(rawPath2)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(optPath2);

  console.log("Uploading img1 to Cloudinary...");
  const res1 = await cloudinary.uploader.upload(optPath1, {
    folder: "rudraksh/energisation",
    public_id: "energisation-what-it-does-not",
    overwrite: true,
    resource_type: "image",
    format: "webp",
  });
  console.log("Uploaded Image 1 URL:", res1.secure_url);

  console.log("Uploading img2 to Cloudinary...");
  const res2 = await cloudinary.uploader.upload(optPath2, {
    folder: "rudraksh/energisation",
    public_id: "energisation-choice-and-consent",
    overwrite: true,
    resource_type: "image",
    format: "webp",
  });
  console.log("Uploaded Image 2 URL:", res2.secure_url);

  console.log("\n--- RESULT CLOUDINARY URLS ---");
  console.log("URL_1 (What Does Not):", res1.secure_url);
  console.log("URL_2 (Choice & Consent):", res2.secure_url);

  // Clean up
  fs.rmSync(tempDir, { recursive: true, force: true });
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
