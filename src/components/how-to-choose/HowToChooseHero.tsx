import Image from "next/image";

export default function HowToChooseHero() {
  return (
    <section className="htc-hero-section">
      <Image
        src="/assets/images/home/beads.png"
        alt="Rudraksha mala"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(10,5,2,0.18) 0%, rgba(10,5,2,0.62) 100%)",
      }} />
      {/* Content */}
      <div className="htc-hero-content">
        <h1 className="font-prata htc-hero-title">A Thoughtful<br />Beginning</h1>
        <p className="font-lato htc-hero-body">
          Rudraksha and gemstone selection deserves more than guesswork. This space is designed to
          help you move from feeling uncertain to choosing with intention and awareness.
        </p>
      </div>
    </section>
  );
}
