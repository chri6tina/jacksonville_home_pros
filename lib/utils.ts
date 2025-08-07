import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a clean, SEO-friendly slug from a business name
 * @param businessName - The business name to convert to a slug
 * @returns A clean slug suitable for URLs
 */
export function generateSlug(businessName: string): string {
  return businessName
    .toLowerCase()
    .trim()
    // Replace special characters and spaces with hyphens
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Limit length to 50 characters
    .substring(0, 50)
}

/**
 * Generate a unique slug by appending a number if the slug already exists
 * @param businessName - The business name to convert to a slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export function generateUniqueSlug(businessName: string, existingSlugs: string[]): string {
  let slug = generateSlug(businessName)
  let counter = 1
  let uniqueSlug = slug

  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`
    counter++
  }

  return uniqueSlug
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(dateObj)
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959 // Earth's radius in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getAverageRating(ratings: number[]): number {
  if (ratings.length === 0) return 0
  const sum = ratings.reduce((acc, rating) => acc + rating, 0)
  return Math.round((sum / ratings.length) * 10) / 10
}

export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return 'text-green-600'
  if (rating >= 4.0) return 'text-blue-600'
  if (rating >= 3.5) return 'text-yellow-600'
  if (rating >= 3.0) return 'text-orange-600'
  return 'text-red-600'
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'confirmed':
      return 'text-green-600 bg-green-100'
    case 'pending':
    case 'in_progress':
      return 'text-yellow-600 bg-yellow-100'
    case 'cancelled':
    case 'no_show':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-neutral-600 bg-neutral-100'
  }
}

export function getStatusBadge(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'Completed'
    case 'confirmed':
      return 'Confirmed'
    case 'pending':
      return 'Pending'
    case 'in_progress':
      return 'In Progress'
    case 'cancelled':
      return 'Cancelled'
    case 'no_show':
      return 'No Show'
    default:
      return status
  }
}

export function getPriceTypeLabel(priceType: string): string {
  switch (priceType.toLowerCase()) {
    case 'hourly':
      return 'per hour'
    case 'fixed':
      return 'fixed price'
    case 'quote':
      return 'quote required'
    case 'free':
      return 'free'
    default:
      return priceType
  }
}

export function getReviewSourceLabel(source: string): string {
  switch (source.toLowerCase()) {
    case 'onsite':
      return 'Jacksonville Home Pros'
    case 'google':
      return 'Google'
    case 'yelp':
      return 'Yelp'
    case 'facebook':
      return 'Facebook'
    default:
      return source
  }
}

export function getPaymentStatusLabel(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'Completed'
    case 'pending':
      return 'Pending'
    case 'processing':
      return 'Processing'
    case 'failed':
      return 'Failed'
    case 'refunded':
      return 'Refunded'
    case 'cancelled':
      return 'Cancelled'
    default:
      return status
  }
}

export function getPaymentTypeLabel(type: string): string {
  switch (type.toLowerCase()) {
    case 'deposit':
      return 'Deposit'
    case 'full_payment':
      return 'Full Payment'
    case 'subscription':
      return 'Subscription'
    case 'featured_listing':
      return 'Featured Listing'
    default:
      return type
  }
}

export function getQuoteStatusLabel(status: string): string {
  switch (status.toLowerCase()) {
    case 'open':
      return 'Open'
    case 'in_progress':
      return 'In Progress'
    case 'closed':
      return 'Closed'
    case 'awarded':
      return 'Awarded'
    default:
      return status
  }
}

export function getBookingStatusLabel(status: string): string {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'Pending'
    case 'confirmed':
      return 'Confirmed'
    case 'in_progress':
      return 'In Progress'
    case 'completed':
      return 'Completed'
    case 'cancelled':
      return 'Cancelled'
    case 'no_show':
      return 'No Show'
    default:
      return status
  }
}

export function getCategoryLevelLabel(level: string): string {
  switch (level.toLowerCase()) {
    case 'primary':
      return 'Primary'
    case 'secondary':
      return 'Secondary'
    case 'tertiary':
      return 'Tertiary'
    default:
      return level
  }
}

export function getLocationTypeLabel(type: string): string {
  switch (type.toLowerCase()) {
    case 'neighborhood':
      return 'Neighborhood'
    case 'zip_code':
      return 'Zip Code'
    case 'city':
      return 'City'
    case 'county':
      return 'County'
    default:
      return type
  }
}

export function getImageTypeLabel(type: string): string {
  switch (type.toLowerCase()) {
    case 'profile':
      return 'Profile'
    case 'gallery':
      return 'Gallery'
    case 'logo':
      return 'Logo'
    default:
      return type
  }
}

export function getAreaTypeLabel(areaType: string): string {
  switch (areaType.toLowerCase()) {
    case 'radius':
      return 'Service Radius'
    case 'zip_codes':
      return 'Zip Codes'
    case 'custom_polygon':
      return 'Custom Area'
    default:
      return areaType
  }
} 