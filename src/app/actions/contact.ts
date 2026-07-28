"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { revalidatePath } from "next/cache";

export async function submitContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false, error: "Name, email, subject, and message are required fields." };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Contact form submission error:", err);
    return { success: false, error: "An error occurred while submitting your message." };
  }
}

export async function deleteContactMessage(id: string) {
  await requireAdmin();

  try {
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath("/admin/contact-messages");
  } catch (error) {
    console.error("Failed to delete contact message:", error);
    throw error;
  }
}
