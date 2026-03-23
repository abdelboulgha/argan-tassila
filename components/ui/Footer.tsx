"use client";

import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppURL } from "@/lib/whatsapp";

export default function Footer() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <footer className="bg-green relative overflow-hidden" role="contentinfo">

      {/* ── CTA strip ── */}
      <div className="border-b border-cream/10">
        <div className={clsx(
          "max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6",
          isAr && "md:flex-row-reverse"
        )}>
          <div className={clsx(isAr && "text-right")}>
            <p className={clsx("font-display text-2xl md:text-3xl font-bold text-cream", isAr && "font-arabic")}>
              {isAr ? "هل أنت مستعد للطلب؟" : "Prêt à commander ?"}
            </p>
            <p className={clsx("font-sans text-sm text-cream/50 mt-1", isAr && "font-arabic")}>
              {isAr ? "تواصل معنا عبر واتساب للحصول على عرض" : "Contactez-nous sur WhatsApp pour un devis rapide"}
            </p>
          </div>
          <a
            href={buildWhatsAppURL(undefined, lang)}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "flex-shrink-0 inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-widest uppercase bg-gold text-white px-8 py-4 btn-slide btn-fill-gold-light",
              isAr && "flex-row-reverse"
            )}
          >
            <WhatsAppSVG className="w-4 h-4" />
            {isAr ? "واتساب" : "WhatsApp"}
          </a>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className={clsx(
          "grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8",
          isAr && "text-right"
        )}>

          {/* Brand column */}
          <div className={clsx("md:col-span-4 flex flex-col gap-6", isAr && "items-end")}>
            <Link
              href="/"
              className={clsx("flex items-center gap-3", isAr && "flex-row-reverse")}
              aria-label="Argan Tassila"
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Argan Tassila"
                  fill
                  className="object-contain brightness-0 invert"
                  sizes="48px"
                />
              </div>
              <div className={clsx(isAr && "text-right")}>
                <span className={clsx(
                  "block font-display text-base font-bold tracking-[0.15em] uppercase text-cream",
                  isAr && "font-arabic tracking-normal"
                )}>
                  {isAr ? "أرغان تاسيلا" : "Argan Tassila"}
                </span>
                <span className="block font-sans text-[10px] tracking-widest uppercase text-gold/70 mt-0.5">
                  {isAr ? "تعاونية · سوس-ماسة" : "Coopérative · Souss-Massa"}
                </span>
              </div>
            </Link>

            <p className={clsx("font-sans text-sm leading-relaxed text-cream/80 max-w-sm", isAr && "font-arabic")}>
              {t.footer.description}
            </p>

            {/* Divider */}
            <div className="w-12 h-px bg-gold/40" />

            {/* Social icons */}
            <div className={clsx("flex items-center gap-3", isAr && "flex-row-reverse")}>
              <a
                href="https://instagram.com/argan_tassila"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-cream/20 flex items-center justify-center text-cream/50 hover:border-gold hover:text-gold transition-all duration-200"
              >
                <InstagramSVG />
              </a>
              <a
                href={buildWhatsAppURL(undefined, lang)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 border border-cream/20 flex items-center justify-center text-cream/50 hover:border-gold hover:text-gold transition-all duration-200"
              >
                <WhatsAppSVG className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div className={clsx("md:col-span-2 flex flex-col gap-1", isAr && "items-end md:col-start-6")}>
            <p className={clsx(
              "font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-4",
              isAr && "font-arabic text-sm tracking-normal"
            )}>
              {t.footer.pagesTitle}
            </p>
            {t.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "group font-sans text-sm text-cream/75 hover:text-cream transition-colors duration-200 py-1 w-fit flex items-center gap-2",
                  isAr && "font-arabic flex-row-reverse"
                )}
              >
                <span className="w-0 h-px bg-gold group-hover:w-3 transition-all duration-300" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Products */}
          <div className={clsx("md:col-span-3 flex flex-col gap-1", isAr && "items-end")}>
            <p className={clsx(
              "font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-4",
              isAr && "font-arabic text-sm tracking-normal"
            )}>
              {t.footer.productsTitle}
            </p>
            {t.footer.productLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={clsx(
                  "group font-sans text-sm text-cream/75 hover:text-cream transition-colors duration-200 py-1 w-fit flex items-center gap-2",
                  isAr && "font-arabic flex-row-reverse"
                )}
              >
                <span className="w-0 h-px bg-gold group-hover:w-3 transition-all duration-300" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className={clsx("md:col-span-3 flex flex-col gap-4", isAr && "items-end")}>
            <p className={clsx(
              "font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-0",
              isAr && "font-arabic text-sm tracking-normal"
            )}>
              {t.footer.contactTitle}
            </p>

            <div className={clsx("flex items-start gap-3", isAr && "flex-row-reverse")}>
              <MapPinIcon />
              <p className={clsx("font-sans text-sm text-cream/80 leading-relaxed", isAr && "font-arabic")}>
                {t.footer.address}
              </p>
            </div>

            <a
              href={`tel:${t.footer.phone.replace(/\s/g, "")}`}
              className={clsx("flex items-center gap-3 group", isAr && "flex-row-reverse")}
            >
              <PhoneIcon />
              <span className={clsx("font-sans text-sm text-cream/50 group-hover:text-cream transition-colors duration-200 text-cream/80", isAr && "font-arabic")}>
                {t.footer.phone}
              </span>
            </a>

            <a
              href={`mailto:${t.footer.email}`}
              className={clsx("flex items-center gap-3 group", isAr && "flex-row-reverse")}
            >
              <MailIcon />
              <span className="font-sans text-sm text-cream/80 group-hover:text-cream transition-colors duration-200">
                {t.footer.email}
              </span>
            </a>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-cream/10">
        <div className={clsx(
          "max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3",
          isAr && "md:flex-row-reverse"
        )}>
          <p className={clsx("font-sans text-xs text-cream/50", isAr && "font-arabic")}>
            &copy; {t.footer.copyright}
          </p>
          <p className={clsx("font-sans text-xs text-cream/50 flex items-center gap-1.5", isAr && "flex-row-reverse font-arabic")}>
            <span className="w-3 h-px bg-gold/30" />
            {t.footer.madeWith}
          </p>
        </div>
      </div>

    </footer>
  );
}

function InstagramSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppSVG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.564 4.14 1.544 5.875L.057 23.272a.75.75 0 00.92.92l5.397-1.487A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.95-1.356l-.355-.211-3.685 1.015 1.015-3.686-.211-.355A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 text-gold/50 mt-0.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 text-gold/50" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 text-gold/50" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}
