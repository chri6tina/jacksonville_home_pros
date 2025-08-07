import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get('includeInactive') === 'true'

    // Fetch all providers with their services and categories
    const providers = await prisma.provider.findMany({
      where: {
        active: includeInactive ? undefined : true
      },
      include: {
        services: {
          include: {
            category: true
          }
        },
        reviews: true,
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

    // Transform the data to include category and rating info
    const transformedProviders = providers.map(provider => {
      // Get primary category from services
      const primaryService = provider.services.find(service => service.category.level === 'PRIMARY')
      const category = primaryService?.category.name || 'General'

      // Calculate average rating
      const totalRating = provider.reviews.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = provider.reviews.length > 0 ? totalRating / provider.reviews.length : 0

      return {
        id: provider.id,
        businessName: provider.businessName,
        description: provider.description,
        phone: provider.phone,
        email: provider.user.email,
        website: provider.website,
        verified: provider.verified,
        premium: provider.premium,
        featured: provider.featured,
        sortOrder: provider.sortOrder,
        active: provider.active,
        rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        reviewCount: provider.reviews.length,
        category: category,
        createdAt: provider.createdAt.toISOString()
      }
    })

    return NextResponse.json({
      status: 'success',
      providers: transformedProviders
    })

  } catch (error) {
    console.error('Error fetching providers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
} 