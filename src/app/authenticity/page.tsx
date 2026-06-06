import AuthenticityHero from "@/components/authenticity/AuthenticityHero";
import WhatAuthenticityMeans from "@/components/authenticity/WhatAuthenticityMeans";
import VerificationProcess from "@/components/authenticity/VerificationProcess";
import CertificationAssurance from "@/components/authenticity/CertificationAssurance";
import CertificationScope from "@/components/authenticity/CertificationScope";
import IdentifyCertification from "@/components/authenticity/IdentifyCertification";
import SourcingAndResponsibility from "@/components/authenticity/SourcingAndResponsibility";
import StillHaveQuestions from "@/components/authenticity/StillHaveQuestions";
import FAQ from "@/components/authenticity/FAQ";
import BlogPosts from "@/components/BlogPosts";

export default function AuthenticityPage() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <AuthenticityHero />
      <WhatAuthenticityMeans />
      <VerificationProcess />
      <CertificationAssurance />
      <CertificationScope />
      <IdentifyCertification />
      <SourcingAndResponsibility />
      <StillHaveQuestions />
      <FAQ />
      <BlogPosts />
    </div>
  );
}
