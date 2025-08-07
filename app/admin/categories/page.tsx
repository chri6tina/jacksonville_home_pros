'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/layout/admin-layout'
import { PlusIcon, PencilIcon, TrashIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

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
  children?: Category[]
  _count?: {
    providers: number
  }
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      
      if (data.status === 'success' && data.categories) {
        setCategories(data.categories)
      } else {
        setError('Failed to fetch categories')
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError('Failed to fetch categories')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleCategoryExpansion = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const getCategoryIcon = (category: Category) => {
    // You can customize this based on your category icons
    const iconMap: { [key: string]: string } = {
      'plumbing': '🔧',
      'electrical': '⚡',
      'painting': '🎨',
      'hvac': '❄️',
      'landscaping': '🌿',
      'handyman': '🔨',
      'cleaning': '🧹',
      'moving': '📦',
      'security': '🔒',
      'roofing': '🏠',
      'flooring': '🪑',
      'windows': '🪟'
    }
    
    return iconMap[category.slug.toLowerCase()] || '📁'
  }

  const getLevelBadge = (level: string) => {
    const levelMap = {
      'PRIMARY': { label: 'Primary', color: 'bg-blue-100 text-blue-800' },
      'SECONDARY': { label: 'Secondary', color: 'bg-green-100 text-green-800' },
      'TERTIARY': { label: 'Tertiary', color: 'bg-purple-100 text-purple-800' }
    }
    
    const config = levelMap[level as keyof typeof levelMap] || levelMap.PRIMARY
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const renderCategoryTree = (categoryList: Category[], level: number = 0) => {
    return categoryList.map((category) => {
      const hasChildren = category.children && category.children.length > 0
      const isExpanded = expandedCategories.has(category.id)
      
      return (
        <div key={category.id} className="border-b border-gray-200 last:border-b-0">
          <div 
            className={`flex items-center justify-between p-4 hover:bg-gray-50 ${
              level > 0 ? 'ml-6' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              {hasChildren && (
                <button
                  onClick={() => toggleCategoryExpansion(category.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {isExpanded ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4" />
                  )}
                </button>
              )}
              {!hasChildren && <div className="w-4" />}
              
              <span className="text-lg">{getCategoryIcon(category)}</span>
              
              <div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  {getLevelBadge(category.level)}
                  <span className="text-sm text-gray-500">/{category.slug}</span>
                  {category._count && (
                    <span className="text-sm text-gray-500">
                      {category._count.providers} providers
                    </span>
                  )}
                </div>
                {category.description && (
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                category.active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {category.active ? 'Active' : 'Inactive'}
              </span>
              
              <div className="flex items-center space-x-1">
                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  className="text-gray-400 hover:text-blue-600"
                  title="Edit Category"
                >
                  <PencilIcon className="h-4 w-4" />
                </Link>
                <button
                  className="text-gray-400 hover:text-red-600"
                  title="Delete Category"
                  onClick={() => {
                    // TODO: Implement delete functionality
                    alert('Delete functionality coming soon')
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {hasChildren && isExpanded && (
            <div className="bg-gray-50">
              {renderCategoryTree(category.children!, level + 1)}
            </div>
          )}
        </div>
      )
    })
  }

  if (isLoading) {
    return (
      <AdminLayout title="Categories" subtitle="Manage your service categories">
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
      <AdminLayout title="Categories" subtitle="Manage your service categories">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout 
      title="Categories" 
      subtitle="Organize and manage your service categories"
    >
      {/* Header with actions */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            {categories.length} category{categories.length !== 1 ? 'ies' : 'y'} found
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Category
        </Link>
      </div>

      {/* Categories list */}
      {categories.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first category.</p>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Category
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="divide-y divide-gray-200">
            {renderCategoryTree(categories)}
          </div>
        </div>
      )}
    </AdminLayout>
  )
} 