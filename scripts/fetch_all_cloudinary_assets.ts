import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function fetchAll() {
  console.log("Fetching all Cloudinary resources...");
  const allResources: Record<string, { public_id: string; secure_url: string; format: string; bytes: number }> = {};
  let nextCursor: string | undefined = undefined;
  let page = 0;

  do {
    page++;
    console.log(`Fetching page ${page}...`);
    const res: any = await cloudinary.api.resources({
      max_results: 500,
      next_cursor: nextCursor,
      type: "upload",
    });

    for (const r of res.resources) {
      allResources[r.public_id] = {
        public_id: r.public_id,
        secure_url: r.secure_url,
        format: r.format,
        bytes: r.bytes,
      };
    }

    nextCursor = res.next_cursor;
  } while (nextCursor);

  console.log(`Total Cloudinary resources fetched: ${Object.keys(allResources).length}`);
  const outPath = join(process.cwd(), "scripts", "cloudinary_assets_cache.json");
  writeFileSync(outPath, JSON.stringify(allResources, null, 2), "utf8");
  console.log(`Saved cache to ${outPath}`);
}

fetchAll().catch(console.error);
