"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import PageHero from "@/components/ui/PageHero";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ContactContent() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const c = t.contact;
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "", newsletter: false,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-info > *",
        { opacity: 0, x: isAr ? 30 : -30 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-info", start: "top 80%" } }
      );
      gsap.fromTo(".contact-form-wrap",
        { opacity: 0, x: isAr ? -30 : 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-form-wrap", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [isAr]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to API. For now, redirect to WhatsApp with message
    const msg = `Nom: ${formData.name}\nEmail: ${formData.email}\nSujet: ${formData.subject}\nMessage: ${formData.message}`;
    window.open(buildWhatsAppURL(msg, lang), "_blank");
    setSubmitted(true);
  };

  return (
    <div ref={ref}>
      <PageHero
        label={c.hero.label}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        breadcrumbs={[
          { label: lang === "fr" ? "Accueil" : "الرئيسية", href: "/" },
          { label: c.hero.label },
        ]}
        dark
      />

      {/* Main contact grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className={clsx("grid grid-cols-1 lg:grid-cols-2 gap-16", isAr && "lg:flex lg:flex-row-reverse")}>
            {/* Contact info */}
            <div className={clsx("contact-info flex flex-col gap-6", isAr && "text-right items-end")}>
              <div>
                <h2 className={clsx("font-display text-3xl font-bold text-green mb-2", isAr && "font-arabic")}>
                  {c.info.title}
                </h2>
                <p className={clsx("font-sans text-sm text-muted", isAr && "font-arabic")}>
                  {c.info.subtitle}
                </p>
              </div>

              {/* Info items */}
              <div className="flex flex-col gap-4 mt-4">
                {c.info.items.map((item, i) => (
                  <div key={i} className={clsx("flex items-start gap-4", isAr && "flex-row-reverse")}>
                    <div className="w-8 h-8 bg-cream border border-cream-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-gold rotate-45" />
                    </div>
                    <div className={isAr ? "text-right" : ""}>
                      <p className={clsx("font-sans text-xs tracking-widest uppercase text-gold", isAr && "font-arabic text-sm tracking-normal")}>
                        {item.label}
                      </p>
                      <p className={clsx("font-sans text-sm text-dark mt-0.5", isAr && "font-arabic")}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <p className={clsx("font-sans text-sm text-muted border-l-2 border-gold/30 pl-4 mt-2", isAr && "border-l-0 border-r-2 pl-0 pr-4 font-arabic")}>
                {c.info.hours}
              </p>

              {/* WhatsApp CTA */}
              <a
                href={buildWhatsAppURL(undefined, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "mt-4 inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-widest uppercase bg-green text-cream px-8 py-4 hover:bg-green-dark transition-colors duration-300 w-fit",
                  isAr && "flex-row-reverse"
                )}
              >
                <WhatsAppIcon />
                {c.info.whatsappBtn}
              </a>

              {/* Location */}
              <div className={clsx("mt-8 border border-cream-dark p-6", isAr && "text-right")}>
                <h3 className={clsx("font-display text-lg font-semibold text-green mb-3", isAr && "font-arabic")}>
                  {c.location.title}
                </h3>
                <p className={clsx("font-sans text-sm text-muted mb-1", isAr && "font-arabic")}>{c.location.name}</p>
                <p className={clsx("font-sans text-sm text-muted mb-1", isAr && "font-arabic")}>{c.location.region}</p>
                <p className={clsx("font-sans text-sm text-muted mb-1", isAr && "font-arabic")}>{c.location.city}</p>
                <p className={clsx("font-sans text-xs text-gold mt-3", isAr && "font-arabic")}>{c.location.note}</p>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-wrap">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-20">
                  <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mb-6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-gold">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className={clsx("font-display text-2xl font-bold text-green mb-3", isAr && "font-arabic")}>
                    {c.form.successTitle}
                  </h3>
                  <p className={clsx("font-sans text-sm text-muted", isAr && "font-arabic")}>
                    {c.form.successText}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={clsx("flex flex-col gap-6", isAr && "text-right")}>
                  <h2 className={clsx("font-display text-3xl font-bold text-green mb-2", isAr && "font-arabic")}>
                    {c.form.title}
                  </h2>

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className={clsx("font-sans text-xs tracking-widest uppercase text-muted", isAr && "font-arabic text-sm tracking-normal")}>
                      {c.form.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={clsx("border border-cream-dark px-4 py-3 font-sans text-sm text-dark bg-cream/30 focus:outline-none focus:border-gold transition-colors duration-200", isAr && "text-right")}
                      dir={isAr ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className={clsx("font-sans text-xs tracking-widest uppercase text-muted", isAr && "font-arabic text-sm tracking-normal")}>
                        {c.form.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={clsx("border border-cream-dark px-4 py-3 font-sans text-sm text-dark bg-cream/30 focus:outline-none focus:border-gold transition-colors duration-200", isAr && "text-right")}
                        dir="ltr"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className={clsx("font-sans text-xs tracking-widest uppercase text-muted", isAr && "font-arabic text-sm tracking-normal")}>
                        {c.form.phone}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={clsx("border border-cream-dark px-4 py-3 font-sans text-sm text-dark bg-cream/30 focus:outline-none focus:border-gold transition-colors duration-200", isAr && "text-right")}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label className={clsx("font-sans text-xs tracking-widest uppercase text-muted", isAr && "font-arabic text-sm tracking-normal")}>
                      {c.form.subject}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={clsx("border border-cream-dark px-4 py-3 font-sans text-sm text-dark bg-cream/30 focus:outline-none focus:border-gold transition-colors duration-200 appearance-none", isAr && "text-right")}
                      dir={isAr ? "rtl" : "ltr"}
                    >
                      <option value="">—</option>
                      {c.form.subjectOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className={clsx("font-sans text-xs tracking-widest uppercase text-muted", isAr && "font-arabic text-sm tracking-normal")}>
                      {c.form.message} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={clsx("border border-cream-dark px-4 py-3 font-sans text-sm text-dark bg-cream/30 focus:outline-none focus:border-gold transition-colors duration-200 resize-none", isAr && "text-right")}
                      dir={isAr ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Newsletter */}
                  <label className={clsx("flex items-start gap-3 cursor-pointer", isAr && "flex-row-reverse")}>
                    <input
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                      className="mt-1 w-4 h-4 accent-gold"
                    />
                    <span className={clsx("font-sans text-sm text-muted", isAr && "font-arabic")}>
                      {c.form.newsletter}
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    className={clsx(
                      "inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-widest uppercase bg-gold text-white px-8 py-4 hover:bg-gold-light transition-colors duration-300 self-start",
                      isAr && "flex-row-reverse self-end"
                    )}
                  >
                    {c.form.submit}
                    <span className="w-6 h-px bg-current" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.564 4.14 1.544 5.875L.057 23.272a.75.75 0 00.92.92l5.397-1.487A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.95-1.356l-.355-.211-3.685 1.015 1.015-3.686-.211-.355A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}
