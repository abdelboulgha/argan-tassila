import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#005F41",
          dark: "#003d29",
          mid: "#095d40",
        },
        gold: {
          DEFAULT: "#e18b22",
          light: "#f0a84c",
        },
        cream: {
          DEFAULT: "#F5F0E8",
          dark: "#E8E0D0",
        },
        dark: {
          DEFAULT: "#111111",
        },
        muted: "#6b6b5f",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        arabic: ["Amiri", "serif"],
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
      },
      transitionDuration: {
        "250": "250ms",
        "400": "400ms",
      },
    },
  },
  plugins: [],
};

export default config;
