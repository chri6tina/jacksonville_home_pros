import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { direction } = await request.json()

    if (!direction || !['up', 'down'].includes(direction)) {
      return NextResponse.json(
        { error: 'Invalid direction. Must be "up" or "down"' },
        { status: 400 }
      )
    }

    // Get the current provider
    const currentProvider = await prisma.provider.findUnique({
      where: { id }
    })

    if (!currentProvider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      )
    }

    // Find all active providers and sort by current sort order
    const allProviders = await prisma.provider.findMany({
      where: {
        active: true
      },
      orderBy: {
        sortOrder: 'asc'
      }
    })

    const currentIndex = allProviders.findIndex(provider => provider.id === id)
    
    if (currentIndex === -1) {
      return NextResponse.json(
        { error: 'Provider not found in active providers list' },
        { status: 404 }
      )
    }

    let targetIndex: number

    if (direction === 'up') {
      if (currentIndex === 0) {
        return NextResponse.json(
          { error: 'Provider is already at the top' },
          { status: 400 }
        )
      }
      targetIndex = currentIndex - 1
    } else {
      if (currentIndex === allProviders.length - 1) {
        return NextResponse.json(
          { error: 'Provider is already at the bottom' },
          { status: 400 }
        )
      }
      targetIndex = currentIndex + 1
    }

    const targetProvider = allProviders[targetIndex]

    // Swap sort orders
    await prisma.$transaction([
      prisma.provider.update({
        where: { id: currentProvider.id },
        data: { sortOrder: targetProvider.sortOrder }
      }),
      prisma.provider.update({
        where: { id: targetProvider.id },
        data: { sortOrder: currentProvider.sortOrder }
      })
    ])

    return NextResponse.json({
      status: 'success',
      message: `Provider moved ${direction} successfully`
    })

  } catch (error) {
    console.error('Error moving provider:', error)
    return NextResponse.json(
      { error: 'Failed to move provider' },
      { status: 500 }
    )
  }
} 