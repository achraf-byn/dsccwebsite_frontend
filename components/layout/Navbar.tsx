'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import { SiInstagram } from 'react-icons/si'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import logoImage from '@/pictures/logo.png'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Announcements', href: '/announcements' },
  { label: 'Events', href: '/events' },
  { label: 'News', href: '/news' },
  { label: 'OpenLab', href: '/openlab' },
  { label: 'Drive', href: '/drive' },
  { label: 'Contact', href: '/contact' },
]

function Logo() {
  return <a href="/" className="dscc-logo" aria-label="DSCC - Data Science & Cloud Computing Club">
    <Image src={logoImage} alt="DSCC - Data Science & Cloud Computing Club" width={160} height={64} className="dscc-logo-image" priority />
  </a>
}

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return <button className="theme-toggle" type="button" onClick={onToggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={dark}>
    <Sun size={13} aria-hidden="true" /><span className="theme-track"><motion.span className="theme-thumb" layout transition={{ duration: .25, ease: [.22, 1, .36, 1] }} /></span><Moon size={13} aria-hidden="true" />
  </button>
}

export default function Navbar() {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('dscc-theme')
    const nextDark = stored === 'dark'
    setDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const toggleTheme = () => {
    const nextDark = !dark
    setDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
    window.localStorage.setItem('dscc-theme', nextDark ? 'dark' : 'light')
  }

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)
  const closeMenu = () => setMenuOpen(false)
  const transition = prefersReducedMotion ? { duration: 0 } : { duration: .25, ease: [.22, 1, .36, 1] }

  return <header className={`site-navbar ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="navbar-shell">
      <Logo />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(item => { const active = isActive(item.href); return <a key={item.href} href={item.href} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined}>{active && <motion.span className="nav-active-pill" layoutId="dscc-active-nav-pill" transition={transition} aria-hidden="true" />}<span className="nav-link-label">{item.label}</span></a> })}
      </nav>
      <div className="navbar-actions">
        <button className="icon-button" type="button" aria-label="Search"><Search size={18} /></button>
        <ThemeToggle dark={dark} onToggle={toggleTheme} />
        <a className="icon-button instagram-button" href="https://www.instagram.com/clubdscc/" target="_blank" rel="noreferrer" aria-label="DSCC on Instagram"><SiInstagram size={18} /></a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(value => !value)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation">{menuOpen ? <X size={21} /> : <Menu size={22} />}</button>
      </div>
    </div>
    <AnimatePresence>
      {menuOpen && <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0, y: -8 }} transition={transition}>
        <div className="mobile-nav-links">{navItems.map((item, index) => { const active = isActive(item.href); return <motion.a key={item.href} href={item.href} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} onClick={closeMenu} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ ...transition, delay: prefersReducedMotion ? 0 : index * .025 }}>{active && <motion.span className="nav-active-pill" layoutId="dscc-active-nav-pill" transition={transition} aria-hidden="true" />}<span className="nav-link-label">{item.label}</span></motion.a> })}</div>
        <div className="mobile-nav-tools"><button className="mobile-tool" type="button" aria-label="Search" onClick={closeMenu}><Search size={17} /> Search</button><a className="mobile-tool" href="https://www.instagram.com/clubdscc/" target="_blank" rel="noreferrer" onClick={closeMenu}><SiInstagram size={17} /> Instagram</a></div>
      </motion.nav>}
    </AnimatePresence>
  </header>
}
