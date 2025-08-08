import type { Metadata } from 'next'
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon,
  BoltIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Door Services Jacksonville FL | Door Installation & Repair',
  description: 'Professional door services in Jacksonville, FL. Entry doors, interior doors, sliding doors, hardware, alignment, and weatherproofing. Licensed and insured pros.',
  keywords: [
    'door installation Jacksonville FL',
    'door repair Jacksonville',
    'entry door Jacksonville',
    'interior door Jacksonville',
    'sliding door repair Jacksonville',
    'door hardware Jacksonville'
  ],
  openGraph: {
    title: 'Door Services Jacksonville FL | Door Installation & Repair',
    description: 'Entry, interior, and sliding door installation and repair by licensed Jacksonville professionals.',
    type: 'website',
  },
}

const services = [
  { icon: HomeIcon, title: 'Entry Door Installation', description: 'Front doors, impact-rated options, sidelights, and thresholds.', price: '$800-4,000+' },
  { icon: WrenchScrewdriverIcon, title: 'Interior Doors', description: 'Pre-hung, slab replacement, pocket doors, and bifold installs.', price: '$150-800' },
  { icon: CheckCircleIcon, title: 'Sliding & Patio Doors', description: 'Track repair, rollers, alignment, and new installations.', price: '$300-2,500' },
  { icon: BoltIcon, title: 'Hardware & Locks', description: 'Hinges, handlesets, smart locks, closers, and strikes.', price: '$75-400' },
  { icon: ShieldCheckIcon, title: 'Weatherproofing', description: 'Weatherstripping, sweeps, thresholds, and air-seal improvements.', price: '$100-500' },
  { icon: WrenchScrewdriverIcon, title: 'Repairs & Adjustments', description: 'Sagging, rubbing, latching, light gaps, and security upgrades.', price: '$100-600' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Door Pros', description: 'Jacksonville professionals familiar with coastal humidity and settlement issues.' },
  { icon: ClockIcon, title: 'Efficient & Clean', description: 'On-time installs with careful protection of surrounding finishes.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Proper alignment and sealing for energy efficiency and security.' },
  { icon: StarIcon, title: 'Quality Materials', description: 'Weather-resistant frames, fasteners, and long-lasting hardware.' },
  { icon: CheckCircleIcon, title: 'Security Focused', description: 'Reinforced strikes, deadbolts, and smart lock integration.' },
  { icon: HomeIcon, title: 'All Door Types', description: 'Entry, interior, barn, pocket, bifold, and sliding patio doors.' },
]

const faqs = [
  { question: 'Do you handle door painting and finishing?', answer: 'Yes. We can coordinate paint or stain finishing for new and replacement doors.' },
  { question: 'Can you fix drafts around doors?', answer: 'We correct alignment and install weatherstripping, sweeps, and thresholds to reduce air leaks.' },
  { question: 'Do you install smart locks?', answer: 'Yes. We install and configure most smart lock systems as part of hardware upgrades.' },
]

export default function DoorsServicesPage() {
  const pagePath = '/services/doors'
  const serviceName = 'Door Services'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Door Services in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Installation, repair, alignment, and weatherproofing for entry, interior, and sliding doors by licensed pros.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/doors" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><HomeIcon className="w-5 h-5 mr-2" />View All Door Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Door Services</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Entry security, smooth operation, and energy-efficient sealing—handled professionally.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local door experts, careful installs, and airtight results.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common door service questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Door Installation or Repair?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville door pros for installations, repairs, and upgrades.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/doors" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><HomeIcon className="w-5 h-5 mr-2" />View All Door Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
