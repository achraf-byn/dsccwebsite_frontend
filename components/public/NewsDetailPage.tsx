import { ArrowLeft, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatSiteDate } from '@/lib/siteContent'
import type { NewsItem } from '@/types/siteContent'

export default function NewsDetailPage({ article }: { article: NewsItem }) {
  return <main className="article-page"><div className="article-shell"><Link className="article-back" href="/news"><ArrowLeft size={16} /> Back to Tech News</Link><article className="article-content"><div className="article-meta">{article.category} <span>·</span> {formatSiteDate(article.date)} <span>·</span> {article.sourceName}</div><h1>{article.title}</h1><p className="article-intro">{article.excerpt}</p>{article.image && <Image className="article-image" src={article.image} width={1200} height={600} alt="" />}<div className="article-body">{article.content.split(/\n\n+/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><a className="article-source-link" href={article.articleUrl} target="_blank" rel="noreferrer">Read the original article <ExternalLink size={14} /></a></article></div></main>
}
