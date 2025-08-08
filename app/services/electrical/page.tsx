import type { Metadata } from 'next'
import { 
  BoltIcon,
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
  LightBulbIcon,
  CogIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Electrical Services Jacksonville FL | Licensed Electricians & Emergency Repairs',
  description: 'Professional electrical services in Jacksonville, FL. Licensed electricians for installations, repairs, and emergency electrical work. 24/7 emergency service, free estimates, and guaranteed workmanship.',
  keywords: [
    'electrical services Jacksonville FL',
    'licensed electrician Jacksonville',
    'emergency electrical repair Jacksonville',
    'electrical installation Jacksonville',
    'Jacksonville electrician',
    'electrical contractor Jacksonville',
    '24/7 electrician Jacksonville',
    'electrical panel upgrade Jacksonville',
    'electrical wiring Jacksonville',
    'light fixture installation Jacksonville',
    'electrical inspection Jacksonville',
    'commercial electrical Jacksonville'
  ],
  openGraph: {
    title: 'Electrical Services Jacksonville FL | Licensed Electricians & Emergency Repairs',
    description: 'Professional electrical services in Jacksonville, FL. Licensed electricians for installations, repairs, and emergency electrical work.',
    type: 'website',
  },
}

const services = [
  {
    icon: BoltIcon,
    title: 'Electrical Installation',
    description: 'New electrical installations for homes, businesses, and renovations. Licensed and code-compliant work.',
    price: '$200-1,500'
  },
  {
    icon: LightBulbIcon,
    title: 'Light Fixture Installation',
    description: 'Professional light fixture installation, ceiling fans, and electrical upgrades.',
    price: '$150-800'
  },
  {
    icon: CogIcon,
    title: 'Electrical Panel Upgrades',
    description: 'Electrical panel upgrades, service upgrades, and electrical system modernization.',
    price: '$1,500-4,000'
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Electrical Repairs',
    description: 'Electrical troubleshooting, repairs, and maintenance for all electrical systems.',
    price: '$100-500'
  },
  {
    icon: FireIcon,
    title: 'Emergency Electrical',
    description: '24/7 emergency electrical services for power outages, electrical fires, and urgent repairs.',
    price: '$200-800'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Electrical Inspections',
    description: 'Comprehensive electrical inspections, safety assessments, and code compliance checks.',
    price: '$75-200'
  }
]

const whyChooseUs = [
  {
    icon: MapPinIcon,
    title: 'Local Electrical Expertise',
    description: 'Jacksonville-based electricians who understand local building codes, hurricane requirements, and Florida electrical standards.'
  },
  {
    icon: ClockIcon,
    title: '24/7 Emergency Service',
    description: 'Emergency electrical services available around the clock for power outages, electrical fires, and urgent repairs.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Licensed & Insured',
    description: 'All electricians are licensed, bonded, and insured. We carry full liability and workers compensation insurance.'
  },
  {
    icon: StarIcon,
    title: 'Top-Rated Service',
    description: 'Consistently high ratings and positive reviews from Jacksonville homeowners and businesses.'
  },
  {
    icon: CheckCircleIcon,
    title: 'Code Compliant',
    description: 'All work meets or exceeds National Electrical Code (NEC) and Florida building code requirements.'
  },
  {
    icon: UserGroupIcon,
    title: 'Experienced Team',
    description: 'Experienced electricians with 10+ years in the Jacksonville market and specialized training.'
  }
]

const localInsights = [
  'Hurricane season electrical preparation and storm-proofing',
  'Florida building code compliance and electrical standards',
  'Coastal climate considerations for electrical systems',
  'Local permit requirements and inspection processes',
  'Popular Jacksonville neighborhoods and service areas',
  'Seasonal electrical maintenance for Florida homes',
  'Energy efficiency upgrades for Jacksonville climate',
  'Smart home electrical integration and automation'
]

const commonServices = [
  {
    category: 'Residential Electrical',
    services: [
      'Electrical panel upgrades and replacements',
      'Whole house rewiring and electrical updates',
      'Light fixture and ceiling fan installation',
      'Outlet and switch installation and repair',
      'Electrical troubleshooting and diagnostics',
      'Home automation and smart home wiring',
      'Generator installation and maintenance',
      'Electrical safety inspections'
    ]
  },
  {
    category: 'Commercial Electrical',
    services: [
      'Commercial electrical installations',
      'Office and retail electrical systems',
      'Industrial electrical maintenance',
      'Electrical system upgrades',
      'Emergency lighting installation',
      'Power distribution systems',
      'Electrical safety compliance',
      'Energy efficiency upgrades'
    ]
  },
  {
    category: 'Emergency Electrical',
    services: [
      'Power outage troubleshooting',
      'Electrical fire prevention and repair',
      'Emergency electrical repairs',
      'Storm damage electrical repair',
      'Electrical safety emergencies',
      'Generator emergency service',
      'Electrical system diagnostics',
      '24/7 emergency response'
    ]
  }
]

const faqs = [
  {
    question: 'How quickly can you respond to emergency electrical calls?',
    answer: 'We typically respond to emergency electrical calls within 1-2 hours in the Jacksonville area. For urgent situations like power outages or electrical fires, we prioritize immediate response and can often arrive within 30-60 minutes.'
  },
  {
    question: 'Do you offer 24/7 emergency electrical services?',
    answer: 'Yes, we provide 24/7 emergency electrical services for urgent repairs like power outages, electrical fires, and safety hazards. Our emergency team is always available to handle critical electrical issues.'
  },
  {
    question: 'What areas of Jacksonville do you serve?',
    answer: 'We serve all of Jacksonville and surrounding areas including Jacksonville Beach, San Marco, Riverside, Arlington, Mandarin, Southside, Orange Park, Fleming Island, and Ponte Vedra Beach.'
  },
  {
    question: 'Are your electricians licensed and insured?',
    answer: 'Yes, all our electricians are licensed, bonded, and insured. We maintain proper licensing with the state of Florida and carry comprehensive liability and workers compensation insurance for your protection.'
  },
  {
    question: 'Do you offer free estimates for electrical work?',
    answer: 'Yes, we provide free estimates for most electrical services. Emergency calls may have a service fee, but estimates for planned work are always free. We also offer detailed written estimates for transparency.'
  },
  {
    question: 'What electrical codes do you follow?',
    answer: 'We follow the National Electrical Code (NEC) and all Florida building codes. Our work meets or exceeds all local, state, and national electrical standards and requirements.'
  },
  {
    question: 'How do I know if I need an electrical panel upgrade?',
    answer: 'Signs you may need an electrical panel upgrade include: frequent circuit breaker trips, flickering lights, outdated fuse box, adding new appliances, or planning a major renovation. We can assess your current system and recommend upgrades.'
  },
  {
    question: 'Do you handle both residential and commercial electrical work?',
    answer: 'Yes, we provide comprehensive electrical services for both residential and commercial properties. Our team is experienced in homes, offices, retail spaces, and industrial facilities throughout Jacksonville.'
  }
]

const safetyTips = [
  'Never attempt electrical repairs yourself - always hire a licensed electrician',
  'Install GFCI outlets in bathrooms, kitchens, and outdoor areas',
  'Have your electrical system inspected every 3-5 years',
  'Replace outdated electrical panels and wiring',
  'Use surge protectors for valuable electronics',
  'Keep electrical cords away from water and heat sources',
  'Test smoke detectors monthly and replace batteries annually',
  'Have emergency lighting installed for power outages'
]

export default function ElectricalServicesPage() {
  const pagePath = '/services/electrical'
  const serviceName = 'Electrical Services'
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
              Professional Electrical Services in{' '}
              <span className="text-primary-200">Jacksonville, FL</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Licensed electricians for installations, repairs, and emergency electrical work. 
              24/7 emergency service, free estimates, and guaranteed workmanship.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/categories/electrical"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <BoltIcon className="w-5 h-5 mr-2" />
                View All Electrical Providers
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
                Code Compliant
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
              Comprehensive Electrical Services
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From new installations to emergency repairs, our licensed Jacksonville electricians provide 
              professional, reliable electrical services for homes and businesses.
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
              Why Choose Jacksonville Home Pros for Electrical Services?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We're not just another electrical company – we're your neighbors, committed to 
              providing the safest and most reliable electrical services in Jacksonville.
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
              Electrical Services We Provide
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From residential electrical work to commercial installations, we handle all types 
              of electrical projects with expertise and precision.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {commonServices.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
                  <BoltIcon className="w-6 h-6 text-primary-600 mr-3" />
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
                Jacksonville-Specific Electrical Insights
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Jacksonville's unique climate and location present specific challenges for 
                electrical systems. Our local expertise ensures your electrical system is prepared 
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
                Emergency Electrical Services
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-neutral-700">Power outages and electrical failures</span>
                </div>
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-neutral-700">Electrical fires and safety hazards</span>
                </div>
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-neutral-700">Storm damage electrical repair</span>
                </div>
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-neutral-700">Electrical system diagnostics</span>
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

      {/* Safety Tips */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Electrical Safety Tips for Jacksonville Homes
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Keep your home and family safe with these essential electrical safety tips 
              from our licensed electricians.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {safetyTips.map((tip, index) => (
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
              Get answers to common questions about electrical services in Jacksonville
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
            Need Electrical Services in Jacksonville?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Connect with trusted, licensed electricians in your area. Get quotes, 
            schedule appointments, and ensure your electrical system is safe and up to code.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/categories/electrical"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <BoltIcon className="w-5 h-5 mr-2" />
              View All Electrical Providers
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
