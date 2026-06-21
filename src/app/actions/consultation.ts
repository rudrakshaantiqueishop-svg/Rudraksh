"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function submitConsultationRequest(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const dob = formData.get("dob") as string;
  const tob = formData.get("tob") as string;
  const pob = formData.get("pob") as string;
  const appointmentDate = formData.get("appointment") as string;
  const kundaliUrl = formData.get("kundaliUrl") as string;

  if (!name || !email || !phone || !dob || !tob || !pob || !appointmentDate || !kundaliUrl) {
    return { success: false, error: "All fields are required, including the Kundali upload." };
  }

  try {
    await prisma.consultationRequest.create({
      data: {
        name,
        email,
        phone,
        dob,
        tob,
        pob,
        appointmentDate,
        kundaliUrl,
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Consultation request error:", err);
    return { success: false, error: "An error occurred while submitting your request." };
  }
}

export async function deleteConsultationRequest(id: string) {
  await requireAdmin();

  try {
    const request = await prisma.consultationRequest.findUnique({ where: { id } });
    if (!request) return;

    if (request.kundaliUrl && request.kundaliUrl.includes("res.cloudinary.com")) {
      const parts = request.kundaliUrl.split("/upload/");
      if (parts.length === 2) {
        const pathWithVersion = parts[1];
        const pathWithoutVersion = pathWithVersion.replace(/^v\d+\//, "");
        const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, "");
        
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error("Failed to delete Kundali from Cloudinary:", publicId, error);
        }
      }
    }

    await prisma.consultationRequest.delete({ where: { id } });
    revalidatePath("/admin/consultations");
  } catch (error) {
    console.error("Failed to delete consultation request:", error);
    throw error;
  }
}
