'use client'

import { useState, useEffect } from 'react'
import { 
  ChevronUpIcon,
  ChevronDownIcon,
  StarIcon,
  SparklesIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { AdminHeader } from '@/components/layout/admin-header'
import { Footer } from '@/components/layout/footer'

interface Provider {
  id: string
  businessName: string
  description: string
  phone: string
  email?: string
  website?: string
  verified: boolean
  premium: boolean
  featured: boolean
  sortOrder: number
  active: boolean
  rating: number
  reviewCount: number
  category: string
  createdAt: string
}

export default function ProviderPositioning() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showInactive, setShowInactive] = useState(false)
  const [sortBy, setSortBy] = useState<'sortOrder' | 'rating' | 'reviews' | 'name'>('sortOrder')

  useEffect(() => {
    fetchProviders()
  }, [])

  const fetchProviders = async () => {
    try {
      const response = await fetch('/api/admin/providers?includeInactive=true')
      const data = await response.json()
      
      if (data.status === 'success') {
        setProviders(data.providers)
      } else {
        console.error('Failed to fetch providers:', data.error)
      }
    } catch (error) {
      console.error('Error fetching providers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const moveProvider = async (providerId: string, direction: 'up' | 'down') => {
    setIsSaving(true)
    
    try {
      const response = await fetch(`/api/admin/providers/${providerId}/move`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction })
      })
      
      if (response.ok) {
        await fetchProviders() // Refresh the list
      } else {
        console.error('Failed to move provider')
      }
    } catch (error) {
      console.error('Error moving provider:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const toggleProviderStatus = async (providerId: string, field: 'active' | 'premium' | 'featured', value: boolean) => {
    setIsSaving(true)
    
    try {
      const response = await fetch(`/api/admin/providers/${providerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
      })
      
      if (response.ok) {
        await fetchProviders() // Refresh the list
      } else {
        console.error('Failed to update provider')
      }
    } catch (error) {
      console.error('Error updating provider:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const setProviderPriority = async (providerId: string, priority: number) => {
    setIsSaving(true)
    
    try {
      const response = await fetch(`/api/admin/providers/${providerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder: priority })
      })
      
      if (response.ok) {
        await fetchProviders() // Refresh the list
      } else {
        console.error('Failed to update provider priority')
      }
    } catch (error) {
      console.error('Error updating provider priority:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Filter and sort providers
  const filteredProviders = providers.filter(provider => {
    const matchesCategory = selectedCategory === 'all' || provider.category === selectedCategory
    const matchesSearch = provider.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesActive = showInactive || provider.active
    
    return matchesCategory && matchesSearch && matchesActive
  })

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'sortOrder':
        return a.sortOrder - b.sortOrder
      case 'rating':
        return b.rating - a.rating
      case 'reviews':
        return b.reviewCount - a.reviewCount
      case 'name':
        return a.businessName.localeCompare(b.businessName)
      default:
        return 0
    }
  })

  const categories = Array.from(new Set(providers.map(p => p.category))).sort()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <AdminHeader />
        <main className="container-responsive py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-neutral-600">Loading providers...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <main className="container-responsive py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Link 
                href="/admin"
                className="inline-flex items-center text-neutral-600 hover:text-neutral-900"
              >
                ← Back to Admin
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900">Provider Positioning</h1>
            <p className="text-neutral-600 mt-2">Control the display order and priority of service providers</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Search</label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search providers..."
                    className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="sortOrder">Priority Order</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showInactive}
                    onChange={(e) => setShowInactive(e.target.checked)}
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-neutral-700">Show Inactive</span>
                </label>
              </div>
            </div>
          </div>

          {/* Providers List */}
          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900">
                Providers ({sortedProviders.length})
              </h2>
            </div>
            
            <div className="divide-y divide-neutral-200">
              {sortedProviders.map((provider, index) => (
                <div 
                  key={provider.id} 
                  className={`px-6 py-4 flex items-center justify-between ${!provider.active ? 'bg-neutral-50' : ''}`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Priority Badge */}
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-medium text-neutral-500">Priority</span>
                      <span className="text-lg font-bold text-primary-600">{provider.sortOrder}</span>
                    </div>

                    {/* Provider Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-neutral-900">{provider.businessName}</h3>
                        {provider.verified && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Verified
                          </span>
                        )}
                        {provider.premium && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Premium
                          </span>
                        )}
                        {provider.featured && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Featured
                          </span>
                        )}
                        {!provider.active && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600">
                            Inactive
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-neutral-600 mb-1">{provider.category}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-neutral-500">
                        <div className="flex items-center">
                          <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1">{provider.rating}</span>
                          <span className="ml-1">({provider.reviewCount} reviews)</span>
                        </div>
                        <span>{provider.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Priority Controls */}
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => setProviderPriority(provider.id, 1)}
                        disabled={isSaving || provider.sortOrder === 1}
                        className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50"
                        title="Set as #1 priority"
                      >
                        #1
                      </button>
                      <button
                        onClick={() => setProviderPriority(provider.id, 5)}
                        disabled={isSaving || provider.sortOrder === 5}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
                        title="Set as top 5 priority"
                      >
                        Top 5
                      </button>
                    </div>

                    {/* Move buttons */}
                    <button
                      onClick={() => moveProvider(provider.id, 'up')}
                      disabled={isSaving || index === 0}
                      className="p-2 text-neutral-400 hover:text-neutral-600 disabled:opacity-50"
                      title="Move up"
                    >
                      <ChevronUpIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveProvider(provider.id, 'down')}
                      disabled={isSaving || index === sortedProviders.length - 1}
                      className="p-2 text-neutral-400 hover:text-neutral-600 disabled:opacity-50"
                      title="Move down"
                    >
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>

                    {/* Status toggles */}
                    <button
                      onClick={() => toggleProviderStatus(provider.id, 'featured', !provider.featured)}
                      disabled={isSaving}
                      className={`p-2 rounded ${provider.featured ? 'text-purple-600 bg-purple-100' : 'text-neutral-400 hover:text-neutral-600'}`}
                      title={provider.featured ? 'Remove featured' : 'Make featured'}
                    >
                      <SparklesIcon className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleProviderStatus(provider.id, 'premium', !provider.premium)}
                      disabled={isSaving}
                      className={`p-2 rounded ${provider.premium ? 'text-yellow-600 bg-yellow-100' : 'text-neutral-400 hover:text-neutral-600'}`}
                      title={provider.premium ? 'Remove premium' : 'Make premium'}
                    >
                      <StarIcon className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleProviderStatus(provider.id, 'active', !provider.active)}
                      disabled={isSaving}
                      className="p-2 text-neutral-400 hover:text-neutral-600"
                      title={provider.active ? 'Deactivate' : 'Activate'}
                    >
                      {provider.active ? (
                        <EyeIcon className="w-4 h-4" />
                      ) : (
                        <EyeSlashIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {sortedProviders.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-neutral-600">No providers found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">How to manage provider positioning:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Priority Order:</strong> Lower numbers appear first in search results</li>
              <li>• <strong>#1 Button:</strong> Instantly promote a provider to the top</li>
              <li>• <strong>Top 5 Button:</strong> Set provider in the top 5 positions</li>
              <li>• <strong>Up/Down Arrows:</strong> Fine-tune positioning</li>
              <li>• <strong>Featured:</strong> Highlight providers with special badge</li>
              <li>• <strong>Premium:</strong> Mark providers as premium tier</li>
              <li>• <strong>Active/Inactive:</strong> Control visibility to users</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 