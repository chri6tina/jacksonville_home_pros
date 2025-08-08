import type { Metadata } from 'next'
import { 
  HomeIcon,
  MapPinIcon,
  UsersIcon,
  ShieldCheckIcon,
  StarIcon,
  HeartIcon,
  CheckCircleIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us - Jacksonville Home Pros',
  description: 'Learn about Jacksonville Home Pros - your trusted partner for connecting with local home service providers in Jacksonville, Florida. Our mission is to make home maintenance easy and reliable.',
  keywords: [
    'Jacksonville Home Pros',
    'Jacksonville home services',
    'local contractors Jacksonville',
    'trusted home professionals Jacksonville',
    'Jacksonville home improvement'
  ],
  openGraph: {
    title: 'About Us - Jacksonville Home Pros',
    description: 'Connecting Jacksonville homeowners with trusted local service providers since 2024.',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About Jacksonville Home Pros
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Connecting Jacksonville homeowners with trusted local service providers since 2024
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                At Jacksonville Home Pros, we believe that every homeowner deserves access to reliable, 
                trustworthy, and professional home service providers. Our mission is to simplify the 
                process of finding and booking local professionals for all your home maintenance, 
                repair, and improvement needs.
              </p>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                We're not just another directory – we're your neighbors, committed to building a 
                stronger Jacksonville community by supporting local businesses and ensuring quality 
                service for every homeowner.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/how-it-works"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  How It Works
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
                >
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  Contact Us
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UsersIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">10,000+</h3>
                    <p className="text-sm text-neutral-600">Happy Homeowners</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BuildingOfficeIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">500+</h3>
                    <p className="text-sm text-neutral-600">Verified Providers</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <StarIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">4.8★</h3>
                    <p className="text-sm text-neutral-600">Average Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPinIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Jacksonville</h3>
                    <p className="text-sm text-neutral-600">Local Focus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Our Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape how we serve our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Trust & Safety</h3>
              <p className="text-neutral-600">
                Every provider on our platform is thoroughly vetted, background-checked, 
                and verified to ensure your safety and peace of mind.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <HeartIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Local Community</h3>
              <p className="text-neutral-600">
                We're committed to supporting Jacksonville's local businesses and building 
                a stronger, more connected community.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <StarIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Quality Service</h3>
              <p className="text-neutral-600">
                We only work with the highest-rated professionals who consistently deliver 
                exceptional service and customer satisfaction.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <CheckCircleIcon className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Transparency</h3>
              <p className="text-neutral-600">
                Clear pricing, honest reviews, and transparent communication are the 
                foundation of every interaction on our platform.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <UsersIcon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Customer First</h3>
              <p className="text-neutral-600">
                Your satisfaction is our priority. We're here to support you every step 
                of the way, from finding the right provider to ensuring job completion.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <HomeIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Home Expertise</h3>
              <p className="text-neutral-600">
                We understand the unique challenges of homeownership and provide expert 
                guidance to help you make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jacksonville Focus Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Why Jacksonville?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-accent-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700">Deep understanding of local building codes and regulations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-accent-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700">Knowledge of Jacksonville's unique climate challenges</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-accent-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700">Established relationships with local suppliers and contractors</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-accent-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700">Community-focused approach to business</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-accent-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700">Support for local economy and small businesses</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Built for Jacksonville
              </h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                Jacksonville Home Pros was created specifically for our community. We understand 
                the unique challenges that Jacksonville homeowners face – from hurricane season 
                preparations to the humid climate's impact on homes.
              </p>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Our platform connects you with local professionals who know our area, understand 
                our building codes, and are committed to serving our community with integrity 
                and expertise.
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-5 h-5 text-primary-600" />
                  <span className="text-neutral-700 font-medium">Jacksonville, Florida</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UsersIcon className="w-5 h-5 text-primary-600" />
                  <span className="text-neutral-700 font-medium">Local Community</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of Jacksonville homeowners who trust us to connect them with 
            reliable, local service providers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/search"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-neutral-100 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Find a Provider
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
            >
              <MapPinIcon className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
