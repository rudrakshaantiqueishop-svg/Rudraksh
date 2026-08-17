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
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            paddingBottom: "6px",
            borderBottom: "1px solid #44403C",
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="group-hover/explore:stroke-[#BB5A28] transition-colors"
            stroke="#44403C"
            strokeWidth="1.5"
          >
            <path d="M17 7L7 17" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 7H17V16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Grid matching Screenshot 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none" }}
            className="group/post flex flex-col"
          >
            {/* Square 1:1 Image Container */}
            {post.coverImage ? (
              <div className="relative aspect-square w-full overflow-hidden mb-4 bg-[#F0E8DD]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="group-hover/post:scale-105 transition-transform duration-500"
                />
              </div>
            ) : null}

            {/* Title */}
            <h3 className="font-prata text-xl leading-[1.35] text-[#0B0404] m-0 mb-2 group-hover/post:text-[#BB5A28] transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="font-lato text-xs sm:text-sm leading-relaxed text-[#78716C] m-0 line-clamp-3">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
