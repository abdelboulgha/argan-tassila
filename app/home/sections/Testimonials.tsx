"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  // Fallback to empty structure if translation isn't loaded properly
  const testimonials = (t.home as any).testimonials || {
    chapter: "04",
    sectionTitle: "Ce que disent nos clients",
    items: []
  };
  const tRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tRef.current,
            start: "top 75%",
          }
        }
      );
    }, tRef);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section className="bg-green py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/pattern-gold.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      
      <div ref={tRef} className="max-w-7xl mx-auto px-6 md:px-10 mt-16 relative z-10">
        <div className={clsx(
          "grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16",
          isAr && "text-right"
        )}>
          {testimonials.items.map((item: any, i: number) => (
            <div key={i} className="testimonial-card flex flex-col justify-between h-full group">
              <div>
                <div className={clsx("flex gap-1 mb-8", isAr && "justify-end")}>
                  {Array.from({ length: item.rating || 5 }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-gold transform group-hover:scale-110 transition-transform duration-300" style={{transitionDelay: `${j * 50}ms`}} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className={clsx(
                  "font-sans text-base lg:text-lg leading-relaxed text-cream/90 mb-8 font-light italic",
                  isAr && "font-arabic"
                )}>
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-auto">
                <div className="w-8 h-px bg-gold/50 mb-4" />
                <h4 className={clsx(
                  "font-display text-xl font-bold text-white mb-1",
                  isAr && "font-arabic"
                )}>
                  {item.name}
                </h4>
                <p className={clsx(
                  "font-sans text-xs tracking-widest uppercase text-gold/80",
                  isAr && "font-arabic tracking-normal"
                )}>
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
