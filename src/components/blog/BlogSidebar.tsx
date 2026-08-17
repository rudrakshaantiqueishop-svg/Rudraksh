import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RelatedProductsCard from "./RelatedProductsCard";
import type { ProductImageLite } from "@/lib/product-utils";

type RelatedProduct = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  compareAtPriceCents: number | null;
  images: ProductImageLite[];
};
type PopularPost = { id: string; slug: string; title: string; coverImage: string; publishedAt: Date };

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogSidebar({
  relatedProducts,
  popularPosts,
}: {
  relatedProducts: RelatedProduct[];
  popularPosts: PopularPost[];
}) {
  return (
    <aside className="hidden lg:block sticky top-24 self-start">
      <div className="flex flex-col gap-8">
        {/* Related Products */}
        <RelatedProductsCard products={relatedProducts} />

        {/* Promo card */}
        <div className="relative rounded-xl overflow-hidden p-6 min-h-[220px] flex flex-col justify-end">
          <Image
            src="/assets/images/about/about-sacred-1.png"
            alt=""
            fill
            sizes="340px"
            className="object-cover object-center"
          />
          {/* soft bottom scrim for text legibility only */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="relative">
            <h3 className="font-prata text-xl text-white leading-snug m-0 mb-4">
              Authentic Rudraksha for Spiritual Growth &amp; Well-being
            </h3>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 self-start bg-[#BB5A28] hover:bg-[#a34d21] transition-colors text-white font-lato text-[11px] font-bold tracking-[0.8px] uppercase px-3.5 py-2 rounded-md"
            >
              Shop Collection
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Popular Posts */}
        {popularPosts.length > 0 && (
          <div>
            <h3 className="font-prata text-lg text-dark m-0 pb-3 mb-1 border-b border-[#E7DFD6]">Popular Posts</h3>
            <ul className="flex flex-col">
              {popularPosts.map((post) => (
                <li key={post.id} className="border-b border-[#EFE7DB]">
                  <Link href={`/blog/${post.slug}`} className="group/pp flex items-start gap-3 py-4">
                    <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-[#F0E8DD]">
                      <Image src={post.coverImage} alt={post.title} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="font-lato text-sm font-semibold text-dark leading-snug line-clamp-2 group-hover/pp:text-brown transition-colors">
                        {post.title}
                      </span>
                      <span className="font-lato text-xs text-gray-text">{formatDate(post.publishedAt)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 mt-4 font-lato text-xs font-bold tracking-[1px] uppercase text-brown hover:gap-2.5 transition-all"
            >
              View All Posts
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
