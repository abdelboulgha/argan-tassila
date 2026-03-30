"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppURL } from "@/lib/whatsapp";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.564 4.14 1.544 5.875L.057 23.272a.75.75 0 00.92.92l5.397-1.487A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.95-1.356l-.355-.211-3.685 1.015 1.015-3.686-.211-.355A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}

export default function Catalog() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const p = t.products;
  const [activeFilter, setActiveFilter] = useState("all");
  const ref = useRef<HTMLDivElement>(null);

  const filteredProducts = activeFilter === "all"
    ? p.items
    : p.items.filter(item => item.tags.includes(activeFilter));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".product-item",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".products-container", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(".product-item",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" }
    );
  }, [activeFilter]);

  return (
    <div ref={ref}>
      <div className="sticky top-20 z-30 bg-white border-b border-cream-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className={clsx("flex items-center gap-1 overflow-x-auto py-3", isAr && "flex-row-reverse")}>
            {p.filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={clsx(
                  "flex-shrink-0 font-sans text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-200",
                  activeFilter === filter.id
                    ? "bg-green text-cream"
                    : "text-muted hover:text-green btn-slide btn-fill-cream",
                  isAr && "font-arabic text-sm tracking-normal"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <section className="py-16 md:py-24 bg-white">
        <div className="products-container max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className={clsx("product-item group border border-cream-dark hover:border-gold/40 transition-colors duration-300 overflow-hidden", isAr && "text-right")}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className={clsx("absolute top-4 z-10", isAr ? "right-4" : "left-4")}>
                    <span className="font-sans text-xs tracking-widest uppercase bg-green/90 text-cream px-3 py-1.5 backdrop-blur-sm">
                      {product.collection}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={clsx("font-display text-xl font-semibold text-green mb-3", isAr && "font-arabic")}>
                    {product.name}
                  </h3>
                  <p className={clsx("font-sans text-sm leading-relaxed text-muted mb-4", isAr && "font-arabic")}>
                    {product.description}
                  </p>
                  <div className={clsx("flex flex-col gap-3", isAr && "items-end")}>
                    <span className="font-display text-base font-semibold text-gold">
                      {product.price}
                    </span>
                    <a
                      href={buildWhatsAppURL(product.name, lang)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(
                        "inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase bg-green text-cream px-4 py-2.5 btn-slide btn-fill-green-dark whitespace-nowrap w-full justify-center",
                        isAr && "flex-row-reverse"
                      )}
                    >
                      <WhatsAppIcon />
                      {p.orderBtn}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
