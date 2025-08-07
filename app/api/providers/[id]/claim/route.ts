import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import crypto from 'crypto'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { searchParams } = new URL(request.url)
    const claimToken = searchParams.get('token')

    // Get provider with claiming information
    const provider = await prisma.provider.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
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

    // If no claim token provided, just return provider info
    if (!claimToken) {
      return NextResponse.json({
        provider: {
          id: provider.id,
          businessName: provider.businessName,
          email: provider.email,
          phone: provider.phone,
          address: provider.address,
          city: provider.city,
          state: provider.state,
          description: provider.description,
          verified: provider.verified,
          premium: provider.premium,
          featured: provider.featured,
          claimed: false
        }
      })
    }

    // Verify claim token
    const isValidToken = await verifyClaimToken(provider.id, claimToken)
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Invalid or expired claim token' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      provider: {
        id: provider.id,
        businessName: provider.businessName,
        email: provider.email,
        phone: provider.phone,
        address: provider.address,
        city: provider.city,
        state: provider.state,
        description: provider.description,
        verified: provider.verified,
        premium: provider.premium,
        featured: provider.featured,
        claimed: false,
        claimToken: claimToken
      }
    })

  } catch (error) {
    console.error('Error fetching provider for claiming:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { userId, claimToken } = body

    // Get session to verify user
    const session = await getServerSession()
    if (!session?.user || session.user.id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get provider
    const provider = await prisma.provider.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
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

    // Verify claim token if provided
    if (claimToken) {
      const isValidToken = await verifyClaimToken(provider.id, claimToken)
      if (!isValidToken) {
        return NextResponse.json(
          { error: 'Invalid or expired claim token' },
          { status: 400 }
        )
      }
    } else {
      // Email-based verification
      if (session.user.email !== provider.email) {
        return NextResponse.json(
          { error: 'Email address does not match the business email' },
          { status: 400 }
        )
      }
    }

    // Update user role to PROVIDER if they're not already
    await prisma.user.update({
      where: { id: userId },
      data: { role: 'PROVIDER' }
    })

    // Claim the provider
    const updatedProvider = await prisma.provider.update({
      where: { id },
      data: {
        userId: userId,
        claimedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    // Create a notification for the admin
    await prisma.notification.create({
      data: {
        type: 'PROVIDER_CLAIMED',
        title: 'Provider Claimed',
        message: `${provider.businessName} has been claimed by ${session.user.name}`,
        userId: userId,
        providerId: provider.id,
        read: false
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Provider claimed successfully',
      provider: {
        id: updatedProvider.id,
        businessName: updatedProvider.businessName,
        claimed: true,
        claimedBy: {
          id: updatedProvider.user!.id,
          name: updatedProvider.user!.name,
          email: updatedProvider.user!.email
        }
      }
    })

  } catch (error) {
    console.error('Error claiming provider:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to verify claim tokens
async function verifyClaimToken(providerId: string, token: string): Promise<boolean> {
  try {
    // In a real implementation, you'd store tokens in the database
    // For now, we'll use a simple hash-based verification
    const expectedToken = crypto
      .createHash('sha256')
      .update(`${providerId}-${process.env.CLAIM_SECRET || 'default-secret'}`)
      .digest('hex')
      .substring(0, 16)

    return token === expectedToken
  } catch (error) {
    console.error('Error verifying claim token:', error)
    return false
  }
} 