import dynamic from "next/dynamic";
import EnergisationHero from "@/components/energisation/EnergisationHero";

const WhatWeMeanByEnergisation = dynamic(() => import("@/components/energisation/WhatWeMeanByEnergisation"));
const WhyEnergisationExists    = dynamic(() => import("@/components/energisation/WhyEnergisationExists"));
const WhenEnergisationIsRecommended = dynamic(() => import("@/components/energisation/WhenEnergisationIsRecommended"));
const OurEnergisationProcess   = dynamic(() => import("@/components/energisation/OurEnergisationProcess"));
const RudrakshaBirthForm       = dynamic(() => import("@/components/RudrakshaBirthForm"));
const WhatEnergisationDoesNot  = dynamic(() => import("@/components/energisation/WhatEnergisationDoesNot"));
const StillUnsure              = dynamic(() => import("@/components/energisation/StillUnsure"));
const ExperiencesSharedByCustomers = dynamic(() => import("@/components/energisation/ExperiencesSharedByCustomers"));
const ContinueWithClarity      = dynamic(() => import("@/components/energisation/ContinueWithClarity"));

export default function EnergisationProcessPage() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <EnergisationHero />
      <WhatWeMeanByEnergisation />
      <WhyEnergisationExists />
      <WhenEnergisationIsRecommended />
      <OurEnergisationProcess />
      <RudrakshaBirthForm />
      <WhatEnergisationDoesNot />
      <StillUnsure />
      <ExperiencesSharedByCustomers />
      <ContinueWithClarity />
    </div>
  );
}
