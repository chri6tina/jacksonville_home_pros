import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Find the category by slug
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        children: true
      }
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // Get all category IDs (including children) for this category
    const categoryIds = [category.id]
    if (category.children) {
      categoryIds.push(...category.children.map(child => child.id))
    }

    // Fetch providers that offer services in this category
    const providers = await prisma.provider.findMany({
      where: {
        active: true,
        services: {
          some: {
            categoryId: {
              in: categoryIds
            },
            active: true
          }
        }
      },
      include: {
        services: {
          include: {
            category: true
          }
        },
        reviews: true,
        images: true,
        user: {
          select: {
            email: true
          }
        }
      },
      orderBy: {
        sortOrder: 'asc'
      }
    })

    // Transform the data to match ProviderCard expectations
    const transformedProviders = providers.map(provider => {
      // Calculate average rating
      const totalRating = provider.reviews.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = provider.reviews.length > 0 ? totalRating / provider.reviews.length : 0

      // Get services for this category
      const categoryServices = provider.services.filter(service => 
        categoryIds.includes(service.categoryId)
      )

      return {
        id: provider.id,
        businessName: provider.businessName,
        slug: provider.slug,
        description: provider.description,
        rating: Math.round(averageRating * 10) / 10,
        reviewCount: provider.reviews.length,
        googleRating: provider.googleRating ?? Math.round(averageRating * 10) / 10,
        googleReviewCount: provider.googleReviewCount ?? provider.reviews.length,
        location: `${provider.city || ''}${provider.city && provider.state ? ', ' : ''}${provider.state || ''}`,
        services: categoryServices.map(service => ({
          id: service.id,
          categoryId: service.categoryId,
          categoryName: service.category.name,
          categorySlug: service.category.slug,
        })),
        verified: provider.verified,
        premium: provider.premium,
        phone: provider.phone,
        email: provider.user.email,
        website: provider.website || '',
        image: provider.images.length > 0 ? provider.images[0].url : '/images/default-provider.svg',
        images: provider.images.map(img => ({ id: img.id, url: img.url, alt: img.alt, type: img.type })),
        sortOrder: provider.sortOrder
      }
    })

    return NextResponse.json({
      status: 'success',
      providers: transformedProviders
    })

  } catch (error) {
    console.error('Error fetching providers by category:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
} 