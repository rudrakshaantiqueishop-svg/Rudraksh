import dynamic from "next/dynamic";
import AboutHero from "@/components/about/AboutHero";

const WhenSacred          = dynamic(() => import("@/components/about/WhenSacred"));
const FoundingIntention   = dynamic(() => import("@/components/about/FoundingIntention"));
const DisciplineStandards = dynamic(() => import("@/components/about/DisciplineStandards"));
const Principles          = dynamic(() => import("@/components/about/Principles"));
const WhatHappens         = dynamic(() => import("@/components/about/WhatHappens"));
const WhoWeAreFor         = dynamic(() => import("@/components/about/WhoWeAreFor"));
const LookingForward      = dynamic(() => import("@/components/about/LookingForward"));
const StillHaveQuestions  = dynamic(() => import("@/components/about/StillHaveQuestions"));

export default function AboutPage() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <AboutHero />
      <WhenSacred />
      <FoundingIntention />
      <DisciplineStandards />
      <Principles />
      <WhatHappens />
      <WhoWeAreFor />
      <LookingForward />
      <StillHaveQuestions />
    </div>
  );
}
