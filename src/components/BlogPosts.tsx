import Image from "next/image";
import Link from "next/link";
import { getRecentBlogs } from "@/lib/blogs";

export default async function BlogPosts() {
  const posts = await getRecentBlogs(3);

  if (posts.length === 0) return null;

  return (
    <section className="h-px-section py-[60px] lg:py-[80px]" style={{ background: "#FEF9F2" }}>

      {/* Header */}
      <div className="flex flex-col items-start gap-4 mb-8 lg:flex-row lg:items-center lg:justify-between lg:mb-[32px]">
        <h2
          className="font-prata text-3xl lg:text-[36px]"
          style={{ lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}
        >
          Blog Posts
        </h2>
        <Link
          href="/blog"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            paddingBottom: "6px", borderBottom: "1px solid #44403C",
            textDecoration: "none",
          }}
          className="group/explore"
        >
          <span
            className="font-lato group-hover/explore:text-[#BB5A28] transition-colors"
            style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", color: "#44403C" }}
          >
            EXPLORE ALL BLOGS
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover/explore:stroke-[#BB5A28] transition-colors" stroke="#44403C" strokeWidth="1.5">
            <path d="M17 7L7 17" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 7H17V16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Cards */}
      <div className="flex lg:grid lg:grid-cols-3 gap-5 lg:gap-6 overflow-x-auto no-scrollbar pb-4 lg:pb-0 lg:overflow-x-visible" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none", scrollSnapAlign: "start" }}
            className="group/post flex-shrink-0 w-[301px] lg:w-full lg:flex-shrink rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-brown/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image */}
              <div className="relative overflow-hidden mb-5 h-[50vw] md:h-[25vw] lg:h-[260px] rounded-xl bg-[#F0E8DD]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="group-hover/post:scale-105 transition-transform duration-500"
                />
                {post.category && (
                  <span className="absolute top-3 left-3 rounded-full border border-stone-200/80 bg-white/95 px-3 py-1 font-lato text-[11px] font-bold text-dark shadow-2xs backdrop-blur-xs">
                    {post.category.name}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3
                className="font-prata group-hover/post:text-brown transition-colors line-clamp-2"
                style={{ fontSize: "20px", lineHeight: "140%", color: "#0B0404", margin: "0 0 10px 0" }}
              >
                {post.title}
              </h3>

              {/* Description */}
              <p
                className="font-lato line-clamp-3"
                style={{ fontSize: "14px", lineHeight: "160%", color: "#44403C", margin: 0 }}
              >
                {post.excerpt}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-lato text-stone-500">
              <span className="font-semibold text-stone-700">{post.author}</span>
              <span>{post.readTimeMinutes} min read</span>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
