"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const p = t.process;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".intro-badge",
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".process-intro", start: "top 88%" } }
      );
      gsap.fromTo(".intro-text",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.15,
          scrollTrigger: { trigger: ".process-intro", start: "top 88%" } }
      );

      const pillarObs = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        document.querySelectorAll<HTMLElement>(".pillar-num").forEach((el, idx) => {
          const raw = el.dataset.val ?? "0";
          const num = parseInt(raw.replace(/\D/g, ""), 10);
          const prefix = raw.startsWith("+") ? "+" : "";
          const suffix = raw.includes("%") ? "%" : "";
          const obj = { val: 0 };
          gsap.to(obj, {
            val: num, duration: 1.8, ease: "power2.out", delay: idx * 0.08,
            onUpdate() { el.innerText = `${prefix}${Math.round(obj.val)}${suffix}`; },
          });
          gsap.fromTo(el.closest(".pillar-item"),
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: idx * 0.08 }
          );
        });
        pillarObs.disconnect();
      }, { threshold: 0.6 });
      const pillarsEl = document.querySelector(".pillars-row");
      if (pillarsEl) pillarObs.observe(pillarsEl);
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section ref={ref} className="py-20 bg-cream process-intro">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <span className={clsx(
          "intro-badge inline-block font-sans text-xs tracking-widest uppercase",
          "border border-gold/40 text-gold px-4 py-2 mb-6",
          isAr && "font-arabic text-sm tracking-normal"
        )}>
          {p.hero.label}
        </span>
        <p className={clsx(
          "intro-text font-sans text-lg md:text-xl leading-relaxed text-muted mb-16",
          isAr && "font-arabic"
        )}>
          {p.intro.text}
        </p>
        <div className="pillars-row grid grid-cols-2 md:grid-cols-4 gap-px bg-cream-dark border border-cream-dark">
          {p.pillars.map((pill, i) => (
            <div key={i} className="pillar-item bg-cream py-8 px-4 text-center">
              <p
                className={clsx("pillar-num font-display text-5xl font-black text-green mb-1", isAr && "font-arabic")}
                data-val={pill.value}
              >
                {pill.value}
              </p>
              <div className="w-6 h-px bg-gold/40 mx-auto my-2" />
              <p className={clsx(
                "font-sans text-[10px] tracking-widest uppercase text-muted",
                isAr && "font-arabic text-xs tracking-normal"
              )}>
                {pill.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
