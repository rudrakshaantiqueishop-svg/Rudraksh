import dynamic from "next/dynamic";
import ConsultationHero from "@/components/consultation/ConsultationHero";
import ConsultationForm from "@/components/consultation/ConsultationForm";

const WhyConsultationMatters = dynamic(() => import("@/components/consultation/WhyConsultationMatters"));
const WhenGuidanceBecomesHelpful = dynamic(() => import("@/components/consultation/WhenGuidanceBecomesHelpful"));
const ExperiencedAndResponsibleGuidance = dynamic(() => import("@/components/consultation/ExperiencedAndResponsibleGuidance"));
const HowConsultationWorks = dynamic(() => import("@/components/consultation/HowConsultationWorks"));
const WhatTheConsultationIncludes = dynamic(() => import("@/components/consultation/WhatTheConsultationIncludes"));
const OurApproachToGuidance = dynamic(() => import("@/components/consultation/OurApproachToGuidance"));
const InPersonGuidanceAvailable = dynamic(() => import("@/components/consultation/InPersonGuidanceAvailable"));
const LookingForMoreGuidance = dynamic(() => import("@/components/consultation/LookingForMoreGuidance"));

export default function ConsultationPage() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <ConsultationHero />
      <WhyConsultationMatters />
      <ConsultationForm />
      <WhenGuidanceBecomesHelpful />
      <ExperiencedAndResponsibleGuidance />
      <HowConsultationWorks />
      <WhatTheConsultationIncludes />
      <OurApproachToGuidance />
      <InPersonGuidanceAvailable />
      <LookingForMoreGuidance />
    </div>
  );
}
