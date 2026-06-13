import dynamic from "next/dynamic";
import TestimonialHero from "@/components/testimonial/TestimonialHero";

const TestimonialStatsAndCards = dynamic(() => import("@/components/testimonial/TestimonialStatsAndCards"));
const TestimonialProductFeedback = dynamic(() => import("@/components/testimonial/TestimonialProductFeedback"));
const TestimonialPlatformReviews = dynamic(() => import("@/components/testimonial/TestimonialPlatformReviews"));
const TestimonialVideoGrid = dynamic(() => import("@/components/testimonial/TestimonialVideoGrid"));
const TestimonialClarityBanner = dynamic(() => import("@/components/testimonial/TestimonialClarityBanner"));
const TestimonialTrustBanner = dynamic(() => import("@/components/testimonial/TestimonialTrustBanner"));

export default function TestimonialPage() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <TestimonialHero />
      <TestimonialStatsAndCards />
      <TestimonialTrustBanner />
      <TestimonialVideoGrid />
      <TestimonialProductFeedback />
      <TestimonialPlatformReviews />
      <TestimonialClarityBanner />
    </div>
  );
}
