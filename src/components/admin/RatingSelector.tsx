"use client";

import { useTransition } from "react";
import { updateReviewRating } from "@/app/actions/reviews";

interface RatingSelectorProps {
  reviewId: string;
  initialRating: number;
}

export default function RatingSelector({ reviewId, initialRating }: RatingSelectorProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const formData = new FormData();
    formData.append("rating", value);

    startTransition(async () => {
      try {
        await updateReviewRating(reviewId, formData);
      } catch (err) {
        console.error("Failed to update rating:", err);
      }
    });
  };

  return (
    <select
      name="rating"
      value={initialRating}
      onChange={handleChange}
      disabled={isPending}
      className="h-9 w-32 rounded border border-[#E7DFD6] bg-transparent px-2 py-1 text-sm font-lato text-dark outline-none focus-visible:ring-1 focus-visible:ring-brown cursor-pointer disabled:opacity-50"
    >
      <option value="5">⭐⭐⭐⭐⭐</option>
      <option value="4">⭐⭐⭐⭐</option>
      <option value="3">⭐⭐⭐</option>
      <option value="2">⭐⭐</option>
      <option value="1">⭐</option>
    </select>
  );
}
