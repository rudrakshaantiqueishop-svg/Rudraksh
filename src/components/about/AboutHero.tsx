import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(500px, 80vw, 780px)" }}>
      <Image
        src="/assets/images/about/about-hero.png"
        alt="Rudraksha Antiquei — Rooted in Rishikesh"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
      <div className="absolute inset-0" style={{ background: "rgba(10,5,2,0.5)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-[180px]" style={{ background: "linear-gradient(to bottom, transparent, #1D1D1D)" }} />
      
      <div
        className="absolute flex flex-col left-5 right-5 bottom-8 lg:left-16 lg:bottom-[140px] lg:w-[686px] lg:right-auto"
        style={{ gap: "clamp(24px, 3vw, 40px)" }}
      >
        <div className="flex flex-col" style={{ gap: "clamp(12px, 1.5vw, 16px)" }}>
          <h1
            className="font-prata text-white"
            style={{ fontSize: "clamp(46px, 11.5vw, 72px)", lineHeight: "115%", letterSpacing: "-0.02em", margin: 0 }}
          >
            Rooted in Rishikesh.<br />Guided by Responsibility.
          </h1>
          <p
            className="font-lato text-white"
            style={{ fontSize: "clamp(15px, 4vw, 18px)", lineHeight: "160%", margin: 0, opacity: 0.95 }}
          >
            Based in Rishikesh, near the banks of the Ganga, our work is shaped by an environment where discipline and restraint are part of daily life. Here, sacred objects are not treated as commodities. They are approached with care. Rudraksha Antiquie was built with that same mindset.
          </p>
        </div>
      </div>
    </section>
  );
}
