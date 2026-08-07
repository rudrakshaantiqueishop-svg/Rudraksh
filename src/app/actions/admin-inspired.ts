"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";

export type FormState = { errors?: Record<string, string[] | undefined>; message?: string } | undefined;

export async function createInspiredItem(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const type = (formData.get("type") as string)?.trim() || "video";
  const videoUrl = (formData.get("videoUrl") as string)?.trim() || null;
  const imageUrl = (formData.get("imageUrl") as string)?.trim();
  const productImageUrl = (formData.get("productImageUrl") as string)?.trim() || imageUrl || null;
  const price = (formData.get("price") as string)?.trim() || null;
  const originalPrice = (formData.get("originalPrice") as string)?.trim() || null;
  const productId = (formData.get("productId") as string)?.trim() || null;
  const isActive = formData.get("isActive") === "true" || formData.get("isActive") === "on";
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);

  const errors: Record<string, string[]> = {};
  if (!title) errors.title = ["Title is required"];
  if (!imageUrl) errors.imageUrl = ["Cover Image URL is required"];

  if (Object.keys(errors).length > 0) {
    return { errors, message: "Please fix the errors below." };
  }

  try {
    await prisma.inspiredItem.create({
      data: {
        title,
        type,
        videoUrl,
        imageUrl,
        productImageUrl,
        price,
        originalPrice,
        productId,
        isActive,
        sortOrder,
      },
    });
  } catch (err) {
    console.error("Failed to create inspired item:", err);
    return { message: "Failed to create item. Please try again." };
  }

  revalidatePath("/admin/inspired");
  revalidatePath("/");
  redirect("/admin/inspired");
}

export async function updateInspiredItem(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const type = (formData.get("type") as string)?.trim() || "video";
  const videoUrl = (formData.get("videoUrl") as string)?.trim() || null;
  const imageUrl = (formData.get("imageUrl") as string)?.trim();
  const productImageUrl = (formData.get("productImageUrl") as string)?.trim() || imageUrl || null;
  const price = (formData.get("price") as string)?.trim() || null;
  const originalPrice = (formData.get("originalPrice") as string)?.trim() || null;
  const productId = (formData.get("productId") as string)?.trim() || null;
  const isActive = formData.get("isActive") === "true" || formData.get("isActive") === "on";
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);

  const errors: Record<string, string[]> = {};
  if (!title) errors.title = ["Title is required"];
  if (!imageUrl) errors.imageUrl = ["Cover Image URL is required"];

  if (Object.keys(errors).length > 0) {
    return { errors, message: "Please fix the errors below." };
  }

  try {
    await prisma.inspiredItem.update({
      where: { id },
      data: {
        title,
        type,
        videoUrl,
        imageUrl,
        productImageUrl,
        price,
        originalPrice,
        productId,
        isActive,
        sortOrder,
      },
    });
  } catch (err) {
    console.error("Failed to update inspired item:", err);
    return { message: "Failed to update item. Please try again." };
  }

  revalidatePath("/admin/inspired");
  revalidatePath("/");
  redirect("/admin/inspired");
}

export async function deleteInspiredItem(id: string) {
  await requireAdmin();
  try {
    await prisma.inspiredItem.delete({ where: { id } });
    revalidatePath("/admin/inspired");
    revalidatePath("/");
  } catch (err) {
    console.error("Failed to delete inspired item:", err);
  }
}
