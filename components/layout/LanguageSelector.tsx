'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useLanguage, type Language } from '@/lib/i18n/LanguageProvider'

const languages = [
  { code: 'en', label: 'English', country: 'gb' },
  { code: 'fr', label: 'Français', country: 'fr' },
  { code: 'ar', label: 'العربية', country: 'ma' },
] as const

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const options = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const current = languages.find(item => item.code === language)!

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    options.current[languages.findIndex(item => item.code === language)]?.focus()
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [open, language])

  function select(value: Language) {
    setLanguage(value)
    setOpen(false)
    trigger.current?.focus()
  }

  return <div className="language-selector" ref={root} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false)
  }} onKeyDown={event => {
    if (event.key === 'Escape' && open) { event.stopPropagation(); setOpen(false); trigger.current?.focus() }
  }}>
    <button ref={trigger} type="button" className="language-button" aria-label={`${t('Language')}: ${current.label}`} aria-haspopup="menu" aria-expanded={open} aria-controls={open ? id : undefined} onClick={() => setOpen(value => !value)} onKeyDown={event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setOpen(true) }
    }}>
      <img src={`/flags/${current.country}.svg`} width="22" height="16" alt="" /><span className="language-code">{language.toUpperCase()}</span><ChevronDown className="language-chevron" size={12} aria-hidden="true" />
    </button>
    <AnimatePresence>{open && <motion.div id={id} className="language-popover" role="menu" aria-label={t('Language')} initial={{ opacity: 0, y: -5, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -5, scale: .97 }} transition={{ duration: reduce ? 0 : .16 }} onKeyDown={event => {
      const index = options.current.indexOf(document.activeElement as HTMLButtonElement)
      let next = index
      if (event.key === 'ArrowDown') next = (index + 1) % languages.length
      else if (event.key === 'ArrowUp') next = (index + languages.length - 1) % languages.length
      else if (event.key === 'Home') next = 0
      else if (event.key === 'End') next = languages.length - 1
      else return
      event.preventDefault(); options.current[next]?.focus()
    }}>
      {languages.map((item, index) => <button ref={node => { options.current[index] = node }} key={item.code} type="button" role="menuitemradio" aria-checked={language === item.code} className={language === item.code ? 'is-active' : ''} onClick={() => select(item.code)}>
        <img src={`/flags/${item.country}.svg`} width="22" height="16" alt="" /><span lang={item.code} dir={item.code === 'ar' ? 'rtl' : 'ltr'}>{item.label}</span>{language === item.code && <Check size={14} aria-hidden="true" />}
      </button>)}
    </motion.div>}</AnimatePresence>
  </div>
}
