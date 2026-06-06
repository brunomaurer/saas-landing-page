import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { translations, type Lang, type Translations } from './translations';

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('de');

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
    const title = newLang === 'de'
      ? 'SaaS Plattform – Unternehmensleistung messbar verbessern'
      : 'SaaS Platform – Make Business Performance Measurable';
    document.title = title;
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}