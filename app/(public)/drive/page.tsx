import ContentHubPage from '@/components/public/ContentHubPage'
import { resourceCards } from '@/lib/siteContent'

export default function DrivePage() {
  return (
    <ContentHubPage
      kind="drive"
      eyebrow="DSCC DRIVE"
      title="Resources for Learning & Building."
      description="A clear starting point for the references, workshop material and technical foundations behind our work."
      sectionTitle="Resource Library"
      cards={resourceCards()}
    />
  )
}
