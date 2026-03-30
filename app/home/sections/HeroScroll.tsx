"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppURL } from "@/lib/whatsapp";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ───────────────────────────────────────────────────────────────

const TOTAL_FRAMES = 192;

function getFrameSrc(index: number): string {
  // index is 0-based → file is 1-based, zero-padded to 3 digits
  return `/frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroScroll() {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
  const h = t.home.heroScroll;

  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Mutable state shared with GSAP (no re-renders)
  const frameObj = useRef({ current: 0 });
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Loading progress for the bottom progress bar
  const [loadPct, setLoadPct] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasWrap = canvasWrapRef.current;
    const section = sectionRef.current;
    if (!canvas || !canvasWrap || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize ──────────────────────────────────────────────────────────────
    // Use devicePixelRatio so the canvas is sharp on retina / HiDPI screens.
    // The CSS size stays 100% of the viewport; only the internal buffer grows.
    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;

      // Internal buffer = CSS size × DPR (full sharpness)
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;

      // Keep the canvas visually the same size
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;

      // Scale the 2D context so every draw call is in CSS-pixel units
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      renderFrame(Math.round(frameObj.current.current));
    }

    resize();
    window.addEventListener("resize", resize);

    // ── Frame renderer ───────────────────────────────────────────────────────
    function renderFrame(index: number) {
      if (!canvas || !ctx) return;
      const img = imagesRef.current[index];
      if (!img?.complete || !img.naturalWidth) return;

      // Work in CSS-pixel space (context already scaled by DPR in resize())
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      
      const isPortrait = ch > cw;
      ctx.clearRect(0, 0, cw, ch);

      if (isPortrait) {
        // 1. Draw blurred cover background for mobile
        const coverScale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const coverW = img.naturalWidth * coverScale;
        const coverH = img.naturalHeight * coverScale;
        ctx.filter = "blur(30px)";
        ctx.drawImage(img, (cw - coverW) / 2, (ch - coverH) / 2, coverW, coverH);
        
        // Darken the blurred background to make the main video pop and text readable
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(0, 0, cw, ch);
        
        // 2. Draw strict contain foreground
        ctx.filter = "none";
        const containScale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
        const containW = img.naturalWidth * containScale;
        const containH = img.naturalHeight * containScale;
        ctx.drawImage(img, (cw - containW) / 2, (ch - containH) / 2, containW, containH);
      } else {
        // Desktop: Strict cover-fit
        ctx.filter = "none";
        const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
      }
    }

    // ── Preload all frames ───────────────────────────────────────────────────
    let loaded = 0;
    const imgs: HTMLImageElement[] = Array.from(
      { length: TOTAL_FRAMES },
      (_, i) => {
        const img = new window.Image();
        img.src = getFrameSrc(i);
        img.onload = () => {
          loaded++;
          setLoadPct(Math.round((loaded / TOTAL_FRAMES) * 100));
          // Show first frame as soon as frame 0 specifically is ready
          if (i === 0) renderFrame(0);
          // Build GSAP animation only after all frames are loaded
          if (loaded === TOTAL_FRAMES) buildAnimation();
        };
        return img;
      }
    );
    imagesRef.current = imgs;

    // ── GSAP scroll animation ────────────────────────────────────────────────
    function buildAnimation() {
      const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];
      const DURATION = 10; // normalized timeline duration
      const segLen = DURATION / texts.length; // each text owns this slice

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section!,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // 1.5 s lag for smooth feel
        },
      });

      // ── Frame sequence driven by scroll ──
      tl.to(
        frameObj.current,
        {
          current: TOTAL_FRAMES - 1,
          ease: "none",
          duration: DURATION,
          onUpdate() {
            renderFrame(Math.round(frameObj.current.current));
          },
        },
        0
      );

      // ── Subtle zoom on the canvas wrapper ──
      tl.fromTo(
        canvasWrap!,
        { scale: 1 },
        { scale: 1.07, ease: "none", duration: DURATION },
        0
      );

      // ── Text fade-in → hold → fade-out ──
      // Each text occupies [i * segLen, (i+1) * segLen] on the timeline.
      // We split that slice: 20% fade-in | 55% hold | 20% fade-out | 5% gap
      texts.forEach((el, i) => {
        const start = i * segLen;
        const fadeIn = segLen * 0.2;
        const hold = segLen * 0.55;
        const fadeOut = segLen * 0.2;

        tl.fromTo(
          el,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, ease: "power2.out", duration: fadeIn },
          start
        ).to(
          el,
          { opacity: 0, y: -28, ease: "power2.in", duration: fadeOut },
          start + fadeIn + hold
        );
      });

      // ── CTA block fades in during the last 15% of the scroll ──
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: "power2.out", duration: DURATION * 0.1 },
          DURATION * 0.85
        );
      }

      // ── Scroll hint fades out after first 5% of scroll ──
      if (scrollHintRef.current) {
        tl.to(
          scrollHintRef.current,
          { opacity: 0, duration: DURATION * 0.05, ease: "power1.in" },
          DURATION * 0.05
        );
      }
    }

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    // 600vh section — more scroll distance = slower, more cinematic animation
    <section ref={sectionRef} style={{ height: "600vh" }}>
      {/* Sticky viewport: follows scroll but stays on-screen */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden bg-black"
      >
        {/* Canvas wrapper — scaled by GSAP for zoom effect */}
        <div
          ref={canvasWrapRef}
          className="absolute inset-0"
          style={{ transformOrigin: "center center" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
        </div>

        {/* Cinematic gradient overlay — improves text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* ── Text overlays ─────────────────────────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          {h.texts.map((text, i) => {
            const isLast = i === h.texts.length - 1;
            return (
              <div
                key={i}
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                className={clsx(
                  "absolute opacity-0 text-center px-8 max-w-4xl w-full",
                  isAr && "font-arabic"
                )}
                style={{ willChange: "opacity, transform" }}
              >
                {isLast ? (
                  // Last slide — brand sign-off with decorative line
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-px bg-gold/80" />
                    <p
                      className={clsx(
                        "text-white font-display leading-none drop-shadow-2xl",
                        "text-5xl md:text-7xl lg:text-8xl font-bold"
                      )}
                    >
                      {text}
                    </p>
                    <p
                      className={clsx(
                        "text-gold font-sans tracking-[0.25em] uppercase text-sm md:text-base",
                        isAr && "tracking-normal"
                      )}
                    >
                      {h.tagline}
                    </p>
                    <div className="w-12 h-px bg-gold/80" />
                  </div>
                ) : (
                  // Regular slide
                  <p
                    className={clsx(
                      "text-white font-display font-bold leading-tight drop-shadow-2xl",
                      "text-4xl md:text-5xl lg:text-6xl"
                    )}
                  >
                    {text}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* ── CTA buttons (appear at end of sequence) ───────────────────── */}
        <div
          ref={ctaRef}
          className={clsx(
            "absolute bottom-16 md:bottom-20 px-6 w-full z-10 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 opacity-0",
            isAr && "md:flex-row-reverse"
          )}
        >
          <Link
            href="/products"
            className="w-full md:w-auto justify-center inline-flex items-center gap-2 font-sans text-[11px] md:text-xs font-bold tracking-widest uppercase bg-gold text-white px-6 md:px-7 py-4 btn-slide btn-fill-gold-light"
          >
            {h.cta1}
          </Link>
          <Link
            href="/about"
            className="w-full md:w-auto justify-center inline-flex items-center gap-2 font-sans text-[11px] md:text-xs font-bold tracking-widest uppercase border border-white/50 text-white px-6 md:px-7 py-4 btn-slide btn-fill-white-soft"
          >
            {h.cta2}
          </Link>
        </div>

        {/* ── Scroll hint ────────────────────────────────────────────────── */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span
            className={clsx(
              "font-sans text-xs tracking-[0.3em] uppercase text-white/50",
              isAr && "font-arabic tracking-normal"
            )}
          >
            {h.scroll}
          </span>
          {/* Animated chevron */}
          <svg
            viewBox="0 0 16 16"
            className="w-4 h-4 text-white/40 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* ── Loading progress bar (disappears when fully loaded) ─────────── */}
        {loadPct < 100 && (
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-gold transition-[width] duration-150"
            style={{ width: `${loadPct}%` }}
            aria-hidden="true"
          />
        )}
      </div>
    </section>
  );
}
