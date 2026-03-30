"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function TimelineInner() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const p = t.process;
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop sticky scroll logic
    mm.add("(min-width: 1024px)", () => {
      const texts = gsap.utils.toArray<HTMLElement>(".timeline-step-text");

      function activateImage(index: number) {
        imagesRef.current.forEach((img, i) => {
          if (!img) return;
          if (i === index) {
            gsap.to(img, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" });
          } else {
            gsap.to(img, { opacity: 0, scale: 1.05, duration: 0.8, ease: "power2.out", overwrite: "auto" });
          }
        });

        texts.forEach((text, i) => {
          if (i === index) {
            gsap.to(text, { opacity: 1, duration: 0.5 });
          } else {
            gsap.to(text, { opacity: 0.2, duration: 0.5 });
          }
        });
      }

      texts.forEach((text, i) => {
        ScrollTrigger.create({
          trigger: text,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => activateImage(i),
          onEnterBack: () => activateImage(i),
        });
      });

      // Init the first step immediately
      activateImage(0);
    });

    // Mobile logic
    mm.add("(max-width: 1023px)", () => {
      const mobSteps = gsap.utils.toArray<HTMLElement>(".mobile-step");
      mobSteps.forEach((step) => {
        gsap.fromTo(step, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: step, start: "top 80%" } }
        );
      });
    });

    return () => mm.revert();
  }, [isAr]);

  return (
    <section ref={containerRef} className="bg-white relative">
      {/* DESKTOP LAYOUT */}
      <div className={clsx("hidden lg:flex w-full", isAr && "flex-row-reverse")}>
        {/* Sticky Images Side */}
        <div className="w-1/2 h-screen sticky top-0 bg-white flex flex-col items-center justify-center p-8 xl:p-20">
          <div className="relative w-full h-[75vh] max-h-[800px] rounded-xl overflow-hidden shadow-xl bg-cream-dark">
            {p.steps.map((step, i) => (
              <div 
                key={`img-desk-${i}`}
                ref={(el) => { imagesRef.current[i] = el; }}
                className="absolute inset-0 opacity-0 scale-105 will-change-transform"
              >
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="50vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-green/10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-green/80 via-transparent to-transparent opacity-80" />
                
                <div className={clsx(
                  "absolute bottom-8 text-white font-display leading-none",
                  isAr ? "right-8 text-right" : "left-8"
                )}>
                  <span className="text-[8rem] xl:text-[12rem] font-bold opacity-20">{step.number}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling Text Side */}
        <div className="w-1/2 py-[40vh] px-12 xl:px-24 bg-white relative">
          {p.steps.map((step, i) => (
            <div 
              key={`text-desk-${i}`}
              className={clsx(
                "timeline-step-text min-h-screen flex flex-col justify-center opacity-20 transition-opacity duration-300",
                isAr ? "items-end text-right" : "items-start text-left"
              )}
            >
              <div className={clsx("flex items-center gap-4 mb-8", isAr && "flex-row-reverse")}>
                <span className="font-display text-3xl font-bold text-gold">{step.number}</span>
                <div className="w-16 h-px bg-gold/50" />
                <span className={clsx(
                  "font-sans text-[10px] tracking-[0.3em] uppercase text-gold pt-1",
                  isAr && "font-arabic tracking-normal text-xs"
                )}>
                  {step.season}
                </span>
              </div>
              
              <h3 className={clsx(
                "font-display text-4xl xl:text-5xl font-bold text-green mb-10 leading-[1.15]",
                isAr && "font-arabic"
              )}>
                {step.title}
              </h3>

              <div className="space-y-6 mb-10">
                {step.paragraphs.map((par, j) => (
                  <p key={`p-${i}-${j}`} className={clsx(
                    "font-sans text-base leading-relaxed text-muted/90",
                    isAr && "font-arabic"
                  )}>
                    {par}
                  </p>
                ))}
              </div>

              {step.facts && step.facts.length > 0 && (
                <div className={clsx("flex flex-wrap gap-3 mb-10", isAr && "justify-end")}>
                  {step.facts.map((fact, k) => (
                    <span key={`f-${i}-${k}`} className={clsx(
                      "inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-3.5 py-2",
                      "font-sans text-[10px] tracking-widest uppercase text-gold",
                      isAr && "font-arabic tracking-normal text-xs"
                    )}>
                      <span className="w-1.5 h-1.5 bg-gold/80 rotate-45" />
                      {fact}
                    </span>
                  ))}
                </div>
              )}

              {step.note && (
                <div className={clsx(
                  "p-6 bg-cream border border-cream-dark",
                  isAr ? "border-r-2 border-r-gold" : "border-l-2 border-l-gold"
                )}>
                  <p className={clsx(
                    "font-sans text-sm italic text-green/90 leading-relaxed",
                    isAr && "font-arabic"
                  )}>
                    {step.note}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden flex flex-col bg-cream-dark/20">
        {p.steps.map((step, i) => (
          <div key={`mob-${i}`} className="mobile-step w-full bg-white mb-4 last:mb-0 relative border-b border-cream-dark">
            <div className="relative h-[55vh] w-full">
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-green/10 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-green/95 via-green/30 to-transparent" />
              
              <div className={clsx(
                "absolute bottom-0 w-full p-8",
                isAr ? "text-right" : "text-left"
              )}>
                <div className={clsx("flex items-center gap-3 mb-4", isAr && "flex-row-reverse")}>
                  <span className="font-display text-4xl font-bold text-gold">{step.number}</span>
                  <div className="flex-1 h-px bg-gold/40" />
                </div>
                <h3 className={clsx(
                  "font-display text-4xl font-bold text-white mb-2",
                  isAr && "font-arabic"
                )}>
                  {step.title}
                </h3>
                <span className={clsx(
                  "font-sans text-[10px] tracking-[0.2em] uppercase text-white/70 block",
                  isAr && "font-arabic tracking-normal text-xs"
                )}>
                  {step.season}
                </span>
              </div>
            </div>
            
            <div className={clsx("p-8 md:p-12", isAr ? "text-right" : "text-left")}>
              <div className="space-y-5 mb-8">
                {step.paragraphs.map((par, j) => (
                  <p key={`mp-${i}-${j}`} className={clsx(
                    "font-sans text-base leading-relaxed text-muted",
                    isAr && "font-arabic"
                  )}>
                    {par}
                  </p>
                ))}
              </div>

              {step.facts && step.facts.length > 0 && (
                <div className={clsx("flex flex-wrap gap-2.5 mb-8", isAr && "justify-end")}>
                  {step.facts.map((fact, k) => (
                    <span key={`mf-${i}-${k}`} className={clsx(
                      "inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-3 py-1.5",
                      "font-sans text-[9px] tracking-widest uppercase text-gold",
                      isAr && "font-arabic tracking-normal text-[10px]"
                    )}>
                      <span className="w-1 h-1 bg-gold rotate-45 flex-shrink-0" />
                      {fact}
                    </span>
                  ))}
                </div>
              )}

              {step.note && (
                <div className={clsx(
                  "p-5 bg-cream border border-cream-dark",
                  isAr ? "border-r-2 border-r-gold" : "border-l-2 border-l-gold"
                )}>
                  <p className={clsx(
                    "font-sans text-sm italic text-green/90",
                    isAr && "font-arabic"
                  )}>
                    {step.note}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Timeline() {
  return <TimelineInner />;
}
