"use client";

import { useLanguage } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";

export default function Hero() {
  const { t } = useLanguage();
  const g = t.gallery;
  
  return (
    <PageHero
      label={g.hero.label}
      title={g.hero.title}
      dark={false}
    />
  );
}
