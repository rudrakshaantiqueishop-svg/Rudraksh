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
  const driveId = "1IZpMUb09rzE_ZeVlQzQuarCvyOR7RDkb";
  const tempDir = path.join(__dirname, "../temp_drive_thumbs");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const rawPath = path.join(tempDir, "when_energisation_raw.jpg");
  const optPath = path.join(tempDir, "when_energisation_opt.webp");

  console.log("Downloading image from Drive...");
  const res = await fetch(`https://lh3.googleusercontent.com/d/${driveId}=s0`);
  if (!res.ok) {
    throw new Error(`Failed to download from Drive: status ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(rawPath, buf);
  console.log(`Downloaded image: ${(buf.length / (1024 * 1024)).toFixed(2)} MB`);

  console.log("Optimizing with sharp...");
  await sharp(rawPath)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(optPath);

  const optStat = fs.statSync(optPath);
  console.log(`Optimized image: ${(optStat.size / 1024).toFixed(1)} KB`);

  console.log("Uploading to Cloudinary...");
  const uploadRes = await cloudinary.uploader.upload(optPath, {
    folder: "rudraksh/energisation",
    public_id: "when-energisation-recommended",
    overwrite: true,
    resource_type: "image",
    format: "webp",
  });

  console.log("\n--- RESULT URL ---");
  console.log("URL:", uploadRes.secure_url);

  // Clean up temp
  fs.rmSync(tempDir, { recursive: true, force: true });
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
