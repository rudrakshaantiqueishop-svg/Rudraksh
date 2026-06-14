import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    id: 1,
    img: "/assets/images/about/about-founding-1.png",
    title: "Understanding Rudraksha Mukhi and Their Significance",
    desc: "A simple guide to the meaning and traditional importance of different Rudraksha beads.",
  },
  {
    id: 2,
    img: "/assets/images/about/about-p04.png",
    title: "How Gemstones Are Traditionally Energised",
    desc: "An overview of the rituals and practices used to prepare gemstones with intention.",
  },
  {
    id: 3,
    img: "/assets/images/about/about-sacred-1.png",
    title: "Choosing the Right Stone for Your Personal Journey",
    desc: "Learn how intention, lifestyle, and guidance play a role in selection.",
  },
];

export default function BlogPosts() {
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
          <Link key={post.id} href="#" style={{ textDecoration: "none", scrollSnapAlign: "start" }} className="group/post flex-shrink-0 w-[301px] lg:w-full lg:flex-shrink">

            {/* Image */}
            <div className="relative overflow-hidden mb-5 h-[65vw] md:h-[30vw] lg:h-[450px]">
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
