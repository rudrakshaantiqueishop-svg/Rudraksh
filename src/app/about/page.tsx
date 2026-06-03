import AboutHero from "@/components/about/AboutHero";
import WhenSacred from "@/components/about/WhenSacred";
import FoundingIntention from "@/components/about/FoundingIntention";
import DisciplineStandards from "@/components/about/DisciplineStandards";
import Principles from "@/components/about/Principles";
import WhatHappens from "@/components/about/WhatHappens";
import WhoWeAreFor from "@/components/about/WhoWeAreFor";
import LookingForward from "@/components/about/LookingForward";
import StillHaveQuestions from "@/components/about/StillHaveQuestions";

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
