"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import Image from "next/image";

export default function Hero() {
  const { t, lang } = useLanguage();
  const a = t.about;
  const isAr = lang === "ar";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background subtle zoom
      gsap.fromTo(
        ".hero-bg-media img",
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
        "relative flex items-center justify-center min-h-[70vh] md:min-h-[85vh]",
        "overflow-hidden bg-green"
      )}
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-0 hero-bg-media">
        <Image
          src="/images/about-hero.png"
          alt={a.hero.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay for perfect text visibility & premium feel */}
        <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-green/90 via-green/30 to-black/10" />
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        {[25, 50, 75].map((pct) => (
          <div
            key={pct}
            className="absolute top-0 bottom-0 w-px bg-white/[0.04]"
            style={{ left: `${pct}%` }}
          />
        ))}
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
              {a.hero.label}
            </span>
            <div className="w-10 md:w-16 h-px bg-gold/60" />
          </div>

          {/* Title */}
          <h1 className={clsx(
            "font-display font-bold leading-[1.1] mb-6",
            "text-5xl md:text-7xl lg:text-[5rem] text-cream drop-shadow-sm",
            isAr && "font-arabic"
          )}>
            {a.hero.title}
          </h1>
          
        </div>
      </div>
      
      {/* Bottom decorative transition line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-green via-gold/30 to-green z-10" />
    </section>
  );
}
