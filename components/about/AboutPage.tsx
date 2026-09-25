'use client'

import { T } from '@/lib/i18n/LanguageProvider'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, BrainCircuit, BriefcaseBusiness, BookOpen, Cloud, Code2, Database, GraduationCap, Handshake, Lightbulb, MessageCircle, Network, Rocket, Share2, Sparkles, Target, Trophy, Users, Wrench } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { defaultAboutContent, getAboutContent, type AboutContent } from './aboutStore'
import TeamCarousel from './TeamCarousel'
import logoImage from '@/pictures/logo.png'

const ease = [.22, 1, .36, 1] as const

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: .18 })
  const reduce = useReducedMotion()
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: .5, delay: reduce ? 0 : delay, ease }}><T>{children}</T></motion.div>
}

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className="about-section-intro"><span className="about-eyebrow"><T>{eyebrow}</T></span><h2><T>{title}</T></h2>{children && <p><T>{children}</T></p>}</div>
}

function EcosystemVisual() {
  return <div className="about-ecosystem" aria-label="DSCC ecosystem from students to impact">
    <div className="about-ecosystem-orbit about-ecosystem-orbit-one" /><div className="about-ecosystem-orbit about-ecosystem-orbit-two" />
    <svg className="about-ecosystem-lines" viewBox="0 0 520 460" fill="none" aria-hidden="true"><path d="M93 102C164 143 191 206 260 230S361 283 426 354" /><path d="M426 101C354 143 327 202 260 230S155 282 93 354" /><path d="M260 50V410" /><circle cx="93" cy="102" r="4" /><circle cx="426" cy="101" r="4" /><circle cx="93" cy="354" r="4" /><circle cx="426" cy="354" r="4" /></svg>
    <div className="about-eco-node about-eco-center"><Image src={logoImage} alt="DSCC club logo" width={88} height={88} className="about-eco-logo" /></div>
    <div className="about-eco-node about-eco-students"><Users size={17} /><span><T>Students</T></span></div>
    <div className="about-eco-node about-eco-learn"><BookOpen size={17} /><span><T>Learn</T></span></div>
    <div className="about-eco-node about-eco-build"><Code2 size={17} /><span><T>Build</T></span></div>
    <div className="about-eco-node about-eco-impact"><Target size={17} /><span><T>Impact</T></span></div>
    <div className="about-eco-mini about-eco-ai"><BrainCircuit size={14} /><span><T>AI</T></span></div><div className="about-eco-mini about-eco-cloud"><Cloud size={14} /><span><T>Cloud</T></span></div>
  </div>
}

function AboutHero({ hero }: { hero: AboutContent['hero'] }) {
  const reduce = useReducedMotion()
  return <section className="about-hero"><div className="about-shell about-hero-shell"><motion.div className="about-hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease }}><span className="about-eyebrow"><T>{hero.eyebrow}</T></span><h1><T>{hero.title}</T><br /><span><T>{hero.highlightedTitle}</T></span></h1><p><T>{hero.description}</T></p><div className="about-actions"><a className="about-button about-button-primary" href={hero.primaryButton.href}><T>{hero.primaryButton.label}</T> <ArrowRight size={17} /></a><a className="about-button about-button-secondary" href={hero.secondaryButton.href}><T>{hero.secondaryButton.label}</T> <ArrowRight size={16} /></a></div></motion.div><motion.div className="about-hero-visual-wrap" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6, delay: reduce ? 0 : .12, ease }}>{hero.image ? <img className="about-hero-custom-image" src={hero.image} alt="" /> : <EcosystemVisual />}</motion.div></div></section>
}

const capabilities = [
  { title: 'Learn', text: 'Workshops, mentorship and technical resources that help students strengthen their skills.', icon: BookOpen },
  { title: 'Build', text: 'Hands-on projects and challenges that transform concepts into practical experience.', icon: Code2 },
  { title: 'Connect', text: 'Connecting students with each other, professionals, speakers and the technology ecosystem.', icon: Network },
  { title: 'Compete', text: 'Hackathons, data competitions and collaborative challenges that push students further.', icon: Trophy },
]

function WhoWeAre() {
  return <section className="about-section about-who"><div className="about-shell about-two-column"><Reveal><SectionIntro eyebrow="WHO WE ARE" title="Built by Students, for Students." /><p className="about-body-copy"><T>DSCC is the Data Science &amp; Cloud Computing Club at ENSAO. We create opportunities to learn beyond traditional coursework through collaboration, technical activities, projects, and exchanges with the broader technology ecosystem.</T></p></Reveal><Reveal className="about-focus-list" delay={.08}><span><T>OUR FOCUS</T></span>{['Data Science', 'Artificial Intelligence', 'Cloud Computing', 'Data Engineering', 'Technology & Innovation'].map((item, index) => <div key={item}><b>0<T>{index + 1}</T></b><span><T>{item}</T></span></div>)}</Reveal></div></section>
}

function WhatWeDo() {
  return <section className="about-section about-do"><div className="about-shell"><Reveal><SectionIntro eyebrow="WHAT WE DO" title="Make room to learn, then make something real." /></Reveal><div className="about-capability-grid">{capabilities.map(({ title, text, icon: Icon }, index) => <Reveal key={title} delay={index * .06}><div className="about-capability"><div className="about-icon-circle"><Icon size={20} /></div><div><h3><T>{title}</T></h3><p><T>{text}</T></p></div></div></Reveal>)}</div></div></section>
}

const fields = ['AI', 'Data Science', 'Cloud Computing', 'Data Engineering', 'Machine Learning', 'Generative AI', 'DevOps', 'Business Intelligence']

function TechEcosystem() {
  return <section className="about-section about-playground"><div className="about-shell about-playground-shell"><Reveal><SectionIntro eyebrow="OUR PLAYGROUND" title="The technologies shaping what we learn and build." /></Reveal><Reveal className="about-field-map" delay={.1}><div className="about-field-map-lines" aria-hidden="true" /><div className="about-field-core"><Database size={19} /><span><T>DSCC</T><br /><small><T>ECOSYSTEM</T></small></span></div>{fields.map((field, index) => <span className={`about-field-pill about-field-pill-${index + 1}`} key={field}><T>{field}</T></span>)}</Reveal></div></section>
}

const journey = [
  { title: 'Learn', text: 'Start with questions and shared knowledge.', icon: BookOpen },
  { title: 'Experiment', text: 'Test ideas in a supportive space.', icon: Lightbulb },
  { title: 'Build', text: 'Turn concepts into practical work.', icon: Wrench },
  { title: 'Share', text: 'Give back through demos and exchange.', icon: Share2 },
  { title: 'Impact', text: 'Create value beyond the classroom.', icon: Rocket },
]

function ClubJourney() {
  return <section className="about-section about-journey" id="journey"><div className="about-shell"><Reveal><SectionIntro eyebrow="FROM LEARNING TO IMPACT" title="A path that keeps moving forward." /></Reveal><div className="about-journey-list">{journey.map(({ title, text, icon: Icon }, index) => <Reveal className="about-journey-item" key={title} delay={index * .06}><div className="about-journey-icon"><Icon size={19} /></div><div><h3><T>{title}</T></h3><p><T>{text}</T></p></div>{index < journey.length - 1 && <span className="about-journey-connector" aria-hidden="true" />}</Reveal>)}</div></div></section>
}

const experiences = [
  { title: 'Workshops', icon: BookOpen, className: 'experience-large' }, { title: 'Mentorship', icon: GraduationCap, className: '' }, { title: 'Tech Talks', icon: MessageCircle, className: '' }, { title: 'Hackathons', icon: Trophy, className: '' }, { title: 'Competitions', icon: Target, className: '' }, { title: 'Industry Visits', icon: BriefcaseBusiness, className: 'experience-wide' }, { title: 'Community Events', icon: Handshake, className: 'experience-wide' },
]

function ClubExperience() {
  return <section className="about-section about-experience"><div className="about-shell"><Reveal><SectionIntro eyebrow="REAL DSCC EXPERIENCE" title="Spaces to practice, exchange and grow." /></Reveal><div className="about-experience-mosaic">{experiences.map(({ title, icon: Icon, className }, index) => <Reveal key={title} delay={index * .04}><div className={`about-experience-tile ${className}`}><Icon size={19} /><span><T>{title}</T></span><b>0<T>{index + 1}</T></b></div></Reveal>)}</div></div></section>
}

const values = [
  { title: 'Curiosity', text: 'We keep asking better questions.', icon: Sparkles },
  { title: 'Collaboration', text: 'We move further when we build together.', icon: Users },
  { title: 'Learning by Doing', text: 'We turn theory into experience.', icon: Wrench },
  { title: 'Impact', text: 'We make our work useful to others.', icon: Target },
]

function Values() {
  return <section className="about-section about-values"><div className="about-shell"><Reveal><SectionIntro eyebrow="OUR VALUES" title="The way we show up." /></Reveal><div className="about-values-grid">{values.map(({ title, text, icon: Icon }, index) => <Reveal key={title} delay={index * .06}><div className="about-value"><Icon size={20} /><h3><T>{title}</T></h3><p><T>{text}</T></p></div></Reveal>)}</div></div></section>
}

function Philosophy() {
  return <section className="about-philosophy"><div className="about-philosophy-mark">“</div><Reveal><span className="about-eyebrow"><T>OUR PHILOSOPHY</T></span><h2><T>Students Today.</T><br /><span><T>Builders Tomorrow.</T></span></h2><p><T>We believe the best way to understand technology is to explore it, build with it, and share what we learn.</T></p></Reveal></section>
}

function TeamSection() {
  return <section className="about-section about-team" id="team"><div className="about-shell"><Reveal><SectionIntro eyebrow="THE PEOPLE BEHIND DSCC" title="Meet the Team" ><T>The students turning ideas into workshops, projects, events and opportunities for the DSCC community.</T></SectionIntro></Reveal><TeamCarousel /></div></section>
}

export default function AboutPage() {
  const [content, setContent] = useState(defaultAboutContent)
  useEffect(() => setContent(getAboutContent()), [])
  return <div className="about-page"><AboutHero hero={content.hero} /><WhoWeAre /><WhatWeDo /><TechEcosystem /><ClubJourney /><ClubExperience /><Philosophy /><Values /><TeamSection /></div>
}
