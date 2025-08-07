'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDirectPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasSession, setHasSession] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if we have an admin session
    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin/dashboard')
        if (response.ok) {
          setHasSession(true)
          // Redirect to admin dashboard
          window.location.href = '/admin'
        } else {
          setHasSession(false)
        }
      } catch (error) {
        setHasSession(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const handleDirectLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: 'admin@jacksonvillehomepros.com', 
          password: 'admin123' 
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Direct redirect to admin
          window.location.href = '/admin'
        }
      }
    } catch (error) {
      console.error('Direct login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking admin access...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Direct Access
          </h1>
          <p className="text-sm text-gray-600">
            Bypass NextAuth redirects
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          {!hasSession ? (
            <>
              <p className="text-sm text-gray-700">
                No admin session detected. Click below to login directly:
              </p>
              <button
                onClick={handleDirectLogin}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Direct Admin Login'}
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-green-700">
                Admin session found! Redirecting to dashboard...
              </p>
              <button
                onClick={() => window.location.href = '/admin'}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700"
              >
                Go to Admin Dashboard
              </button>
            </>
          )}

          <div className="space-y-2">
            <a 
              href="/admin/login" 
              className="block w-full text-center bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Try Admin Login Page
            </a>
            <a 
              href="/admin" 
              className="block w-full text-center bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
            >
              Force Admin Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
