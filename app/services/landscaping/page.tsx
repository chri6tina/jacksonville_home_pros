import type { Metadata } from 'next'
import {
  SunIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  CheckCircleIcon,
  TruckIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Landscaping Services Jacksonville FL | Lawn Care, Design & Maintenance',
  description: 'Expert landscaping services in Jacksonville, FL. Lawn care, landscape design, irrigation, tree trimming, and hardscaping. Free estimates and licensed professionals.',
  keywords: [
    'landscaping services Jacksonville FL',
    'lawn care Jacksonville',
    'landscape design Jacksonville',
    'irrigation Jacksonville',
    'tree trimming Jacksonville',
    'hardscaping Jacksonville',
    'yard maintenance Jacksonville',
    'sod installation Jacksonville',
    'mulch installation Jacksonville',
    'landscaper Jacksonville'
  ],
  openGraph: {
    title: 'Landscaping Services Jacksonville FL | Lawn Care, Design & Maintenance',
    description: 'Expert landscaping services in Jacksonville, FL. Lawn care, landscape design, irrigation, tree trimming, and hardscaping.',
    type: 'website',
  },
}

const services = [
  {
    icon: SunIcon,
    title: 'Lawn Care & Maintenance',
    description: 'Mowing, edging, fertilization, weed control, and seasonal lawn treatments.',
    price: '$50-250/visit'
  },
  {
    icon: SparklesIcon,
    title: 'Landscape Design',
    description: 'Custom landscape design, plant selection, and installation tailored to your property.',
    price: '$1,000-8,000+'
  },
  {
    icon: TruckIcon,
    title: 'Irrigation Systems',
    description: 'Irrigation installation, repair, smart controllers, and water efficiency improvements.',
    price: '$500-4,000'
  },
  {
    icon: HomeIcon,
    title: 'Hardscaping',
    description: 'Pavers, walkways, patios, fire pits, retaining walls, and outdoor living spaces.',
    price: '$1,500-15,000+'
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Tree & Shrub Care',
    description: 'Tree trimming, pruning, removal, stump grinding, and shrub maintenance.',
    price: '$150-2,500'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Storm Cleanup',
    description: 'Debris removal, yard cleanup, and property restoration after storms.',
    price: '$200-1,500'
  },
]

const whyChooseUs = [
  {
    icon: MapPinIcon,
    title: 'Local Landscaping Expertise',
    description: 'We understand Jacksonville soils, heat, humidity, and coastal conditions for long-lasting landscapes.'
  },
  {
    icon: ClockIcon,
    title: 'Reliable Scheduling',
    description: 'On-time service windows and dependable maintenance schedules to keep your yard looking great.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Licensed & Insured',
    description: 'All crews are licensed and insured. We follow safety best practices for equipment and chemicals.'
  },
  {
    icon: StarIcon,
    title: 'Top-Rated Pros',
    description: 'Trusted by Jacksonville homeowners with excellent ratings and verified reviews.'
  },
  {
    icon: CheckCircleIcon,
    title: 'Quality Workmanship',
    description: 'We use quality materials, professional equipment, and proven methods for durable results.'
  },
  {
    icon: TruckIcon,
    title: 'Full-Service Teams',
    description: 'From design to maintenance, irrigation to hardscapes—one team handles it all.'
  },
]

const categories = [
  {
    category: 'Maintenance & Care',
    items: [
      'Weekly/bi-weekly lawn service',
      'Fertilization and weed control',
      'Mulch and pine straw installation',
      'Seasonal cleanup and leaf removal',
      'Aeration and overseeding'
    ]
  },
  {
    category: 'Design & Build',
    items: [
      'Landscape planning and renderings',
      'Sod installation and grading',
      'Planting beds and edging',
      'Paver walkways and patios',
      'Outdoor lighting'
    ]
  },
  {
    category: 'Irrigation & Trees',
    items: [
      'Sprinkler installation and repair',
      'Smart controller setup',
      'Tree trimming and pruning',
      'Stump grinding and removal',
      'Storm cleanup'
    ]
  },
]

const faqs = [
  {
    question: 'How often should I schedule lawn maintenance in Jacksonville?',
    answer: 'Most lawns benefit from weekly or bi-weekly service during growing season, and monthly service in cooler months. We tailor schedules to your yard and goals.'
  },
  {
    question: 'Do you offer free estimates for landscaping projects?',
    answer: 'Yes. We provide free estimates for maintenance and projects. Design work may include a design fee that is credited if you proceed.'
  },
  {
    question: 'What areas do you serve?',
    answer: 'All of Jacksonville and surrounding areas, including Jacksonville Beach, San Marco, Riverside, Arlington, Mandarin, Southside, Orange Park, Fleming Island, and Ponte Vedra Beach.'
  },
  {
    question: 'Can you help with drought-tolerant or low-maintenance designs?',
    answer: 'Absolutely. We recommend region-appropriate plants, efficient irrigation, and low-maintenance layouts that thrive in Jacksonville’s climate.'
  },
]

const tips = [
  'Water deeply 2-3 times per week rather than daily surface watering',
  'Mow with sharp blades and vary mowing patterns to protect turf',
  'Use mulch to retain moisture and suppress weeds',
  'Schedule seasonal cleanup before hurricane season',
  'Install smart irrigation controllers to save water and money'
]

export default function LandscapingServicesPage() {
  const pagePath = '/services/landscaping'
  const serviceName = 'Landscaping Services'
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
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Expert Landscaping Services in <span className="text-primary-200">Jacksonville, FL</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Lawn care, landscape design, irrigation, hardscaping, and tree care from trusted local pros. Free estimates and reliable scheduling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/landscaping" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
              <SunIcon className="w-5 h-5 mr-2" />
              View All Landscaping Providers
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Landscaping Services</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">From weekly lawn care to full landscape design-build, our Jacksonville landscaping pros deliver quality results that last.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local knowledge, professional crews, and consistent results for Jacksonville yards and outdoor spaces.</p>
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

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
                  <WrenchScrewdriverIcon className="w-6 h-6 text-primary-600 mr-3" />
                  {cat.category}
                </h3>
                <ul className="space-y-3">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start">
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

      {/* Local Tips */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Jacksonville Landscaping Tips</h2>
            <p className="text-lg text-neutral-600">Keep your landscape healthy and hurricane-ready with these local best practices.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start">
                <ShieldCheckIcon className="w-6 h-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                <span className="text-neutral-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-neutral-600">Answers to common landscaping questions for Jacksonville homeowners.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Upgrade Your Yard?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville landscaping pros for design, lawn care, and maintenance.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/landscaping" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
              <SunIcon className="w-5 h-5 mr-2" />
              View All Landscaping Providers
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
