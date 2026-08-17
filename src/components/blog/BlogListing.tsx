"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { fetchBlogs } from "@/app/actions/blogs";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  readTimeMinutes: number;
  publishedAt: Date;
  category: { id: string; name: string; slug: string } | null;
};

type BlogCategory = { id: string; name: string; slug: string };

const INITIAL_SIZE = 10;
const PAGE_SIZE = 10;

function formatPostDate(date: Date, readTimeMinutes: number) {
  const formatted = new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return `${formatted} - ${readTimeMinutes} mins Read`;
}

function AuthorRow({ author, date }: { author: string; date: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#552912] to-[#BB5A28] flex items-center justify-center text-white shrink-0 shadow-xs">
        <span className="font-prata text-xs leading-none">{author.charAt(0).toUpperCase()}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-lato text-xs font-bold text-[#0B0404] leading-tight">
          {author}
        </span>
        <span className="font-lato text-[11px] text-[#78716C] leading-tight mt-0.5">
          {date}
        </span>
      </div>
    </div>
  );
}

export default function BlogListing({
  initialPosts,
  initialTotal,
  categories,
}: {
  initialPosts: BlogPost[];
  initialTotal: number;
  categories: BlogCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [total, setTotal] = useState(initialTotal);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const featured = posts[0];
  const gridPosts = posts.slice(1);
  const hasMore = posts.length < total;

  async function handleCategoryChange(slug: string) {
    if (slug === activeCategory || isCategoryLoading || isMoreLoading) return;
    setActiveCategory(slug);
    setIsCategoryLoading(true);
    const { posts: newPosts, total: newTotal } = await fetchBlogs(
      slug === "all" ? undefined : slug,
      0,
      INITIAL_SIZE
    );
    setPosts(newPosts);
    setTotal(newTotal);
    setIsCategoryLoading(false);
  }

  async function handleShowMore() {
    if (isCategoryLoading || isMoreLoading) return;
    setIsMoreLoading(true);
    const { posts: morePosts, total: newTotal } = await fetchBlogs(
      activeCategory === "all" ? undefined : activeCategory,
      posts.length,
      PAGE_SIZE
    );
    setPosts((prev) => [...prev, ...morePosts]);
    setTotal(newTotal);
    setIsMoreLoading(false);
  }

  return (
    <section className="bl-section" style={{ background: "#FEF9F2" }}>
      <div className="bl-inner">

        {/* Category tabs */}
        <div className="bl-tabs">
          <button
            onClick={() => handleCategoryChange("all")}
            className="font-lato bl-tab"
            style={
              activeCategory === "all"
                ? { background: "#552912", color: "#FFFFFF", border: "none" }
                : { background: "transparent", color: "#0B0404", border: "1px solid #E7E5E4" }
            }
          >
            ALL
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className="font-lato bl-tab"
              style={
                activeCategory === cat.slug
                  ? { background: "#552912", color: "#FFFFFF", border: "none" }
                  : { background: "transparent", color: "#0B0404", border: "1px solid #E7E5E4" }
              }
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>

        {!featured ? (
          <p className="font-lato" style={{ color: "#44403C", fontSize: "16px" }}>
            No articles yet. Check back soon.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "48px", alignItems: "center", width: "100%", opacity: isCategoryLoading ? 0.6 : 1, transition: "opacity 0.2s" }}>
            {/* Featured article */}
            <div className="bl-featured" style={{ background: "#FFF5E6" }}>
              {/* Image */}
              <div className="bl-feat-img">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Content */}
              <div className="bl-feat-content">
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <h2 className="font-prata" style={{
                      fontSize: "30px", lineHeight: "140%", letterSpacing: "-0.02em",
                      color: "#0B0404", margin: 0,
                    }}>
                      {featured.title}
                    </h2>
                    <p className="font-lato" style={{
                      fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0,
                    }}>
                      {featured.excerpt}
                    </p>
                  </div>
                  <AuthorRow author={featured.author} date={formatPostDate(featured.publishedAt, featured.readTimeMinutes)} />
                </div>

                {/* CTA */}
                <Link
                  href={`/blog/${featured.slug}`}
                  className="font-lato bl-read-cta"
                  style={{ background: "none", textDecoration: "none" }}
                >
                  <span style={{ fontWeight: 500, fontSize: "16px", lineHeight: "150%", color: "#552912" }}>
                    READ ARTICLE
                  </span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="#552912" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Small articles grid matching User Screenshot */}
            {gridPosts.length > 0 && (
              <div className="bl-grid">
                {gridPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col justify-between"
                    style={{ textDecoration: "none" }}
                  >
                    <div>
                      {/* Image container */}
                      <div className="relative overflow-hidden aspect-[16/10] w-full bg-stone-100 mb-3">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 767px) 100vw, 33vw"
                          style={{ objectFit: "cover" }}
                          className="group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Body */}
                      <div className="flex flex-col gap-2">
                        <h3
                          className="font-prata text-xl leading-[1.3] text-[#0B0404] m-0 group-hover:text-[#BB5A28] transition-colors"
                        >
                          {post.title}
                        </h3>
                        <p
                          className="font-lato text-xs sm:text-sm leading-[1.5] text-[#44403C] m-0 line-clamp-4"
                        >
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <AuthorRow author={post.author} date={formatPostDate(post.publishedAt, post.readTimeMinutes)} />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Show More */}
            {hasMore && (
              <button
                onClick={handleShowMore}
                disabled={isCategoryLoading || isMoreLoading}
                className="font-lato bl-show-more"
                style={{ background: "none", cursor: (isCategoryLoading || isMoreLoading) ? "default" : "pointer" }}
              >
                <span style={{ fontWeight: 500, fontSize: "16px", lineHeight: "150%", color: "#552912" }}>
                  {isMoreLoading ? "LOADING..." : "SHOW MORE"}
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
