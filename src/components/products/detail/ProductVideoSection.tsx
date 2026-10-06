interface ProductVideoSectionProps {
  videoUrl?: string | null;
  productName: string;
}

export function getYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  const embedMatch = trimmed.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  const shortsMatch = trimmed.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  return null;
}

export default function ProductVideoSection({
  videoUrl,
  productName,
}: ProductVideoSectionProps) {
  if (!videoUrl || !videoUrl.trim()) return null;

  const videoId = getYouTubeVideoId(videoUrl);
  if (!videoId) return null;

  return (
    <section className="h-px-section py-14 lg:py-20" style={{ background: "#FEF9F2" }}>
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-8 sm:mb-10 max-w-2xl px-4">
          <h2 className="font-prata text-2xl sm:text-3xl lg:text-[36px] text-dark m-0 leading-[1.3] font-normal">
            Understand the Sacred Significance &amp; Benefits
          </h2>

          <p className="font-lato text-sm text-gray-text m-0 leading-relaxed">
            Watch our expert spiritual guide explain the authentic properties, Vedic significance, and proper wearing rituals for {productName}.
          </p>
        </div>

        {/* Video Player Frame */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(43,26,18,0.12)] border border-[#E7DFD6] bg-[#0B0404]">
          <div className="relative w-full aspect-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={`${productName} Educational Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
