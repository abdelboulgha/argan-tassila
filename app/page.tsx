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
import SectionMark from "@/components/ui/SectionMark";

export default function HomePage() {
  return (
    <>
      <HeroScroll />

      <SectionMark number="01" labelFr="Notre Histoire" labelAr="قصتنا" />
      <BrandStatement />
      <StoryTeaser />

      <SectionMark number="02" labelFr="Notre Terroir" labelAr="أرضنا" dark />
      <Region />
      <Panels />
      <Ecology />
      <Unesco />

      <SectionMark
        number="03"
        labelFr="Notre Processus"
        labelAr="عمليتنا"
        dark
      />
      <Intro />
      <Timeline />
      <Engagements />

      <SectionMark number="04" labelFr="Nos Produits" labelAr="منتجاتنا" />
      <FeaturedProducts />

      <WhatsAppBanner />
    </>
  );
}
