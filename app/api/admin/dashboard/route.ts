import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'
import { withErrorHandling } from '@/lib/api-utils'

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    // Verify admin authentication
    const adminUser = await requireAdmin()
    
    console.log('Admin dashboard accessed by:', adminUser.email)

    // Get dashboard statistics
    const [
      totalProviders,
      totalCategories,
      totalReviews,
      totalUsers,
      recentProviders,
      recentReviews
    ] = await Promise.all([
      // Total providers
      prisma.provider.count({
        where: { active: true }
      }),
      
      // Total categories
      prisma.category.count({
        where: { active: true }
      }),
      
      // Total reviews
      prisma.review.count({
        where: { status: 'APPROVED' }
      }),
      
      // Total users
      prisma.user.count(),
      
      // Recent providers (last 5)
      prisma.provider.findMany({
        where: { active: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          user: {
            select: { email: true }
          }
        }
      }),
      
      // Recent reviews (last 5)
      prisma.review.findMany({
        where: { status: 'APPROVED' },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          provider: {
            select: { businessName: true }
          }
        }
      })
    ])

    return {
      status: 'success',
      data: {
        stats: {
          totalProviders,
          totalCategories,
          totalReviews,
          totalUsers
        },
        recentProviders: recentProviders.map(p => ({
          id: p.id,
          businessName: p.businessName,
          email: p.user?.email ?? '',
          createdAt: p.createdAt.toISOString()
        })),
        recentReviews: recentReviews.map(r => ({
          id: r.id,
          rating: r.rating,
          providerName: r.provider?.businessName ?? 'Unknown',
          createdAt: r.createdAt.toISOString()
        }))
      }
    };
  });
} 

export const runtime = 'nodejs'