"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, requireAdmin } from "@/lib/dal";
import { reviewSchema } from "@/lib/validations/review";

export type ReviewFormState =
  | { errors?: Record<string, string[] | undefined>; message?: string; success?: boolean }
  | undefined;

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "");
}

export async function createReview(
  productId: string,
  slug: string,
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const user = await requireUser();

  const parsed = reviewSchema.safeParse({
    rating: formData.get("rating"),
    email: formData.get("email"),
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const product = await prisma.product.findUnique({ where: { id: productId }, select: { id: true } });
  if (!product) {
    return { message: "Product not found." };
  }

  const existing = await prisma.review.findFirst({ where: { productId, userId: user.id } });
  if (existing) {
    return { message: "You've already reviewed this product." };
  }

  if (user.email !== parsed.data.email) {
    const existingEmailUser = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });
    if (existingEmailUser) {
      return { message: "This email address is already in use by another account." };
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { email: parsed.data.email },
    });
  }

  await prisma.$transaction(async (tx) => {
    await tx.review.create({
      data: {
        productId,
        userId: user.id,
        authorName: user.name?.trim() || "Anonymous",
        title: stripHtml(parsed.data.title),
        body: stripHtml(parsed.data.body),
        rating: parsed.data.rating,
      },
    });

    const agg = await tx.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await tx.product.update({
      where: { id: productId },
      data: {
        ratingAvg: agg._avg.rating ?? 0,
        ratingCount: agg._count.rating,
      },
    });
  });

  revalidatePath(`/products/${slug}`);
  return { success: true, message: "Thanks for your review!" };
}

export async function deleteReview(id: string) {
  await requireAdmin();

  try {
    const review = await prisma.review.findUnique({
      where: { id },
      select: { productId: true, product: { select: { slug: true } } },
    });

    if (!review) return;

    const productId = review.productId;
    const slug = review.product.slug;

    await prisma.$transaction(async (tx) => {
      await tx.review.delete({ where: { id } });

      const agg = await tx.review.aggregate({
        where: { productId },
        _avg: { rating: true },
        _count: { rating: true },
      });

      await tx.product.update({
        where: { id: productId },
        data: {
          ratingAvg: agg._avg.rating ?? 0,
          ratingCount: agg._count.rating,
        },
      });
    });

    revalidatePath(`/products/${slug}`);
    revalidatePath("/admin/reviews");
  } catch (error) {
    console.error("Failed to delete review:", error);
    throw error;
  }
}

export async function updateReviewRating(id: string, formData: FormData) {
  await requireAdmin();
  const ratingValue = Number(formData.get("rating"));
  if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
    throw new Error("Invalid rating value.");
  }

  try {
    const review = await prisma.review.findUnique({
      where: { id },
      select: { productId: true, product: { select: { slug: true } } },
    });

    if (!review) return;

    const productId = review.productId;
    const slug = review.product.slug;

    await prisma.$transaction(async (tx) => {
      await tx.review.update({
        where: { id },
        data: { rating: ratingValue },
      });

      const agg = await tx.review.aggregate({
        where: { productId },
        _avg: { rating: true },
        _count: { rating: true },
      });

      await tx.product.update({
        where: { id: productId },
        data: {
          ratingAvg: agg._avg.rating ?? 0,
          ratingCount: agg._count.rating,
        },
      });
    });

    revalidatePath(`/products/${slug}`);
    revalidatePath("/admin/reviews");
  } catch (error) {
    console.error("Failed to update review rating:", error);
    throw error;
  }
}

