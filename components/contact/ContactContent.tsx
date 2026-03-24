"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppURL } from "@/lib/whatsapp";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const PHONE = "+212 637 817 229";
const EMAIL = "argantassila@gmail.com";

export default function ContactContent() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const c = t.contact;
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".info-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".cards-row", start: "top 82%" } }
      );
      gsap.fromTo(".form-col",
        { opacity: 0, x: isAr ? 50 : -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".form-col", start: "top 80%" } }
      );
      gsap.fromTo(".side-col",
        { opacity: 0, x: isAr ? -50 : 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".side-col", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = isAr
      ? `الاسم: ${formData.name}\nالبريد: ${formData.email}\nالهاتف: ${formData.phone}\nالموضوع: ${formData.subject}\nالرسالة: ${formData.message}`
      : `Nom: ${formData.name}\nEmail: ${formData.email}\nTél: ${formData.phone}\nSujet: ${formData.subject}\nMessage: ${formData.message}`;
    window.open(buildWhatsAppURL(msg, lang), "_blank");
    setSubmitted(true);
  };

  const inputCls = clsx(
    "w-full border border-cream-dark px-4 py-3.5 font-sans text-sm text-dark bg-white focus:outline-none focus:border-green transition-colors duration-200",
    isAr && "text-right font-arabic"
  );
  const labelCls = clsx(
    "block font-sans text-xs tracking-widest uppercase text-muted mb-2",
    isAr && "font-arabic text-sm tracking-normal text-right"
  );

  const orderSteps = isAr
    ? [
        { n: "01", title: "تواصل معنا", desc: "عبر واتساب أو البريد الإلكتروني" },
        { n: "02", title: "اختر منتجاتك", desc: "حدد المنتجات والكميات المطلوبة" },
        { n: "03", title: "التسليم", desc: "توصيل سريع في جميع أنحاء المغرب" },
      ]
    : [
        { n: "01", title: "Contactez-nous", desc: "Via WhatsApp ou email" },
        { n: "02", title: "Choisissez", desc: "Sélectionnez vos produits et quantités" },
        { n: "03", title: "Livraison", desc: "Expédition partout au Maroc" },
      ];

  return (
    <div ref={ref}>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="bg-green relative overflow-hidden py-28 md:py-40">
        {/* Decorative circles */}
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

      {/* ── INFO CARDS ──────────────────────────────────── */}
      <section className="bg-cream-dark/30 py-14">
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

      {/* ── FORM + SIDE ─────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className={clsx("grid grid-cols-1 lg:grid-cols-5 gap-16 items-start", isAr && "lg:[direction:rtl]")}>

            {/* ── Form — 3 cols ── */}
            <div className={clsx("form-col lg:col-span-3", isAr && "[direction:ltr] text-right")}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-24 border border-cream-dark">
                  <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mb-6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className="w-8 h-8 text-gold" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className={clsx("font-display text-2xl font-bold text-green mb-3", isAr && "font-arabic")}>
                    {c.form.successTitle}
                  </h3>
                  <p className={clsx("font-sans text-sm text-muted max-w-xs", isAr && "font-arabic")}>
                    {c.form.successText}
                  </p>
                </div>
              ) : (
                <>
                  <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold">
                    {isAr ? "راسلنا" : "FORMULAIRE DE CONTACT"}
                  </span>
                  <h2 className={clsx("font-display text-4xl md:text-5xl font-bold text-dark mt-3 mb-10", isAr && "font-arabic")}>
                    {c.form.title}
                  </h2>

                  <form onSubmit={handleSubmit} className={clsx("flex flex-col gap-5", isAr && "items-end")}>
                    <div className="w-full">
                      <label className={labelCls}>{c.form.name} *</label>
                      <input type="text" required value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputCls} dir={isAr ? "rtl" : "ltr"}
                      />
                    </div>

                    <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-5 w-full", isAr && "[direction:rtl]")}>
                      <div>
                        <label className={labelCls}>{c.form.email} *</label>
                        <input type="email" required value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputCls} dir="ltr"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>{c.form.phone}</label>
                        <input type="tel" value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={inputCls} dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className={labelCls}>{c.form.subject}</label>
                      <select value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={clsx(inputCls, "appearance-none cursor-pointer")}
                        dir={isAr ? "rtl" : "ltr"}
                      >
                        <option value="">—</option>
                        {c.form.subjectOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full">
                      <label className={labelCls}>{c.form.message} *</label>
                      <textarea required rows={5} value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={clsx(inputCls, "resize-none")} dir={isAr ? "rtl" : "ltr"}
                      />
                    </div>

                    <button type="submit"
                      className={clsx(
                        "mt-2 w-full inline-flex items-center justify-center gap-3 font-sans text-xs font-semibold tracking-widest uppercase bg-green text-cream py-4 btn-slide btn-fill-green-dark",
                        isAr && "flex-row-reverse"
                      )}
                    >
                      {c.form.submit}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className="w-4 h-4" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* ── Side — 2 cols ── */}
            <div className={clsx("side-col lg:col-span-2 flex flex-col gap-6", isAr && "items-end")}>

              {/* Comment commander */}
              <div className="bg-green w-full p-8">
                <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold">
                  {isAr ? "الطلب" : "COMMANDER"}
                </span>
                <h3 className={clsx("font-display text-2xl font-bold text-cream mt-3 mb-8", isAr && "font-arabic")}>
                  {isAr ? "كيف تطلب ؟" : "Comment commander ?"}
                </h3>
                <div className="flex flex-col gap-6">
                  {orderSteps.map((step) => (
                    <div key={step.n} className={clsx("flex items-start gap-5", isAr && "flex-row-reverse")}>
                      <span className="font-display text-3xl font-bold text-gold/30 leading-none flex-shrink-0 select-none">
                        {step.n}
                      </span>
                      <div>
                        <p className={clsx("font-sans text-sm font-semibold text-cream", isAr && "font-arabic")}>
                          {step.title}
                        </p>
                        <p className={clsx("font-sans text-xs text-cream/50 mt-1", isAr && "font-arabic")}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Horaires */}
              <div className={clsx("w-full border border-cream-dark p-6 flex items-start gap-4", isAr && "flex-row-reverse text-right")}>
                <div className="w-10 h-10 bg-gold/10 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                  <ClockIcon />
                </div>
                <div>
                  <p className={clsx("font-sans text-xs tracking-widest uppercase text-muted mb-1.5", isAr && "font-arabic text-sm tracking-normal")}>
                    {isAr ? "ساعات العمل" : "Horaires"}
                  </p>
                  <p className={clsx("font-sans text-sm text-dark font-medium", isAr && "font-arabic")}>
                    {c.info.hours}
                  </p>
                </div>
              </div>

              {/* Instagram */}
              <div className={clsx("w-full border border-cream-dark p-6 flex items-start gap-4", isAr && "flex-row-reverse text-right")}>
                <div className="w-10 h-10 bg-gold/10 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                  <InstagramIcon />
                </div>
                <div>
                  <p className={clsx("font-sans text-xs tracking-widest uppercase text-muted mb-1.5", isAr && "font-arabic text-sm tracking-normal")}>
                    Instagram
                  </p>
                  <p className="font-sans text-sm text-dark font-medium">@argan_tassila</p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={buildWhatsAppURL(undefined, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "w-full inline-flex items-center justify-center gap-3 font-sans text-xs font-semibold tracking-widest uppercase bg-gold text-white py-4 btn-slide btn-fill-gold-light",
                  isAr && "flex-row-reverse"
                )}
              >
                <WhatsAppIcon />
                {c.info.whatsappBtn}
              </a>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── Icons ──────────────────────────────────────────────── */
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

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
