import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { CategoriesPageClient } from './categories-page-client'
import JsonLd from '@/components/seo/json-ld'
import { SeoBaseUrl } from '@/lib/seo'

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
      url: 'https://www.jacksonvillehomeprofessionals.com/categories',
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

// Fallback sample data for when database is not available
const fallbackCategories = [
  {
    id: '1',
    name: 'Plumbing',
    slug: 'plumbing',
    icon: '🔧',
    description: 'Professional plumbing services in Jacksonville',
    providerCount: 45,
    color: 'from-blue-50 to-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: '2',
    name: 'Electrical',
    slug: 'electrical',
    icon: '⚡',
    description: 'Licensed electrical services in Jacksonville',
    providerCount: 38,
    color: 'from-yellow-50 to-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    id: '3',
    name: 'HVAC',
    slug: 'hvac',
    icon: '❄️',
    description: 'Heating and cooling services in Jacksonville',
    providerCount: 29,
    color: 'from-green-50 to-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: '4',
    name: 'Landscaping',
    slug: 'landscaping',
    icon: '🌿',
    description: 'Landscaping and lawn care services in Jacksonville',
    providerCount: 41,
    color: 'from-emerald-50 to-emerald-100',
    iconColor: 'text-emerald-600'
  },
  {
    id: '5',
    name: 'Painting',
    slug: 'painting',
    icon: '🎨',
    description: 'Interior and exterior painting services in Jacksonville',
    providerCount: 52,
    color: 'from-purple-50 to-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    id: '6',
    name: 'Handyman',
    slug: 'handyman',
    icon: '🔨',
    description: 'General handyman services in Jacksonville',
    providerCount: 67,
    color: 'from-orange-50 to-orange-100',
    iconColor: 'text-orange-600'
  },
  {
    id: '7',
    name: 'Roofing',
    slug: 'roofing',
    icon: '🏠',
    description: 'Roof repair and installation services in Jacksonville',
    providerCount: 23,
    color: 'from-red-50 to-red-100',
    iconColor: 'text-red-600'
  },
  {
    id: '8',
    name: 'Cleaning',
    slug: 'cleaning',
    icon: '🧹',
    description: 'House cleaning services in Jacksonville',
    providerCount: 34,
    color: 'from-cyan-50 to-cyan-100',
    iconColor: 'text-cyan-600'
  }
]

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
      "url": `${SeoBaseUrl}/categories`,
      "numberOfItems": transformedCategories.length,
      "itemListElement": transformedCategories.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": category.name,
          "description": category.description,
          "url": `${SeoBaseUrl}/categories/${category.slug}`,
          "provider": {
            "@type": "Organization",
            "name": "Jacksonville Home Pros"
          }
        }
      }))
    }

    return (
      <>
        <JsonLd data={structuredData} />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SeoBaseUrl },
              { '@type': 'ListItem', position: 2, name: 'Categories', item: `${SeoBaseUrl}/categories` },
            ],
          }}
        />
        <CategoriesPageClient categories={transformedCategories} />
      </>
    )
  } catch (error) {
    console.error('Error in CategoriesPage:', error)
    
    // Use fallback data when database is not available
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Home Services in Jacksonville",
      "description": "Browse categories of home services available in Jacksonville, Florida",
      "url": `${SeoBaseUrl}/categories`,
      "numberOfItems": fallbackCategories.length,
      "itemListElement": fallbackCategories.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": category.name,
          "description": category.description,
          "url": `${SeoBaseUrl}/categories/${category.slug}`,
          "provider": {
            "@type": "Organization",
            "name": "Jacksonville Home Pros"
          }
        }
      }))
    }

    return (
      <>
        <JsonLd data={structuredData} />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SeoBaseUrl },
              { '@type': 'ListItem', position: 2, name: 'Categories', item: `${SeoBaseUrl}/categories` },
            ],
          }}
        />
        <CategoriesPageClient categories={fallbackCategories} />
      </>
    )
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