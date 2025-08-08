import type { Metadata } from 'next'
import {
  RectangleStackIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Drywall Services Jacksonville FL | Installation, Repair & Finishing',
  description: 'Professional drywall services in Jacksonville, FL. Installation, repair, taping, mudding, texturing, and finishing. Licensed and insured pros.',
  keywords: [
    'drywall Jacksonville FL',
    'drywall repair Jacksonville',
    'drywall installation Jacksonville',
    'taping and mudding Jacksonville',
    'texture finishing Jacksonville'
  ],
  openGraph: {
    title: 'Drywall Services Jacksonville FL | Installation, Repair & Finishing',
    description: 'Drywall installation, repair, and finishing by licensed Jacksonville pros.',
    type: 'website',
  },
}

const services = [
  { icon: RectangleStackIcon, title: 'Drywall Installation', description: 'Hanging, taping, mudding, and sanding for new construction and remodels.', price: '$1.50-$3.50/sq ft' },
  { icon: WrenchScrewdriverIcon, title: 'Drywall Repair', description: 'Hole patches, water damage repair, cracks, and seam fixes.', price: '$150-1,200' },
  { icon: CheckCircleIcon, title: 'Texturing & Finishes', description: 'Orange peel, knockdown, smooth, and custom textures.', price: '$1.00-$2.50/sq ft' },
  { icon: ShieldCheckIcon, title: 'Moisture-Resistant Board', description: 'Green board, cement board, and proper substrate for wet areas.', price: 'Varies' },
  { icon: RectangleStackIcon, title: 'Ceilings & Soffits', description: 'Ceiling drywall, soffit framing, and finishing.', price: 'Varies' },
  { icon: WrenchScrewdriverIcon, title: 'Trim & Paint-Ready', description: 'Final prep for paint, including sanding and priming.', price: 'Varies' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Finishers', description: 'Jacksonville drywall installers with clean work and consistent finishes.' },
  { icon: ClockIcon, title: 'On-Time & Clean', description: 'Dust control, site protection, and clear schedules.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Proper installation for durable, crack-free results.' },
  { icon: StarIcon, title: 'Paint-Ready Finish', description: 'Smooth surfaces with minimal touch-up for painters.' },
  { icon: CheckCircleIcon, title: 'All Scopes', description: 'From small patches to whole-home installations.' },
  { icon: RectangleStackIcon, title: 'Ceilings & Details', description: 'Experience with soffits, arches, and detailed areas.' },
]

const faqs = [
  { question: 'How is pricing calculated?', answer: 'Pricing is typically by square foot for installation and by scope for repairs. We provide detailed estimates before work begins.' },
  { question: 'Can you match existing textures?', answer: 'Yes, we match common textures like orange peel and knockdown. We provide samples before full application.' },
  { question: 'How long does repair take?', answer: 'Small patches can be completed in a single visit; larger repairs may require drying time between coats over 1-3 days.' },
]

export default function DrywallServicesPage() {
  const pagePath = '/services/drywall'
  const serviceName = 'Drywall Services'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Drywall Services in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Installation, repair, and finishing for remodels and new construction by licensed, insured drywall pros.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/drywall" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><RectangleStackIcon className="w-5 h-5 mr-2" />View All Drywall Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Drywall Services</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">From small patches to full installations, Jacksonville finishers deliver paint-ready surfaces.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx.auto">Local installers, clean sites, and consistent finishes.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common drywall questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Drywall Services?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville drywall contractors for installations and repairs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/drywall" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><RectangleStackIcon className="w-5 h-5 mr-2" />View All Drywall Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
