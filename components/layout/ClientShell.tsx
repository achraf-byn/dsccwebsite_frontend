'use client'

import CloudIntro from './CloudIntro'
import { LanguageProvider } from '@/lib/i18n/LanguageProvider'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return <LanguageProvider><CloudIntro />{children}</LanguageProvider>
}
