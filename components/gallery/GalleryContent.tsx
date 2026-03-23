"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function GalleryContent() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const g = t.gallery;
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; caption: string } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const filteredImages = activeCategory === "all"
    ? g.images
    : g.images.filter(img => img.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gallery-item",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".gallery-grid", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(".gallery-item",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: "power2.out" }
    );
  }, [activeCategory]);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={ref}>
      <PageHero
        label={g.hero.label}
        title={g.hero.title}
        breadcrumbs={[
          { label: lang === "fr" ? "Accueil" : "الرئيسية", href: "/" },
          { label: g.hero.label },
        ]}
        dark={false}
      />

      {/* Filter tabs */}
      <div className="sticky top-20 z-30 bg-white border-b border-cream-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className={clsx("flex items-center gap-1 overflow-x-auto py-3", isAr && "flex-row-reverse")}>
            {g.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={clsx(
                  "flex-shrink-0 font-sans text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-green text-cream"
                    : "text-muted hover:text-green hover:bg-cream",
                  isAr && "font-arabic text-sm tracking-normal"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="gallery-grid columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filteredImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(img)}
                className="gallery-item opacity-0 group relative overflow-hidden break-inside-avoid block w-full text-left"
                aria-label={`Voir: ${img.caption}`}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={i % 3 === 0 ? 500 : 380}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-green/0 group-hover:bg-green/60 transition-colors duration-400 flex items-end p-4">
                    <p className={clsx(
                      "font-display text-cream text-base translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300",
                      isAr && "font-arabic w-full text-right"
                    )}>
                      {img.caption}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 bg-cream text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3">Instagram</p>
          <h2 className={clsx("font-display text-3xl font-bold text-green mb-4", isAr && "font-arabic")}>
            {g.instagram.title}
          </h2>
          <p className="font-sans text-base text-muted mb-8">{g.instagram.handle}</p>
          <a
            href="https://instagram.com/argan_tassila"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "inline-flex items-center gap-3 font-sans text-xs tracking-widest uppercase border border-green text-green px-8 py-4 hover:bg-green hover:text-cream transition-all duration-300",
              isAr && "flex-row-reverse"
            )}
          >
            <InstagramIcon />
            {g.instagram.cta}
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.caption}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            onClick={() => setLightbox(null)}
            aria-label="Fermer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
          <div
            className="relative max-w-4xl w-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={800}
              className="w-full h-auto object-contain max-h-[80vh]"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
            <p className={clsx("mt-3 font-display text-cream/80 text-center", isAr && "font-arabic")}>
              {lightbox.caption}
            </p>
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
