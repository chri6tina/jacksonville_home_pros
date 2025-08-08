import type { Metadata } from 'next'
import {
  Squares2X2Icon,
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
  title: 'Tiling Services Jacksonville FL | Tile Installation & Repair',
  description: 'Professional tiling in Jacksonville, FL. Floor tile, shower tile, backsplash, grout, and repairs. Licensed and insured tile installers.',
  keywords: [
    'tiling Jacksonville FL',
    'tile installation Jacksonville',
    'shower tile Jacksonville',
    'backsplash Jacksonville',
    'grout repair Jacksonville'
  ],
  openGraph: {
    title: 'Tiling Services Jacksonville FL | Tile Installation & Repair',
    description: 'Tile installation and repair for floors, showers, and backsplashes in Jacksonville, FL.',
    type: 'website',
  },
}

const services = [
  { icon: Squares2X2Icon, title: 'Floor Tile', description: 'Porcelain, ceramic, and natural stone floor tile installation.', price: '$1,000-8,000+' },
  { icon: Squares2X2Icon, title: 'Shower & Bath Tile', description: 'Waterproofing, wall tile, shower pans, niches, and custom layouts.', price: '$2,000-12,000+' },
  { icon: Squares2X2Icon, title: 'Kitchen Backsplashes', description: 'Subway, mosaic, and stone backsplash installations.', price: '$500-2,500' },
  { icon: WrenchScrewdriverIcon, title: 'Repairs & Regrout', description: 'Cracked tile replacement, grout repairs, and resealing.', price: '$200-1,500' },
  { icon: CheckCircleIcon, title: 'Heated Floors', description: 'Radiant heating mats and thermostats under tile.', price: '$1,000-4,500' },
  { icon: ShieldCheckIcon, title: 'Waterproofing', description: 'Membranes, backerboard, and proper substrate prep.', price: 'Varies' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Installers', description: 'Experienced Jacksonville tilers with attention to layout and lippage control.' },
  { icon: ClockIcon, title: 'On-Time & Clean', description: 'Dust control, clean cuts, and tidy work areas.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Proper waterproofing and substrates for long-lasting results.' },
  { icon: StarIcon, title: 'Quality Materials', description: 'Mortars, grouts, and sealers chosen for performance and durability.' },
  { icon: CheckCircleIcon, title: 'Detailed Finishes', description: 'Crisp lines, aligned patterns, and symmetrical cuts.' },
  { icon: Squares2X2Icon, title: 'Custom Layouts', description: 'Herringbone, stacked, staggered, and mosaic patterns.' },
]

const faqs = [
  { question: 'Do you handle shower waterproofing?', answer: 'Yes. We install appropriate membranes, backerboard, and slope to drain for lasting waterproof performance.' },
  { question: 'Can you match existing tile?', answer: 'We will attempt to source matches or propose close alternatives if original tiles are discontinued.' },
  { question: 'How long does tile installation take?', answer: 'Small backsplashes can be completed in 1-2 days; full bathrooms typically take 5-10 days depending on scope.' },
]

export default function TilingServicesPage() {
  const pagePath = '/services/tiling'
  const serviceName = 'Tiling Services'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Tiling Services in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Floor tile, showers, and backsplashes installed and repaired by licensed, insured pros.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/tiling" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><Squares2X2Icon className="w-5 h-5 mr-2" />View All Tiling Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Tiling Services</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Detailed tile work with proper prep and waterproofing for long-lasting beauty.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local installers, clean job sites, and precise finishes.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common tiling questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Tiling Services?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville tile installers for floors, showers, and more.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/tiling" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><Squares2X2Icon className="w-5 h-5 mr-2" />View All Tiling Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
