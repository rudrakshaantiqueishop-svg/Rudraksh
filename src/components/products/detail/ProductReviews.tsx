import Image from "next/image";
import { Star } from "lucide-react";

type Review = {
  id: string;
  authorName: string;
  title: string;
  body: string;
  rating: number;
  createdAt: Date;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ProductReviews({ reviews }: { reviews: Review[] }) {
  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      <div className="flex items-center justify-between gap-4 mb-8 lg:mb-10">
        <h2 className="font-prata text-3xl lg:text-[36px] text-dark m-0">Reviews</h2>
        <button className="bg-brown text-white font-lato text-sm font-bold tracking-[0.5px] px-6 py-3.5 whitespace-nowrap">
          WRITE A REVIEW
        </button>
      </div>

      <div className="flex flex-col">
        {reviews.length === 0 && (
          <p className="font-lato text-sm text-gray-text py-4 m-0">No reviews yet. Be the first to share your experience.</p>
        )}
        {reviews.map((r) => (
          <div key={r.id} className="border-t border-[#E7DFD6] py-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2 max-w-3xl">
              <h3 className="font-prata text-xl text-dark m-0">{r.title}</h3>
              <p className="font-lato text-sm text-gray-text m-0 leading-relaxed">{r.body}</p>
              <p className="font-lato text-xs text-gray-text m-0">
                Posted on {formatDate(r.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                <Image src="/assets/images/testimonial/client-avatar.png" alt={r.authorName} fill sizes="40px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-lato text-sm font-semibold text-dark">{r.authorName}</span>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" stroke="none" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {reviews.length > 0 && (
          <div className="border-t border-[#E7DFD6] pt-6">
            <button className="font-lato text-sm font-bold tracking-[0.5px] text-dark border-b border-dark pb-1">
              VIEW MORE
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
