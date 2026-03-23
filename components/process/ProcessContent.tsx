"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ProcessContent() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const p = t.process;
  const ref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro
      gsap.fromTo(".process-intro",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".process-intro", start: "top 85%" } }
      );

      // Timeline vertical line draw
      gsap.fromTo(".timeline-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 2, ease: "none", transformOrigin: "top center",
          scrollTrigger: { trigger: timelineRef.current, start: "top 60%", end: "bottom 40%", scrub: 1 } }
      );

      // Steps
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step, i) => {
        gsap.fromTo(step,
          { opacity: 0, x: isAr ? 50 : -50 },
          { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 80%" } }
        );
        gsap.fromTo(step.querySelector(".step-image"),
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out",
            scrollTrigger: { trigger: step, start: "top 80%" } }
        );
      });

      // Banner
      gsap.fromTo(".process-banner-quote",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".process-banner-quote", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <div ref={ref}>
      <PageHero
        label={p.hero.label}
        title={p.hero.title1}
        subtitle={p.hero.title2}
        breadcrumbs={[
          { label: lang === "fr" ? "Accueil" : "الرئيسية", href: "/" },
          { label: p.hero.label },
        ]}
        image={p.hero.image}
        dark
      />

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className={clsx("process-intro opacity-0 font-sans text-lg leading-relaxed text-muted", isAr && "font-arabic")}>
            {p.intro.text}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 md:py-28 bg-white relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cream-dark -translate-x-1/2 hidden lg:block" aria-hidden="true">
          <div className="timeline-line absolute inset-0 bg-gold/40 origin-top" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-20 lg:space-y-0">
          {p.steps.map((step, i) => (
            <div
              key={i}
              className={clsx(
                "process-step relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start lg:py-16",
                i % 2 === 0
                  ? isAr ? "lg:flex lg:flex-row-reverse" : ""
                  : isAr ? "" : "lg:grid-flow-col-dense"
              )}
            >
              {/* Step number — centered on timeline */}
              <div className="absolute left-1/2 -translate-x-1/2 top-16 hidden lg:flex items-center justify-center w-12 h-12 bg-white border-2 border-gold rounded-full z-10">
                <span className="font-sans text-sm font-bold text-gold">{step.number}</span>
              </div>

              {/* Text side */}
              <div className={clsx(
                i % 2 === 0 ? (isAr ? "lg:pl-16" : "lg:pr-16") : (isAr ? "lg:pr-16" : "lg:pl-16"),
                isAr && "text-right"
              )}>
                {/* Mobile number */}
                <span className="lg:hidden inline-block font-sans text-xs font-bold text-gold tracking-widest border border-gold/40 px-3 py-1 mb-4">
                  {step.number}
                </span>
                <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold/70 mb-2", isAr && "font-arabic text-sm tracking-normal")}>
                  {step.season}
                </p>
                <h2 className={clsx("font-display text-3xl md:text-4xl font-bold text-green mb-5", isAr && "font-arabic")}>
                  {step.title}
                </h2>
                {step.paragraphs.map((par, j) => (
                  <p key={j} className={clsx("font-sans text-sm leading-relaxed text-muted mb-3", isAr && "font-arabic")}>
                    {par}
                  </p>
                ))}
                {step.note && (
                  <p className={clsx("mt-4 font-sans text-xs italic text-gold/80 border-l-2 border-gold/30 pl-3", isAr && "border-l-0 border-r-2 pl-0 pr-3", isAr && "font-arabic")}>
                    {step.note}
                  </p>
                )}
              </div>

              {/* Image side */}
              <div className={clsx(
                i % 2 === 0
                  ? (isAr ? "lg:pr-16" : "lg:pl-16")
                  : (isAr ? "lg:pl-16" : "lg:pr-16")
              )}>
                <div className="step-image relative h-72 md:h-80 overflow-hidden opacity-0">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote banner */}
      <section className="relative py-28 overflow-hidden">
        <Image
          src={p.banner.image}
          alt={p.banner.imageAlt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-green/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <blockquote className={clsx("process-banner-quote opacity-0 font-display text-4xl md:text-5xl font-bold text-cream leading-tight", !isAr && "italic", isAr && "font-arabic")}>
            &ldquo;{p.banner.quote}&rdquo;
          </blockquote>
        </div>
      </section>
    </div>
  );
}
