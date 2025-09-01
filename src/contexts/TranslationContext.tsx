// src/contexts/TranslationContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

let translationsCache: { [key: string]: Record<string, unknown> } = {};

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
  isLoading: true
});

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('pt');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const savedLocale = localStorage.getItem('locale') || 'pt';
    setLocale(savedLocale);
    

    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    if (Object.keys(translationsCache).length === 0) {
      try {
        const [ptTranslations, enTranslations] = await Promise.all([
          import('../../messages/pt.json'),
          import('../../messages/en.json')
        ]);
        
        translationsCache = {
          pt: ptTranslations.default,
          en: enTranslations.default
        };
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    }
    setIsLoading(false);
  };

  const changeLocale = (newLocale: string) => {
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
  };

    const t = (key: string) => {
    if (isLoading || !translationsCache[locale]) {
      return ''; // Retorna string vazia durante o loading
    }
    
    const keys = key.split('.');
    let value: unknown = translationsCache[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return '';
      }
    }
    
    return typeof value === 'string' ? value : '';
  };

  return (
    <TranslationContext.Provider value={{ locale, changeLocale, t, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslations = () => useContext(TranslationContext);
