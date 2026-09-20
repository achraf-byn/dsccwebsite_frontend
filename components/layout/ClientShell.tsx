'use client'

import CloudIntro from './CloudIntro'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return <><CloudIntro />{children}</>
}
