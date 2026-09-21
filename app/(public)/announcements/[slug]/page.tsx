import { notFound } from 'next/navigation'
import AnnouncementDetailPage from '@/components/announcements/AnnouncementDetailPage'
import { getAnnouncementBySlug, getAnnouncements } from '@/lib/announcements'

export function generateStaticParams() {
  return getAnnouncements().map(({ slug }) => ({ slug }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const announcement = getAnnouncementBySlug(params.slug)
  if (!announcement) notFound()
  return <AnnouncementDetailPage announcement={announcement} />
}
