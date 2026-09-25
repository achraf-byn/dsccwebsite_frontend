export type EventItem = {
  id: number
  slug: string
  title: string
  description: string
  content: string
  image?: string | null
  category: string
  date: string
  time?: string | null
  location?: string | null
  status?: string
  registrationUrl?: string | null
  link?: string | null
  past?: boolean
}

export type NewsItem = {
  id: number
  slug: string
  title: string
  image: string
  date: string
  excerpt: string
  content: string
  category: string
  sourceName: string
  sourceUrl: string
  articleUrl: string
}

export type ProjectItem = {
  id: number
  slug: string
  title: string
  description: string
  content: string
  image?: string | null
  category: string
  technologies: string[]
  status: string
  githubUrl?: string | null
  demoUrl?: string | null
  tags?: string[]
  link?: string | null
}

export type DriveResource = {
  id: number
  title: string
  description: string
  category: string
  image?: string | null
  driveUrl?: string | null
  order: number
  name?: string
  type?: string
  url?: string
}

export type HubCard = {
  id: number
  title: string
  description: string
  meta: string
  eyebrow: string
  tags?: string[]
  href?: string | null
  image?: string | null
  action?: string
  disabled?: boolean
  badge?: string
}
