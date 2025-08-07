'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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

interface FormData {
  businessName: string
  description: string
  phone: string
  email: string
  website: string
  address: string
  city: string
  state: string
  latitude?: number
  longitude?: number
  serviceRadius: number
  licenseNumber?: string
  insuranceStatus: boolean
  verified: boolean
  premium: boolean
  featured: boolean
  active: boolean
  sortOrder: number
  // Google Places integration fields
  googlePlacesId?: string
  googleRating?: number
  googleReviewCount?: number
  services: Array<{
    categoryId: string
    categoryName: string
    categorySlug: string
    description?: string
  }>
  serviceAreas: Array<{
    name: string
    type: string
    zipCodes: string[]
    active?: boolean
  }>
  operatingHours: Array<{
    day: number
    openTime: string
    closeTime: string
    isOpen: boolean
  }>
  images: Array<{
    url: string
    type: string
    caption?: string
    active?: boolean
  }>
}

interface GooglePlace {
  place_id: string
  name: string
  formatted_address: string
  formatted_phone_number?: string
  website?: string
  rating?: number
  user_ratings_total?: number
  geometry?: {
    location: {
      lat: number
      lng: number
    }
  }
  photos?: Array<{
    height: number
    width: number
    photo_reference: string
    html_attributions: string[]
  }>
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

export default function NewProviderPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: 'Jacksonville',
    state: 'FL',
    latitude: undefined,
    longitude: undefined,
    serviceRadius: 25,
    licenseNumber: undefined,
    insuranceStatus: false,
    verified: false,
    premium: false,
    featured: false,
    active: true,
    sortOrder: 0,
    googlePlacesId: undefined,
    googleRating: undefined,
    googleReviewCount: undefined,
    services: [],
    serviceAreas: [],
    operatingHours: [],
    images: []
  })

  // Google Places states
  const [isSearchingGoogle, setIsSearchingGoogle] = useState(false)
  const [googleSearchQuery, setGoogleSearchQuery] = useState('')
  const [googleSearchResults, setGoogleSearchResults] = useState<GooglePlace[]>([])
  const [showGoogleSearch, setShowGoogleSearch] = useState(false)
  const [selectedGooglePlace, setSelectedGooglePlace] = useState<GooglePlace | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      const data = await response.json()
      
      if (response.ok && data.status === 'success' && data.categories) {
        setCategories(data.categories)
      } else {
        console.error('Failed to fetch categories:', data.error)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleServiceToggle = (categoryId: string, categoryName: string, categorySlug: string) => {
    const existingService = formData.services.find(s => s.categoryId === categoryId)
    
    if (existingService) {
      // Remove service
      setFormData(prev => ({
        ...prev,
        services: prev.services.filter(s => s.categoryId !== categoryId)
      }))
    } else {
      // Add service
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, {
          categoryId,
          categoryName,
          categorySlug,
          description: ''
        }]
      }))
    }
  }

  const updateService = (categoryId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.categoryId === categoryId 
          ? { ...service, [field]: value }
          : service
      )
    }))
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

  const selectGooglePlace = async (place: GooglePlace) => {
    setSelectedGooglePlace(place)
    setShowGoogleSearch(false)
    
    // Extract zip code from formatted address
    let zipCode = ''
    if (place.formatted_address) {
      const addressParts = place.formatted_address.split(', ')
      const lastPart = addressParts[addressParts.length - 1]
      // Check if the last part is a zip code (5 digits or 5+4 format)
      if (/^\d{5}(-\d{4})?$/.test(lastPart)) {
        zipCode = lastPart
      }
    }
    
    // Update form with Google data
    setFormData(prev => ({
      ...prev,
      businessName: place.name || prev.businessName,
      description: place.editorial_summary?.overview || 
                   (place.reviews && place.reviews.length > 0 ? 
                     `${place.reviews[0].text.substring(0, 150)}...` : 
                     `Professional ${place.name} services in Jacksonville`) || 
                   prev.description,
      phone: place.formatted_phone_number || prev.phone,
      website: place.website || prev.website,
      address: place.formatted_address || prev.address,
      latitude: place.geometry?.location?.lat,
      longitude: place.geometry?.location?.lng,
      googlePlacesId: place.place_id,
      googleRating: place.rating,
      googleReviewCount: place.user_ratings_total
    }))
    
    // Fetch multiple images from Google Places if available
    if (place.photos && place.photos.length > 0) {
      try {
        // Import up to 5 photos (or all available if less than 5)
        const maxPhotos = Math.min(place.photos.length, 5)
        const photoPromises = place.photos.slice(0, maxPhotos).map(async (photo, index) => {
          const imageUrl = `/api/google-places/photo?photoreference=${photo.photo_reference}&maxwidth=400`
          
          return {
            url: imageUrl,
            type: index === 0 ? 'PROFILE' : 'GALLERY',
            caption: index === 0 
              ? `${place.name} - Main Business Photo` 
              : `${place.name} - Business Photo ${index + 1}`,
            active: true
          }
        })
        
        // Wait for all photo URLs to be generated
        const photoImages = await Promise.all(photoPromises)
        
        // Add all images to the form data
        setFormData(prev => ({
          ...prev,
          images: photoImages
        }))
        
        toast.success(`Google Places data and ${maxPhotos} images imported successfully!`)
      } catch (error) {
        console.error('Error fetching images:', error)
        toast.success('Google Places data imported successfully! (Images could not be loaded)')
      }
    } else {
      toast.success('Google Places data imported successfully!')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
              // Prepare the data for the API
        const providerData = {
          businessName: formData.businessName,
          description: formData.description,
          phone: formData.phone,
          email: formData.email,
          website: formData.website,
          address: formData.address || '',
          city: formData.city,
          state: formData.state,
          latitude: formData.latitude,
          longitude: formData.longitude,
          serviceRadius: formData.serviceRadius,
          licenseNumber: formData.licenseNumber,
          insuranceStatus: formData.insuranceStatus,
          verified: formData.verified || false,
          premium: formData.premium || false,
          featured: formData.featured || false,
          active: formData.active || true,
          sortOrder: formData.sortOrder || 0,
          googlePlacesId: formData.googlePlacesId,
          googleRating: formData.googleRating,
          googleReviewCount: formData.googleReviewCount,
          services: formData.services.map(service => ({
            categoryId: service.categoryId,
            categoryName: service.categoryName,
            categorySlug: service.categorySlug,
            description: service.description
          })),
          serviceAreas: formData.serviceAreas.map(area => ({
            name: area.name,
            type: area.type,
            zipCodes: area.zipCodes
          })),
          operatingHours: formData.operatingHours.map(hour => ({
            day: hour.day,
            openTime: hour.openTime,
            closeTime: hour.closeTime,
            isOpen: hour.isOpen
          })),
          images: formData.images.map(image => ({
            url: image.url,
            type: image.type,
            caption: image.caption
          }))
        }

      const response = await fetch('/api/providers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(providerData)
      })

      const data = await response.json()

      if (response.ok && data.status === 'success') {
        toast.success('Provider added successfully! Categories page will now show updated provider counts.')
        router.push('/categories')
      } else {
        toast.error(data.error || 'Failed to add provider')
      }
    } catch (error) {
      console.error('Error adding provider:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminLayout 
      title="Add Provider" 
      subtitle="Create a new service provider"
      showBackButton={true}
      backUrl="/admin/providers"
    >
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Google Places Sync */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <GlobeAltIcon className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-medium text-blue-900">Import from Google Places</h3>
            </div>
            <p className="text-blue-700 mb-4">
              Search for a business on Google Places to auto-fill business information, including name, address, phone, website, and description.
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
                      setFormData(prev => ({
                        ...prev,
                        businessName: '',
                        description: '',
                        phone: '',
                        website: '',
                        address: '',
                        latitude: undefined,
                        longitude: undefined,
                        images: []
                      }))
                    }}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    Clear
                  </button>
                </div>
                
                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <p className="text-sm font-medium text-green-700 mb-2">Imported Image:</p>
                    <div className="flex items-center space-x-3">
                      <img 
                        src={formData.images[0].url} 
                        alt={formData.images[0].caption || 'Business photo'}
                        className="w-16 h-16 object-cover rounded-md border border-green-200"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <div>
                        <p className="text-sm text-green-600">{formData.images[0].caption}</p>
                        <p className="text-xs text-green-500">This image will be used for the provider card</p>
                      </div>
                    </div>
                  </div>
                )}
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
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
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


            </div>
          </div>

          {/* Business Details */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                  License Number
                </label>
                <input
                  type="text"
                  id="licenseNumber"
                  value={formData.licenseNumber || ''}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>



              <div>
                <label htmlFor="serviceRadius" className="block text-sm font-medium text-gray-700">
                  Service Radius (miles)
                </label>
                <input
                  type="number"
                  id="serviceRadius"
                  value={formData.serviceRadius}
                  onChange={(e) => handleInputChange('serviceRadius', parseInt(e.target.value) || 0)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="insuranceStatus" className="text-sm font-medium text-gray-700">
                    Insurance Status
                  </label>
                  <p className="text-sm text-gray-500">Provider has insurance coverage</p>
                </div>
                <input
                  type="checkbox"
                  id="insuranceStatus"
                  checked={formData.insuranceStatus}
                  onChange={(e) => handleInputChange('insuranceStatus', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Google Places Review Data */}
          {(formData.googleRating || formData.googleReviewCount) && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Google Places Review Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="googleRating" className="block text-sm font-medium text-gray-700">
                    Google Rating
                  </label>
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      type="number"
                      id="googleRating"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.googleRating || ''}
                      onChange={(e) => handleInputChange('googleRating', parseFloat(e.target.value) || undefined)}
                      className="block w-24 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex items-center space-x-1">
                      <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-500">out of 5</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="googleReviewCount" className="block text-sm font-medium text-gray-700">
                    Number of Reviews
                  </label>
                  <input
                    type="number"
                    id="googleReviewCount"
                    value={formData.googleReviewCount || ''}
                    onChange={(e) => handleInputChange('googleReviewCount', parseInt(e.target.value) || undefined)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="googlePlacesId" className="block text-sm font-medium text-gray-700">
                    Google Places ID
                  </label>
                  <input
                    type="text"
                    id="googlePlacesId"
                    value={formData.googlePlacesId || ''}
                    onChange={(e) => handleInputChange('googlePlacesId', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Auto-filled from Google Places"
                  />
                  <p className="text-sm text-gray-500 mt-1">Used for syncing with Google Places</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="verified" className="text-sm font-medium text-gray-700">
                    Verified Provider
                  </label>
                  <p className="text-sm text-gray-500">Mark this provider as verified</p>
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
                    Premium Provider
                  </label>
                  <p className="text-sm text-gray-500">Mark this provider as premium</p>
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
                    Featured Provider
                  </label>
                  <p className="text-sm text-gray-500">Feature this provider prominently</p>
                </div>
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="active" className="text-sm font-medium text-gray-700">
                    Active Provider
                  </label>
                  <p className="text-sm text-gray-500">Mark this provider as active</p>
                </div>
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>

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

          {/* Images */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Business Images</h3>
            <p className="text-sm text-gray-600 mb-4">
              Images will be displayed on the provider card and profile page. The first image will be used as the main profile photo. 
              When importing from Google Places, up to 5 photos will be automatically added to create a gallery.
            </p>
            
            {formData.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="relative">
                      <img 
                        src={image.url} 
                        alt={image.caption || `Business image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Main Photo
                        </div>
                      )}
                      {index > 0 && (
                        <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                          Gallery
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index)
                          }))
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Image caption"
                        value={image.caption || ''}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            images: prev.images.map((img, i) => 
                              i === index ? { ...img, caption: e.target.value } : img
                            )
                          }))
                        }}
                        className="block w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No images added yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Import up to 5 images from Google Places or add them manually
                </p>
              </div>
            )}
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
              {isSubmitting ? 'Adding...' : 'Add Provider'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
} 