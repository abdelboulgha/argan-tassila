"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Engagements() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const p = t.process;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".engagement-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".engagement-grid", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <p className={clsx(
            "font-sans text-xs tracking-widest uppercase text-gold mb-4",
            isAr && "font-arabic text-sm tracking-normal"
          )}>
            {p.engagement.label}
          </p>
          <h2 className={clsx("font-display text-4xl md:text-5xl font-bold text-green", isAr && "font-arabic")}>
            {p.engagement.title}
          </h2>
        </div>
        <div className="engagement-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {p.engagement.items.map((item, i) => (
            <div key={i} className={clsx(
              "engagement-card opacity-0 bg-white border border-cream-dark p-8",
              "hover:border-gold/40 transition-colors duration-300",
              isAr && "text-right"
            )}>
              <div className={clsx("flex items-center gap-3 mb-6", isAr && "flex-row-reverse")}>
                <span className="font-sans text-xs text-gold tracking-widest">0{i + 1}</span>
                <div className="flex-1 h-px bg-gold/20" />
              </div>
              <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center mb-5">
                <div className="w-3.5 h-3.5 bg-gold/60 rotate-45" />
              </div>
              <h3 className={clsx("font-display text-xl font-semibold text-green mb-3", isAr && "font-arabic")}>
                {item.title}
              </h3>
              <p className={clsx("font-sans text-sm text-muted leading-relaxed", isAr && "font-arabic")}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
