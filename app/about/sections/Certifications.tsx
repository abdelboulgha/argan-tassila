"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const a = t.about;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cert-item",
        { opacity: 0, x: isAr ? 30 : -30 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".cert-grid", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section ref={ref} className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className={clsx("text-center mb-16")}>
          <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-4", isAr && "font-arabic text-sm tracking-normal")}>
            {a.certifications.label}
          </p>
          <h2 className={clsx("font-display text-4xl md:text-5xl font-bold text-green", isAr && "font-arabic")}>
            {a.certifications.title}
          </h2>
        </div>
        <div className="cert-grid grid grid-cols-2 md:grid-cols-4 gap-6">
          {a.certifications.items.map((cert, i) => (
            <div key={i} className={clsx("cert-item opacity-0 bg-white border border-cream-dark p-6 text-center hover:border-gold/40 transition-colors duration-300")}>
              <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mx-auto mb-4">
                <div className="w-4 h-4 bg-gold/60 rotate-45" />
              </div>
              <h3 className={clsx("font-display text-base font-semibold text-green mb-2", isAr && "font-arabic")}>
                {cert.title}
              </h3>
              <p className={clsx("font-sans text-xs text-muted", isAr && "font-arabic")}>
                {cert.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
