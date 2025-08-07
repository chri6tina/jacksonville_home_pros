'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  icon: string
  providerCount: number
  active: boolean
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Plumbing', icon: '🔧', providerCount: 5, active: true },
    { id: '2', name: 'HVAC', icon: '❄️', providerCount: 3, active: true },
    { id: '3', name: 'Electrical', icon: '⚡', providerCount: 4, active: true },
    { id: '4', name: 'Home Cleaning', icon: '🏠', providerCount: 2, active: true },
    { id: '5', name: 'Landscaping', icon: '🌿', providerCount: 6, active: true },
    { id: '6', name: 'Painting', icon: '🎨', providerCount: 3, active: false }
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

  const toggleCategoryStatus = (id: string) => {
    setCategories(categories.map(category => 
      category.id === id 
        ? { ...category, active: !category.active }
        : category
    ))
  }

  const deleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(category => category.id !== id))
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
              <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
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
            Add New Category
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.providerCount} providers</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  category.active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {category.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  <button
                    onClick={() => toggleCategoryStatus(category.id)}
                    className={`text-sm ${
                      category.active 
                        ? 'text-red-600 hover:text-red-900' 
                        : 'text-green-600 hover:text-green-900'
                    }`}
                  >
                    {category.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="text-sm text-blue-600 hover:text-blue-900">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="text-sm text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
