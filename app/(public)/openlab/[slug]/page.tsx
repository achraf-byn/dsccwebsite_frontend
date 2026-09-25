import { notFound } from 'next/navigation'
import OpenLabDetailPage from '@/components/public/OpenLabDetailPage'
import { getOpenLabBySlug, getOpenLabProjects } from '@/lib/openlab'

export function generateStaticParams() {
  return getOpenLabProjects().map(({ slug }) => ({ slug }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = getOpenLabBySlug(params.slug)
  if (!project) notFound()
  return <OpenLabDetailPage project={project} />
}
