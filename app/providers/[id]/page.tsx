'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  GlobeAltIcon,
  ClockIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

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

export default function ProviderPage() {
  const params = useParams()
  const providerSlug = params.id as string
  
  const [provider, setProvider] = useState<Provider | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('Fetching provider from API...', providerSlug)
        const response = await fetch(`/api/providers/${providerSlug}?t=${Date.now()}`, {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        const data = await response.json()
        
        console.log('Provider API response:', data)
        
        if (data.status === 'success' && data.provider) {
          console.log('Setting provider data:', data.provider)
          setProvider(data.provider)
        } else {
          console.error('No provider in response:', data)
          setError('Provider not found')
        }
      } catch (err) {
        console.error('Error fetching provider:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    if (providerSlug) {
      fetchProvider()
    }
  }, [providerSlug])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="container-responsive py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">Loading...</h1>
            <p className="text-neutral-600">Please wait while we load the provider information.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="container-responsive py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">Provider not found</h1>
            <p className="text-neutral-600 mb-6">
              {error || "The provider you're looking for doesn't exist."}
            </p>
            <Link 
              href="/search"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Search Providers
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % provider.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + provider.images.length) % provider.images.length)
  }

  // Get the rating to display
  const getDisplayRating = () => {
    return provider.googleRating || provider.rating || 0
  }

  // Get the review count to display
  const getDisplayReviewCount = () => {
    return provider.googleReviewCount || provider.reviewCount || 0
  }

  // Check if this is Google data
  const isGoogleData = provider.googleRating && provider.googleReviewCount

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container-responsive py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-neutral-500 mb-6">
              <Link href="/" className="hover:text-primary-600 transition-colors">
                Home
              </Link>
              <ChevronRightIcon className="w-4 h-4" />
              <Link href="/search" className="hover:text-primary-600 transition-colors">
                Providers
              </Link>
              <ChevronRightIcon className="w-4 h-4" />
              <span className="text-neutral-900">{provider.businessName}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Provider Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                      {provider.businessName}
                    </h1>
                    <p className="text-lg text-neutral-600 mb-4">
                      Professional {provider.services[0]?.categoryName || 'service'} provider in {provider.location}
                    </p>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 text-lg font-semibold text-neutral-900">
                          {getDisplayRating().toFixed(1)}
                        </span>
                        <span className="ml-1 text-neutral-500">
                          ({getDisplayReviewCount()} {isGoogleData ? 'Google' : ''} reviews)
                        </span>
                        {isGoogleData && (
                          <span className="ml-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            Google Verified ⭐
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-neutral-500">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {provider.location}
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center space-x-2 mb-6">
                      {provider.verified && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <CheckBadgeIcon className="w-4 h-4 mr-1" />
                          Verified
                        </span>
                      )}
                      {provider.premium && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          <ShieldCheckIcon className="w-4 h-4 mr-1" />
                          Premium
                        </span>
                      )}
                      {provider.featured && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 rounded-full border border-neutral-300 hover:bg-neutral-50 transition-colors"
                  >
                    {isFavorite ? (
                      <HeartIconSolid className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6 text-neutral-400" />
                    )}
                  </button>
                </div>

                {/* Contact Actions */}
                <div className="flex flex-wrap items-center space-x-4">
                  {provider.phone && (
                    <a 
                      href={`tel:${provider.phone}`}
                      className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors font-medium"
                    >
                      <PhoneIcon className="w-5 h-5 mr-2" />
                      Call Now
                    </a>
                  )}
                  <button className="inline-flex items-center px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors font-medium">
                    <EnvelopeIcon className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                  {provider.website && (
                    <a 
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors font-medium"
                    >
                      <GlobeAltIcon className="w-5 h-5 mr-2" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="lg:col-span-1">
                <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Info</h3>
                  
                  <div className="space-y-4">
                    {provider.phone && (
                      <div>
                        <div className="flex items-center text-sm text-neutral-600 mb-1">
                          <PhoneIcon className="w-4 h-4 mr-2" />
                          Phone
                        </div>
                        <p className="font-medium text-neutral-900">{provider.phone}</p>
                      </div>
                    )}
                    
                    {provider.email && (
                      <div>
                        <div className="flex items-center text-sm text-neutral-600 mb-1">
                          <EnvelopeIcon className="w-4 h-4 mr-2" />
                          Email
                        </div>
                        <p className="font-medium text-neutral-900">{provider.email}</p>
                      </div>
                    )}
                    
                    <div>
                      <div className="flex items-center text-sm text-neutral-600 mb-1">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        Location
                      </div>
                      <p className="font-medium text-neutral-900">{provider.location}</p>
                    </div>
                    
                    {provider.address && (
                      <div>
                        <div className="flex items-center text-sm text-neutral-600 mb-1">
                          <MapPinIcon className="w-4 h-4 mr-2" />
                          Address
                        </div>
                        <p className="font-medium text-neutral-900">{provider.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="container-responsive py-8">
          <div className="border-b border-neutral-200 mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'services', name: 'Services' },
                { id: 'gallery', name: 'Gallery' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">About {provider.businessName}</h2>
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    {provider.description && provider.description !== 'n/a' ? 
                      provider.description : 
                      `Professional ${provider.services[0]?.categoryName || 'service'} provider in ${provider.location}. We are committed to delivering high-quality services to our customers.`
                    }
                  </p>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">Services</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {provider.services.map((service) => (
                      <span
                        key={service.id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                      >
                        {service.categoryName}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-soft p-6 border border-neutral-100">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Provider Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-neutral-700">Status:</span>
                        <span className="text-sm text-neutral-600">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-neutral-700">Verified:</span>
                        <span className="text-sm text-neutral-600">{provider.verified ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-neutral-700">Premium:</span>
                        <span className="text-sm text-neutral-600">{provider.premium ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-neutral-700">Featured:</span>
                        <span className="text-sm text-neutral-600">{provider.featured ? 'Yes' : 'No'}</span>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {provider.services.map((service) => (
                    <div key={service.id} className="bg-white rounded-xl shadow-soft p-6 border border-neutral-100">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{service.categoryName}</h3>
                      <p className="text-neutral-600 mb-4">
                        Professional {service.categoryName.toLowerCase()} services in {provider.location}.
                      </p>
                      <button className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                        Get Quote
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Photo Gallery</h2>
                {provider.images && provider.images.length > 0 ? (
                  <div className="relative">
                    {/* Main Image */}
                    <div className="relative bg-neutral-200 rounded-xl overflow-hidden aspect-video mb-4">
                      <img
                        src={provider.images[currentImageIndex].url}
                        alt={provider.images[currentImageIndex].alt || provider.businessName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log('Image failed to load:', provider.images[currentImageIndex].url)
                          e.currentTarget.src = '/images/default-provider.svg'
                        }}
                      />
                      
                      {/* Navigation Arrows */}
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <ChevronLeftIcon className="w-6 h-6 text-neutral-600" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <ChevronRightIcon className="w-6 h-6 text-neutral-600" />
                      </button>
                    </div>
                    
                    {/* Thumbnail Navigation */}
                    <div className="flex space-x-2">
                      {provider.images.map((image, index) => (
                        <button
                          key={image.id}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-16 h-16 rounded-lg overflow-hidden ${
                            index === currentImageIndex ? 'ring-2 ring-primary-500' : ''
                          }`}
                        >
                          <img
                            src={image.url}
                            alt={image.alt || provider.businessName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.log('Thumbnail failed to load:', image.url)
                              e.currentTarget.src = '/images/default-provider.svg'
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-32 h-32 mx-auto bg-neutral-200 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-4xl">🏠</span>
                    </div>
                    <p className="text-neutral-600">No photos available yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 