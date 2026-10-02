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
    name: "sourcing-and-origin",
    driveId: "1_PDkt5QebzulKbfJqp_elsu72edLLEF1",
    publicId: "sourcing-and-origin",
  },
  {
    name: "handling-with-respect",
    driveId: "1WN8bBHc6A-msQfpFvr9iSPS4epqsNDqk",
    publicId: "handling-with-respect",
  },
  {
    name: "our-responsibility",
    driveId: "1NXQhtZ5o2PnuYOPdHBl_77iVgkjcz5uU",
    publicId: "our-responsibility",
  },
];

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
  const results: Record<string, string> = {};

  for (const item of items) {
    const optPath = await downloadAndOptimize(item.driveId, item.name);
    console.log(`Uploading ${item.name} to Cloudinary...`);
    const res = await cloudinary.uploader.upload(optPath, {
      folder: "rudraksh/authenticity",
      public_id: item.publicId,
      overwrite: true,
      resource_type: "image",
      format: "webp",
    });
    console.log(`Uploaded ${item.name}: ${res.secure_url}`);
    results[item.name] = res.secure_url;
  }

  console.log("\nAll Done!");
  console.log(JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
