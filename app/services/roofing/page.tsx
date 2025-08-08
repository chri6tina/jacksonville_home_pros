import type { Metadata } from 'next'
import {
  HomeIcon,
  BoltIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Roofing Services Jacksonville FL | Roof Repair & Replacement',
  description: 'Professional roofing services in Jacksonville, FL. Roof repair, replacement, inspections, and storm damage repair. Licensed, insured, and reliable roofers.',
  keywords: [
    'roofing services Jacksonville FL',
    'roof repair Jacksonville',
    'roof replacement Jacksonville',
    'roof inspection Jacksonville',
    'storm damage roof repair Jacksonville',
    'shingle roof Jacksonville',
    'metal roof Jacksonville',
    'roof leak repair Jacksonville'
  ],
  openGraph: {
    title: 'Roofing Services Jacksonville FL | Roof Repair & Replacement',
    description: 'Professional roof repair, replacement, and storm damage services in Jacksonville, FL.',
    type: 'website',
  },
}

const services = [
  { icon: WrenchScrewdriverIcon, title: 'Roof Repair', description: 'Leak repair, shingle replacement, flashing repair, and emergency fixes.', price: '$250-2,000' },
  { icon: HomeIcon, title: 'Roof Replacement', description: 'Full roof replacement including tear-off, underlayment, and new materials.', price: '$6,000-18,000+' },
  { icon: ShieldCheckIcon, title: 'Roof Inspections', description: 'Comprehensive inspections for insurance, real estate, and maintenance.', price: '$150-350' },
  { icon: BoltIcon, title: 'Storm Damage', description: 'Hail, wind, and hurricane damage assessment and repair with insurance coordination.', price: '$500-10,000+' },
  { icon: CheckCircleIcon, title: 'Gutters & Ventilation', description: 'Gutter installation, guards, and attic ventilation improvements.', price: '$300-2,500' },
  { icon: WrenchScrewdriverIcon, title: 'Maintenance', description: 'Preventive maintenance, sealing, caulking, and seasonal tune-ups.', price: '$150-600' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Roofing Pros', description: 'Experience with Jacksonville’s coastal climate, hurricane season, and local codes.' },
  { icon: ClockIcon, title: 'Fast Emergency Response', description: 'Rapid tarping and emergency repairs to prevent water intrusion and damage.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Fully licensed, insured, and compliant with Florida building requirements.' },
  { icon: StarIcon, title: 'Top-Rated Service', description: 'Excellent ratings and verified reviews from homeowners across Jacksonville.' },
  { icon: CheckCircleIcon, title: 'Quality Materials', description: 'We use proven roofing systems from trusted manufacturers with strong warranties.' },
  { icon: ExclamationTriangleIcon, title: 'Insurance Help', description: 'Assistance with claims documentation, photos, and coordination with adjusters.' },
]

const systems = [
  {
    category: 'Roofing Systems',
    items: [
      'Asphalt shingle roofs',
      'Metal roofing systems',
      'Tile roofs and underlayment',
      'Flat roofs (TPO, EPDM, Modified Bitumen)',
      'Skylights and roof penetrations'
    ]
  },
  {
    category: 'Protection & Upgrades',
    items: [
      'Hurricane straps and wind mitigation',
      'Ice & water shield and underlayments',
      'Ridge vents and attic ventilation',
      'Gutter systems and guards',
      'Solar fan installation'
    ]
  }
]

const faqs = [
  { question: 'How long does a roof replacement take?', answer: 'Most residential roof replacements take 1-3 days depending on size, materials, and weather. We provide a clear schedule and daily cleanup.' },
  { question: 'Do you offer emergency roof repairs?', answer: 'Yes. We provide 24/7 emergency tarping and leak mitigation to protect your home until permanent repairs are completed.' },
  { question: 'What roofing materials do you install?', answer: 'We install asphalt shingles, metal roofs, tile roofs, and flat roofing systems depending on your needs and budget.' },
  { question: 'Do you work with insurance claims?', answer: 'Yes. We document damage, provide estimates, and coordinate with adjusters to streamline your claim.' },
]

export default function RoofingServicesPage() {
  const pagePath = '/services/roofing'
  const serviceName = 'Roofing Services'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Roofing Services in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Reliable roof repair, replacement, and storm damage services from licensed, insured roofing professionals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/roofing" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
              <HomeIcon className="w-5 h-5 mr-2" />
              View All Roofing Providers
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Roofing Services</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">From emergency repairs to full replacements, our Jacksonville roofing pros have you covered.</p>
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
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local expertise, fast response, and quality materials for roofs that stand up to Florida weather.</p>
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

      {/* Systems */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {systems.map((sys, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
                  <WrenchScrewdriverIcon className="w-6 h-6 text-primary-600 mr-3" />
                  {sys.category}
                </h3>
                <ul className="space-y-3">
                  {sys.items.map((item, j) => (
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
            <p className="text-lg text-neutral-600">Answers to common roofing questions for Jacksonville homeowners.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Roofing Help Now?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville roofing pros for repair, replacement, and storm damage restoration.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/roofing" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
              <HomeIcon className="w-5 h-5 mr-2" />
              View All Roofing Providers
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
