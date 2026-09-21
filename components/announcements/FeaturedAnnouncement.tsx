import { ArrowRight, Megaphone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Announcement } from '@/types/announcement'
import { formatAnnouncementDate } from '@/lib/announcements'

export default function FeaturedAnnouncement({ announcement }: { announcement: Announcement }) {
  return <article className="announcement-featured-card"><div className="announcement-featured-copy"><div className="announcement-featured-top"><span className="announcement-pinned">PINNED</span><span className="announcement-category">{announcement.category}</span><time dateTime={announcement.date}>{formatAnnouncementDate(announcement.date)}</time></div><h2>{announcement.title}</h2><p>{announcement.description}</p><Link className="announcement-read-link" href={`/announcements/${announcement.slug}`}>Read announcement <ArrowRight size={16} /></Link></div><div className="announcement-featured-visual" aria-hidden="true">{announcement.image ? <Image src={announcement.image} alt="" fill sizes="(max-width: 767px) 100vw, 40vw" /> : <><span className="featured-visual-kicker">DSCC / COMMUNITY</span><Megaphone size={52} /><b>PEOPLE · IDEAS · ACTION</b></>}</div></article>
}
