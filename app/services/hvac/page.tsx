import type { Metadata } from 'next'
import { 
  SunIcon,
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
  CloudIcon,
  BoltIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'HVAC Services Jacksonville FL | Air Conditioning & Heating Repair',
  description: 'Professional HVAC services in Jacksonville, FL. Air conditioning repair, heating installation, and HVAC maintenance. 24/7 emergency service, free estimates, and energy-efficient solutions.',
  keywords: [
    'HVAC services Jacksonville FL',
    'air conditioning repair Jacksonville',
    'heating and cooling Jacksonville',
    'HVAC installation Jacksonville',
    'Jacksonville HVAC contractor',
    'AC repair Jacksonville',
    'heating repair Jacksonville',
    '24/7 HVAC service Jacksonville',
    'HVAC maintenance Jacksonville',
    'air conditioning installation Jacksonville',
    'HVAC inspection Jacksonville',
    'commercial HVAC Jacksonville'
  ],
  openGraph: {
    title: 'HVAC Services Jacksonville FL | Air Conditioning & Heating Repair',
    description: 'Professional HVAC services in Jacksonville, FL. Air conditioning repair, heating installation, and HVAC maintenance.',
    type: 'website',
  },
}

const services = [
  {
    icon: CloudIcon,
    title: 'Air Conditioning Repair',
    description: 'Professional AC repair and troubleshooting for all makes and models. Fast, reliable service.',
    price: '$150-800'
  },
  {
    icon: FireIcon,
    title: 'Heating System Repair',
    description: 'Heating system repair, maintenance, and installation for furnaces, heat pumps, and boilers.',
    price: '$200-1,200'
  },
  {
    icon: HomeIcon,
    title: 'HVAC Installation',
    description: 'Complete HVAC system installation for homes and businesses. Energy-efficient solutions.',
    price: '$3,000-15,000'
  },
  {
    icon: CogIcon,
    title: 'HVAC Maintenance',
    description: 'Preventive maintenance, tune-ups, and system optimization for peak performance.',
    price: '$75-200'
  },
  {
    icon: ExclamationTriangleIcon,
    title: 'Emergency HVAC Service',
    description: '24/7 emergency HVAC services for AC failures, heating emergencies, and urgent repairs.',
    price: '$200-1,000'
  },
  {
    icon: ShieldCheckIcon,
    title: 'HVAC Inspections',
    description: 'Comprehensive HVAC inspections, efficiency assessments, and system diagnostics.',
    price: '$100-300'
  }
]

const whyChooseUs = [
  {
    icon: MapPinIcon,
    title: 'Local HVAC Expertise',
    description: 'Jacksonville-based HVAC technicians who understand local climate challenges, humidity control, and Florida building codes.'
  },
  {
    icon: ClockIcon,
    title: '24/7 Emergency Service',
    description: 'Emergency HVAC services available around the clock for AC failures, heating emergencies, and urgent repairs.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Licensed & Insured',
    description: 'All HVAC technicians are licensed, bonded, and insured. We carry full liability and workers compensation insurance.'
  },
  {
    icon: StarIcon,
    title: 'Top-Rated Service',
    description: 'Consistently high ratings and positive reviews from Jacksonville homeowners and businesses.'
  },
  {
    icon: CheckCircleIcon,
    title: 'Energy Efficient',
    description: 'Specialized in energy-efficient HVAC solutions that save money and reduce environmental impact.'
  },
  {
    icon: UserGroupIcon,
    title: 'Experienced Team',
    description: 'Experienced HVAC technicians with 10+ years in the Jacksonville market and specialized training.'
  }
]

const localInsights = [
  'Jacksonville humidity control and moisture management',
  'Hurricane season HVAC preparation and storm-proofing',
  'Florida building code compliance and HVAC standards',
  'Coastal climate considerations for HVAC systems',
  'Local permit requirements and inspection processes',
  'Popular Jacksonville neighborhoods and service areas',
  'Seasonal HVAC maintenance for Florida climate',
  'Energy efficiency upgrades for Jacksonville homes'
]

const commonServices = [
  {
    category: 'Air Conditioning',
    services: [
      'AC repair and troubleshooting',
      'Air conditioning installation',
      'AC maintenance and tune-ups',
      'Refrigerant leak detection and repair',
      'Duct cleaning and sealing',
      'Air quality improvement',
      'Smart thermostat installation',
      'AC efficiency optimization'
    ]
  },
  {
    category: 'Heating Systems',
    services: [
      'Furnace repair and installation',
      'Heat pump maintenance',
      'Boiler repair and replacement',
      'Heating system upgrades',
      'Emergency heating repair',
      'Heating efficiency improvements',
      'Thermostat installation',
      'Heating system inspections'
    ]
  },
  {
    category: 'HVAC Maintenance',
    services: [
      'Preventive maintenance programs',
      'Seasonal HVAC tune-ups',
      'System performance optimization',
      'Energy efficiency assessments',
      'HVAC system diagnostics',
      'Filter replacement services',
      'Ductwork inspection and repair',
      'Indoor air quality testing'
    ]
  }
]

const faqs = [
  {
    question: 'How quickly can you respond to emergency HVAC calls?',
    answer: 'We typically respond to emergency HVAC calls within 1-2 hours in the Jacksonville area. For urgent situations like AC failures during hot weather or heating emergencies in cold weather, we prioritize immediate response and can often arrive within 30-60 minutes.'
  },
  {
    question: 'Do you offer 24/7 emergency HVAC services?',
    answer: 'Yes, we provide 24/7 emergency HVAC services for urgent repairs like AC failures, heating emergencies, and system breakdowns. Our emergency team is always available to handle critical HVAC issues.'
  },
  {
    question: 'What areas of Jacksonville do you serve?',
    answer: 'We serve all of Jacksonville and surrounding areas including Jacksonville Beach, San Marco, Riverside, Arlington, Mandarin, Southside, Orange Park, Fleming Island, and Ponte Vedra Beach.'
  },
  {
    question: 'Are your HVAC technicians licensed and insured?',
    answer: 'Yes, all our HVAC technicians are licensed, bonded, and insured. We maintain proper licensing with the state of Florida and carry comprehensive liability and workers compensation insurance for your protection.'
  },
  {
    question: 'Do you offer free estimates for HVAC work?',
    answer: 'Yes, we provide free estimates for most HVAC services. Emergency calls may have a service fee, but estimates for planned work are always free. We also offer detailed written estimates for transparency.'
  },
  {
    question: 'How often should I have my HVAC system maintained?',
    answer: 'We recommend having your HVAC system maintained twice per year - once in the spring before AC season and once in the fall before heating season. This ensures optimal performance and helps prevent costly breakdowns.'
  },
  {
    question: 'What are the signs that my HVAC system needs repair?',
    answer: 'Common signs include: unusual noises, poor airflow, inconsistent temperatures, high energy bills, frequent cycling, and strange odors. If you notice any of these issues, contact us for a professional assessment.'
  },
  {
    question: 'Do you handle both residential and commercial HVAC work?',
    answer: 'Yes, we provide comprehensive HVAC services for both residential and commercial properties. Our team is experienced in homes, offices, retail spaces, and industrial facilities throughout Jacksonville.'
  }
]

const maintenanceTips = [
  'Change air filters every 1-3 months for optimal performance',
  'Schedule annual HVAC maintenance in spring and fall',
  'Keep outdoor units clear of debris and vegetation',
  'Check thermostat settings and programming regularly',
  'Clean air ducts every 3-5 years',
  'Monitor energy bills for unusual increases',
  'Test your HVAC system before extreme weather',
  'Consider upgrading to energy-efficient systems'
]

export default function HVACServicesPage() {
  const pagePath = '/services/hvac'
  const serviceName = 'HVAC Services'
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
              Professional HVAC Services in{' '}
              <span className="text-primary-200">Jacksonville, FL</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Air conditioning repair, heating installation, and HVAC maintenance. 
              24/7 emergency service, free estimates, and energy-efficient solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/categories/hvac"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <CloudIcon className="w-5 h-5 mr-2" />
                View All HVAC Providers
              </Link>
              <Link 
                href="tel:+19045551234"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
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
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                Energy Efficient
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
              Comprehensive HVAC Services
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From air conditioning repair to heating installation, our licensed Jacksonville HVAC technicians provide 
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
              Why Choose Jacksonville Home Pros for HVAC Services?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We're not just another HVAC company – we're your neighbors, committed to 
              providing the most reliable and efficient HVAC services in Jacksonville.
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
              HVAC Services We Provide
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From air conditioning repair to heating system maintenance, we handle all types 
              of HVAC projects with expertise and precision.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {commonServices.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
                  <CloudIcon className="w-6 h-6 text-primary-600 mr-3" />
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
                Jacksonville-Specific HVAC Insights
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Jacksonville's unique climate and location present specific challenges for 
                HVAC systems. Our local expertise ensures your HVAC system is prepared 
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
                Emergency HVAC Services
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-neutral-700">AC failures and cooling emergencies</span>
                </div>
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-neutral-700">Heating system breakdowns</span>
                </div>
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-neutral-700">Refrigerant leaks and system failures</span>
                </div>
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-neutral-700">HVAC system diagnostics</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary-600 text-white rounded-lg">
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

      {/* Maintenance Tips */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              HVAC Maintenance Tips for Jacksonville Homes
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Keep your HVAC system running efficiently with these essential maintenance tips 
              from our licensed HVAC technicians.
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
              Get answers to common questions about HVAC services in Jacksonville
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
            Need HVAC Services in Jacksonville?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Connect with trusted, licensed HVAC technicians in your area. Get quotes, 
            schedule appointments, and ensure your HVAC system is running efficiently.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/categories/hvac"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <CloudIcon className="w-5 h-5 mr-2" />
              View All HVAC Providers
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
