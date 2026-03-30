"use client";

import { useLanguage } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";

export default function Hero() {
  const { t } = useLanguage();
  const p = t.process;
  
  return (
    <PageHero
      label={p.hero.label}
      title={p.hero.title1}
      subtitle={p.hero.title2}
      image={p.hero.image}
      dark
    />
  );
}
