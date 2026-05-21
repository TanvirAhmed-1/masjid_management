"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, TranslationKeys } from "@/src/utils/translations";

type Language = "en" | "bn";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => String(key),
});

const formatKeyToEnglish = (key: string): string => {
  const specialCases: Record<string, string> = {
    sn: "SN",
    qty: "Qty",
    tarabi_fee: "Tarabi Fee (৳)",
    paid_amount_label: "Paid Amount (৳)",
    amount_label: "Amount (৳)",
    registering: "Registering...",
    search_member: "Search member...",
    search_year: "Search year...",
  };

  if (specialCases[key]) return specialCases[key];

  return key
    .split(/[_-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // on mount, read language from localStorage
  useEffect(() => {
    const storedLang = localStorage.getItem("language") as Language;
    if (storedLang) {
      setLanguageState(storedLang);
    }
    setMounted(true);
  }, []);

  // wrapper to set both state and localStorage
  const setLanguage = (lang: Language) => {
    localStorage.setItem("language", lang);
    setLanguageState(lang);
  };

  const t = (key: TranslationKeys): string => {
    const currentLang = mounted ? language : "en";
    if (currentLang === "bn") {
      return translations.bn[key] || String(key);
    }
    return formatKeyToEnglish(String(key));
  };

  // Real-time client-side DOM translation observer
  useEffect(() => {
    if (!mounted) return;

    const translateNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue?.trim();
        if (!text) return;

        // Try to translate from EN to BN
        if (language === "bn") {
          for (const [key, _] of Object.entries(translations.bn)) {
            const val = formatKeyToEnglish(key);
            if (text === val) {
              const bnVal = translations.bn[key as keyof typeof translations.bn];
              if (bnVal) {
                node.nodeValue = bnVal;
                return;
              }
            }
          }
        }
        
        // Try to translate from BN to EN
        if (language === "en") {
          for (const [key, val] of Object.entries(translations.bn)) {
            if (text === val) {
              const enVal = formatKeyToEnglish(key);
              if (enVal) {
                node.nodeValue = enVal;
                return;
              }
            }
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        // Skip script, style, input fields, textareas, and the language toggle button itself to prevent recursive loops
        if (
          el.tagName === "SCRIPT" || 
          el.tagName === "STYLE" || 
          el.tagName === "INPUT" || 
          el.tagName === "TEXTAREA" ||
          el.getAttribute("title")?.includes("Switch to")
        ) {
          return;
        }
        node.childNodes.forEach((child) => translateNode(child));
      }
    };

    const translateDOM = () => {
      translateNode(document.body);
    };

    // Run initially to translate existing elements
    translateDOM();

    // Setup mutation observer to watch for dynamic table loading and pagination changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          translateNode(node);
        });
      });
      translateDOM();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [language, mounted]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => useContext(TranslationContext);
