import Image from "next/image";

export default function ProductsHero() {
  return (
    <section className="ph-section">
      <Image
        src="/assets/images/common/comman banner.png"
        alt="Authentic Rudraksha, Chosen with Care"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,5,2,0.4)" }} />

      <div className="ph-content">
        <h1 className="font-prata ph-heading">
          Authentic Rudraksha, Chosen with Care
        </h1>
        <p className="font-lato ph-body">
          Every Rudraksha listed here is physically examined, scientifically verified, and handled with traditional respect—so you can explore with confidence, not confusion.
        </p>
      </div>
    </section>
  );
}
