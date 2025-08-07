'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/layout/admin-layout'
import { PlusIcon, PencilIcon, EyeIcon, TrashIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

interface Provider {
  id: string
  businessName: string
  phone: string
  email: string
  city: string
  state: string
  verified: boolean
  premium: boolean
  featured: boolean
  active: boolean
  userId?: string
  claimedAt?: string
}

export default function AdminProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingProvider, setDeletingProvider] = useState<string | null>(null)
  const [sendingClaimLink, setSendingClaimLink] = useState<string | null>(null)

  useEffect(() => {
    fetchProviders()
  }, [])

  const fetchProviders = async () => {
    try {
      const response = await fetch('/api/providers')
      const data = await response.json()

      if (data.status === 'success' && data.providers) {
        setProviders(data.providers)
      } else {
        setError(data.error || 'Failed to fetch providers')
        setProviders([])
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching providers.')
      setProviders([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProvider = async (providerId: string, providerName: string) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete "${providerName}"? This action cannot be undone and will also delete all associated services and reviews.`
    )

    if (!confirmed) {
      return
    }

    setDeletingProvider(providerId)

    try {
      const response = await fetch(`/api/providers/${providerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok && data.status === 'success') {
        toast.success(`Provider "${providerName}" deleted successfully`)
        // Remove the provider from the local state
        setProviders(prev => prev.filter(provider => provider.id !== providerId))
      } else {
        toast.error(data.error || 'Failed to delete provider')
      }
    } catch (error) {
      console.error('Error deleting provider:', error)
      toast.error('An unexpected error occurred while deleting the provider')
    } finally {
      setDeletingProvider(null)
    }
  }

  const sendClaimLink = async (providerId: string, providerEmail: string, providerName: string) => {
    setSendingClaimLink(providerId)

    try {
      const response = await fetch(`/api/admin/providers/${providerId}/claim-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(`Claim link sent to ${providerEmail}`)
      } else {
        toast.error(data.error || 'Failed to send claim link')
      }
    } catch (error) {
      console.error('Error sending claim link:', error)
      toast.error('An unexpected error occurred while sending the claim link')
    } finally {
      setSendingClaimLink(null)
    }
  }

  const toggleProviderStatus = async (providerId: string, currentActive: boolean) => {
    try {
      const response = await fetch(`/api/providers/${providerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          active: !currentActive
        })
      })

      const data = await response.json()

      if (response.ok && data.status === 'success') {
        toast.success(`Provider ${!currentActive ? 'activated' : 'deactivated'} successfully`)
        // Update the provider in local state
        setProviders(prev => prev.map(provider => 
          provider.id === providerId 
            ? { ...provider, active: !currentActive }
            : provider
        ))
      } else {
        toast.error(data.error || 'Failed to update provider status')
      }
    } catch (error) {
      console.error('Error updating provider status:', error)
      toast.error('An unexpected error occurred while updating the provider')
    }
  }

  if (isLoading) {
    return (
      <AdminLayout title="Providers" subtitle="Manage your service providers">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="bg-white shadow rounded-lg">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4 p-4"></div>
            <div className="space-y-3 p-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout title="Providers" subtitle="Manage your service providers">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
              <button
                onClick={fetchProviders}
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
      title="Providers" 
      subtitle="Manage your service providers"
    >
      {/* Header with actions */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            {providers.length} provider{providers.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/categories"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <EyeIcon className="h-4 w-4 mr-2" />
            View Categories
          </Link>
          <Link
            href="/admin/providers/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Provider
          </Link>
        </div>
      </div>

      {/* Providers list */}
      {providers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first provider.</p>
          <div className="flex space-x-3 justify-center">
            <Link
              href="/categories"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              <EyeIcon className="h-4 w-4 mr-2" />
              View Categories
            </Link>
            <Link
              href="/admin/providers/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Provider
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="divide-y divide-gray-200">
            {providers.map((provider) => (
              <div key={provider.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {provider.businessName}
                        </h3>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <span>📞 {provider.phone}</span>
                          <span>📧 {provider.email}</span>
                          <span>📍 {provider.city}, {provider.state}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Status badges */}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          provider.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {provider.active ? 'Active' : 'Inactive'}
                        </span>
                        {provider.verified && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Verified
                          </span>
                        )}
                        {provider.premium && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Premium
                          </span>
                        )}
                        {provider.featured && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex items-center space-x-2">
                    {/* Status toggle */}
                    <button
                      onClick={() => toggleProviderStatus(provider.id, provider.active)}
                      className={`p-2 rounded-md text-sm font-medium ${
                        provider.active
                          ? 'text-green-600 hover:text-green-900 hover:bg-green-50'
                          : 'text-red-600 hover:text-red-900 hover:bg-red-50'
                      }`}
                      title={provider.active ? 'Deactivate' : 'Activate'}
                    >
                      {provider.active ? '✓' : '✗'}
                    </button>

                    {/* View button */}
                    <Link
                      href={`/providers/${provider.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded-md"
                      title="View Provider"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Link>

                    {/* Edit button */}
                    <Link
                      href={`/admin/providers/${provider.id}/edit`}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded-md"
                      title="Edit Provider"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Link>

                    {/* Claim Link button - only show if not claimed */}
                    {!provider.userId && (
                      <button
                        onClick={() => sendClaimLink(provider.id, provider.email, provider.businessName)}
                        disabled={sendingClaimLink === provider.id}
                        className="p-2 text-gray-400 hover:text-green-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Send Claim Link"
                      >
                        {sendingClaimLink === provider.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                        ) : (
                          <EnvelopeIcon className="h-4 w-4" />
                        )}
                      </button>
                    )}

                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteProvider(provider.id, provider.businessName)}
                      disabled={deletingProvider === provider.id}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete Provider"
                    >
                      {deletingProvider === provider.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                      ) : (
                        <TrashIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  )
} 