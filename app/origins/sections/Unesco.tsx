"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Unesco() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const o = t.origins;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".unesco-fact",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".unesco-facts", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-green">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className={clsx("text-center mb-14")}>
          <span className="inline-block font-sans text-xs tracking-widest uppercase border border-gold/40 text-gold px-4 py-2 mb-6">
            {o.unesco.badge}
          </span>
          <blockquote className={clsx("font-display text-3xl md:text-4xl italic text-cream max-w-2xl mx-auto leading-relaxed mb-4", isAr && "font-arabic not-italic")}>
            &ldquo;{o.unesco.quote}&rdquo;
          </blockquote>
          <p className="font-sans text-sm text-cream/50">{o.unesco.year}</p>
        </div>
        <div className="unesco-facts grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {o.unesco.facts.map((fact, i) => (
            <div key={i} className="unesco-fact opacity-0 text-center">
              <p className={clsx("font-display text-4xl md:text-5xl font-bold text-gold mb-2", isAr && "font-arabic")}>
                {fact.value}
              </p>
              <p className={clsx("font-sans text-sm text-cream/60", isAr && "font-arabic")}>
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
