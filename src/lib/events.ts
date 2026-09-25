import rawEvents from '@/src/data/events.json'
import type { EventItem } from '@/types/siteContent'

const events = rawEvents as EventItem[]

export function getEvents(pastOnly = false): EventItem[] {
  return [...events]
    .filter((event) => (pastOnly ? event.status === 'past' || Boolean(event.past) : event.status !== 'past' && !event.past))
    .sort((a, b) => (pastOnly ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)))
}

export function getAllEvents(): EventItem[] {
  return [...events].sort((a, b) => b.date.localeCompare(a.date))
}

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((event) => event.slug === slug)
}
