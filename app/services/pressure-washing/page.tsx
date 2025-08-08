import type { Metadata } from 'next'
import {
  SparklesIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon,
  HomeIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Pressure Washing Jacksonville FL | House, Driveway & Roof Cleaning',
  description: 'Professional pressure washing in Jacksonville, FL. House wash, driveway cleaning, roof soft washing, decks, and fences. Licensed and insured.',
  keywords: [
    'pressure washing Jacksonville FL',
    'power washing Jacksonville',
    'house washing Jacksonville',
    'roof cleaning Jacksonville',
    'driveway cleaning Jacksonville'
  ],
  openGraph: {
    title: 'Pressure Washing Jacksonville FL | House, Driveway & Roof Cleaning',
    description: 'House, roof, and driveway pressure washing by licensed Jacksonville pros.',
    type: 'website',
  },
}

const services = [
  { icon: HomeIcon, title: 'House Washing', description: 'Soft wash exterior cleaning safe for siding, windows, and trim.', price: '$200-500' },
  { icon: SparklesIcon, title: 'Driveways & Walkways', description: 'High-pressure cleaning for concrete, pavers, and sidewalks.', price: '$100-400' },
  { icon: ShieldCheckIcon, title: 'Roof Cleaning (Soft Wash)', description: 'Gentle roof algae and stain removal with low-pressure methods.', price: '$300-800' },
  { icon: CheckCircleIcon, title: 'Decks & Fences', description: 'Wood and composite cleaning with protective treatments available.', price: '$150-600' },
  { icon: CheckCircleIcon, title: 'Pool Decks & Patios', description: 'Mildew and dirt removal for outdoor living areas.', price: '$150-500' },
  { icon: ClockIcon, title: 'Maintenance Plans', description: 'Seasonal cleaning to keep your home exterior looking great.', price: 'Varies' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Expertise', description: 'Jacksonville climate knowledge for algae, mildew, and salt-air buildup.' },
  { icon: ClockIcon, title: 'On-Time & Careful', description: 'Respectful crews who protect landscaping and fixtures.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Proper insurance and soft-wash techniques to prevent damage.' },
  { icon: StarIcon, title: 'Great Results', description: 'Visible before/after results and satisfaction-focused service.' },
  { icon: CheckCircleIcon, title: 'Right Methods', description: 'Soft wash for roofs/siding; pressure for concrete and hard surfaces.' },
  { icon: HomeIcon, title: 'Whole-Property', description: 'From siding to pool decks, one team cleans it all.' },
]

const faqs = [
  { question: 'Is roof pressure washing safe?', answer: 'We use soft-wash for roofs—low pressure with appropriate cleaning solutions to avoid shingle damage.' },
  { question: 'How often should I pressure wash?', answer: 'Once per year is typical in Jacksonville; shaded or coastal homes may need seasonal cleaning.' },
  { question: 'Do you use eco-friendly products?', answer: 'Yes. We use appropriate, effective solutions and rinse thoroughly to protect landscaping.' },
]

export default function PressureWashingServicesPage() {
  const pagePath = '/services/pressure-washing'
  const serviceName = 'Pressure Washing Services'
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

      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-30"><div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Pressure Washing in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">House washing, driveways, roofs, decks, and fences—cleaned safely by licensed, insured pros.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/pressure-washing" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><SparklesIcon className="w-5 h-5 mr-2" />View All Pressure Washing Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Pressure Washing Services</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Restore curb appeal and protect surfaces with the right methods for each material.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local knowledge, careful crews, and outstanding results.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common pressure washing questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Pressure Washing?</h2>
          <p className="text-xl mb-8 text.white/90">Connect with trusted Jacksonville pressure washing pros today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/pressure-washing" className="inline-flex items-center px-8 py-4 bg.white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><SparklesIcon className="w-5 h-5 mr-2" />View All Pressure Washing Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg.white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
