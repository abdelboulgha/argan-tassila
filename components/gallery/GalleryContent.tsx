"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Alternating strip heights for visual rhythm
const HEIGHT_PATTERN = ["68vh", "44vh", "56vh", "72vh", "42vh", "60vh"];

export default function GalleryContent() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const g = t.gallery;
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<null | { src: string; alt: string; caption: string }>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const filteredImages =
    activeCategory === "all"
      ? g.images
      : g.images.filter((img) => img.category === activeCategory);

  /* ── Scroll animations — re-run when images change ── */
  useEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gallery-strip").forEach((strip, i) => {
        const fromLeft = i % 2 === 0;

        // Wipe reveal from alternating sides
        gsap.fromTo(
          strip,
          { clipPath: fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" },
          {
            clipPath: "inset(0 0% 0 0%)",
            duration: 1.3,
            ease: "power3.inOut",
            scrollTrigger: { trigger: strip, start: "top 88%", once: true },
          }
        );

        // Caption slides up after wipe starts
        const caption = strip.querySelector<HTMLElement>(".strip-caption");
        if (caption) {
          gsap.fromTo(
            caption,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.5,
              scrollTrigger: { trigger: strip, start: "top 88%", once: true },
            }
          );
        }

        // Watermark number drifts in
        const num = strip.querySelector<HTMLElement>(".strip-num");
        if (num) {
          gsap.fromTo(
            num,
            { opacity: 0, x: fromLeft ? 60 : -60 },
            {
              opacity: 1,
              x: 0,
              duration: 1.1,
              ease: "power2.out",
              delay: 0.2,
              scrollTrigger: { trigger: strip, start: "top 88%", once: true },
            }
          );
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [filteredImages]);

  /* ── Category filter ── */
  const handleCategory = useCallback(
    (id: string) => {
      if (id === activeCategory) return;
      const strips = containerRef.current?.querySelectorAll<HTMLElement>(".gallery-strip");
      if (strips && strips.length > 0) {
        gsap.to(strips, {
          opacity: 0,
          y: -12,
          stagger: 0.04,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => setActiveCategory(id),
        });
      } else {
        setActiveCategory(id);
      }
    },
    [activeCategory]
  );

  /* ── Lightbox open animation ── */
  useEffect(() => {
    if (lightbox && lightboxRef.current) {
      gsap.fromTo(lightboxRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      const content = lightboxRef.current.querySelector<HTMLElement>(".lb-content");
      if (content) {
        gsap.fromTo(content, { scale: 0.93, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.4)" });
      }
    }
  }, [lightbox]);

  /* ── Escape key ── */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <div ref={containerRef}>
      <PageHero
        label={g.hero.label}
        title={g.hero.title}
        dark={false}
      />

      {/* ── Filter bar ── */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-cream-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className={clsx("flex items-stretch gap-0 overflow-x-auto", isAr && "flex-row-reverse")}>
            {g.categories.map((cat) => {
              const count =
                cat.id === "all"
                  ? g.images.length
                  : g.images.filter((img) => img.category === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategory(cat.id)}
                  className={clsx(
                    "relative flex-shrink-0 flex flex-col items-center justify-center gap-1 px-8 md:px-12 py-5 transition-colors duration-200",
                    isActive ? "text-green" : "text-muted/35 hover:text-muted/65",
                    isAr && "font-arabic"
                  )}
                >
                  <span className={clsx("font-sans text-sm md:text-base tracking-widest uppercase font-medium", isAr && "tracking-normal")}>
                    {cat.label}
                  </span>
                  <span className="font-sans text-xs text-gold/70">{String(count).padStart(2, "0")}</span>
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Full-width editorial strips ── */}
      <div>
        {filteredImages.map((img, i) => {
          const fromLeft = i % 2 === 0;
          const h = HEIGHT_PATTERN[i % HEIGHT_PATTERN.length];
          return (
            <button
              key={`${activeCategory}-${img.src}-${i}`}
              onClick={() => setLightbox(img)}
              className="gallery-strip group relative w-full block overflow-hidden focus:outline-none"
              style={{ height: h, clipPath: "inset(0 0 0 0)" }}
              aria-label={img.caption}
            >
              {/* Photo */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                sizes="100vw"
              />

              {/* Gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className={clsx(
                "absolute inset-y-0 w-1/3 to-transparent",
                fromLeft
                  ? "left-0 bg-gradient-to-r from-black/20"
                  : "right-0 bg-gradient-to-l from-black/20"
              )} />

              {/* Watermark index number */}
              <div className={clsx(
                "strip-num absolute top-1/2 -translate-y-1/2 font-display font-black text-white/[0.07] select-none pointer-events-none leading-none",
                "text-[18vw]",
                fromLeft ? "right-4 md:right-10" : "left-4 md:left-10"
              )}>
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Caption block */}
              <div className={clsx(
                "strip-caption absolute bottom-8 md:bottom-12 flex flex-col gap-2.5",
                fromLeft
                  ? clsx("left-6 md:left-16 items-start", isAr && "items-end text-right")
                  : clsx("right-6 md:right-16 items-end", isAr && "items-start text-left")
              )}>
                <span className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-gold/90">
                  {img.category}&nbsp;&nbsp;·&nbsp;&nbsp;
                  {String(i + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(filteredImages.length).padStart(2, "0")}
                </span>
                <h3 className={clsx(
                  "font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.05] max-w-[14rem] md:max-w-sm",
                  isAr && "font-arabic"
                )}>
                  {img.caption}
                </h3>
                <div className={clsx("w-10 h-[2px] bg-gold mt-1", !fromLeft && !isAr && "self-end")} />
              </div>

              {/* Gold frame on hover */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-colors duration-700 pointer-events-none" />

              {/* Expand icon */}
              <div className={clsx(
                "absolute top-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400",
                fromLeft ? "right-5" : "left-5"
              )}>
                <div className="w-9 h-9 border border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                  <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.2" className="w-4 h-4">
                    <path d="M10 2h4v4M6 14H2v-4M14 2l-5 5M2 14l5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Count bar ── */}
      <div className="bg-white border-t border-cream-dark px-6 md:px-10 py-5">
        <div className={clsx("max-w-7xl mx-auto flex items-center gap-5", isAr && "flex-row-reverse")}>
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-muted/40">
            {filteredImages.length}&nbsp;{lang === "fr" ? "visuels" : "صورة"}
          </p>
          <div className="flex-1 h-px bg-cream-dark" />
          <p className={clsx("font-display italic text-sm text-muted/30", isAr && "font-arabic not-italic")}>
            {lang === "fr" ? "Cliquez pour agrandir" : "انقر للتكبير"}
          </p>
        </div>
      </div>

      {/* ── Instagram CTA ── */}
      <section className="py-20 bg-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 border-l border-white" style={{ left: `${(i + 1) * 9.09}%` }} />
          ))}
        </div>
        <div className="relative max-w-xl mx-auto px-6 text-center">
          <div className="w-5 h-px bg-gold mx-auto mb-7" />
          <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-gold mb-5">Instagram</p>
          <h2 className={clsx("font-display text-3xl md:text-4xl font-bold text-cream mb-3", isAr && "font-arabic")}>
            {g.instagram.title}
          </h2>
          <p className="font-sans text-sm text-cream/40 mb-8">{g.instagram.handle}</p>
          <a
            href="https://instagram.com/argan_tassila"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "inline-flex items-center gap-3 font-sans text-[10px] tracking-widest uppercase",
              "border border-gold/40 text-gold px-8 py-4 hover:bg-gold hover:text-green hover:border-gold transition-all duration-300",
              isAr && "flex-row-reverse"
            )}
          >
            <InstagramIcon />
            {g.instagram.cta}
          </a>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-16"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.caption}
        >
          <button
            className="absolute top-5 right-5 text-white/40 hover:text-white p-2 z-10 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Fermer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          <div
            className="lb-content relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-gold z-10 pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-gold z-10 pointer-events-none" />
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={800}
              className="w-full h-auto object-contain max-h-[75vh]"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
            <div className={clsx("mt-5 flex items-center gap-4", isAr && "flex-row-reverse")}>
              <div className="flex-1 h-px bg-white/10" />
              <p className={clsx("font-display text-cream/60 text-sm", isAr && "font-arabic")}>{lightbox.caption}</p>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
