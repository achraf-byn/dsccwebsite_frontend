import { T } from '@/lib/i18n/LanguageProvider'
import { ArrowLeft, CalendarDays, Clock, MapPin, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatSiteDate } from '@/lib/siteContent'
import type { EventItem } from '@/types/siteContent'

export default function EventDetailPage({ event }: { event: EventItem }) {
  return (
    <main className="article-page">
      <div className="article-shell">
        <Link className="article-back" href="/events">
          <ArrowLeft size={16} />
          <T> Back to Events</T>
        </Link>
        <article className="article-content">
          <div className="article-meta">
            <T>{event.category}</T>
            <span>·</span>
            <T>{event.status === 'past' ? 'Past Event' : 'Upcoming Event'}</T>
          </div>
          <h1><T>{event.title}</T></h1>
          <p className="article-intro"><T>{event.description}</T></p>
          
          <div
            className="event-detail-meta-box"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              margin: '24px 0 32px',
              padding: '16px 20px',
              background: 'color-mix(in srgb, var(--surface) 90%, var(--pale))',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              fontSize: '13px',
              color: 'var(--slate)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarDays size={16} style={{ color: 'var(--blue)' }} />
              <strong><T>Date:</T></strong> <span><T>{formatSiteDate(event.date)}</T></span>
            </div>
            {event.time && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} style={{ color: 'var(--blue)' }} />
                <strong><T>Time:</T></strong> <span><T>{event.time}</T></span>
              </div>
            )}
            {event.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--blue)' }} />
                <strong><T>Location:</T></strong> <span><T>{event.location}</T></span>
              </div>
            )}
          </div>

          {event.image && (
            <Image
              className="article-image"
              src={event.image}
              width={1200}
              height={600}
              alt=""
              unoptimized
            />
          )}

          <div className="article-body">
            {event.content.split(/\n\n+/).map((paragraph, idx) => (
              <p key={idx}><T>{paragraph}</T></p>
            ))}
          </div>

          {event.registrationUrl && (
            <div style={{ marginTop: '36px' }}>
              <a
                className="hero-button hero-button-primary"
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <T>Register for Event</T> <ExternalLink size={15} />
              </a>
            </div>
          )}
        </article>
      </div>
    </main>
  )
}
