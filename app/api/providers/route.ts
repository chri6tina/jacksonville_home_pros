import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/providers - Get all providers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

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

    // Filter by search query if specified
    if (query) {
      whereClause.OR = [
        { businessName: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { city: { contains: query, mode: 'insensitive' } }
      ]
    }

    const providers = await prisma.provider.findMany({
      where: whereClause,
      include: {
        services: {
          include: {
            category: true
          }
        },
        images: {
          orderBy: {
            sortOrder: 'asc'
          }
        },
        user: {
          select: {
            email: true
          }
        }
      },
      orderBy: [
        { sortOrder: 'asc' },
        { businessName: 'asc' }
      ],
      take: limit,
      skip: offset
    })

    return NextResponse.json({
      status: 'success',
      providers: providers.map(provider => ({
        id: provider.id,
        businessName: provider.businessName,
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
    })
  } catch (error) {
    console.error('Error fetching providers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
}

// POST /api/providers - Create a new provider
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.businessName || !body.phone || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields: businessName, phone, email' },
        { status: 400 }
      )
    }

    // Use a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Step 1: Find or create user
      let user = await tx.user.findUnique({
        where: { email: body.email }
      })

      if (!user) {
        user = await tx.user.create({
          data: {
            email: body.email,
            name: body.businessName,
            role: 'PROVIDER'
          }
        })
      } else {
        // Update user role to PROVIDER if it's not already
        if (user.role !== 'PROVIDER') {
          user = await tx.user.update({
            where: { id: user.id },
            data: { role: 'PROVIDER' }
          })
        }
      }

      // Step 2: Check if provider already exists for this user
      const existingProvider = await tx.provider.findUnique({
        where: { userId: user.id }
      })

      if (existingProvider) {
        throw new Error('Provider already exists for this user')
      }

      // Generate slug from business name
      const slug = body.businessName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        + '-' + Math.random().toString(36).substring(2, 8)

      // Step 3: Create provider
      const provider = await tx.provider.create({
        data: {
          userId: user.id,
          businessName: body.businessName,
          slug: slug,
          description: body.description || '',
          phone: body.phone,
          website: body.website || null,
          address: body.address || '',
          city: body.city || 'Jacksonville',
          state: body.state || 'FL',
          latitude: body.latitude,
          longitude: body.longitude,
          serviceRadius: body.serviceRadius || 25,
          licenseNumber: body.licenseNumber,
          insuranceStatus: body.insuranceStatus || false,
          verified: body.verified || false,
          premium: body.premium || false,
          featured: body.featured || false,
          active: body.active !== undefined ? body.active : true,
          sortOrder: body.sortOrder || 0,
          googlePlacesId: body.googlePlacesId,
          googleRating: body.googleRating,
          googleReviewCount: body.googleReviewCount
        }
      })

      // Step 4: Create services if specified
      if (body.services && body.services.length > 0) {
        for (const service of body.services) {
          if (service.categoryId) {
            await tx.providerService.create({
              data: {
                providerId: provider.id,
                categoryId: service.categoryId,
                description: service.description
              }
            })
          }
        }
      }

      // Step 5: Create images if specified
      if (body.images && body.images.length > 0) {
        for (const image of body.images) {
          await tx.providerImage.create({
            data: {
              providerId: provider.id,
              url: image.url,
              alt: image.caption || `${body.businessName} image`,
              type: image.type || 'PROFILE',
              sortOrder: 0
            }
          })
        }
      }

      return { provider, user }
    })

    return NextResponse.json({
      status: 'success',
      provider: {
        id: result.provider.id,
        businessName: result.provider.businessName,
        message: 'Provider created successfully'
      }
    })
  } catch (error) {
    console.error('Error creating provider:', error)
    return NextResponse.json(
      { error: `Failed to create provider: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
} 