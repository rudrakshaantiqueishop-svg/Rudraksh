import Image from "next/image";
import Link from "next/link";

export default function FestivalBanner() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "560px" }}>

      {/* Background image */}
      <Image
        src="/assets/images/home/god.png"
        alt="Shivratri divine blessings"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Content */}
      <div
        className="fb-content absolute inset-0 flex flex-col justify-center h-px-section"
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        {/* Title — max ~680px wide */}
        <h2
          className="fb-title font-prata"
          style={{
            fontSize: "clamp(28px,5vw,56px)",
            lineHeight: "125%",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            margin: "0 0 24px 0",
            maxWidth: "680px",
          }}
        >
          This{" "}
          {/* "Shivratri" with gradient #298FC2 → #FFFFFF */}
          <span
            style={{
              background: "linear-gradient(90deg, #298FC2 0%, #FFFFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Shivratri
          </span>
          , get the divine blessings of Bhagwaan Shiv
        </h2>

        {/* Description */}
        <p
          className="font-lato text-white"
          style={{
            fontSize: "15px",
            lineHeight: "160%",
            margin: "0 0 40px 0",
            maxWidth: "620px",
            opacity: 0.9,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
        </p>

        {/* CTA */}
        <Link
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            paddingBottom: "6px",
            borderBottom: "1px solid rgba(255,255,255,0.7)",
            width: "fit-content",
            textDecoration: "none",
          }}
          className="group/cta"
        >
          {/* "SHOP" in gradient, "NOW" in white */}
          <span
            className="font-lato"
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              lineHeight: "150%",
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #298FC2 0%, #FFFFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SHOP
            </span>
            <span className="text-white"> NOW</span>
          </span>
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            className="group-hover/cta:opacity-75 transition-opacity"
          >
            <path d="M17 7L7 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 7H17V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

    </section>
  );
}
