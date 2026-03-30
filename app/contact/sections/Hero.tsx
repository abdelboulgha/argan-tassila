"use client";

import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppURL } from "@/lib/whatsapp";

const PHONE = "+212 637 817 229";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.564 4.14 1.544 5.875L.057 23.272a.75.75 0 00.92.92l5.397-1.487A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.95-1.356l-.355-.211-3.685 1.015 1.015-3.686-.211-.355A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.25 6.338c0 9.07 7.332 16.423 16.423 16.423 2.04 0 3.997-.376 5.79-1.061a.75.75 0 00.46-.696v-3.98a.75.75 0 00-.69-.748 18.949 18.949 0 01-3.677-.757.75.75 0 00-.717.174l-2.048 2.049a15.026 15.026 0 01-5.494-5.494l2.048-2.048a.75.75 0 00.175-.718 18.949 18.949 0 01-.757-3.677.75.75 0 00-.748-.69H3.01a.75.75 0 00-.75.75c-.005.156-.01.313-.01.47z" />
    </svg>
  );
}

export default function Hero() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const c = t.contact;

  return (
    <section className="bg-green relative overflow-hidden py-28 md:py-40">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-gold/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 border border-gold/10 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-cream/5 rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
        <span className="inline-block font-sans text-xs tracking-[0.3em] uppercase text-gold mb-6">
          {c.hero.label}
        </span>
        <h1 className={clsx(
          "font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-[1.05] mb-6",
          isAr && "font-arabic"
        )}>
          {c.hero.title}
        </h1>
        <p className={clsx(
          "font-sans text-base md:text-lg text-cream/60 mb-12 max-w-lg mx-auto",
          isAr && "font-arabic"
        )}>
          {c.hero.subtitle}
        </p>
        <div className={clsx("flex flex-wrap items-center justify-center gap-4", isAr && "flex-row-reverse")}>
          <a
            href={buildWhatsAppURL(undefined, lang)}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-widest uppercase bg-gold text-white px-8 py-4 btn-slide btn-fill-gold-light",
              isAr && "flex-row-reverse"
            )}
          >
            <WhatsAppIcon />
            {c.info.whatsappBtn}
          </a>
          <a
            href="tel:+212637817229"
            className={clsx(
              "inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-widest uppercase border border-cream/30 text-cream px-8 py-4 btn-slide btn-fill-white-soft hover:border-cream",
              isAr && "flex-row-reverse"
            )}
          >
            <PhoneIcon />
            {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
