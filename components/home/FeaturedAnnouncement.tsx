'use client'

import { T } from '@/lib/i18n/LanguageProvider'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Code2, Megaphone, MessageCircle, Network, Users } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

const reveal = { duration: .45, ease: [.22, 1, .36, 1] as const }

const connectionTags = [
  { label: 'Meet', icon: Users },
  { label: 'Share', icon: MessageCircle },
  { label: 'Collaborate', icon: Network },
  { label: 'Build', icon: Code2 },
]

const members = [
  { initials: 'A', className: 'announcement-member-a' },
  { initials: 'M', className: 'announcement-member-m' },
  { initials: 'S', className: 'announcement-member-s' },
  { initials: 'Y', className: 'announcement-member-y' },
]

export default function FeaturedAnnouncement() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: .25 })
  const prefersReducedMotion = useReducedMotion()

  return <section className="announcement-section" aria-labelledby="announcement-title">
    <div className="announcement-shell">
      <motion.div className="announcement-visual" aria-hidden="true" initial={{ opacity: 0, x: -22 }} animate={isInView ? { opacity: 1, x: 0 } : undefined} transition={{ ...reveal, delay: prefersReducedMotion ? 0 : .05 }}>
        <svg className="announcement-network" viewBox="0 0 520 360" fill="none" preserveAspectRatio="xMidYMid meet">
          <path d="M128 91C176 67 215 110 255 157S339 244 402 213" />
          <path d="M96 240C162 235 183 198 247 181S342 118 405 110" />
          <path d="M113 101C116 169 148 212 211 238S337 278 408 213" />
          <path d="M250 181C274 139 307 103 361 88" />
          <circle cx="128" cy="91" r="4" /><circle cx="96" cy="240" r="4" /><circle cx="405" cy="110" r="4" /><circle cx="402" cy="213" r="4" />
        </svg>
        {members.map(({ initials, className }, index) => <motion.div className={`announcement-member ${className}`} key={initials} initial={{ opacity: 0, scale: .65 }} animate={isInView ? { opacity: 1, scale: 1 } : undefined} transition={{ ...reveal, delay: prefersReducedMotion ? 0 : .16 + index * .08 }}><span><T>{initials}</T></span></motion.div>)}
        <motion.div className="announcement-core" animate={isInView && !prefersReducedMotion ? { y: [0, -4, 0] } : undefined} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <strong><T>DSCC</T></strong><span><T>COMMUNITY</T></span>
        </motion.div>
        <div className="announcement-bubble announcement-bubble-one"><MessageCircle size={16} /></div>
        <div className="announcement-bubble announcement-bubble-two"><Code2 size={15} /></div>
        <span className="announcement-visual-caption"><i /><T> PEOPLE · IDEAS · ACTION</T></span>
      </motion.div>

      <motion.div className="announcement-content" ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : undefined} transition={reveal}>
        <div className="announcement-label"><Megaphone size={15} strokeWidth={1.9} aria-hidden="true" /><span><T>LATEST ANNOUNCEMENT</T></span></div>
        <h2 id="announcement-title"><T>Welcome to the </T><span><T>DSCC Family.</T></span></h2>
        <p className="announcement-lead"><T>New here? Don&apos;t stay on the sidelines. Introduce yourself, meet other members, share your ideas, ask questions, and take part in what we&apos;re building together.</T></p>
        <p className="announcement-secondary"><T>Every connection can become a new idea, a new project, or a new opportunity.</T></p>
        <div className="announcement-tags" aria-label="Ways to connect with the community">
          {connectionTags.map(({ label, icon: Icon }) => <span className="announcement-tag" key={label}><Icon size={15} strokeWidth={2} aria-hidden="true" /><T>{label}</T></span>)}
        </div>
        <div className="announcement-actions">
          <Link className="announcement-primary" href="/contact"><T>Meet the Community </T><ArrowRight size={17} /></Link>
          <Link className="announcement-secondary-link" href="/announcements"><T>View all announcements </T><ArrowRight size={15} /></Link>
        </div>
      </motion.div>
    </div>
  </section>
}
