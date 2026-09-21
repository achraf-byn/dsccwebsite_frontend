import ContentHubPage from '@/components/public/ContentHubPage'
import { eventCards } from '@/lib/siteContent'

export default function EventsPage() { return <ContentHubPage kind="events" eyebrow="EVENTS" title="Learn. Connect. Experience." description="Workshops, community moments and challenges that turn learning into shared experience." sectionTitle="Upcoming Events" cards={eventCards()} secondaryTitle="Past Events" secondaryCards={eventCards(true)} /> }
