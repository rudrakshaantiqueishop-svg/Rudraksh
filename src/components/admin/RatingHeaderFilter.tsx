"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function RatingHeaderFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentRating = searchParams.get("rating") ?? "all";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("rating");
    } else {
      params.set("rating", value);
    }
    router.push(`/admin/reviews?${params.toString()}`);
  };

  return (
    <select
      value={currentRating}
      onChange={handleChange}
      className="bg-transparent border-none text-dark font-medium cursor-pointer outline-none text-sm p-0 focus:ring-0"
    >
      <option value="all">Rating (All)</option>
      <option value="5">5 Stars</option>
      <option value="4">4 Stars</option>
      <option value="3">3 Stars</option>
      <option value="2">2 Stars</option>
      <option value="1">1 Star</option>
    </select>
  );
}
