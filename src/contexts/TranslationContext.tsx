"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "bn";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
});

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  // on mount, read language from localStorage
  useEffect(() => {
    const storedLang = localStorage.getItem("language") as Language;
    if (storedLang) {
      setLanguageState(storedLang);
    }
  }, []);

  // wrapper to set both state and localStorage
  const setLanguage = (lang: Language) => {
    localStorage.setItem("language", lang);
    setLanguageState(lang);
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => useContext(TranslationContext);
