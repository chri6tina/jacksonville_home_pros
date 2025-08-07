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
    const checkAuth = async () => {
      try {
        // Check for admin session cookie (simpler approach)
        const hasAdminCookie = document.cookie.includes('admin-session=')
        
        if (hasAdminCookie) {
          // Verify the session is still valid by calling a protected endpoint
          const response = await fetch('/api/admin/dashboard')
          
          if (response.ok) {
            setIsAuthenticated(true)
          } else {
            // Session expired or invalid
            setIsAuthenticated(false)
          }
        } else {
          // No admin session cookie
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
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
