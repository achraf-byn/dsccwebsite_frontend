'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, FlaskConical, FolderOpen, House, Info, Mail, Megaphone, Moon, Newspaper, Sun, X } from 'lucide-react'
import { SiInstagram } from 'react-icons/si'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import logoImage from '@/pictures/logo.png'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Home', href: '/', icon: House },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Announcements', href: '/announcements', icon: Megaphone },
  { label: 'Events', href: '/events', icon: CalendarDays },
  { label: 'News', href: '/news', icon: Newspaper },
  { label: 'OpenLab', href: '/openlab', icon: FlaskConical },
  { label: 'Drive', href: '/drive', icon: FolderOpen },
  { label: 'Contact', href: '/contact', icon: Mail },
]

function Logo() {
  return <Link href="/" className="dscc-logo" aria-label="DSCC - Data Science & Cloud Computing Club">
    <Image src={logoImage} alt="DSCC - Data Science & Cloud Computing Club" width={160} height={64} className="dscc-logo-image" priority />
  </Link>
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

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const toggleTheme = () => {
    const nextDark = !dark
    setDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
    window.localStorage.setItem('dscc-theme', nextDark ? 'dark' : 'light')
  }

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)
  const closeMenu = () => setMenuOpen(false)
  const transition = prefersReducedMotion ? { duration: 0 } : { duration: .25, ease: [.22, 1, .36, 1] }
  const drawerTransition = prefersReducedMotion ? { duration: 0 } : { duration: .34, ease: [.22, 1, .36, 1] }

  return <header className={`site-navbar ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="navbar-shell">
      <Logo />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(item => { const active = isActive(item.href); return <Link key={item.href} href={item.href} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined}>{active && <motion.span className="nav-active-pill" layoutId="dscc-active-nav-pill" transition={transition} aria-hidden="true" />}<span className="nav-link-label">{item.label}</span></Link> })}
      </nav>
      <div className="navbar-actions">
        <ThemeToggle dark={dark} onToggle={toggleTheme} />
        <a className="icon-button instagram-button" href="https://www.instagram.com/clubdscc/" target="_blank" rel="noreferrer" aria-label="DSCC on Instagram"><SiInstagram size={18} /></a>
        <motion.button className={`menu-button ${menuOpen ? 'is-open' : ''}`} type="button" onClick={() => setMenuOpen(value => !value)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" whileTap={{ scale: .94 }}>
          <motion.span className="menu-line menu-line-top" animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} transition={{ duration: .3, ease: [.22, 1, .36, 1] }} />
          <motion.span className="menu-line menu-line-bottom" animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} transition={{ duration: .3, ease: [.22, 1, .36, 1] }} />
        </motion.button>
      </div>
    </div>
    <AnimatePresence>
      {menuOpen && <>
        <motion.button className="mobile-nav-backdrop" type="button" aria-label="Close navigation" onClick={closeMenu} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={drawerTransition} />
        <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0.85, x: '100%', scale: .985 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0.85, x: '100%', scale: .985 }} transition={drawerTransition}>
        <div className="mobile-nav-top"><div className="mobile-nav-top-actions"><ThemeToggle dark={dark} onToggle={toggleTheme} /><a className="mobile-nav-instagram" href="https://www.instagram.com/clubdscc/" target="_blank" rel="noreferrer" onClick={closeMenu} aria-label="DSCC on Instagram"><SiInstagram size={21} /></a><button className="mobile-nav-close" type="button" aria-label="Close navigation" onClick={closeMenu}><X size={23} /></button></div></div>
        <div className="mobile-nav-links">{navItems.map(({ label, href, icon: Icon }) => { const active = isActive(href); return <motion.div key={href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: prefersReducedMotion ? 0 : .05 }}><Link href={href} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} onClick={closeMenu}><Icon className="mobile-nav-link-icon" size={20} strokeWidth={1.8} aria-hidden="true" /><span className="nav-link-label">{label}</span>{active && <span className="mobile-nav-indicator" aria-hidden="true" />}</Link></motion.div> })}</div>
        <div className="mobile-nav-footer"><div className="mobile-nav-motto">Students Today, Builders Tomorrow.</div></div>
        </motion.nav>
      </>}
    </AnimatePresence>
  </header>
}
