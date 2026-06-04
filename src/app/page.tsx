import HeroSection from "@/components/HeroSection";
import ShopByCategory from "@/components/ShopByCategory";
import WhoWeAre from "@/components/WhoWeAre";
import ShopByPurpose from "@/components/ShopByPurpose";
import RudrakshaBirthForm from "@/components/RudrakshaBirthForm";
import BestsellerProducts from "@/components/BestsellerProducts";
import FestivalBanner from "@/components/FestivalBanner";
import AuthenticityBanner from "@/components/AuthenticityBanner";
import EnergisationProcess from "@/components/EnergisationProcess";
import IndramalaBanner from "@/components/IndramalaBanner";
import WhyChooseUs from "@/components/WhyChooseUs";
import GetInspired from "@/components/GetInspired";
import GuidanceBanner from "@/components/GuidanceBanner";
import BlogPosts from "@/components/BlogPosts";
import Footer from "@/components/Footer";

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
      </main>
    </div>
  );
}
