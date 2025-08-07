'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  BuildingOfficeIcon, 
  PlusIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface UnclaimedProvider {
  id: string
  businessName: string
  email: string
  phone: string
  city: string
  state: string
  description: string
}

export default function ClaimBusinessPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [unclaimedProviders, setUnclaimedProviders] = useState<UnclaimedProvider[]>([])
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Only show this page to users who aren't already providers
    if (session.user.role === 'PROVIDER') {
      router.push('/dashboard')
      return
    }
  }, [session, status, router])

  const searchBusinesses = async () => {
    if (!searchTerm.trim()) return

    setSearching(true)
    setError(null)

    try {
      const response = await fetch(`/api/providers/unclaimed?search=${encodeURIComponent(searchTerm)}`)
      const data = await response.json()

      if (response.ok) {
        setUnclaimedProviders(data.providers)
      } else {
        setError(data.error || 'Failed to search businesses')
      }
    } catch (error) {
      setError('An error occurred while searching')
    } finally {
      setSearching(false)
    }
  }

  const handleClaim = async (providerId: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/providers/${providerId}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: session?.user.id
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        setError(data.error || 'Failed to claim business')
      }
    } catch (error) {
      setError('An error occurred while claiming the business')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-4"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Claim Your Business
          </h1>
          <p className="text-neutral-600">
            Search for your existing business or create a new one
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search Section */}
          <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Search for Your Business
            </h2>
            <p className="text-neutral-600 mb-6">
              If your business is already listed on our platform, you can claim it by searching below.
            </p>

            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by business name, phone, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchBusinesses()}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              <button
                onClick={searchBusinesses}
                disabled={searching || !searchTerm.trim()}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {searching ? 'Searching...' : 'Search'}
              </button>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* Search Results */}
          {unclaimedProviders.length > 0 && (
            <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Found {unclaimedProviders.length} unclaimed business{unclaimedProviders.length !== 1 ? 'es' : ''}
              </h3>
              
              <div className="space-y-4">
                {unclaimedProviders.map((provider) => (
                  <div key={provider.id} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-neutral-900">{provider.businessName}</h4>
                        <div className="text-sm text-neutral-600 mt-1">
                          <span>📧 {provider.email}</span>
                          {provider.phone && <span className="ml-4">📞 {provider.phone}</span>}
                          <span className="ml-4">📍 {provider.city}, {provider.state}</span>
                        </div>
                        {provider.description && (
                          <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                            {provider.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleClaim(provider.id)}
                        disabled={loading}
                        className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      >
                        {loading ? 'Claiming...' : 'Claim This Business'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Create New Business */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <PlusIcon className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                  Create New Business Profile
                </h2>
                <p className="text-neutral-600 mb-4">
                  If your business isn't listed yet, you can create a new profile and start managing it right away.
                </p>
                <Link
                  href="/providers/register"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create New Business
                </Link>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Need Help?
            </h3>
            <p className="text-blue-800 mb-4">
              If you're having trouble claiming your business or need assistance, contact our support team.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Contact Support
              </Link>
              <Link
                href="/help"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 