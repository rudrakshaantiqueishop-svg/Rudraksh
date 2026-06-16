"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
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
  };
}

export async function createBlog(
  _prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  await requireAdmin();

  const result = blogSchema.safeParse(parseBlogFormData(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: "Please fix the errors below." };
  }

  const { categoryId, ...data } = result.data;

  try {
    await prisma.blog.create({
      data: { ...data, categoryId: categoryId ?? null },
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
  await requireAdmin();

  const result = blogSchema.safeParse(parseBlogFormData(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: "Please fix the errors below." };
  }

  const { categoryId, ...data } = result.data;

  try {
    await prisma.blog.update({
      where: { id },
      data: { ...data, categoryId: categoryId ?? null },
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

export async function deleteBlog(id: string): Promise<void> {
  await requireAdmin();
  await prisma.blog.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
