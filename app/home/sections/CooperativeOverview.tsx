"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CooperativeOverview() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const s = t.home.overview;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".overview-badge",
        { opacity: 0, y: -16 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".overview-header", start: "top 88%" },
        }
      );
      gsap.fromTo(
        ".overview-title",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: ".overview-header", start: "top 88%" },
        }
      );
      gsap.fromTo(
        ".overview-desc",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2,
          scrollTrigger: { trigger: ".overview-header", start: "top 88%" },
        }
      );
      gsap.fromTo(
        ".overview-stat",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".overview-stats", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".overview-feature",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".overview-features", start: "top 82%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className={clsx("overview-header max-w-3xl mb-16", isAr ? "text-right mr-auto" : "")}>
          <span
            className={clsx(
              "overview-badge opacity-0 inline-block font-sans text-xs tracking-widest uppercase",
              "border border-gold/50 text-gold px-4 py-2 mb-6",
              isAr && "font-arabic text-sm tracking-normal"
            )}
          >
            {s.badge}
          </span>
          <h2
            className={clsx(
              "overview-title opacity-0 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-green leading-tight mb-6",
              isAr && "font-arabic"
            )}
          >
            {s.title}
          </h2>
          <p
            className={clsx(
              "overview-desc opacity-0 font-sans text-base md:text-lg text-muted leading-relaxed max-w-2xl",
              isAr && "font-arabic"
            )}
          >
            {s.description}
          </p>
        </div>

        {/* Stats row */}
        <div
          className={clsx(
            "overview-stats grid grid-cols-2 md:grid-cols-4 gap-px bg-green/10 border border-green/10 mb-16",
            isAr && "text-right"
          )}
        >
          {s.stats.map((stat, i) => (
            <div
              key={i}
              className="overview-stat opacity-0 bg-white py-8 px-6 group hover:bg-green transition-colors duration-300"
            >
              <p
                className={clsx(
                  "font-display text-4xl md:text-5xl font-black text-green group-hover:text-gold transition-colors duration-300 mb-1",
                  isAr && "font-arabic"
                )}
              >
                {stat.value}
              </p>
              <div className="w-6 h-px bg-gold/40 my-2" />
              <p
                className={clsx(
                  "font-sans text-[10px] tracking-widest uppercase text-muted group-hover:text-cream/70 transition-colors duration-300",
                  isAr && "font-arabic text-xs tracking-normal"
                )}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div
          className={clsx(
            "overview-features grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12",
            isAr && "text-right"
          )}
        >
          {s.features.map((feature, i) => (
            <div
              key={i}
              className={clsx(
                "overview-feature opacity-0 flex flex-col",
                isAr ? "items-end" : "items-start"
              )}
            >
              {/* Number accent */}
              <div className={clsx("flex items-center gap-3 mb-5", isAr && "flex-row-reverse")}>
                <span className="font-sans text-xs text-gold/60 tracking-widest">
                  0{i + 1}
                </span>
                <div className="w-10 h-px bg-gold/30" />
              </div>
              {/* Gold top border */}
              <div className="w-full h-px bg-green/10 mb-6 relative">
                <div
                  className="absolute top-0 h-px bg-gold transition-all duration-500"
                  style={{ width: `${(i + 1) * 33}%`, left: isAr ? "auto" : 0, right: isAr ? 0 : "auto" }}
                />
              </div>
              <h3
                className={clsx(
                  "font-display text-xl font-semibold text-green mb-3",
                  isAr && "font-arabic"
                )}
              >
                {feature.title}
              </h3>
              <p
                className={clsx(
                  "font-sans text-sm leading-relaxed text-muted",
                  isAr && "font-arabic"
                )}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={clsx(isAr && "text-right")}>
          <Link
            href="/about"
            className={clsx(
              "inline-flex items-center gap-3 font-sans text-xs tracking-widest uppercase text-green border-b border-green/30 pb-1 hover:border-gold hover:text-gold transition-colors duration-300",
              isAr && "flex-row-reverse"
            )}
          >
            {s.cta}
            <span className="w-10 h-px bg-current" />
          </Link>
        </div>
      </div>
    </section>
  );
}
