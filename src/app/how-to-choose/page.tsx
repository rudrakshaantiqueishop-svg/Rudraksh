import HowToChooseAuthenticityTransparency from "@/components/how-to-choose/HowToChooseAuthenticityTransparency";
import HowToChooseConfusion from "@/components/how-to-choose/HowToChooseConfusion";
import HowToChooseExploreByPurpose from "@/components/how-to-choose/HowToChooseExploreByPurpose";
import HowToChooseGuidanceBanner from "@/components/how-to-choose/HowToChooseGuidanceBanner";
import HowToChooseHero from "@/components/how-to-choose/HowToChooseHero";
import HowToChooseIsThisRight from "@/components/how-to-choose/HowToChooseIsThisRight";
import HowToChoosePhilosophy from "@/components/how-to-choose/HowToChoosePhilosophy";
import HowToChooseSteps from "@/components/how-to-choose/HowToChooseSteps";
import HowToChooseStillUnsure from "@/components/how-to-choose/HowToChooseStillUnsure";
import HowToChooseWhenNotToBuy from "@/components/how-to-choose/HowToChooseWhenNotToBuy";

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
