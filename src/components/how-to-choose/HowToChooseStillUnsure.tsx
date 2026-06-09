import Image from "next/image";
import Link from "next/link";

export default function HowToChooseStillUnsure() {
  return (
    <section style={{ position: "relative", height: "520px", overflow: "hidden" }}>
      <Image
        src="/assets/images/about/about-sacred-2.png"
        alt="Rudraksha and gemstone bracelets"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      {/* Left gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, rgba(10,5,2,0.76) 0%, rgba(10,5,2,0.38) 55%, rgba(10,5,2,0.08) 100%)",
      }} />
      {/* Content */}
      <div className="htcsu-content">
        <h2 className="font-prata htcsu-title">Still Unsure?</h2>
        <p className="font-lato htcsu-body">
          Choosing the right Rudraksha or gemstone can feel overwhelming. Our experts are available
          to help you find what truly suits your needs, lifestyle, and beliefs.
        </p>
        <Link href="/consultation" className="font-lato htcsu-cta">
          TALK TO AN EXPERT&nbsp;↗
        </Link>
      </div>
    </section>
  );
}
