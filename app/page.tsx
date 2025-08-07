'use client'

import Link from 'next/link'
import { 
  MagnifyingGlassIcon, 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  UsersIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  PaintBrushIcon,
  BoltIcon,
  WrenchIcon,
  SparklesIcon,
  TruckIcon,
  SunIcon,
  HeartIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SearchBar } from '@/components/search/search-bar'
import { CategoryCard } from '@/components/categories/category-card'
import { ProviderCard } from '@/components/providers/provider-card'
import { TestimonialCard } from '@/components/testimonials/testimonial-card'
import { useEffect, useState } from 'react'

interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  providerCount: number
}

interface Provider {
  id: string
  businessName: string
  slug: string
  description: string
  rating: number
  reviewCount: number
  location: string
  services: Array<{
    id: string
    categoryId: string
    categoryName: string
    categorySlug: string
  }>
  verified: boolean
  premium: boolean
  featured: boolean
  image: string
  images: Array<{
    id: string
    url: string
    alt: string
    type: string
  }>
  googleRating: number
  googleReviewCount: number
  googlePlacesId: string
  phone: string
  email: string
  website: string
  address: string
  city: string
  state: string
}

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  content: string
  service: string
  image: string
}

interface Stats {
  label: string
  value: string
}

export default function HomePage() {
  const [featuredCategories, setFeaturedCategories] = useState<Category[]>([])
  const [featuredProviders, setFeaturedProviders] = useState<Provider[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [stats, setStats] = useState<Stats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch('/api/categories?featured=true&limit=6')
        const categoriesData = await categoriesResponse.json()
        
        // Fetch featured providers
        const providersResponse = await fetch('/api/providers?featured=true&limit=3')
        const providersData = await providersResponse.json()
        
        // Fetch testimonials (reviews)
        const testimonialsResponse = await fetch('/api/reviews?featured=true&limit=3')
        const testimonialsData = await testimonialsResponse.json()
        
        // Fetch stats
        const statsResponse = await fetch('/api/stats')
        const statsData = await statsResponse.json()

        setFeaturedCategories(categoriesData.categories || [])
        setFeaturedProviders(providersData.providers || [])
        setTestimonials(testimonialsData.reviews || [])
        setStats(statsData.stats || [])
      } catch (error) {
        console.error('Error fetching home data:', error)
        // Set empty arrays if fetch fails
        setFeaturedCategories([])
        setFeaturedProviders([])
        setTestimonials([])
        setStats([])
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center -mt-8 md:-mt-12">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Trusted Home Service Providers in{' '}
              <span className="text-accent-400 bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
                Jacksonville
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl mb-10 text-white/90 max-w-4xl mx-auto leading-relaxed">
              Connect with local professionals for all your home maintenance, repair, and improvement needs
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <SearchBar />
            </div>
            
            {/* Popular Searches */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto mb-12">
              <p className="text-white/80 text-sm font-medium mb-6 text-center">Popular Searches</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 justify-items-center">
                {['Plumbing', 'Electrical', 'HVAC', 'Landscaping', 'Painting', 'Handyman'].map((service) => (
                  <button
                    key={service}
                    className="w-full max-w-[120px] px-4 py-3 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 text-center whitespace-nowrap"
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-white/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Popular Services
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Find the right professional for your home service needs
            </p>
          </div>
          
          <div className="category-grid mb-16">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/categories" 
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All Services
              <SparklesIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container-responsive">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Get started in just three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MagnifyingGlassIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search & Compare</h3>
              <p className="text-neutral-600">
                Find providers in your area and compare ratings, reviews, and pricing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Connect</h3>
              <p className="text-neutral-600">
                Schedule appointments or request quotes directly through our platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get It Done</h3>
              <p className="text-neutral-600">
                Enjoy quality service and leave reviews to help other homeowners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="section bg-neutral-50">
        <div className="container-responsive">
          <div className="section-header">
            <h2 className="section-title">Why Jacksonville Homeowners Trust Us</h2>
            <p className="section-subtitle">
              We're committed to connecting you with the best local professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified & Licensed</h3>
              <p className="text-neutral-600">
                Every provider is background-checked, licensed, and insured for your peace of mind.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Top-Rated Only</h3>
              <p className="text-neutral-600">
                We only feature providers with excellent ratings and positive customer reviews.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Local Experts</h3>
              <p className="text-neutral-600">
                Jacksonville-based professionals who know our community and local building codes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Response</h3>
              <p className="text-neutral-600">
                Get quotes and book appointments within hours, not days. Time is money!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="section">
        <div className="container-responsive">
          <div className="section-header">
            <h2 className="section-title">Featured Jacksonville Professionals</h2>
            <p className="section-subtitle">
              Meet some of our top-rated local service providers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/search" 
              className="btn-outline inline-flex items-center"
            >
              Find More Providers
              <TruckIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-gradient-to-br from-neutral-50 to-white">
        <div className="container-responsive">
          <div className="section-header">
            <h2 className="section-title">Jacksonville Homeowners Love Our Service</h2>
            <p className="section-subtitle">
              Real reviews from satisfied customers across the Jacksonville area
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 text-neutral-600">
              <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">4.8 average rating</span>
              <span>•</span>
              <span>10,000+ happy customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-primary-600 text-white">
        <div className="container-responsive">
          <div className="section-header">
            <h2 className="section-title text-white">Why Choose Jacksonville Home Pros?</h2>
            <p className="section-subtitle text-white/80">
              We make finding reliable home service providers easy and stress-free
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <ShieldCheckIcon className="w-12 h-12 mx-auto mb-4 text-accent-400" />
              <h3 className="text-lg font-semibold mb-2">Verified Providers</h3>
              <p className="text-white/80">
                All providers are background-checked and verified for your safety.
              </p>
            </div>
            
            <div className="text-center">
              <StarIcon className="w-12 h-12 mx-auto mb-4 text-accent-400" />
              <h3 className="text-lg font-semibold mb-2">Top Ratings</h3>
              <p className="text-white/80">
                Only the highest-rated professionals make it to our platform.
              </p>
            </div>
            
            <div className="text-center">
              <ClockIcon className="w-12 h-12 mx-auto mb-4 text-accent-400" />
              <h3 className="text-lg font-semibold mb-2">Quick Response</h3>
              <p className="text-white/80">
                Get quotes and book appointments within hours, not days.
              </p>
            </div>
            
            <div className="text-center">
              <HeartIcon className="w-12 h-12 mx-auto mb-4 text-accent-400" />
              <h3 className="text-lg font-semibold mb-2">Local Focus</h3>
              <p className="text-white/80">
                Supporting Jacksonville's local businesses and community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="container-responsive text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of Jacksonville homeowners who trust us to connect them with reliable, local service providers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/search" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-neutral-100 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
              <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
              Find a Provider
            </Link>
            <Link href="/categories" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105">
              <SparklesIcon className="w-5 h-5 mr-2" />
              Browse Services
            </Link>
          </div>
          
          <div className="text-white/80 text-sm">
            <p>Trusted by 10,000+ Jacksonville homeowners • 4.8★ average rating</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 