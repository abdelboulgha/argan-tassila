"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Panels() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const o = t.origins;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".panel-text").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: isAr ? 40 : -40 },
          { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" } }
        );
      });
      gsap.utils.toArray<HTMLElement>(".panel-img-wrap").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 82%" } }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-24">
        {o.panels.map((panel, i) => {
          const isReversed = i % 2 !== 0;
          return (
            <div
              key={i}
              className={clsx(
                "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
                isReversed && !isAr && "lg:grid-flow-col-dense",
                isAr && isReversed && "lg:flex lg:flex-row-reverse"
              )}
            >
              <div className={clsx(
                "panel-text",
                isReversed && !isAr ? "lg:col-start-1" : "",
                isAr && "text-right"
              )}>
                <span className={clsx(
                  "font-sans text-xs tracking-widest uppercase text-gold mb-3 block",
                  isAr && "font-arabic text-sm tracking-normal"
                )}>
                  {panel.label}
                </span>
                <h2 className={clsx(
                  "font-display text-4xl md:text-5xl font-bold text-green leading-tight mb-6",
                  isAr && "font-arabic"
                )}>
                  {panel.title}
                </h2>
                <p className={clsx(
                  "font-sans text-base leading-relaxed text-muted max-w-lg",
                  isAr && "font-arabic"
                )}>
                  {panel.text}
                </p>
              </div>
              <div className={clsx(isReversed && !isAr ? "lg:col-start-2" : "")}>
                <div className="relative">
                  <div className={clsx(
                    "absolute w-full h-full border border-gold/40 -z-10",
                    isReversed ? "-top-3 -right-3" : "-top-3 -left-3"
                  )} />
                  <div className="panel-img-wrap relative h-80 md:h-[420px] overflow-hidden group">
                    <Image
                      src={panel.image}
                      alt={panel.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green/40 via-transparent to-transparent" />
                    <div className={clsx(
                      "absolute bottom-4 w-6 h-6 border-b-2 border-gold",
                      isReversed ? "right-4 border-r-2" : "left-4 border-l-2"
                    )} />
                    <div className={clsx(
                      "absolute top-4 bg-green/85 backdrop-blur-sm px-3 py-1.5",
                      isReversed ? "right-4" : "left-4"
                    )}>
                      <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-gold">
                        {panel.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
