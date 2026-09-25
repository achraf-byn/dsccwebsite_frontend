import { notFound } from 'next/navigation'
import EventDetailPage from '@/components/public/EventDetailPage'
import { getAllEvents, getEventBySlug } from '@/lib/events'

export function generateStaticParams() {
  return getAllEvents().map(({ slug }) => ({ slug }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug)
  if (!event) notFound()
  return <EventDetailPage event={event} />
}
