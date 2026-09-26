'use client'

import { T } from '@/lib/i18n/LanguageProvider'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import TeamCarousel from '@/components/about/TeamCarousel'

export default function HomeTeamPreview() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: .18 })
  const reduce = useReducedMotion()
  return <section className="home-team-preview" ref={ref} aria-labelledby="home-team-title"><div className="home-team-shell">
    <motion.div className="home-team-intro" initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: .45, delay: reduce ? 0 : .08 }}>
      <span className="home-section-eyebrow"><T>OUR TEAM</T></span>
      <h2 id="home-team-title"><T>Meet the People Behind </T><span><T>DSCC.</T></span></h2>
    </motion.div>
    <TeamCarousel className="home-team-carousel" />
  </div></section>
}
