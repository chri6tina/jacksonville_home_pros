import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { CategoriesPageClient } from './categories-page-client'

export const metadata: Metadata = {
  title: 'Home Services in Jacksonville, FL | Jacksonville Home Pros',
  description: 'Find trusted home service providers in Jacksonville, Florida. Browse categories including plumbing, electrical, HVAC, landscaping, painting, handyman, roofing, and cleaning services.',
  keywords: [
    'Jacksonville home services',
    'Jacksonville service categories',
    'Jacksonville contractors by category',
    'Jacksonville home improvement services',
    'Jacksonville professional services',
    'Jacksonville local contractors'
  ],
  openGraph: {
    title: 'Home Services in Jacksonville, FL | Jacksonville Home Pros',
    description: 'Find trusted home service providers in Jacksonville, Florida. Browse categories including plumbing, electrical, HVAC, landscaping, painting, handyman, roofing, and cleaning services.',
    url: 'https://jacksonvillehomepros.com/categories',
    images: [
      {
        url: '/images/categories/services-overview.jpg',
        width: 1200,
        height: 630,
        alt: 'Jacksonville Home Services Categories',
      }
    ],
  },
  twitter: {
    title: 'Home Services in Jacksonville, FL | Jacksonville Home Pros',
    description: 'Find trusted home service providers in Jacksonville, Florida.',
    images: ['/images/categories/services-overview.jpg'],
  },
  alternates: {
    canonical: '/categories',
  },
}

// Server component that fetches data
export default async function CategoriesPage() {
  try {
    // Fetch all primary categories
    const categories = await prisma.category.findMany({
      where: { level: 'PRIMARY', active: true },
      include: { children: true },
      orderBy: { sortOrder: 'asc' }
    })

    // Transform the data to match our interface
    const transformedCategories = categories.map((category) => {
      // Count providers in this category
      const categoryIds = [category.id]
      if (category.children) {
        categoryIds.push(...category.children.map(child => child.id))
      }

      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        icon: category.icon || '🏠',
        description: category.description || `Professional ${category.name.toLowerCase()} services in Jacksonville`,
        providerCount: 0, // We'll calculate this in the client component
        color: getCategoryColor(category.slug),
        iconColor: getCategoryIconColor(category.slug)
      }
    })

    // Generate structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Home Services in Jacksonville",
      "description": "Browse categories of home services available in Jacksonville, Florida",
      "url": "https://jacksonvillehomepros.com/categories",
      "numberOfItems": transformedCategories.length,
      "itemListElement": transformedCategories.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": category.name,
          "description": category.description,
          "url": `https://jacksonvillehomepros.com/categories/${category.slug}`,
          "provider": {
            "@type": "Organization",
            "name": "Jacksonville Home Pros"
          }
        }
      }))
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <CategoriesPageClient categories={transformedCategories} />
      </>
    )
  } catch (error) {
    console.error('Error in CategoriesPage:', error)
    return <CategoriesPageClient categories={[]} />
  }
}

// Helper functions for category styling
function getCategoryColor(slug: string): string {
  const colorMap: { [key: string]: string } = {
    'plumbing': 'from-blue-50 to-blue-100',
    'electrical': 'from-yellow-50 to-yellow-100',
    'hvac': 'from-green-50 to-green-100',
    'landscaping': 'from-emerald-50 to-emerald-100',
    'painting': 'from-purple-50 to-purple-100',
    'handyman': 'from-orange-50 to-orange-100',
    'roofing': 'from-red-50 to-red-100',
    'cleaning': 'from-cyan-50 to-cyan-100',
    'default': 'from-gray-50 to-gray-100'
  }
  return colorMap[slug] || colorMap.default
}

function getCategoryIconColor(slug: string): string {
  const colorMap: { [key: string]: string } = {
    'plumbing': 'text-blue-600',
    'electrical': 'text-yellow-600',
    'hvac': 'text-green-600',
    'landscaping': 'text-emerald-600',
    'painting': 'text-purple-600',
    'handyman': 'text-orange-600',
    'roofing': 'text-red-600',
    'cleaning': 'text-cyan-600',
    'default': 'text-gray-600'
  }
  return colorMap[slug] || colorMap.default
} 