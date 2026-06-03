import Image from "next/image";
import { StarIcon } from "./shared";

export default function WhoWeAreFor() {
  return (
    <section
      style={{
        background: "#FEF9F2",
        padding: "100px 70px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative line art — top right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "520px",
          height: "440px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Image
          src="/images/who_we_are_line.svg"
          alt=""
          fill
          style={{ objectFit: "contain", objectPosition: "top right" }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: "80px",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            flex: "0 0 50%",
            maxWidth: "50%",
            position: "relative",
            height: "600px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/about-who-we-are.png"
            alt="Who we are for"
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            paddingTop: "20px",
          }}
        >
          <h2
            className="font-prata"
            style={{
              fontSize: "36px",
              lineHeight: 1.35,
              letterSpacing: "-0.02em",
              color: "#0B0404",
            }}
          >
            Who We Are For
          </h2>
          <p
            className="font-lato"
            style={{ fontSize: "15px", color: "#44403C", fontWeight: 600 }}
          >
            We Are Built For:
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {[
              "Individuals who value authenticity over presentation",
              "Those who prefer facts over promises",
              "People who ask questions before purchasing",
              "Buyers who respect tradition but seek clarity",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <StarIcon />
                <span
                  className="font-lato"
                  style={{
                    fontSize: "15px",
                    color: "#44403C",
                    lineHeight: 1.65,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
          <p
            className="font-lato"
            style={{
              fontSize: "15px",
              color: "#44403C",
              lineHeight: 1.75,
              fontStyle: "italic",
              borderLeft: "2px solid #BB5A28",
              paddingLeft: "16px",
              marginTop: "8px",
            }}
          >
            We are not designed for impulse-driven decisions. We are designed
            for informed ones.
          </p>
        </div>
      </div>
    </section>
  );
}
