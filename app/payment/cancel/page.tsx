'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { XCircleIcon, HomeIcon, UserIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function PaymentCancelPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [bookingId, setBookingId] = useState<string | null>(null)

  useEffect(() => {
    const booking = searchParams.get('booking')
    if (booking) {
      setBookingId(booking)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-xl shadow-soft p-8 text-center">
          {/* Cancel Icon */}
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <XCircleIcon className="w-8 h-8 text-red-600" />
          </div>

          {/* Cancel Message */}
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Payment Cancelled
          </h1>
          <p className="text-neutral-600 mb-6">
            Your payment was cancelled. No charges were made to your account.
          </p>

          {/* Booking ID */}
          {bookingId && (
            <div className="bg-neutral-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-neutral-600">Booking Reference:</p>
              <p className="font-mono text-sm font-medium text-neutral-900">{bookingId}</p>
            </div>
          )}

          {/* Options */}
          <div className="mb-8">
            <h3 className="font-semibold text-neutral-900 mb-3">What would you like to do?</h3>
            <div className="text-sm text-neutral-600 space-y-2">
              <p>• Try the payment again</p>
              <p>• Contact the service provider</p>
              <p>• Browse other services</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => router.back()}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 font-medium flex items-center justify-center"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Try Again
            </button>
            
            <Link
              href="/dashboard"
              className="w-full border border-neutral-300 text-neutral-700 py-3 px-4 rounded-lg hover:bg-neutral-50 font-medium flex items-center justify-center"
            >
              <UserIcon className="w-5 h-5 mr-2" />
              Go to Dashboard
            </Link>
            
            <Link
              href="/"
              className="w-full border border-neutral-300 text-neutral-700 py-3 px-4 rounded-lg hover:bg-neutral-50 font-medium flex items-center justify-center"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Support */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <p className="text-sm text-neutral-500">
              Having trouble? <Link href="/contact" className="text-primary-600 hover:text-primary-700">Contact support</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 