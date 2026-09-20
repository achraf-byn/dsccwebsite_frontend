'use client'

import { BarChart3, CalendarDays, FileText, Info, LayoutDashboard, Megaphone, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const items = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Announcements', href: '/admin/announcements', icon: Megaphone },
  { label: 'Events', href: '/admin/events', icon: CalendarDays },
  { label: 'News', href: '/admin/news', icon: FileText },
  { label: 'About', href: '/admin/about', icon: Info },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return <div className="admin-shell"><aside className="admin-sidebar"><div className="admin-brand"><span>DSCC</span><small>CONTENT STUDIO</small></div><nav className="admin-nav" aria-label="Admin navigation">{items.map(({ label, href, icon: Icon }) => { const active = href === '/admin' ? pathname === href : pathname.startsWith(href); return <Link key={href} href={href} className={active ? 'is-active' : ''}><Icon size={17} /><span>{label}</span></Link> })}</nav><div className="admin-sidebar-footer"><Link href="/"><BarChart3 size={16} />View website</Link><span><Settings size={16} />Workspace</span></div></aside><div className="admin-main"><header className="admin-topbar"><div><span className="admin-topbar-kicker">DSCC ADMIN</span><strong>Content management</strong></div><div className="admin-user">A<span>Admin</span></div></header>{children}</div></div>
}
