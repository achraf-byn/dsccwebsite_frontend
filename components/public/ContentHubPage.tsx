'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, CalendarDays, ExternalLink, FlaskConical, FolderOpen, MapPin, Newspaper, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import type { HubCard } from '@/types/siteContent'

const icons = { events: CalendarDays, news: Newspaper, openlab: FlaskConical, drive: FolderOpen } as const

export default function ContentHubPage({ eyebrow, title, description, cards, kind, sectionTitle, secondaryCards, secondaryTitle }: { eyebrow: string; title: string; description: string; cards: HubCard[]; kind: keyof typeof icons; sectionTitle: string; secondaryCards?: HubCard[]; secondaryTitle?: string }) {
  const Icon = icons[kind]
  const reduce = useReducedMotion()
  const renderCards = (items: HubCard[]) => <div className="hub-card-grid">{items.map((card, index) => <motion.article className="hub-card" key={card.id} initial={{ opacity: 0, y: 20, scale: .98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .45, delay: reduce ? 0 : index * .06 }} whileTap={{ scale: .98 }}>{card.image ? <div className="hub-card-image"><Image src={card.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" /></div> : <div className="hub-card-art" aria-hidden="true"><Icon size={22} /></div>}<div className="hub-card-body"><div className="hub-card-meta"><span>{card.eyebrow}</span><small>{card.meta}</small></div><h3>{card.title}</h3><p>{card.description}</p>{card.tags && <div className="hub-tags">{card.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}{card.href && (card.href.startsWith('/') ? <Link className="hub-card-link" href={card.href}>{card.action || 'Explore'} <ArrowUpRight size={15} /></Link> : <a className="hub-card-link" href={card.href} target="_blank" rel="noreferrer">{card.action || 'Open'} <ExternalLink size={15} /></a>)}{kind === 'events' && <span className="hub-card-detail"><MapPin size={13} /> Details will be shared with the community.</span>}</div></motion.article>)}</div>
  const renderSection = (label: string, items: HubCard[]) => <div className="hub-subsection"><div className="hub-section-heading"><div><span className="about-eyebrow">{label.toUpperCase()}</span><h2>{kind === 'events' && label === 'Upcoming Events' ? 'Learn. Connect. Experience.' : label}</h2></div><span>{items.length} {items.length === 1 ? 'item' : 'items'}</span></div>{renderCards(items)}</div>
  return <main className={`hub-page hub-${kind}`}><section className="hub-hero"><div className="hub-shell hub-hero-inner"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .48 }}><span className="about-eyebrow"><Icon size={14} /> {eyebrow}</span><h1>{title}</h1><p>{description}</p></motion.div><div className="hub-hero-orbit" aria-hidden="true"><Icon size={33} /><i /><i /><i /></div></div></section><section className="hub-content"><div className="hub-shell">{renderSection(sectionTitle, cards)}{secondaryCards && secondaryTitle && renderSection(secondaryTitle, secondaryCards)}</div></section></main>
}
