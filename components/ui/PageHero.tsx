"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  image?: string;
  imageAlt?: string;
  dark?: boolean;
}

export default function PageHero({
  label,
  title,
  subtitle,
  breadcrumbs,
  image,
  imageAlt = "",
  dark = false,
}: PageHeroProps) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".page-hero-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        "relative flex items-end pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden",
        dark ? "bg-green" : "bg-cream"
      )}
    >
      {/* Background image */}
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-center opacity-20"
            priority
            sizes="100vw"
          />
          <div className={clsx(
            "absolute inset-0",
            dark ? "bg-green/80" : "bg-cream/80"
          )} />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div
          className={clsx(
            "page-hero-content",
            isAr && "text-right"
          )}
        >
          {/* Breadcrumb */}
          {breadcrumbs && (
            <nav aria-label="Fil d'Ariane" className={clsx("flex items-center gap-2 mb-6", isAr && "flex-row-reverse justify-end")}>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className={clsx("flex items-center gap-2", isAr && "flex-row-reverse")}>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className={clsx(
                        "font-sans text-xs tracking-widest uppercase hover:text-gold transition-colors",
                        dark ? "text-cream/50" : "text-muted"
                      )}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={clsx("font-sans text-xs tracking-widest uppercase", dark ? "text-cream/80" : "text-green")}>
                      {crumb.label}
                    </span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <span className={clsx("text-xs", dark ? "text-cream/30" : "text-muted/40")}>
                      {isAr ? "←" : "→"}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Label */}
          <p
            className={clsx(
              "font-sans text-xs tracking-widest uppercase text-gold mb-4",
              isAr && "font-arabic text-sm tracking-normal"
            )}
          >
            {label}
          </p>

          {/* Title */}
          <h1
            className={clsx(
              "font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight",
              dark ? "text-cream" : "text-green",
              isAr && "font-arabic"
            )}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              className={clsx(
                "font-sans text-base md:text-lg leading-relaxed mt-4 max-w-xl",
                dark ? "text-cream/70" : "text-muted",
                isAr && "font-arabic"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Gold line */}
        <div className="mt-10 w-16 h-0.5 bg-gold" />
      </div>
    </div>
  );
}
