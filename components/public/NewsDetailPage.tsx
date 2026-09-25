import { T } from '@/lib/i18n/LanguageProvider'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatSiteDate } from '@/lib/siteContent'
import type { NewsItem } from '@/types/siteContent'

export default function NewsDetailPage({ article }: { article: NewsItem }) {
  return <main className="article-page"><div className="article-shell"><Link className="article-back" href="/news"><ArrowLeft size={16} /><T> Back to Tech News</T></Link><article className="article-content"><div className="article-meta"><T>{article.category}</T> <span>·</span> <T>{formatSiteDate(article.date)}</T> <span>·</span> <T>{article.sourceName}</T></div><h1><T>{article.title}</T></h1><p className="article-intro"><T>{article.excerpt}</T></p>{article.image && <Image className="article-image" src={article.image} width={1200} height={600} alt="" />}<div className="article-body">{article.content.split(/\n\n+/).map((paragraph) => <p key={paragraph}><T>{paragraph}</T></p>)}</div><a className="article-source-link" href={article.articleUrl} target="_blank" rel="noreferrer"><T>Read the original article </T><ExternalLink size={14} /></a></article></div></main>
}
