import HeroSection from "@/components/HeroSection";
import ShopByCategory from "@/components/ShopByCategory";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <main>
        <HeroSection />
        <ShopByCategory />
      </main>
    </div>
  );
}
