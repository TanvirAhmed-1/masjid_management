"use client";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { Button } from "../ui/button";

export const LanguageToggle = () => {
  const { language, setLanguage } = useTranslationContext();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en");
  };

  return (
    <Button
      onClick={toggleLanguage}
      className="px-4 py-2 font-semibold text-base text-teal-700 bg-white hover:bg-white  rounded border border-teal-600 transition"
    >
       {language === "en" ? "🇧🇩" : "🇬🇧"}
       <span className="text-base font-semibold">{language === "en" ? "BN" : "EN"}</span>
    </Button>
  );
};
