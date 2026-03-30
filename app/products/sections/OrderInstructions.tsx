"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppURL } from "@/lib/whatsapp";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function WhatsAppIcon({ size = "sm" }: { size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.564 4.14 1.544 5.875L.057 23.272a.75.75 0 00.92.92l5.397-1.487A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.95-1.356l-.355-.211-3.685 1.015 1.015-3.686-.211-.355A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}

export default function OrderInstructions() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const p = t.products;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".order-section > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".order-section", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section ref={ref} className="order-section py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-4", isAr && "font-arabic text-sm tracking-normal")}>
          {p.order.label}
        </p>
        <h2 className={clsx("font-display text-4xl font-bold text-green mb-14", isAr && "font-arabic")}>
          {p.order.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {p.order.steps.map((step, i) => (
            <div key={i} className={clsx(isAr && "text-right")}>
              <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mx-auto mb-4">
                <span className="font-sans text-lg font-bold text-gold">0{i + 1}</span>
              </div>
              <h3 className={clsx("font-display text-lg font-semibold text-green mb-2", isAr && "font-arabic")}>
                {step.title}
              </h3>
              <p className={clsx("font-sans text-sm text-muted", isAr && "font-arabic")}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
        <a
          href={buildWhatsAppURL(undefined, lang)}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "inline-flex items-center gap-3 font-sans text-sm font-semibold tracking-widest uppercase bg-green text-cream px-10 py-5 btn-slide btn-fill-green-dark",
            isAr && "flex-row-reverse"
          )}
        >
          <WhatsAppIcon size="lg" />
          {p.order.cta}
        </a>
      </div>
    </section>
  );
}
