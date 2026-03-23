import HeroSection from "@/components/home/HeroSection";
import BrandStatement from "@/components/home/BrandStatement";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StoryTeaser from "@/components/home/StoryTeaser";
import WhatsAppBanner from "@/components/home/WhatsAppBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStatement />
      <FeaturedProducts />
      <StoryTeaser />
      <WhatsAppBanner />
    </>
  );
}
