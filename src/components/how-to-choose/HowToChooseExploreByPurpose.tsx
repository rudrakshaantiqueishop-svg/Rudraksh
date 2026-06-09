import Image from "next/image";

const purposes = [
  { label: "Wealth",     icon: "/assets/icons/wealth.svg" },
  { label: "Health",     icon: "/assets/icons/health.svg" },
  { label: "Love",       icon: "/assets/icons/love.svg" },
  { label: "Luck",       icon: "/assets/icons/luck.svg" },
  { label: "Protection", icon: "/assets/icons/protection.svg" },
  { label: "Peace",      icon: "/assets/icons/peace.svg" },
  { label: "Courage",    icon: "/assets/icons/courage.svg" },
  { label: "Balance",    icon: "/assets/icons/balance.svg" },
];

export default function HowToChooseExploreByPurpose() {
  return (
    <section className="section-pad" style={{ background: "#FEF9F2", display: "flex", flexDirection: "column", gap: "40px" }}>
      <h2 className="font-prata title-fluid" style={{ letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
        Feeling Clear? Explore By Purpose
      </h2>
      <div className="htcep-icons-row">
        {purposes.map((p) => (
          <div key={p.label} className="htcep-icon-item">
            <Image src={p.icon} alt={p.label} width={52} height={52} />
            <span className="font-lato" style={{ fontSize: "13px", color: "#44403C", letterSpacing: "0.04em", lineHeight: "140%", textAlign: "center" }}>
              {p.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
