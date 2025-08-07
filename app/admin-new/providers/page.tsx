'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Provider {
  id: string
  businessName: string
  phone: string
  email: string
  category: string
  rating: number
  active: boolean
}

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: '1',
      businessName: 'Metro Rooter Plumbers',
      phone: '(904) 555-0123',
      email: 'info@metrorooter.com',
      category: 'Plumbing',
      rating: 4.8,
      active: true
    },
    {
      id: '2',
      businessName: 'Jacksonville HVAC Pro',
      phone: '(904) 555-0124',
      email: 'service@jaxhvac.com',
      category: 'HVAC',
      rating: 4.9,
      active: true
    },
    {
      id: '3',
      businessName: 'Elite Electrical Services',
      phone: '(904) 555-0125',
      email: 'hello@eliteelectric.com',
      category: 'Electrical',
      rating: 4.7,
      active: false
    }
  ])

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const isAuth = localStorage.getItem('admin-authenticated') === 'true'
    if (!isAuth) {
      window.location.href = '/admin-new'
    } else {
      setIsAuthenticated(true)
    }
  }, [])

  const toggleProviderStatus = (id: string) => {
    setProviders(providers.map(provider => 
      provider.id === id 
        ? { ...provider, active: !provider.active }
        : provider
    ))
  }

  const deleteProvider = (id: string) => {
    if (confirm('Are you sure you want to delete this provider?')) {
      setProviders(providers.filter(provider => provider.id !== id))
    }
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin-new" className="text-blue-600 hover:text-blue-800">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Manage Providers</h1>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('admin-authenticated')
                window.location.href = '/admin-new'
              }}
              className="text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Actions */}
        <div className="mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add New Provider
          </button>
        </div>

        {/* Providers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {providers.map((provider) => (
                <tr key={provider.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {provider.businessName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{provider.phone}</div>
                    <div className="text-sm text-gray-500">{provider.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {provider.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ⭐ {provider.rating}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      provider.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {provider.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => toggleProviderStatus(provider.id)}
                      className={`${
                        provider.active 
                          ? 'text-red-600 hover:text-red-900' 
                          : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {provider.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProvider(provider.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
