import Image from "next/image";
import Link from "next/link";
import { getBannerByKey } from "@/lib/banners";

function renderHighlightedTitle(title: string, highlight?: string | null, gradientFrom = "#298FC2", gradientTo = "#FFFFFF") {
  if (!highlight || !title.toLowerCase().includes(highlight.toLowerCase())) {
    return title;
  }

  const idx = title.toLowerCase().indexOf(highlight.toLowerCase());
  const before = title.slice(0, idx);
  const matched = title.slice(idx, idx + highlight.length);
  const after = title.slice(idx + highlight.length);

  return (
    <>
      {before}
      <span
        style={{
          background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {matched}
      </span>
      {after}
    </>
  );
}

export default async function FestivalBanner() {
  const banner = await getBannerByKey("festival_banner");

  const ctaWords = (banner.ctaText || "SHOP NOW").split(" ");
  const firstCtaWord = ctaWords[0] || "SHOP";
  const restCtaWords = ctaWords.slice(1).join(" ");

  const gradientFrom = banner.gradientFrom || "#298FC2";
  const gradientTo = banner.gradientTo || "#FFFFFF";

  return (
    <section className="fb-section relative w-full overflow-hidden" style={{ height: "560px" }}>
      {/* Background image */}
      <Image
        src={banner.imageUrl}
        alt={banner.title}
        fill
        className="object-cover object-center"
        loading="lazy"
        unoptimized={banner.imageUrl.startsWith("http")}
      />

      {/* Content */}
      <div
        className="fb-content absolute inset-0 flex flex-col items-center text-center justify-center h-px-section"
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        {/* Title */}
        <h2
          className="fb-title font-prata"
          style={{
            fontSize: "clamp(28px,5vw,56px)",
            lineHeight: "125%",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            margin: "0 0 24px 0",
            maxWidth: "680px",
          }}
        >
          {renderHighlightedTitle(banner.title, banner.titleHighlight, gradientFrom, gradientTo)}
        </h2>

        {/* Description */}
        {banner.subtitle && (
          <p
            className="font-lato text-white"
            style={{
              fontSize: "15px",
              lineHeight: "160%",
              margin: "0 0 40px 0",
              maxWidth: "620px",
              opacity: 0.9,
            }}
          >
            {banner.subtitle}
          </p>
        )}

        {/* CTA */}
        <Link
          href={banner.ctaLink || "#"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            paddingBottom: "6px",
            borderBottom: "1px solid rgba(255,255,255,0.7)",
            width: "fit-content",
            textDecoration: "none",
          }}
          className="group/cta"
        >
          <span
            className="font-lato"
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              lineHeight: "150%",
            }}
          >
            <span
              style={{
                background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {firstCtaWord}
            </span>
            {restCtaWords ? <span className="text-white"> {restCtaWords}</span> : null}
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="group-hover/cta:opacity-75 transition-opacity"
          >
            <path d="M17 7L7 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 7H17V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
