import ContentHubPage from '@/components/public/ContentHubPage'
import { projectCards } from '@/lib/siteContent'

export default function OpenLabPage() {
  return (
    <ContentHubPage
      kind="openlab"
      eyebrow="OPENLAB"
      title="Where Ideas Become Projects."
      description="A technical playground for experimentation, learning and building in public with the DSCC community."
      sectionTitle="Projects & Experiments"
      cards={projectCards()}
    />
  )
}
