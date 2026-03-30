"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Values() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const a = t.about;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".value-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".values-grid", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className={clsx("text-center mb-16", isAr && "font-arabic")}>
          <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-4", isAr && "text-sm tracking-normal")}>
            {a.values.label}
          </p>
          <h2 className={clsx("font-display text-4xl md:text-5xl font-bold text-green", isAr && "font-arabic")}>
            {a.values.title}
          </h2>
        </div>
        <div className="values-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {a.values.items.map((value, i) => (
            <div key={i} className={clsx("value-card opacity-0 border border-cream-dark p-8 hover:border-gold/40 transition-colors duration-300", isAr && "text-right")}>
              <div className={clsx("flex items-center gap-3 mb-6", isAr && "flex-row-reverse")}>
                <span className="font-sans text-xs text-gold tracking-widest">0{i + 1}</span>
                <div className="w-8 h-px bg-gold/30" />
              </div>
              <h3 className={clsx("font-display text-2xl font-semibold text-green mb-4", isAr && "font-arabic")}>
                {value.title}
              </h3>
              <p className={clsx("font-sans text-sm leading-relaxed text-muted", isAr && "font-arabic")}>
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
