import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Check authentication and admin role
    const session = await getServerSession()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get dashboard statistics
    const [
      totalProviders,
      activeProviders,
      pendingProviders,
      totalCategories,
      totalReviews,
      averageRating,
      recentProviders,
      categoryStats
    ] = await Promise.all([
      // Total providers
      prisma.provider.count(),
      
      // Active providers (with at least one review)
      prisma.provider.count({
        where: {
          reviews: {
            some: {}
          }
        }
      }),
      
      // Pending providers (no reviews yet)
      prisma.provider.count({
        where: {
          reviews: {
            none: {}
          }
        }
      }),
      
      // Total categories
      prisma.category.count(),
      
      // Total reviews
      prisma.review.count(),
      
      // Average rating
      prisma.review.aggregate({
        _avg: {
          rating: true
        }
      }),
      
      // Recent providers
      prisma.provider.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          },
          reviews: {
            select: {
              rating: true
            }
          }
        }
      }),
      
      // Category statistics
      prisma.category.findMany({
        include: {
          _count: {
            select: {
              providers: true
            }
          },
          providers: {
            include: {
              reviews: {
                select: {
                  rating: true
                }
              }
            }
          }
        }
      })
    ])

    // Calculate average rating
    const avgRating = averageRating._avg.rating || 0

    // Process recent providers
    const processedRecentProviders = recentProviders.map(provider => {
      const avgProviderRating = provider.reviews.length > 0
        ? provider.reviews.reduce((sum, review) => sum + review.rating, 0) / provider.reviews.length
        : 0

      return {
        id: provider.id,
        businessName: provider.businessName,
        category: provider.category?.name || 'Uncategorized',
        status: provider.reviews.length > 0 ? 'active' : 'pending',
        rating: Math.round(avgProviderRating * 10) / 10,
        reviewCount: provider.reviews.length,
        lastUpdated: provider.updatedAt.toISOString()
      }
    })

    // Process category statistics
    const processedCategoryStats = categoryStats.map(category => {
      const allRatings = category.providers.flatMap(provider => 
        provider.reviews.map(review => review.rating)
      )
      
      const avgCategoryRating = allRatings.length > 0
        ? allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length
        : 0

      return {
        name: category.name,
        providerCount: category._count.providers,
        avgRating: Math.round(avgCategoryRating * 10) / 10
      }
    }).sort((a, b) => b.providerCount - a.providerCount)

    return NextResponse.json({
      stats: {
        totalProviders,
        activeProviders,
        pendingProviders,
        totalCategories,
        totalReviews,
        averageRating: Math.round(avgRating * 10) / 10
      },
      recentProviders: processedRecentProviders,
      categoryStats: processedCategoryStats
    })

  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 