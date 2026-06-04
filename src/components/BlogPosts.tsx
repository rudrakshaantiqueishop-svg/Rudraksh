import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    id: 1,
    img: "/images/about-founding-1.png",
    title: "Understanding Rudraksha Mukhi and Their Significance",
    desc: "A simple guide to the meaning and traditional importance of different Rudraksha beads.",
  },
  {
    id: 2,
    img: "/images/about-p04.png",
    title: "How Gemstones Are Traditionally Energised",
    desc: "An overview of the rituals and practices used to prepare gemstones with intention.",
  },
  {
    id: 3,
    img: "/images/about-sacred-1.png",
    title: "Choosing the Right Stone for Your Personal Journey",
    desc: "Learn how intention, lifestyle, and guidance play a role in selection.",
  },
];

export default function BlogPosts() {
  return (
    <section style={{ background: "#FEF9F2", padding: "70px 70px 80px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <h2
          className="font-prata"
          style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}
        >
          Blog Posts
        </h2>
        <Link
          href="#"
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
        {posts.map((post) => (
          <Link key={post.id} href="#" style={{ textDecoration: "none" }} className="group/post">

            {/* Image */}
            <div style={{ position: "relative", height: "450px", overflow: "hidden", marginBottom: "20px" }}>
              <Image
                src={post.img}
                alt={post.title}
                fill
                sizes="33vw"
                style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                className="group-hover/post:scale-105"
              />
            </div>

            {/* Title */}
            <h3
              className="font-prata group-hover/post:text-[#BB5A28] transition-colors"
              style={{ fontSize: "22px", lineHeight: "140%", color: "#0B0404", margin: "0 0 12px 0" }}
            >
              {post.title}
            </h3>

            {/* Description */}
            <p
              className="font-lato"
              style={{ fontSize: "14px", lineHeight: "160%", color: "#44403C", margin: 0 }}
            >
              {post.desc}
            </p>

          </Link>
        ))}
      </div>

    </section>
  );
}
