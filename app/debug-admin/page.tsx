'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DebugAdminPage() {
  const [email, setEmail] = useState('admin@jacksonvillehomepros.com')
  const [password, setPassword] = useState('admin123')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [logs, setLogs] = useState<string[]>([])
  const router = useRouter()

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setLogs([])

    try {
      addLog('Starting admin login...')
      
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      addLog(`Login response status: ${response.status}`)
      
      const data = await response.json()
      addLog(`Login response data: ${JSON.stringify(data)}`)

      if (!response.ok) {
        setError(data.error || 'Login failed')
        addLog(`Login failed: ${data.error}`)
        return
      }

      if (data.success) {
        addLog('Login successful! Setting admin session cookie...')
        // Try to navigate to admin
        addLog('Attempting to navigate to /admin...')
        router.push('/admin')
        setTimeout(() => {
          addLog('Backup redirect with window.location...')
          window.location.href = '/admin'
        }, 1000)
      } else {
        setError('Login failed - unexpected response')
        addLog('Login failed - unexpected response format')
      }
    } catch (error) {
      console.error('Login error:', error)
      addLog(`Login error: ${error}`)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Debug Admin Login
          </h1>
          <p className="text-sm text-gray-600">
            Temporary bypass for admin access issues
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Debug Login'}
            </button>
          </form>

          {logs.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Debug Logs:</h3>
              <div className="bg-gray-50 rounded p-3 max-h-40 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="text-xs text-gray-600 mb-1">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 space-y-2">
            <a 
              href="/admin" 
              className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Direct Link to /admin
            </a>
            <a 
              href="/admin/login" 
              className="block w-full text-center bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
            >
              Direct Link to /admin/login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
