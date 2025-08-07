'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@jacksonvillehomepros.com')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [logs, setLogs] = useState<string[]>([])
  const router = useRouter()

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, `${timestamp}: ${message}`])
    console.log(`Admin Login - ${timestamp}: ${message}`)
  }

  // Auto-fill credentials on load
  useEffect(() => {
    addLog('Admin login page loaded')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    addLog('Starting login attempt...')

    try {
      addLog(`Attempting login for: ${email}`)
      
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      addLog(`Login response status: ${response.status}`)
      
      const data = await response.json()
      addLog(`Login response: ${JSON.stringify(data)}`)

      if (!response.ok) {
        setError(data.error || 'Login failed')
        addLog(`Login failed: ${data.error}`)
        if (data.details) {
          addLog(`Error details: ${data.details}`)
        }
        return
      }

      if (data.success) {
        addLog('Login successful! Redirecting to admin dashboard...')
        // Use window.location for immediate redirect
        window.location.href = '/admin'
      } else {
        setError('Login failed - unexpected response')
        addLog('Login failed - unexpected response format')
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('Login error:', error)
      addLog(`Network error: ${errorMsg}`)
      setError(`Connection error: ${errorMsg}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Jacksonville Home Pros
            </h1>
          </Link>
          <h2 className="text-2xl font-semibold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Database-connected admin access
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Credentials Display */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-800 mb-2">
                <strong>Default Admin Credentials:</strong>
              </p>
              <p className="text-xs text-blue-700">
                Email: admin@jacksonvillehomepros.com
              </p>
              <p className="text-xs text-blue-700">
                Password: admin123
              </p>
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@jacksonvillehomepros.com')
                  setPassword('admin123')
                  addLog('Credentials auto-filled')
                }}
                className="mt-2 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
              >
                Auto-fill
              </button>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter admin email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in to Admin'}
            </button>
          </form>

          {/* Debug Logs */}
          {logs.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Debug Logs:</h3>
              <div className="bg-gray-50 rounded p-3 max-h-32 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="text-xs text-gray-600 mb-1">
                    {log}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setLogs([])}
                className="mt-2 text-xs text-gray-500 hover:text-gray-700"
              >
                Clear Logs
              </button>
            </div>
          )}

          {/* Links */}
          <div className="mt-6 text-center">
            <div className="text-sm">
              <span className="text-gray-600">Regular user? </span>
              <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
