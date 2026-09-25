import { T } from '@/lib/i18n/LanguageProvider'
import { ArrowRight, Megaphone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Announcement } from '@/types/announcement'
import { formatAnnouncementDate } from '@/lib/announcements'

export default function FeaturedAnnouncement({ announcement }: { announcement: Announcement }) {
  return <article className="announcement-featured-card"><div className="announcement-featured-copy"><div className="announcement-featured-top"><span className="announcement-pinned"><T>PINNED</T></span><span className="announcement-category"><T>{announcement.category}</T></span><time dateTime={announcement.date}><T>{formatAnnouncementDate(announcement.date)}</T></time></div><h2><T>{announcement.title}</T></h2><p><T>{announcement.description}</T></p><Link className="announcement-read-link" href={`/announcements/${announcement.slug}`}><T>Read announcement </T><ArrowRight size={16} /></Link></div><div className="announcement-featured-visual" aria-hidden="true">{announcement.image ? <Image src={announcement.image} alt="" fill sizes="(max-width: 767px) 100vw, 40vw" /> : <><span className="featured-visual-kicker"><T>DSCC / COMMUNITY</T></span><Megaphone size={52} /><b><T>PEOPLE · IDEAS · ACTION</T></b></>}</div></article>
}
