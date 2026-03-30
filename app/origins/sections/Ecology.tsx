"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Ecology() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const o = t.origins;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".commitment-item",
        { opacity: 0, x: isAr ? 30 : -30 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".commitments-grid", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className={clsx("text-center mb-14")}>
          <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-4", isAr && "font-arabic text-sm tracking-normal")}>
            {o.ecology.label}
          </p>
          <h2 className={clsx("font-display text-4xl font-bold text-green", isAr && "font-arabic")}>
            {o.ecology.title}
          </h2>
        </div>
        <div className="commitments-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {o.ecology.commitments.map((c, i) => (
            <div key={i} className={clsx("commitment-item opacity-0 border border-cream-dark p-6 hover:border-gold/40 transition-colors duration-300", isAr && "text-right")}>
              <div className="w-8 h-8 bg-gold/10 border border-gold/30 flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-gold/60 rotate-45" />
              </div>
              <h3 className={clsx("font-display text-lg font-semibold text-green mb-2", isAr && "font-arabic")}>
                {c.title}
              </h3>
              <p className={clsx("font-sans text-sm text-muted leading-relaxed", isAr && "font-arabic")}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
