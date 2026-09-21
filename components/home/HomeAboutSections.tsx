'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, BrainCircuit, Cloud, Code2, Database, Network } from 'lucide-react'
import { useRef } from 'react'
import Link from 'next/link'
import logoImage from '@/pictures/logo.png'

const focus = ['Data Science', 'Artificial Intelligence', 'Cloud Computing', 'Data Engineering', 'Technology & Innovation']
const fields = ['AI', 'Data Science', 'Cloud Computing', 'Data Engineering', 'Machine Learning', 'Generative AI', 'DevOps', 'Business Intelligence']

export default function HomeAboutSections() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: .18 })
  const reduce = useReducedMotion()
  const reveal = (delay = 0) => ({ initial: { opacity: 0, y: 18 }, animate: inView ? { opacity: 1, y: 0 } : undefined, transition: { duration: .45, delay: reduce ? 0 : delay, ease: [.22, 1, .36, 1] as const } })

  return <section className="home-about-sections" ref={ref} aria-label="About DSCC"><div className="home-about-shell">
    <motion.div className="home-about-intro" {...reveal()}><span className="home-section-eyebrow">WHO WE ARE</span><h2>Built by students,<br /><span>for students.</span></h2><p>DSCC is a student-led community at ENSAO where curious minds learn beyond the classroom, collaborate on real projects, and connect with the wider technology ecosystem.</p><Link href="/about" className="home-section-link">Discover DSCC <ArrowRight size={15} /></Link></motion.div>
    <motion.div className="home-focus-list" {...reveal(.08)}><span className="home-list-label">OUR FOCUS</span>{focus.map((item, index) => <div key={item}><b>0{index + 1}</b><span>{item}</span></div>)}</motion.div>
    <motion.div className="home-playground-copy" {...reveal(.14)}><span className="home-section-eyebrow">OUR PLAYGROUND</span><h2>Where ideas become <span>capability.</span></h2><p>The technologies shaping what we explore, experiment with, and build together.</p></motion.div>
    <motion.div className="home-field-map" {...reveal(.2)}><div className="home-field-lines" aria-hidden="true" /><div className="home-field-core"><Image src={logoImage} alt="DSCC club logo" width={70} height={70} className="home-field-core-logo" /></div>{fields.map((field, index) => <span className={`home-field-pill home-field-pill-${index + 1}`} key={field}>{field}</span>)}<div className="home-field-chip home-field-chip-ai"><BrainCircuit size={13} />AI</div><div className="home-field-chip home-field-chip-cloud"><Cloud size={13} />Cloud</div><div className="home-field-chip home-field-chip-data"><Database size={13} />Data</div><div className="home-field-chip home-field-chip-code"><Code2 size={13} />Build</div><Network className="home-field-network-icon" size={17} /></motion.div>
  </div></section>
}
