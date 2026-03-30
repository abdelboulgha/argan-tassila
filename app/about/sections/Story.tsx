"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const a = t.about;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-story-text > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".about-story-text", start: "top 80%" } }
      );
      gsap.fromTo(".about-img-main",
        { clipPath: "inset(0 0 100% 0)", scale: 1.05 },
        { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: ".about-story-img", start: "top 75%" } }
      );
      gsap.fromTo(".about-img-secondary",
        { clipPath: "inset(100% 0 0 0)", scale: 1.05 },
        { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.1, ease: "power3.out", delay: 0.25,
          scrollTrigger: { trigger: ".about-story-img", start: "top 75%" } }
      );
      gsap.fromTo(".about-img-frame",
        { opacity: 0, x: isAr ? -20 : 20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.6,
          scrollTrigger: { trigger: ".about-story-img", start: "top 75%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className={clsx("grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", isAr && "lg:flex lg:flex-row-reverse")}>
          {/* Text */}
          <div className={clsx("about-story-text", isAr && "text-right")}>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-4", isAr && "font-arabic text-sm tracking-normal")}>
              {a.story.label}
            </p>
            <h2 className={clsx("font-display text-4xl md:text-5xl font-bold text-green leading-tight mb-8", isAr && "font-arabic")}>
              {a.story.title}
            </h2>
            {a.story.paragraphs.map((p, i) => (
              <p key={i} className={clsx("font-sans text-base leading-relaxed text-muted mb-5", isAr && "font-arabic")}>
                {p}
              </p>
            ))}
            <blockquote className={clsx("mt-8 border-l-2 border-gold pl-6", isAr && "border-l-0 border-r-2 pl-0 pr-6")}>
              <p className={clsx("font-display text-xl italic text-green leading-relaxed", isAr && "font-arabic not-italic")}>
                &ldquo;{a.story.pullQuote}&rdquo;
              </p>
            </blockquote>
          </div>
          {/* Image */}
          <div className="about-story-img relative h-[520px]">
            <div className={clsx(
              "about-img-frame absolute w-[72%] h-[75%] border-2 border-gold/50 -z-10",
              isAr ? "top-5 right-5" : "top-5 left-5"
            )} />
            <div className={clsx(
              "about-img-main absolute top-0 w-[72%] h-[75%] overflow-hidden group",
              isAr ? "right-0" : "left-0"
            )}>
              <Image
                src="/images/products/huile-argan.webp"
                alt="Huile d'argan pure Argan Tassila"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 60vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green/50 via-green/10 to-transparent" />
              <div className={clsx(
                "absolute top-4 w-6 h-6 border-t-2 border-gold",
                isAr ? "right-4 border-r-2" : "left-4 border-l-2"
              )} />
              <div className={clsx(
                "absolute bottom-5 flex flex-col gap-0.5",
                isAr ? "right-5 items-end" : "left-5"
              )}>
                <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-gold/90">Souss-Massa · Maroc</span>
                <span className={clsx("font-display text-sm font-bold text-cream", isAr && "font-arabic")}>
                  {isAr ? "100% طبيعي" : "100% Naturel"}
                </span>
              </div>
            </div>
            <div className={clsx(
              "about-img-secondary absolute bottom-0 w-[58%] h-[55%] overflow-hidden group",
              "shadow-[0_8px_40px_rgba(0,0,0,0.18)]",
              isAr ? "left-0 border-[5px] border-white" : "right-0 border-[5px] border-white"
            )}>
              <Image
                src="/images/products/amlou-beldi.webp"
                alt="Amlou beldi artisanal"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 40vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green/40 via-transparent to-transparent" />
              <div className={clsx(
                "absolute bottom-3 w-5 h-5 border-b-2 border-gold",
                isAr ? "left-3 border-l-2" : "right-3 border-r-2"
              )} />
            </div>
            <div className={clsx(
              "about-img-frame absolute z-10 bg-green border border-gold/60 px-3 py-1.5",
              isAr ? "top-[72%] right-[68%]" : "top-[72%] left-[68%]"
            )}>
              <p className="font-sans text-[8px] tracking-[0.2em] uppercase text-gold whitespace-nowrap">
                {isAr ? "منذ ١٠+ سنوات" : "Depuis + de 10 ans"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
