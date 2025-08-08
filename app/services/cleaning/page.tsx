import type { Metadata } from 'next'
import {
  SparklesIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon,
  HomeIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Cleaning Services Jacksonville FL | House Cleaning & Deep Cleaning',
  description: 'Professional cleaning services in Jacksonville, FL. House cleaning, deep cleaning, move-in/out cleaning, and office cleaning. Licensed, insured, and trusted cleaners.',
  keywords: [
    'cleaning services Jacksonville FL',
    'house cleaning Jacksonville',
    'deep cleaning Jacksonville',
    'move out cleaning Jacksonville',
    'maid service Jacksonville',
    'office cleaning Jacksonville',
    'apartment cleaning Jacksonville',
    'cleaners Jacksonville'
  ],
  openGraph: {
    title: 'Cleaning Services Jacksonville FL | House Cleaning & Deep Cleaning',
    description: 'Professional house cleaning, deep cleaning, and office cleaning services in Jacksonville, FL.',
    type: 'website',
  },
}

const services = [
  { icon: SparklesIcon, title: 'Standard House Cleaning', description: 'Recurring weekly, bi-weekly, or monthly cleaning to keep your home fresh and tidy.', price: '$100-250' },
  { icon: CheckCircleIcon, title: 'Deep Cleaning', description: 'Extensive top-to-bottom cleaning including baseboards, appliances, and detailed sanitizing.', price: '$200-500' },
  { icon: HomeIcon, title: 'Move-In/Move-Out', description: 'Complete move cleaning including cabinets, inside appliances, and rental-ready finishes.', price: '$200-600' },
  { icon: WrenchScrewdriverIcon, title: 'Post-Construction', description: 'Dust removal, debris cleanup, and detailed finish cleaning after renovations.', price: '$250-800' },
  { icon: ShieldCheckIcon, title: 'Office & Commercial', description: 'Office cleaning, common areas, restrooms, and nightly or weekly service options.', price: '$150-1,200' },
  { icon: StarIcon, title: 'Airbnb/Turnover', description: 'Short-term rental cleaning, linen service, and restocking for fast turnovers.', price: '$120-300' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local & Trusted', description: 'Jacksonville-based cleaners with background checks and strong local references.' },
  { icon: ClockIcon, title: 'Flexible Scheduling', description: 'Easy online booking, reminders, and on-time arrival windows for convenience.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Fully insured teams with careful handling of your home and belongings.' },
  { icon: StarIcon, title: 'Consistent Quality', description: 'Checklists, training, and QA for reliable, high-quality cleaning every visit.' },
  { icon: CheckCircleIcon, title: 'Supplies Provided', description: 'Eco-friendly supplies and equipment included—or we can use yours by request.' },
  { icon: HomeIcon, title: 'Customizable Plans', description: 'Tailored cleaning plans for families, pets, allergies, and special requests.' },
]

const checklists = [
  {
    category: 'Standard Cleaning',
    items: [
      'Kitchen counters, appliances exterior, sinks, and floors',
      'Bathrooms: toilets, showers, mirrors, counters, and floors',
      'Dusting surfaces, furniture, and blinds',
      'Vacuuming carpets and mopping hard floors',
      'Bedroom bed-making and trash removal'
    ]
  },
  {
    category: 'Deep Cleaning',
    items: [
      'Baseboards, doors, and trim',
      'Inside oven and refrigerator (on request)',
      'Cabinet fronts and high-touch surfaces',
      'Tile grout scrubbing and detailed descaling',
      'Light fixtures and vents'
    ]
  },
  {
    category: 'Move-In/Move-Out',
    items: [
      'Inside cabinets and drawers',
      'Appliance interiors and exteriors',
      'Closets, shelves, and storage areas',
      'Wall spot-cleaning where applicable',
      'Garage sweep and porch cleaning'
    ]
  }
]

const faqs = [
  { question: 'Do I need to be home during the cleaning?', answer: 'No. Many clients provide access codes or keys. We can clean while you are away and lock up when finished.' },
  { question: 'Do you bring your own supplies?', answer: 'Yes. We provide all standard cleaning supplies and equipment. We can also use specific products upon request.' },
  { question: 'How long does a deep clean take?', answer: 'Typically 3-6 hours depending on home size and condition. We provide time estimates during booking.' },
  { question: 'Are your cleaners insured and background checked?', answer: 'Yes. All team members undergo background checks and are covered by liability insurance and worker protections.' },
]

export default function CleaningServicesPage() {
  const pagePath = '/services/cleaning'
  const serviceName = 'Cleaning Services'
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

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Professional Cleaning Services in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">House cleaning, deep cleaning, move-out cleaning, and office cleaning—handled by trusted, local professionals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/cleaning" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
              <SparklesIcon className="w-5 h-5 mr-2" />
              View All Cleaning Providers
            </Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105">
              <PhoneIcon className="w-5 h-5 mr-2" />
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Cleaning Services</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">Flexible, reliable cleaning for homes, apartments, offices, and rentals—customized to your needs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center">
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">Trusted local cleaners, flexible scheduling, and consistent quality—every time.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
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

      {/* Checklists */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {checklists.map((check, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
                  <SparklesIcon className="w-6 h-6 text-primary-600 mr-3" />
                  {check.category}
                </h3>
                <ul className="space-y-3">
                  {check.items.map((item, j) => (
                    <li key={j} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-neutral-600">Common questions about cleaning services in Jacksonville.</p>
          </div>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3>
                <p className="text-neutral-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Cleaning Services in Jacksonville?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted, licensed cleaners and get a spotless home—on your schedule.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/cleaning" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
              <SparklesIcon className="w-5 h-5 mr-2" />
              View All Cleaning Providers
            </Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105">
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
