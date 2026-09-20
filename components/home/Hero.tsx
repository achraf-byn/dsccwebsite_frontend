'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BookOpen, Box, Rocket, Users } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import heroArtwork from '@/pictures/asset.png'

const lines = [
  { text: 'DATA.', className: 'hero-line-navy' },
  { text: 'CLOUD.', className: 'hero-line-blue' },
  { text: 'INNOVATE.', className: 'hero-line-navy' },
]

const entrance = { duration: .48, ease: [.22, 1, .36, 1] as const }

function FloatingElement({ className, strength = 8, children }: { className: string; strength?: number; children?: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 80, damping: 18, mass: .7 })
  const springY = useSpring(y, { stiffness: 80, damping: 18, mass: .7 })
  const [canParallax, setCanParallax] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    const update = () => setCanParallax(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    if (!canParallax || prefersReducedMotion) return
    const onMove = (event: MouseEvent) => {
      x.set(((event.clientX / window.innerWidth) - .5) * strength)
      y.set(((event.clientY / window.innerHeight) - .5) * strength)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [canParallax, prefersReducedMotion, strength, x, y])

  return <motion.div className={`hero-floating ${className}`} style={canParallax && !prefersReducedMotion ? { x: springX, y: springY } : undefined}>{children}</motion.div>
}

function CommunityAvatars() {
  return <div className="hero-community"><div className="hero-avatar-stack" aria-hidden="true"><span>Y</span><span>S</span><span>O</span><span>I</span><span>+</span></div><span>A community of curious minds</span></div>
}

const features = [
  { title: 'Learn', description: 'Workshops, resources and hands-on projects.', icon: BookOpen },
  { title: 'Build', description: 'Turn ideas into real solutions.', icon: Box },
  { title: 'Connect', description: 'Meet people, share and collaborate.', icon: Users },
  { title: 'Grow', description: 'Gain experience and new opportunities.', icon: Rocket },
]

function FeatureStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: .25 })
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  return <div className="hero-features" ref={ref} aria-label="What DSCC helps students do">
    {features.map(({ title, description, icon: Icon }, index) => <motion.div className="hero-feature" key={title} initial={isMobile ? { opacity: 0, y: 24, scale: .97 } : { opacity: 0, y: 18 }} animate={isInView ? (isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0 }) : undefined} transition={{ ...entrance, delay: prefersReducedMotion ? 0 : index * (isMobile ? .1 : .08) }}>
      <div className="hero-feature-icon"><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></div>
      <div><h2>{title}</h2><p>{description}</p></div>
    </motion.div>)}
  </div>
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const textScrollY = useSpring(useTransform(scrollYProgress, [0, .65], [0, -15]), { stiffness: 90, damping: 24 })
  const artworkScrollY = useSpring(useTransform(scrollYProgress, [0, .8], [0, -25]), { stiffness: 80, damping: 25 })
  const glowScrollY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -10]), { stiffness: 70, damping: 28 })
  const [canParallax, setCanParallax] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const artworkX = useMotionValue(0)
  const artworkY = useMotionValue(0)
  const artworkSpringX = useSpring(artworkX, { stiffness: 55, damping: 22, mass: 1 })
  const artworkSpringY = useSpring(artworkY, { stiffness: 55, damping: 22, mass: 1 })

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    const update = () => setCanParallax(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    if (!canParallax || prefersReducedMotion) return
    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) - .5
      const y = (event.clientY / window.innerHeight) - .5
      artworkX.set(x * 5)
      artworkY.set(y * 5)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [canParallax, prefersReducedMotion, artworkX, artworkY])

  return <section className="hero-section" ref={heroRef} aria-labelledby="hero-title">
    <div className="hero-background" aria-hidden="true">
      <FloatingElement className="hero-bg-blob hero-bg-blob-left" strength={3}><span /></FloatingElement>
      <FloatingElement className="hero-bg-blob hero-bg-blob-art" strength={3}><span /></FloatingElement>
      <div className="hero-bg-blob hero-bg-blob-bottom" />
      <motion.div className="hero-bg-glow" style={isMobile && !prefersReducedMotion ? { y: glowScrollY } : undefined} />
      <div className="hero-dot-grid hero-dot-grid-top" />
      <div className="hero-dot-grid hero-dot-grid-left" />
      <svg className="hero-orbits" viewBox="0 0 1000 620" fill="none" preserveAspectRatio="none">
        <path d="M530 95C735 5 1000 95 920 295C850 470 585 530 435 395C340 310 390 165 530 95Z" />
        <path d="M620 142C770 105 925 180 875 320C830 450 630 470 520 370C452 307 492 174 620 142Z" />
        <path d="M750 70C875 120 965 260 900 405" />
        <circle cx="875" cy="320" r="4" /><circle cx="520" cy="370" r="3" /><circle cx="900" cy="405" r="3" />
      </svg>
      <div className="hero-micro-dot hero-micro-dot-one" />
      <div className="hero-micro-dot hero-micro-dot-two" />
      <div className="hero-micro-ring" />
      <div className="hero-side-note"><span>FROM STUDENTS</span><span>TO A BRIGHTER</span><span>TOMORROW</span><i /></div>
      <div className="hero-wave" />
    </div>
    <div className="hero-container">
      <motion.div className="hero-copy" style={isMobile && !prefersReducedMotion ? { y: textScrollY } : undefined}>
        <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={entrance}>
          <span>LEARN</span><i>·</i><span>BUILD</span><i>·</i><span>CONNECT</span><i>·</i><span>GROW</span>
          <small>ENSAO · STUDENT CLUB</small>
        </motion.div>
        <h1 id="hero-title">{lines.map((line, index) => <motion.span key={line.text} className={`hero-line ${line.className}`} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ ...entrance, delay: prefersReducedMotion ? 0 : .12 + index * .1 }}>{line.text}</motion.span>)}</h1>
        <motion.p className="hero-description" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...entrance, delay: prefersReducedMotion ? 0 : .46 }}>A student community building real skills for a brighter digital tomorrow.</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...entrance, delay: prefersReducedMotion ? 0 : .56 }}>
          <Link className="hero-button hero-button-primary" href="/about">Explore Us <ArrowRight size={17} /></Link>
          <Link className="hero-button hero-button-secondary" href="/events">Explore Events <ArrowUpRight size={16} /></Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...entrance, delay: prefersReducedMotion ? 0 : .66 }}><CommunityAvatars /></motion.div>
      </motion.div>
      <motion.div className="hero-artwork-wrap" style={isMobile && !prefersReducedMotion ? { y: artworkScrollY } : undefined} aria-label="DSCC students collaborating on a laptop">
        <FloatingElement className="hero-cube hero-cube-back" strength={6}><span /></FloatingElement>
        <FloatingElement className="hero-dot hero-dot-mid" strength={10}><span /></FloatingElement>
        <FloatingElement className="hero-ring hero-ring-front" strength={14}><span /></FloatingElement>
        <motion.div className="hero-glow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .25 }} />
        <motion.div className="hero-artwork" initial={isMobile ? { opacity: 0, x: 34, scale: .96, y: 20 } : { opacity: 0, x: 34 }} animate={isMobile ? { opacity: 1, x: 0, scale: 1, y: 0 } : { opacity: 1, x: 0 }} transition={{ ...entrance, delay: .18 }} style={canParallax && !prefersReducedMotion ? { x: artworkSpringX, y: artworkSpringY } : undefined}>
          <Image src={heroArtwork} alt="Two DSCC students working together on a laptop" width={1430} height={1100} priority sizes="(max-width: 767px) 96vw, (max-width: 1199px) 54vw, 650px" className="hero-artwork-image" />
        </motion.div>
      </motion.div>
    </div>
    <FeatureStrip />
  </section>
}
