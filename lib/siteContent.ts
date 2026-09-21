import eventsJson from '@/data/events.json'
import openlabJson from '@/data/openlab.json'
import resourcesJson from '@/data/resources.json'
import type { EventItem, HubCard, NewsItem, ProjectItem, ResourceItem } from '@/types/siteContent'
import { getNews, getNewsBySlug } from './news'

const events = eventsJson as EventItem[]
const projects = openlabJson as ProjectItem[]
const resources = resourcesJson as ResourceItem[]

export const formatSiteDate = (value: string) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`))
export const getEvents = (past = false) => [...events].filter((event) => Boolean(event.past) === past).sort((a, b) => past ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date))
export const getProjects = () => projects
export const getResources = () => resources

export function eventCards(past = false): HubCard[] { return getEvents(past).map((item) => ({ id: item.id, title: item.title, description: item.description, meta: `${formatSiteDate(item.date)} · ${item.location}`, eyebrow: item.category, image: item.image, href: item.link || undefined, action: item.link ? 'Event details' : undefined })) }
export function newsCards(): HubCard[] { return getNews().map((item) => ({ id: item.id, title: item.title, description: item.excerpt, meta: formatSiteDate(item.date), eyebrow: 'DSCC NEWS', image: item.image, href: `/news/${item.slug}`, action: 'Read story' })) }
export function projectCards(): HubCard[] { return getProjects().map((item) => ({ id: item.id, title: item.title, description: item.description, meta: item.status, eyebrow: 'PROJECT', tags: item.tags, href: item.link || undefined, action: item.link ? 'Explore project' : undefined })) }
export function resourceCards(): HubCard[] { return getResources().map((item) => ({ id: item.id, title: item.name, description: item.description, meta: item.type, eyebrow: item.category, href: item.url || undefined, action: item.url ? 'Open resource' : undefined })) }
