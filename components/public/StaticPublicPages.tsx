'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle } from 'lucide-react'
import { SiInstagram } from 'react-icons/si'

export function ContactPage() {
  return <main className="hub-page hub-contact"><section className="hub-hero"><div className="hub-shell hub-hero-inner"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .48 }}><span className="about-eyebrow"><MessageCircle size={14} /> CONTACT</span><h1>Let&apos;s Connect.</h1><p>Have a question, an idea or something you would like to build with DSCC? Start the conversation through our official community channel.</p></motion.div></div></section><section className="contact-content"><div className="hub-shell"><div className="contact-card"><div><span className="about-eyebrow">GET IN TOUCH</span><h2>Bring your curiosity.</h2><p>We&apos;re always glad to hear from students who want to learn, share and build together.</p></div><div className="contact-actions"><a href="https://www.instagram.com/clubdscc/" target="_blank" rel="noreferrer"><SiInstagram size={18} /> Instagram <span>@clubdscc</span></a><span className="contact-unavailable"><Mail size={18} /> Email <span>Not configured</span></span></div></div></div></section></main>
}
