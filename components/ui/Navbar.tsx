"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import { buildWhatsAppURL } from "@/lib/whatsapp";

export default function Navbar() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current || !mobileOpen) return;
    gsap.fromTo(
      mobileMenuRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
    const links = mobileMenuRef.current.querySelectorAll(".mobile-link");
    gsap.fromTo(
      links,
      { opacity: 0, x: isAr ? 30 : -30 },
      { opacity: 1, x: 0, stagger: 0.08, duration: 0.4, ease: "power2.out", delay: 0.1 }
    );
  }, [mobileOpen, isAr]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHomePage = pathname === "/";

  return (
    <>
      <nav
        ref={navRef}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled || !isHomePage
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-cream-dark"
            : "bg-transparent"
        )}
        aria-label="Navigation principale"
      >
        <div
          className={clsx(
            "max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20",
            isAr && "flex-row-reverse"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className={clsx(
              "flex items-center gap-3 flex-shrink-0",
              isAr && "flex-row-reverse"
            )}
            aria-label="Argan Tassila — Accueil"
          >
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Logo Argan Tassila"
                fill
                className="object-contain"
                priority
                sizes="40px"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <span
              className={clsx(
                "font-display text-sm font-semibold tracking-[0.2em] uppercase leading-tight hidden sm:block",
                isScrolled || !isHomePage ? "text-green" : "text-cream"
              )}
            >
              {t.nav.logo}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div
            className={clsx(
              "hidden lg:flex items-center gap-8",
              isAr && "flex-row-reverse"
            )}
          >
            {t.nav.links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "font-sans text-xs tracking-widest uppercase transition-colors duration-200 relative pb-1",
                    isScrolled || !isHomePage
                      ? isActive
                        ? "text-gold border-b-2 border-gold"
                        : "text-green hover:text-gold"
                      : isActive
                      ? "text-gold border-b-2 border-gold"
                      : "text-cream/90 hover:text-gold"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side: Lang + WhatsApp */}
          <div
            className={clsx(
              "hidden lg:flex items-center gap-4",
              isAr && "flex-row-reverse"
            )}
          >
            <LanguageSwitcher light={!isScrolled && isHomePage} />
            <a
              href={buildWhatsAppURL(undefined, lang)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Commander via WhatsApp"
              className={clsx(
                "flex items-center gap-2 font-sans text-xs font-medium tracking-widest uppercase px-4 py-2.5 transition-all duration-300",
                isScrolled || !isHomePage
                  ? "bg-green text-white hover:bg-green-dark"
                  : "bg-white/20 text-white border border-white/40 hover:bg-white/30 backdrop-blur-sm"
              )}
            >
              <WhatsAppSVG />
              {t.nav.whatsapp}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span
              className={clsx(
                "block w-6 h-px transition-all duration-300 origin-center",
                isScrolled || !isHomePage ? "bg-green" : "bg-cream",
                mobileOpen && "rotate-45 translate-y-[7px]"
              )}
            />
            <span
              className={clsx(
                "block w-4 h-px transition-all duration-300",
                isScrolled || !isHomePage ? "bg-green" : "bg-cream",
                mobileOpen && "opacity-0 w-0"
              )}
            />
            <span
              className={clsx(
                "block w-6 h-px transition-all duration-300 origin-center",
                isScrolled || !isHomePage ? "bg-green" : "bg-cream",
                mobileOpen && "-rotate-45 -translate-y-[7px]"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-green flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <div className="h-20" />
          <div className="flex flex-col items-center justify-center flex-1 gap-8 px-8">
            <div className="mb-4">
              <LanguageSwitcher light />
            </div>
            {t.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "mobile-link font-display text-3xl text-cream/90 hover:text-gold transition-colors duration-200",
                  isAr && "font-arabic text-right",
                  pathname === link.href && "text-gold"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={buildWhatsAppURL(undefined, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-link mt-6 flex items-center gap-2 font-sans text-sm tracking-widest uppercase bg-gold text-white px-8 py-4"
            >
              <WhatsAppSVG />
              {t.nav.whatsapp}
            </a>
          </div>
          <div className="px-8 pb-12 text-center">
            <p className="font-display italic text-cream/30 text-lg">
              L&apos;or liquide du Maroc
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function WhatsAppSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.564 4.14 1.544 5.875L.057 23.272a.75.75 0 00.92.92l5.397-1.487A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.95-1.356l-.355-.211-3.685 1.015 1.015-3.686-.211-.355A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}
