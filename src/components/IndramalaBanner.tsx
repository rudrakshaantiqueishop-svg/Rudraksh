import Image from "next/image";
import Link from "next/link";

export default function IndramalaBanner() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "480px" }}>

      {/* Background image */}
      <Image
        src="/assets/images/home/rudraksh.png"
        alt="Indramala"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Centered content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ padding: "0 70px", textAlign: "center" }}
      >
        {/* Title with gold → white gradient */}
        <h2
          className="font-prata ib-title"
          style={{
            fontSize: "clamp(36px,7vw,56px)",
            lineHeight: "130%",
            letterSpacing: "-0.02em",
            margin: "0 0 24px 0",
            background: "linear-gradient(90deg, #F89F20 32%, #FFFFFF 75%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Indramala
        </h2>

        {/* Description */}
        <p
          className="font-lato text-white"
          style={{
            fontSize: "16px",
            lineHeight: "170%",
            margin: "0 0 40px 0",
            maxWidth: "560px",
            opacity: 0.9,
          }}
        >
          Experience the pinnacle of divine craftsmanship, blessed by all Gods and Goddesses. Each
          meticulously chosen Rudraksha bead forms a conduit of sacred energy, bestowing profound
          blessings, heightened intuition, and spiritual harmony upon its wearer.
        </p>

        {/* CTA */}
        <Link
          href="#"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            paddingBottom: "6px", borderBottom: "1px solid rgba(255,255,255,0.6)",
            textDecoration: "none",
          }}
          className="group/cta"
        >
          <span className="font-lato" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em" }}>
            {/* "SHOP" in gold gradient */}
            <span
              style={{
                background: "linear-gradient(90deg, #F89F20 0%, #FFFFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SHOP
            </span>
            {/* "NOW" in white */}
            <span className="text-white"> NOW</span>
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M17 7L7 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 7H17V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

    </section>
  );
}
