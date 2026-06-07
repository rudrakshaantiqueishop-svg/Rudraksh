import Image from "next/image";

export default function AuthenticityHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(500px, 80vw, 780px)" }}>
      <Image
        src="/assets/images/Authenticity/authenticity-hero.png"
        alt="Authenticity Is Not a Claim. It's a Process."
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
      
      <div
        className="absolute flex flex-col left-5 right-5 bottom-8 lg:left-16 lg:bottom-[140px] lg:w-[686px] lg:right-auto"
        style={{ gap: "clamp(24px, 3vw, 40px)" }}
      >
        <div className="flex flex-col" style={{ gap: "clamp(12px, 1.5vw, 16px)" }}>
          <h1
            className="font-prata text-white"
            style={{ fontSize: "clamp(46px, 11.5vw, 72px)", lineHeight: "115%", letterSpacing: "-0.02em", margin: 0 }}
          >
            Authenticity Is Not a Claim. It&apos;s a Process.
          </h1>
          <p
            className="font-lato text-white"
            style={{ fontSize: "clamp(15px, 4vw, 18px)", lineHeight: "160%", margin: 0, opacity: 0.95 }}
          >
            We verify every Rudraksha and gemstone through a transparent, step-by-step process
            —so you know exactly what you&apos;re receiving, and why it can be trusted.
          </p>
        </div>
      </div>
    </section>
  );
}
