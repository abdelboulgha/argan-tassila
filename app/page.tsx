import HeroScroll from "@/app/home/sections/HeroScroll";
import BrandStatement from "@/app/home/sections/BrandStatement";
import FeaturedProducts from "@/app/home/sections/FeaturedProducts";
import StoryTeaser from "@/app/home/sections/StoryTeaser";
import WhatsAppBanner from "@/app/home/sections/WhatsAppBanner";

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
