import Image from "next/image";

export default function WhenSacred() {
  return (
    <section style={{ background: "#1D1D1D", padding: "100px 0" }}>

      {/* Heading — centered */}
      <h2
        className="font-prata"
        style={{
          fontSize: "36px",
          lineHeight: "140%",
          letterSpacing: "-0.02em",
          color: "#FFFFFF",
          textAlign: "center",
          marginBottom: "80px",
          padding: "0 70px",
        }}
      >
        When Sacred Became Commercial
      </h2>

      {/* Two stacked rows — each centered in 1440px */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {/* Row 1: Rudraksha image → Caption text */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "120px",
          }}
        >
          <div
            style={{
              width: "584px",
              height: "339px",
              position: "relative",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <Image
              src="/assets/images/about/about-sacred-1.png"
              alt="Sacred rudraksha beads"
              fill
              sizes="584px"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <p
            className="font-lato"
            style={{
              width: "496px",
              fontSize: "18px",
              lineHeight: "150%",
              color: "rgba(255,255,255,0.82)",
            }}
          >
            Rudraksha and gemstones once moved through teachers, families, and
            quiet recommendation.
            <br />
            <br />
            Today, they move through advertising.
          </p>
        </div>

        {/* Row 2: Bullet text → Sadhu image */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "120px",
          }}
        >
          <div
            style={{
              width: "496px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              flexShrink: 0,
            }}
          >
            {[
              "Claims became louder.",
              "Urgency replaced understanding.",
              "Verification became inconsistent.",
            ].map((t) => (
              <p
                key={t}
                className="font-lato"
                style={{
                  fontSize: "18px",
                  lineHeight: "150%",
                  color: "rgba(255,255,255,0.82)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    color: "#BB5A28",
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  —
                </span>
                {t}
              </p>
            ))}
            <p
              className="font-lato"
              style={{
                fontSize: "18px",
                lineHeight: "150%",
                color: "rgba(255,255,255,0.82)",
                marginTop: "10px",
              }}
            >
              In this shift, clarity was often lost.
              <br />
              We believed there had to be a more responsible way.
            </p>
          </div>

          <div
            style={{
              width: "584px",
              height: "339px",
              position: "relative",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <Image
              src="/assets/images/about/about-sacred-2.png"
              alt="Sacred tradition"
              fill
              sizes="584px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
