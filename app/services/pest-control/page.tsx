import type { Metadata } from 'next'
import {
  BugAntIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Pest Control Jacksonville FL | Exterminators & Inspections',
  description: 'Professional pest control in Jacksonville, FL. Ants, roaches, spiders, termites, and rodent control. Inspections, treatments, and prevention plans.',
  keywords: [
    'pest control Jacksonville FL',
    'exterminator Jacksonville',
    'termite control Jacksonville',
    'rodent control Jacksonville',
    'pest inspection Jacksonville'
  ],
  openGraph: {
    title: 'Pest Control Jacksonville FL | Exterminators & Inspections',
    description: 'Exterminators for ants, roaches, spiders, termites, and rodents in Jacksonville, FL.',
    type: 'website',
  },
}

const services = [
  { icon: BugAntIcon, title: 'General Pest Control', description: 'Treatment for ants, roaches, spiders, and common household pests.', price: '$100-300' },
  { icon: ShieldCheckIcon, title: 'Termite Control', description: 'Termite inspections, treatments, and preventative plans.', price: '$250-1,500' },
  { icon: ExclamationTriangleIcon, title: 'Rodent Control', description: 'Exclusion, trapping, and sanitation follow-ups for rodents.', price: '$200-800' },
  { icon: CheckCircleIcon, title: 'Quarterly Plans', description: 'Regular perimeter treatments and interior spot treatments.', price: '$75-150/visit' },
  { icon: ShieldCheckIcon, title: 'Mosquito Control', description: 'Yard treatments and seasonal mosquito reduction programs.', price: '$60-120/visit' },
  { icon: BugAntIcon, title: 'Bed Bug Treatments', description: 'Inspection, heat/chemical treatments, and follow-up verification.', price: '$400-1,500' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Entomology Insight', description: 'Knowledge of Jacksonville pest species, habitats, and seasonal patterns.' },
  { icon: ClockIcon, title: 'Fast Response', description: 'Quick scheduling for infestations and timely follow-ups.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'State-licensed technicians using approved methods and products.' },
  { icon: StarIcon, title: 'Satisfaction Focused', description: 'Re-treatment policies on plans and responsive customer service.' },
  { icon: CheckCircleIcon, title: 'Prevention First', description: 'Exclusion, sanitation, and habitat modification to reduce recurrence.' },
  { icon: BugAntIcon, title: 'Targeted Treatments', description: 'Precision applications to minimize chemicals and maximize results.' },
]

const tips = [
  'Seal gaps around doors, windows, and penetrations',
  'Store food in airtight containers and clean spills promptly',
  'Reduce standing water and maintain yard drainage',
  'Trim vegetation away from the home exterior',
  'Schedule regular inspections before peak seasons'
]

const faqs = [
  { question: 'Are treatments safe for pets and children?', answer: 'We use targeted products and application methods to minimize exposure. Follow re-entry guidance provided by your technician.' },
  { question: 'How often should I do pest control?', answer: 'Quarterly plans work well for most homes. Heavier pressure areas may benefit from bi-monthly service.' },
  { question: 'Do you offer one-time treatments?', answer: 'Yes. We offer one-time treatments with recommendations for prevention and optional follow-ups.' },
]

export default function PestControlServicesPage() {
  const pagePath = '/services/pest-control'
  const serviceName = 'Pest Control Services'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Pest Control in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Inspections, treatments, and prevention plans for ants, roaches, spiders, termites, rodents, and more.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/pest-control" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><BugAntIcon className="w-5 h-5 mr-2" />View All Pest Control Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Pest Control Services</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Targeted treatments and prevention-first strategies for Jacksonville homes.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local expertise, fast response, and prevention-focused plans.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Jacksonville Pest Prevention Tips</h2><p className="text-lg text-neutral-600">Simple steps to reduce pest pressure around your home.</p></div>
          <div className="grid md:grid-cols-2 gap-8">{tips.map((tip, i) => (<div key={i} className="flex items-start"><ShieldCheckIcon className="w-6 h-6 text-primary-600 mt-1 mr-4 flex-shrink-0" /><span className="text-neutral-700">{tip}</span></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common pest control questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Pest Control?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville exterminators for inspections, treatments, and prevention plans.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/pest-control" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><BugAntIcon className="w-5 h-5 mr-2" />View All Pest Control Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
