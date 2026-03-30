"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const a = t.about;
  const ref = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statEls = document.querySelectorAll(".stat-counter");
      const statValues = a.stats.items.map(s => s.value);
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          statValues.forEach((target, i) => {
            gsap.to({}, {
              duration: 2,
              ease: "power2.out",
              onUpdate: function() {
                const progress = this.progress();
                setCounts(prev => {
                  const next = [...prev];
                  next[i] = Math.round(target * progress);
                  return next;
                });
              },
            });
          });
          observer.disconnect();
        }
      }, { threshold: 0.5 });
      if (statEls[0]) observer.observe(statEls[0].parentElement!);
    }, ref);
    return () => ctx.revert();
  }, [a.stats.items]);

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {a.stats.items.map((stat, i) => (
            <div key={i} className={clsx("text-center", isAr && "font-arabic")}>
              <p className="stat-counter font-display text-5xl md:text-6xl font-bold text-green">
                {counts[i]}{stat.suffix}
              </p>
              <p className={clsx("font-sans text-sm text-muted mt-2", isAr && "font-arabic")}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
