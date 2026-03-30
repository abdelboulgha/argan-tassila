"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  dark?: boolean;
}

export default function PageHero({
  label,
  title,
  subtitle,
  image,
  imageAlt = "",
  video,
  dark = false,
}: PageHeroProps) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const ref = useRef<HTMLDivElement>(null);

  // Use last word of label as large watermark
  const watermarkWord = label.split(" ").pop() ?? label;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".page-hero-content > *",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(
        ".hero-watermark",
        { opacity: 0, x: isAr ? 30 : -30 },
        { opacity: 1, x: 0, duration: 1.3, ease: "power2.out", delay: 0.05 }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <div
      ref={ref}
      className={clsx(
        "relative flex items-end pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden",
        dark ? "bg-green" : "bg-cream"
      )}
    >
      {/* Background video */}
      {video && (
        <>
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className={clsx("absolute inset-0", dark ? "bg-green/60" : "bg-cream/50")} />
        </>
      )}

      {/* Background photo */}
      {image && !video && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-center opacity-20"
            priority
            sizes="100vw"
          />
          <div className={clsx("absolute inset-0", dark ? "bg-green/80" : "bg-cream/80")} />
        </>
      )}

      {/* Decorative vertical grid lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[25, 50, 75].map((pct) => (
          <div
            key={pct}
            className={clsx("absolute top-0 bottom-0 w-px", dark ? "bg-white/[0.04]" : "bg-green/[0.06]")}
            style={{ left: `${pct}%` }}
          />
        ))}

        {/* Gold corner bracket */}
        <div className={clsx(
          "absolute top-8 md:top-12 w-16 h-16 border-t border-gold/30",
          isAr ? "right-8 md:right-14 border-r" : "left-8 md:left-14 border-l"
        )} />

        {/* Bottom gold rule */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/20" />
      </div>

      {/* Giant watermark word */}
      <div
        className={clsx(
          "hero-watermark absolute bottom-0 select-none pointer-events-none font-display font-black leading-none",
          "text-[22vw]",
          dark ? "text-white/[0.04]" : "text-green/[0.055]",
          isAr ? "left-0" : "right-0",
          isAr && "font-arabic"
        )}
      >
        {watermarkWord}
      </div>

      {/* Page content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className={clsx("page-hero-content", isAr && "text-right")}>

          {/* Gold tag + line */}
          <div className={clsx("flex items-center gap-3 mb-5", isAr && "flex-row-reverse justify-end")}>
            <div className="w-8 h-px bg-gold flex-shrink-0" />
            <p className={clsx(
              "font-sans text-[10px] tracking-[0.3em] uppercase text-gold",
              isAr && "font-arabic text-sm tracking-normal"
            )}>
              {label}
            </p>
          </div>

          {/* Title */}
          <h1 className={clsx(
            "font-display font-bold leading-[1.04]",
            "text-5xl md:text-6xl lg:text-7xl",
            dark ? "text-cream" : "text-green",
            isAr && "font-arabic"
          )}>
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className={clsx(
              "mt-5 font-sans text-base md:text-lg leading-relaxed max-w-xl",
              dark ? "text-cream/65" : "text-muted",
              isAr && "font-arabic"
            )}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Gold accent line */}
        <div className={clsx("mt-10 w-12 h-0.5 bg-gold", isAr && "ml-auto mr-0")} />
      </div>
    </div>
  );
}
