"use client";

import { useLanguage } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";

export default function Hero() {
  const { t } = useLanguage();
  const p = t.products;
  
  return (
    <PageHero
      label={p.hero.label}
      title={p.hero.title}
      subtitle={p.hero.subtitle}
      image={p.hero.image}
      dark={false}
    />
  );
}
