"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function BrandStatement() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const s = t.home.statement;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".statement-quote",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".statement-quote", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".statement-pillar",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".statement-pillars", start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Quote */}
        <div className={clsx("max-w-3xl mx-auto text-center mb-20", isAr && "font-arabic")}>
          <div className="flex justify-center mb-6">
            <div className="w-12 h-0.5 bg-gold" />
          </div>
          <blockquote
            className={clsx(
              "statement-quote opacity-0 font-display text-2xl md:text-3xl lg:text-4xl text-green leading-relaxed",
              !isAr && "italic"
            )}
          >
            &ldquo;{s.quote}&rdquo;
          </blockquote>
        </div>

        {/* Pillars */}
        <div
          className={clsx(
            "statement-pillars grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12",
            isAr && "text-right"
          )}
        >
          {s.pillars.map((pillar, i) => (
            <div
              key={i}
              className={clsx(
                "statement-pillar opacity-0 flex flex-col",
                isAr ? "items-end" : "items-start"
              )}
            >
              <div className={clsx("flex items-center gap-4 mb-4", isAr && "flex-row-reverse")}>
                <span className="font-sans text-xs text-gold tracking-widest">0{i + 1}</span>
                <div className="w-8 h-px bg-gold/40" />
              </div>
              <h3
                className={clsx(
                  "font-display text-xl md:text-2xl font-semibold text-green mb-3",
                  isAr && "font-arabic"
                )}
              >
                {pillar.title}
              </h3>
              <p
                className={clsx(
                  "font-sans text-sm leading-relaxed text-muted",
                  isAr && "font-arabic"
                )}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
