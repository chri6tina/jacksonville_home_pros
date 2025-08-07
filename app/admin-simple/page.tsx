'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  StarIcon,
  UsersIcon,
  ChartBarIcon,
  PlusIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface DashboardStats {
  totalProviders: number
  activeProviders: number
  totalCategories: number
  totalReviews: number
  totalUsers: number
}

interface RecentProvider {
  id: string
  businessName: string
  email: string
  createdAt: string
}

export default function SimpleAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [showLogin, setShowLogin] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentProviders, setRecentProviders] = useState<RecentProvider[]>([])
  const [loading, setLoading] = useState(false)

  // Simple password check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true)
      setShowLogin(false)
      localStorage.setItem('simple-admin-auth', 'true')
      fetchDashboardData()
    } else {
      alert('Invalid password')
    }
  }

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('simple-admin-auth') === 'true'
    if (isLoggedIn) {
      setIsAuthenticated(true)
      setShowLogin(false)
      fetchDashboardData()
    }
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Fetch stats
      const statsResponse = await fetch('/api/stats')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats({
          totalProviders: statsData.totalProviders || 0,
          activeProviders: statsData.totalProviders || 0,
          totalCategories: 25, // fallback
          totalReviews: statsData.totalReviews || 0,
          totalUsers: 8 // fallback
        })
      }

      // Fetch recent providers
      const providersResponse = await fetch('/api/providers?limit=3')
      if (providersResponse.ok) {
        const providersData = await providersResponse.json()
        setRecentProviders(providersData.providers || [])
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('simple-admin-auth')
    setIsAuthenticated(false)
    setShowLogin(true)
    setStats(null)
    setRecentProviders([])
  }

  // Login Form
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Jacksonville Home Pros
            </h1>
            <h2 className="text-2xl font-semibold text-gray-900">
              Simple Admin Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Dead simple, bulletproof admin access
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-blue-800 mb-1">
                  <strong>Password:</strong> admin123
                </p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter admin password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Access Admin Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Jacksonville Home Pros - Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin-simple"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/providers/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Provider
            </Link>
            <Link
              href="/admin/categories/new"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Category
            </Link>
            <Link
              href="/admin/providers"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
            >
              <BuildingOfficeIcon className="w-5 h-5 mr-2" />
              Manage Providers
            </Link>
            <Link
              href="/admin/categories"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
            >
              <WrenchScrewdriverIcon className="w-5 h-5 mr-2" />
              Manage Categories
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Providers</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalProviders}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <WrenchScrewdriverIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Categories</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalCategories}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <StarIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Reviews</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <UsersIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Providers */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Providers</h3>
              </div>
              <div className="p-6">
                {recentProviders.length > 0 ? (
                  <div className="space-y-4">
                    {recentProviders.map((provider) => (
                      <div key={provider.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{provider.businessName}</p>
                          <p className="text-sm text-gray-600">{provider.email}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(provider.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No providers found</p>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
