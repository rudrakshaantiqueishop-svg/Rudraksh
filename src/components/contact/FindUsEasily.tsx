export default function FindUsEasily() {
  return (
    <section className="section-pad" style={{ background: "#FEF9F2", display: "flex", flexDirection: "column", gap: "32px" }}>
      <h2 className="font-prata" style={{ fontSize: "clamp(26px, 3.5vw, 36px)", lineHeight: "130%", letterSpacing: "-0.02em", color: "#0B0404", textAlign: "center", margin: 0 }}>
        Find Us Easily
      </h2>
      <div className="fue-map" style={{ width: "100%", height: "440px", overflow: "hidden" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55548.40217565617!2d78.2611!3d30.0869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c356c888af%3A0x6c63d9b6b7c5f8d0!2sRishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Rudraksha Antiquie — Rishikesh, Uttarakhand"
        />
      </div>
    </section>
  );
}
