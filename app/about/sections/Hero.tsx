"use client";

import PageHero from "@/components/ui/PageHero";
import { useLanguage } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLanguage();
  const a = t.about;
  
  return (
    <PageHero
      label={a.hero.label}
      title={a.hero.title}
      image="https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1920&q=80"
      dark={false}
    />
  );
}
