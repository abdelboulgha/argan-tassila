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

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Intro ── */
      gsap.fromTo(".intro-badge",
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".process-intro", start: "top 88%" } }
      );
      gsap.fromTo(".intro-text",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.15,
          scrollTrigger: { trigger: ".process-intro", start: "top 88%" } }
      );

      /* ── Pillars counter-up ── */
      const pillarObs = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        document.querySelectorAll<HTMLElement>(".pillar-num").forEach((el, idx) => {
          const raw    = el.dataset.val ?? "0";
          const num    = parseInt(raw.replace(/\D/g, ""), 10);
          const prefix = raw.startsWith("+") ? "+" : "";
          const suffix = raw.includes("%") ? "%" : "";
          const obj    = { val: 0 };
          gsap.to(obj, {
            val: num, duration: 1.8, ease: "power2.out", delay: idx * 0.08,
            onUpdate() { el.innerText = `${prefix}${Math.round(obj.val)}${suffix}`; },
          });
          gsap.fromTo(el.closest(".pillar-item"),
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: idx * 0.08 }
          );
        });
        pillarObs.disconnect();
      }, { threshold: 0.6 });
      const pillarsEl = document.querySelector(".pillars-row");
      if (pillarsEl) pillarObs.observe(pillarsEl);

      /* ── Timeline track scrub ── */
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

      /* ── Per-step animations ── */
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        // data-left="true" means the card is in the LEFT cell
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

      /* ── Engagement cards ── */
      gsap.fromTo(".engagement-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".engagement-grid", start: "top 80%" } }
      );

      /* ── Banner ── */
      gsap.fromTo(".banner-inner > *",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.18, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".banner-inner", start: "top 80%" } }
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

      {/* ── Intro + Pillars ── */}
      <section className="py-20 bg-cream process-intro">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <span className={clsx(
            "intro-badge inline-block font-sans text-xs tracking-widest uppercase",
            "border border-gold/40 text-gold px-4 py-2 mb-6",
            isAr && "font-arabic text-sm tracking-normal"
          )}>
            {p.hero.label}
          </span>
          <p className={clsx(
            "intro-text font-sans text-lg md:text-xl leading-relaxed text-muted mb-16",
            isAr && "font-arabic"
          )}>
            {p.intro.text}
          </p>

          <div className="pillars-row grid grid-cols-2 md:grid-cols-4 gap-px bg-cream-dark border border-cream-dark">
            {p.pillars.map((pill, i) => (
              <div key={i} className="pillar-item bg-cream py-8 px-4 text-center">
                <p
                  className={clsx("pillar-num font-display text-5xl font-black text-green mb-1", isAr && "font-arabic")}
                  data-val={pill.value}
                >
                  {pill.value}
                </p>
                <div className="w-6 h-px bg-gold/40 mx-auto my-2" />
                <p className={clsx(
                  "font-sans text-[10px] tracking-widest uppercase text-muted",
                  isAr && "font-arabic text-xs tracking-normal"
                )}>
                  {pill.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Central Timeline ── */}
      <section className="steps-section py-16 md:py-20 bg-white relative overflow-hidden">

        {/* Desktop center line */}
        <div
          className="hidden lg:block absolute top-0 bottom-0 w-px bg-cream-dark"
          style={{ left: "50%" }}
          aria-hidden="true"
        >
          <div className="timeline-track absolute inset-0 bg-gold/50 origin-top" />
        </div>

        {/* Mobile left line */}
        <div className="lg:hidden absolute left-7 top-0 bottom-0 w-px bg-gold/20" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {p.steps.map((step, i) => {
            // LTR: even → LEFT, odd → RIGHT
            // RTL: even → RIGHT, odd → LEFT  (mirror)
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
                {/* ── Mobile layout ── */}
                <div className="lg:hidden pl-14 relative">
                  {/* Mobile dot */}
                  <div className="absolute left-3.5 top-7 w-4 h-4 bg-white border-2 border-gold rotate-45 z-10 step-dot" />
                  <StepCard step={step} isAr={isAr} />
                </div>

                {/* ── Desktop 3-col grid ── */}
                <div className="hidden lg:grid lg:grid-cols-[1fr_72px_1fr] items-center gap-0">

                  {/* LEFT cell */}
                  <div className="flex justify-end pr-8">
                    {cardOnLeft && <StepCard step={step} isAr={isAr} />}
                  </div>

                  {/* CENTER cell: dot */}
                  <div className="flex items-center justify-center relative z-10">
                    <div className="step-dot w-6 h-6 bg-white border-2 border-gold rotate-45 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gold/60 rotate-45" />
                    </div>
                  </div>

                  {/* RIGHT cell */}
                  <div className="flex justify-start pl-8">
                    {!cardOnLeft && <StepCard step={step} isAr={isAr} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Engagements ── */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <p className={clsx(
              "font-sans text-xs tracking-widest uppercase text-gold mb-4",
              isAr && "font-arabic text-sm tracking-normal"
            )}>
              {p.engagement.label}
            </p>
            <h2 className={clsx("font-display text-4xl md:text-5xl font-bold text-green", isAr && "font-arabic")}>
              {p.engagement.title}
            </h2>
          </div>
          <div className="engagement-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {p.engagement.items.map((item, i) => (
              <div key={i} className={clsx(
                "engagement-card opacity-0 bg-white border border-cream-dark p-8",
                "hover:border-gold/40 transition-colors duration-300",
                isAr && "text-right"
              )}>
                <div className={clsx("flex items-center gap-3 mb-6", isAr && "flex-row-reverse")}>
                  <span className="font-sans text-xs text-gold tracking-widest">0{i + 1}</span>
                  <div className="flex-1 h-px bg-gold/20" />
                </div>
                <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center mb-5">
                  <div className="w-3.5 h-3.5 bg-gold/60 rotate-45" />
                </div>
                <h3 className={clsx("font-display text-xl font-semibold text-green mb-3", isAr && "font-arabic")}>
                  {item.title}
                </h3>
                <p className={clsx("font-sans text-sm text-muted leading-relaxed", isAr && "font-arabic")}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Banner ── */}
      <section className="relative py-36 overflow-hidden">
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
    </div>
  );
}

/* ─────────────────────────────────────────
   Step card — extracted to avoid duplication
───────────────────────────────────────── */
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
      {/* Faded watermark number */}
      <span className={clsx(
        "absolute -top-2 font-display font-black text-[5.5rem] leading-none select-none text-green/[0.04]",
        isAr ? "left-1" : "right-1"
      )}>
        {step.number}
      </span>

      {/* Header */}
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

      {/* Divider */}
      <div className="step-divider h-px bg-gold/20 mb-6" />

      {/* Paragraphs */}
      {step.paragraphs.map((par, j) => (
        <p key={j} className={clsx(
          "step-para font-sans text-sm leading-relaxed text-muted mb-3 last:mb-0",
          isAr && "font-arabic"
        )}>
          {par}
        </p>
      ))}

      {/* Facts chips */}
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

      {/* Note */}
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
