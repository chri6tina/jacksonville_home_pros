'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/layout/admin-layout'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
  StarIcon,
  FlagIcon,
  PhotoIcon,
  ChatBubbleLeftIcon,
  XMarkIcon as CloseIcon
} from '@heroicons/react/24/outline'

interface ReviewImage {
  id: string
  url: string
  alt?: string
}

interface ReviewReply {
  id: string
  content: string
  createdAt: string
}

interface Review {
  id: string
  rating: number
  title: string
  content: string
  quality?: number
  timeliness?: number
  value?: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  source: 'ONSITE' | 'GOOGLE' | 'YELP' | 'FACEBOOK' | 'OTHER'
  verified: boolean
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
  provider: {
    id: string
    businessName: string
    slug: string
  }
  images: ReviewImage[]
  replies: ReviewReply[]
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmittingReply, setIsSubmittingReply] = useState(false)

  useEffect(() => {
    fetchReviews()
  }, [currentPage, statusFilter])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      })
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }
      
      if (searchTerm) {
        params.append('search', searchTerm)
      }

      const response = await fetch(`/api/admin/reviews?${params}`)
      if (response.ok) {
        const data = await response.json()
        setReviews(data.reviews)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchReviews()
  }

  const handleStatusUpdate = async (reviewId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        // Update local state
        setReviews(reviews.map(review => 
          review.id === reviewId 
            ? { ...review, status }
            : review
        ))
        
        // Update selected review if it's the one being modified
        if (selectedReview?.id === reviewId) {
          setSelectedReview({ ...selectedReview, status })
        }
      }
    } catch (error) {
      console.error('Error updating review status:', error)
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // Remove from local state
        setReviews(reviews.filter(review => review.id !== reviewId))
        
        // Close modal if the deleted review was selected
        if (selectedReview?.id === reviewId) {
          setShowDetailModal(false)
          setSelectedReview(null)
        }
      }
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  const openDetailModal = async (review: Review) => {
    setSelectedReview(review)
    setShowDetailModal(true)
    setReplyContent('')
  }

  const handleReplySubmit = async (reviewId: string) => {
    if (!replyContent.trim()) return

    try {
      setIsSubmittingReply(true)
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: replyContent })
      })

      if (response.ok) {
        const data = await response.json()
        
        // Add the new reply to the selected review
        if (selectedReview) {
          setSelectedReview({
            ...selectedReview,
            replies: [...selectedReview.replies, data.reply]
          })
        }
        
        // Update the review in the list
        setReviews(reviews.map(review => 
          review.id === reviewId 
            ? { ...review, replies: [...review.replies, data.reply] }
            : review
        ))
        
        setReplyContent('')
      }
    } catch (error) {
      console.error('Error submitting reply:', error)
    } finally {
      setIsSubmittingReply(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
    switch (status) {
      case 'APPROVED':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'REJECTED':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'PENDING':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const getSourceBadge = (source: string) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
    switch (source) {
      case 'ONSITE':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'GOOGLE':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'YELP':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'FACEBOOK':
        return `${baseClasses} bg-indigo-100 text-indigo-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const renderRatingBreakdown = (review: Review) => {
    if (!review.quality && !review.timeliness && !review.value) {
      return null
    }

    return (
      <div className="space-y-2">
        {review.quality && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Quality:</span>
            <div className="flex items-center">
              {renderStars(review.quality)}
              <span className="ml-1 text-sm text-gray-600">{review.quality}/5</span>
            </div>
          </div>
        )}
        {review.timeliness && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Timeliness:</span>
            <div className="flex items-center">
              {renderStars(review.timeliness)}
              <span className="ml-1 text-sm text-gray-600">{review.timeliness}/5</span>
            </div>
          </div>
        )}
        {review.value && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Value:</span>
            <div className="flex items-center">
              {renderStars(review.value)}
              <span className="ml-1 text-sm text-gray-600">{review.value}/5</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <AdminLayout title="Reviews" subtitle="Manage and moderate customer reviews">
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews by content or business name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </form>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
            
            <button
              onClick={fetchReviews}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <FunnelIcon className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading reviews...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Review
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {review.title}
                          </div>
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {review.content}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            by {review.user.name || review.user.email}
                            {review.verified && (
                              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                ✓ Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            {review.images.length > 0 && (
                              <span className="inline-flex items-center text-xs text-gray-500">
                                <PhotoIcon className="w-3 h-3 mr-1" />
                                {review.images.length} photo{review.images.length !== 1 ? 's' : ''}
                              </span>
                            )}
                            {review.replies.length > 0 && (
                              <span className="inline-flex items-center text-xs text-gray-500">
                                <ChatBubbleLeftIcon className="w-3 h-3 mr-1" />
                                {review.replies.length} repl{review.replies.length === 1 ? 'y' : 'ies'}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {review.provider.businessName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                          <span className="ml-1 text-sm text-gray-600">
                            {review.rating}/5
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getSourceBadge(review.source)}>
                          {review.source}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(review.status)}>
                          {review.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => openDetailModal(review)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          
                          {review.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(review.id, 'APPROVED')}
                                className="text-green-600 hover:text-green-900"
                                title="Approve"
                              >
                                <CheckIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(review.id, 'REJECTED')}
                                className="text-red-600 hover:text-red-900"
                                title="Reject"
                              >
                                <XMarkIcon className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing page <span className="font-medium">{currentPage}</span> of{' '}
                      <span className="font-medium">{totalPages}</span>
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Review Detail Modal */}
      {showDetailModal && selectedReview && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Review Details</h3>
              <button
                onClick={() => {
                  setShowDetailModal(false)
                  setSelectedReview(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Review Header */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-semibold text-gray-900">{selectedReview.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={getStatusBadge(selectedReview.status)}>
                      {selectedReview.status}
                    </span>
                    <span className={getSourceBadge(selectedReview.source)}>
                      {selectedReview.source}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>by {selectedReview.user.name || selectedReview.user.email}</span>
                  <span>•</span>
                  <span>{new Date(selectedReview.createdAt).toLocaleDateString()}</span>
                  {selectedReview.verified && (
                    <>
                      <span>•</span>
                      <span className="text-green-600 font-medium">✓ Verified</span>
                    </>
                  )}
                </div>
              </div>

              {/* Main Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {renderStars(selectedReview.rating)}
                  <span className="ml-2 text-lg font-medium text-gray-900">
                    {selectedReview.rating}/5
                  </span>
                </div>
              </div>

              {/* Rating Breakdown */}
              {renderRatingBreakdown(selectedReview) && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-900 mb-3">Detailed Ratings</h5>
                  {renderRatingBreakdown(selectedReview)}
                </div>
              )}

              {/* Review Content */}
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">Review</h5>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedReview.content}</p>
              </div>

              {/* Review Images */}
              {selectedReview.images.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-3">
                    Photos ({selectedReview.images.length})
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedReview.images.map((image) => (
                      <div key={image.id} className="relative">
                        <img
                          src={image.url}
                          alt={image.alt || 'Review photo'}
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Provider Replies */}
              {selectedReview.replies.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-3">
                    Provider Response{selectedReview.replies.length > 1 ? 's' : ''}
                  </h5>
                  <div className="space-y-3">
                    {selectedReview.replies.map((reply) => (
                      <div key={reply.id} className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-900">
                            {selectedReview.provider.businessName}
                          </span>
                          <span className="text-xs text-blue-600">
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-blue-800 whitespace-pre-wrap">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Reply Form */}
              <div className="border-t pt-4">
                <h5 className="text-sm font-medium text-gray-900 mb-3">Add Provider Response</h5>
                <div className="space-y-3">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Enter provider response..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleReplySubmit(selectedReview.id)}
                      disabled={!replyContent.trim() || isSubmittingReply}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmittingReply ? 'Adding...' : 'Add Response'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                {selectedReview.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(selectedReview.id, 'APPROVED')}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedReview.id, 'REJECTED')}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDeleteReview(selectedReview.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false)
                    setSelectedReview(null)
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
} 