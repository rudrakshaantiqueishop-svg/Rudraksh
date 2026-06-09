import TestimonialHero from "@/components/testimonial/TestimonialHero";
import TestimonialStatsAndCards from "@/components/testimonial/TestimonialStatsAndCards";
import TestimonialProductFeedback from "@/components/testimonial/TestimonialProductFeedback";
import TestimonialPlatformReviews from "@/components/testimonial/TestimonialPlatformReviews";
import TestimonialVideoGrid from "@/components/testimonial/TestimonialVideoGrid";
import TestimonialClarityBanner from "@/components/testimonial/TestimonialClarityBanner";
import TestimonialTrustBanner from "@/components/testimonial/TestimonialTrustBanner";

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
