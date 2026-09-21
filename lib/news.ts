import newsJson from '@/data/news.json'
import type { NewsItem } from '@/types/siteContent'

const news = newsJson as NewsItem[]

export const getNews = () => [...news].sort((a, b) => b.date.localeCompare(a.date))
export const getNewsBySlug = (slug: string) => news.find((item) => item.slug === slug)
