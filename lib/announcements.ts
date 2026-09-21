import announcementsJson from '@/data/announcements.json'
import type { Announcement } from '@/types/announcement'

const announcements = announcementsJson as Announcement[]

export function getAnnouncements(): Announcement[] {
  return [...announcements].sort((a, b) => b.date.localeCompare(a.date))
}

export function getPinnedAnnouncement(): Announcement | undefined {
  return getAnnouncements().find((announcement) => announcement.pinned)
}

export function getAnnouncementBySlug(slug: string): Announcement | undefined {
  return announcements.find((announcement) => announcement.slug === slug)
}

export function getAnnouncementCategories(): string[] {
  return Array.from(new Set(getAnnouncements().map((announcement) => announcement.category)))
}

export function formatAnnouncementDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`))
}
