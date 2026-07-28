"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const SRC = "/assets/images/products/category-bracelets.png";
const ZOOM = 1.6; // magnification inside the lens
const DEFAULT_LENS = 240; // default lens diameter in px
const MOBILE_LENS = 120; // mobile lens diameter in px

export default function ProductZoomShowcase() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [lensSize, setLensSize] = useState(DEFAULT_LENS);
  // Cursor position within the frame (px) + current frame size (px).
  const [lens, setLens] = useState({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLensSize(MOBILE_LENS);
      } else {
        setLensSize(DEFAULT_LENS);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const track = (clientX: number, clientY: number) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = clientX - r.left;
    const y = clientY - r.top;
    // Leaving the frame bounds turns the lens off.
    if (x < 0 || y < 0 || x > r.width || y > r.height) {
      setActive(false);
      return;
    }
    setActive(true);
    setLens({ x, y, w: r.width, h: r.height });
  };

  const radius = lensSize / 2;

  return (
    <section
      className="h-px-section"
      style={{ background: "#FEF9F2", paddingTop: "40px", paddingBottom: "40px" }}
    >
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        <div
          ref={frameRef}
          onMouseEnter={(e) => track(e.clientX, e.clientY)}
          onMouseMove={(e) => track(e.clientX, e.clientY)}
          onMouseLeave={() => setActive(false)}
          onTouchStart={(e) => {
            const t = e.touches[0];
            track(t.clientX, t.clientY);
          }}
          onTouchMove={(e) => {
            const t = e.touches[0];
            track(t.clientX, t.clientY);
          }}
          onTouchEnd={() => setActive(false)}
          onTouchCancel={() => setActive(false)}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "700 / 360",
            overflow: "hidden",
            cursor: "zoom-in",
            touchAction: "none",
            background: "#000",
          }}
        >
          {/* Base image — stays at normal size */}
          <Image
            src={SRC}
            alt="Handcrafted Rudraksha and gemstone bracelets"
            fill
            sizes="(max-width: 1024px) 100vw, 1300px"
            style={{ objectFit: "cover" }}
            priority={false}
          />

          {/* Magnifier lens — a small circle that follows the cursor */}
          {active && lens.w > 0 && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: `${lens.x - radius}px`,
                top: `${lens.y - radius}px`,
                width: `${lensSize}px`,
                height: `${lensSize}px`,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.85)",
                boxShadow: "0 4px 18px rgba(0,0,0,0.35)",
                pointerEvents: "none",
              }}
            >
              {/* Enlarged copy, shifted so the cursor point sits at the lens centre */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SRC}
                alt=""
                style={{
                  position: "absolute",
                  width: `${lens.w * ZOOM}px`,
                  height: `${lens.h * ZOOM}px`,
                  maxWidth: "none",
                  objectFit: "cover",
                  left: `${radius - lens.x * ZOOM}px`,
                  top: `${radius - lens.y * ZOOM}px`,
                }}
              />
            </div>
          )}

          {/* Idle hint — "+" badge, fades out while the lens is active */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
              pointerEvents: "none",
              opacity: active ? 0 : 1,
              transition: "opacity 0.2s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#552912" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
