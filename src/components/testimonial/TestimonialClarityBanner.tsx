import Image from "next/image";
import Link from "next/link";

export default function TestimonialClarityBanner() {
  return (
    <section className="tcb-section">
      <div className="tcb-inner">
        {/* Background image */}
        <Image
          src="/assets/images/home/beads.png"
          alt="Rudraksha beads"
          fill
          sizes="(max-width: 767px) 100vw, 90vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority={false}
        />

        {/* Left-side gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(10,5,2,0.68) 0%, rgba(10,5,2,0.30) 50%, rgba(10,5,2,0) 75%)",
        }} />

        {/* Content — bottom left */}
        <div className="tcb-content">
          <h2 className="font-prata tcb-title">Continue with Clarity</h2>
          <p className="font-lato tcb-body">
            If you would like guidance before choosing, you may begin with a guide.
          </p>
          <Link href="/how-to-choose" className="font-lato tcb-cta">
            HOW TO CHOOSE GUIDE&nbsp;↗
          </Link>
        </div>
      </div>
    </section>
  );
}
