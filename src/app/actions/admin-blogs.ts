"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma";
import type { BlogStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { requireStaff, requireAdmin } from "@/lib/dal";
import { blogSchema } from "@/lib/validations/admin-blog";

export type BlogFormState =
  | {
      errors?: Record<string, string[] | undefined>;
      message?: string;
    }
  | undefined;

function parseBlogFormData(formData: FormData) {
  return {
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    body: formData.get("body"),
    coverImage: formData.get("coverImage"),
    author: formData.get("author"),
    readTimeMinutes: formData.get("readTimeMinutes"),
    categoryId: formData.get("categoryId"),
    publishedAt: formData.get("publishedAt"),
    status: formData.get("status"),
    tags: formData.get("tags"),
    metaTitle: formData.get("metaTitle"),
    metaDescription: formData.get("metaDescription"),
  };
}

// Writers may never publish directly — the strongest state they can set is
// REVIEW, which puts the post in the admin approval queue.
function resolveStatusOnCreate(role: string, requested: BlogStatus): BlogStatus {
  if (role === "WRITER" && requested === "PUBLISHED") return "REVIEW";
  return requested;
}

export async function createBlog(
  _prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const staff = await requireStaff();

  const result = blogSchema.safeParse(parseBlogFormData(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: "Please fix the errors below." };
  }

  const { categoryId, status, metaTitle, metaDescription, ...data } = result.data;
  const effectiveStatus = resolveStatusOnCreate(staff.role, status);

  try {
    await prisma.blog.create({
      data: {
        ...data,
        categoryId: categoryId ?? null,
        status: effectiveStatus,
        metaTitle: metaTitle ?? null,
        metaDescription: metaDescription ?? null,
        authorId: staff.id,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { message: "A blog post with this slug already exists." };
    }
    throw err;
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlog(
  id: string,
  _prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const staff = await requireStaff();

  const existing = await prisma.blog.findUnique({ where: { id }, select: { status: true } });
  if (!existing) {
    return { message: "This blog post no longer exists." };
  }

  const result = blogSchema.safeParse(parseBlogFormData(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: "Please fix the errors below." };
  }

  const { categoryId, status, metaTitle, metaDescription, ...data } = result.data;

  // Writers can't publish, and can't unpublish an already-live post.
  let effectiveStatus: BlogStatus = status;
  if (staff.role === "WRITER") {
    if (existing.status === "PUBLISHED") effectiveStatus = "PUBLISHED";
    else if (status === "PUBLISHED") effectiveStatus = "REVIEW";
  }

  try {
    await prisma.blog.update({
      where: { id },
      data: {
        ...data,
        categoryId: categoryId ?? null,
        status: effectiveStatus,
        metaTitle: metaTitle ?? null,
        metaDescription: metaDescription ?? null,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { message: "A blog post with this slug already exists." };
    }
    throw err;
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/blog");
}

// Admin-only quick action from the review queue: approve and publish a post.
export async function publishBlog(id: string): Promise<void> {
  await requireAdmin();
  await prisma.blog.update({ where: { id }, data: { status: "PUBLISHED" } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

// Admin-only: send a published/draft post back to the review state.
export async function unpublishBlog(id: string): Promise<void> {
  await requireAdmin();
  await prisma.blog.update({ where: { id }, data: { status: "DRAFT" } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function deleteBlog(id: string): Promise<void> {
  // Only admins can permanently delete posts.
  await requireAdmin();
  await prisma.blog.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
