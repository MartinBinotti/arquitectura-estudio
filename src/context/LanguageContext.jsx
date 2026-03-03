import { createContext, useCallback, useMemo, useState } from "react";

export const LanguageContext = createContext(null);

const LANGUAGE_STORAGE_KEY = "studio_arch_language_v1";

const getInitialLanguage = () => {
  if (typeof window === "undefined") {
    return "es";
  }

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return savedLanguage === "en" ? "en" : "es";
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  const setLang = useCallback((nextLanguage) => {
    const safeLanguage = nextLanguage === "en" ? "en" : "es";
    setLanguage(safeLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, safeLanguage);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLang(language === "es" ? "en" : "es");
  }, [language, setLang]);

  const t = useCallback(
    (esText, enText) => (language === "en" ? enText : esText),
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      isEnglish: language === "en",
      setLanguage: setLang,
      toggleLanguage,
      t
    }),
    [language, setLang, t, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

