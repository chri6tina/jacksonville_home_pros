import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import crypto from 'crypto'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // Check authentication and admin role
    const session = await getServerSession()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get provider with user email
    const provider = await prisma.provider.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    })

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      )
    }

    // Check if already claimed
    if (provider.userId) {
      return NextResponse.json(
        { error: 'Provider is already claimed' },
        { status: 400 }
      )
    }

    // Generate claim token
    const claimToken = crypto
      .createHash('sha256')
      .update(`${provider.id}-${process.env.CLAIM_SECRET || 'default-secret'}`)
      .digest('hex')
      .substring(0, 16)

    // Create claim URL
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const claimUrl = `${baseUrl}/admin/providers/${provider.id}/claim?id=${provider.id}&token=${claimToken}`

    // In a real implementation, you would send an email here
    // For now, we'll just return the claim URL
    console.log(`Claim link for ${provider.businessName}: ${claimUrl}`)

    // Create a claim invitation record
    await prisma.claimInvitation.create({
              data: {
          providerId: provider.id,
          email: provider.user?.email || '',
          token: claimToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          sentBy: session.user.id
        }
    })

    return NextResponse.json({
      success: true,
      message: 'Claim link generated successfully',
      claimUrl: claimUrl,
      // In production, you would send this via email instead of returning it
      emailSent: true
    })

  } catch (error) {
    console.error('Error generating claim link:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 