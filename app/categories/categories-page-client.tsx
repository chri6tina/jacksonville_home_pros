'use client'

import { useState, useEffect } from 'react'
import { 
  WrenchScrewdriverIcon,
  BoltIcon,
  PaintBrushIcon,
  HomeIcon,
  TruckIcon,
  CogIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

// Category data interface
interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  providerCount: number
  color: string
  iconColor: string
}

interface CategoriesPageClientProps {
  categories: Category[]
}

export function CategoriesPageClient({ categories }: CategoriesPageClientProps) {
  const [categoriesWithCounts, setCategoriesWithCounts] = useState<Category[]>(categories)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch provider counts for each category
  useEffect(() => {
    const fetchProviderCounts = async () => {
      setIsLoading(true)
      try {
        const updatedCategories = await Promise.all(
          categories.map(async (category) => {
            try {
              const response = await fetch(`/api/categories/${category.slug}?providers=true`)
              const data = await response.json()
              
              if (data.status === 'success' && data.providers) {
                return {
                  ...category,
                  providerCount: data.providers.length
                }
              }
              return category
            } catch (error) {
              console.error(`Error fetching provider count for ${category.slug}:`, error)
              return category
            }
          })
        )
        setCategoriesWithCounts(updatedCategories)
      } catch (error) {
        console.error('Error fetching provider counts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (categories.length > 0) {
      fetchProviderCounts()
    }
  }, [categories])

  // Helper function to get icon component
  const getCategoryIcon = (slug: string) => {
    const iconMap: { [key: string]: any } = {
      'plumbing': WrenchScrewdriverIcon,
      'electrical': BoltIcon,
      'hvac': CogIcon,
      'landscaping': HomeIcon,
      'painting': PaintBrushIcon,
      'handyman': WrenchScrewdriverIcon,
      'roofing': HomeIcon,
      'cleaning': SparklesIcon,
      'default': WrenchScrewdriverIcon
    }
    return iconMap[slug] || iconMap.default
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="container-responsive py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Service Categories
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Find the perfect professional for any home service you need in Jacksonville
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <span className="ml-2 text-neutral-600">Loading provider counts...</span>
              </div>
            </div>
          ) : categoriesWithCounts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-neutral-500">
                No categories found. Categories will be loaded from the database.
              </div>
            </div>
          ) : (
            categoriesWithCounts.map((category) => {
              const IconComponent = getCategoryIcon(category.slug)
              return (
                <Link key={category.id} href={`/categories/${category.slug}`} className="group">
                  <div className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 p-8 h-full border border-neutral-100 hover:border-primary-200 group-hover:scale-[1.02]">
                    {/* Icon Section */}
                    <div className="flex justify-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                        <IconComponent className={`w-8 h-8 ${category.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="space-y-4">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors text-center">
                        {category.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-neutral-600 leading-relaxed text-center px-2">
                        {category.description}
                      </p>
                      
                      {/* Footer */}
                      <div className="pt-4 border-t border-neutral-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-neutral-500">
                            {category.providerCount} providers
                          </span>
                          <span className="text-sm text-primary-600 font-semibold group-hover:translate-x-1 transition-transform duration-200 flex items-center">
                            View All
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-neutral-100">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
              Use our search to find any service provider in the Jacksonville area
            </p>
            <Link 
              href="/search"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Search All Services
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 