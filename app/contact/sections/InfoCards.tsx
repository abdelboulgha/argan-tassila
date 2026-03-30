"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppURL } from "@/lib/whatsapp";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const PHONE = "+212 637 817 229";
const EMAIL = "argantassila@gmail.com";

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

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

export default function InfoCards() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".info-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".cards-row", start: "top 82%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-cream-dark/30 py-14">
      <div className="cards-row max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <a href="tel:+212637817229"
          className={clsx("info-card group bg-white border border-cream-dark p-7 flex flex-col gap-4 hover:border-green hover:shadow-sm transition-all duration-300", isAr && "items-end text-right")}>
          <div className="w-11 h-11 bg-green/8 border border-green/20 flex items-center justify-center text-green group-hover:bg-green group-hover:text-cream transition-colors duration-300">
            <PhoneIcon />
          </div>
          <div>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-muted mb-1.5", isAr && "font-arabic text-sm tracking-normal")}>
              {isAr ? "الهاتف" : "Téléphone"}
            </p>
            <p className="font-display text-sm font-semibold text-dark">{PHONE}</p>
          </div>
        </a>

        <a href={buildWhatsAppURL(undefined, lang)} target="_blank" rel="noopener noreferrer"
          className={clsx("info-card group bg-white border border-cream-dark p-7 flex flex-col gap-4 hover:border-green hover:shadow-sm transition-all duration-300", isAr && "items-end text-right")}>
          <div className="w-11 h-11 bg-green/8 border border-green/20 flex items-center justify-center text-green group-hover:bg-green group-hover:text-cream transition-colors duration-300">
            <WhatsAppIcon />
          </div>
          <div>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-muted mb-1.5", isAr && "font-arabic text-sm tracking-normal")}>
              WhatsApp
            </p>
            <p className="font-display text-sm font-semibold text-dark">{PHONE}</p>
          </div>
        </a>

        <a href={`mailto:${EMAIL}`}
          className={clsx("info-card group bg-white border border-cream-dark p-7 flex flex-col gap-4 hover:border-green hover:shadow-sm transition-all duration-300", isAr && "items-end text-right")}>
          <div className="w-11 h-11 bg-green/8 border border-green/20 flex items-center justify-center text-green group-hover:bg-green group-hover:text-cream transition-colors duration-300">
            <EmailIcon />
          </div>
          <div>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-muted mb-1.5", isAr && "font-arabic text-sm tracking-normal")}>
              Email
            </p>
            <p className="font-display text-sm font-semibold text-dark break-all">{EMAIL}</p>
          </div>
        </a>

        <div className={clsx("info-card group bg-white border border-cream-dark p-7 flex flex-col gap-4 hover:border-green hover:shadow-sm transition-all duration-300", isAr && "items-end text-right")}>
          <div className="w-11 h-11 bg-green/8 border border-green/20 flex items-center justify-center text-green group-hover:bg-green group-hover:text-cream transition-colors duration-300">
            <LocationIcon />
          </div>
          <div>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-muted mb-1.5", isAr && "font-arabic text-sm tracking-normal")}>
              {isAr ? "العنوان" : "Adresse"}
            </p>
            <p className={clsx("font-display text-sm font-semibold text-dark leading-snug", isAr && "font-arabic")}>
              {isAr ? "أكادير، سوس-ماسة" : "Agadir, Souss-Massa"}<br />
              {isAr ? "المغرب" : "Maroc"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
