"use client";

import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

interface SectionMarkProps {
  number: string;
  labelFr: string;
  labelAr: string;
  dark?: boolean;
}

export default function SectionMark({ number, labelFr, labelAr, dark = false }: SectionMarkProps) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const label = isAr ? labelAr : labelFr;

  return (
    <div
      className={clsx(
        "w-full flex items-center gap-4 px-6 md:px-10 py-3 border-t",
        dark
          ? "bg-green border-white/10"
          : "bg-white border-green/10",
        isAr && "flex-row-reverse"
      )}
    >
      <span
        className={clsx(
          "font-sans text-[10px] tracking-[0.2em] uppercase",
          dark ? "text-gold/70" : "text-gold/60"
        )}
      >
        {number}
      </span>
      <div className={clsx("w-4 h-px", dark ? "bg-white/20" : "bg-green/15")} />
      <span
        className={clsx(
          "font-sans text-[10px] tracking-[0.2em] uppercase",
          dark ? "text-cream/50" : "text-green/40",
          isAr && "font-arabic text-xs tracking-normal"
        )}
      >
        {label}
      </span>
    </div>
  );
}
