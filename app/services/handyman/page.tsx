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
  CogIcon,
  FireIcon,
  SunIcon,
  BoltIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Handyman Services Jacksonville FL | General Repairs & Maintenance',
  description: 'Professional handyman services in Jacksonville, FL. General repairs, maintenance, and home improvement projects. Licensed, insured, and reliable handyman services for homes and businesses.',
  keywords: [
    'handyman services Jacksonville FL',
    'general repairs Jacksonville',
    'home maintenance Jacksonville',
    'handyman Jacksonville',
    'home repairs Jacksonville',
    'maintenance services Jacksonville',
    'handyman contractor Jacksonville',
    'home improvement Jacksonville',
    'repair services Jacksonville',
    'general contractor Jacksonville',
    'home maintenance Jacksonville',
    'handyman near me Jacksonville'
  ],
  openGraph: {
    title: 'Handyman Services Jacksonville FL | General Repairs & Maintenance',
    description: 'Professional handyman services in Jacksonville, FL. General repairs, maintenance, and home improvement projects.',
    type: 'website',
  },
}

const services = [
  {
    icon: WrenchScrewdriverIcon,
    title: 'General Repairs',
    description: 'General repairs and maintenance for homes and businesses. Quick, reliable service.',
    price: '$75-300'
  },
  {
    icon: HomeIcon,
    title: 'Home Maintenance',
    description: 'Regular home maintenance, inspections, and preventive care services.',
    price: '$100-500'
  },
  {
    icon: CogIcon,
    title: 'Installation Services',
    description: 'Furniture assembly, appliance installation, and fixture installation.',
    price: '$50-200'
  },
  {
    icon: PaintBrushIcon,
    title: 'Minor Repairs',
    description: 'Minor repairs, touch-ups, and small projects around the home.',
    price: '$50-150'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Safety Inspections',
    description: 'Home safety inspections, repairs, and preventive maintenance.',
    price: '$75-200'
  },
  {
    icon: SunIcon,
    title: 'Seasonal Maintenance',
    description: 'Seasonal maintenance, weather preparation, and home readiness.',
    price: '$100-400'
  }
]

const whyChooseUs = [
  {
    icon: MapPinIcon,
    title: 'Local Handyman Expertise',
    description: 'Jacksonville-based handymen who understand local building codes, climate challenges, and Florida requirements.'
  },
  {
    icon: ClockIcon,
    title: 'Flexible Scheduling',
    description: 'Flexible scheduling and timely project completion. We work around your schedule.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Licensed & Insured',
    description: 'All handymen are licensed, bonded, and insured. We carry full liability and workers compensation insurance.'
  },
  {
    icon: StarIcon,
    title: 'Top-Rated Service',
    description: 'Consistently high ratings and positive reviews from Jacksonville homeowners and businesses.'
  },
  {
    icon: CheckCircleIcon,
    title: 'Quality Workmanship',
    description: 'Attention to detail, quality materials, and professional work that lasts.'
  },
  {
    icon: UserGroupIcon,
    title: 'Experienced Team',
    description: 'Experienced handymen with 10+ years in the Jacksonville market and specialized training.'
  }
]

const localInsights = [
  'Jacksonville hurricane season preparation and storm-proofing',
  'Florida building code compliance and safety standards',
  'Coastal climate considerations for home maintenance',
  'Local permit requirements and inspection processes',
  'Popular Jacksonville neighborhoods and service areas',
  'Seasonal maintenance for Florida climate',
  'Energy efficiency improvements for Jacksonville homes',
  'Smart home maintenance and upgrades'
]

const commonServices = [
  {
    category: 'General Repairs',
    services: [
      'Drywall repair and patching',
      'Door and window repairs',
      'Cabinet and drawer repairs',
      'Furniture assembly and repair',
      'Appliance installation and repair',
      'Light fixture installation',
      'Plumbing fixture repairs',
      'Electrical fixture repairs'
    ]
  },
  {
    category: 'Home Maintenance',
    services: [
      'Gutter cleaning and repair',
      'Pressure washing services',
      'Deck and fence maintenance',
      'Roof inspection and minor repairs',
      'HVAC filter replacement',
      'Smoke detector installation',
      'Carbon monoxide detector installation',
      'Home safety inspections'
    ]
  },
  {
    category: 'Installation Services',
    services: [
      'Furniture assembly',
      'Appliance installation',
      'TV mounting and installation',
      'Shelving and storage installation',
      'Window treatments installation',
      'Ceiling fan installation',
      'Light fixture installation',
      'Security system installation'
    ]
  }
]

const faqs = [
  {
    question: 'How quickly can you respond to handyman service requests?',
    answer: 'We typically respond to handyman service requests within 24-48 hours in the Jacksonville area. For urgent repairs, we can often schedule same-day or next-day service depending on availability.'
  },
  {
    question: 'Do you offer emergency handyman services?',
    answer: 'Yes, we provide emergency handyman services for urgent repairs like water leaks, broken doors, security issues, and other critical home problems. Our emergency team is available for immediate response.'
  },
  {
    question: 'What areas of Jacksonville do you serve?',
    answer: 'We serve all of Jacksonville and surrounding areas including Jacksonville Beach, San Marco, Riverside, Arlington, Mandarin, Southside, Orange Park, Fleming Island, and Ponte Vedra Beach.'
  },
  {
    question: 'Are your handymen licensed and insured?',
    answer: 'Yes, all our handymen are licensed, bonded, and insured. We maintain proper licensing with the state of Florida and carry comprehensive liability and workers compensation insurance for your protection.'
  },
  {
    question: 'Do you offer free estimates for handyman work?',
    answer: 'Yes, we provide free estimates for most handyman services. Emergency calls may have a service fee, but estimates for planned work are always free. We also offer detailed written estimates for transparency.'
  },
  {
    question: 'What types of projects do you handle?',
    answer: 'We handle a wide range of projects from minor repairs and maintenance to installations and small renovations. This includes drywall repair, furniture assembly, appliance installation, door repairs, and much more.'
  },
  {
    question: 'Do you handle both residential and commercial work?',
    answer: 'Yes, we provide comprehensive handyman services for both residential and commercial properties. Our team is experienced in homes, offices, retail spaces, and other commercial facilities throughout Jacksonville.'
  },
  {
    question: 'How do you ensure quality workmanship?',
    answer: 'We use quality materials, follow proper installation procedures, and our handymen are experienced professionals. We also provide warranties on our work and always clean up after completing projects.'
  }
]

const maintenanceTips = [
  'Schedule regular home maintenance inspections every 6-12 months',
  'Keep gutters clean and free of debris to prevent water damage',
  'Test smoke detectors and carbon monoxide detectors monthly',
  'Inspect and repair weather stripping around doors and windows',
  'Maintain HVAC systems with regular filter changes',
  'Check for water leaks and address them promptly',
  'Keep emergency contact information readily available',
  'Document home maintenance and repairs for future reference'
]

export default function HandymanServicesPage() {
  const pagePath = '/services/handyman'
  const serviceName = 'Handyman Services'
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
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Handyman Services in{' '}
              <span className="text-primary-200">Jacksonville, FL</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              General repairs, maintenance, and home improvement projects. 
              Licensed, insured, and reliable handyman services for homes and businesses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/categories/handyman"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <WrenchScrewdriverIcon className="w-5 h-5 mr-2" />
                View All Handyman Providers
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Get Free Estimate
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center">
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                Licensed & Insured
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-2" />
                Flexible Scheduling
              </div>
              <div className="flex items-center">
                <StarIcon className="w-4 h-4 mr-2" />
                4.8★ Average Rating
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                Quality Workmanship
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
              Comprehensive Handyman Services
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From general repairs to home maintenance, our licensed Jacksonville handymen provide 
              professional, reliable services for homes and businesses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3>
                <p className="text-neutral-600 mb-4">{service.description}</p>
                <div className="text-primary-600 font-semibold">{service.price}</div>
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
              Why Choose Jacksonville Home Pros for Handyman Services?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We're not just another handyman company – we're your neighbors, committed to 
              providing the most reliable and professional handyman services in Jacksonville.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Services */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Handyman Services We Provide
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From general repairs to home maintenance, we handle all types 
              of handyman projects with expertise and precision.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {commonServices.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
                  <WrenchScrewdriverIcon className="w-6 h-6 text-primary-600 mr-3" />
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-neutral-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Market Insights */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Jacksonville-Specific Handyman Insights
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Jacksonville's unique climate and location present specific challenges for 
                home maintenance. Our local expertise ensures your home is prepared 
                for everything from hurricane season to the humid coastal climate.
              </p>
              
              <div className="space-y-4">
                {localInsights.map((insight, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Handyman Process
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Initial assessment and estimate</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Professional repair and maintenance</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Quality inspection and testing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Cleanup and final walkthrough</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary-600 text-white rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Free Estimates</span>
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <p className="text-sm mt-1">Call (904) 555-1234 for your free estimate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Tips */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Home Maintenance Tips for Jacksonville Homes
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Keep your home in top condition with these essential maintenance tips 
              from our licensed handymen.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {maintenanceTips.map((tip, index) => (
              <div key={index} className="flex items-start">
                <ShieldCheckIcon className="w-6 h-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                <span className="text-neutral-700">{tip}</span>
              </div>
            ))}
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
              Get answers to common questions about handyman services in Jacksonville
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
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Handyman Services in Jacksonville?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Connect with trusted, licensed handymen in your area. Get free estimates, 
            schedule appointments, and keep your home in top condition.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/categories/handyman"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <WrenchScrewdriverIcon className="w-5 h-5 mr-2" />
              View All Handyman Providers
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
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
