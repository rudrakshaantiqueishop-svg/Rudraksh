import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="contact-hero" style={{ position: "relative", width: "100%", height: "480px", overflow: "hidden" }}>
      <Image
        src="/assets/images/common/comman banner.png"
        alt="We're Here to Help"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
        loading="eager"
      />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 70px", gap: "16px",
      }}>
        <h1 className="font-prata contact-hero-title" style={{ fontSize: "clamp(46px, 11.5vw, 72px)", lineHeight: "115%", letterSpacing: "-0.02em", color: "#FFFFFF", margin: 0 }}>
          We&apos;re Here to Help
        </h1>
        <p className="font-lato contact-hero-body" style={{ fontSize: "clamp(15px, 4vw, 18px)", lineHeight: "160%", color: "#FFFFFF", opacity: 0.95, maxWidth: "640px", margin: 0 }}>
          Whether you have a question about a product, need guidance before choosing, or simply want
          clarity, we&apos;re available to assist. We believe conversations should come before decisions.
        </p>
      </div>
    </section>
  );
}
