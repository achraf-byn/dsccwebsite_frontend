'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Newspaper, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { formatSiteDate } from '@/lib/siteContent'
import type { NewsItem } from '@/types/siteContent'

function NewsCard({ article, index }: { article: NewsItem; index: number }) {
  const reduce = useReducedMotion()
  return <motion.article className="tech-news-card" initial={{ opacity: 0, y: 20, scale: .98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .45, delay: reduce ? 0 : index * .06 }} whileTap={{ scale: .98 }}>
    {article.image ? <div className="tech-news-card-image"><Image src={article.image} alt="" fill sizes="(max-width: 767px) 46vw, (max-width: 1023px) 46vw, 30vw" /></div> : <div className="tech-news-card-art" aria-hidden="true"><Newspaper size={23} /></div>}
    <div className="tech-news-card-body"><div className="tech-news-card-meta"><span>{article.category}</span><time dateTime={article.date}>{formatSiteDate(article.date)}</time></div><h3>{article.title}</h3><p>{article.excerpt}</p><div className="tech-news-card-source"><span>{article.sourceName}</span><a href={article.sourceUrl} target="_blank" rel="noreferrer">Source <ExternalLink size={12} /></a></div><Link className="tech-news-card-link" href={`/news/${article.slug}`}>Read story <ArrowUpRight size={15} /></Link></div>
  </motion.article>
}

export default function NewsHubPage({ articles }: { articles: NewsItem[] }) {
  const reduce = useReducedMotion()
  const featured = articles[0]
  const regular = articles.slice(1)
  const ref = useRef<HTMLDivElement>(null)

  if (!featured) return <main className="tech-news-page"><section className="tech-news-empty"><Newspaper size={32} /><h1>No technology stories yet.</h1><p>Verified AI, Data and Cloud updates will appear here.</p></section></main>

  return <main className="tech-news-page"><section className="tech-news-hero"><div className="tech-news-shell tech-news-hero-inner"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .48 }}><span className="about-eyebrow"><Sparkles size={14} /> TECH NEWS</span><h1>What&apos;s Happening in <span>AI, Data &amp; Cloud.</span></h1><p>Discover the latest developments, tools, research and industry updates shaping AI, Data and Cloud technologies.</p></motion.div><div className="tech-news-hero-mark" aria-hidden="true"><Newspaper size={31} /><i /><i /><i /></div></div></section><section className="tech-news-content" ref={ref}><div className="tech-news-shell"><div className="tech-news-section-heading"><div><span className="about-eyebrow">FEATURED STORY</span><h2>Worth knowing.</h2></div><span>Verified source updates</span></div><motion.article className="tech-news-featured" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .48 }}><div className="tech-news-featured-copy"><div className="tech-news-card-meta"><span>{featured.category}</span><time dateTime={featured.date}>{formatSiteDate(featured.date)}</time></div><h2>{featured.title}</h2><p>{featured.excerpt}</p><div className="tech-news-featured-source"><span>Published by {featured.sourceName}</span><a href={featured.articleUrl} target="_blank" rel="noreferrer">Open original article <ExternalLink size={14} /></a></div><Link className="tech-news-card-link" href={`/news/${featured.slug}`}>Read story <ArrowUpRight size={15} /></Link></div><div className="tech-news-featured-visual" aria-hidden="true">{featured.image ? <Image src={featured.image} alt="" fill sizes="(max-width: 767px) 100vw, 42vw" /> : <><span>AI · DATA · CLOUD</span><Newspaper size={52} /><b>{featured.sourceName.toUpperCase()}</b></>}</div></motion.article><div className="tech-news-section-heading tech-news-latest-heading"><div><span className="about-eyebrow">LATEST DEVELOPMENTS</span><h2>Across the stack.</h2></div><span>{regular.length} stories</span></div><div className="tech-news-grid">{regular.map((article, index) => <NewsCard key={article.id} article={article} index={index} />)}</div></div></section></main>
}
