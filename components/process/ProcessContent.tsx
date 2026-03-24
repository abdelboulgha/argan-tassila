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

      /* ── Intro badge + text ── */
      gsap.fromTo(".intro-badge",
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".process-intro", start: "top 88%" } }
      );
      gsap.fromTo(".intro-text",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.15,
          scrollTrigger: { trigger: ".process-intro", start: "top 88%" } }
      );

      /* ── Pillars counter-up ── */
      const pillarEls = document.querySelectorAll<HTMLElement>(".pillar-num");
      const pillarObs = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        pillarEls.forEach((el) => {
          const raw = el.dataset.val ?? "0";
          const num  = parseInt(raw.replace(/\D/g, ""), 10);
          const prefix = raw.startsWith("+") ? "+" : "";
          const suffix = raw.includes("%") ? "%" : "";
          gsap.fromTo(el,
            { innerText: "0" },
            { innerText: num, duration: 1.8, ease: "power2.out", snap: { innerText: 1 },
              onUpdate() { el.innerText = `${prefix}${Math.round(parseFloat(el.innerText))}${suffix}`; }
            }
          );
          gsap.fromTo(el.parentElement,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          );
        });
        pillarObs.disconnect();
      }, { threshold: 0.5 });
      const pillarsEl = document.querySelector(".pillars-row");
      if (pillarsEl) pillarObs.observe(pillarsEl);

      /* ── Timeline progress line (scrub) ── */
      gsap.fromTo(".timeline-track",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".steps-container",
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          }
        }
      );

      /* ── Per-step sequential animation ── */
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        const badge   = step.querySelector(".step-badge");
        const season  = step.querySelector(".step-season");
        const titleWrap = step.querySelector(".step-title-overflow");
        const divider = step.querySelector(".step-divider");
        const paras   = step.querySelectorAll(".step-para");
        const chips   = step.querySelectorAll(".fact-chip");
        const note    = step.querySelector(".step-note");
        const bigNum  = step.querySelector(".step-big-num");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: step, start: "top 78%" },
        });

        if (bigNum)
          tl.fromTo(bigNum,
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }, 0
          );
        if (badge)
          tl.fromTo(badge,
            { opacity: 0, x: isAr ? 24 : -24 },
            { opacity: 1, x: 0, duration: 0.55, ease: "power2.out" }, 0.1
          );
        if (season)
          tl.fromTo(season,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.25
          );
        if (titleWrap)
          tl.fromTo(titleWrap,
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 0.85, ease: "power3.out" }, 0.3
          );
        if (divider)
          tl.fromTo(divider,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: "power2.inOut",
              transformOrigin: isAr ? "right" : "left" }, 0.55
          );
        if (paras.length)
          tl.fromTo(Array.from(paras),
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power2.out" }, 0.65
          );
        if (chips.length)
          tl.fromTo(Array.from(chips),
            { opacity: 0, scale: 0.8, y: 10 },
            { opacity: 1, scale: 1, y: 0, stagger: 0.08, duration: 0.45,
              ease: "back.out(1.7)" }, 0.9
          );
        if (note)
          tl.fromTo(note,
            { opacity: 0, x: isAr ? 16 : -16 },
            { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 1.1
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
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out",
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

      {/* ── Intro ── */}
      <section className="py-20 bg-cream process-intro">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <span className={clsx(
            "intro-badge inline-block font-sans text-xs tracking-widest uppercase border border-gold/40 text-gold px-4 py-2 mb-6",
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

          {/* Pillars */}
          <div className="pillars-row grid grid-cols-2 md:grid-cols-4 gap-px bg-cream-dark border border-cream-dark">
            {p.pillars.map((pill, i) => (
              <div key={i} className="bg-cream py-8 px-4 text-center">
                <p
                  className={clsx("pillar-num font-display text-5xl font-black text-green mb-1", isAr && "font-arabic")}
                  data-val={pill.value}
                >
                  {pill.value}
                </p>
                <div className="w-6 h-px bg-gold/40 mx-auto my-2" />
                <p className={clsx("font-sans text-[10px] tracking-widest uppercase text-muted", isAr && "font-arabic text-xs tracking-normal")}>
                  {pill.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="bg-white relative steps-container">

        {/* Vertical timeline track */}
        <div className="hidden lg:block absolute left-[200px] top-0 bottom-0 w-px bg-cream-dark" aria-hidden="true">
          <div className="timeline-track absolute inset-0 bg-gold/50" />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {p.steps.map((step, i) => (
            <div
              key={i}
              className={clsx(
                "process-step relative grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-20",
                "py-20 md:py-24",
                i < p.steps.length - 1 && "border-b border-cream-dark",
                i % 2 === 0 ? "bg-white" : "bg-cream/30"
              )}
            >
              {/* ── Left col: number + season ── */}
              <div className={clsx("relative", isAr && "text-right lg:order-last")}>

                {/* Huge bg number */}
                <span
                  className="step-big-num absolute -top-4 font-display font-black leading-none select-none text-[7rem] text-green/5"
                  style={{ [isAr ? "right" : "left"]: "-0.1em" }}
                >
                  {step.number}
                </span>

                {/* Visible badge */}
                <div className={clsx("step-badge flex items-center gap-3 mb-5 relative z-10", isAr && "flex-row-reverse")}>
                  <span className="font-display text-3xl font-black text-gold leading-none">{step.number}</span>
                  <div className="flex-1 h-px bg-gold/30" />
                </div>

                {/* Season */}
                <p className={clsx(
                  "step-season font-sans text-[10px] tracking-[0.25em] uppercase text-muted/70 relative z-10",
                  isAr && "font-arabic text-xs tracking-normal"
                )}>
                  {step.season}
                </p>

                {/* Dot on timeline */}
                <div className="hidden lg:block absolute -right-[0.5rem] top-[3.5rem] w-3 h-3 bg-white border-2 border-gold z-10" />
              </div>

              {/* ── Right col: content ── */}
              <div className={clsx(isAr && "text-right")}>

                {/* Title with clip reveal */}
                <div className="overflow-hidden mb-1">
                  <h2 className={clsx(
                    "step-title-overflow font-display text-4xl md:text-5xl font-bold text-green leading-tight",
                    isAr && "font-arabic"
                  )}>
                    {step.title}
                  </h2>
                </div>

                {/* Animated divider */}
                <div className="step-divider h-px bg-gold/40 mb-8 mt-3" />

                {/* Paragraphs */}
                {step.paragraphs.map((par, j) => (
                  <p key={j} className={clsx(
                    "step-para font-sans text-sm leading-relaxed text-muted mb-4",
                    isAr && "font-arabic"
                  )}>
                    {par}
                  </p>
                ))}

                {/* Facts chips */}
                {step.facts && step.facts.length > 0 && (
                  <div className={clsx("flex flex-wrap gap-2 mt-7", isAr && "justify-end")}>
                    {step.facts.map((fact, k) => (
                      <span key={k} className={clsx(
                        "fact-chip inline-flex items-center gap-1.5 font-sans text-[10px] tracking-wider uppercase",
                        "border border-gold/40 text-gold/80 px-3 py-1.5 bg-gold/[0.04]",
                        isAr && "font-arabic text-xs tracking-normal"
                      )}>
                        <span className="w-1 h-1 bg-gold/70 rotate-45 inline-block" />
                        {fact}
                      </span>
                    ))}
                  </div>
                )}

                {/* Note */}
                {step.note && (
                  <p className={clsx(
                    "step-note mt-6 font-sans text-xs italic text-gold/80",
                    "border-l-2 border-gold/30 pl-4",
                    isAr && "border-l-0 border-r-2 pl-0 pr-4 font-arabic"
                  )}>
                    {step.note}
                  </p>
                )}
              </div>
            </div>
          ))}
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
        <div className="absolute inset-0 bg-green/78" />
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
