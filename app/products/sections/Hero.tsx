"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

export default function Hero() {
  const { t, lang } = useLanguage();
  const p = t.products;
  const isAr = lang === "ar";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background subtle zoom
      gsap.fromTo(
        ".hero-bg-media",
        { scale: 1.05 },
        { scale: 1, duration: 2.5, ease: "power2.out" }
      );
      
      // Text reveal
      gsap.fromTo(
        ".hero-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section
      ref={ref}
      className={clsx(
        "relative flex items-center justify-center min-h-[80vh] md:min-h-[90vh] xl:min-h-screen",
        "overflow-hidden bg-green"
      )}
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-0 hero-bg-media">
        <video
          src="/videos/produits.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Cleaner dark overlay that preserves video colors while keeping text readable */}
        <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-green/90 via-green/40 to-transparent" />
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        {[25, 50, 75].map((pct) => (
          <div
            key={pct}
            className="absolute top-0 bottom-0 w-px bg-white/[0.03]"
            style={{ left: `${pct}%` }}
          />
        ))}
        {/* Subtle glowing orb in the center behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[100px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20 md:mt-16">
        <div className="hero-content flex flex-col items-center">
          
          {/* Label / Badge */}
          <div className={clsx("flex items-center gap-4 mb-6 md:mb-8", isAr && "flex-row-reverse")}>
            <div className="w-10 md:w-16 h-px bg-gold/60" />
            <span className={clsx(
              "font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-gold font-medium",
              isAr && "font-arabic tracking-normal text-sm"
            )}>
              {p.hero.label}
            </span>
            <div className="w-10 md:w-16 h-px bg-gold/60" />
          </div>

          {/* Title */}
          <h1 className={clsx(
            "font-display font-bold leading-[1.1] mb-6 md:mb-8",
            "text-5xl md:text-7xl lg:text-[5rem] text-cream drop-shadow-sm",
            isAr && "font-arabic"
          )}>
            {p.hero.title}
          </h1>

          {/* Subtitle */}
          {p.hero.subtitle && (
            <p className={clsx(
              "font-sans text-base md:text-xl md:leading-relaxed max-w-2xl text-cream/90",
              isAr && "font-arabic"
            )}>
              {p.hero.subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Bottom decorative transition line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-green via-gold/30 to-green z-10" />
    </section>
  );
}
