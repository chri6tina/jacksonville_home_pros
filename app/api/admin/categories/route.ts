import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'
import { withErrorHandling } from '@/lib/api-utils'

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    // Verify admin authentication
    const adminUser = await requireAdmin()
    
    console.log('Admin categories accessed by:', adminUser.email)

    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get('includeInactive') === 'true'

    // Build where clause
    let whereClause: any = {}
    if (!includeInactive) {
      whereClause.active = true
    }

    const categories = await prisma.category.findMany({
      where: whereClause,
      orderBy: [
        { level: 'asc' },
        { sortOrder: 'asc' },
        { name: 'asc' }
      ],
      include: {
        services: {
          include: {
            provider: true
          }
        },
        children: {
          include: {
            services: {
              include: {
                provider: true
              }
            }
          }
        }
      }
    })

    // Transform the data to include provider counts and hierarchy
    const transformedCategories = categories.map(category => {
      // Calculate provider count for this category
      const uniqueProviders = new Set(
        category.services.map(service => service.provider.id)
      )
      
      // Calculate provider count for children
      const childrenWithProviderCount = category.children?.map(child => {
        const childUniqueProviders = new Set(
          child.services.map(service => service.provider.id)
        )
        return {
          id: child.id,
          name: child.name,
          slug: child.slug,
          description: child.description,
          icon: child.icon,
          level: child.level,
          sortOrder: child.sortOrder,
          active: child.active,
          providerCount: childUniqueProviders.size
        }
      }) || []

      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        level: category.level,
        parentId: category.parentId,
        sortOrder: category.sortOrder,
        active: category.active,
        providerCount: uniqueProviders.size,
        children: childrenWithProviderCount
      }
    })

    return {
      status: 'success',
      categories: transformedCategories
    };
  });
}

// POST - Create new category
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const adminUser = await requireAdmin()
    
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.slug || !body.level) {
      return NextResponse.json(
        { error: 'Name, slug, and level are required' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug: body.slug }
    })

    if (existingCategory) {
      return NextResponse.json(
        { error: 'A category with this slug already exists' },
        { status: 400 }
      )
    }

    // Validate parent relationship
    if (body.level !== 'PRIMARY' && !body.parentId) {
      return NextResponse.json(
        { error: 'Parent category is required for secondary and tertiary categories' },
        { status: 400 }
      )
    }

    if (body.parentId) {
      const parent = await prisma.category.findUnique({
        where: { id: body.parentId }
      })

      if (!parent) {
        return NextResponse.json(
          { error: 'Parent category not found' },
          { status: 400 }
        )
      }
    }

    // Create the category
    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        icon: body.icon,
        level: body.level,
        parentId: body.parentId,
        sortOrder: body.sortOrder || 0,
        active: body.active !== false // Default to true
      }
    })

    return NextResponse.json({
      status: 'success',
      category: newCategory
    })

  } catch (error) {
    console.error('Admin create category error:', error)
    
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 })
    }
    
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
