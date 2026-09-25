import rawOpenLab from '@/src/data/openlab.json'
import type { ProjectItem } from '@/types/siteContent'

const projects = rawOpenLab as ProjectItem[]

export function getOpenLabProjects(): ProjectItem[] {
  return [...projects]
}

export function getOpenLabBySlug(slug: string): ProjectItem | undefined {
  return projects.find((project) => project.slug === slug)
}
