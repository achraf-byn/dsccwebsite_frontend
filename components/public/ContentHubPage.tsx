'use client'

import { T } from '@/lib/i18n/LanguageProvider'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, FlaskConical, FolderOpen, Newspaper } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { HubCard } from '@/types/siteContent'

const icons = { events: CalendarDays, news: Newspaper, openlab: FlaskConical, drive: FolderOpen } as const

export default function ContentHubPage({
  eyebrow,
  title,
  description,
  cards,
  kind,
  sectionTitle,
  secondaryCards,
  secondaryTitle
}: {
  eyebrow: string
  title: string
  description: string
  cards: HubCard[]
  kind: keyof typeof icons
  sectionTitle: string
  secondaryCards?: HubCard[]
  secondaryTitle?: string
}) {
  const Icon = icons[kind]
  const reduce = useReducedMotion()

  const renderCards = (items: HubCard[]) => (
    <div className="hub-card-grid">
      {items.map((card, index) => {
        const isExternal = card.href && !card.href.startsWith('/')

        return (
          <motion.article
            className="hub-card"
            key={card.id}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: reduce ? 0 : index * 0.06 }}
            whileTap={{ scale: 0.98 }}
          >
            {card.image ? (
              <div className="hub-card-image">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 50vw, (max-width: 1023px) 50vw, 33vw"
                  unoptimized
                />
              </div>
            ) : (
              <div className="hub-card-art" aria-hidden="true">
                <Icon size={22} />
              </div>
            )}
            <div className="hub-card-body">
              <div className="hub-card-meta">
                <span><T>{card.eyebrow}</T></span>
                <small><T>{card.meta}</T></small>
              </div>
              <h3><T>{card.title}</T></h3>
              <p><T>{card.description}</T></p>
              {card.tags && card.tags.length > 0 && (
                <div className="hub-tags">
                  {card.tags.map((tag) => (
                    <span key={tag}><T>{tag}</T></span>
                  ))}
                </div>
              )}
              {card.href ? (
                isExternal ? (
                  <a
                    className="hub-card-link"
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <T>{card.action || 'Open Drive ↗'}</T>
                  </a>
                ) : (
                  <Link className="hub-card-link" href={card.href}>
                    <T>{card.action || 'Read More →'}</T>
                  </Link>
                )
              ) : (
                <span className="hub-card-link is-disabled" style={{ opacity: 0.65, cursor: 'default' }}>
                  <T>{card.badge || 'Coming soon'}</T>
                </span>
              )}
            </div>
          </motion.article>
        )
      })}
    </div>
  )

  const renderSection = (label: string, items: HubCard[]) => (
    <div className="hub-subsection">
      <div className="hub-section-heading">
        <div>
          <span className="about-eyebrow"><T>{label.toUpperCase()}</T></span>
          <h2><T>{kind === 'events' && label === 'Upcoming Events' ? 'Learn. Connect. Experience.' : label}</T></h2>
        </div>
        <span><T>{String(items.length)}</T> <T>{items.length === 1 ? 'item' : 'items'}</T></span>
      </div>
      {renderCards(items)}
    </div>
  )

  return (
    <main className={`hub-page hub-${kind}`}>
      <section className="hub-hero">
        <div className="hub-shell hub-hero-inner">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48 }}>
            <span className="about-eyebrow"><Icon size={14} /> <T>{eyebrow}</T></span>
            <h1><T>{title}</T></h1>
            <p><T>{description}</T></p>
          </motion.div>
          <div className="hub-hero-orbit" aria-hidden="true">
            <Icon size={33} /><i /><i /><i />
          </div>
        </div>
      </section>
      <section className="hub-content">
        <div className="hub-shell">
          {renderSection(sectionTitle, cards)}
          {secondaryCards && secondaryTitle && renderSection(secondaryTitle, secondaryCards)}
        </div>
      </section>
    </main>
  )
}
