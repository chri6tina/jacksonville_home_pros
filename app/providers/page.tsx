import type { Metadata } from 'next'
import { 
  BuildingOfficeIcon,
  UserGroupIcon,
  StarIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'For Providers - Jacksonville Home Pros',
  description: 'Join Jacksonville Home Pros as a service provider. Grow your business, reach more customers, and build your reputation in the Jacksonville community.',
  keywords: [
    'join as provider Jacksonville',
    'service provider registration Jacksonville',
    'contractor platform Jacksonville',
    'home service business Jacksonville',
    'provider opportunities Jacksonville'
  ],
  openGraph: {
    title: 'For Providers - Jacksonville Home Pros',
    description: 'Join our platform and grow your home service business in Jacksonville.',
    type: 'website',
  },
}

const benefits = [
  {
    icon: UserGroupIcon,
    title: 'Reach More Customers',
    description: 'Connect with thousands of Jacksonville homeowners actively seeking your services.'
  },
  {
    icon: StarIcon,
    title: 'Build Your Reputation',
    description: 'Collect and showcase customer reviews to build trust and credibility.'
  },
  {
    icon: ChartBarIcon,
    title: 'Grow Your Business',
    description: 'Access detailed analytics and insights to optimize your service offerings.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Verified Badge',
    description: 'Earn our verified provider badge to stand out from the competition.'
  },
  {
    icon: ClockIcon,
    title: 'Flexible Scheduling',
    description: 'Manage your availability and bookings through our easy-to-use platform.'
  },
  {
    icon: BuildingOfficeIcon,
    title: 'Local Focus',
    description: 'Join a platform built specifically for Jacksonville\'s home service market.'
  }
]

const requirements = [
  'Valid business license and insurance',
  'Background check and verification',
  'Minimum 4.0 star rating requirement',
  'Professional business practices',
  'Commitment to customer satisfaction',
  'Local service area coverage'
]

const steps = [
  {
    number: '01',
    title: 'Apply Online',
    description: 'Complete our simple online application with your business information and credentials.'
  },
  {
    number: '02',
    title: 'Verification Process',
    description: 'We verify your licenses, insurance, and conduct background checks for safety.'
  },
  {
    number: '03',
    title: 'Profile Setup',
    description: 'Create your detailed business profile with photos, services, and pricing.'
  },
  {
    number: '04',
    title: 'Start Receiving Leads',
    description: 'Begin receiving qualified leads and booking appointments with customers.'
  }
]

export default function ForProvidersPage() {
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
              For Service Providers
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join Jacksonville Home Pros and grow your business with qualified leads from local homeowners
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-neutral-100 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                Apply Now
              </Link>
              <Link 
                href="#benefits"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
              >
                <ArrowRightIcon className="w-5 h-5 mr-2" />
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">10,000+</h3>
              <p className="text-neutral-600">Active Homeowners</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BuildingOfficeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">500+</h3>
              <p className="text-neutral-600">Verified Providers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">4.8★</h3>
              <p className="text-neutral-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">95%</h3>
              <p className="text-neutral-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Why Join Jacksonville Home Pros?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Join a platform built specifically for Jacksonville's home service market and 
              take your business to the next level.
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

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              How to Get Started
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Join our platform in just 4 simple steps and start receiving qualified leads
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Requirements to Join
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                We maintain high standards to ensure quality service for our customers. 
                Here's what we look for in our providers:
              </p>
              
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700">{requirement}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link 
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                  Apply Now
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                What We Offer
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Free profile setup and optimization</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Qualified lead generation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Customer review management</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Business analytics dashboard</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Marketing and promotion support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Success Stories
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Hear from providers who have grown their businesses with Jacksonville Home Pros
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <BuildingOfficeIcon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Mike's Plumbing</h3>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-neutral-600">4.9★ (127 reviews)</span>
                  </div>
                </div>
              </div>
              <p className="text-neutral-600">
                "Since joining Jacksonville Home Pros, our business has grown 40%. The quality 
                of leads is outstanding, and the platform makes it easy to manage our bookings."
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <BuildingOfficeIcon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Elite Electrical</h3>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-neutral-600">4.8★ (89 reviews)</span>
                  </div>
                </div>
              </div>
              <p className="text-neutral-600">
                "The platform has helped us establish credibility in the Jacksonville market. 
                Our customer base has expanded significantly, and the reviews have been amazing."
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <BuildingOfficeIcon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Green Thumb Landscaping</h3>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-neutral-600">4.7★ (156 reviews)</span>
                  </div>
                </div>
              </div>
              <p className="text-neutral-600">
                "Jacksonville Home Pros has been a game-changer for our landscaping business. 
                We've connected with so many great customers and grown our team to meet demand."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join hundreds of successful service providers who trust Jacksonville Home Pros 
            to help them grow their business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-neutral-100 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <BuildingOfficeIcon className="w-5 h-5 mr-2" />
              Apply Now
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              Call Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
