import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'
import { withErrorHandling } from '@/lib/api-utils'

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    // Verify admin authentication
    const adminUser = await requireAdmin()
    
    console.log('Admin providers accessed by:', adminUser.email)

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
        email: provider.user?.email ?? '',
        city: provider.city,
        state: provider.state,
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

    return {
      status: 'success',
      providers: transformedProviders
    };
  });
} 

export const runtime = 'nodejs'