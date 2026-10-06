import Image from "next/image";

export default function EnergisationHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(500px, 80vw, 780px)" }}>
      <Image
        src="https://res.cloudinary.com/dkbr33fcx/image/upload/v1790155945/rudraksh/assets/images/products/category-rings.png"
        alt="Energisation, Explained with Clarity"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
        loading="eager"
      />
      {/* Dark overlay for text contrast and readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div
        className="absolute flex flex-col items-start text-left left-4 right-4 bottom-8 md:left-10 md:right-auto md:bottom-[100px] lg:left-[70px] lg:bottom-[140px] lg:-translate-x-0 max-w-3xl lg:max-w-4xl w-full"
        style={{ gap: "clamp(24px, 3vw, 40px)" }}
      >
        <div className="flex flex-col" style={{ gap: "clamp(12px, 1.5vw, 16px)" }}>
          <h1
            className="font-prata text-white"
            style={{ fontSize: "clamp(34px, 6vw, 68px)", lineHeight: "115%", letterSpacing: "-0.02em", margin: 0 }}
          >
            Energisation,<br />
            <span className="whitespace-nowrap">Explained with Clarity</span>
          </h1>
          <p
            className="font-lato text-white max-w-[620px]"
            style={{ fontSize: "clamp(15px, 4vw, 18px)", lineHeight: "160%", margin: 0, opacity: 0.95 }}
          >
            Energisation is often misunderstood, over-promised, or treated as a selling tactic.
            For us, it is neither compulsory nor mystical theatre.
          </p>
        </div>
      </div>
    </section>
  );
}
