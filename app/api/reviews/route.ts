import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    const limit = parseInt(searchParams.get('limit') || '10')
    const providerId = searchParams.get('providerId')

    let whereClause: any = {
      status: 'APPROVED'
    }

    if (featured) {
      whereClause.rating = { gte: 4 }
    }

    if (providerId) {
      whereClause.providerId = providerId
    }

    const reviews = await prisma.review.findMany({
      where: whereClause,
      orderBy: featured ? { rating: 'desc' } : { createdAt: 'desc' },
      take: limit,
      include: {
        provider: {
          select: {
            businessName: true,
            services: {
              include: {
                category: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        },
        user: {
          select: {
            name: true
          }
        }
      }
    })

    // Process reviews for testimonials
    const testimonials = reviews.map(review => {
      const serviceName = review.provider.services.length > 0 
        ? review.provider.services[0].category.name 
        : 'General Service'

      return {
        id: review.id,
        name: review.user?.name || 'Anonymous',
        location: 'Jacksonville, FL', // Could be enhanced with user location
        rating: review.rating,
        content: review.content,
        service: serviceName,
        image: '/images/default-avatar.svg' // Could be enhanced with user avatar
      }
    })

    return NextResponse.json({
      reviews: testimonials
    })

  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
