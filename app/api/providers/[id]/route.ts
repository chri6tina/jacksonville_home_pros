import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/providers/[id] - Get a single provider
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Try to find provider by ID first, then by slug
    let provider = await prisma.provider.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true
          }
        },
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
        images: true
      }
    })

    // If not found by ID, try by slug
    if (!provider) {
      provider = await prisma.provider.findUnique({
        where: { slug: id },
        include: {
          user: {
            select: {
              email: true
            }
          },
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
          images: true
        }
      })
    }

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      )
    }

    // Format location
    const location = provider.city && provider.state ? 
      `${provider.city}, ${provider.state}` : 
      (provider.city || provider.state || 'Location not specified')

    return NextResponse.json({
      status: 'success',
      provider: {
        id: provider.id,
        businessName: provider.businessName,
        slug: provider.slug,
        description: provider.description || '',
        phone: provider.phone,
        email: provider.user?.email || '',
        website: provider.website || '',
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
        location: location,
        image: provider.images.length > 0 ? provider.images[0].url : '/images/default-provider.svg',
        images: provider.images.map(img => ({
          id: img.id,
          url: img.url,
          alt: img.alt,
          type: img.type
        })),
        services: provider.services.map(s => ({
          id: s.id,
          categoryId: s.categoryId,
          categoryName: s.category.name,
          categorySlug: s.category.slug,
          description: s.description
        }))
      }
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching provider:', error)
    return NextResponse.json(
      { error: `Failed to fetch provider: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}

// DELETE /api/providers/[id] - Delete a provider
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Check if provider exists
    const existingProvider = await prisma.provider.findUnique({
      where: { id },
      include: {
        services: true,
        reviews: true
      }
    })

    if (!existingProvider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      )
    }

    // Use a transaction to delete related data first
    await prisma.$transaction(async (tx) => {
      // Delete provider services
      await tx.providerService.deleteMany({
        where: { providerId: id }
      })

      // Delete reviews
      await tx.review.deleteMany({
        where: { providerId: id }
      })

      // Delete the provider
      await tx.provider.delete({
        where: { id }
      })
    })

    return NextResponse.json(
      { status: 'success', message: 'Provider deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting provider:', error)
    return NextResponse.json(
      { error: `Failed to delete provider: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}

// PATCH /api/providers/[id] - Update a provider
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    // Check if provider exists
    const existingProvider = await prisma.provider.findUnique({
      where: { id }
    })

    if (!existingProvider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      )
    }

    // Update the provider
    const updatedProvider = await prisma.provider.update({
      where: { id },
      data: {
        businessName: body.businessName,
        description: body.description,
        phone: body.phone,
        website: body.website,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        verified: body.verified,
        premium: body.premium,
        featured: body.featured,
        active: body.active,
        sortOrder: body.sortOrder,
        googlePlacesId: body.googlePlacesId,
        googleRating: body.googleRating,
        googleReviewCount: body.googleReviewCount
      }
    })

    return NextResponse.json(
      { status: 'success', provider: updatedProvider },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating provider:', error)
    return NextResponse.json(
      { error: `Failed to update provider: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
} 