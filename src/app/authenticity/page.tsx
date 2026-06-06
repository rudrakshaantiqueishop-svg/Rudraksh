import dynamic from "next/dynamic";
import AuthenticityHero from "@/components/authenticity/AuthenticityHero";

const WhatAuthenticityMeans    = dynamic(() => import("@/components/authenticity/WhatAuthenticityMeans"));
const VerificationProcess      = dynamic(() => import("@/components/authenticity/VerificationProcess"));
const CertificationAssurance   = dynamic(() => import("@/components/authenticity/CertificationAssurance"));
const CertificationScope       = dynamic(() => import("@/components/authenticity/CertificationScope"));
const IdentifyCertification    = dynamic(() => import("@/components/authenticity/IdentifyCertification"));
const SourcingAndResponsibility = dynamic(() => import("@/components/authenticity/SourcingAndResponsibility"));
const StillHaveQuestions       = dynamic(() => import("@/components/authenticity/StillHaveQuestions"));
const FAQ                      = dynamic(() => import("@/components/authenticity/FAQ"));
const BlogPosts                = dynamic(() => import("@/components/BlogPosts"));

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
