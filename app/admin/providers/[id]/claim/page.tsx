'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { 
  BuildingOfficeIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

interface Provider {
  id: string
  businessName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  description: string
  verified: boolean
  premium: boolean
  featured: boolean
  claimed: boolean
  claimedBy?: {
    id: string
    name: string
    email: string
  }
}

export default function ClaimProviderPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const providerId = searchParams.get('id')
  const claimToken = searchParams.get('token')

  const [provider, setProvider] = useState<Provider | null>(null)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`)
      return
    }

    if (providerId) {
      fetchProvider()
    }
  }, [session, status, providerId])

  const fetchProvider = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/providers/${providerId}/claim`)
      
      if (response.ok) {
        const data = await response.json()
        setProvider(data.provider)
      } else {
        setError('Provider not found or already claimed')
      }
    } catch (error) {
      setError('Failed to load provider information')
    } finally {
      setLoading(false)
    }
  }

  const handleClaim = async () => {
    if (!session?.user || !provider) return

    setClaiming(true)
    setError(null)

    try {
      const response = await fetch(`/api/providers/${provider.id}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: session.user.id,
          claimToken: claimToken
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        // Redirect to provider dashboard after 3 seconds
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
      } else {
        setError(data.error || 'Failed to claim provider')
      }
    } catch (error) {
      setError('An error occurred while claiming the provider')
    } finally {
      setClaiming(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (error && !provider) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-soft p-8 text-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Provider Not Found</h1>
          <p className="text-neutral-600 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-soft p-8 text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Successfully Claimed!</h1>
          <p className="text-neutral-600 mb-6">
            You have successfully claimed {provider?.businessName}. You will be redirected to your dashboard shortly.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!provider) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-4"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Claim Your Business
          </h1>
          <p className="text-neutral-600">
            Verify your ownership and claim control of your business profile
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Provider Information */}
          <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <BuildingOfficeIcon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">{provider.businessName}</h2>
                <p className="text-neutral-600">{provider.city}, {provider.state}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-sm font-medium text-neutral-700">Email:</span>
                <p className="text-neutral-900">{provider.email}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-neutral-700">Phone:</span>
                <p className="text-neutral-900">{provider.phone}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-sm font-medium text-neutral-700">Address:</span>
                <p className="text-neutral-900">{provider.address}</p>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-neutral-700">Description:</span>
              <p className="text-neutral-900 mt-1">{provider.description}</p>
            </div>
          </div>

          {/* Claim Form */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Verify Your Identity
            </h3>

            <div className="mb-6">
              <p className="text-neutral-600 mb-4">
                To claim this business, you must verify that you are the owner or authorized representative.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-blue-900 mb-2">Verification Requirements:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Email address must match the business email</li>
                  <li>• You must be the business owner or authorized representative</li>
                  <li>• You agree to provide additional verification if requested</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Email Verification</p>
                    <p className="text-sm text-gray-600">
                      Your email ({session?.user?.email}) will be verified against the business email
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleClaim}
                disabled={claiming}
                className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {claiming ? 'Claiming...' : 'Claim This Business'}
              </button>
              
              <Link
                href="/"
                className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 font-medium"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 