import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// PATCH - Update provider (including positioning and status)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // Only allow specific fields to be updated
    const allowedFields = ['sortOrder', 'active', 'premium', 'featured', 'verified']
    const updateData: any = {}
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    const updatedProvider = await prisma.provider.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({
      status: 'success',
      provider: updatedProvider
    })

  } catch (error) {
    console.error('Error updating provider:', error)
    return NextResponse.json(
      { error: 'Failed to update provider' },
      { status: 500 }
    )
  }
} 