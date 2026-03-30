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
        "w-full pt-16 md:pt-24 pb-0 -mb-8 md:-mb-12 z-20 px-6 md:px-10 flex flex-col items-center justify-center text-center relative overflow-hidden",
        bgClasses[background]
      )}
    >
      <h2 className={clsx(
        "section-title-el relative z-10 font-display text-4xl md:text-5xl font-bold max-w-4xl leading-[1.1]",
        isDark ? "text-cream" : "text-green",
        isAr && "font-arabic"
      )}>
        {title}
      </h2>
    </div>
  );
}
