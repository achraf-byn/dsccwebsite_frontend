import FeaturedAnnouncement from '@/components/home/FeaturedAnnouncement'
import Hero from '@/components/home/Hero'
import HomeAboutSections from '@/components/home/HomeAboutSections'
import HomeTeamPreview from '@/components/home/HomeTeamPreview'
import InfiniteGallery from '@/components/gallery/InfiniteGallery'

export default function Page() {
  return <main aria-label="DSCC website content"><Hero /><FeaturedAnnouncement /><InfiniteGallery /><HomeAboutSections /><HomeTeamPreview /></main>
}
