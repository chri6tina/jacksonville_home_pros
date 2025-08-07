'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminLayout from '@/components/layout/admin-layout'
import { toast } from 'react-hot-toast'
import { GlobeAltIcon, StarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  level: 'PRIMARY' | 'SECONDARY' | 'TERTIARY'
  parentId?: string
  sortOrder: number
  active: boolean
}

interface ProviderService {
  id: string
  categoryId: string
  categoryName: string
  categorySlug: string
  price?: string
  priceType?: string
  description?: string
}

interface ProviderData {
  id: string
  businessName: string
  description: string
  phone: string
  email: string
  website: string
  address: string
  city: string
  state: string
  zipCode: string
  verified: boolean
  premium: boolean
  featured: boolean
  active: boolean
  sortOrder: number
  services: ProviderService[]
  googlePlacesId?: string
  googleRating?: number
  googleReviewCount?: number
}

interface GooglePlace {
  place_id: string
  name: string
  formatted_address: string
  formatted_phone_number?: string
  website?: string
  rating?: number
  user_ratings_total?: number
  reviews?: Array<{
    author_name: string
    rating: number
    text: string
    time: number
  }>
  editorial_summary?: {
    overview: string
  }
}

export default function EditProviderPage() {
  const router = useRouter()
  const params = useParams()
  const providerId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState<ProviderData | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Google Places states
  const [isSearchingGoogle, setIsSearchingGoogle] = useState(false)
  const [googleSearchQuery, setGoogleSearchQuery] = useState('')
  const [googleSearchResults, setGoogleSearchResults] = useState<GooglePlace[]>([])
  const [showGoogleSearch, setShowGoogleSearch] = useState(false)
  const [selectedGooglePlace, setSelectedGooglePlace] = useState<GooglePlace | null>(null)

  useEffect(() => {
    if (providerId) {
      fetchCategories()
      fetchProvider()
    }
  }, [providerId])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      
      if (data.status === 'success' && data.categories) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProvider = async () => {
    try {
      const response = await fetch(`/api/providers/${providerId}`)
      const data = await response.json()

      if (response.ok && data.status === 'success') {
        setFormData(data.provider)
        // Pre-populate Google search with business name
        setGoogleSearchQuery(data.provider.businessName)
      } else {
        setError(data.error || 'Failed to fetch provider')
      }
    } catch (error) {
      console.error('Error fetching provider:', error)
      setError('Failed to fetch provider')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof ProviderData, value: any) => {
    setFormData(prev => prev ? ({ ...prev, [field]: value }) : null)
  }

  const handleServiceToggle = (categoryId: string, categoryName: string, categorySlug: string) => {
    if (!formData) return

    const existingService = formData.services.find(s => s.categoryId === categoryId)
    
    if (existingService) {
      // Remove service
      setFormData({
        ...formData,
        services: formData.services.filter(s => s.categoryId !== categoryId)
      })
    } else {
      // Add service
      setFormData({
        ...formData,
        services: [...formData.services, {
          id: '',
          categoryId,
          categoryName,
          categorySlug,
          price: '',
          priceType: 'FIXED',
          description: ''
        }]
      })
    }
  }

  const updateService = (categoryId: string, field: string, value: string) => {
    if (!formData) return

    setFormData({
      ...formData,
      services: formData.services.map(service =>
        service.categoryId === categoryId
          ? { ...service, [field]: value }
          : service
      )
    })
  }

  // Google Places integration
  const searchGooglePlaces = async () => {
    if (!googleSearchQuery.trim()) return

    setIsSearchingGoogle(true)
    try {
      const response = await fetch(`/api/google-places/search?query=${encodeURIComponent(googleSearchQuery)}&location=Jacksonville, FL`)
      const data = await response.json()

      if (data.status === 'success') {
        setGoogleSearchResults(data.results)
        setShowGoogleSearch(true)
      } else {
        toast.error(data.error || 'Failed to search Google Places')
      }
    } catch (error) {
      console.error('Error searching Google Places:', error)
      toast.error('Failed to search Google Places')
    } finally {
      setIsSearchingGoogle(false)
    }
  }

  const selectGooglePlace = (place: GooglePlace) => {
    setSelectedGooglePlace(place)
    setShowGoogleSearch(false)
    
    // Update form with Google data
    if (formData) {
      setFormData({
        ...formData,
        businessName: place.name || formData.businessName,
        description: place.editorial_summary?.overview || formData.description,
        phone: place.formatted_phone_number || formData.phone,
        website: place.website || formData.website,
        address: place.formatted_address || formData.address,
        googlePlacesId: place.place_id,
        googleRating: place.rating,
        googleReviewCount: place.user_ratings_total
      })
    }
    
    toast.success('Google Places data imported successfully!')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/providers/${providerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok && data.status === 'success') {
        toast.success('Provider updated successfully!')
        router.push('/admin/providers')
      } else {
        toast.error(data.error || 'Failed to update provider')
      }
    } catch (error) {
      console.error('Error updating provider:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout 
        title="Edit Provider" 
        subtitle="Update provider information"
        showBackButton={true}
        backUrl="/admin/providers"
      >
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error || !formData) {
    return (
      <AdminLayout 
        title="Edit Provider" 
        subtitle="Update provider information"
        showBackButton={true}
        backUrl="/admin/providers"
      >
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error || 'Provider not found'}</div>
              <button
                onClick={fetchProvider}
                className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout 
      title="Edit Provider" 
      subtitle="Update provider information"
      showBackButton={true}
      backUrl="/admin/providers"
    >
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Google Places Sync */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <GlobeAltIcon className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-medium text-blue-900">Sync with Google Places</h3>
            </div>
            <p className="text-blue-700 mb-4">
              Import the latest business information, reviews, and ratings from Google Places. This will update the business details, description, and contact information.
            </p>
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search for business on Google Places..."
                  value={googleSearchQuery}
                  onChange={(e) => setGoogleSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={searchGooglePlaces}
                disabled={isSearchingGoogle || !googleSearchQuery.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <MagnifyingGlassIcon className="w-4 h-4" />
                <span>{isSearchingGoogle ? 'Searching...' : 'Search'}</span>
              </button>
            </div>

            {/* Google Search Results */}
            {showGoogleSearch && googleSearchResults.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-blue-700">Search Results:</p>
                {googleSearchResults.map((place) => (
                  <div
                    key={place.place_id}
                    className="p-3 bg-white rounded-md border border-blue-200 hover:bg-blue-50 cursor-pointer transition-colors"
                    onClick={() => selectGooglePlace(place)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{place.name}</h4>
                        <p className="text-sm text-gray-600">{place.formatted_address}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          {place.formatted_phone_number && (
                            <span className="text-sm text-gray-500">{place.formatted_phone_number}</span>
                          )}
                          {place.rating && (
                            <div className="flex items-center space-x-1">
                              <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-500">
                                {place.rating} ({place.user_ratings_total} reviews)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <GlobeAltIcon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Current Google Places Data */}
            {selectedGooglePlace && (
              <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">
                      <strong>Imported from Google Places:</strong> {selectedGooglePlace.name}
                    </p>
                    {selectedGooglePlace.rating && (
                      <div className="flex items-center space-x-1 mt-1">
                        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-green-600">
                          {selectedGooglePlace.rating} stars ({selectedGooglePlace.user_ratings_total} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGooglePlace(null)
                      setFormData(prev => prev ? { ...prev, googlePlacesId: undefined, googleRating: undefined, googleReviewCount: undefined } : null)
                    }}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="businessName"
                  required
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State *
                </label>
                <input
                  type="text"
                  id="state"
                  required
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.filter(cat => cat.level === 'PRIMARY').map((category) => {
                const isSelected = formData.services.some(s => s.categoryId === category.id)
                const service = formData.services.find(s => s.categoryId === category.id)
                
                return (
                  <div key={category.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleServiceToggle(category.id, category.name, category.slug)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          {category.icon} {category.name}
                        </span>
                      </label>
                    </div>
                    
                    {isSelected && service && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Price (optional)"
                          value={service.price || ''}
                          onChange={(e) => updateService(category.id, 'price', e.target.value)}
                          className="block w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <textarea
                          placeholder="Service description (optional)"
                          value={service.description || ''}
                          onChange={(e) => updateService(category.id, 'description', e.target.value)}
                          rows={2}
                          className="block w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">
                  Sort Order
                </label>
                <input
                  type="number"
                  id="sortOrder"
                  value={formData.sortOrder}
                  onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 0)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-gray-500">Lower numbers appear first</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="active" className="text-sm font-medium text-gray-700">
                      Active Provider
                    </label>
                    <p className="text-sm text-gray-500">Show this provider to users</p>
                  </div>
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => handleInputChange('active', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="verified" className="text-sm font-medium text-gray-700">
                      Verified
                    </label>
                    <p className="text-sm text-gray-500">Mark as verified provider</p>
                  </div>
                  <input
                    type="checkbox"
                    id="verified"
                    checked={formData.verified}
                    onChange={(e) => handleInputChange('verified', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="premium" className="text-sm font-medium text-gray-700">
                      Premium
                    </label>
                    <p className="text-sm text-gray-500">Premium provider status</p>
                  </div>
                  <input
                    type="checkbox"
                    id="premium"
                    checked={formData.premium}
                    onChange={(e) => handleInputChange('premium', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                      Featured
                    </label>
                    <p className="text-sm text-gray-500">Featured provider status</p>
                  </div>
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/admin/providers')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Updating...' : 'Update Provider'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
} 