"use client";

import { useLanguage } from "@/lib/i18n";
import { clsx } from "clsx";

interface LanguageSwitcherProps {
  light?: boolean;
}

export default function LanguageSwitcher({ light = false }: LanguageSwitcherProps) {
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label={`Changer la langue en ${lang === "fr" ? "arabe" : "français"}`}
      className={clsx(
        "flex items-center gap-1 font-sans text-xs font-medium tracking-widest uppercase transition-colors duration-200 px-3 py-1.5 border",
        light
          ? "border-cream/40 text-cream hover:border-gold hover:text-gold"
          : "border-green/30 text-green hover:border-gold hover:text-gold"
      )}
    >
      <span
        className={clsx(
          "transition-opacity",
          lang === "fr" ? "opacity-100 font-semibold" : "opacity-50"
        )}
      >
        FR
      </span>
      <span className={clsx(light ? "text-cream/40" : "text-muted")}>|</span>
      <span
        className={clsx(
          "transition-opacity font-arabic",
          lang === "ar" ? "opacity-100 font-semibold" : "opacity-50"
        )}
      >
        AR
      </span>
    </button>
  );
}
