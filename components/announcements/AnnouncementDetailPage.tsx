import { T } from '@/lib/i18n/LanguageProvider'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatAnnouncementDate } from '@/lib/announcements'
import type { Announcement } from '@/types/announcement'

export default function AnnouncementDetailPage({ announcement }: { announcement: Announcement }) {
  return <main className="announcement-detail-page"><div className="announcement-detail-shell"><Link className="announcement-back-link" href="/announcements"><ArrowLeft size={16} /><T> Back to Announcements</T></Link><article className="announcement-article"><header><div className="announcement-article-meta"><span className="announcement-category"><T>{announcement.category}</T></span><span>·</span><time dateTime={announcement.date}><T>{formatAnnouncementDate(announcement.date)}</T></time></div><h1><T>{announcement.title}</T></h1><p className="announcement-article-intro"><T>{announcement.description}</T></p></header>{announcement.image && <Image className="announcement-article-image" src={announcement.image} width={1200} height={600} alt="" />}<div className="announcement-article-content">{announcement.content.split(/\n\n+/).map((paragraph) => <p key={paragraph}><T>{paragraph}</T></p>)}</div></article></div></main>
}
