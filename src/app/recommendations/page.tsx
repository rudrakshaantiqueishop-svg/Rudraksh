"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProductCard from "@/components/ui/ProductCard";
import {
  type BirthProfile,
  NUMBER_TO_MUKHI,
  NUMBER_INSIGHTS,
  readLocalBirthProfile,
} from "@/lib/recommendation";
import { getBirthProfile, getRecommendedProducts } from "@/app/actions/recommendation";

type RecommendedProduct = Awaited<ReturnType<typeof getRecommendedProducts>>[number];

export default function RecommendationsPage() {
  const { status } = useSession();
  const isAuthed = status === "authenticated";

  const [profile, setProfile] = useState<BirthProfile | null>(null);
  const [products, setProducts] = useState<RecommendedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    let cancelled = false;

    (async () => {
      const p = isAuthed ? await getBirthProfile() : readLocalBirthProfile();
      if (cancelled) return;

      setProfile(p);

      if (p) {
        const slugs = NUMBER_TO_MUKHI[p.lifePathNumber] ?? [];
        const items = await getRecommendedProducts(slugs);
        if (!cancelled) setProducts(items);
      }

      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [status, isAuthed]);

  if (loading) {
    return (
      <div className="h-px-section py-[120px] text-center">
        <p className="font-lato text-gray-text">Finding your Rudraksha…</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="h-px-section py-[120px] flex flex-col items-center text-center gap-5">
        <h1 className="font-prata" style={{ fontSize: "28px", color: "#0B0404", margin: 0 }}>
          No birth details yet
        </h1>
        <p className="font-lato text-gray-text" style={{ maxWidth: "420px" }}>
          Enter your birth details to discover the Rudraksha aligned with your Life Path Number.
        </p>
        <Link
          href="/"
          className="font-lato bg-brown text-white"
          style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", padding: "14px 28px" }}
        >
          ENTER YOUR DETAILS
        </Link>
      </div>
    );
  }

  const firstName = profile.fullName.trim().split(/\s+/)[0];

  return (
    <section className="h-px-section py-[60px] lg:py-[80px]" style={{ background: "#FEF9F2" }}>
      {/* Header */}
      <div className="flex flex-col gap-3 mb-10 lg:mb-12" style={{ maxWidth: "640px" }}>
        <p className="font-lato" style={{ fontSize: "13px", letterSpacing: "0.12em", color: "#BB5A28", fontWeight: 700, margin: 0 }}>
          YOUR LIFE PATH NUMBER · {profile.lifePathNumber}
        </p>
        <h1 className="font-prata" style={{ fontSize: "clamp(24px, 3vw, 30px)", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
          {firstName ? `${firstName}, your Rudraksha awaits` : "Your Rudraksha awaits"}
        </h1>
        <p className="font-lato" style={{ fontSize: "15px", lineHeight: "160%", color: "#44403C", margin: 0 }}>
          {NUMBER_INSIGHTS[profile.lifePathNumber] ?? ""} Based on your birth date, these beads are aligned with your path.
        </p>
      </div>

      {/* Recommended products */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="font-lato text-gray-text">
          We couldn’t find a matching product right now. Please{" "}
          <Link href="/products" className="underline">browse all Rudraksha</Link>.
        </p>
      )}

      {/* Re-take */}
      <div className="mt-12">
        <Link
          href="/"
          className="font-lato"
          style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", color: "#44403C", borderBottom: "1px solid #44403C", paddingBottom: "6px" }}
        >
          UPDATE MY BIRTH DETAILS
        </Link>
      </div>
    </section>
  );
}
