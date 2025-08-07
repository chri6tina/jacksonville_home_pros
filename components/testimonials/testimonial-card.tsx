'use client'

import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'
import { MapPinIcon } from '@heroicons/react/24/outline'

interface TestimonialCardProps {
  testimonial: {
    id: string
    name: string
    location: string
    rating: number
    content: string
    service: string
    image: string
  }
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon 
          key={i} 
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400' : 'text-neutral-300'}`} 
        />
      )
    }
    return stars
  }

  return (
    <div className="card p-6 space-y-4">
      {/* Rating */}
      <div className="flex items-center space-x-1">
        {renderStars(testimonial.rating)}
      </div>

      {/* Content */}
      <blockquote className="text-neutral-700 italic">
        "{testimonial.content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100 flex-shrink-0">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-neutral-900">
            {testimonial.name}
          </div>
          <div className="flex items-center space-x-1 text-sm text-neutral-600">
            <MapPinIcon className="w-4 h-4" />
            <span>{testimonial.location}</span>
          </div>
          <div className="text-xs text-neutral-500">
            {testimonial.service} service
          </div>
        </div>
      </div>
    </div>
  )
} 