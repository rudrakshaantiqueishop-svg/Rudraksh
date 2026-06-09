import Image from "next/image";

export default function BlogHero() {
  return (
    <section className="blog-hero" style={{ position: "relative", width: "100%", height: "480px", overflow: "hidden" }}>
      <Image
        src="/assets/images/about/about-p04.png"
        alt="Knowledge Rooted in Tradition"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 30%" }}
        priority
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,5,2,0.52)" }} />

      <div
        className="blog-hero-content"
        style={{
          position: "absolute",
          left: "70px", bottom: "80px",
          display: "flex", flexDirection: "column", gap: "16px",
          maxWidth: "620px",
        }}
      >
        <h1
          className="font-prata blog-hero-title"
          style={{
            fontSize: "clamp(46px, 11.5vw, 72px)",
            lineHeight: "115%",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          Knowledge Rooted in Tradition
        </h1>
        <p
          className="font-lato blog-hero-body"
          style={{
            fontSize: "clamp(15px, 4vw, 18px)",
            lineHeight: "160%",
            color: "#FFFFFF",
            opacity: 0.95,
            margin: 0,
          }}
        >
          Understanding Rudraksha, gemstones, and traditional practices helps you make informed decisions. Our articles focus on clarity, authenticity, and responsible guidance — without exaggerated claims.
        </p>
      </div>
    </section>
  );
}
