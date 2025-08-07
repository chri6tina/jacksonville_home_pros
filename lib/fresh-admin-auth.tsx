'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface FreshAdminAuthProps {
  children: React.ReactNode
}

export default function FreshAdminAuth({ children }: FreshAdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      // Check multiple auth methods
      const hasLocalStorage = localStorage.getItem('admin-authenticated') === 'true'
      const hasSessionStorage = sessionStorage.getItem('admin-session') === 'active'
      const hasBasicCookie = document.cookie.includes('admin-auth=true')
      const hasSessionCookie = document.cookie.includes('admin-session=')
      
      // If any auth method is present, consider authenticated
      if (hasLocalStorage || hasSessionStorage || hasBasicCookie || hasSessionCookie) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    }

    // Check immediately
    checkAuth()
    
    // Also check when storage changes (in case of login in another tab)
    const handleStorageChange = () => checkAuth()
    window.addEventListener('storage', handleStorageChange)
    
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/admin-login-fresh')
    }
  }, [isAuthenticated, router])

  // Loading state
  if (isAuthenticated === null) {
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

// Logout function
export const adminLogout = () => {
  // Clear all auth methods
  localStorage.removeItem('admin-authenticated')
  sessionStorage.removeItem('admin-session')
  
  // Clear cookies
  document.cookie = 'admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  document.cookie = 'admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  
  // Redirect to login
  window.location.href = '/admin-login-fresh'
}
