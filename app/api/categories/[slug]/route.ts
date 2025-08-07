import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const { searchParams } = new URL(request.url)
    const includeProviders = searchParams.get('providers') === 'true'

    // Find the category by slug
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        children: true
      }
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // If providers are requested, fetch them
    if (includeProviders) {
      // Get all category IDs (including children) for this category
      const categoryIds = [category.id]
      if (category.children) {
        categoryIds.push(...category.children.map(child => child.id))
      }

      // Fetch providers that offer services in this category
      const providers = await prisma.provider.findMany({
        where: {
          active: true,
          services: {
            some: {
              categoryId: {
                in: categoryIds
              }
            }
          }
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

      // Transform the data to match the frontend interface
      const transformedProviders = providers.map(provider => {
        // Calculate average rating
        const totalRating = provider.reviews.reduce((sum, review) => sum + review.rating, 0)
        const averageRating = provider.reviews.length > 0 ? totalRating / provider.reviews.length : 0

        // Get services for this category
        const categoryServices = provider.services.filter(service => 
          categoryIds.includes(service.categoryId)
        )

        return {
          id: provider.id,
          businessName: provider.businessName,
          description: provider.description,
          rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
          reviewCount: provider.reviews.length,
          location: `${provider.city}, ${provider.state}`,
          services: categoryServices.map(service => service.category.name),
          verified: provider.verified,
          premium: provider.premium,
          phone: provider.phone,
          email: provider.user.email,
          website: provider.website || '',
          image: '/images/providers/default.jpg', // Default image
          sortOrder: provider.sortOrder
        }
      })

      return NextResponse.json({
        status: 'success',
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          icon: category.icon,
          level: category.level,
          children: category.children
        },
        providers: transformedProviders
      })
    }

    // Return just the category data
    return NextResponse.json({
      status: 'success',
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        level: category.level,
        children: category.children
      }
    })

  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
} 