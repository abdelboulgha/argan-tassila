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
import SectionTitle from "@/components/ui/SectionTitle";

export default function HomePage() {
  return (
    <>
      <HeroScroll />

      <SectionTitle number="01" titleFr="Notre Histoire" titleAr="قصتنا" background="cream" />
      <BrandStatement />
      <StoryTeaser />

      <SectionTitle number="02" titleFr="Notre Terroir" titleAr="أرضنا" background="cream" />
      <Region />
      <Panels />
      <Ecology />
      <Unesco />

      <SectionTitle
        number="03"
        titleFr="Notre Processus"
        titleAr="عمليتنا"
        background="cream"
      />
      <Intro />
      <Timeline />
      <Engagements />

      <SectionTitle number="04" titleFr="Nos Produits" titleAr="منتجاتنا" background="white" />
      <FeaturedProducts />

      <WhatsAppBanner />
    </>
  );
}
