'use client'

import { useState, useEffect } from 'react'
import { 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProviderCard } from '@/components/providers/provider-card'

// Provider data interface matching the API response
interface Provider {
  id: string
  businessName: string
  slug: string
  description: string
  rating: number
  reviewCount: number
  location: string
  services: Array<{
    id: string
    categoryId: string
    categoryName: string
    categorySlug: string
  }>
  verified: boolean
  premium: boolean
  featured: boolean
  image: string
  images: Array<{
    id: string
    url: string
    alt?: string
    type: string
  }>
  googleRating?: number
  googleReviewCount?: number
  googlePlacesId?: string
  phone?: string
  email?: string
  website?: string
  address?: string
  city?: string
  state?: string
}

interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  level: string
  children: any[]
}

interface CategoryPageClientProps {
  category: Category
  successMessage?: string
}

export function CategoryPageClient({ category, successMessage }: CategoryPageClientProps) {
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [filters, setFilters] = useState({
    rating: '',
    verified: false,
    premium: false,
    distance: '25'
  })
  const [sortBy, setSortBy] = useState('relevance')

  // Fetch providers for this category
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('Fetching providers for category:', category.slug)
        const response = await fetch(`/api/test-providers?category=${category.slug}&t=${Date.now()}`)
        const data = await response.json()
        
        console.log('Category providers API response:', data)
        
        if (data.status === 'success' && data.providers) {
          setProviders(data.providers)
        } else {
          console.error('No providers in response:', data)
          setError('No providers found')
        }
      } catch (err) {
        console.error('Error fetching providers:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProviders()
  }, [category.slug])

  // Show success message if redirected from form submission
  useEffect(() => {
    if (successMessage) {
      setShowSuccessMessage(true)
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }
  }, [successMessage])

  // Filter and sort providers
  const filteredProviders = providers.filter(provider => {
    if (filters.rating && (provider.googleRating || provider.rating) < parseFloat(filters.rating)) return false
    if (filters.verified && !provider.verified) return false
    if (filters.premium && !provider.premium) return false
    return true
  })

  // Sort providers
  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.googleRating || b.rating || 0) - (a.googleRating || a.rating || 0)
      case 'reviews':
        return (b.googleReviewCount || b.reviewCount || 0) - (a.googleReviewCount || a.reviewCount || 0)
      case 'name':
        return a.businessName.localeCompare(b.businessName)
      default:
        return 0
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="container-responsive py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">Loading...</h1>
            <p className="text-neutral-600">Please wait while we load the providers.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="container-responsive py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">Error</h1>
            <p className="text-neutral-600 mb-6">{error}</p>
            <Link 
              href="/categories"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Back to Categories
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="container-responsive py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">
                {successMessage === 'provider-added' 
                  ? 'Provider successfully added!' 
                  : 'Provider successfully updated!'}
              </span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              The provider has been added to this category and is now visible to customers.
            </p>
          </div>
        )}

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-neutral-500 mb-6">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <ChevronRightIcon className="w-4 h-4" />
          <Link href="/categories" className="hover:text-primary-600 transition-colors">
            Categories
          </Link>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-neutral-900">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-xl shadow-soft p-8 border border-neutral-100 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
              <span className="text-3xl">{category.icon}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">{category.name}</h1>
              <p className="text-neutral-600 mt-1">{category.description}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-500">
              {sortedProviders.length} provider{sortedProviders.length !== 1 ? 's' : ''} found
            </div>
            <Link 
              href={`/search?category=${encodeURIComponent(category.name)}`}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              View All {category.name} Providers
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6 border border-neutral-100">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Filters</h2>
               
              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({...filters, rating: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                </select>
              </div>

              {/* Verified Filter */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => setFilters({...filters, verified: e.target.checked})}
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-neutral-700">Verified Providers Only</span>
                </label>
              </div>

              {/* Premium Filter */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.premium}
                    onChange={(e) => setFilters({...filters, premium: e.target.checked})}
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-neutral-700">Premium Providers Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-neutral-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
              <span className="text-sm text-neutral-600">
                {sortedProviders.length} results
              </span>
            </div>

            {/* Provider Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>

            {/* No Results */}
            {sortedProviders.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No {category.name} providers found</h3>
                <p className="text-neutral-600">Try adjusting your filters or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 