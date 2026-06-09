import Image from "next/image";

export default function TestimonialTrustBanner() {
  return (
    <section className="ttb-section">
      <Image
        src="/assets/images/home/rudraksh.png"
        alt="Trust Is Built Through Process"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 45%" }}
      />
     

      <div className="ttb-content">
        <h2 className="font-prata ttb-heading">
          Trust Is Built Through Process
        </h2>
        <p className="font-lato ttb-body">
          Every experience shared here began with a question. Our role is to listen first, verify carefully, and recommend responsibly.
        </p>
        <a href="/consultation" className="font-lato ttb-cta">
          ASK AN EXPERT
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
