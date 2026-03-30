"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function StepCard({
  step,
  isAr,
}: {
  step: {
    number: string;
    title: string;
    season: string;
    paragraphs: string[];
    facts?: string[];
    note?: string;
  };
  isAr: boolean;
}) {
  return (
    <div className={clsx(
      "step-card w-full max-w-lg bg-white border border-cream-dark p-6 md:p-8",
      "hover:border-gold/40 transition-colors duration-300 relative overflow-hidden",
      !isAr ? "border-l-[3px] border-l-gold" : "border-r-[3px] border-r-gold"
    )}>
      <span className={clsx(
        "absolute -top-2 font-display font-black text-[5.5rem] leading-none select-none text-green/[0.04]",
        isAr ? "left-1" : "right-1"
      )}>
        {step.number}
      </span>

      <div className={clsx("flex items-start gap-4 mb-5", isAr && "flex-row-reverse")}>
        <div className="flex-shrink-0 w-11 h-11 border border-gold/30 bg-gold/5 flex items-center justify-center">
          <span className="font-display text-base font-bold text-gold">{step.number}</span>
        </div>
        <div className={clsx("flex-1 min-w-0", isAr && "text-right")}>
          <p className={clsx(
            "font-sans text-[10px] tracking-[0.22em] uppercase text-gold/70 mb-0.5",
            isAr && "font-arabic text-xs tracking-normal"
          )}>
            {step.season}
          </p>
          <h2 className={clsx(
            "font-display text-2xl md:text-[1.7rem] font-bold text-green leading-tight",
            isAr && "font-arabic"
          )}>
            {step.title}
          </h2>
        </div>
      </div>

      <div className="step-divider h-px bg-gold/20 mb-6" />

      {step.paragraphs.map((par, j) => (
        <p key={j} className={clsx(
          "step-para font-sans text-sm leading-relaxed text-muted mb-3 last:mb-0",
          isAr && "font-arabic"
        )}>
          {par}
        </p>
      ))}

      {step.facts && step.facts.length > 0 && (
        <div className={clsx("flex flex-wrap gap-2 mt-5", isAr && "justify-end")}>
          {step.facts.map((fact, k) => (
            <span key={k} className={clsx(
              "fact-chip inline-flex items-center gap-1.5",
              "font-sans text-[9px] tracking-widest uppercase",
              "border border-gold/35 text-gold/75 px-2.5 py-1 bg-gold/[0.03]",
              isAr && "font-arabic text-[10px] tracking-normal"
            )}>
              <span className="w-1 h-1 bg-gold/70 rotate-45 inline-block flex-shrink-0" />
              {fact}
            </span>
          ))}
        </div>
      )}

      {step.note && (
        <p className={clsx(
          "step-note mt-5 font-sans text-xs italic text-gold/70",
          "border-l-2 border-gold/30 pl-3",
          isAr && "border-l-0 border-r-2 pl-0 pr-3 font-arabic"
        )}>
          {step.note}
        </p>
      )}
    </div>
  );
}

export default function Timeline() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const p = t.process;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".timeline-track",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", transformOrigin: "top",
          scrollTrigger: {
            trigger: ".steps-section",
            start: "top 55%", end: "bottom 45%",
            scrub: 1,
          }
        }
      );

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        const cardOnLeft = step.dataset.left === "true";
        const dot      = step.querySelector(".step-dot");
        const card     = step.querySelector(".step-card");
        const divider  = step.querySelector(".step-divider");
        const paras    = step.querySelectorAll(".step-para");
        const chips    = step.querySelectorAll(".fact-chip");
        const note     = step.querySelector(".step-note");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: step, start: "top 80%" },
        });

        if (dot)
          tl.fromTo(dot,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.5)" }, 0
          );

        if (card)
          tl.fromTo(card,
            { opacity: 0, x: cardOnLeft ? -52 : 52 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 0.15
          );

        if (divider)
          tl.fromTo(divider,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.55, ease: "power2.inOut",
              transformOrigin: isAr ? "right" : "left" }, 0.6
          );

        if (paras.length)
          tl.fromTo(Array.from(paras),
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: "power2.out" }, 0.7
          );

        if (chips.length)
          tl.fromTo(Array.from(chips),
            { opacity: 0, scale: 0.78, y: 8 },
            { opacity: 1, scale: 1, y: 0, stagger: 0.07, duration: 0.4,
              ease: "back.out(1.8)" }, 1.0
          );

        if (note)
          tl.fromTo(note,
            { opacity: 0, x: cardOnLeft ? -14 : 14 },
            { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" }, 1.2
          );
      });
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section ref={ref} className="steps-section py-16 md:py-20 bg-white relative overflow-hidden">
      <div
        className="hidden lg:block absolute top-0 bottom-0 w-px bg-cream-dark"
        style={{ left: "50%" }}
        aria-hidden="true"
      >
        <div className="timeline-track absolute inset-0 bg-gold/50 origin-top" />
      </div>

      <div className="lg:hidden absolute left-7 top-0 bottom-0 w-px bg-gold/20" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {p.steps.map((step, i) => {
          const cardOnLeft = isAr ? i % 2 !== 0 : i % 2 === 0;

          return (
            <div
              key={i}
              data-left={String(cardOnLeft)}
              className={clsx(
                "process-step relative py-10 lg:py-16",
                i < p.steps.length - 1 && "mb-0"
              )}
            >
              <div className="lg:hidden pl-14 relative">
                <div className="absolute left-3.5 top-7 w-4 h-4 bg-white border-2 border-gold rotate-45 z-10 step-dot" />
                <StepCard step={step} isAr={isAr} />
              </div>

              <div className="hidden lg:grid lg:grid-cols-[1fr_72px_1fr] items-center gap-0">
                <div className="flex justify-end pr-8">
                  {cardOnLeft && <StepCard step={step} isAr={isAr} />}
                </div>

                <div className="flex items-center justify-center relative z-10">
                  <div className="step-dot w-6 h-6 bg-white border-2 border-gold rotate-45 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gold/60 rotate-45" />
                  </div>
                </div>

                <div className="flex justify-start pl-8">
                  {!cardOnLeft && <StepCard step={step} isAr={isAr} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
