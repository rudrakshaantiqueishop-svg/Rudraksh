import Image from "next/image";

export default function EnergisationHero() {
  return (
    <section className="energisation-hero" style={{ position: "relative", width: "100%", height: "680px", overflow: "hidden" }}>
      <Image
        src="/assets/images/common/comman banner.png"
        alt="Energisation, Explained with Clarity"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
        loading="eager"
      />
      <div
        className="energisation-hero-content"
        style={{ position: "absolute", left: "70px", bottom: "64px", display: "flex", flexDirection: "column", gap: "16px", maxWidth: "560px" }}
      >
        <h1
          className="font-prata energisation-hero-title"
          style={{ fontSize: "clamp(36px, 6vw, 56px)", lineHeight: "120%", letterSpacing: "-0.02em", color: "#FFFFFF", margin: 0 }}
        >
          Energisation,<br />Explained with Clarity
        </h1>
        <p
          className="font-lato energisation-hero-body"
          style={{ fontSize: "16px", lineHeight: "160%", color: "rgba(255,255,255,0.8)", margin: 0 }}
        >
          Energisation is often misunderstood, over-promised, or treated as a selling tactic.
          For us, it is neither compulsory nor mystical theatre.
        </p>
      </div>
    </section>
  );
}
