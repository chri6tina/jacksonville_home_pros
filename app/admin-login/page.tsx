'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@jacksonvillehomepros.com')
  const [password, setPassword] = useState('admin123')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [logs, setLogs] = useState<string[]>([])
  const router = useRouter()

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, `${timestamp}: ${message}`])
    console.log(`Admin Login - ${timestamp}: ${message}`)
  }

  const handleDirectAccess = () => {
    // Simple approach - set a basic auth cookie and redirect
    addLog('Setting basic auth cookie...')
    
    // Set a simple auth cookie
    document.cookie = `admin-auth=true; path=/; max-age=86400; SameSite=Lax`
    
    addLog('Cookie set, redirecting to admin...')
    window.location.href = '/admin'
  }

  const handleDatabaseLogin = async () => {
    setIsLoading(true)
    setError('')
    addLog('Starting database login attempt...')

    try {
      // First, let's try to create an admin user if one doesn't exist
      addLog('Attempting to setup admin user...')
      const setupResponse = await fetch('/api/admin/setup', {
        method: 'POST',
      })

      const setupData = await setupResponse.json()
      addLog(`Setup response: ${JSON.stringify(setupData)}`)

      if (setupResponse.ok || setupData.message?.includes('already exists')) {
        addLog('Admin user ready, attempting login...')
        
        const loginResponse = await fetch('/api/admin/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        const loginData = await loginResponse.json()
        addLog(`Login response: ${JSON.stringify(loginData)}`)

        if (loginResponse.ok && loginData.success) {
          addLog('Database login successful! Redirecting...')
          window.location.href = '/admin'
        } else {
          setError(`Login failed: ${loginData.error || 'Unknown error'}`)
          addLog(`Login failed: ${loginData.error}`)
        }
      } else {
        setError(`Setup failed: ${setupData.error}`)
        addLog(`Setup failed: ${setupData.error}`)
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      setError(`Connection error: ${errorMsg}`)
      addLog(`Connection error: ${errorMsg}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Access
          </h1>
          <p className="text-sm text-gray-600">
            Choose your login method
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Credentials Display */}
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm font-medium text-blue-900 mb-2">Admin Credentials:</p>
            <p className="text-sm text-blue-800">Email: {email}</p>
            <p className="text-sm text-blue-800">Password: {password}</p>
          </div>

          {/* Login Methods */}
          <div className="space-y-3">
            <button
              onClick={handleDirectAccess}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              🚀 Direct Access (Skip Database)
            </button>

            <button
              onClick={handleDatabaseLogin}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? '🔄 Trying Database Login...' : '🔑 Database Login'}
            </button>
          </div>

          {/* Manual Links */}
          <div className="border-t pt-4 space-y-2">
            <a 
              href="/admin" 
              className="block w-full text-center bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Force Admin Dashboard
            </a>
            <a 
              href="/admin/providers" 
              className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
            >
              Direct to Providers
            </a>
          </div>

          {/* Debug Logs */}
          {logs.length > 0 && (
            <div className="border-t pt-4">
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
        </div>
      </div>
    </div>
  )
}
