"use client";

import { useId } from "react";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "w-10 h-10" }: LogoProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const topId = `logo-top-${uid}`;
  const botId = `logo-bot-${uid}`;

  const ring = variant === "dark" ? "#005F41" : "#ffffff";
  const leaf = variant === "dark" ? "#005F41" : "#ffffff";
  const fruit = "#e18b22";
  const label = "#e18b22";
  const bg = variant === "dark" ? "#ffffff" : "transparent";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Top arc — counterclockwise through top (sweep=0) */}
        <path id={topId} d="M 42,250 A 208,208 0 0,0 458,250" fill="none" />
        {/* Bottom arc — clockwise through bottom (sweep=1) */}
        <path id={botId} d="M 42,250 A 208,208 0 0,1 458,250" fill="none" />
      </defs>

      {/* Background fill */}
      <circle cx="250" cy="250" r="230" fill={bg} />

      {/* Outer ring */}
      <circle cx="250" cy="250" r="230" fill="none" stroke={ring} strokeWidth="9" />

      {/* Inner ring */}
      <circle cx="250" cy="250" r="188" fill="none" stroke={ring} strokeWidth="2.5" />

      {/* ARGAN TASSILA — top curved text */}
      <text
        fontFamily="Montserrat, sans-serif"
        fontWeight="800"
        fontSize="28"
        fill={label}
        letterSpacing="2"
      >
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          ARGAN TASSILA
        </textPath>
      </text>

      {/* COOPERATIVE — bottom curved text */}
      <text
        fontFamily="Montserrat, sans-serif"
        fontWeight="400"
        fontSize="18"
        fill={label}
        letterSpacing="5"
      >
        <textPath href={`#${botId}`} startOffset="50%" textAnchor="middle">
          COOPERATIVE
        </textPath>
      </text>

      {/* ── ARGAN BRANCH ── */}

      {/* Main stem */}
      <path
        d="M 128,296 C 158,276 188,265 220,258 C 255,250 285,248 315,238 C 330,232 342,223 352,215"
        stroke={leaf}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Curling tendril */}
      <path
        d="M 348,218 C 362,207 366,192 358,181 C 351,171 341,170 337,172"
        stroke={leaf}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Leaves — lower-left cluster */}
      <ellipse cx="148" cy="278" rx="32" ry="9" fill={leaf} transform="rotate(-50 148 278)" />
      <ellipse cx="163" cy="308" rx="30" ry="9" fill={leaf} transform="rotate(22 163 308)" />
      <ellipse cx="172" cy="265" rx="28" ry="8" fill={leaf} transform="rotate(-36 172 265)" />
      <ellipse cx="183" cy="296" rx="22" ry="7" fill={leaf} transform="rotate(40 183 296)" />

      {/* Leaves — middle */}
      <ellipse cx="212" cy="242" rx="28" ry="8" fill={leaf} transform="rotate(-28 212 242)" />
      <ellipse cx="233" cy="268" rx="24" ry="7" fill={leaf} transform="rotate(32 233 268)" />

      {/* Leaves — right cluster */}
      <ellipse cx="296" cy="232" rx="26" ry="8" fill={leaf} transform="rotate(-22 296 232)" />
      <ellipse cx="316" cy="255" rx="22" ry="7" fill={leaf} transform="rotate(28 316 255)" />
      <ellipse cx="336" cy="220" rx="22" ry="7" fill={leaf} transform="rotate(-46 336 220)" />

      {/* Argan fruits */}
      <ellipse cx="200" cy="262" rx="22" ry="16" fill={fruit} />
      <ellipse cx="228" cy="255" rx="24" ry="17" fill={fruit} />
      <ellipse cx="257" cy="257" rx="23" ry="16" fill={fruit} />
      <ellipse cx="282" cy="265" rx="20" ry="15" fill={fruit} />

      {/* Fruit highlights */}
      <ellipse cx="196" cy="256" rx="9" ry="5" fill="#c07015" opacity="0.4" transform="rotate(-20 196 256)" />
      <ellipse cx="224" cy="248" rx="10" ry="5" fill="#c07015" opacity="0.4" transform="rotate(-15 224 248)" />
      <ellipse cx="253" cy="250" rx="9" ry="5" fill="#c07015" opacity="0.4" transform="rotate(-10 253 250)" />
      <ellipse cx="278" cy="258" rx="8" ry="4" fill="#c07015" opacity="0.4" transform="rotate(-5 278 258)" />
    </svg>
  );
}
