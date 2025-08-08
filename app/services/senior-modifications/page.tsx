import type { Metadata } from 'next'
import {
  HomeIcon,
  CheckCircleIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Senior Home Modifications Jacksonville FL | Accessibility & Safety',
  description: 'Accessibility modifications in Jacksonville, FL. Grab bars, ramps, stairlifts, walk-in showers, widened doors, and home safety upgrades.',
  keywords: [
    'senior home modifications Jacksonville FL',
    'accessibility Jacksonville',
    'grab bars Jacksonville',
    'ramps Jacksonville',
    'stairlift Jacksonville',
    'walk-in shower Jacksonville'
  ],
  openGraph: {
    title: 'Senior Home Modifications Jacksonville FL | Accessibility & Safety',
    description: 'Accessibility upgrades like grab bars, ramps, stairlifts, and walk-in showers installed by licensed pros.',
    type: 'website',
  },
}

const services = [
  { icon: CheckCircleIcon, title: 'Grab Bars & Railings', description: 'Secure installations in bathrooms, halls, and entryways.', price: '$100-500' },
  { icon: HomeIcon, title: 'Ramps & Thresholds', description: 'Exterior ramps, threshold ramps, and transitions.', price: '$300-3,000' },
  { icon: WrenchScrewdriverIcon, title: 'Walk-In Showers', description: 'Tub-to-shower conversions with low thresholds and seats.', price: '$4,000-15,000+' },
  { icon: CheckCircleIcon, title: 'Widened Doors', description: 'Door widening and offset hinges for easier mobility.', price: '$500-2,500' },
  { icon: ShieldCheckIcon, title: 'Stairlifts', description: 'Stairlift selection and installation for straight and curved stairs.', price: 'Varies' },
  { icon: HomeIcon, title: 'Lighting & Controls', description: 'Improved lighting, lever handles, and accessible switches.', price: '$150-1,500' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Specialists', description: 'Jacksonville accessibility pros familiar with ADA concepts and practical home solutions.' },
  { icon: ClockIcon, title: 'Thoughtful Scheduling', description: 'Respectful teams and coordinated scheduling around your routines.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Secure installations that prioritize safety and durability.' },
  { icon: StarIcon, title: 'Quality Products', description: 'Reliable fixtures and supports rated for long-term use.' },
  { icon: CheckCircleIcon, title: 'Customized Plans', description: 'We tailor recommendations to mobility, space, and budget.' },
  { icon: HomeIcon, title: 'Whole-Home Approach', description: 'Bathroom, entry, bedroom, and circulation improvements.' },
]

const faqs = [
  { question: 'Do you offer assessments?', answer: 'Yes. We assess mobility needs, room access, and safety hazards to recommend improvements.' },
  { question: 'Can you work with healthcare providers?', answer: 'We can coordinate with therapists or caregivers for appropriate modifications.' },
  { question: 'Do you provide financing options?', answer: 'Some providers offer financing or can recommend resources for accessibility upgrades.' },
]

export default function SeniorModificationsServicesPage() {
  const pagePath = '/services/senior-modifications'
  const serviceName = 'Senior Home Modifications'
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
        <div className="absolute inset-0 opacity-30"><div className="absolute inset-0 bg-gradient-to-br from.white/5 to-transparent"></div></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Senior Home Modifications in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Accessibility and safety upgrades—grab bars, ramps, stairlifts, widened doors, and walk-in showers.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/senior-modifications" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><HomeIcon className="w-5 h-5 mr-2" />View All Accessibility Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Accessibility & Safety Services</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Dignified, practical upgrades to improve safety and independence at home.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local specialists, secure installs, and thoughtful plans.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common accessibility questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Make Home Safer & More Accessible</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville accessibility contractors for senior home modifications.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/senior-modifications" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><HomeIcon className="w-5 h-5 mr-2" />View All Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
