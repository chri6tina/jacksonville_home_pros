import type { Metadata } from 'next'
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Fence Services Jacksonville FL | Fence Installation & Repair',
  description: 'Professional fence installation and repair in Jacksonville, FL. Wood, vinyl, aluminum, and chain-link fences. Gates, repairs, and staining.',
  keywords: [
    'fence installation Jacksonville FL',
    'fence repair Jacksonville',
    'wood fence Jacksonville',
    'vinyl fence Jacksonville',
    'aluminum fence Jacksonville',
    'chain link fence Jacksonville'
  ],
  openGraph: {
    title: 'Fence Services Jacksonville FL | Installation & Repair',
    description: 'Fence installation and repair for wood, vinyl, aluminum, and chain-link in Jacksonville, FL.',
    type: 'website',
  },
}

const services = [
  { icon: HomeIcon, title: 'Fence Installation', description: 'Wood, vinyl, aluminum, and chain-link fences installed to code.', price: '$1,800-12,000+' },
  { icon: WrenchScrewdriverIcon, title: 'Fence Repair', description: 'Post replacement, panel repair, and storm damage fixes.', price: '$150-1,500' },
  { icon: CheckCircleIcon, title: 'Gates & Hardware', description: 'Swing and sliding gates, latches, locks, and closers.', price: '$200-2,000' },
  { icon: ShieldCheckIcon, title: 'Staining & Sealing', description: 'Protective finishes to extend the life of wood fences.', price: '$300-1,200' },
  { icon: HomeIcon, title: 'Privacy & Decorative', description: 'Board-on-board, shadowbox, lattice tops, and custom designs.', price: 'Varies' },
  { icon: CheckCircleIcon, title: 'Permits & HOA', description: 'Assistance with permits and HOA requirements where needed.', price: 'Varies' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Fence Pros', description: 'Jacksonville fence contractors familiar with soils, wind loads, and local codes.' },
  { icon: ClockIcon, title: 'Timely Installs', description: 'Efficient scheduling and clean job sites with clear communication.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Proper post depth, concrete, and materials for durable results.' },
  { icon: StarIcon, title: 'Quality Materials', description: 'Pressure-treated lumber, quality vinyl, and corrosion-resistant hardware.' },
  { icon: CheckCircleIcon, title: 'Custom Options', description: 'Styles and configurations tailored to your needs and property.' },
  { icon: HomeIcon, title: 'Repairs & Upgrades', description: 'Storm damage repairs, gate upgrades, and finishing services.' },
]

const faqs = [
  { question: 'Do you handle permits?', answer: 'Yes. We assist with permitting and HOA approvals where required and ensure code-compliant installations.' },
  { question: 'How long does installation take?', answer: 'Most residential fence projects are completed in 1-3 days depending on length, terrain, and material availability.' },
  { question: 'What fence lasts the longest?', answer: 'Aluminum and vinyl typically last longer with less maintenance; pressure-treated wood can last with proper sealing and care.' },
]

export default function FencesServicesPage() {
  const pagePath = '/services/fences'
  const serviceName = 'Fence Services'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Fence Services in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Installation, repairs, gates, and staining—delivered by licensed, insured Jacksonville fence contractors.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/fences" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><HomeIcon className="w-5 h-5 mr-2" />View All Fence Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Fence Services</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Durable materials, clean installs, and tailored designs for privacy, security, and curb appeal.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local expertise, strong materials, and reliable scheduling.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common fence questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a New Fence?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville fence installers for installations and repairs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/fences" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><HomeIcon className="w-5 h-5 mr-2" />View All Fence Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
