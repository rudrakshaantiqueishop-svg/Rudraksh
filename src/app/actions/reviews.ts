"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/dal";
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
