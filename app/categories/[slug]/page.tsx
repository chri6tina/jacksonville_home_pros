import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { CategoryPageClient } from './category-page-client'
import JsonLd from '@/components/seo/json-ld'
import { SeoBaseUrl } from '@/lib/seo'

// Generate static params for all categories
export async function generateStaticParams() {
  try {
    const categories = await prisma.category.findMany({
      where: { level: 'PRIMARY', active: true },
      select: { slug: true }
    })
    
    return categories.map((category) => ({
      slug: category.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generate metadata for each category
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params
    const category = await prisma.category.findUnique({
      where: { slug },
      include: { children: true }
    })

    if (!category) {
      return {
        title: 'Category Not Found',
        description: 'The requested category could not be found.'
      }
    }

    // Count providers in this category
    const categoryIds = [category.id]
    if (category.children) {
      categoryIds.push(...category.children.map(child => child.id))
    }

    const providerCount = await prisma.provider.count({
      where: {
        active: true,
        services: {
          some: {
            categoryId: { in: categoryIds }
          }
        }
      }
    })

    const title = `${category.name} Services in Jacksonville, FL | Jacksonville Home Pros`
    const description = `${category.description || `Professional ${category.name.toLowerCase()} services in Jacksonville, Florida`}. Find ${providerCount} trusted ${category.name.toLowerCase()} providers near you. Get quotes, read reviews, and book appointments.`

    return {
      title,
      description,
      keywords: [
        `${category.name.toLowerCase()} Jacksonville`,
        `${category.name.toLowerCase()} services Jacksonville FL`,
        `${category.name.toLowerCase()} contractors Jacksonville`,
        `${category.name.toLowerCase()} near me`,
        `Jacksonville ${category.name.toLowerCase()} professionals`,
        `best ${category.name.toLowerCase()} Jacksonville`
      ],
      openGraph: {
        title,
        description,
        url: `https://www.jacksonvillehomeprofessionals.com/categories/${category.slug}`,
        images: [
          {
            url: `/images/categories/${category.slug}.jpg`,
            width: 1200,
            height: 630,
            alt: `${category.name} services in Jacksonville`,
          }
        ],
      },
      twitter: {
        title,
        description,
        images: [`/images/categories/${category.slug}.jpg`],
      },
      alternates: {
        canonical: `/categories/${category.slug}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Category Services | Jacksonville Home Pros',
      description: 'Find trusted home service providers in Jacksonville, Florida.'
    }
  }
}

// Server component that fetches data
export default async function CategoryPage({ params }: { 
  params: Promise<{ slug: string }>
}) {
  try {
    // Fetch category data
    const { slug } = await params
    const category = await prisma.category.findUnique({
      where: { slug },
      include: { children: true }
    })

    if (!category) {
      notFound()
    }

    const categoryData = {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || `Professional ${category.name.toLowerCase()} services in Jacksonville`,
      icon: category.icon || '🏠',
      level: category.level,
      children: category.children
    }

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SeoBaseUrl },
        { '@type': 'ListItem', position: 2, name: 'Categories', item: `${SeoBaseUrl}/categories` },
        { '@type': 'ListItem', position: 3, name: categoryData.name, item: `${SeoBaseUrl}/categories/${categoryData.slug}` },
      ],
    }

    const faqItems = [
      {
        question: `What do ${categoryData.name.toLowerCase()} providers do?`,
        answer: `Licensed Jacksonville ${categoryData.name.toLowerCase()} pros that handle common residential needs.`,
      },
      {
        question: `How soon can I book ${categoryData.name.toLowerCase()} services?`,
        answer: 'Availability varies; many providers can schedule within a few days.',
      },
    ]

    const faqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    }

    return (
      <>
        <JsonLd data={breadcrumbJsonLd} />
        <JsonLd data={faqJsonLd} />
        <CategoryPageClient 
          category={categoryData}
        />
      </>
    )
  } catch (error) {
    console.error('Error in CategoryPage:', error)
    notFound()
  }
} 