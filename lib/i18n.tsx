"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import type { Translations } from "@/locales/fr";

type Lang = "fr" | "ar";

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggleLanguage: () => void;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  const [t, setT] = useState<Translations | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("at-lang") as Lang | null;
    const initial: Lang = (saved === "fr" || saved === "ar") ? saved : "fr";
    setLangState(initial);
    applyDir(initial);
    loadTranslations(initial).then(setT);
  }, []);

  const applyDir = (l: Lang) => {
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l;
  };

  const loadTranslations = async (l: Lang): Promise<Translations> => {
    if (l === "ar") {
      const mod = await import("@/locales/ar");
      return mod.default;
    }
    const mod = await import("@/locales/fr");
    return mod.default;
  };

  const setLang = useCallback(async (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("at-lang", newLang);
    applyDir(newLang);
    const translations = await loadTranslations(newLang);
    setT(translations);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLang(lang === "fr" ? "ar" : "fr");
  }, [lang, setLang]);

  if (!t) return null;

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
  return ctx;
}
