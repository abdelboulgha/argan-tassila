"use client";

import { useLanguage } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";

export default function Hero() {
  const { t } = useLanguage();
  const o = t.origins;
  
  return (
    <PageHero
      label="ORIGINES"
      title={o.hero.title1}
      subtitle={o.hero.title2}
      image={o.hero.image}
      dark
    />
  );
}
