import Image from "next/image";

export default function TestimonialHero() {
  return (
    <section className="th-section" style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Image
        src="/assets/images/about/about-sacred-2.png"
        alt="Real Experiences, Shared by Our Clients"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 40%" }}
        priority
      />
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,5,2,0.55)" }} />

      {/* Centered content */}
      <div className="th-content">
        <h1 className="font-prata th-heading">
          Real Experiences,<br />Shared by Our Clients
        </h1>
        <p className="font-lato th-body">
          Choosing a Rudraksha or gemstone is often a thoughtful and personal decision.
          Over the years, many individuals have shared their experiences — from first questions to long-term trust.
        </p>
      </div>
    </section>
  );
}
