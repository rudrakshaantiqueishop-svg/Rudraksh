"use client";

import Image from "next/image";
import { useState, useRef, memo } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import type { InspiredItemData } from "@/lib/inspired";

function getYouTubeVideoId(url?: string | null): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

const VISIBLE = 4;

const ProductCard = memo(function ProductCard({
  p,
  className,
  style,
}: {
  p: InspiredItemData;
  className?: string;
  style?: React.CSSProperties;
}) {
  const videoId = p.type === "video" ? getYouTubeVideoId(p.videoUrl) : null;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);

    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      const func = nextPlaying ? "playVideo" : "pauseVideo";
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args: [] }),
        "*"
      );
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      if (nextMuted) {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "mute", args: [] }),
          "*"
        );
      } else {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "unMute", args: [] }),
          "*"
        );
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "setVolume", args: [100] }),
          "*"
        );
      }
    }
  };

  const origin = typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "";

  return (
    <div
      className={`group/card cursor-pointer ${className || ""}`}
      style={style}
      onClick={() => {
        if (videoId && !isPlaying) {
          setIsPlaying(true);
        }
      }}
    >
      {/* Card Media Container */}
      <div className="relative overflow-hidden mb-3 h-[451px] rounded-lg bg-black">
        {videoId && isPlaying ? (
          /* Playing YouTube Short */
          <div className="relative w-full h-full overflow-hidden">
            <iframe
              ref={iframeRef}
              id={`yt-player-${p.id}`}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&enablejsapi=1&playsinline=1&modestbranding=1&rel=0${origin ? `&origin=${origin}` : ""}`}
              title={p.title}
              className="w-full h-[125%] -mt-[12%] border-none pointer-events-none scale-105"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />

            {/* Video Controls Overlay (Top Right) */}
            <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={togglePlay}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-black/70 text-white backdrop-blur-md hover:bg-black transition-all shadow-md"
                aria-label={isPlaying ? "Pause video" : "Play video"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} fill="white" />}
              </button>

              {/* Mute / Unmute Toggle Button */}
              <button
                type="button"
                onClick={toggleMute}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-black/70 text-white backdrop-blur-md hover:bg-black transition-all shadow-md"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                title={isMuted ? "Unmute sound" : "Mute sound"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
        ) : (
          /* Cover Thumbnail with Play Badge */
          <div className="relative w-full h-full">
            <Image
              src={p.imageUrl}
              alt={p.title}
              fill
              sizes="(max-width: 1024px) 301px, 25vw"
              style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
              className="group-hover/card:scale-105"
              unoptimized={p.imageUrl.startsWith("http")}
            />

            {/* Play Badge */}
            {videoId && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 group-hover/card:bg-black/30 transition-colors">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/90 shadow-xl text-[#552912] group-hover/card:scale-110 transition-transform">
                  <Play size={24} fill="#552912" className="ml-1" />
                </div>
              </div>
            )}

            {/* Play with Sound Direct Button */}
            {videoId && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(true);
                  setIsMuted(false);
                }}
                className="absolute top-3 right-3 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black transition-all shadow-md"
                title="Play with sound"
              >
                <VolumeX size={18} />
              </button>
            )}
          </div>
        )}

        {/* Top-Left Inset Box: Product Image for the Review */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            width: "76px",
            height: "76px",
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.9)",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
            zIndex: 20,
          }}
        >
          <Image
            src={p.productImageUrl || p.imageUrl}
            alt="Product Review"
            fill
            sizes="76px"
            style={{ objectFit: "cover" }}
            unoptimized={(p.productImageUrl || p.imageUrl).startsWith("http")}
          />
        </div>
      </div>

      {/* Info */}
      <p className="font-prata" style={{ fontSize: "16px", lineHeight: "140%", color: "#0B0404", margin: "0 0 6px 0" }}>
        {p.title}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {p.price && (
          <span className="font-lato" style={{ fontSize: "15px", fontWeight: 500, color: "#0B0404" }}>
            {p.price}
          </span>
        )}
        {p.originalPrice && (
          <span className="font-lato" style={{ fontSize: "13px", color: "#A8A29E", textDecoration: "line-through" }}>
            {p.originalPrice}
          </span>
        )}
      </div>
    </div>
  );
});

export default function GetInspiredClient({ initialItems }: { initialItems: InspiredItemData[] }) {
  const [start, setStart] = useState(0);

  const canPrev = start > 0;
  const canNext = start + VISIBLE < initialItems.length;
  const visible = initialItems.slice(start, start + VISIBLE);

  return (
    <section className="h-px-section py-[60px] lg:py-[80px]" style={{ background: "#FEF9F2" }}>
      {/* Header */}
      <div className="flex flex-col items-start gap-4 mb-8 lg:flex-row lg:items-center lg:justify-between lg:mb-[32px]">
        <h2
          className="font-prata text-3xl lg:text-[36px]"
          style={{ lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}
        >
          Get Inspired
        </h2>

        {/* Nav arrows */}
        <div className="hidden lg:flex gap-[12px] items-center">
          <button
            onClick={() => canPrev && setStart(start - 1)}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.18)",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: canPrev ? "pointer" : "not-allowed",
              opacity: canPrev ? 1 : 0.4,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#44403C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={() => canNext && setStart(start + 1)}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "#552912",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: canNext ? "pointer" : "not-allowed",
              opacity: canNext ? 1 : 0.5,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Cards row */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-5">
        {visible.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      {/* Mobile Cards (Scrollable) */}
      <div className="flex lg:hidden overflow-x-auto no-scrollbar gap-4 pb-4" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
        {initialItems.map((p) => (
          <ProductCard key={p.id} p={p} className="flex-shrink-0 w-[301px]" style={{ scrollSnapAlign: "start" }} />
        ))}
      </div>
    </section>
  );
}
