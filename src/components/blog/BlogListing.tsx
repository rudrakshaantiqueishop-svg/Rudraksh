"use client";
import Image from "next/image";
import { useState } from "react";

const categories = [
  "Rudraksha Guide",
  "Gemstone Insights",
  "Birth Chart & Astrology",
  "Wearing & Care",
  "Spiritual Traditions",
  "Buying & Authenticity",
];

const featuredPost = {
  title: "The Significance of Five Mukhi Rudraksha in Daily Spiritual Practice",
  body: "Rudraksha beads have been integral to Hindu spiritual traditions for centuries. Among the various types, the Five Mukhi holds a particularly revered position, representing the five elements and the five forms of Lord Shiva. Understanding its properties helps practitioners make informed and meaningful choices about their practice.",
  author: "Rudraksha Antiquei",
  date: "January 15, 2026  —  5 mins Read",
  image: "/assets/images/about/about-sacred-2.png",
};

const smallPosts = [
  {
    title: "How to Identify Genuine Rudraksha: A Practical Guide",
    body: "Authentication of Rudraksha requires careful examination of the mukhi lines, surface texture, and structural integrity. This guide outlines the primary indicators of authenticity used in responsible verification.",
    author: "Rudraksha Antiquei",
    date: "January 13, 2026  —  4 mins Read",
    image: "/assets/images/about/about-p02.png",
  },
  {
    title: "Gemstone Selection Based on Vedic Astrology Principles",
    body: "The relationship between gemstones and planetary energies in Vedic tradition offers a structured approach to selection. Understanding these correlations helps in making informed and considered choices.",
    author: "Rudraksha Antiquei",
    date: "January 10, 2026  —  6 mins Read",
    image: "/assets/images/about/about-p03.png",
  },
  {
    title: "Caring for Sacred Beads: Storage, Cleansing, and Respect",
    body: "Proper care of Rudraksha malas extends their life and preserves their integrity. Traditional practices recommend specific methods for cleaning, storage, and respectful handling of these sacred items.",
    author: "Rudraksha Antiquei",
    date: "January 8, 2026  —  3 mins Read",
    image: "/assets/images/about/about-principle-1.png",
  },
];

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

export default function BlogListing() {
  const [activeCategory, setActiveCategory] = useState("Rudraksha Guide");

  return (
    <section className="bl-section" style={{ background: "#FEF9F2" }}>
      <div className="bl-inner">

        {/* Category tabs */}
        <div className="bl-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="font-lato bl-tab"
              style={
                activeCategory === cat
                  ? { background: "#552912", color: "#FFFFFF", border: "none" }
                  : { background: "transparent", color: "#0B0404", border: "1px solid #E7E5E4" }
              }
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Featured article */}
        <div className="bl-featured" style={{ background: "#FFF5E6" }}>
          {/* Image */}
          <div className="bl-feat-img">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
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
                  {featuredPost.title}
                </h2>
                <p className="font-lato" style={{
                  fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0,
                }}>
                  {featuredPost.body}
                </p>
              </div>
              <AuthorRow author={featuredPost.author} date={featuredPost.date} />
            </div>

            {/* CTA */}
            <button
              className="font-lato bl-read-cta"
              style={{ background: "none", cursor: "pointer" }}
            >
              <span style={{ fontWeight: 500, fontSize: "16px", lineHeight: "150%", color: "#552912" }}>
                READ ARTICLE
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#552912" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Small cards grid */}
        <div className="bl-grid">
          {smallPosts.map((post, i) => (
            <div key={i} className="bl-card">
              <div className="bl-card-img">
                <Image
                  src={post.image}
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
                    {post.body}
                  </p>
                </div>
                <AuthorRow author={post.author} date={post.date} />
              </div>
            </div>
          ))}
        </div>

        {/* Show More */}
        <button
          className="font-lato bl-show-more"
          style={{ background: "none", cursor: "pointer" }}
        >
          <span style={{ fontWeight: 500, fontSize: "16px", lineHeight: "150%", color: "#552912" }}>
            SHOW MORE
          </span>
        </button>

      </div>
    </section>
  );
}
