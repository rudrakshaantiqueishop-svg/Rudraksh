"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";

export type FormState = { errors?: Record<string, string[] | undefined>; message?: string } | undefined;

export async function createBanner(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const key = (formData.get("key") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const titleHighlight = (formData.get("titleHighlight") as string)?.trim() || null;
  const subtitle = (formData.get("subtitle") as string)?.trim() || null;
  const imageUrl = (formData.get("imageUrl") as string)?.trim();
  const ctaText = (formData.get("ctaText") as string)?.trim() || "SHOP NOW";
  const ctaLink = (formData.get("ctaLink") as string)?.trim() || "#";
  const gradientFrom = (formData.get("gradientFrom") as string)?.trim() || "#298FC2";
  const gradientTo = (formData.get("gradientTo") as string)?.trim() || "#FFFFFF";
  const isActive = formData.get("isActive") === "true" || formData.get("isActive") === "on";
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);

  const errors: Record<string, string[]> = {};
  if (!key) errors.key = ["Key is required"];
  if (!name) errors.name = ["Name is required"];
  if (!title) errors.title = ["Title is required"];
  if (!imageUrl) errors.imageUrl = ["Image URL is required"];

  if (Object.keys(errors).length > 0) {
    return { errors, message: "Please fix the errors below." };
  }

  try {
    await prisma.banner.create({
      data: {
        key,
        name,
        title,
        titleHighlight,
        subtitle,
        imageUrl,
        ctaText,
        ctaLink,
        gradientFrom,
        gradientTo,
        isActive,
        sortOrder,
      },
    });
  } catch (err: unknown) {
    const error = err as { code?: string };
    if (error?.code === "P2002") {
      return { message: "A banner with this key already exists." };
    }
    return { message: "Failed to create banner. Please try again." };
  }

  revalidatePath("/admin/banners");
  revalidatePath("/");
  redirect("/admin/banners");
}

export async function updateBanner(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const key = (formData.get("key") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const titleHighlight = (formData.get("titleHighlight") as string)?.trim() || null;
  const subtitle = (formData.get("subtitle") as string)?.trim() || null;
  const imageUrl = (formData.get("imageUrl") as string)?.trim();
  const ctaText = (formData.get("ctaText") as string)?.trim() || "SHOP NOW";
  const ctaLink = (formData.get("ctaLink") as string)?.trim() || "#";
  const gradientFrom = (formData.get("gradientFrom") as string)?.trim() || "#298FC2";
  const gradientTo = (formData.get("gradientTo") as string)?.trim() || "#FFFFFF";
  const isActive = formData.get("isActive") === "true" || formData.get("isActive") === "on";
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);

  const errors: Record<string, string[]> = {};
  if (!key) errors.key = ["Key is required"];
  if (!name) errors.name = ["Name is required"];
  if (!title) errors.title = ["Title is required"];
  if (!imageUrl) errors.imageUrl = ["Image URL is required"];

  if (Object.keys(errors).length > 0) {
    return { errors, message: "Please fix the errors below." };
  }

  try {
    await prisma.banner.update({
      where: { id },
      data: {
        key,
        name,
        title,
        titleHighlight,
        subtitle,
        imageUrl,
        ctaText,
        ctaLink,
        gradientFrom,
        gradientTo,
        isActive,
        sortOrder,
      },
    });
  } catch (err: unknown) {
    const error = err as { code?: string };
    if (error?.code === "P2002") {
      return { message: "A banner with this key already exists." };
    }
    return { message: "Failed to update banner. Please try again." };
  }

  revalidatePath("/admin/banners");
  revalidatePath("/");
  redirect("/admin/banners");
}

export async function deleteBanner(id: string) {
  await requireAdmin();
  try {
    await prisma.banner.delete({ where: { id } });
    revalidatePath("/admin/banners");
    revalidatePath("/");
  } catch (err) {
    console.error("Failed to delete banner:", err);
  }
}
