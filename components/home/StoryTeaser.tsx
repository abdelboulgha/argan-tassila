"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function StoryTeaser() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const s = t.home.story;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-text",
        { opacity: 0, x: isAr ? 40 : -40 },
        {
          opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".story-image",
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".story-stat",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".story-stats", start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-green overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
            isAr && "lg:flex lg:flex-row-reverse"
          )}
        >
          {/* Text side */}
          <div
            className={clsx(
              "story-text opacity-0",
              isAr && "text-right"
            )}
          >
            <p
              className={clsx(
                "font-sans text-xs tracking-widest uppercase text-gold mb-4",
                isAr && "font-arabic text-sm tracking-normal"
              )}
            >
              {s.label}
            </p>
            <h2
              className={clsx(
                "font-display text-4xl md:text-5xl font-bold text-cream leading-tight mb-6",
                isAr && "font-arabic"
              )}
            >
              {s.title}
            </h2>
            <p
              className={clsx(
                "font-sans text-base text-cream/70 leading-relaxed mb-10 max-w-md",
                isAr && "font-arabic"
              )}
            >
              {s.text}
            </p>

            {/* Stats */}
            <div
              className={clsx(
                "story-stats grid grid-cols-3 gap-6 mb-10",
                isAr && "text-right"
              )}
            >
              {s.stats.map((stat, i) => (
                <div key={i} className="story-stat opacity-0">
                  <p className="font-display text-3xl font-bold text-gold">
                    {stat.value}
                  </p>
                  <p
                    className={clsx(
                      "font-sans text-xs text-cream/50 mt-1",
                      isAr && "font-arabic"
                    )}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className={clsx(
                "inline-flex items-center gap-3 font-sans text-xs tracking-widest uppercase text-cream border-b border-cream/30 pb-1 hover:border-gold hover:text-gold transition-colors duration-300",
                isAr && "flex-row-reverse"
              )}
            >
              {s.cta}
              <span className="w-8 h-px bg-current" />
            </Link>
          </div>

          {/* Image side */}
          <div className="story-image opacity-0 relative">
            <div className="relative h-96 md:h-[500px] overflow-hidden">
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative gold border */}
            <div className={clsx(
              "absolute -bottom-4 w-2/3 h-full border border-gold/30 -z-10",
              isAr ? "-left-4" : "-right-4"
            )} />
          </div>
        </div>
      </div>
    </section>
  );
}
