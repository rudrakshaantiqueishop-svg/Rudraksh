import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type RelatedPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: Date;
  readTimeMinutes: number;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
}

export default function RelatedArticles({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="h-px-section py-14 lg:py-20 border-t border-[#E7DFD6]" style={{ background: "#FEF9F2" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8 lg:mb-10">
          <h2 className="font-prata text-3xl leading-tight text-dark m-0">Related Articles</h2>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 pb-1 border-b border-gray-text font-lato text-xs font-bold tracking-[0.08em] uppercase text-gray-text hover:text-[#BB5A28] hover:border-[#BB5A28] transition-colors"
          >
            View All
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group/rel flex flex-col">
              <div className="relative w-full aspect-[3/2] rounded-none overflow-hidden bg-[#F0E8DD] mb-4">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover/rel:scale-105"
                />
              </div>
              <span className="font-lato text-xs text-gray-text mb-2">
                {formatDate(post.publishedAt)} · {post.readTimeMinutes} min read
              </span>
              <h3 className="font-prata text-xl leading-snug text-dark m-0 mb-2 group-hover/rel:text-[#BB5A28] transition-colors">
                {post.title}
              </h3>
              <p className="font-lato text-sm leading-relaxed text-gray-text m-0 line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
