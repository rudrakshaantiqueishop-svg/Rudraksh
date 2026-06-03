import Image from "next/image";

export default function LookingForward() {
  return (
    <section style={{ background: "#FEF9F2", padding: "100px 70px", position: "relative", overflow: "hidden" }}>
      {/* line.svg — top left of section */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "260px", height: "200px", pointerEvents: "none", zIndex: 0 }}>
        <Image src="/images/line.svg" alt="" fill style={{ objectFit: "contain", objectPosition: "top left" }} />
      </div>

      {/* Brown gradient box */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "linear-gradient(90deg, #552912 0%, #BB5A28 100%)",
        boxShadow: "0 0 0 3px #CCB26A",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "314px",
        overflow: "hidden",
      }}>
        {/* Gold border outline */}
        <div style={{ position: "absolute", inset: 0, outline: "3px solid #CCB26A", outlineOffset: "-3px", pointerEvents: "none", zIndex: 2 }} />

        {/* leaf-2.png — bottom right inside box */}
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "380px", height: "320px", pointerEvents: "none", zIndex: 1 }}>
          <Image src="/images/leaf-2.png" alt="" fill style={{ objectFit: "contain", objectPosition: "bottom right" }} />
        </div>

        {/* Text content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", display: "flex", flexDirection: "column", gap: "24px", maxWidth: "1000px" }}>
          <h2 className="font-prata" style={{
            fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em",
            background: "linear-gradient(90deg, #EAB308 0%, #FFFFFF 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Looking Forward
          </h2>
          <p className="font-lato" style={{ fontSize: "16px", lineHeight: "180%", color: "#FFFFFF", textAlign: "center" }}>
            Our vision is not rapid expansion.<br />
            It is consistency.<br />
            To make verification standard. To maintain integrity in a space that often rewards exaggeration. To preserve responsibility around sacred objects.<br />
            We do not aim to be the loudest presence in this space.<br />
            We aim to be a steady one.
          </p>
        </div>
      </div>
    </section>
  );
}
