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

// Blank optional inputs arrive as "" from FormData; treat them as "not provided"
// so the schema's optional fields fall through to generated defaults.
function optional(value: FormDataEntryValue | null): string | undefined {
  const text = typeof value === "string" ? value.trim() : "";
  return text === "" ? undefined : text;
}

function parseCategory(formData: FormData) {
  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    image: formData.get("image"),
    isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
    heroTitle: optional(formData.get("heroTitle")),
    heroSubtitle: optional(formData.get("heroSubtitle")),
    introHeading: optional(formData.get("introHeading")),
    introDescription: optional(formData.get("introDescription")),
  };
}

// Display order is never typed by hand — new rows go to the end of the list and
// the admin reorders with the up/down arrows on the listing page.
async function nextCategorySortOrder(): Promise<number> {
  const { _max } = await prisma.category.aggregate({ _max: { sortOrder: true } });
  return (_max.sortOrder ?? -1) + 1;
}

async function nextSubcategorySortOrder(categoryId: string): Promise<number> {
  const { _max } = await prisma.subcategory.aggregate({
    where: { categoryId },
    _max: { sortOrder: true },
  });
  return (_max.sortOrder ?? -1) + 1;
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
        sortOrder: await nextCategorySortOrder(),
        isActive: d.isActive ?? true,
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
        // sortOrder is intentionally untouched — it is owned by the reorder arrows.
        isActive: d.isActive ?? true,
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

export async function toggleCategoryActive(id: string, currentIsActive: boolean): Promise<void> {
  await requireAdmin();
  try {
    const updated = await prisma.category.update({
      where: { id },
      data: { isActive: !currentIsActive },
      select: { slug: true },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    revalidatePath(`/products/category/${updated.slug}`);
    revalidatePath("/");
  } catch (err) {
    console.error("Failed to toggle category active status:", err);
  }
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

// Swaps a row with its neighbour by position in the ordered list, then rewrites
// every sortOrder to 0..n-1. Working by position rather than by comparing
// sortOrder values keeps reordering correct even when rows share a value
// (e.g. rows created before ordering was automatic, which all sat at 0).
async function moveCategory(id: string, direction: -1 | 1): Promise<void> {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: { id: true },
  });

  const index = categories.findIndex((c) => c.id === id);
  const target = index + direction;
  if (index === -1 || target < 0 || target >= categories.length) return;

  [categories[index], categories[target]] = [categories[target], categories[index]];

  await prisma.$transaction(
    categories.map((c, i) => prisma.category.update({ where: { id: c.id }, data: { sortOrder: i } }))
  );

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function moveCategoryUp(id: string): Promise<void> {
  await requireAdmin();
  await moveCategory(id, -1);
}

export async function moveCategoryDown(id: string): Promise<void> {
  await requireAdmin();
  await moveCategory(id, 1);
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
        sortOrder: await nextSubcategorySortOrder(d.categoryId),
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { message: "A subcategory with this web address already exists in this category." };
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
        // sortOrder is owned by the reorder arrows on the category edit page.
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { message: "A subcategory with this web address already exists in this category." };
    }
    throw err;
  }

  revalidatePath(`/admin/categories/${d.categoryId}/edit`);
  revalidatePath("/products");
  redirect(`/admin/categories/${d.categoryId}/edit`);
}

async function moveSubcategory(id: string, direction: -1 | 1): Promise<void> {
  const sub = await prisma.subcategory.findUnique({ where: { id }, select: { categoryId: true } });
  if (!sub) return;

  const siblings = await prisma.subcategory.findMany({
    where: { categoryId: sub.categoryId },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: { id: true },
  });

  const index = siblings.findIndex((s) => s.id === id);
  const target = index + direction;
  if (index === -1 || target < 0 || target >= siblings.length) return;

  [siblings[index], siblings[target]] = [siblings[target], siblings[index]];

  await prisma.$transaction(
    siblings.map((s, i) => prisma.subcategory.update({ where: { id: s.id }, data: { sortOrder: i } }))
  );

  revalidatePath(`/admin/categories/${sub.categoryId}/edit`);
  revalidatePath("/products");
}

export async function moveSubcategoryUp(id: string): Promise<void> {
  await requireAdmin();
  await moveSubcategory(id, -1);
}

export async function moveSubcategoryDown(id: string): Promise<void> {
  await requireAdmin();
  await moveSubcategory(id, 1);
}

export async function deleteSubcategory(id: string): Promise<void> {
  await requireAdmin();
  // Products keep their category (subcategoryId is set null by the FK).
  const sub = await prisma.subcategory.findUnique({ where: { id }, select: { categoryId: true } });
  await prisma.subcategory.delete({ where: { id } });
  if (sub) revalidatePath(`/admin/categories/${sub.categoryId}/edit`);
  revalidatePath("/products");
}
