"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";

export type FormState = { errors?: Record<string, string[] | undefined>; message?: string } | undefined;

// Display order is never typed by hand — new cards go to the end of the list and
// the admin reorders them with the arrows on the listing page.
async function nextSortOrder(): Promise<number> {
  const { _max } = await prisma.inspiredItem.aggregate({ _max: { sortOrder: true } });
  return (_max.sortOrder ?? -1) + 1;
}

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

  const errors: Record<string, string[]> = {};
  if (!title) errors.title = ["Title is required"];
  if (!imageUrl) errors.imageUrl = ["Please upload a cover image"];

  if (Object.keys(errors).length > 0) {
    return { errors, message: "Please fix the errors below." };
  }

  try {
    await prisma.inspiredItem.create({
      data: {
        sortOrder: await nextSortOrder(),
        title,
        type,
        videoUrl,
        imageUrl,
        productImageUrl,
        price,
        originalPrice,
        productId,
        isActive,
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

  const errors: Record<string, string[]> = {};
  if (!title) errors.title = ["Title is required"];
  if (!imageUrl) errors.imageUrl = ["Please upload a cover image"];

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
        // sortOrder is owned by the reorder arrows on the listing page.
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

// Reorders by list position and renumbers every row, so it stays correct even
// when several rows share the same sortOrder.
async function moveInspiredItem(id: string, direction: -1 | 1): Promise<void> {
  const items = await prisma.inspiredItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true },
  });

  const index = items.findIndex((i) => i.id === id);
  const target = index + direction;
  if (index === -1 || target < 0 || target >= items.length) return;

  [items[index], items[target]] = [items[target], items[index]];

  await prisma.$transaction(
    items.map((item, i) => prisma.inspiredItem.update({ where: { id: item.id }, data: { sortOrder: i } }))
  );

  revalidatePath("/admin/inspired");
  revalidatePath("/");
}

export async function moveInspiredItemUp(id: string): Promise<void> {
  await requireAdmin();
  await moveInspiredItem(id, -1);
}

export async function moveInspiredItemDown(id: string): Promise<void> {
  await requireAdmin();
  await moveInspiredItem(id, 1);
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
