import type { Metadata } from 'next'
import { 
  WrenchScrewdriverIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  HomeIcon,
  BoltIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Plumbing Services Jacksonville FL | Emergency Plumbing & Repairs',
  description: 'Professional plumbing services in Jacksonville, FL. Emergency repairs, installations, and maintenance. Licensed, insured, and 24/7 available. Get quotes from top-rated plumbers today.',
  keywords: [
    'plumbing services Jacksonville FL',
    'emergency plumbing Jacksonville',
    'plumber Jacksonville',
    'plumbing repair Jacksonville',
    'Jacksonville plumbing contractors',
    'plumbing installation Jacksonville',
    '24/7 plumber Jacksonville',
    'licensed plumber Jacksonville FL'
  ],
  openGraph: {
    title: 'Plumbing Services Jacksonville FL | Emergency Plumbing & Repairs',
    description: 'Professional plumbing services in Jacksonville, FL. Emergency repairs, installations, and maintenance. Licensed, insured, and 24/7 available.',
    type: 'website',
  },
}

const services = [
  {
    icon: WrenchScrewdriverIcon,
    title: 'Emergency Plumbing',
    description: '24/7 emergency plumbing services for burst pipes, leaks, and urgent repairs.',
    price: '$150-300'
  },
  {
    icon: HomeIcon,
    title: 'Plumbing Installation',
    description: 'New plumbing installations for homes, businesses, and renovations.',
    price: '$500-2,500'
  },
  {
    icon: BoltIcon,
    title: 'Drain Cleaning',
    description: 'Professional drain cleaning and clog removal services.',
    price: '$100-250'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Plumbing Inspections',
    description: 'Comprehensive plumbing inspections and maintenance.',
    price: '$75-150'
  }
]

const whyChooseUs = [
  {
    icon: MapPinIcon,
    title: 'Local Expertise',
    description: 'Jacksonville-based plumbers who understand local building codes and climate challenges.'
  },
  {
    icon: ClockIcon,
    title: '24/7 Availability',
    description: 'Emergency plumbing services available around the clock for urgent repairs.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Licensed & Insured',
    description: 'All plumbers are licensed, bonded, and insured for your peace of mind.'
  },
  {
    icon: StarIcon,
    title: 'Top-Rated Service',
    description: 'Consistently high ratings and positive reviews from Jacksonville homeowners.'
  }
]

const localInsights = [
  'Hurricane season preparation for plumbing systems',
  'Coastal climate considerations for pipes and fixtures',
  'Local building codes and permit requirements',
  'Popular Jacksonville neighborhoods and service areas',
  'Seasonal maintenance tips for Florida homes'
]

const faqs = [
  {
    question: 'How quickly can you respond to emergency plumbing calls?',
    answer: 'We typically respond to emergency calls within 1-2 hours in the Jacksonville area. For urgent situations like burst pipes, we prioritize immediate response.'
  },
  {
    question: 'Do you offer 24/7 emergency plumbing services?',
    answer: 'Yes, we provide 24/7 emergency plumbing services for urgent repairs like leaks, burst pipes, and clogged drains that can cause water damage.'
  },
  {
    question: 'What areas of Jacksonville do you serve?',
    answer: 'We serve all of Jacksonville and surrounding areas including Jacksonville Beach, San Marco, Riverside, Arlington, Mandarin, and Southside.'
  },
  {
    question: 'Are your plumbers licensed and insured?',
    answer: 'Yes, all our plumbers are licensed, bonded, and insured. We verify credentials and maintain proper insurance coverage for your protection.'
  },
  {
    question: 'Do you offer free estimates for plumbing work?',
    answer: 'Yes, we provide free estimates for most plumbing services. Emergency calls may have a service fee, but estimates for planned work are always free.'
  }
]

export default function PlumbingServicesPage() {
  const pagePath = '/services/plumbing'
  const serviceName = 'Plumbing Services'
  const description = typeof metadata.description === 'string' ? metadata.description : ''
  const serviceJsonLd = getServiceJsonLd(serviceName, pagePath, description)
  const businessJsonLd = getLocalBusinessJsonLd()
  const breadcrumbJsonLd = getBreadcrumbJsonLd(pagePath, serviceName)
  const faqJsonLd = getFaqPageJsonLd(faqs)
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={businessJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Plumbing Services in{' '}
              <span className="text-blue-200">Jacksonville, FL</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Emergency repairs, installations, and maintenance. Licensed, insured, and 24/7 available.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/search?category=plumbing"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <WrenchScrewdriverIcon className="w-5 h-5 mr-2" />
                Find a Plumber
              </Link>
              <Link 
                href="tel:+19045551234"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Emergency Call
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center">
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                Licensed & Insured
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-2" />
                24/7 Emergency Service
              </div>
              <div className="flex items-center">
                <StarIcon className="w-4 h-4 mr-2" />
                4.8★ Average Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Comprehensive Plumbing Services
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From emergency repairs to new installations, our Jacksonville plumbers provide 
              professional, reliable service for all your plumbing needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3>
                <p className="text-neutral-600 mb-4">{service.description}</p>
                <div className="text-blue-600 font-semibold">{service.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Why Choose Jacksonville Home Pros for Plumbing?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We're not just another plumbing company – we're your neighbors, committed to 
              providing the best plumbing services in Jacksonville.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Market Insights */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Jacksonville-Specific Plumbing Insights
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Jacksonville's unique climate and location present specific challenges for 
                plumbing systems. Our local expertise ensures your plumbing is prepared for 
                everything from hurricane season to the humid coastal climate.
              </p>
              
              <div className="space-y-4">
                {localInsights.map((insight, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Emergency Plumbing Services
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-neutral-700">Burst pipes and leaks</span>
                </div>
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-neutral-700">Clogged drains and toilets</span>
                </div>
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-neutral-700">Water heater failures</span>
                </div>
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-neutral-700">Sewer line backups</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-600 text-white rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">24/7 Emergency Service</span>
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <p className="text-sm mt-1">Call (904) 555-1234 for immediate assistance</p>
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
              Get answers to common questions about plumbing services in Jacksonville
            </p>
          </div>
          
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {faq.question}
                </h3>
                <p className="text-neutral-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Plumbing Services in Jacksonville?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Connect with trusted, licensed plumbers in your area. Get quotes, 
            schedule appointments, and solve your plumbing problems today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/categories/plumbing"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <WrenchScrewdriverIcon className="w-5 h-5 mr-2" />
              View All Plumbing Providers
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
