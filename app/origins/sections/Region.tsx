"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function MoroccoMap({ isAr }: { isAr: boolean }) {
  return (
    <div className="relative">
      <div className={clsx(
        "absolute w-full h-full border border-gold/40 -z-10",
        isAr ? "-top-3 -left-3" : "-top-3 -right-3"
      )} />
      <div className="relative overflow-hidden bg-cream">
        <img
          src="/images/morocco.svg"
          alt="Carte du Maroc — Région Souss-Massa mise en évidence"
          className="w-full h-auto object-contain block"
        />
        <div className={clsx(
          "absolute top-4 bg-green/90 backdrop-blur-sm px-4 py-2 flex flex-col gap-0.5",
          isAr ? "left-4" : "right-4"
        )}>
          <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-gold">Région</span>
          <span className={clsx("font-display text-sm font-bold text-cream", isAr && "font-arabic")}>
            {isAr ? "سوس-ماسة" : "Souss-Massa"}
          </span>
        </div>
        <div className={clsx(
          "absolute bottom-4 bg-white/95 border-l-2 border-gold px-4 py-2.5",
          isAr ? "right-4 border-l-0 border-r-2" : "left-4"
        )}>
          <p className="font-sans text-[8px] tracking-widest uppercase text-muted">
            {isAr ? "عاصمة المنطقة" : "Capitale régionale"}
          </p>
          <p className={clsx("font-display text-sm font-bold text-green mt-0.5", isAr && "font-arabic")}>
            {isAr ? "أگادير · أيدير" : "Agadir · Aïdir"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Region() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const o = t.origins;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".region-text > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".region-text", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className={clsx("grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", isAr && "lg:flex lg:flex-row-reverse")}>
          <div className={clsx("region-text", isAr && "text-right")}>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-4", isAr && "font-arabic text-sm tracking-normal")}>
              {o.region.label}
            </p>
            <h2 className={clsx("font-display text-4xl md:text-5xl font-bold text-green mb-8 leading-tight", isAr && "font-arabic")}>
              {o.region.title}
            </h2>
            {o.region.paragraphs.map((p, i) => (
              <p key={i} className={clsx("font-sans text-base leading-relaxed text-muted mb-4", isAr && "font-arabic")}>
                {p}
              </p>
            ))}
          </div>
          <MoroccoMap isAr={isAr} />
        </div>
      </div>
    </section>
  );
}
