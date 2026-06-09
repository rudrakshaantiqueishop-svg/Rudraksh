import Image from "next/image";

export default function WhenSacred() {
  return (
    <section className="ws-section" style={{ background: "#1D1D1D" }}>

      <h2 className="ws-heading font-prata" style={{ lineHeight: "140%", letterSpacing: "-0.02em", color: "#FFFFFF", textAlign: "center" }}>
        When Sacred Became Commercial
      </h2>

      <div className="ws-rows">

        {/* Row 1: image → text */}
        <div className="ws-row">
          <div className="ws-img">
            <Image
              src="/assets/images/about/about-sacred-1.png"
              alt="Sacred rudraksha beads"
              fill
              sizes="(max-width: 1023px) 100vw, 584px"
              style={{ objectFit: "cover", objectPosition: "center" }}
              loading="lazy"
            />
          </div>
          <p className="ws-text font-lato" style={{ color: "rgba(255,255,255,0.82)" }}>
            Rudraksha and gemstones once moved through teachers, families, and
            quiet recommendation.
            <br /><br />
            Today, they move through advertising.
          </p>
        </div>

        {/* Row 2: bullets → image */}
        <div className="ws-row ws-row-reverse">
          <div className="ws-text ws-text-block" style={{ flexShrink: 0 }}>
            {[
              "Claims became louder.",
              "Urgency replaced understanding.",
              "Verification became inconsistent.",
            ].map((t) => (
              <p key={t} className="font-lato ws-bullet" style={{ color: "rgba(255,255,255,0.82)", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ color: "#BB5A28", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>—</span>
                {t}
              </p>
            ))}
            <p className="font-lato ws-bullet" style={{ color: "rgba(255,255,255,0.82)", marginTop: "10px" }}>
              In this shift, clarity was often lost.<br />
              We believed there had to be a more responsible way.
            </p>
          </div>
          <div className="ws-img">
            <Image
              src="/assets/images/about/about-sacred-2.png"
              alt="Sacred tradition"
              fill
              sizes="(max-width: 1023px) 100vw, 584px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
