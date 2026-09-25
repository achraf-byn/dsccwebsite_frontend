import { getEvents as getEventsHelper, getAllEvents, getEventBySlug } from './events'
import { getOpenLabProjects, getOpenLabBySlug } from './openlab'
import { getDriveResources } from './drive'
import { getNews, getNewsBySlug } from './news'
import type { HubCard } from '@/types/siteContent'

export const formatSiteDate = (value: string) => {
  if (!value) return ''
  try {
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`))
  } catch {
    return value
  }
}

export const getEvents = getEventsHelper
export const getProjects = getOpenLabProjects
export const getResources = getDriveResources

export function eventCards(past = false): HubCard[] {
  return getEventsHelper(past).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    meta: item.location ? `${formatSiteDate(item.date)} · ${item.location}` : formatSiteDate(item.date),
    eyebrow: item.category,
    image: item.image || undefined,
    href: `/events/${item.slug}`,
    action: 'Read More →'
  }))
}

export function newsCards(): HubCard[] {
  return getNews().map((item) => ({
    id: item.id,
    title: item.title,
    description: item.excerpt,
    meta: formatSiteDate(item.date),
    eyebrow: 'DSCC NEWS',
    image: item.image,
    href: `/news/${item.slug}`,
    action: 'Read story'
  }))
}

export function projectCards(): HubCard[] {
  return getOpenLabProjects().map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    meta: item.status,
    eyebrow: item.category || 'PROJECT',
    tags: item.technologies || item.tags,
    image: item.image || undefined,
    href: `/openlab/${item.slug}`,
    action: 'Read More →'
  }))
}

export function resourceCards(): HubCard[] {
  return getDriveResources().map((item) => ({
    id: item.id,
    title: item.title || item.name || '',
    description: item.description,
    meta: item.category,
    eyebrow: item.category,
    image: item.image || undefined,
    href: item.driveUrl || undefined,
    action: item.driveUrl ? 'Open Drive ↗' : undefined,
    disabled: !item.driveUrl,
    badge: !item.driveUrl ? 'Coming soon' : undefined
  }))
}
