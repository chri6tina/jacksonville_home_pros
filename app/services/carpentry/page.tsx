import type { Metadata } from 'next'
import {
  WrenchScrewdriverIcon,
  HomeIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Carpentry Services Jacksonville FL | Custom Woodwork & Repairs',
  description: 'Professional carpentry in Jacksonville, FL. Custom cabinets, trim, doors, decks, and wood repairs. Licensed, insured, and detailed craftsmanship.',
  keywords: [
    'carpentry Jacksonville FL',
    'custom cabinets Jacksonville',
    'trim carpentry Jacksonville',
    'deck building Jacksonville',
    'door installation Jacksonville',
    'wood repair Jacksonville'
  ],
  openGraph: {
    title: 'Carpentry Services Jacksonville FL | Custom Woodwork & Repairs',
    description: 'Custom woodworking, trim, doors, and decks by Jacksonville carpenters.',
    type: 'website',
  },
}

const services = [
  { icon: WrenchScrewdriverIcon, title: 'Trim & Molding', description: 'Crown molding, baseboards, wainscoting, and custom trim installation.', price: '$500-5,000' },
  { icon: HomeIcon, title: 'Doors & Windows', description: 'Interior/exterior doors, frames, hardware, and window trim.', price: '$200-2,500' },
  { icon: PaintBrushIcon, title: 'Cabinetry', description: 'Custom cabinets, built-ins, shelving, and storage solutions.', price: '$1,500-15,000+' },
  { icon: HomeIcon, title: 'Decks & Outdoor', description: 'Deck construction, repairs, railing, and pergolas.', price: '$2,500-20,000+' },
  { icon: CheckCircleIcon, title: 'Repairs', description: 'Rot repair, framing fixes, squeaks, and reinforcement.', price: '$150-1,500' },
  { icon: ShieldCheckIcon, title: 'Finishing', description: 'Sanding, staining, painting, and protective finishes.', price: '$200-2,000' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Craftsmen', description: 'Jacksonville carpenters with attention to detail and reliable scheduling.' },
  { icon: ClockIcon, title: 'On-Time & Clean', description: 'Respectful of your home with tidy work areas and clear timelines.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Fully insured with workmanship guarantees on most projects.' },
  { icon: StarIcon, title: 'Quality Materials', description: 'We use reliable lumber, fasteners, and finishes for long-lasting results.' },
  { icon: CheckCircleIcon, title: 'Custom Solutions', description: 'From built-ins to repairs, we tailor solutions to your space and style.' },
  { icon: HomeIcon, title: 'Indoor & Outdoor', description: 'Full range of interior and exterior carpentry services.' },
]

const categories = [
  { category: 'Interior Carpentry', items: ['Crown & baseboard', 'Wainscoting & paneling', 'Built-ins & shelving', 'Stair trim & railings', 'Door installation'] },
  { category: 'Exterior Carpentry', items: ['Decks & repairs', 'Pergolas & railings', 'Fascia & soffit repair', 'Exterior doors & trim', 'Outdoor storage'] },
  { category: 'Repairs & Finishing', items: ['Rot repair', 'Framing fixes', 'Sanding & staining', 'Painting & sealing', 'Hardware installation'] },
]

const faqs = [
  { question: 'Can you match existing trim profiles?', answer: 'Yes, we can source or custom-mill profiles to match existing trim where feasible.' },
  { question: 'Do you handle permitting?', answer: 'Most interior work does not require permits, but we handle permits for decks or structural changes as needed.' },
  { question: 'Do you build custom cabinetry?', answer: 'Yes, we offer custom built-ins and cabinetry or can install pre-fabricated units you provide.' },
]

export default function CarpentryServicesPage() {
  const pagePath = '/services/carpentry'
  const serviceName = 'Carpentry Services'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Carpentry Services in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Custom woodwork, trim, doors, and decks—built and repaired by licensed, insured carpenters.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/carpentry" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><HomeIcon className="w-5 h-5 mr-2" />View All Carpentry Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Carpentry Services</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Detail-focused carpentry for interiors and exteriors to elevate your home’s function and style.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local craftsmen, reliable timelines, and high-quality materials.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">{categories.map((cat, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center"><WrenchScrewdriverIcon className="w-6 h-6 text-primary-600 mr-3" />{cat.category}</h3><ul className="space-y-3">{cat.items.map((item, j) => (<li key={j} className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" /><span className="text-neutral-700">{item}</span></li>))}</ul></div>))}</div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common carpentry questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Carpentry Services?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with Jacksonville carpenters for custom woodwork, repairs, and installations.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/carpentry" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><HomeIcon className="w-5 h-5 mr-2" />View All Carpentry Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
