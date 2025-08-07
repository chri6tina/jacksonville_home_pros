'use client'

import Link from 'next/link'
import { ComponentType } from 'react'

interface CategoryCardProps {
  category: {
    id: string
    name: string
    slug: string
    icon: ComponentType<{ className?: string }>
    description: string
    providerCount: number
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = category.icon

  return (
    <Link href={`/categories/${category.slug}`} className="group">
      <div className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 p-8 h-full border border-neutral-100 hover:border-primary-200 group-hover:scale-[1.02]">
        {/* Icon Section */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center group-hover:from-primary-100 group-hover:to-primary-200 transition-all duration-300">
            <IconComponent className="w-8 h-8 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
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
} 