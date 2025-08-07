'use client'

import { useState, useEffect } from 'react'

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

export default function TestProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rawData, setRawData] = useState<string>('')

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('Fetching providers from test API...')
        // Use the test API endpoint with cache-busting
        const response = await fetch('/api/test-providers?category=plumbing&t=' + Date.now())
        const data = await response.json()
        
        console.log('Raw API response:', data)
        setRawData(JSON.stringify(data, null, 2))
        
        if (data.status === 'success' && data.providers) {
          console.log('Setting providers:', data.providers)
          setProviders(data.providers)
        } else {
          console.error('No providers in response:', data)
          setError('No providers found in response')
        }
      } catch (err) {
        console.error('Error fetching providers:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProviders()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Test Providers Page (Test API)</h1>
          <div className="bg-white rounded-lg p-6">
            <p className="text-lg">Loading providers...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Test Providers Page (Test API)</h1>
          <div className="bg-white rounded-lg p-6">
            <p className="text-lg text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Providers Page (Test API)</h1>
        
        {/* Raw API Data */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Raw API Response:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
            {rawData}
          </pre>
        </div>

        {/* Processed Provider Data */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Processed Provider Data:</h2>
          <div className="space-y-6">
            {providers.map((provider, index) => (
              <div key={provider.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">{provider.businessName}</h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>ID:</strong> {provider.id}
                  </div>
                  <div>
                    <strong>Location:</strong> {provider.location}
                  </div>
                  <div>
                    <strong>Rating:</strong> {provider.rating}
                  </div>
                  <div>
                    <strong>Review Count:</strong> {provider.reviewCount}
                  </div>
                  <div>
                    <strong>Google Rating:</strong> {provider.googleRating || 'N/A'}
                  </div>
                  <div>
                    <strong>Google Review Count:</strong> {provider.googleReviewCount || 'N/A'}
                  </div>
                  <div>
                    <strong>Google Places ID:</strong> {provider.googlePlacesId || 'N/A'}
                  </div>
                  <div>
                    <strong>Image:</strong> {provider.image ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <strong>Services:</strong> {provider.services.length} service(s)
                  </div>
                  <div>
                    <strong>Verified:</strong> {provider.verified ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <strong>Premium:</strong> {provider.premium ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <strong>Featured:</strong> {provider.featured ? 'Yes' : 'No'}
                  </div>
                </div>
                
                <div className="mt-4">
                  <strong>Description:</strong>
                  <p className="text-gray-600 mt-1">{provider.description}</p>
                </div>
                
                <div className="mt-4">
                  <strong>Services:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {provider.services.map(service => (
                      <span key={service.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {service.categoryName}
                      </span>
                    ))}
                  </div>
                </div>
                
                {provider.image && (
                  <div className="mt-4">
                    <strong>Image:</strong>
                    <div className="mt-2">
                      <img 
                        src={provider.image} 
                        alt={provider.businessName}
                        className="w-32 h-32 object-cover rounded"
                        onError={(e) => {
                          console.log('Image failed to load:', provider.image)
                          e.currentTarget.src = '/images/default-provider.svg'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Summary:</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Total Providers:</strong> {providers.length}
            </div>
            <div>
              <strong>Providers with Google Data:</strong> {providers.filter(p => p.googleRating && p.googleReviewCount).length}
            </div>
            <div>
              <strong>Providers with Images:</strong> {providers.filter(p => p.image).length}
            </div>
            <div>
              <strong>Providers with Services:</strong> {providers.filter(p => p.services.length > 0).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 