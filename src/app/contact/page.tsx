import dynamic from "next/dynamic";
import ContactHero from "@/components/contact/ContactHero";

const GetInTouch           = dynamic(() => import("@/components/contact/GetInTouch"));
const VisitOurStore        = dynamic(() => import("@/components/contact/VisitOurStore"));
const InsideOurSpace       = dynamic(() => import("@/components/contact/InsideOurSpace"));
const FindUsEasily         = dynamic(() => import("@/components/contact/FindUsEasily"));
const PlanYourVisit        = dynamic(() => import("@/components/contact/PlanYourVisit"));
const ProductGuidanceBanner = dynamic(() => import("@/components/contact/ProductGuidanceBanner"));
const BeyondRishikesh      = dynamic(() => import("@/components/contact/BeyondRishikesh"));
const ContinueWithClarity  = dynamic(() => import("@/components/contact/ContinueWithClarity"));

export default function ContactPage() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <ContactHero />
      <GetInTouch />
      <VisitOurStore />
      <InsideOurSpace />
      <FindUsEasily />
      <PlanYourVisit />
      <ProductGuidanceBanner />
      <BeyondRishikesh />
      <ContinueWithClarity />
    </div>
  );
}
