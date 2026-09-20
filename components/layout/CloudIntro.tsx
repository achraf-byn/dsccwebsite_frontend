'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Code2, Database, Network } from 'lucide-react'
import { useEffect, useState } from 'react'
import introArtwork from '@/pictures/dscc-intro-transparent.png'

const SESSION_KEY = 'dscc-intro-shown'

const particles = [
  { className: 'cloud-particle-one', x: 118, y: 54 },
  { className: 'cloud-particle-two', x: 82, y: 82 },
  { className: 'cloud-particle-three', x: -112, y: 58 },
  { className: 'cloud-particle-four', x: -84, y: 92 },
  { className: 'cloud-particle-five', x: 136, y: -34 },
  { className: 'cloud-particle-six', x: -126, y: -26 },
  { className: 'cloud-particle-seven', x: 58, y: -74 },
  { className: 'cloud-particle-eight', x: -56, y: -70 },
]

export default function CloudIntro() {
  const prefersReducedMotion = useReducedMotion()
  const [showIntro, setShowIntro] = useState<boolean | null>(null)

  useEffect(() => {
    const replayRequested = new URLSearchParams(window.location.search).get('intro') === '1'
    let hasSeenIntro = false
    try {
      hasSeenIntro = window.sessionStorage.getItem(SESSION_KEY) === 'true'
    } catch {
      hasSeenIntro = false
    }

    if (!replayRequested && hasSeenIntro) {
      setShowIntro(false)
      return
    }

    try {
      window.sessionStorage.setItem(SESSION_KEY, 'true')
    } catch {
      // Storage can be blocked in private browsing; the intro still runs once per mount.
    }
    const timeout = window.setTimeout(() => setShowIntro(false), prefersReducedMotion ? 900 : 5000)
    return () => window.clearTimeout(timeout)
  }, [prefersReducedMotion])

  if (showIntro === null) return null

  return <AnimatePresence>
    {showIntro && <motion.div className="cloud-intro" role="status" aria-label="Initializing DSCC Cloud" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: prefersReducedMotion ? .18 : .14 }}>
      <div className="cloud-intro-grid" aria-hidden="true" />
      <div className="cloud-intro-glow" aria-hidden="true" />
      <div className="cloud-intro-stage">
        <motion.div className="cloud-intro-kicker" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: prefersReducedMotion ? 0 : .12 }}>DSCC / CLOUD SYSTEM <span>INIT</span></motion.div>
        <motion.div className="cloud-intro-cloud" initial={{ opacity: 0, scale: .85, y: 8 }} animate={prefersReducedMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: [0, 1, 1, 1, 1, 0], scale: [.85, 1, 1, 1.02, 1, 1.08], y: [8, 0, 0, -2, 0, 0] }} transition={{ duration: prefersReducedMotion ? .45 : 3, times: prefersReducedMotion ? undefined : [0, .2, .65, .7, .86, 1], ease: 'easeOut' }}>
          <Image src={introArtwork} alt="" width={1280} height={720} priority className="cloud-intro-image" sizes="(max-width: 767px) 78vw, 520px" />
        </motion.div>
        {!prefersReducedMotion && particles.map(({ className, x, y }) => <motion.span key={className} className={`cloud-particle ${className}`} initial={{ opacity: 0, x: 0, y: 0, scale: .5 }} animate={{ opacity: [0, 1, 1, 0], x: [0, x], y: [0, y], scale: [0.5, 1, .7] }} transition={{ duration: 1.6, delay: .6, ease: [.22, 1, .36, 1] }} />)}
        <motion.p className="cloud-intro-status" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3, delay: prefersReducedMotion ? 0 : .55 }}><motion.span animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [1, 1, 0] }} transition={{ duration: 2, times: [0, .99, 1], delay: .05 }}>Initializing DSCC Cloud...</motion.span>{!prefersReducedMotion && <motion.span className="cloud-intro-ready-text" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1] }} transition={{ duration: 2, times: [0, .99, 1], delay: .05 }}>DSCC Cloud Ready</motion.span>}</motion.p>
        <div className="cloud-intro-data-line" aria-hidden="true"><motion.span initial={{ scaleX: 0 }} animate={prefersReducedMotion ? { scaleX: 1 } : { scaleX: [0, .7, 1] }} transition={{ duration: prefersReducedMotion ? .2 : 1.5, times: prefersReducedMotion ? undefined : [0, .6, 1], delay: prefersReducedMotion ? 0 : .6, ease: 'easeInOut' }} /></div>
        {!prefersReducedMotion && <motion.div className="cloud-intro-nodes" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1] }} transition={{ duration: 1.8, times: [0, .6, 1], delay: .6 }}><span /><span /><span /><span /></motion.div>}
        <motion.div className="cloud-intro-mark" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: prefersReducedMotion ? .15 : 2.1 }}>
          <strong>DSCC</strong><span>Data Science &amp; Cloud Computing Club</span>
        </motion.div>
        <motion.div className="cloud-intro-icons" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: .35 }} transition={{ duration: .35, delay: prefersReducedMotion ? 0 : 2.15 }}><Code2 size={14} /><Database size={14} /><Network size={14} /></motion.div>
      </div>
      <motion.div className="cloud-intro-reveal" initial={{ scale: 0, opacity: .35 }} animate={prefersReducedMotion ? { scale: 0, opacity: 0 } : { scale: 5.5, opacity: 0 }} transition={{ duration: .45, delay: 2.55, ease: [.22, 1, .36, 1] }} aria-hidden="true" />
    </motion.div>}
  </AnimatePresence>
}
