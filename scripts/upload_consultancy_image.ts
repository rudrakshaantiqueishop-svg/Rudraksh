import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function main() {
  const filePath = "C:\\Users\\bijal\\.gemini\\antigravity-ide\\brain\\4b4c2848-6cc0-464a-9956-6fa46c3a0f2f\\.user_uploaded\\media_1790539238374.png";
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "rudraksh/home",
      public_id: "consultancy-hero",
      overwrite: true,
      resource_type: "image",
      format: "webp",
      transformation: [{ quality: "auto" }],
    });
    console.log("Uploaded successfully:", result.secure_url);
  } catch (err) {
    console.error("Upload failed:", err);
  }
}

main();
