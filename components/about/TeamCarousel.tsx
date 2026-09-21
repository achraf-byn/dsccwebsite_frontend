'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { PublicTeamMember } from '@/lib/team'

function TeamCard({ member, index, onHoverChange }: { member: PublicTeamMember; index: number; onHoverChange?: (hovered: boolean) => void }) {
  const [showLinkedIn, setShowLinkedIn] = useState(false)
  const portrait = member.image ? <img src={member.image} alt={member.name} /> : <span>{member.initial || member.name.slice(0, 1)}</span>

  return <motion.article className={`about-team-card ${index < 2 ? 'about-team-leadership' : ''}`} onMouseEnter={() => onHoverChange?.(true)} onMouseLeave={() => onHoverChange?.(false)} whileHover={{ y: -4 }} whileTap={{ scale: .97 }} transition={{ duration: .22 }}>
    <div className="about-team-portrait">
      {member.linkedinUrl ? <><button type="button" className="about-team-portrait-button" onClick={() => setShowLinkedIn((current) => !current)} aria-label={`Show LinkedIn for ${member.name}`} aria-expanded={showLinkedIn}>{portrait}</button>{showLinkedIn && <a className="about-team-linkedin-popover" href={member.linkedinUrl} target="_blank" rel="noreferrer">in&nbsp; View LinkedIn <ArrowRight size={12} /></a>}</> : portrait}
    </div>
    <div className="about-team-meta"><h3>{member.name}</h3><p>{member.role}</p></div>
  </motion.article>
}

export default function TeamCarousel({ members, className = '' }: { members: PublicTeamMember[]; className?: string }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0 })
  const resumeTimer = useRef<number | null>(null)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const carouselMembers = [...members, ...members]

  const pauseTemporarily = () => {
    setPaused(true)
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setPaused(false), 1200)
  }

  useEffect(() => () => { if (resumeTimer.current) window.clearTimeout(resumeTimer.current) }, [])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    drag.current = { active: true, startX: event.clientX, startScroll: event.currentTarget.scrollLeft }
    event.currentTarget.setPointerCapture(event.pointerId)
    setPaused(true)
  }
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    event.currentTarget.scrollLeft = drag.current.startScroll - (event.clientX - drag.current.startX)
  }
  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    drag.current.active = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    pauseTemporarily()
  }

  return <div className={`about-team-carousel-wrap ${className}`}><div className="about-team-carousel" ref={viewportRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} aria-label="DSCC team members"><div className={`about-team-track ${paused || reduce ? 'is-paused' : ''}`}>{carouselMembers.map((member, index) => <TeamCard key={`${member.order}-${index}`} member={member} index={index % members.length} onHoverChange={setPaused} />)}</div></div></div>
}
