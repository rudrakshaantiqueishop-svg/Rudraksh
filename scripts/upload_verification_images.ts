import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const branchImg = "C:/Users/bijal/.gemini/antigravity-ide/brain/7f28c6ef-e17a-4711-9957-83af4237664d/.user_uploaded/media_1790884485267.jpg";
const palmImg = "C:/Users/bijal/.gemini/antigravity-ide/brain/7f28c6ef-e17a-4711-9957-83af4237664d/.user_uploaded/media_1790884581086.jpg";

async function upload() {
  console.log("Uploading branch image...");
  const res1 = await cloudinary.uploader.upload(branchImg, {
    folder: "rudraksh/verification",
    public_id: "rudraksha-branch-authenticity",
    overwrite: true,
    resource_type: "image",
    format: "webp",
    transformation: [{ quality: "auto" }],
  });
  console.log("Uploaded branch image:", res1.secure_url);

  console.log("Uploading palm image...");
  const res2 = await cloudinary.uploader.upload(palmImg, {
    folder: "rudraksh/verification",
    public_id: "rudraksha-palm-authenticity",
    overwrite: true,
    resource_type: "image",
    format: "webp",
    transformation: [{ quality: "auto" }],
  });
  console.log("Uploaded palm image:", res2.secure_url);

  return { res1: res1.secure_url, res2: res2.secure_url };
}

upload().catch(err => {
  console.error("Upload error:", err);
  process.exit(1);
});
