import Navbar from '@/components/layout/Navbar'
import FeaturedAnnouncement from '@/components/home/FeaturedAnnouncement'
import Hero from '@/components/home/Hero'
import HomeAboutSections from '@/components/home/HomeAboutSections'

export default function Page() {
  return <><Navbar /><main aria-label="DSCC website content"><Hero /><FeaturedAnnouncement /><HomeAboutSections /></main></>
}
