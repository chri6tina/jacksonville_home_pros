import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let whereClause: any = {
      active: true
    }

    // Filter by category if specified
    if (category) {
      whereClause.services = {
        some: {
          category: {
            slug: category
          }
        }
      }
    }

    const providers = await prisma.provider.findMany({
      where: whereClause,
      include: {
        services: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        },
        images: true,
        user: {
          select: {
            email: true
          }
        }
      },
      orderBy: [
        { sortOrder: 'asc' },
        { businessName: 'asc' }
      ]
    })

    const responseData = {
      status: 'success',
      providers: providers.map(provider => ({
        id: provider.id,
        businessName: provider.businessName,
        slug: provider.slug,
        description: provider.description,
        phone: provider.phone,
        email: provider.user?.email || '',
        website: provider.website,
        address: provider.address,
        city: provider.city,
        state: provider.state,
        zipCode: provider.zipCode,
        verified: provider.verified,
        premium: provider.premium,
        featured: provider.featured,
        active: provider.active,
        sortOrder: provider.sortOrder,
        googlePlacesId: provider.googlePlacesId,
        googleRating: provider.googleRating,
        googleReviewCount: provider.googleReviewCount,
        rating: provider.googleRating || 0,
        reviewCount: provider.googleReviewCount || 0,
        location: `${provider.city}, ${provider.state}`,
        image: provider.images.length > 0 ? provider.images[0].url : '/images/default-provider.svg',
        images: provider.images.map(img => ({
          id: img.id,
          url: img.url,
          alt: img.alt,
          type: img.type
        })),
        services: provider.services.map(service => ({
          id: service.id,
          categoryId: service.categoryId,
          categoryName: service.category.name,
          categorySlug: service.category.slug
        }))
      }))
    }

    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Test-API': 'true'
      }
    })
  } catch (error) {
    console.error('Error fetching providers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
} 