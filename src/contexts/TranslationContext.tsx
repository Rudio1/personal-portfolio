'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ptJson from '../../messages/pt.json';
import enJson from '../../messages/en.json';

type Locale = 'pt' | 'en';

type Catalog = Record<string, unknown>;

const catalogs: Record<Locale, Catalog> = {
  pt: ptJson as Catalog,
  en: enJson as Catalog,
};

type TranslationContextType = {
  locale: string;
  changeLocale: (newLocale: string) => void;
  t: (key: string) => string;
  isLoading: boolean;
};

const TranslationContext = createContext<TranslationContextType>({
  locale: 'pt',
  changeLocale: () => {},
  t: (key: string) => key,
  isLoading: false,
});

function isLocale(value: string | null): value is Locale {
  return value === 'pt' || value === 'en';
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('pt');

  useEffect(() => {
    const saved = localStorage.getItem('locale');
    if (isLocale(saved)) {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const changeLocale = (newLocale: string) => {
    if (!isLocale(newLocale)) {
      return;
    }
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let value: unknown = catalogs[locale];

    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null && k in value) {
        value = (value as Catalog)[k];
      } else {
        return '';
      }
    }

    return typeof value === 'string' ? value : '';
  };

  return (
    <TranslationContext.Provider value={{ locale, changeLocale, t, isLoading: false }}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslations = () => useContext(TranslationContext);
