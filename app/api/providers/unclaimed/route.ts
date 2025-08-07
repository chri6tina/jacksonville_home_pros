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

    // Since userId is required, we'll look for providers that might be "unclaimed" 
    // by checking if they have a specific pattern or flag
    // For now, we'll return all providers that match the search
    const providers = await prisma.provider.findMany({
      where: {
        OR: [
          { businessName: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } }
        ]
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      },
      take: 10, // Limit results
      orderBy: {
        businessName: 'asc'
      }
    })

    // Filter out providers that already have users (claimed)
    const unclaimedProviders = providers.filter(provider => !provider.user)

    return NextResponse.json({
      providers: unclaimedProviders.map(provider => ({
        id: provider.id,
        businessName: provider.businessName,
        phone: provider.phone,
        city: provider.city,
        state: provider.state,
        description: provider.description,
        verified: provider.verified,
        premium: provider.premium,
        featured: provider.featured
      })),
      count: unclaimedProviders.length
    })

  } catch (error) {
    console.error('Error searching unclaimed providers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 