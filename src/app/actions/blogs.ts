"use server";

import { getBlogsPaginated } from "@/lib/blogs";

export async function fetchBlogs(categorySlug: string | undefined, skip: number, take: number) {
  return getBlogsPaginated({ categorySlug, skip, take: Math.min(take, 12) });
}
