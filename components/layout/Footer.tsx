'use client'

import { T } from '@/lib/i18n/LanguageProvider'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaLinkedinIn, FaTiktok, FaXTwitter } from 'react-icons/fa6'
import { SiInstagram } from 'react-icons/si'
import logoImage from '@/pictures/logo.png'
import { clubData } from '@/lib/club'

const exploreLinks = [['Home', '/'], ['About', '/about'], ['Announcements', '/announcements'], ['News', '/news']] as const
const communityLinks = [['Events', '/events'], ['OpenLab', '/openlab'], ['Drive', '/drive'], ['Contact', '/contact']] as const

export default function Footer() {
  const reduce = useReducedMotion()
  const reveal = (delay: number) => ({ duration: 0.45, delay: reduce ? 0 : delay })
  return (
    <footer className="site-footer">
      <div className="site-footer-glow" aria-hidden="true" />
      <div className="site-footer-shell">
        <motion.div className="site-footer-main" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={reveal(0)}>
          <Link href="/" className="site-footer-brand" aria-label={`${clubData.shortName || 'DSCC'} home`}>
            <Image src={logoImage} alt={`${clubData.shortName} - ${clubData.name}`} width={180} height={90} className="site-footer-logo" />
            <span className="site-footer-brand-name"><T>{clubData.name}</T></span>
            <span className="site-footer-ensao"><T>{clubData.school}</T></span>
          </Link>
          <p className="site-footer-description"><T>{clubData.description}</T></p>
        </motion.div>
        <motion.nav className="site-footer-nav" aria-label="Footer navigation" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={reveal(0.08)}>
          <div className="site-footer-nav-group"><h2><T>EXPLORE</T></h2>{exploreLinks.map(([label, href]) => <Link key={href} href={href}><T>{label}</T></Link>)}</div>
          <div className="site-footer-nav-group"><h2><T>COMMUNITY</T></h2>{communityLinks.map(([label, href]) => <Link key={href} href={href}><T>{label}</T></Link>)}</div>
        </motion.nav>
        <motion.div className="site-footer-socials" aria-label="Social links" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={reveal(0.16)}>
          <h2><T>FOLLOW US</T></h2>
          {[
            { label: 'Instagram', url: clubData.socials.instagram, icon: SiInstagram },
            { label: 'LinkedIn', url: clubData.socials.linkedin, icon: FaLinkedinIn },
            { label: 'TikTok', url: clubData.socials.tiktok, icon: FaTiktok },
            { label: 'X', url: clubData.socials.x, icon: FaXTwitter },
          ].map(({ label, url, icon: Icon }) => {
            const className = `site-footer-social-${label.toLowerCase()}`
            return url ? (
              <a className={className} key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${clubData.shortName} on ${label}`}>
                <Icon size={18} />
              </a>
            ) : (
              <span className={className} key={label} aria-label={`${label} link not configured`} title={`${label} link not configured`}>
                <Icon size={18} />
              </span>
            )
          })}
        </motion.div>
        <div className="site-footer-bottom">
          <span className="site-footer-motto"><T>Students Today, Builders Tomorrow.</T></span>
          <span><T>© 2026 {clubData.shortName}. All rights reserved.</T></span>
        </div>
      </div>
    </footer>
  )
}
