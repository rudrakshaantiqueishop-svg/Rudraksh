import Image from "next/image";
import Link from "next/link";

const purposes = [
  { name: "Wealth",     icon: "/images/icons/wealth.svg" },
  { name: "Health",     icon: "/images/icons/health.svg" },
  { name: "Love",       icon: "/images/icons/love.svg" },
  { name: "Luck",       icon: "/images/icons/luck.svg" },
  { name: "Protection", icon: "/images/icons/protection.svg" },
  { name: "Peace",      icon: "/images/icons/peace.svg" },
  { name: "Courage",    icon: "/images/icons/courage.svg" },
  { name: "Balance",    icon: "/images/icons/balance.svg" },
];

export default function ShopByPurpose() {
  return (
    <section style={{ background: "#FEF9F2", padding: "80px 70px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>

      {/* Title */}
      <h2
        className="font-prata"
        style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: "0 0 56px 0" }}
      >
        Shop By Purpose
      </h2>

      {/* Icons row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {purposes.map((p) => (
          <Link
            key={p.name}
            href="#"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", textDecoration: "none", flex: 1 }}
            className="group/purpose"
          >
            {/* Icon */}
            <div style={{ width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image
                src={p.icon}
                alt={p.name}
                width={80}
                height={80}
                style={{ objectFit: "contain" }}
                className="group-hover/purpose:opacity-70 transition-opacity duration-200"
              />
            </div>
            {/* Label */}
            <span
              className="font-lato group-hover/purpose:text-[#BB5A28] transition-colors duration-200"
              style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", color: "#44403C", textAlign: "center" }}
            >
              {p.name}
            </span>
          </Link>
        ))}
      </div>

    </section>
  );
}
