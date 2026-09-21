import FeaturedAnnouncement from '@/components/home/FeaturedAnnouncement'
import Hero from '@/components/home/Hero'
import HomeAboutSections from '@/components/home/HomeAboutSections'
import HomeTeamPreview from '@/components/home/HomeTeamPreview'

export default function Page() {
  return <main aria-label="DSCC website content"><Hero /><FeaturedAnnouncement /><HomeAboutSections /><HomeTeamPreview /></main>
}
