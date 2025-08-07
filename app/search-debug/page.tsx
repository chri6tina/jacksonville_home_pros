'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

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

export default function SearchDebugPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || ''
  
  const [allProviders, setAllProviders] = useState<Provider[]>([])
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [rawApiResponse, setRawApiResponse] = useState<string>('')
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  
  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toISOString()}: ${info}`])
  }

  // Fetch providers on component mount
  useEffect(() => {
    addDebugInfo(`SearchDebugPage useEffect triggered with category: ${category}`)
    
    const fetchProviders = async () => {
      try {
        setIsLoading(true)
        addDebugInfo('Starting to fetch providers...')
        
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
        }
        
        addDebugInfo(`Fetching from: ${apiUrl}`)
        const response = await fetch(apiUrl)
        const data = await response.json()
        
        addDebugInfo(`API response received. Status: ${data.status}`)
        setRawApiResponse(JSON.stringify(data, null, 2))
        
        if (data.status === 'success') {
          if (category && data.providers) {
            addDebugInfo(`Setting providers for category: ${data.providers.length} providers`)
            setAllProviders(data.providers)
          } else if (data.providers) {
            addDebugInfo(`Setting providers: ${data.providers.length} providers`)
            setAllProviders(data.providers)
          } else {
            addDebugInfo('No providers in response')
            setAllProviders([])
          }
        } else {
          addDebugInfo(`Failed to fetch providers: ${data.error}`)
          setAllProviders([])
        }
      } catch (error) {
        addDebugInfo(`Error fetching providers: ${error}`)
        setAllProviders([])
      } finally {
        addDebugInfo('Setting isLoading to false')
        setIsLoading(false)
      }
    }
    
    fetchProviders()
  }, [category])

  // Filter and sort providers
  useEffect(() => {
    addDebugInfo(`Filtering providers: ${allProviders.length} providers`)
    
    // Only filter if we have providers
    if (allProviders.length === 0) {
      setFilteredProviders([])
      return
    }
    
    let filtered = [...allProviders]
    
    // Log each provider's data
    allProviders.forEach((provider, index) => {
      addDebugInfo(`Provider ${index + 1}: ${provider.businessName}`)
      addDebugInfo(`  - Rating: ${provider.rating}`)
      addDebugInfo(`  - Review Count: ${provider.reviewCount}`)
      addDebugInfo(`  - Google Rating: ${provider.googleRating}`)
      addDebugInfo(`  - Google Review Count: ${provider.googleReviewCount}`)
      addDebugInfo(`  - Image: ${provider.image ? 'Yes' : 'No'}`)
    })

    addDebugInfo(`Filtered to: ${filtered.length} providers`)
    setFilteredProviders(filtered)
  }, [allProviders])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Search Debug Page</h1>
        
        {/* Debug Info */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Debug Information:</h2>
          <div className="bg-gray-100 p-4 rounded max-h-96 overflow-auto">
            {debugInfo.map((info, index) => (
              <div key={index} className="text-sm font-mono mb-1">{info}</div>
            ))}
          </div>
        </div>

        {/* Raw API Response */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Raw API Response:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
            {rawApiResponse}
          </pre>
        </div>

        {/* Provider Cards */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Provider Cards:</h2>
          <div className="space-y-6">
            {filteredProviders.map((provider) => (
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
                          addDebugInfo(`Image failed to load: ${provider.image}`)
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
              <strong>Total Providers:</strong> {filteredProviders.length}
            </div>
            <div>
              <strong>Providers with Google Data:</strong> {filteredProviders.filter(p => p.googleRating && p.googleReviewCount).length}
            </div>
            <div>
              <strong>Providers with Images:</strong> {filteredProviders.filter(p => p.image).length}
            </div>
            <div>
              <strong>Providers with Services:</strong> {filteredProviders.filter(p => p.services.length > 0).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 