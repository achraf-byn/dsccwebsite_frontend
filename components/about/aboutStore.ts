export type AboutContent = {
  hero: {
    eyebrow: string
    title: string
    highlightedTitle: string
    description: string
    image: string
    primaryButton: { label: string; href: string }
    secondaryButton: { label: string; href: string }
  }
}

export const defaultAboutContent: AboutContent = {
  hero: {
    eyebrow: 'ABOUT DSCC',
    title: 'More Than a Club.',
    highlightedTitle: 'A Community Building Tomorrow.',
    description: 'The Data Science & Cloud Computing Club at ENSAO is a student-led community where curious minds learn, experiment, collaborate, and turn ideas into real experiences.',
    image: '',
    primaryButton: { label: 'Meet Our Team', href: '#team' },
    secondaryButton: { label: 'Explore Our Journey', href: '#journey' },
  },
}

const STORAGE_KEY = 'dscc-about-content'

export function getAboutContent(): AboutContent {
  if (typeof window === 'undefined') return defaultAboutContent
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return defaultAboutContent
    const parsed = JSON.parse(saved) as Partial<AboutContent>
    return {
      ...defaultAboutContent,
      hero: {
        ...defaultAboutContent.hero,
        ...(parsed.hero ?? {}),
        primaryButton: { ...defaultAboutContent.hero.primaryButton, ...(parsed.hero?.primaryButton ?? {}) },
        secondaryButton: { ...defaultAboutContent.hero.secondaryButton, ...(parsed.hero?.secondaryButton ?? {}) },
      },
    }
  } catch {
    return defaultAboutContent
  }
}

export function saveAboutContent(content: AboutContent) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
}
