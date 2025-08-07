import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import { createPayment, createCheckoutSession } from '@/lib/square'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      type, 
      amount, 
      currency = 'USD',
      bookingId,
      providerId,
      lineItems,
      successUrl,
      cancelUrl
    } = body

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    if (type === 'direct_payment') {
      // Direct payment with source ID (for saved cards, etc.)
      const { sourceId } = body
      
      if (!sourceId) {
        return NextResponse.json(
          { error: 'Source ID required for direct payment' },
          { status: 400 }
        )
      }

      const payment = await createPayment(sourceId, amount, currency)

      // Save payment record
      await prisma.payment.create({
        data: {
          providerId,
          bookingId,
          amount,
          currency,
          status: payment.status === 'COMPLETED' ? 'COMPLETED' : 'PENDING',
          type: 'FULL_PAYMENT',
          stripeId: payment.id,
          description: `Payment for booking ${bookingId}`,
        }
      })

      return NextResponse.json({
        success: true,
        payment: {
          id: payment.id,
          status: payment.status,
          amount: payment.amountMoney?.amount,
          currency: payment.amountMoney?.currency,
        }
      })

    } else if (type === 'checkout_session') {
      // Create checkout session for web payments
      if (!lineItems || !successUrl || !cancelUrl) {
        return NextResponse.json(
          { error: 'Line items, success URL, and cancel URL required for checkout session' },
          { status: 400 }
        )
      }

      const checkout = await createCheckoutSession(
        lineItems,
        successUrl,
        cancelUrl
      )

      return NextResponse.json({
        success: true,
        checkout: {
          id: checkout.id,
          checkoutPageUrl: checkout.checkoutPageUrl,
        }
      })

    } else {
      return NextResponse.json(
        { error: 'Invalid payment type' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Square payment error:', error)
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    )
  }
}

// Webhook handler for Square events
export async function PUT(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-square-signature')

    // Verify webhook signature (implement signature verification)
    // For now, we'll process the webhook without verification in development

    const event = JSON.parse(body)

    // Handle different webhook events
    switch (event.type) {
      case 'payment.created':
        // Handle payment created
        console.log('Payment created:', event.data.id)
        break
      
      case 'payment.updated':
        // Handle payment updated
        console.log('Payment updated:', event.data.id)
        break
      
      case 'payment.completed':
        // Handle payment completed
        console.log('Payment completed:', event.data.id)
        
        // Update payment status in database
        await prisma.payment.updateMany({
          where: { stripeId: event.data.id },
          data: { status: 'COMPLETED' }
        })
        break
      
      case 'payment.failed':
        // Handle payment failed
        console.log('Payment failed:', event.data.id)
        
        // Update payment status in database
        await prisma.payment.updateMany({
          where: { stripeId: event.data.id },
          data: { status: 'FAILED' }
        })
        break
      
      default:
        console.log('Unhandled webhook event:', event.type)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Square webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
} 