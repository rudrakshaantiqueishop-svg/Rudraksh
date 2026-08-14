import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Trash2, Star } from "lucide-react";
import { deleteReview } from "@/app/actions/reviews";
import { requireAdmin } from "@/lib/dal";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RatingHeaderFilter from "@/components/admin/RatingHeaderFilter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Product Reviews | Admin",
};

export const dynamic = "force-dynamic";

export default async function ReviewsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; rating?: string }>;
}) {
  await requireAdmin();
  const { q, rating } = await searchParams;
  const ratingFilter = rating && rating !== "all" ? Number(rating) : undefined;

  const reviews = await prisma.review.findMany({
    where: {
      AND: [
        ratingFilter !== undefined ? { rating: ratingFilter } : {},
        q
          ? {
              OR: [
                { authorName: { contains: q, mode: "insensitive" } },
                { title: { contains: q, mode: "insensitive" } },
                { body: { contains: q, mode: "insensitive" } },
                { product: { name: { contains: q, mode: "insensitive" } } },
              ],
            }
          : {},
      ],
    },
    include: {
      product: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-prata text-2xl sm:text-3xl text-dark font-normal">Product Reviews</h2>
        <p className="mt-1 font-lato text-sm text-gray-text">
          Moderate customer product ratings, feedback, and reviews.
        </p>
      </div>

      <form className="flex gap-2 items-center">
        <Input
          type="search"
          name="q"
          placeholder="Search reviews by product name, customer, title, or body..."
          defaultValue={q ?? ""}
          className="flex-1 rounded-xl bg-white"
        />
      </form>

      {/* Mobile Review Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="p-5 flex flex-col justify-between gap-4 bg-white hover:border-amber-900/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3.5">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill={i < review.rating ? "currentColor" : "none"}
                    className={i < review.rating ? "text-amber-500" : "text-stone-300"}
                  />
                ))}
              </div>
              <span className="font-lato text-xs text-stone-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div>
              <Badge variant="amber" className="mb-1.5">
                Product: {review.product.name}
              </Badge>
              <h4 className="font-prata font-medium text-dark text-base mt-1">{review.title}</h4>
              <p className="font-lato text-xs text-stone-600 mt-1.5 whitespace-pre-wrap leading-relaxed">
                {review.body}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-stone-100 pt-3.5">
              <span className="font-lato text-xs text-stone-500">By <strong className="text-stone-700">{review.authorName}</strong></span>
              <form action={deleteReview.bind(null, review.id)}>
                <button
                  type="submit"
                  className="flex items-center gap-1 font-lato text-xs font-semibold text-stone-400 hover:text-destructive transition-colors"
                  title="Delete Review"
                >
                  <Trash2 size={15} /> Delete
                </button>
              </form>
            </div>
          </Card>
        ))}
        {reviews.length === 0 && (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center font-lato text-sm text-stone-500">
            No reviews found.
          </div>
        )}
      </div>

      {/* Desktop Reviews Table View */}
      <div className="hidden md:block border border-border overflow-hidden rounded-2xl bg-white shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-4">Date</TableHead>
              <TableHead className="px-6 py-4">Product</TableHead>
              <TableHead className="px-6 py-4">Customer</TableHead>
              <TableHead className="px-6 py-4">
                <RatingHeaderFilter />
              </TableHead>
              <TableHead className="px-6 py-4">Review Details</TableHead>
              <TableHead className="px-6 py-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center font-lato text-sm text-gray-text py-8">
                  No reviews found.
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="px-6 py-4 text-sm text-dark align-top">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-dark font-medium align-top max-w-[200px] truncate">
                    {review.product.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-dark align-top">
                    {review.authorName}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < review.rating ? "currentColor" : "none"}
                          className={i < review.rating ? "text-amber-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top max-w-md">
                    <div className="font-semibold text-sm text-dark">{review.title}</div>
                    <div className="text-sm text-gray-text mt-1 whitespace-pre-wrap">{review.body}</div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right align-top">
                    <form action={deleteReview.bind(null, review.id)}>
                      <button
                        type="submit"
                        className="inline-flex items-center text-gray-text hover:text-destructive text-sm font-medium transition-colors"
                        title="Delete Review"
                      >
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
