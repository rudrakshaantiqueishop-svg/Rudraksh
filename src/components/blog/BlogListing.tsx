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

const INITIAL_SIZE = 4;
const PAGE_SIZE = 3;

function formatPostDate(date: Date, readTimeMinutes: number) {
  const formatted = new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return `${formatted}  —  ${readTimeMinutes} mins Read`;
}

function AuthorRow({ author, date }: { author: string; date: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <div style={{
        width: "48px", height: "48px", borderRadius: "48px", overflow: "hidden",
        background: "linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,

      }}>
        <span className="font-prata" style={{ fontSize: "16px", color: "#FFF", lineHeight: 1 }}>R</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <span className="font-lato" style={{ fontWeight: 500, fontSize: "16px", lineHeight: "24px", letterSpacing: "-0.0113em", color: "#0B0404" }}>
          {author}
        </span>
        <span className="font-lato" style={{ fontWeight: 400, fontSize: "16px", lineHeight: "24px", letterSpacing: "0.01em", color: "#44403C" }}>
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
  const [isLoading, setIsLoading] = useState(false);

  const featured = posts[0];
  const gridPosts = posts.slice(1);
  const hasMore = posts.length < total;

  async function handleCategoryChange(slug: string) {
    if (slug === activeCategory || isLoading) return;
    setActiveCategory(slug);
    setIsLoading(true);
    const { posts: newPosts, total: newTotal } = await fetchBlogs(
      slug === "all" ? undefined : slug,
      0,
      INITIAL_SIZE
    );
    setPosts(newPosts);
    setTotal(newTotal);
    setIsLoading(false);
  }

  async function handleShowMore() {
    if (isLoading) return;
    setIsLoading(true);
    const { posts: morePosts, total: newTotal } = await fetchBlogs(
      activeCategory === "all" ? undefined : activeCategory,
      posts.length,
      PAGE_SIZE
    );
    setPosts((prev) => [...prev, ...morePosts]);
    setTotal(newTotal);
    setIsLoading(false);
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
          <div style={{ display: "flex", flexDirection: "column", gap: "48px", alignItems: "center", width: "100%", opacity: isLoading ? 0.6 : 1, transition: "opacity 0.2s" }}>
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
                      fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em",
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

            {/* Small cards grid */}
            {gridPosts.length > 0 && (
              <div className="bl-grid">
                {gridPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="bl-card" style={{ textDecoration: "none" }}>
                    <div className="bl-card-img">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 767px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="bl-card-body">
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <h3 className="font-prata" style={{
                          fontSize: "20px", lineHeight: "28px", color: "#0B0404", margin: 0,
                        }}>
                          {post.title}
                        </h3>
                        <p className="font-lato" style={{
                          fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0,
                        }}>
                          {post.excerpt}
                        </p>
                      </div>
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
                disabled={isLoading}
                className="font-lato bl-show-more"
                style={{ background: "none", cursor: isLoading ? "default" : "pointer" }}
              >
                <span style={{ fontWeight: 500, fontSize: "16px", lineHeight: "150%", color: "#552912" }}>
                  {isLoading ? "LOADING..." : "SHOW MORE"}
                </span>
              </button>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
