import type { Metadata } from 'next'
import {
  TruckIcon,
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
  title: 'Moving Services Jacksonville FL | Local & Long-Distance Movers',
  description: 'Professional moving services in Jacksonville, FL. Local moves, long-distance, packing, and storage. Licensed, insured, and careful movers.',
  keywords: [
    'moving company Jacksonville FL',
    'local movers Jacksonville',
    'long distance movers Jacksonville',
    'packing services Jacksonville',
    'storage Jacksonville'
  ],
  openGraph: {
    title: 'Moving Services Jacksonville FL | Local & Long-Distance Movers',
    description: 'Local and long-distance moving services with packing and storage options in Jacksonville, FL.',
    type: 'website',
  },
}

const services = [
  { icon: TruckIcon, title: 'Local Moves', description: 'Apartment, condo, and home moves across Jacksonville with careful handling.', price: '$300-1,200' },
  { icon: TruckIcon, title: 'Long-Distance', description: 'Interstate moving services with flexible delivery and tracking.', price: 'Varies' },
  { icon: CheckCircleIcon, title: 'Packing & Unpacking', description: 'Full or partial packing services with quality materials and labeling.', price: '$150-800' },
  { icon: HomeIcon, title: 'Loading & Unloading', description: 'Labor-only services for trucks, pods, and storage units.', price: '$150-600' },
  { icon: ShieldCheckIcon, title: 'Furniture Protection', description: 'Padding, wrapping, and disassembly/reassembly of large items.', price: 'Included/Varies' },
  { icon: ClockIcon, title: 'Storage Options', description: 'Short and long-term storage with climate-controlled facilities.', price: 'Varies' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Experience', description: 'Jacksonville movers who know building access, parking, and scheduling logistics.' },
  { icon: ClockIcon, title: 'On-Time Arrival', description: 'Accurate windows, clear communication, and reliable crews.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Fully licensed movers with cargo protection options available.' },
  { icon: StarIcon, title: 'Careful & Friendly', description: 'Well-reviewed teams who treat your belongings with care.' },
  { icon: CheckCircleIcon, title: 'Transparent Pricing', description: 'Up-front estimates with no hidden fees—hourly or flat-rate.' },
  { icon: TruckIcon, title: 'Full-Service', description: 'Packing, moving, storage, and furniture assembly all available.' },
]

const checklists = [
  { category: 'Before Your Move', items: ['Purge unused items', 'Label boxes by room', 'Reserve elevator/truck parking', 'Set up utilities & address changes', 'Pack essentials box'] },
  { category: 'Moving Day', items: ['Protect floors & entryways', 'Disassemble large furniture', 'Keep important documents with you', 'Confirm inventory & destination notes', 'Walkthrough at finish'] },
  { category: 'After Your Move', items: ['Unpack essentials first', 'Assemble beds & furniture', 'Update registrations/licenses', 'Schedule utility transfers', 'Recycle boxes & packing'] },
]

const faqs = [
  { question: 'Do you offer packing supplies?', answer: 'Yes. We can provide boxes, tape, padding, and specialty crates as needed.' },
  { question: 'Are there extra fees for stairs or heavy items?', answer: 'We disclose access factors and specialty items in your estimate—no surprises on move day.' },
  { question: 'Can you handle office moves?', answer: 'Yes. We perform office moves with after-hours scheduling to minimize downtime.' },
]

export default function MovingServicesPage() {
  const pagePath = '/services/moving'
  const serviceName = 'Moving Services'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Moving Services in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Local and long-distance movers with packing, storage, and careful handling by licensed, insured pros.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/moving" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><TruckIcon className="w-5 h-5 mr-2" />View All Moving Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Moving Services</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">From packing to storage, Jacksonville movers make your move smooth and stress-free.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local expertise, careful handling, and transparent pricing.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">{checklists.map((list, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center"><TruckIcon className="w-6 h-6 text-primary-600 mr-3" />{list.category}</h3><ul className="space-y-3">{list.items.map((item, j) => (<li key={j} className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" /><span className="text-neutral-700">{item}</span></li>))}</ul></div>))}</div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common moving questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Move?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville movers for local and long-distance moves.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/moving" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><TruckIcon className="w-5 h-5 mr-2" />View All Moving Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
