import HeroScroll from "@/components/home/HeroScroll";
import BrandStatement from "@/components/home/BrandStatement";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StoryTeaser from "@/components/home/StoryTeaser";
import WhatsAppBanner from "@/components/home/WhatsAppBanner";

export default function HomePage() {
  return (
    <>
      <HeroScroll />
      <BrandStatement />
      <FeaturedProducts />
      <StoryTeaser />
      <WhatsAppBanner />
    </>
  );
}
