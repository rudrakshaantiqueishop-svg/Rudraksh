"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";

export type FormState = { errors?: Record<string, string[] | undefined>; message?: string } | undefined;

// The storefront looks banners up by `key`, so it is generated from the name
// rather than typed, and never changes once the banner exists.
function toKey(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

// A banner with the generated key may already exist; append a counter until free.
async function uniqueKey(base: string): Promise<string> {
  const root = base || "banner";
  let candidate = root;
  for (let n = 2; await prisma.banner.findUnique({ where: { key: candidate } }); n++) {
    candidate = `${root}_${n}`;
  }
  return candidate;
}

async function nextBannerSortOrder(): Promise<number> {
  const { _max } = await prisma.banner.aggregate({ _max: { sortOrder: true } });
  return (_max.sortOrder ?? -1) + 1;
}

export async function createBanner(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

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

  const errors: Record<string, string[]> = {};
  if (!name) errors.name = ["Name is required"];
  if (!title) errors.title = ["Title is required"];
  if (!imageUrl) errors.imageUrl = ["Please upload a background image"];

  if (Object.keys(errors).length > 0) {
    return { errors, message: "Please fix the errors below." };
  }

  try {
    await prisma.banner.create({
      data: {
        key: await uniqueKey(toKey(name)),
        sortOrder: await nextBannerSortOrder(),
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
      },
    });
  } catch (err: unknown) {
    const error = err as { code?: string };
    if (error?.code === "P2002") {
      return { message: "A banner with this name already exists." };
    }
    return { message: "Failed to create banner. Please try again." };
  }

  revalidatePath("/admin/banners");
  revalidatePath("/");
  redirect("/admin/banners");
}

export async function updateBanner(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

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

  const errors: Record<string, string[]> = {};
  if (!name) errors.name = ["Name is required"];
  if (!title) errors.title = ["Title is required"];
  if (!imageUrl) errors.imageUrl = ["Please upload a background image"];

  if (Object.keys(errors).length > 0) {
    return { errors, message: "Please fix the errors below." };
  }

  try {
    await prisma.banner.update({
      where: { id },
      data: {
        // `key` and `sortOrder` are deliberately not updatable here: the key is
        // what the storefront looks the banner up by, and order comes from the
        // arrows on the banners list.
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
      },
    });
  } catch (err: unknown) {
    console.error("Failed to update banner:", err);
    return { message: "Failed to update banner. Please try again." };
  }

  revalidatePath("/admin/banners");
  revalidatePath("/");
  redirect("/admin/banners");
}

// Reorders by list position and renumbers every row, so it stays correct even
// though seeded banners all share sortOrder 0.
async function moveBanner(id: string, direction: -1 | 1): Promise<void> {
  const banners = await prisma.banner.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true },
  });

  const index = banners.findIndex((b) => b.id === id);
  const target = index + direction;
  if (index === -1 || target < 0 || target >= banners.length) return;

  [banners[index], banners[target]] = [banners[target], banners[index]];

  await prisma.$transaction(
    banners.map((b, i) => prisma.banner.update({ where: { id: b.id }, data: { sortOrder: i } }))
  );

  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function moveBannerUp(id: string): Promise<void> {
  await requireAdmin();
  await moveBanner(id, -1);
}

export async function moveBannerDown(id: string): Promise<void> {
  await requireAdmin();
  await moveBanner(id, 1);
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
