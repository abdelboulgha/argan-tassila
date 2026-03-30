"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Overview() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const o = t.home.overview;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        ".overview-content > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".overview-content", start: "top 80%" }
        }
      );

      // Image collage animation
      gsap.fromTo(
        ".overview-img",
        { opacity: 0, scale: 0.95, y: 50 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ".overview-collage", start: "top 75%" }
        }
      );

      // Stats animation
      gsap.fromTo(
        ".overview-stat",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".overview-stats", start: "top 90%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section ref={ref} className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={clsx("flex flex-col lg:flex-row gap-8 lg:gap-12 items-center", isAr && "lg:flex-row-reverse")}>
          
          {/* Dense Image Grid (Left Side) */}
          <div className="overview-collage w-full lg:w-1/2 flex gap-2 h-[450px] sm:h-[550px]">
            {/* Main large image */}
            <div className={clsx("relative w-2/3 h-full overflow-hidden", isAr ? "rounded-r-2xl" : "rounded-l-2xl")}>
              <Image 
                src="/images/products/617512772_18306377353248989_1221937758502659617_n.webp" 
                alt="Coopérative Argan Tassila" 
                fill 
                className="object-cover"
              />
            </div>
            {/* Two stacked small images */}
            <div className={clsx("flex flex-col gap-2 w-1/3 h-full")}>
              <div className={clsx("relative flex-1 overflow-hidden", isAr ? "rounded-tl-2xl" : "rounded-tr-2xl")}>
                <Image 
                  src="/images/products/pack-trio.webp" 
                  alt="Produits Argan Tassila" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className={clsx("relative flex-1 overflow-hidden", isAr ? "rounded-bl-2xl" : "rounded-br-2xl")}>
                <Image 
                  src="/images/products/576529705_18299680633248989_5263939411239459363_n.webp" 
                  alt="Processus Argan" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Compact Content (Right Side) */}
          <div className={clsx("overview-content w-full lg:w-1/2 flex flex-col py-4", isAr && "text-right")}>
            <span className={clsx(
              "font-sans text-xs tracking-widest text-gold uppercase mb-3 block font-bold",
              isAr && "font-arabic tracking-normal text-sm"
            )}>
              {o.badge}
            </span>

            <h2 className={clsx(
              "font-display text-4xl lg:text-5xl font-bold text-green mb-6 leading-tight",
              isAr && "font-arabic"
            )}>
              {o.title}
            </h2>

            <p className={clsx(
              "font-sans text-base text-muted/80 leading-relaxed mb-8",
              isAr && "font-arabic"
            )}>
              {o.description}
            </p>

            {/* Tight Stats Strip */}
            <div className={clsx("grid grid-cols-4 gap-2 sm:gap-4 mb-8 pb-8 border-b border-cream-dark", isAr && "text-right")}>
              {o.stats.map((stat: any, i: number) => (
                <div key={i} className={clsx("flex flex-col", isAr ? "items-end" : "items-start")}>
                  <strong className="font-display text-lg sm:text-2xl text-green mb-1">{stat.value}</strong>
                  <span className={clsx("font-sans text-[7px] sm:text-[9px] uppercase tracking-widest text-muted", isAr && "font-arabic tracking-normal")} >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Compact Features List */}
            <div className="space-y-4 mb-8">
              {o.features.map((feature: any, i: number) => (
                <div key={i} className={clsx("flex gap-3 items-start", isAr && "flex-row-reverse")}>
                  <div className="mt-1 w-6 h-6 rounded-full bg-cream-dark flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  </div>
                  <div>
                    <h4 className={clsx("font-display text-base font-bold text-green", isAr && "font-arabic")}>
                      {feature.title}
                    </h4>
                    <p className={clsx("font-sans text-sm text-muted/70", isAr && "font-arabic")}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <Link href="/about" className={clsx(
                "inline-flex bg-green text-white px-8 py-3.5 font-sans text-xs tracking-widest uppercase hover:bg-gold transition-colors", 
                isAr && "font-arabic tracking-normal text-sm"
              )}>
                {o.cta}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
