import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Trash2, Star, Search } from "lucide-react";
import { deleteReview } from "@/app/actions/reviews";
import { requireAdmin } from "@/lib/dal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <div className="flex items-center justify-between">
        <h2 className="font-prata text-2xl text-dark">Product Reviews</h2>
      </div>

      <form className="flex flex-wrap gap-2 items-center">
        <Input
          type="search"
          name="q"
          placeholder="Search reviews by product name, customer, title, or body..."
          defaultValue={q ?? ""}
          className="flex-1 min-w-[280px]"
        />

        <select
          name="rating"
          defaultValue={rating ?? "all"}
          className="h-10 rounded-md border border-[#E7DFD6] bg-white px-3 py-2 text-sm font-lato text-dark outline-none focus-visible:ring-1 focus-visible:ring-brown"
        >
          <option value="all">All Stars</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        <Button type="submit" variant="outline">
          Filter
        </Button>
      </form>

      <div className="rounded-lg border border-[#E7DFD6] bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-lato">
            <thead className="border-b border-[#E7DFD6] bg-[#FEF9F2] text-xs font-bold uppercase tracking-[0.06em] text-gray-text">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Review Details</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD6]">
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-text">
                    No reviews found.
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-dark whitespace-nowrap align-top">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-dark font-medium align-top max-w-[200px] truncate">
                      {review.product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-dark align-top whitespace-nowrap">
                      {review.authorName}
                    </td>
                    <td className="px-6 py-4 align-top whitespace-nowrap">
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
                    </td>
                    <td className="px-6 py-4 align-top max-w-md">
                      <div className="font-semibold text-sm text-dark">{review.title}</div>
                      <div className="text-sm text-gray-text mt-1 whitespace-pre-wrap">{review.body}</div>
                    </td>
                    <td className="px-6 py-4 text-right align-top">
                      <form action={deleteReview.bind(null, review.id)}>
                        <button
                          type="submit"
                          className="inline-flex items-center text-gray-text hover:text-destructive text-sm font-medium transition-colors"
                          title="Delete Review"
                        >
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
