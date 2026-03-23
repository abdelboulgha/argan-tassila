"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function OriginsContent() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const o = t.origins;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Panels
      gsap.utils.toArray<HTMLElement>(".origin-panel").forEach((panel) => {
        gsap.fromTo(panel,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 80%" } }
        );
      });

      // UNESCO facts
      gsap.fromTo(".unesco-fact",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".unesco-facts", start: "top 80%" } }
      );

      // Region
      gsap.fromTo(".region-text > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".region-text", start: "top 80%" } }
      );

      // Commitments
      gsap.fromTo(".commitment-item",
        { opacity: 0, x: isAr ? 30 : -30 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".commitments-grid", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <div ref={ref}>
      <PageHero
        label="ORIGINES"
        title={o.hero.title1}
        subtitle={o.hero.title2}
        breadcrumbs={[
          { label: lang === "fr" ? "Accueil" : "الرئيسية", href: "/" },
          { label: lang === "fr" ? "Origines" : "الأصول" },
        ]}
        image={o.hero.image}
        dark
      />

      {/* Panels */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-24">
          {o.panels.map((panel, i) => (
            <div
              key={i}
              className={clsx(
                "origin-panel grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
                i % 2 !== 0 && !isAr && "lg:grid-flow-col-dense",
                isAr && i % 2 !== 0 && "lg:flex lg:flex-row-reverse"
              )}
            >
              {/* Text */}
              <div className={clsx(i % 2 !== 0 && !isAr ? "lg:col-start-1" : "", isAr && "text-right")}>
                <span className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-3 block", isAr && "font-arabic text-sm tracking-normal")}>
                  {panel.label}
                </span>
                <h2 className={clsx("font-display text-4xl md:text-5xl font-bold text-green leading-tight mb-6", isAr && "font-arabic")}>
                  {panel.title}
                </h2>
                <p className={clsx("font-sans text-base leading-relaxed text-muted max-w-lg", isAr && "font-arabic")}>
                  {panel.text}
                </p>
              </div>

              {/* Image */}
              <div className={clsx(i % 2 !== 0 && !isAr ? "lg:col-start-2" : "")}>
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <Image
                    src={panel.image}
                    alt={panel.imageAlt}
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

      {/* UNESCO Banner */}
      <section className="py-20 md:py-28 bg-green">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className={clsx("text-center mb-14")}>
            <span className="inline-block font-sans text-xs tracking-widest uppercase border border-gold/40 text-gold px-4 py-2 mb-6">
              {o.unesco.badge}
            </span>
            <blockquote className={clsx("font-display text-3xl md:text-4xl italic text-cream max-w-2xl mx-auto leading-relaxed mb-4", isAr && "font-arabic not-italic")}>
              &ldquo;{o.unesco.quote}&rdquo;
            </blockquote>
            <p className="font-sans text-sm text-cream/50">{o.unesco.year}</p>
          </div>
          <div className="unesco-facts grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {o.unesco.facts.map((fact, i) => (
              <div key={i} className="unesco-fact opacity-0 text-center">
                <p className={clsx("font-display text-4xl md:text-5xl font-bold text-gold mb-2", isAr && "font-arabic")}>
                  {fact.value}
                </p>
                <p className={clsx("font-sans text-sm text-cream/60", isAr && "font-arabic")}>
                  {fact.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Region */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className={clsx("grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", isAr && "lg:flex lg:flex-row-reverse")}>
            <div className={clsx("region-text", isAr && "text-right")}>
              <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-4", isAr && "font-arabic text-sm tracking-normal")}>
                {o.region.label}
              </p>
              <h2 className={clsx("font-display text-4xl md:text-5xl font-bold text-green mb-8 leading-tight", isAr && "font-arabic")}>
                {o.region.title}
              </h2>
              {o.region.paragraphs.map((p, i) => (
                <p key={i} className={clsx("font-sans text-base leading-relaxed text-muted mb-4", isAr && "font-arabic")}>
                  {p}
                </p>
              ))}
            </div>
            <div className="relative h-96 overflow-hidden">
              <Image
                src={o.region.image}
                alt={o.region.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ecology commitments */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className={clsx("text-center mb-14")}>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-4", isAr && "font-arabic text-sm tracking-normal")}>
              {o.ecology.label}
            </p>
            <h2 className={clsx("font-display text-4xl font-bold text-green", isAr && "font-arabic")}>
              {o.ecology.title}
            </h2>
          </div>
          <div className="commitments-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {o.ecology.commitments.map((c, i) => (
              <div key={i} className={clsx("commitment-item opacity-0 border border-cream-dark p-6 hover:border-gold/40 transition-colors duration-300", isAr && "text-right")}>
                <div className="w-8 h-8 bg-gold/10 border border-gold/30 flex items-center justify-center mb-4">
                  <div className="w-3 h-3 bg-gold/60 rotate-45" />
                </div>
                <h3 className={clsx("font-display text-lg font-semibold text-green mb-2", isAr && "font-arabic")}>
                  {c.title}
                </h3>
                <p className={clsx("font-sans text-sm text-muted leading-relaxed", isAr && "font-arabic")}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
