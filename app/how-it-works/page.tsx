import type { Metadata } from 'next'
import { 
  MagnifyingGlassIcon,
  StarIcon,
  PhoneIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How It Works - Jacksonville Home Pros',
  description: 'Learn how Jacksonville Home Pros connects you with trusted local service providers. Simple 3-step process: search, compare, and book with confidence.',
  keywords: [
    'how it works',
    'find contractors Jacksonville',
    'book home services Jacksonville',
    'Jacksonville home service process',
    'hire contractors Jacksonville'
  ],
  openGraph: {
    title: 'How It Works - Jacksonville Home Pros',
    description: 'Simple 3-step process to find and book trusted local service providers in Jacksonville.',
    type: 'website',
  },
}

const steps = [
  {
    number: '01',
    title: 'Search & Discover',
    description: 'Find local providers by service type, location, or specific need. Browse profiles, reviews, and ratings.',
    icon: MagnifyingGlassIcon,
    details: [
      'Search by service category (plumbing, electrical, HVAC, etc.)',
      'Filter by location, rating, and availability',
      'Browse detailed provider profiles and photos',
      'Read verified customer reviews and ratings'
    ]
  },
  {
    number: '02',
    title: 'Compare & Choose',
    description: 'Compare providers based on ratings, reviews, pricing, and availability. Make an informed decision.',
    icon: StarIcon,
    details: [
      'Compare multiple providers side-by-side',
      'Review detailed service descriptions and pricing',
      'Check availability and response times',
      'Read customer testimonials and reviews'
    ]
  },
  {
    number: '03',
    title: 'Book & Connect',
    description: 'Book your service with confidence. Connect directly with your chosen provider.',
    icon: PhoneIcon,
    details: [
      'Book appointments online or by phone',
      'Get instant confirmation and reminders',
      'Communicate directly with your provider',
      'Track service progress and completion'
    ]
  }
]

const benefits = [
  {
    icon: ShieldCheckIcon,
    title: 'Verified Providers',
    description: 'Every provider is background-checked, licensed, and insured for your safety.'
  },
  {
    icon: StarIcon,
    title: 'Top-Rated Only',
    description: 'We only feature providers with excellent ratings and positive customer reviews.'
  },
  {
    icon: MapPinIcon,
    title: 'Local Experts',
    description: 'Jacksonville-based professionals who know our community and local building codes.'
  },
  {
    icon: ClockIcon,
    title: 'Quick Response',
    description: 'Get quotes and book appointments within hours, not days.'
  },
  {
    icon: UserGroupIcon,
    title: 'Customer Support',
    description: 'Our team is here to help every step of the way, from search to service completion.'
  },
  {
    icon: DocumentTextIcon,
    title: 'Transparent Pricing',
    description: 'Clear pricing with no hidden fees. Get upfront quotes before booking.'
  }
]

export default function HowItWorksPage() {
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
              How It Works
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Find and book trusted local service providers in just 3 simple steps
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Simple 3-Step Process
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From finding the right provider to booking your service, we've made the process 
              as simple and transparent as possible.
            </p>
          </div>
          
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mr-6">
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900">{step.title}</h3>
                      <p className="text-lg text-neutral-600">{step.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-4">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-neutral-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <step.icon className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-neutral-900 mb-2">
                        Step {step.number}
                      </h4>
                      <p className="text-neutral-600">
                        {step.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Why Choose Jacksonville Home Pros?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We're committed to making your home service experience as smooth and reliable as possible
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <benefit.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{benefit.title}</h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Quality Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Safety & Quality Assurance
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Your safety and satisfaction are our top priorities. That's why we have a 
                comprehensive vetting process for all providers on our platform.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Background Checks</h3>
                    <p className="text-neutral-600">All providers undergo thorough background checks and verification.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Licensed & Insured</h3>
                    <p className="text-neutral-600">We verify all licenses, insurance, and bonding requirements.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Customer Reviews</h3>
                    <p className="text-neutral-600">Real reviews from verified customers help you make informed decisions.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Quality Guarantee</h3>
                    <p className="text-neutral-600">We stand behind the quality of work performed by our providers.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Our Commitment to You
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <ShieldCheckIcon className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">100% verified providers</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">4.8★ average rating</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">24/7 customer support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">Satisfaction guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600">
              Get answers to common questions about our platform and services
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                How do I know if a provider is trustworthy?
              </h3>
              <p className="text-neutral-600">
                All providers on our platform undergo thorough background checks, license verification, 
                and insurance verification. We also collect and display real customer reviews and ratings 
                to help you make informed decisions.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                What if I'm not satisfied with the service?
              </h3>
              <p className="text-neutral-600">
                We stand behind the quality of work performed by our providers. If you're not satisfied, 
                contact our customer support team, and we'll work with you and the provider to resolve 
                any issues.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                How quickly can I get service?
              </h3>
              <p className="text-neutral-600">
                Response times vary by provider and service type, but most providers respond within 
                a few hours. For urgent services, we prioritize providers who offer same-day or 
                next-day availability.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Is there a fee to use Jacksonville Home Pros?
              </h3>
              <p className="text-neutral-600">
                No, there's no fee for homeowners to use our platform. We're paid by service providers 
                for connecting them with customers, so our service is completely free for you.
              </p>
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
              <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
              Find a Provider
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
