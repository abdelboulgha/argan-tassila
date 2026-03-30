"use client";

import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  number: string;
  titleFr: string;
  titleAr: string;
  background?: "white" | "cream" | "green";
}

export default function SectionTitle({ 
  number, 
  titleFr, 
  titleAr, 
  background = "cream" 
}: SectionTitleProps) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const title = isAr ? titleAr : titleFr;
  const ref = useRef<HTMLDivElement>(null);

  const bgClasses = {
    white: "bg-white",
    cream: "bg-cream",
    green: "bg-green",
  };

  const isDark = background === "green";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".section-title-el",
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%"
          }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <div 
      ref={ref} 
      className={clsx(
        "w-full pt-32 pb-16 px-6 md:px-10 flex flex-col items-center justify-center text-center relative overflow-hidden",
        bgClasses[background]
      )}
    >
      {/* Decorative background number */}
      <div 
        className={clsx(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[18rem] md:text-[24rem] leading-none opacity-[0.02] pointer-events-none select-none",
          isDark ? "text-white" : "text-green"
        )}
      >
        {number}
      </div>

      <div className="section-title-el relative z-10 flex items-center justify-center gap-4 mb-6">
        <div className="w-12 md:w-20 h-px bg-gold/60" />
        <span className={clsx(
          "font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold",
          isAr && "font-arabic tracking-normal text-sm"
        )}>
          {isAr ? `الفصل ${number}` : `Chapitre ${number}`}
        </span>
        <div className="w-12 md:w-20 h-px bg-gold/60" />
      </div>
      
      <h2 className={clsx(
        "section-title-el relative z-10 font-display text-5xl md:text-6xl lg:text-7xl font-bold max-w-4xl leading-[1.1]",
        isDark ? "text-cream" : "text-green",
        isAr && "font-arabic"
      )}>
        {title}
      </h2>
      
      {/* Small leaf separator */}
      <div className="section-title-el relative z-10 mt-12 flex items-center justify-center">
        <div className={clsx(
          "w-1.5 h-1.5 rounded-full",
          isDark ? "bg-white/20" : "bg-green/15"
        )} />
        <div className={clsx(
          "w-px h-12 mx-auto mt-4",
          isDark ? "bg-white/10" : "bg-green/10"
        )} />
      </div>
    </div>
  );
}
