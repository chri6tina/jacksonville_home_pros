'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Review {
  id: string
  customerName: string
  providerName: string
  rating: number
  content: string
  status: 'pending' | 'approved' | 'rejected'
  date: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      customerName: 'John Smith',
      providerName: 'Metro Rooter Plumbers',
      rating: 5,
      content: 'Excellent service! Fixed my sink quickly and professionally.',
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: '2',
      customerName: 'Sarah Johnson',
      providerName: 'Jacksonville HVAC Pro',
      rating: 4,
      content: 'Good work on my AC repair. Would recommend.',
      status: 'approved',
      date: '2024-01-14'
    },
    {
      id: '3',
      customerName: 'Mike Wilson',
      providerName: 'Elite Electrical Services',
      rating: 2,
      content: 'Service was late and overpriced.',
      status: 'rejected',
      date: '2024-01-13'
    }
  ])

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const isAuth = localStorage.getItem('admin-authenticated') === 'true'
    if (!isAuth) {
      window.location.href = '/admin-new'
    } else {
      setIsAuthenticated(true)
    }
  }, [])

  const updateReviewStatus = (id: string, status: 'approved' | 'rejected') => {
    setReviews(reviews.map(review => 
      review.id === id 
        ? { ...review, status }
        : review
    ))
  }

  const deleteReview = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== id))
    }
  }

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin-new" className="text-blue-600 hover:text-blue-800">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Manage Reviews</h1>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('admin-authenticated')
                window.location.href = '/admin-new'
              }}
              className="text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{review.customerName}</h3>
                    <span className="text-sm text-gray-500">for {review.providerName}</span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-lg">{renderStars(review.rating)}</span>
                    <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                  </div>
                  <p className="text-gray-700 mb-4">{review.content}</p>
                </div>
                
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  review.status === 'approved' 
                    ? 'bg-green-100 text-green-800'
                    : review.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {review.status}
                </span>
              </div>
              
              <div className="flex space-x-3">
                {review.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateReviewStatus(review.id, 'approved')}
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateReviewStatus(review.id, 'rejected')}
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </>
                )}
                {review.status !== 'pending' && (
                  <button
                    onClick={() => updateReviewStatus(review.id, 'pending')}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-md text-sm hover:bg-yellow-700"
                  >
                    Mark as Pending
                  </button>
                )}
                <button
                  onClick={() => deleteReview(review.id)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
