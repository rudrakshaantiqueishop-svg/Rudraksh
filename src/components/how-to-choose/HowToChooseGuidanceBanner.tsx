import Image from "next/image";
import Link from "next/link";

export default function HowToChooseGuidanceBanner() {
  return (
    <section className="htcgb-section">
      <Image
        src="/assets/images/about/about-hero.png"
        alt="Rudraksha beads close-up"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
    
      <div className="htcgb-content">
        <h2 className="font-prata htcgb-title">If You&apos;d Like Guidance, We&apos;re Here</h2>
        <p className="font-lato htcgb-body">
          If you&apos;d really like to explore, our experts can help you understand what aligns with your
          intention, beliefs, and lifestyle — without any obligation to purchase. This is a conversation,
          not a transaction.
        </p>
        <Link href="/consultation" className="font-lato htcgb-cta">
          GET PERSONAL GUIDANCE&nbsp;↗
        </Link>
      </div>
    </section>
  );
}
