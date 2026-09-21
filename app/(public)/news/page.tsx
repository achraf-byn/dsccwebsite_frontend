import NewsHubPage from '@/components/news/NewsHubPage'
import { getNews } from '@/lib/news'

export default function NewsPage() { return <NewsHubPage articles={getNews()} /> }
