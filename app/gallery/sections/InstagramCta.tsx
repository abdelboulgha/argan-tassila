"use client";

import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function InstagramCta() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const g = t.gallery;

  return (
    <section className="py-20 bg-green relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0 border-l border-white" style={{ left: `${(i + 1) * 9.09}%` }} />
        ))}
      </div>
      <div className="relative max-w-xl mx-auto px-6 text-center">
        <div className="w-5 h-px bg-gold mx-auto mb-7" />
        <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-gold mb-5">Instagram</p>
        <h2 className={clsx("font-display text-3xl md:text-4xl font-bold text-cream mb-3", isAr && "font-arabic")}>
          {g.instagram.title}
        </h2>
        <p className="font-sans text-sm text-cream/40 mb-8">{g.instagram.handle}</p>
        <a
          href="https://instagram.com/argan_tassila"
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "inline-flex items-center gap-3 font-sans text-[10px] tracking-widest uppercase",
            "border border-gold/40 text-gold px-8 py-4 hover:bg-gold hover:text-green hover:border-gold transition-all duration-300",
            isAr && "flex-row-reverse"
          )}
        >
          <InstagramIcon />
          {g.instagram.cta}
        </a>
      </div>
    </section>
  );
}
