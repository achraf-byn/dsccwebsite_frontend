'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations } from './translations'
import { teamRoles } from './teamRoles'

export type Language = 'en' | 'fr' | 'ar'
const locales = { en: 'en-GB', fr: 'fr-FR', ar: 'ar-MA' }
const isLanguage = (value: unknown): value is Language => value === 'en' || value === 'fr' || value === 'ar'
const catalog = new Map(Object.entries(translations).map(([key, value]) => [key.toLocaleLowerCase('en'), value]))
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: 'en', setLanguage: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>('en')
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dscc-language')
      if (isLanguage(saved)) updateLanguage(saved)
    } catch { /* Storage can be unavailable in private browsing. */ }
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'dscc-language') updateLanguage(isLanguage(event.newValue) ? event.newValue : 'en')
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])
  const setLanguage = (value: Language) => {
    updateLanguage(value)
    try { localStorage.setItem('dscc-language', value) } catch { /* Keep the in-memory selection. */ }
  }
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function translate(text: string, language: Language): string {
  const key = text.trim().replace(/\s+/g, ' ')
  if (teamRoles[key]) return text.replace(text.trim(), teamRoles[key][language])
  if (language === 'en') return text
  const match = catalog.get(key.toLocaleLowerCase('en'))
  if (match) return text.replace(text.trim(), match[language])
  // Event metadata combines a date and location; translate each independently.
  if (text.includes(' · ')) return text.split(' · ').map(part => translate(part, language)).join(' · ')
  if (/^\d{1,2} [A-Za-z]{3,4} \d{4}$/.test(key)) {
    const date = new Date(key)
    if (!Number.isNaN(date.valueOf())) return new Intl.DateTimeFormat(locales[language], { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
  }
  return text
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return { ...context, t: (text: string) => translate(text, context.language) }
}

/** Translate text at the React render boundary, without modifying DOM nodes. */
export function T({ children }: { children: ReactNode }) {
  const { t } = useLanguage()
  const localize = (node: ReactNode): ReactNode => typeof node === 'string' ? t(node) : Array.isArray(node) ? node.map(localize) : node
  return <>{localize(children)}</>
}
