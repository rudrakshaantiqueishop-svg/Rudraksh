import Image from "next/image";
import Link from "next/link";

export default function GuidanceBanner() {
  return (
    <section style={{ background: "#FEF9F2", padding: "40px 70px" }}>

      {/* Card with rounded corners */}
      <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", height: "480px" }}>

        {/* Background image */}
        <Image
          src="/images/beads.png"
          alt="Need guidance"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Dark overlay for text readability */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.15) 100%)" }} />

        {/* Content */}
        <div
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "0 64px",
          }}
        >
          <h2
            className="font-prata text-white"
            style={{ fontSize: "40px", lineHeight: "130%", letterSpacing: "-0.02em", margin: "0 0 20px 0", maxWidth: "560px" }}
          >
            Need Guidance? We're Here to Help
          </h2>

          <p
            className="font-lato text-white"
            style={{ fontSize: "15px", lineHeight: "165%", margin: "0 0 40px 0", maxWidth: "480px", opacity: 0.9 }}
          >
            Choosing the right rudraksha or gemstone can feel overwhelming. Our experts are available
            to help you find what truly suits your needs, lifestyle, and beliefs.
          </p>

          <Link
            href="#"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              paddingBottom: "6px", borderBottom: "1px solid rgba(255,255,255,0.7)",
              width: "fit-content", textDecoration: "none",
            }}
            className="group/cta"
          >
            <span
              className="font-lato text-white group-hover/cta:opacity-75 transition-opacity"
              style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}
            >
              TALK TO AN EXPERT
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="group-hover/cta:opacity-75 transition-opacity">
              <path d="M17 7L7 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 7H17V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
