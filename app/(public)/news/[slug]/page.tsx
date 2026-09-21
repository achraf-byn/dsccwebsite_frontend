import { notFound } from 'next/navigation'
import NewsDetailPage from '@/components/public/NewsDetailPage'
import { getNews, getNewsBySlug } from '@/lib/news'

export function generateStaticParams() { return getNews().map(({ slug }) => ({ slug })) }
export default function Page({ params }: { params: { slug: string } }) { const article = getNewsBySlug(params.slug); if (!article) notFound(); return <NewsDetailPage article={article} /> }
