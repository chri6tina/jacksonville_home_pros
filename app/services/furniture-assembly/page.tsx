import type { Metadata } from 'next'
import {
  WrenchScrewdriverIcon,
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
  title: 'Furniture Assembly Jacksonville FL | Assembly & Mounting Services',
  description: 'Professional furniture assembly in Jacksonville, FL. Beds, tables, dressers, shelving, and TV mounting. Fast, careful, and insured.',
  keywords: [
    'furniture assembly Jacksonville FL',
    'TV mounting Jacksonville',
    'shelving installation Jacksonville',
    'bed assembly Jacksonville',
    'dresser assembly Jacksonville'
  ],
  openGraph: {
    title: 'Furniture Assembly Jacksonville FL | Assembly & Mounting Services',
    description: 'Assembly, mounting, and shelving installation by trusted Jacksonville pros.',
    type: 'website',
  },
}

const services = [
  { icon: WrenchScrewdriverIcon, title: 'Furniture Assembly', description: 'Beds, tables, dressers, and flat-pack furniture from major brands.', price: '$75-300' },
  { icon: HomeIcon, title: 'TV Mounting', description: 'Wall mounting with proper anchors, cable management, and leveling.', price: '$100-300' },
  { icon: CheckCircleIcon, title: 'Shelving & Storage', description: 'Wall shelves, closet systems, and garage storage installs.', price: '$100-400' },
  { icon: ShieldCheckIcon, title: 'Safety Anchoring', description: 'Anti-tip brackets for dressers, bookcases, and TVs.', price: '$25-100/item' },
  { icon: ClockIcon, title: 'Disassembly/Reassembly', description: 'Move-related breakdown and reassembly of furniture.', price: '$75-250' },
  { icon: StarIcon, title: 'Picture & Mirror Hanging', description: 'Secure wall hanging with proper anchors and alignment.', price: '$75-200' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Pros', description: 'Jacksonville assemblers with careful handling and tidy work.' },
  { icon: ClockIcon, title: 'Fast Scheduling', description: 'Convenient time windows and on-time arrivals.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Proper tools, anchors, and protection for your home.' },
  { icon: StarIcon, title: 'Quality Finish', description: 'Aligned, level, and secure installations every time.' },
  { icon: CheckCircleIcon, title: 'Transparent Pricing', description: 'Clear, up-front estimates and no hidden fees.' },
  { icon: HomeIcon, title: 'All Rooms', description: 'Bedrooms, living rooms, offices, garages, and more.' },
]

const faqs = [
  { question: 'Do you remove packaging?', answer: 'Yes. We clean up and remove packaging; disposal fees may apply for large volumes.' },
  { question: 'Do you provide mounts and anchors?', answer: 'We carry common anchors and mounts, or we can install hardware you provide.' },
  { question: 'Can you secure items to studs?', answer: 'Yes. We locate studs and use appropriate anchors where studs are not available.' },
]

export default function FurnitureAssemblyServicesPage() {
  const pagePath = '/services/furniture-assembly'
  const serviceName = 'Furniture Assembly'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Furniture Assembly in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Fast, careful assembly and mounting for furniture, TVs, and shelving by insured pros.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/furniture-assembly" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><WrenchScrewdriverIcon className="w-5 h-5 mr-2" />View All Furniture Assembly Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Assembly & Mounting</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">From flat-pack to built-ins, we assemble and mount with proper anchors and tidy finishes.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local pros, careful handling, and aligned, level installs.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common assembly and mounting questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Assembly or Mounting?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville furniture assembly pros.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/furniture-assembly" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><WrenchScrewdriverIcon className="w-5 h-5 mr-2" />View All Furniture Assembly Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
