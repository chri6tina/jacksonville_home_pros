import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    if (!search || search.trim().length < 2) {
      return NextResponse.json({
        providers: [],
        message: 'Please enter at least 2 characters to search'
      })
    }

    // Search for unclaimed providers
    const providers = await prisma.provider.findMany({
      where: {
        userId: null, // Only unclaimed providers
        OR: [
          { businessName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        businessName: true,
        email: true,
        phone: true,
        city: true,
        state: true,
        description: true,
        verified: true,
        premium: true,
        featured: true
      },
      take: 10, // Limit results
      orderBy: {
        businessName: 'asc'
      }
    })

    return NextResponse.json({
      providers,
      count: providers.length
    })

  } catch (error) {
    console.error('Error searching unclaimed providers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 