'use client'

import { motion } from 'framer-motion'
import { Megaphone } from 'lucide-react'
import { getAnnouncements, getPinnedAnnouncement } from '@/lib/announcements'
import AnnouncementCard from './AnnouncementCard'
import FeaturedAnnouncement from './FeaturedAnnouncement'

export default function AnnouncementsPage() {
  const allAnnouncements = getAnnouncements()
  const featured = getPinnedAnnouncement()
  const announcements = allAnnouncements.filter((announcement) => announcement.id !== featured?.id)

  return <main className="announcements-page" aria-labelledby="announcements-title">
    <section className="announcements-hero"><div className="announcements-shell announcements-hero-inner"><motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}><span className="about-eyebrow"><Megaphone size={14} /> STAY UPDATED</span><h1 id="announcements-title">Announcements</h1><p>Updates, opportunities and important news from the DSCC community.</p></motion.div><div className="announcements-hero-orbit" aria-hidden="true"><i /><i /><i /><Megaphone size={27} /></div></div></section>
    {featured && <section className="announcements-featured-section"><div className="announcements-shell"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .48 }}><FeaturedAnnouncement announcement={featured} /></motion.div></div></section>}
    <section className="announcements-feed-section"><div className="announcements-shell"><div className="announcement-feed-heading"><div><span className="about-eyebrow">DSCC NEWSROOM</span><h2>What&apos;s happening around the club.</h2></div><span>{announcements.length} update{announcements.length === 1 ? '' : 's'}</span></div>{announcements.length ? <div className="announcement-feed-grid">{announcements.map((announcement, index) => <AnnouncementCard key={announcement.id} announcement={announcement} index={index} />)}</div> : <div className="announcements-empty"><Megaphone size={28} /><h3>No announcements yet.</h3><p>New updates from DSCC will appear here.</p></div>}</div></section>
  </main>
}
