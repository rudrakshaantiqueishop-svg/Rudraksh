import Image from "next/image";

export default function AuthenticityHero() {
  return (
    <section className="auth-hero" style={{ position: "relative", width: "100%", height: "700px", overflow: "hidden" }}>
      <Image
        src="/assets/images/Authenticity/authenticity-hero.png"
        alt="Authenticity Is Not a Claim. It's a Process."
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
      
      <div className="auth-hero-content" style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 64px 64px",
        maxWidth: "760px",
      }}>
        <h1
          className="font-prata"
          style={{ fontSize: "clamp(32px, 6vw, 68px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#FFFFFF", margin: "0 0 20px 0" }}
        >
          Authenticity Is Not a Claim. It&apos;s a Process.
        </h1>
        <p
          className="font-lato auth-hero-body"
          style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(255,255,255,0.8)", maxWidth: "540px", margin: 0 }}
        >
          We verify every Rudraksha and gemstone through a transparent, step-by-step process
          —so you know exactly what you&apos;re receiving, and why it can be trusted.
        </p>
      </div>
    </section>
  );
}
