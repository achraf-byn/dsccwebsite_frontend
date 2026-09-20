import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import ClientShell from '@/components/layout/ClientShell'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
})

export const metadata: Metadata = { title: 'DSCC — Data Science & Cloud Computing Club' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={manrope.variable} suppressHydrationWarning><body><ClientShell>{children}</ClientShell></body></html>
}
