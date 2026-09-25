'use client'

import { T } from '@/lib/i18n/LanguageProvider'
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
    <div className="tech-news-card-body"><div className="tech-news-card-meta"><span><T>{article.category}</T></span><time dateTime={article.date}><T>{formatSiteDate(article.date)}</T></time></div><h3><T>{article.title}</T></h3><p><T>{article.excerpt}</T></p><div className="tech-news-card-source"><span><T>{article.sourceName}</T></span><a href={article.sourceUrl} target="_blank" rel="noreferrer"><T>Source </T><ExternalLink size={12} /></a></div><Link className="tech-news-card-link" href={`/news/${article.slug}`}><T>Read story </T><ArrowUpRight size={15} /></Link></div>
  </motion.article>
}

export default function NewsHubPage({ articles }: { articles: NewsItem[] }) {
  const reduce = useReducedMotion()
  const featured = articles[0]
  const regular = articles.slice(1)
  const ref = useRef<HTMLDivElement>(null)

  if (!featured) return <main className="tech-news-page"><section className="tech-news-empty"><Newspaper size={32} /><h1><T>No technology stories yet.</T></h1><p><T>Verified AI, Data and Cloud updates will appear here.</T></p></section></main>

  return <main className="tech-news-page"><section className="tech-news-hero"><div className="tech-news-shell tech-news-hero-inner"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .48 }}><span className="about-eyebrow"><Sparkles size={14} /><T> TECH NEWS</T></span><h1><T>What&apos;s Happening in </T><span><T>AI, Data &amp; Cloud.</T></span></h1><p><T>Discover the latest developments, tools, research and industry updates shaping AI, Data and Cloud technologies.</T></p></motion.div><div className="tech-news-hero-mark" aria-hidden="true"><Newspaper size={31} /><i /><i /><i /></div></div></section><section className="tech-news-content" ref={ref}><div className="tech-news-shell"><div className="tech-news-section-heading"><div><span className="about-eyebrow"><T>FEATURED STORY</T></span><h2><T>Worth knowing.</T></h2></div><span><T>Verified source updates</T></span></div><motion.article className="tech-news-featured" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .48 }}><div className="tech-news-featured-copy"><div className="tech-news-card-meta"><span><T>{featured.category}</T></span><time dateTime={featured.date}><T>{formatSiteDate(featured.date)}</T></time></div><h2><T>{featured.title}</T></h2><p><T>{featured.excerpt}</T></p><div className="tech-news-featured-source"><span><T>Published by </T><T>{featured.sourceName}</T></span><a href={featured.articleUrl} target="_blank" rel="noreferrer"><T>Open original article </T><ExternalLink size={14} /></a></div><Link className="tech-news-card-link" href={`/news/${featured.slug}`}><T>Read story </T><ArrowUpRight size={15} /></Link></div><div className="tech-news-featured-visual" aria-hidden="true">{featured.image ? <Image src={featured.image} alt="" fill sizes="(max-width: 767px) 100vw, 42vw" /> : <><span><T>AI · DATA · CLOUD</T></span><Newspaper size={52} /><b><T>{featured.sourceName.toUpperCase()}</T></b></>}</div></motion.article><div className="tech-news-section-heading tech-news-latest-heading"><div><span className="about-eyebrow"><T>LATEST DEVELOPMENTS</T></span><h2><T>Across the stack.</T></h2></div><span><T>{regular.length}</T><T> stories</T></span></div><div className="tech-news-grid">{regular.map((article, index) => <NewsCard key={article.id} article={article} index={index} />)}</div></div></section></main>
}
