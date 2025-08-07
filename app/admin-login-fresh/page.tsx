'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginFresh() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simple password check
    if (password === 'admin123') {
      // Set multiple types of auth tokens for maximum compatibility
      localStorage.setItem('admin-authenticated', 'true')
      sessionStorage.setItem('admin-session', 'active')
      
      // Set a simple cookie
      document.cookie = 'admin-auth=true; path=/; max-age=86400'
      
      // Also set the expected admin-session cookie format
      const token = btoa(JSON.stringify({
        id: 'admin',
        email: 'admin@jacksonvillehomepros.com',
        role: 'ADMIN',
        timestamp: Date.now()
      }))
      document.cookie = `admin-session=${token}; path=/; max-age=86400`
      
      // Redirect to admin dashboard
      window.location.href = '/admin'
    } else {
      setError('Invalid password. Use: admin123')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600">
              Fresh authentication system
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-blue-800">
                <strong>Admin Password:</strong> admin123
              </p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login to Admin'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              This is a simplified authentication system that bypasses database issues
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
