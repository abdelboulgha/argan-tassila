"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function QuoteBanner() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const p = t.process;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".banner-inner > *",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.18, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".banner-inner", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-36 overflow-hidden">
      <Image
        src={p.banner.image}
        alt={p.banner.imageAlt}
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-green/75" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center banner-inner">
        <span className="inline-block font-sans text-[9px] tracking-[0.35em] uppercase border border-gold/40 text-gold px-5 py-2 mb-8">
          {isAr ? "أرگان تاسيلا" : "Argan Tassila"}
        </span>
        <blockquote className={clsx(
          "font-display text-4xl md:text-5xl font-bold text-cream leading-tight mb-6",
          !isAr && "italic",
          isAr && "font-arabic"
        )}>
          &ldquo;{p.banner.quote}&rdquo;
        </blockquote>
        <div className="w-12 h-px bg-gold/50 mx-auto" />
      </div>
    </section>
  );
}
