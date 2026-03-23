"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppURL } from "@/lib/whatsapp";

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const h = t.home.hero;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .fromTo(".hero-title-1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
        .fromTo(".hero-title-2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .fromTo(".hero-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .fromTo(".hero-ctas", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .fromTo(".hero-image-panel", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.inOut" }, 0.2)
        .fromTo(".hero-scroll-indicator", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex overflow-hidden bg-green"
    >
      {/* Left panel — text */}
      <div
        className={clsx(
          "relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-32 w-full lg:w-1/2",
          isAr && "items-end text-right"
        )}
      >
        {/* Badge */}
        <div className="hero-badge mb-8 opacity-0">
          <span className="inline-block font-sans text-xs tracking-[0.3em] uppercase text-gold border border-gold/40 px-4 py-2">
            {h.badge}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-6">
          <span
            className={clsx(
              "hero-title-1 block font-display text-6xl md:text-7xl lg:text-8xl font-bold text-cream leading-none opacity-0",
              isAr && "font-arabic"
            )}
          >
            {h.title1}
          </span>
          <span
            className={clsx(
              "hero-title-2 block font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-none opacity-0",
              isAr ? "font-arabic text-gold" : "text-gold italic"
            )}
          >
            {h.title2}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={clsx(
            "hero-subtitle font-sans text-base md:text-lg text-cream/70 max-w-sm leading-relaxed mb-10 opacity-0",
            isAr && "font-arabic"
          )}
        >
          {h.subtitle}
        </p>

        {/* CTAs */}
        <div
          className={clsx(
            "hero-ctas flex flex-wrap gap-4 opacity-0",
            isAr && "flex-row-reverse"
          )}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase bg-gold text-white px-7 py-4 hover:bg-gold-light transition-colors duration-300"
          >
            {h.cta1}
            <ArrowRight />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase border border-cream/40 text-cream px-7 py-4 hover:border-cream hover:bg-cream/10 transition-all duration-300"
          >
            {h.cta2}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className={clsx(
            "hero-scroll-indicator absolute bottom-10 opacity-0 flex items-center gap-3",
            isAr ? "right-8 md:right-16 lg:right-20 flex-row-reverse" : "left-8 md:left-16 lg:left-20"
          )}
        >
          <div className="w-8 h-px bg-cream/30" />
          <span className="font-sans text-xs tracking-widest uppercase text-cream/40">
            {h.scroll}
          </span>
        </div>
      </div>

      {/* Right panel — image */}
      <div className="hero-image-panel hidden lg:block absolute inset-y-0 right-0 w-1/2 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80"
          alt="Huile d'argan artisanale"
          fill
          className="object-cover object-center"
          priority
          sizes="50vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green/60 via-transparent to-transparent" />
      </div>

      {/* Background pattern for mobile */}
      <div className="absolute inset-0 lg:hidden opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-green/80" />
      </div>

      {/* Decorative gold line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gold hidden lg:block" />
    </section>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
      <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
