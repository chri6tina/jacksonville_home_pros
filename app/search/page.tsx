'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  StarIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

// Provider data interface - Updated to match ALL backend data
interface Provider {
  id: string
  businessName: string
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
  phone: string
  email: string
  website: string
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
  address: string
  city: string
  state: string
  featured: boolean
  active: boolean
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const location = searchParams.get('location') || ''
  
  const [allProviders, setAllProviders] = useState<Provider[]>([])
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Fetch providers on component mount
  useEffect(() => {
    console.log('Search page useEffect triggered with:', { query, category, location })
    
    const fetchProviders = async () => {
      try {
        setIsLoading(true)
        
        let apiUrl = '/api/providers'
        
        // If category is specified, fetch providers for that category
        if (category) {
          // Map category names to slugs
          const categorySlugMap: { [key: string]: string } = {
            'Cleaning & Housekeeping': 'cleaning',
            'Plumbing': 'plumbing',
            'Electrical': 'electrical',
            'HVAC': 'hvac',
            'Landscaping': 'landscaping',
            'Painting': 'painting',
            'Handyman': 'handyman',
            'Roofing': 'roofing'
          }
          
          const categorySlug = categorySlugMap[category] || category.toLowerCase().replace(/[^a-z0-9]/g, '')
          apiUrl = `/api/providers?category=${categorySlug}`
        } else if (query) {
          // If search query is specified, use search endpoint
          apiUrl = `/api/providers/search?q=${encodeURIComponent(query)}`
        }
        
        console.log('Fetching from:', apiUrl)
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log('API response:', data)
        
        if (data.status === 'success') {
          if (category && data.providers) {
            console.log('Setting providers for category:', data.providers.length, 'providers')
            setAllProviders(data.providers)
          } else if (data.providers) {
            console.log('Setting providers:', data.providers.length, 'providers')
            setAllProviders(data.providers)
          } else {
            console.log('No providers in response')
            setAllProviders([])
          }
        } else {
          console.error('Failed to fetch providers:', data.error)
          setAllProviders([])
        }
      } catch (error) {
        console.error('Error fetching providers:', error)
        setAllProviders([])
      } finally {
        console.log('Setting isLoading to false')
        setIsLoading(false)
      }
    }
    
    fetchProviders()
  }, [query, category, location])
  
  const [filters, setFilters] = useState({
    rating: '',
    verified: false,
    premium: false,
    distance: '25'
  })
  const [sortBy, setSortBy] = useState('relevance')

  // Filter and sort providers
  useEffect(() => {
    console.log('Filtering providers:', allProviders.length, 'providers')
    
    // Only filter if we have providers
    if (allProviders.length === 0) {
      setFilteredProviders([])
      return
    }
    
    let filtered = [...allProviders]

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(p => (p.googleRating || p.rating) >= parseFloat(filters.rating))
    }

    // Apply verified filter
    if (filters.verified) {
      filtered = filtered.filter(p => p.verified)
    }

    // Apply premium filter
    if (filters.premium) {
      filtered = filtered.filter(p => p.premium)
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => (b.googleRating || b.rating) - (a.googleRating || a.rating))
        break
      case 'reviews':
        filtered.sort((a, b) => (b.googleReviewCount || b.reviewCount) - (a.googleReviewCount || a.reviewCount))
        break
      case 'name':
        filtered.sort((a, b) => a.businessName.localeCompare(b.businessName))
        break
      default:
        // Relevance - keep original order for now
        break
    }

    console.log('Filtered to:', filtered.length, 'providers')
    setFilteredProviders(filtered)
  }, [allProviders, filters, sortBy])

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
      )
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4">
          <StarIcon className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
          </div>
        </div>
      )
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      )
    }
    
    return stars
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="container-responsive py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {category ? `${category} Providers in Jacksonville` : 
             query ? `Search results for "${query}"` : 
             'Find Local Service Providers'}
          </h1>
          <p className="text-neutral-600">
            {isLoading ? 'Loading providers...' : 
             `${filteredProviders.length} provider${filteredProviders.length !== 1 ? 's' : ''} found`}
            {location && ` near ${location}`}
            {category && !location && ' in Jacksonville'}
          </p>
          {!isLoading && allProviders.length > 0 && filteredProviders.length === 0 && (
            <p className="text-sm text-neutral-500 mt-2">
              All providers were filtered out. Try adjusting your filters.
            </p>
          )}
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

              {/* Distance Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Distance
                </label>
                <select
                  value={filters.distance}
                  onChange={(e) => setFilters({...filters, distance: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="5">Within 5 miles</option>
                  <option value="10">Within 10 miles</option>
                  <option value="25">Within 25 miles</option>
                  <option value="50">Within 50 miles</option>
                </select>
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
                {filteredProviders.length} results
              </span>
            </div>

            {/* Provider Cards */}
            <div className="space-y-6">
              {filteredProviders.map((provider) => (
                <div key={provider.id} className="bg-white rounded-xl shadow-soft border border-neutral-100 overflow-hidden hover:shadow-medium transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Provider Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg overflow-hidden">
                          {provider.image && provider.image !== '/images/default-provider.svg' ? (
                            <img
                              src={provider.image}
                              alt={provider.businessName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                console.log('Image failed to load, using fallback')
                                e.currentTarget.src = '/images/default-provider.svg'
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-2xl">🏠</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Provider Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-xl font-semibold text-neutral-900">
                                {provider.businessName}
                              </h3>
                              {provider.verified && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Verified
                                </span>
                              )}
                              {provider.premium && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  Premium
                                </span>
                              )}
                              {provider.featured && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                  Featured
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-4 mb-2">
                              <div className="flex items-center">
                                <div className="flex items-center space-x-1">
                                  {renderStars(provider.googleRating || provider.rating)}
                                </div>
                                <span className="ml-2 text-sm font-medium text-neutral-900">
                                  {provider.googleRating || provider.rating}
                                </span>
                                <span className="ml-1 text-sm text-neutral-500">
                                  ({provider.googleReviewCount || provider.reviewCount} {provider.googleReviewCount ? 'Google' : ''} reviews)
                                </span>
                                {provider.googleRating && (
                                  <span className="ml-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    Google Verified ⭐
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center text-sm text-neutral-500">
                                <MapPinIcon className="w-4 h-4 mr-1" />
                                {provider.location}
                              </div>
                            </div>

                            <p className="text-neutral-600 mb-3 line-clamp-2">
                              {provider.description && provider.description !== 'n/a' ? 
                                provider.description : 
                                `Professional ${provider.services[0]?.categoryName || 'service'} provider in ${provider.location}`
                              }
                            </p>

                            {/* Services */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {provider.services.map((service) => (
                                <span
                                  key={service.id}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                                >
                                  {service.categoryName}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Contact Actions */}
                        <div className="flex items-center space-x-3">
                          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
                            <PhoneIcon className="w-4 h-4 mr-2" />
                            Call Now
                          </button>
                          <button className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-lg text-neutral-700 bg-white hover:bg-neutral-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
                            <EnvelopeIcon className="w-4 h-4 mr-2" />
                            Message
                          </button>
                          <button className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-lg text-neutral-700 bg-white hover:bg-neutral-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProviders.length === 0 && (
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No providers found</h3>
                <p className="text-neutral-600">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 