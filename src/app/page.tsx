import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ShopByCategory from "@/components/ShopByCategory";

const WhoWeAre            = dynamic(() => import("@/components/WhoWeAre"));
const ShopByPurpose       = dynamic(() => import("@/components/ShopByPurpose"));
const RudrakshaBirthForm  = dynamic(() => import("@/components/RudrakshaBirthForm"));
const BestsellerProducts  = dynamic(() => import("@/components/BestsellerProducts"));
const FestivalBanner      = dynamic(() => import("@/components/FestivalBanner"));
const AuthenticityBanner  = dynamic(() => import("@/components/AuthenticityBanner"));
const EnergisationProcess = dynamic(() => import("@/components/EnergisationProcess"));
const IndramalaBanner     = dynamic(() => import("@/components/IndramalaBanner"));
const WhyChooseUs         = dynamic(() => import("@/components/WhyChooseUs"));
const GetInspired         = dynamic(() => import("@/components/GetInspired"));
const GuidanceBanner      = dynamic(() => import("@/components/GuidanceBanner"));
const BlogPosts           = dynamic(() => import("@/components/BlogPosts"));
const Footer              = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <main>
        <HeroSection />
        <ShopByCategory />
        <WhoWeAre />
        <ShopByPurpose />
        <RudrakshaBirthForm />
        <BestsellerProducts />
        <FestivalBanner />
        <AuthenticityBanner />
        <EnergisationProcess />
        <IndramalaBanner />
        <WhyChooseUs />
        <GetInspired />
        <GuidanceBanner />
        <BlogPosts />
        <Footer />
      </main>
    </div>
  );
}
