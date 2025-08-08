import type { Metadata } from 'next'
import { 
  PaintBrushIcon,
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
  WrenchScrewdriverIcon,
  CogIcon,
  FireIcon,
  SunIcon,
  BoltIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Painting Services Jacksonville FL | Interior & Exterior Painting',
  description: 'Professional painting services in Jacksonville, FL. Interior and exterior painting, color consultation, and commercial painting. Free estimates, quality workmanship, and guaranteed satisfaction.',
  keywords: [
    'painting services Jacksonville FL',
    'interior painting Jacksonville',
    'exterior painting Jacksonville',
    'house painting Jacksonville',
    'Jacksonville painter',
    'commercial painting Jacksonville',
    'residential painting Jacksonville',
    'color consultation Jacksonville',
    'paint contractor Jacksonville',
    'exterior house painting Jacksonville',
    'interior house painting Jacksonville',
    'cabinet painting Jacksonville'
  ],
  openGraph: {
    title: 'Painting Services Jacksonville FL | Interior & Exterior Painting',
    description: 'Professional painting services in Jacksonville, FL. Interior and exterior painting, color consultation, and commercial painting.',
    type: 'website',
  },
}

const services = [
  {
    icon: HomeIcon,
    title: 'Interior Painting',
    description: 'Professional interior painting for homes, offices, and commercial spaces. Quality finishes and attention to detail.',
    price: '$1,500-8,000'
  },
  {
    icon: SunIcon,
    title: 'Exterior Painting',
    description: 'Exterior house painting, commercial buildings, and weather-resistant coatings for Jacksonville climate.',
    price: '$3,000-15,000'
  },
  {
    icon: PaintBrushIcon,
    title: 'Color Consultation',
    description: 'Professional color consultation and design services to help you choose the perfect colors.',
    price: '$100-300'
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Cabinet Painting',
    description: 'Kitchen and bathroom cabinet painting, refinishing, and restoration services.',
    price: '$800-3,500'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Commercial Painting',
    description: 'Commercial painting services for offices, retail spaces, and industrial facilities.',
    price: '$5,000-25,000'
  },
  {
    icon: CogIcon,
    title: 'Paint Touch-ups',
    description: 'Paint touch-ups, repairs, and small painting projects for maintenance and updates.',
    price: '$100-500'
  }
]

const whyChooseUs = [
  {
    icon: MapPinIcon,
    title: 'Local Painting Expertise',
    description: 'Jacksonville-based painters who understand local climate challenges, humidity control, and Florida building requirements.'
  },
  {
    icon: ClockIcon,
    title: 'Reliable Scheduling',
    description: 'Flexible scheduling and timely project completion. We respect your time and property.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Licensed & Insured',
    description: 'All painters are licensed, bonded, and insured. We carry full liability and workers compensation insurance.'
  },
  {
    icon: StarIcon,
    title: 'Top-Rated Service',
    description: 'Consistently high ratings and positive reviews from Jacksonville homeowners and businesses.'
  },
  {
    icon: CheckCircleIcon,
    title: 'Quality Workmanship',
    description: 'Attention to detail, quality materials, and professional finishes that last.'
  },
  {
    icon: UserGroupIcon,
    title: 'Experienced Team',
    description: 'Experienced painters with 10+ years in the Jacksonville market and specialized training.'
  }
]

const localInsights = [
  'Jacksonville humidity considerations for paint selection',
  'Hurricane season preparation and weather-resistant coatings',
  'Florida building code compliance and paint standards',
  'Coastal climate considerations for exterior painting',
  'Local permit requirements and inspection processes',
  'Popular Jacksonville neighborhoods and color trends',
  'Seasonal painting considerations for Florida climate',
  'Energy-efficient paint options for Jacksonville homes'
]

const commonServices = [
  {
    category: 'Residential Painting',
    services: [
      'Interior wall and ceiling painting',
      'Exterior house painting',
      'Kitchen and bathroom painting',
      'Bedroom and living room painting',
      'Cabinet painting and refinishing',
      'Trim and molding painting',
      'Deck and fence painting',
      'Garage and basement painting'
    ]
  },
  {
    category: 'Commercial Painting',
    services: [
      'Office building painting',
      'Retail space painting',
      'Industrial facility painting',
      'Restaurant and hospitality painting',
      'Warehouse painting',
      'Medical facility painting',
      'Educational facility painting',
      'Government building painting'
    ]
  },
  {
    category: 'Specialty Painting',
    services: [
      'Color consultation and design',
      'Faux finishing and textures',
      'Epoxy floor coatings',
      'Stucco painting and repair',
      'Metal surface painting',
      'Concrete painting and staining',
      'Wallpaper removal',
      'Paint touch-ups and repairs'
    ]
  }
]

const faqs = [
  {
    question: 'How long does a typical painting project take?',
    answer: 'Project duration depends on the size and scope. A typical interior room takes 1-2 days, while a full house exterior can take 3-7 days. We provide detailed timelines during the estimate process and always communicate any schedule changes.'
  },
  {
    question: 'Do you offer free estimates for painting projects?',
    answer: 'Yes, we provide free, detailed estimates for all painting projects. Our estimates include material costs, labor, timeline, and any additional services needed. We also offer color consultation as part of our estimate process.'
  },
  {
    question: 'What areas of Jacksonville do you serve?',
    answer: 'We serve all of Jacksonville and surrounding areas including Jacksonville Beach, San Marco, Riverside, Arlington, Mandarin, Southside, Orange Park, Fleming Island, and Ponte Vedra Beach.'
  },
  {
    question: 'Are your painters licensed and insured?',
    answer: 'Yes, all our painters are licensed, bonded, and insured. We maintain proper licensing with the state of Florida and carry comprehensive liability and workers compensation insurance for your protection.'
  },
  {
    question: 'What type of paint do you use?',
    answer: 'We use high-quality, name-brand paints that are appropriate for the specific project and Jacksonville climate. We can work with your preferred paint brand or recommend the best options for your project.'
  },
  {
    question: 'Do you handle both interior and exterior painting?',
    answer: 'Yes, we provide comprehensive painting services for both interior and exterior projects. Our team is experienced in all types of painting projects from residential homes to commercial buildings.'
  },
  {
    question: 'How do you prepare surfaces before painting?',
    answer: 'Proper surface preparation is crucial for quality results. We clean surfaces, repair any damage, sand rough areas, prime when necessary, and ensure all surfaces are properly prepared before painting begins.'
  },
  {
    question: 'Do you offer color consultation services?',
    answer: 'Yes, we offer professional color consultation services. Our experienced team can help you choose the perfect colors for your space, considering lighting, architecture, and your personal style preferences.'
  }
]

const paintingTips = [
  'Choose paint colors that complement your home\'s architecture and surroundings',
  'Consider Jacksonville\'s humidity when selecting paint finishes',
  'Use high-quality paint for better durability and coverage',
  'Plan painting projects during dry weather for exterior work',
  'Test paint colors on small areas before committing',
  'Consider energy-efficient paint options for better insulation',
  'Maintain painted surfaces with regular cleaning and touch-ups',
  'Keep paint cans for future touch-ups and color matching'
]

export default function PaintingServicesPage() {
  const pagePath = '/services/painting'
  const serviceName = 'Painting Services'
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
              Professional Painting Services in{' '}
              <span className="text-primary-200">Jacksonville, FL</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Interior and exterior painting, color consultation, and commercial painting. 
              Free estimates, quality workmanship, and guaranteed satisfaction.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/categories/painting"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <PaintBrushIcon className="w-5 h-5 mr-2" />
                View All Painting Providers
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
                Free Estimates
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
              Comprehensive Painting Services
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From interior painting to exterior house painting, our licensed Jacksonville painters provide 
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
              Why Choose Jacksonville Home Pros for Painting Services?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We're not just another painting company – we're your neighbors, committed to 
              providing the highest quality painting services in Jacksonville.
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
              Painting Services We Provide
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From residential painting to commercial projects, we handle all types 
              of painting projects with expertise and precision.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {commonServices.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
                  <PaintBrushIcon className="w-6 h-6 text-primary-600 mr-3" />
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
                Jacksonville-Specific Painting Insights
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Jacksonville's unique climate and location present specific challenges for 
                painting projects. Our local expertise ensures your paint job is prepared 
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
                Painting Process
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Surface preparation and cleaning</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Repair and priming</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Quality paint application</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Final inspection and cleanup</span>
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

      {/* Painting Tips */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Painting Tips for Jacksonville Homes
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Get the most out of your painting project with these essential tips 
              from our licensed painters.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {paintingTips.map((tip, index) => (
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
              Get answers to common questions about painting services in Jacksonville
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
            Need Painting Services in Jacksonville?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Connect with trusted, licensed painters in your area. Get free estimates, 
            schedule appointments, and transform your space with quality painting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/categories/painting"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <PaintBrushIcon className="w-5 h-5 mr-2" />
              View All Painting Providers
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
