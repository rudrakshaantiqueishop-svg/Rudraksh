import Image from "next/image";

export default function BlogStillUnsure() {
  return (
    <section className="bsu-section">
      <div className="bsu-inner">
        {/* Background image */}
        <Image
          src="/assets/images/about/about-sacred-1.png"
          alt="Still Unsure"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
        {/* Dark overlay — heavier on left to ensure text legibility */}
        <div className="bsu-overlay" />

        {/* Content */}
        <div className="bsu-content">
          <h2 className="font-prata bsu-heading">Still Unsure?</h2>
          <p className="font-lato bsu-body">
            Choosing a Rudraksha is a personal decision. If you&apos;d like clarity before selecting, we&apos;re here to help—without pressure.
          </p>
          <div className="bsu-ctas">
            <a href="/how-to-choose" className="font-lato bsu-cta">
              HOW TO CHOOSE GUIDE
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="/consultation" className="font-lato bsu-cta">
              ASK AN EXPERT
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
