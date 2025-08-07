'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon, 
  CheckBadgeIcon,
  SparklesIcon,
  ClockIcon,
  ShieldCheckIcon,
  HeartIcon
} from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'

interface ProviderCardProps {
  provider: {
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
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
      )
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4">
          <StarIcon className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <StarIcon className="w-4 h-4 text-yellow-400" />
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

  // Get the primary image URL
  const getImageUrl = () => {
    if (imageError) return '/images/default-provider.svg'
    
    // First try the main image field
    if (provider.image && provider.image !== '/images/default-provider.svg') {
      return provider.image
    }
    
    // Then try the first image from the images array
    if (provider.images && provider.images.length > 0) {
      return provider.images[0].url
    }
    
    // Fallback to default
    return '/images/default-provider.svg'
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

  // Format review count
  const formatReviewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <div className="provider-card group bg-white rounded-xl shadow-soft border border-neutral-100 overflow-hidden hover:shadow-medium transition-all duration-300 hover:scale-[1.01] relative">
      {/* Featured Badge */}
      {provider.featured && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
            ⭐ Featured
          </div>
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
      >
        {isFavorite ? (
          <HeartIcon className="w-5 h-5 text-red-500" />
        ) : (
          <HeartIconOutline className="w-5 h-5 text-neutral-400 group-hover:text-red-400 transition-colors" />
        )}
      </button>

      {/* Header */}
      <div className="p-5 border-b border-neutral-100">
        <div className="flex items-start space-x-4">
          {/* Provider Image */}
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 shadow-sm">
            <Image
              src={getImageUrl()}
              alt={provider.businessName}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Business Name and Badges */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-neutral-900 truncate group-hover:text-primary-600 transition-colors">
                {provider.businessName}
              </h3>
              <div className="flex items-center space-x-2 ml-3 flex-shrink-0">
                {provider.verified && (
                  <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                    <CheckBadgeIcon className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium text-green-700">Verified</span>
                  </div>
                )}
                {provider.premium && (
                  <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-200">
                    <SparklesIcon className="w-3 h-3 text-yellow-600" />
                    <span className="text-xs font-medium text-yellow-700">Premium</span>
                  </div>
                )}
              </div>
            </div>
          
            {/* Rating and Reviews */}
            <div className="flex items-start space-x-3 mb-3">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1">
                  {renderStars(getDisplayRating())}
                </div>
                <span className="text-sm text-neutral-600">
                  ({formatReviewCount(getDisplayReviewCount())} {isGoogleData ? 'Google' : ''} reviews)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-neutral-900">
                  {getDisplayRating().toFixed(1)}
                </span>
                {isGoogleData && (
                  <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full border border-blue-200">
                    <span className="text-xs font-medium text-blue-700">Google Verified</span>
                    <StarIcon className="w-3 h-3 text-yellow-400" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Location */}
            <div className="flex items-center space-x-1 text-sm text-neutral-600">
              <MapPinIcon className="w-4 h-4 text-primary-500" />
              <span>{provider.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Description */}
        <p className="text-neutral-700 text-sm leading-relaxed mb-4 line-clamp-2">
          {provider.description && provider.description !== 'n/a' ? 
            provider.description : 
            `Professional ${provider.services[0]?.categoryName || 'service'} provider in ${provider.location}. We are committed to delivering exceptional quality and outstanding customer service.`
          }
        </p>
        
        {/* Services */}
        <div className="flex flex-wrap gap-2 mb-4">
          {provider.services.slice(0, 3).map((service) => (
            <span
              key={service.id}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 border border-primary-200"
            >
              {service.categoryName}
            </span>
          ))}
          {provider.services.length > 3 && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
              +{provider.services.length - 3} more
            </span>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 py-3 bg-neutral-50 rounded-lg px-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary-100 rounded flex items-center justify-center">
              <ClockIcon className="w-3 h-3 text-primary-600" />
            </div>
            <div>
              <div className="text-xs text-neutral-500 font-medium uppercase tracking-wide">Response Time</div>
              <div className="text-sm font-semibold text-neutral-900">Usually responds in 2 hours</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
              <ShieldCheckIcon className="w-3 h-3 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-neutral-500 font-medium uppercase tracking-wide">Insurance</div>
              <div className="text-sm font-semibold text-neutral-900">Fully Insured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-neutral-100 bg-neutral-50">
        <div className="flex items-center justify-between">
          <Link
            href={`/providers/${provider.slug}`}
            className="inline-flex items-center px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
          >
            View Profile
          </Link>
          
          <div className="flex items-center space-x-3">
            {provider.phone && (
              <a 
                href={`tel:${provider.phone}`}
                className="p-3 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200 border border-primary-200 hover:border-primary-300"
                title="Call Now"
              >
                <PhoneIcon className="w-6 h-6" />
              </a>
            )}
            {provider.premium && (
              <Link
                href={`/providers/${provider.slug}/book`}
                className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
              >
                Book Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 