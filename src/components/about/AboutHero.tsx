import Image from "next/image";

export default function AboutHero() {
  return (
    <section style={{ position: "relative", width: "100%", height: "700px", overflow: "hidden" }}>
      <Image
        src="/assets/images/about/about-hero.png"
        alt="Rudraksha Antiquei — Rooted in Rishikesh"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,5,2,0.5)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "180px", background: "linear-gradient(to bottom, transparent, #1D1D1D)" }} />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 70px", gap: "24px", paddingBottom: "80px",
      }}>
        <h1 className="font-prata" style={{ fontSize: "64px", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#FFFFFF", maxWidth: "800px" }}>
          Rooted in Rishikesh.<br />Guided by Responsibility.
        </h1>
        <p className="font-lato" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(255,255,255,0.8)", maxWidth: "680px" }}>
          Based in Rishikesh, near the banks of the Ganga, our work is shaped by an environment where discipline and restraint are part of daily life. Here, sacred objects are not treated as commodities. They are approached with care. Rudraksha Antiquie was built with that same mindset.
        </p>
      </div>
    </section>
  );
}
