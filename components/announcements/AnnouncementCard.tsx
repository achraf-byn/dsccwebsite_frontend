'use client'

import { T } from '@/lib/i18n/LanguageProvider'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Megaphone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { formatAnnouncementDate } from '@/lib/announcements'
import type { Announcement } from '@/types/announcement'

export default function AnnouncementCard({ announcement, index = 0 }: { announcement: Announcement; index?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: .2 })
  const reduce = useReducedMotion()
  return <motion.div ref={ref} initial={{ opacity: 0, y: 20, scale: .98 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined} transition={{ duration: .48, delay: reduce ? 0 : index * .06, ease: [.22, 1, .36, 1] }}>
    <article className="announcement-feed-card">
      {announcement.image ? <div className="announcement-card-image"><Image src={announcement.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" /></div> : <div className="announcement-card-art" aria-hidden="true"><Megaphone size={21} /></div>}
      <div className="announcement-card-body"><div className="announcement-card-meta"><span className="announcement-category"><T>{announcement.category}</T></span><time dateTime={announcement.date}><T>{formatAnnouncementDate(announcement.date)}</T></time></div><h3><T>{announcement.title}</T></h3><p><T>{announcement.description}</T></p><Link className="announcement-read-link" href={`/announcements/${announcement.slug}`}><T>Read more </T><ArrowRight size={15} /></Link></div>
    </article>
  </motion.div>
}
