'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, BrainCircuit, BriefcaseBusiness, BookOpen, Cloud, Code2, Database, GraduationCap, Handshake, Lightbulb, Linkedin, MessageCircle, Network, Rocket, Share2, Sparkles, Target, Trophy, Users, Wrench } from 'lucide-react'
import { useRef } from 'react'
import { team } from './teamData'

const ease = [.22, 1, .36, 1] as const

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: .18 })
  const reduce = useReducedMotion()
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: .5, delay: reduce ? 0 : delay, ease }}>{children}</motion.div>
}

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className="about-section-intro"><span className="about-eyebrow">{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>
}

function EcosystemVisual() {
  return <div className="about-ecosystem" aria-label="DSCC ecosystem from students to impact">
    <div className="about-ecosystem-orbit about-ecosystem-orbit-one" /><div className="about-ecosystem-orbit about-ecosystem-orbit-two" />
    <svg className="about-ecosystem-lines" viewBox="0 0 520 460" fill="none" aria-hidden="true"><path d="M93 102C164 143 191 206 260 230S361 283 426 354" /><path d="M426 101C354 143 327 202 260 230S155 282 93 354" /><path d="M260 50V410" /><circle cx="93" cy="102" r="4" /><circle cx="426" cy="101" r="4" /><circle cx="93" cy="354" r="4" /><circle cx="426" cy="354" r="4" /></svg>
    <div className="about-eco-node about-eco-center"><Sparkles size={17} /><strong>DSCC</strong><span>COMMUNITY</span></div>
    <div className="about-eco-node about-eco-students"><Users size={17} /><span>Students</span></div>
    <div className="about-eco-node about-eco-learn"><BookOpen size={17} /><span>Learn</span></div>
    <div className="about-eco-node about-eco-build"><Code2 size={17} /><span>Build</span></div>
    <div className="about-eco-node about-eco-impact"><Target size={17} /><span>Impact</span></div>
    <div className="about-eco-mini about-eco-ai"><BrainCircuit size={14} /><span>AI</span></div><div className="about-eco-mini about-eco-cloud"><Cloud size={14} /><span>Cloud</span></div>
  </div>
}

function AboutHero() {
  const reduce = useReducedMotion()
  return <section className="about-hero"><div className="about-shell about-hero-shell"><motion.div className="about-hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease }}><span className="about-eyebrow">ABOUT DSCC</span><h1>More Than a Club.<br /><span>A Community Building Tomorrow.</span></h1><p>The Data Science &amp; Cloud Computing Club at ENSAO is a student-led community where curious minds learn, experiment, collaborate, and turn ideas into real experiences.</p><div className="about-actions"><a className="about-button about-button-primary" href="#team">Meet Our Team <ArrowRight size={17} /></a><a className="about-button about-button-secondary" href="#journey">Explore Our Journey <ArrowRight size={16} /></a></div></motion.div><motion.div className="about-hero-visual-wrap" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6, delay: reduce ? 0 : .12, ease }}><EcosystemVisual /></motion.div></div></section>
}

const capabilities = [
  { title: 'Learn', text: 'Workshops, mentorship and technical resources that help students strengthen their skills.', icon: BookOpen },
  { title: 'Build', text: 'Hands-on projects and challenges that transform concepts into practical experience.', icon: Code2 },
  { title: 'Connect', text: 'Connecting students with each other, professionals, speakers and the technology ecosystem.', icon: Network },
  { title: 'Compete', text: 'Hackathons, data competitions and collaborative challenges that push students further.', icon: Trophy },
]

function WhoWeAre() {
  return <section className="about-section about-who"><div className="about-shell about-two-column"><Reveal><SectionIntro eyebrow="WHO WE ARE" title="Built by Students, for Students." /><p className="about-body-copy">DSCC is the Data Science &amp; Cloud Computing Club at ENSAO. We create opportunities to learn beyond traditional coursework through collaboration, technical activities, projects, and exchanges with the broader technology ecosystem.</p></Reveal><Reveal className="about-focus-list" delay={.08}><span>OUR FOCUS</span>{['Data Science', 'Artificial Intelligence', 'Cloud Computing', 'Data Engineering', 'Technology & Innovation'].map((item, index) => <div key={item}><b>0{index + 1}</b><span>{item}</span></div>)}</Reveal></div></section>
}

function WhatWeDo() {
  return <section className="about-section about-do"><div className="about-shell"><Reveal><SectionIntro eyebrow="WHAT WE DO" title="Make room to learn, then make something real." /></Reveal><div className="about-capability-grid">{capabilities.map(({ title, text, icon: Icon }, index) => <Reveal key={title} delay={index * .06}><div className="about-capability"><div className="about-icon-circle"><Icon size={20} /></div><div><h3>{title}</h3><p>{text}</p></div></div></Reveal>)}</div></div></section>
}

const fields = ['AI', 'Data Science', 'Cloud Computing', 'Data Engineering', 'Machine Learning', 'Generative AI', 'DevOps', 'Business Intelligence']

function TechEcosystem() {
  return <section className="about-section about-playground"><div className="about-shell about-playground-shell"><Reveal><SectionIntro eyebrow="OUR PLAYGROUND" title="The technologies shaping what we learn and build." /></Reveal><Reveal className="about-field-map" delay={.1}><div className="about-field-map-lines" aria-hidden="true" /><div className="about-field-core"><Database size={19} /><span>DSCC<br /><small>ECOSYSTEM</small></span></div>{fields.map((field, index) => <span className={`about-field-pill about-field-pill-${index + 1}`} key={field}>{field}</span>)}</Reveal></div></section>
}

const journey = [
  { title: 'Learn', text: 'Start with questions and shared knowledge.', icon: BookOpen },
  { title: 'Experiment', text: 'Test ideas in a supportive space.', icon: Lightbulb },
  { title: 'Build', text: 'Turn concepts into practical work.', icon: Wrench },
  { title: 'Share', text: 'Give back through demos and exchange.', icon: Share2 },
  { title: 'Impact', text: 'Create value beyond the classroom.', icon: Rocket },
]

function ClubJourney() {
  return <section className="about-section about-journey" id="journey"><div className="about-shell"><Reveal><SectionIntro eyebrow="FROM LEARNING TO IMPACT" title="A path that keeps moving forward." /></Reveal><div className="about-journey-list">{journey.map(({ title, text, icon: Icon }, index) => <Reveal className="about-journey-item" key={title} delay={index * .06}><div className="about-journey-icon"><Icon size={19} /></div><div><h3>{title}</h3><p>{text}</p></div>{index < journey.length - 1 && <span className="about-journey-connector" aria-hidden="true" />}</Reveal>)}</div></div></section>
}

const experiences = [
  { title: 'Workshops', icon: BookOpen, className: 'experience-large' }, { title: 'Mentorship', icon: GraduationCap, className: '' }, { title: 'Tech Talks', icon: MessageCircle, className: '' }, { title: 'Hackathons', icon: Trophy, className: '' }, { title: 'Competitions', icon: Target, className: '' }, { title: 'Industry Visits', icon: BriefcaseBusiness, className: 'experience-wide' }, { title: 'Community Events', icon: Handshake, className: 'experience-wide' },
]

function ClubExperience() {
  return <section className="about-section about-experience"><div className="about-shell"><Reveal><SectionIntro eyebrow="REAL DSCC EXPERIENCE" title="Spaces to practice, exchange and grow." /></Reveal><div className="about-experience-mosaic">{experiences.map(({ title, icon: Icon, className }, index) => <Reveal key={title} delay={index * .04}><div className={`about-experience-tile ${className}`}><Icon size={19} /><span>{title}</span><b>0{index + 1}</b></div></Reveal>)}</div></div></section>
}

const values = [
  { title: 'Curiosity', text: 'We keep asking better questions.', icon: Sparkles },
  { title: 'Collaboration', text: 'We move further when we build together.', icon: Users },
  { title: 'Learning by Doing', text: 'We turn theory into experience.', icon: Wrench },
  { title: 'Impact', text: 'We make our work useful to others.', icon: Target },
]

function Values() {
  return <section className="about-section about-values"><div className="about-shell"><Reveal><SectionIntro eyebrow="OUR VALUES" title="The way we show up." /></Reveal><div className="about-values-grid">{values.map(({ title, text, icon: Icon }, index) => <Reveal key={title} delay={index * .06}><div className="about-value"><Icon size={20} /><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div></div></section>
}

function Philosophy() {
  return <section className="about-philosophy"><div className="about-philosophy-mark">“</div><Reveal><span className="about-eyebrow">OUR PHILOSOPHY</span><h2>Students Today.<br /><span>Builders Tomorrow.</span></h2><p>We believe the best way to understand technology is to explore it, build with it, and share what we learn.</p></Reveal></section>
}

function TeamCard({ member, index }: { member: typeof team[number]; index: number }) {
  const hasProfile = Boolean(member.name && member.image)
  return <motion.article className={`about-team-card ${index === 0 ? 'about-team-president' : ''}`} whileHover={{ y: -4 }} transition={{ duration: .22 }}><div className="about-team-portrait">{hasProfile ? <img src={member.image} alt={member.name} /> : <span>{member.role.slice(0, 1)}</span>}</div><div className="about-team-meta"><h3>{member.name || 'Profile coming soon'}</h3><p>{member.role}</p>{member.description && <small>{member.description}</small>}{member.linkedin && <a href={member.linkedin} aria-label={`${member.name} on LinkedIn`}><Linkedin size={15} /></a>}</div></motion.article>
}

function TeamSection() {
  return <section className="about-section about-team" id="team"><div className="about-shell"><Reveal><SectionIntro eyebrow="THE PEOPLE BEHIND DSCC" title="Meet the Team" >The students turning ideas into workshops, projects, events and opportunities for the DSCC community.</SectionIntro></Reveal><div className="about-team-grid">{team.map((member, index) => <Reveal key={member.role} delay={index * .07}><TeamCard member={member} index={index} /></Reveal>)}</div><div className="about-team-actions"><p>Approved team profiles can be added in <code>components/about/teamData.ts</code>.</p><a className="about-text-link" href="#team">Meet the Full Team <ArrowRight size={15} /></a></div></div></section>
}

function FinalCta() {
  return <section className="about-final-cta"><div className="about-shell"><Reveal><span className="about-eyebrow">START HERE</span><h2>Your Journey Could Start Here.</h2><p>Learn with us. Build with us. Grow with us.</p><div className="about-actions"><a className="about-button about-button-primary" href="/contact">Join DSCC <ArrowRight size={17} /></a><a className="about-button about-button-secondary" href="/events">Explore Events <ArrowRight size={16} /></a></div></Reveal></div></section>
}

export default function AboutPage() {
  return <div className="about-page"><AboutHero /><WhoWeAre /><WhatWeDo /><TechEcosystem /><ClubJourney /><ClubExperience /><Philosophy /><Values /><TeamSection /><FinalCta /></div>
}
