import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatAnnouncementDate } from '@/lib/announcements'
import type { Announcement } from '@/types/announcement'

export default function AnnouncementDetailPage({ announcement }: { announcement: Announcement }) {
  return <main className="announcement-detail-page"><div className="announcement-detail-shell"><Link className="announcement-back-link" href="/announcements"><ArrowLeft size={16} /> Back to Announcements</Link><article className="announcement-article"><header><div className="announcement-article-meta"><span className="announcement-category">{announcement.category}</span><span>·</span><time dateTime={announcement.date}>{formatAnnouncementDate(announcement.date)}</time></div><h1>{announcement.title}</h1><p className="announcement-article-intro">{announcement.description}</p></header>{announcement.image && <Image className="announcement-article-image" src={announcement.image} width={1200} height={600} alt="" />}<div className="announcement-article-content">{announcement.content.split(/\n\n+/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article></div></main>
}
