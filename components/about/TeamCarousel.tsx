'use client'

import { T } from '@/lib/i18n/LanguageProvider'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { getTeamMembers, type PublicTeamMember } from '@/lib/team'

function TeamCard({ member, index, duplicate }: { member: PublicTeamMember; index: number; duplicate: boolean }) {
  const [failedImage, setFailedImage] = useState<string | null>(null)
  const initial = Array.from(member.name.trim())[0]?.toLocaleUpperCase() || '?'
  const portrait = member.image && member.image !== failedImage
    ? <img className="team-avatar" src={member.image} alt={member.name} draggable={false} onError={() => setFailedImage(member.image)} />
    : <span className="team-avatar">{initial}</span>

  return <motion.article data-team-card className={`about-team-card ${index < 2 ? 'about-team-leadership' : ''}`} tabIndex={-1} whileHover={{ y: -4 }} whileTap={{ scale: .97 }} transition={{ duration: .22 }}>
    <div className="about-team-portrait">
      {member.linkedin ? <a className="about-team-portrait-link" href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Open ${member.name}'s LinkedIn profile`} tabIndex={duplicate ? -1 : undefined} draggable={false}>{portrait}</a> : portrait}
    </div>
    <div className="about-team-meta"><h3>{member.name}</h3><p><T>{member.role}</T></p></div>
  </motion.article>
}

export default function TeamCarousel({ className = '' }: { className?: string }) {
  const members = getTeamMembers()
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const setRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)
  const distanceRef = useRef(0)
  const drag = useRef({ active: false, moved: false, startX: 0, startOffset: 0 })
  const resumeTimer = useRef<number | null>(null)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const reduce = useReducedMotion()
  const shouldPause = paused || hovered || focused || reduce
  const pauseRef = useRef(Boolean(shouldPause))
  pauseRef.current = Boolean(shouldPause)
  // A fixed pixel speed stays readable at every responsive card width.
  const pixelsPerSecond = 35
  const wrap = (value: number, distance: number) => ((value % distance) + distance) % distance

  useEffect(() => {
    const track = trackRef.current
    const set = setRef.current
    if (!track || !set) return
    const measure = () => {
      // Each set includes its trailing gap, so this is exactly A[0] -> B[0].
      const distance = set.getBoundingClientRect().width
      if (!distance || distance === distanceRef.current) return
      const previous = animationRef.current
      const previousOffset = Number(previous?.currentTime || 0) * pixelsPerSecond / 1000
      const progress = distanceRef.current ? wrap(previousOffset, distanceRef.current) / distanceRef.current : 0
      previous?.cancel()
      distanceRef.current = distance
      const animation = track.animate([
        { transform: 'translate3d(0, 0, 0)' },
        { transform: `translate3d(${-distance}px, 0, 0)` },
      ], { duration: distance / pixelsPerSecond * 1000, iterations: Infinity, easing: 'linear' })
      animation.currentTime = progress * distance / pixelsPerSecond * 1000
      if (pauseRef.current) animation.pause()
      animationRef.current = animation
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(set)
    return () => { observer.disconnect(); animationRef.current?.cancel(); animationRef.current = null; distanceRef.current = 0 }
  }, [])

  useEffect(() => {
    if (shouldPause) animationRef.current?.pause()
    else animationRef.current?.play()
  }, [shouldPause])

  const pauseTemporarily = () => {
    setPaused(true)
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setPaused(false), 1200)
  }

  useEffect(() => () => { if (resumeTimer.current) window.clearTimeout(resumeTimer.current) }, [])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    animationRef.current?.pause()
    drag.current = { active: true, moved: false, startX: event.clientX, startOffset: Number(animationRef.current?.currentTime || 0) * pixelsPerSecond / 1000 }
    setPaused(true)
  }
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    // Leave taps with the anchor; capture only once the user starts dragging.
    if (!drag.current.moved && Math.abs(event.clientX - drag.current.startX) > 6) {
      drag.current.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    if (!drag.current.moved) return
    const distance = distanceRef.current
    if (animationRef.current && distance) {
      const offset = wrap(drag.current.startOffset - (event.clientX - drag.current.startX), distance)
      animationRef.current.currentTime = offset / pixelsPerSecond * 1000
    }
  }
  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    drag.current.active = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    pauseTemporarily()
  }

  return <div className={`about-team-carousel-wrap ${className}`}><div className="about-team-carousel" ref={viewportRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onClickCapture={event => {
    if (drag.current.moved && event.detail !== 0) { event.preventDefault(); event.stopPropagation() }
  }} onPointerLeave={event => {
    if (drag.current.active && !drag.current.moved) onPointerUp(event)
  }} onScroll={event => {
    // Keyboard focus must not leave a second, native scroll offset on the viewport.
    if (event.currentTarget.scrollLeft) event.currentTarget.scrollLeft = 0
  }} onFocusCapture={event => {
    setFocused(true)
    animationRef.current?.pause()
    const card = (event.target as HTMLElement).closest<HTMLElement>('[data-team-card]')
    const viewport = event.currentTarget.getBoundingClientRect()
    const bounds = card?.getBoundingClientRect()
    if (card && bounds && (bounds.left < viewport.left || bounds.right > viewport.right) && animationRef.current && distanceRef.current) {
      animationRef.current.currentTime = wrap(card.offsetLeft, distanceRef.current) / pixelsPerSecond * 1000
    }
  }} onBlurCapture={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) { setFocused(false); pauseTemporarily() }
  }} aria-label="DSCC team members"><div className={`about-team-track ${shouldPause ? 'is-paused' : ''}`} ref={trackRef}>{[false, true].map(duplicate => <div className="team-set" key={duplicate ? 'repeat' : 'original'} ref={duplicate ? undefined : setRef} aria-hidden={duplicate ? true : undefined}>{members.map((member, index) => <TeamCard key={member.id} member={member} index={index} duplicate={duplicate} />)}</div>)}</div></div></div>
}
