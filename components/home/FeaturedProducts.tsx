"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProducts() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const f = t.home.featured;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".featured-header", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".product-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".products-grid", start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div
          className={clsx(
            "featured-header opacity-0 flex items-end justify-between mb-16",
            isAr && "flex-row-reverse"
          )}
        >
          <div className={clsx(isAr && "text-right")}>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-3", isAr && "font-arabic text-sm tracking-normal")}>
              {f.label}
            </p>
            <h2
              className={clsx(
                "font-display text-4xl md:text-5xl font-bold text-green",
                isAr && "font-arabic"
              )}
            >
              {f.title}
            </h2>
          </div>
          <Link
            href="/products"
            className={clsx(
              "hidden md:flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-green hover:text-gold transition-colors duration-200",
              isAr && "flex-row-reverse"
            )}
          >
            {f.discover}
            <span className="w-6 h-px bg-current" />
          </Link>
        </div>

        {/* Products grid */}
        <div className="products-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {f.products.map((product, i) => (
            <Link
              key={i}
              href={product.href}
              className="product-card opacity-0 group relative overflow-hidden block"
            >
              {/* Image */}
              <div className="relative h-72 md:h-80 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-green/80 via-transparent to-transparent" />
              </div>

              {/* Text */}
              <div
                className={clsx(
                  "absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300",
                  isAr && "text-right"
                )}
              >
                <h3
                  className={clsx(
                    "font-display text-xl font-semibold text-cream mb-1",
                    isAr && "font-arabic"
                  )}
                >
                  {product.name}
                </h3>
                <p
                  className={clsx(
                    "font-sans text-sm text-cream/70",
                    isAr && "font-arabic"
                  )}
                >
                  {product.desc}
                </p>
                <div
                  className={clsx(
                    "flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    isAr && "flex-row-reverse"
                  )}
                >
                  <span className="font-sans text-xs tracking-widest uppercase text-gold">
                    {f.discover}
                  </span>
                  <div className="w-6 h-px bg-gold" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/products"
            className="font-sans text-xs tracking-widest uppercase border border-green text-green px-8 py-3 hover:bg-green hover:text-cream transition-all duration-300"
          >
            {f.discover}
          </Link>
        </div>
      </div>
    </section>
  );
}
