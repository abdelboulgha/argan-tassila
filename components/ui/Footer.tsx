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
      {/* Gold top border */}
      <div className="w-full h-0.5 bg-gold/60" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div
          className={clsx(
            "grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8",
            isAr && "text-right"
          )}
        >
          {/* Logo + tagline */}
          <div className={clsx("md:col-span-1 flex flex-col gap-5", isAr && "items-end")}>
            <Link
              href="/"
              className={clsx("flex items-center gap-3", isAr && "flex-row-reverse")}
              aria-label="Argan Tassila"
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain brightness-0 invert"
                  sizes="40px"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <span
                className={clsx(
                  "font-display text-sm font-semibold tracking-[0.2em] uppercase text-cream",
                  isAr && "font-arabic"
                )}
              >
                {t.nav.logo}
              </span>
            </Link>
            <p
              className={clsx(
                "font-sans text-sm leading-relaxed text-cream/60 max-w-xs",
                isAr && "font-arabic"
              )}
            >
              {t.footer.tagline}
            </p>
            {/* Socials */}
            <div className={clsx("flex items-center gap-4 mt-2", isAr && "flex-row-reverse")}>
              <a
                href="https://instagram.com/argan_tassila"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-cream/50 hover:text-gold transition-colors duration-200"
              >
                <InstagramSVG />
              </a>
              <a
                href={buildWhatsAppURL(undefined, lang)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-cream/50 hover:text-gold transition-colors duration-200"
              >
                <WhatsAppSVG />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div className={clsx("flex flex-col gap-3", isAr && "items-end")}>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-2", isAr && "font-arabic text-sm tracking-normal")}>
              {t.footer.pagesTitle}
            </p>
            {t.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "font-sans text-sm text-cream/60 hover:text-cream transition-colors duration-200 w-fit",
                  isAr && "font-arabic"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Products */}
          <div className={clsx("flex flex-col gap-3", isAr && "items-end")}>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-2", isAr && "font-arabic text-sm tracking-normal")}>
              {t.footer.productsTitle}
            </p>
            {t.footer.productLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={clsx(
                  "font-sans text-sm text-cream/60 hover:text-cream transition-colors duration-200 w-fit",
                  isAr && "font-arabic"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className={clsx("flex flex-col gap-3", isAr && "items-end")}>
            <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold mb-2", isAr && "font-arabic text-sm tracking-normal")}>
              {t.footer.contactTitle}
            </p>
            <p className={clsx("font-sans text-sm text-cream/60", isAr && "font-arabic")}>
              {t.footer.address}
            </p>
            <p className={clsx("font-sans text-sm text-cream/60", isAr && "font-arabic")}>
              {t.footer.phone}
            </p>
            <p className={clsx("font-sans text-sm text-cream/60", isAr && "font-arabic")}>
              {t.footer.email}
            </p>
            <a
              href={buildWhatsAppURL(undefined, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "mt-3 inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase bg-gold/20 border border-gold/40 text-gold hover:bg-gold hover:text-white px-4 py-2.5 transition-all duration-300",
                isAr && "flex-row-reverse"
              )}
            >
              <WhatsAppSVG className="w-3.5 h-3.5" />
              {t.nav.whatsapp}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10 px-6 py-5">
        <p
          className={clsx(
            "font-sans text-xs text-cream/30 text-center",
            isAr && "font-arabic"
          )}
        >
          &copy; {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}

function InstagramSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
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
