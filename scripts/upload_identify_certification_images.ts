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

const driveFile1 = "1DpTMc0g6cq-UlBJADX3j03yo51fzJzBc";
const driveFile2 = "1_oDAuF_QIR_7eK_R1QPsoTrFqHU4zOUi";

async function downloadAndOptimize(driveId: string, name: string): Promise<string> {
  const tempDir = path.join(__dirname, "../temp_drive_thumbs");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const rawPath = path.join(tempDir, `${name}_raw.jpg`);
  const optPath = path.join(tempDir, `${name}_opt.webp`);

  console.log(`Downloading ${name} (driveId: ${driveId})...`);
  const res = await fetch(`https://lh3.googleusercontent.com/d/${driveId}=s0`);
  if (!res.ok) {
    throw new Error(`Failed to download ${name} from Drive: status ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(rawPath, buf);
  console.log(`Downloaded ${name}: ${(buf.length / (1024 * 1024)).toFixed(2)} MB`);

  console.log(`Optimizing ${name} with sharp...`);
  await sharp(rawPath)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(optPath);

  const optStat = fs.statSync(optPath);
  console.log(`Optimized ${name}: ${(optStat.size / 1024).toFixed(1)} KB`);

  return optPath;
}

async function main() {
  const opt1 = await downloadAndOptimize(driveFile1, "identify_cert_1");
  const opt2 = await downloadAndOptimize(driveFile2, "identify_cert_2");

  console.log("Uploading image 1 to Cloudinary...");
  const res1 = await cloudinary.uploader.upload(opt1, {
    folder: "rudraksh/authenticity",
    public_id: "identify-certification-1",
    overwrite: true,
    resource_type: "image",
    format: "webp",
  });
  console.log("Uploaded Image 1 URL:", res1.secure_url);

  console.log("Uploading image 2 to Cloudinary...");
  const res2 = await cloudinary.uploader.upload(opt2, {
    folder: "rudraksh/authenticity",
    public_id: "identify-certification-2",
    overwrite: true,
    resource_type: "image",
    format: "webp",
  });
  console.log("Uploaded Image 2 URL:", res2.secure_url);

  console.log("\nResults:");
  console.log("Image 1:", res1.secure_url);
  console.log("Image 2:", res2.secure_url);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
