import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const body = await req.json() as Record<string, string>;
    const { paramsToSign } = body;

    if (!paramsToSign || typeof paramsToSign !== "object") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET!);
    return NextResponse.json({ signature });
  } catch (error) {
    console.error("Public Cloudinary sign error:", error);
    return NextResponse.json({ error: "Failed to sign" }, { status: 500 });
  }
}
