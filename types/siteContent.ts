export type EventItem = { id: number; title: string; image: string; date: string; location: string; category: string; description: string; link: string; past?: boolean }
export type NewsItem = { id: number; slug: string; title: string; image: string; date: string; excerpt: string; content: string; category: string; sourceName: string; sourceUrl: string; articleUrl: string }
export type ProjectItem = { id: number; title: string; description: string; tags: string[]; status: string; link: string }
export type ResourceItem = { id: number; name: string; description: string; category: string; type: string; url: string }

export type HubCard = { id: number; title: string; description: string; meta: string; eyebrow: string; tags?: string[]; href?: string; image?: string; action?: string }
