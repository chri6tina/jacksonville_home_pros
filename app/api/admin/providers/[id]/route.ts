import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'

// PATCH - Update provider (including positioning and status)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const adminUser = await requireAdmin()
    
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
    console.error('Admin update provider error:', error)
    
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 })
    }
    
    return NextResponse.json(
      { error: 'Failed to update provider' },
      { status: 500 }
    )
  }
}

// DELETE - Delete provider
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const adminUser = await requireAdmin()
    
    const { id } = await params
    
    // Delete the provider (this will cascade delete related records)
    await prisma.provider.delete({
      where: { id }
    })

    return NextResponse.json({
      status: 'success',
      message: 'Provider deleted successfully'
    })

  } catch (error) {
    console.error('Admin delete provider error:', error)
    
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 })
    }
    
    return NextResponse.json(
      { error: 'Failed to delete provider' },
      { status: 500 }
    )
  }
} 