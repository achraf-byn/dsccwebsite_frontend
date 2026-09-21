'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaLinkedinIn, FaTiktok, FaXTwitter } from 'react-icons/fa6'
import { SiInstagram } from 'react-icons/si'
import logoImage from '@/pictures/logo.png'
import { socialUrls } from '@/lib/socials'

const exploreLinks = [['Home', '/'], ['About', '/about'], ['Announcements', '/announcements'], ['News', '/news']] as const
const communityLinks = [['Events', '/events'], ['OpenLab', '/openlab'], ['Drive', '/drive'], ['Contact', '/contact']] as const

export default function Footer() {
  const reduce = useReducedMotion()
  const reveal = (delay: number) => ({ duration: .45, delay: reduce ? 0 : delay })
  return <footer className="site-footer">
    <div className="site-footer-glow" aria-hidden="true" />
    <div className="site-footer-shell">
      <motion.div className="site-footer-main" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={reveal(0)}>
        <Link href="/" className="site-footer-brand" aria-label="DSCC home">
          <Image src={logoImage} alt="DSCC - Data Science & Cloud Computing Club" width={180} height={90} className="site-footer-logo" />
          <span className="site-footer-brand-name">Data Science &amp; Cloud Computing Club</span>
          <span className="site-footer-ensao">ENSAO</span>
        </Link>
        <p className="site-footer-description">Students learning, building and growing together through Data, AI and Cloud.</p>
      </motion.div>
      <motion.nav className="site-footer-nav" aria-label="Footer navigation" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={reveal(.08)}>
        <div className="site-footer-nav-group"><h2>EXPLORE</h2>{exploreLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
        <div className="site-footer-nav-group"><h2>COMMUNITY</h2>{communityLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      </motion.nav>
      <motion.div className="site-footer-socials" aria-label="Social links" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={reveal(.16)}>
        <h2>FOLLOW US</h2>
        {[
          { label: 'Instagram', url: socialUrls.instagram, icon: SiInstagram },
          { label: 'LinkedIn', url: socialUrls.linkedin, icon: FaLinkedinIn },
          { label: 'TikTok', url: socialUrls.tiktok, icon: FaTiktok },
          { label: 'X', url: socialUrls.x, icon: FaXTwitter },
        ].map(({ label, url, icon: Icon }) => { const className = `site-footer-social-${label.toLowerCase()}`; return url ? <a className={className} key={label} href={url} target="_blank" rel="noreferrer" aria-label={`DSCC on ${label}`}><Icon size={18} /></a> : <span className={className} key={label} aria-label={`${label} link not configured`} title={`${label} link not configured`}><Icon size={18} /></span> })}
      </motion.div>
      <div className="site-footer-bottom"><span className="site-footer-motto">Students Today, Builders Tomorrow.</span><span>© 2026 DSCC. All rights reserved.</span></div>
    </div>
  </footer>
}
