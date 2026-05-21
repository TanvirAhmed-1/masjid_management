"use client";

import { useTranslationContext } from "@/src/contexts/TranslationContext";

export const LanguageToggle = () => {
  const { language, setLanguage } = useTranslationContext();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3.5 py-1.5 font-bold text-xs sm:text-sm text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-zinc-800 dark:text-emerald-400 dark:hover:bg-zinc-700 rounded-xl border border-emerald-200/50  transition-all duration-350 active:scale-95 cursor-pointer"
      title={language === "en" ? "Switch to Bangla" : "Switch to English"}
    >
      <span className="text-base leading-none">{language === "en" ? "🇧🇩" : "🇬🇧"}</span>
      <span className="tracking-wide">{language === "en" ? "বাংলা" : "English"}</span>
    </button>
  );
};
