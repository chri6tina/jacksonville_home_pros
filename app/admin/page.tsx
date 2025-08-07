'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/layout/admin-layout'
import SimpleAuth from './simple-auth'
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
  pendingProviders: number
  totalCategories: number
  totalReviews: number
  averageRating: number
}

interface RecentProvider {
  id: string
  businessName: string
  email: string
  createdAt: string
}

interface CategoryStat {
  name: string
  providerCount: number
  avgRating: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentProviders, setRecentProviders] = useState<RecentProvider[]>([])
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Check if using basic auth (skip database calls)
      const hasBasicAuth = document.cookie.includes('admin-auth=true')
      
      if (hasBasicAuth) {
        // Use mock data for basic auth mode
        console.log('Using basic auth mode - loading mock data')
        setStats({
          totalProviders: 5,
          activeProviders: 5,
          pendingProviders: 0,
          totalCategories: 8,
          totalReviews: 12,
          averageRating: 4.5
        })
        setRecentProviders([
          { id: '1', businessName: 'Sample Provider 1', email: 'provider1@example.com', createdAt: new Date().toISOString() },
          { id: '2', businessName: 'Sample Provider 2', email: 'provider2@example.com', createdAt: new Date().toISOString() }
        ])
        setCategoryStats([])
        return
      }
      
      // Try database call for JWT auth
      const response = await fetch('/api/admin/dashboard')
      if (response.ok) {
        const result = await response.json()
        console.log('Dashboard API response:', result)
        
        if (result.status === 'success' && result.data) {
          setStats({
            totalProviders: result.data.stats.totalProviders,
            activeProviders: result.data.stats.totalProviders, // Using total as active for now
            pendingProviders: 0, // Not provided by API
            totalCategories: result.data.stats.totalCategories,
            totalReviews: result.data.stats.totalReviews,
            averageRating: 0 // Not provided by API
          })
          setRecentProviders(result.data.recentProviders || [])
          setCategoryStats([]) // API doesn't provide category stats yet
        }
      } else {
        console.error('Dashboard API error:', response.status, response.statusText)
        // Fall back to mock data if API fails
        setStats({
          totalProviders: 0,
          activeProviders: 0,
          pendingProviders: 0,
          totalCategories: 0,
          totalReviews: 0,
          averageRating: 0
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Fall back to mock data on error
      setStats({
        totalProviders: 0,
        activeProviders: 0,
        pendingProviders: 0,
        totalCategories: 0,
        totalReviews: 0,
        averageRating: 0
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <SimpleAuth>
      <AdminLayout title="Dashboard" subtitle="Overview of your platform">
      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/providers/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Provider
          </Link>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Category
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-200 animate-pulse">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Providers</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalProviders}</p>
              </div>
              <BuildingOfficeIcon className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Providers</p>
                <p className="text-2xl font-bold text-green-900">{stats.activeProviders}</p>
              </div>
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.pendingProviders}</p>
              </div>
              <ExclamationTriangleIcon className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Avg Rating</p>
                <p className="text-2xl font-bold text-purple-900">{stats.averageRating}</p>
              </div>
              <StarIcon className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Providers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Providers</h3>
            <Link href="/admin/providers" className="text-sm text-blue-600 hover:text-blue-700">
              View All
            </Link>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-pulse">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recentProviders && recentProviders.length > 0 ? (
                recentProviders.map((provider) => (
                  <div key={provider.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{provider.businessName}</h4>
                      <p className="text-sm text-gray-600">{provider.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                      <Link
                        href={`/admin/providers/${provider.id}/edit`}
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No providers found</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Category Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Category Overview</h3>
            <Link href="/admin/categories" className="text-sm text-blue-600 hover:text-blue-700">
              View All
            </Link>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-pulse">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="text-right">
                    <div className="h-4 bg-gray-200 rounded w-12 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {categoryStats && categoryStats.length > 0 ? (
                categoryStats.slice(0, 6).map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-600">{category.providerCount} providers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{category.avgRating}★</p>
                      <p className="text-xs text-gray-500">avg rating</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No category data available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      </AdminLayout>
    </SimpleAuth>
  )
} 