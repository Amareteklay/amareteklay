// app/[locale]/(site)/template.tsx
import { Suspense } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  )
}