'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AdminAuthWrapperProps {
  children: React.ReactNode
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Simply check for admin session cookie - if middleware allowed us here, session is valid
        const hasAdminCookie = document.cookie.includes('admin-session=')
        console.log('AdminAuthWrapper - Cookie check:', hasAdminCookie)
        
        if (hasAdminCookie) {
          console.log('AdminAuthWrapper - Cookie found, setting authenticated')
          setIsAuthenticated(true)
        } else {
          console.log('AdminAuthWrapper - No cookie, setting unauthenticated')
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    // Small delay to ensure cookies are set after login redirect
    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, router])

  // Loading state
  if (isLoading || isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking admin authentication...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to admin login...</p>
        </div>
      </div>
    )
  }

  // Authenticated - show content
  return <>{children}</>
}
