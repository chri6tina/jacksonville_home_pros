'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/layout/admin-layout'
import { toast } from 'react-hot-toast'

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
}

interface FormData {
  name: string
  slug: string
  description: string
  icon: string
  level: 'PRIMARY' | 'SECONDARY' | 'TERTIARY'
  parentId: string
  sortOrder: number
  active: boolean
}

export default function NewCategoryPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [parentCategories, setParentCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    description: '',
    icon: '📁',
    level: 'PRIMARY',
    parentId: '',
    sortOrder: 0,
    active: true
  })

  useEffect(() => {
    fetchParentCategories()
  }, [])

  const fetchParentCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      
      if (data.status === 'success' && data.categories) {
        // Only show PRIMARY categories as potential parents
        const primaryCategories = data.categories.filter((cat: Category) => cat.level === 'PRIMARY')
        setParentCategories(primaryCategories)
      }
    } catch (error) {
      console.error('Error fetching parent categories:', error)
    }
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleNameChange = (name: string) => {
    handleInputChange('name', name)
    handleInputChange('slug', generateSlug(name))
  }

  const handleLevelChange = (level: 'PRIMARY' | 'SECONDARY' | 'TERTIARY') => {
    handleInputChange('level', level)
    // Reset parent if switching to PRIMARY
    if (level === 'PRIMARY') {
      handleInputChange('parentId', '')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const categoryData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        icon: formData.icon,
        level: formData.level,
        parentId: formData.parentId || null,
        sortOrder: formData.sortOrder,
        active: formData.active
      }

      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
      })
      const data = await response.json()

      if (response.ok && data.status === 'success') {
        toast.success('Category added successfully!')
        router.push('/admin/categories')
      } else {
        toast.error(`Failed to add category: ${data.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const iconOptions = [
    '🔧', '⚡', '🎨', '❄️', '🌿', '🔨', '🧹', '📦', '🔒', '🏠', '🪑', '🪟', '🚿', '🔌', '🎯', '⭐', '📁'
  ]

  return (
    <AdminLayout 
      title="Add New Category" 
      subtitle="Create a new service category"
      showBackButton={true}
      backUrl="/admin/categories"
    >
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Category Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Plumbing"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  URL Slug *
                </label>
                <input
                  type="text"
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., plumbing"
                />
                <p className="text-sm text-gray-500 mt-1">This will be used in the URL: /categories/{formData.slug}</p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of this category..."
                />
              </div>
            </div>
          </div>

          {/* Category Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Category Settings</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                  Category Level *
                </label>
                <select
                  id="level"
                  required
                  value={formData.level}
                  onChange={(e) => handleLevelChange(e.target.value as 'PRIMARY' | 'SECONDARY' | 'TERTIARY')}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="PRIMARY">Primary Category</option>
                  <option value="SECONDARY">Secondary Category</option>
                  <option value="TERTIARY">Tertiary Category</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.level === 'PRIMARY' && 'Top-level category (e.g., Plumbing)'}
                  {formData.level === 'SECONDARY' && 'Sub-category (e.g., Drain Cleaning under Plumbing)'}
                  {formData.level === 'TERTIARY' && 'Specialized service (e.g., Hydro Jetting under Drain Cleaning)'}
                </p>
              </div>

              {formData.level !== 'PRIMARY' && (
                <div>
                  <label htmlFor="parentId" className="block text-sm font-medium text-gray-700">
                    Parent Category *
                  </label>
                  <select
                    id="parentId"
                    required
                    value={formData.parentId}
                    onChange={(e) => handleInputChange('parentId', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a parent category</option>
                    {parentCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                  Icon
                </label>
                <div className="mt-1">
                  <div className="grid grid-cols-9 gap-2">
                    {iconOptions.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => handleInputChange('icon', icon)}
                        className={`p-2 text-lg rounded border ${
                          formData.icon === icon
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">
                  Sort Order
                </label>
                <input
                  type="number"
                  id="sortOrder"
                  value={formData.sortOrder}
                  onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 0)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-gray-500">Lower numbers appear first</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="active" className="text-sm font-medium text-gray-700">
                    Active Category
                  </label>
                  <p className="text-sm text-gray-500">Show this category to users</p>
                </div>
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/admin/categories')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
} 