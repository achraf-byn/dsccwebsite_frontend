'use client'

import { T } from '@/lib/i18n/LanguageProvider'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import Link from 'next/link'
import EcosystemVisual from '@/components/shared/EcosystemVisual'

const focus = ['Data Science', 'Artificial Intelligence', 'Cloud Computing', 'Data Engineering', 'Technology & Innovation']

export default function HomeAboutSections() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: .18 })
  const reduce = useReducedMotion()
  const reveal = (delay = 0) => ({ initial: { opacity: 0, y: 18 }, animate: inView ? { opacity: 1, y: 0 } : undefined, transition: { duration: .45, delay: reduce ? 0 : delay, ease: [.22, 1, .36, 1] as const } })

  return <section className="home-about-sections" ref={ref} aria-label="About DSCC"><div className="home-about-shell">
    <motion.div className="home-about-intro" {...reveal()}><span className="home-section-eyebrow"><T>WHO WE ARE</T></span><h2><T>Built by students,</T><br /><span><T>for students.</T></span></h2><p><T>DSCC is a student-led community at ENSAO where curious minds learn beyond the classroom, collaborate on real projects, and connect with the wider technology ecosystem.</T></p><Link href="/about" className="home-section-link"><T>Discover DSCC </T><ArrowRight size={15} /></Link></motion.div>
    <motion.div className="home-focus-list" {...reveal(.08)}><span className="home-list-label"><T>OUR FOCUS</T></span>{focus.map((item, index) => <div key={item}><b>0<T>{index + 1}</T></b><span><T>{item}</T></span></div>)}</motion.div>
    <motion.div className="home-playground-copy" {...reveal(.14)}><span className="home-section-eyebrow"><T>OUR PLAYGROUND</T></span><h2><T>Where ideas become </T><span><T>capability.</T></span></h2><p><T>The technologies shaping what we explore, experiment with, and build together.</T></p></motion.div>
    <motion.div className="home-field-map" {...reveal(.2)}><EcosystemVisual /></motion.div>
  </div></section>
}
