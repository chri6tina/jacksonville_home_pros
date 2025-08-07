import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get platform statistics
    const [
      totalProviders,
      totalReviews,
      averageRating,
      totalBookings
    ] = await Promise.all([
      // Total active providers
      prisma.provider.count({
        where: { active: true }
      }),
      
      // Total reviews
      prisma.review.count({
        where: { status: 'APPROVED' }
      }),
      
      // Average rating
      prisma.review.aggregate({
        where: { status: 'APPROVED' },
        _avg: {
          rating: true
        }
      }),
      
      // Total bookings
      prisma.booking.count({
        where: { status: 'COMPLETED' }
      })
    ])

    const avgRating = averageRating._avg.rating || 0

    const stats = [
      { label: 'Service Providers', value: `${totalProviders}+` },
      { label: 'Happy Customers', value: `${Math.floor(totalReviews * 0.8)}+` },
      { label: 'Services Completed', value: `${totalBookings}+` },
      { label: 'Average Rating', value: Math.round(avgRating * 10) / 10 }
    ]

    return NextResponse.json({
      stats
    })

  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
