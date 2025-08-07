import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50')
    const level = searchParams.get('level') || 'PRIMARY'

    let whereClause: any = {
      active: true,
      level: level as any
    }

    if (featured) {
      whereClause.sortOrder = { lte: 6 } // First 6 categories
    }

    const categories = await prisma.category.findMany({
      where: whereClause,
      orderBy: {
        sortOrder: 'asc'
      },
      take: limit,
      include: {
        services: {
          include: {
            provider: true
          }
        }
      }
    })

    // Calculate provider count for each category
    const categoriesWithProviderCount = categories.map(category => {
      const uniqueProviders = new Set(
        category.services.map(service => service.provider.id)
      )
      
      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        level: category.level,
        sortOrder: category.sortOrder,
        providerCount: uniqueProviders.size
      }
    })

    return NextResponse.json({
      categories: categoriesWithProviderCount
    })

  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new category
export async function POST(request: NextRequest) {
  try {
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

      // Validate hierarchy levels
      if (body.level === 'SECONDARY' && parent.level !== 'PRIMARY') {
        return NextResponse.json(
          { error: 'Secondary categories can only have primary categories as parents' },
          { status: 400 }
        )
      }

      if (body.level === 'TERTIARY' && parent.level !== 'SECONDARY') {
        return NextResponse.json(
          { error: 'Tertiary categories can only have secondary categories as parents' },
          { status: 400 }
        )
      }
    }

    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        icon: body.icon || null,
        level: body.level,
        parentId: body.parentId || null,
        sortOrder: body.sortOrder || 0,
        active: body.active !== undefined ? body.active : true
      }
    })

    return NextResponse.json({
      status: 'success',
      category: newCategory
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
} 