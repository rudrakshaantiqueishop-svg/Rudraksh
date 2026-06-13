import dynamic from "next/dynamic";
import HowToChooseHero from "@/components/how-to-choose/HowToChooseHero";

const HowToChooseAuthenticityTransparency = dynamic(() => import("@/components/how-to-choose/HowToChooseAuthenticityTransparency"));
const HowToChooseConfusion = dynamic(() => import("@/components/how-to-choose/HowToChooseConfusion"));
const HowToChooseExploreByPurpose = dynamic(() => import("@/components/how-to-choose/HowToChooseExploreByPurpose"));
const HowToChooseGuidanceBanner = dynamic(() => import("@/components/how-to-choose/HowToChooseGuidanceBanner"));
const HowToChooseIsThisRight = dynamic(() => import("@/components/how-to-choose/HowToChooseIsThisRight"));
const HowToChoosePhilosophy = dynamic(() => import("@/components/how-to-choose/HowToChoosePhilosophy"));
const HowToChooseSteps = dynamic(() => import("@/components/how-to-choose/HowToChooseSteps"));
const HowToChooseStillUnsure = dynamic(() => import("@/components/how-to-choose/HowToChooseStillUnsure"));
const HowToChooseWhenNotToBuy = dynamic(() => import("@/components/how-to-choose/HowToChooseWhenNotToBuy"));

export default function HowToChoosePage() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <HowToChooseHero />
      <HowToChooseConfusion />
      <HowToChooseIsThisRight />
      <HowToChooseWhenNotToBuy />
      <HowToChoosePhilosophy />
      <HowToChooseStillUnsure />
      <HowToChooseSteps />
      <HowToChooseExploreByPurpose />
      <HowToChooseGuidanceBanner />
      <HowToChooseAuthenticityTransparency />
    </div>
  );
}
