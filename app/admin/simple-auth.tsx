'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface SimpleAuthProps {
  children: React.ReactNode
}

export default function SimpleAuth({ children }: SimpleAuthProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for basic auth cookie
    const hasBasicAuth = document.cookie.includes('admin-auth=true')
    
    // Check for JWT session (if database login worked)
    const hasJWTSession = document.cookie.includes('admin-session=')
    
    if (hasBasicAuth || hasJWTSession) {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
      // Redirect to new admin login
      router.push('/admin-login')
    }
  }, [router])

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking admin access...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to admin login...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
