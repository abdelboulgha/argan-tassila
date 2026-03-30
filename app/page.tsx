import HeroScroll from "@/app/home/sections/HeroScroll";
import BrandStatement from "@/app/home/sections/BrandStatement";
import FeaturedProducts from "@/app/home/sections/FeaturedProducts";
import StoryTeaser from "@/app/home/sections/StoryTeaser";
import WhatsAppBanner from "@/app/home/sections/WhatsAppBanner";
import Panels from "@/app/origins/sections/Panels";
import Unesco from "@/app/origins/sections/Unesco";
import Region from "@/app/origins/sections/Region";
import Ecology from "@/app/origins/sections/Ecology";
import Intro from "@/app/process/sections/Intro";
import Timeline from "@/app/process/sections/Timeline";
import Engagements from "@/app/process/sections/Engagements";

export default function HomePage() {
  return (
    <>
      <HeroScroll />
      <BrandStatement />
      <FeaturedProducts />
      <StoryTeaser />
      <Intro />
      <Timeline />
      <Engagements />
      <Panels />
      <Unesco />
      <Region />
      <Ecology />
      <WhatsAppBanner />
    </>
  );
}
