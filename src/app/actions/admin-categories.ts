"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { categorySchema, subcategorySchema } from "@/lib/validations/admin-category";
import { buildPageContent } from "@/lib/category-content";
import type { CategoryPageContent } from "@/lib/product-utils";

export type FormState = { errors?: Record<string, string[] | undefined>; message?: string } | undefined;

function parseCategory(formData: FormData) {
  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    image: formData.get("image"),
    sortOrder: formData.get("sortOrder") ?? 0,
    heroTitle: formData.get("heroTitle"),
    heroSubtitle: formData.get("heroSubtitle"),
    introHeading: formData.get("introHeading"),
    introDescription: formData.get("introDescription"),
  };
}

// ── Categories ─────────────────────────────────────────────────────────

export async function createCategory(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const result = categorySchema.safeParse(parseCategory(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: "Please fix the errors below." };
  }
  const d = result.data;
  const pageContent = buildPageContent(d);

  try {
    await prisma.category.create({
      data: {
        name: d.name,
        slug: d.slug,
        image: d.image,
        sortOrder: d.sortOrder,
        pageContent: pageContent as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { message: "A category with this slug already exists." };
    }
    throw err;
  }

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  redirect("/admin/categories");
}

export async function updateCategory(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const result = categorySchema.safeParse(parseCategory(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: "Please fix the errors below." };
  }
  const d = result.data;

  const existing = await prisma.category.findUnique({ where: { id }, select: { pageContent: true } });
  const pageContent = buildPageContent(d, (existing?.pageContent as Partial<CategoryPageContent>) ?? undefined);

  try {
    await prisma.category.update({
      where: { id },
      data: {
        name: d.name,
        slug: d.slug,
        image: d.image,
        sortOrder: d.sortOrder,
        pageContent: pageContent as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { message: "A category with this slug already exists." };
    }
    throw err;
  }

  revalidatePath("/admin/categories");
  revalidatePath(`/products/category/${d.slug}`);
  redirect("/admin/categories");
}

export async function deleteCategory(id: string): Promise<void> {
  await requireAdmin();
  const count = await prisma.product.count({ where: { categoryId: id } });
  if (count > 0) {
    // Categories with products cannot be deleted (products require a category).
    return;
  }
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/products");
}

// ── Subcategories ──────────────────────────────────────────────────────

function parseSubcategory(formData: FormData) {
  const group = formData.get("group");
  return {
    categoryId: formData.get("categoryId"),
    name: formData.get("name"),
    slug: formData.get("slug"),
    image: formData.get("image"),
    group: group && String(group).trim() !== "" ? String(group).trim() : null,
    sortOrder: formData.get("sortOrder") ?? 0,
  };
}

export async function createSubcategory(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const result = subcategorySchema.safeParse(parseSubcategory(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: "Please fix the errors below." };
  }
  const d = result.data;

  try {
    await prisma.subcategory.create({
      data: {
        categoryId: d.categoryId,
        name: d.name,
        slug: d.slug,
        image: d.image,
        group: d.group ?? null,
        sortOrder: d.sortOrder,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { message: "A subcategory with this slug already exists in this category." };
    }
    throw err;
  }

  revalidatePath(`/admin/categories/${d.categoryId}/edit`);
  revalidatePath("/products");
  redirect(`/admin/categories/${d.categoryId}/edit`);
}

export async function updateSubcategory(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const result = subcategorySchema.safeParse(parseSubcategory(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: "Please fix the errors below." };
  }
  const d = result.data;

  try {
    await prisma.subcategory.update({
      where: { id },
      data: {
        name: d.name,
        slug: d.slug,
        image: d.image,
        group: d.group ?? null,
        sortOrder: d.sortOrder,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { message: "A subcategory with this slug already exists in this category." };
    }
    throw err;
  }

  revalidatePath(`/admin/categories/${d.categoryId}/edit`);
  revalidatePath("/products");
  redirect(`/admin/categories/${d.categoryId}/edit`);
}

export async function deleteSubcategory(id: string): Promise<void> {
  await requireAdmin();
  // Products keep their category (subcategoryId is set null by the FK).
  const sub = await prisma.subcategory.findUnique({ where: { id }, select: { categoryId: true } });
  await prisma.subcategory.delete({ where: { id } });
  if (sub) revalidatePath(`/admin/categories/${sub.categoryId}/edit`);
  revalidatePath("/products");
}
