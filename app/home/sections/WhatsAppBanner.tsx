"use client";

import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import { clsx } from "clsx";

export default function WhatsAppBanner() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const b = t.home.whatsappBanner;

  return (
    <section className="bg-gold py-16 md:py-20">
      <div
        className={clsx(
          "max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8",
          isAr && "md:flex-row-reverse text-right"
        )}
      >
        <div>
          <h2
            className={clsx(
              "font-display text-2xl md:text-3xl font-bold text-white mb-2",
              isAr && "font-arabic"
            )}
          >
            {b.title}
          </h2>
          <p
            className={clsx(
              "font-sans text-sm text-white/80",
              isAr && "font-arabic"
            )}
          >
            {b.subtitle}
          </p>
        </div>
        <a
          href={buildWhatsAppURL(undefined, lang)}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "flex-shrink-0 inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-widest uppercase bg-white text-green px-8 py-4 btn-slide btn-fill-cream-white",
            isAr && "flex-row-reverse"
          )}
        >
          <WhatsAppSVG />
          {b.cta}
        </a>
      </div>
    </section>
  );
}

function WhatsAppSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.564 4.14 1.544 5.875L.057 23.272a.75.75 0 00.92.92l5.397-1.487A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.95-1.356l-.355-.211-3.685 1.015 1.015-3.686-.211-.355A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}
