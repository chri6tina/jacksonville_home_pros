'use client'

import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const pathname = usePathname()
  
  // Don't wrap admin routes with NextAuth SessionProvider at all
  // Admin routes use custom JWT authentication
  if (pathname?.startsWith('/admin')) {
    return <>{children}</>
  }
  
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
} 