'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  CreditCardIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline'

interface SquarePaymentProps {
  amount: number
  bookingId?: string
  providerId?: string
  serviceName?: string
  onSuccess?: (payment: any) => void
  onError?: (error: string) => void
}

export default function SquarePayment({
  amount,
  bookingId,
  providerId,
  serviceName = 'Service',
  onSuccess,
  onError
}: SquarePaymentProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleCheckout = async () => {
    if (!session?.user) {
      router.push('/auth/signin')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/square', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'checkout_session',
          amount,
          bookingId,
          providerId,
          lineItems: [{
            name: serviceName,
            quantity: '1',
            basePriceMoney: {
              amount: Math.round(amount * 100), // Convert to cents
              currency: 'USD'
            }
          }],
          successUrl: `${window.location.origin}/payment/success?booking=${bookingId}`,
          cancelUrl: `${window.location.origin}/payment/cancel?booking=${bookingId}`
        })
      })

      const data = await response.json()

      if (response.ok && data.checkout?.checkoutPageUrl) {
        // Redirect to Square checkout
        window.location.href = data.checkout.checkoutPageUrl
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-green-800 font-medium">Payment successful!</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          Complete Payment
        </h3>
        <p className="text-neutral-600">
          Secure payment processed by Square
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center py-3 border-b border-neutral-200">
          <span className="text-neutral-700">Service:</span>
          <span className="font-medium">{serviceName}</span>
        </div>
        <div className="flex justify-between items-center py-3">
          <span className="text-neutral-700">Total:</span>
          <span className="text-xl font-bold text-neutral-900">
            {formatAmount(amount)}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <CreditCardIcon className="w-5 h-5 mr-2" />
            Pay {formatAmount(amount)}
          </>
        )}
      </button>

      <div className="mt-4 text-center">
        <p className="text-xs text-neutral-500">
          🔒 Secure payment powered by Square
        </p>
      </div>
    </div>
  )
} 