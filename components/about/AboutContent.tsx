"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function AboutContent() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const a = t.about;
  const ref = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Story section
      gsap.fromTo(".about-story-text > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".about-story-text", start: "top 80%" } }
      );
      gsap.fromTo(".about-story-img",
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: ".about-story-img", start: "top 80%" } }
      );

      // Values
      gsap.fromTo(".value-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".values-grid", start: "top 80%" } }
      );

      // Stats counter
      const statEls = document.querySelectorAll(".stat-counter");
      const statValues = a.stats.items.map(s => s.value);
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          statValues.forEach((target, i) => {
            gsap.to({}, {
              duration: 2,
              ease: "power2.out",
              onUpdate: function() {
                const progress = this.progress();
                setCounts(prev => {
                  const next = [...prev];
                  next[i] = Math.round(target * progress);
                  return next;
                });
              },
            });
          });
          observer.disconnect();
        }
      }, { threshold: 0.5 });
      if (statEls[0]) observer.observe(statEls[0].parentElement!);

      // Team
      gsap.fromTo(".team-member",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".team-grid", start: "top 80%" } }
      );

      // Certifications
      gsap.fromTo(".cert-item",
        { opacity: 0, x: isAr ? 30 : -30 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".cert-grid", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr, a.stats.items]);

  return (
    <div ref={ref}>
      {/* Hero */}
      <PageHero
        label={a.hero.label}
        title={a.hero.title}
        breadcrumbs={[
          { label: a.hero.breadcrumb[0], href: "/" },
          { label: a.hero.breadcrumb[1] },
        ]}
        image="https://images.unsplash.com/photo-1548393264-96b9b1151e93?w=1920&q=80"
        dark={false}
      />

      {/* Story Section */}
      <section className="py-24 md:py-32 bg-white">
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
              {/* Pull quote */}
              <blockquote className={clsx("mt-8 border-l-2 border-gold pl-6", isAr && "border-l-0 border-r-2 pl-0 pr-6")}>
                <p className={clsx("font-display text-xl italic text-green leading-relaxed", isAr && "font-arabic not-italic")}>
                  &ldquo;{a.story.pullQuote}&rdquo;
                </p>
              </blockquote>
            </div>
            {/* Image */}
            <div className="about-story-img opacity-0 relative">
              <div className="relative h-[500px] overflow-hidden">
                <Image
                  src={a.story.image}
                  alt={a.story.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className={clsx(
                "absolute -bottom-4 w-3/4 h-full border border-gold/30 -z-10",
                isAr ? "-left-4" : "-right-4"
              )} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {a.stats.items.map((stat, i) => (
              <div key={i} className={clsx("text-center", isAr && "font-arabic")}>
                <p className="stat-counter font-display text-5xl md:text-6xl font-bold text-green">
                  {counts[i]}{stat.suffix}
                </p>
                <p className={clsx("font-sans text-sm text-muted mt-2", isAr && "font-arabic")}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className={clsx("text-center mb-16", isAr && "font-arabic")}>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-4", isAr && "text-sm tracking-normal")}>
              {a.values.label}
            </p>
            <h2 className={clsx("font-display text-4xl md:text-5xl font-bold text-green", isAr && "font-arabic")}>
              {a.values.title}
            </h2>
          </div>
          <div className="values-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {a.values.items.map((value, i) => (
              <div key={i} className={clsx("value-card opacity-0 border border-cream-dark p-8 hover:border-gold/40 transition-colors duration-300", isAr && "text-right")}>
                <div className={clsx("flex items-center gap-3 mb-6", isAr && "flex-row-reverse")}>
                  <span className="font-sans text-xs text-gold tracking-widest">0{i + 1}</span>
                  <div className="w-8 h-px bg-gold/30" />
                </div>
                <h3 className={clsx("font-display text-2xl font-semibold text-green mb-4", isAr && "font-arabic")}>
                  {value.title}
                </h3>
                <p className={clsx("font-sans text-sm leading-relaxed text-muted", isAr && "font-arabic")}>
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 bg-green">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className={clsx("text-center mb-16")}>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-4", isAr && "font-arabic text-sm tracking-normal")}>
              {a.team.label}
            </p>
            <h2 className={clsx("font-display text-4xl md:text-5xl font-bold text-cream", isAr && "font-arabic")}>
              {a.team.title}
            </h2>
          </div>
          <div className="team-grid grid grid-cols-1 sm:grid-cols-3 gap-8">
            {a.team.members.map((member, i) => (
              <div key={i} className={clsx("team-member opacity-0 text-center", isAr && "font-arabic")}>
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-2 border-gold/30">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
                <h3 className={clsx("font-display text-xl font-semibold text-cream mb-1", isAr && "font-arabic")}>
                  {member.name}
                </h3>
                <p className={clsx("font-sans text-sm text-gold", isAr && "font-arabic")}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className={clsx("text-center mb-16")}>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-4", isAr && "font-arabic text-sm tracking-normal")}>
              {a.certifications.label}
            </p>
            <h2 className={clsx("font-display text-4xl md:text-5xl font-bold text-green", isAr && "font-arabic")}>
              {a.certifications.title}
            </h2>
          </div>
          <div className="cert-grid grid grid-cols-2 md:grid-cols-4 gap-6">
            {a.certifications.items.map((cert, i) => (
              <div key={i} className={clsx("cert-item opacity-0 bg-white border border-cream-dark p-6 text-center hover:border-gold/40 transition-colors duration-300")}>
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mx-auto mb-4">
                  <div className="w-4 h-4 bg-gold/60 rotate-45" />
                </div>
                <h3 className={clsx("font-display text-base font-semibold text-green mb-2", isAr && "font-arabic")}>
                  {cert.title}
                </h3>
                <p className={clsx("font-sans text-xs text-muted", isAr && "font-arabic")}>
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
