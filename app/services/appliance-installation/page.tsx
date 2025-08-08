import type { Metadata } from 'next'
import {
  BoltIcon,
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
  title: 'Appliance Installation Jacksonville FL | Install & Hookups',
  description: 'Professional appliance installation in Jacksonville, FL. Dishwashers, ovens, microwaves, washers, dryers, and refrigerators. Proper hookups and testing.',
  keywords: [
    'appliance installation Jacksonville FL',
    'dishwasher install Jacksonville',
    'oven install Jacksonville',
    'washer dryer install Jacksonville',
    'microwave install Jacksonville'
  ],
  openGraph: {
    title: 'Appliance Installation Jacksonville FL | Install & Hookups',
    description: 'Appliance installation and hookups for dishwashers, ovens, washers, dryers, and more in Jacksonville, FL.',
    type: 'website',
  },
}

const services = [
  { icon: WrenchScrewdriverIcon, title: 'Kitchen Appliances', description: 'Dishwashers, ovens, cooktops, microwaves, and range hoods.', price: '$150-500' },
  { icon: BoltIcon, title: 'Laundry Appliances', description: 'Washer and dryer installation, stacking kits, and venting.', price: '$150-400' },
  { icon: CheckCircleIcon, title: 'Water & Gas Hookups', description: 'Proper water, drain, and gas connections with leak checks.', price: 'Included/Varies' },
  { icon: ShieldCheckIcon, title: 'Code-Compliant Installs', description: 'Correct outlets, venting, and clearances per manufacturer specs.', price: 'Varies' },
  { icon: HomeIcon, title: 'Built-in & Trim Kits', description: 'Microwave trim kits and built-in fridge panels.', price: '$100-400' },
  { icon: ClockIcon, title: 'Removal & Haul Away', description: 'Old appliance disconnect and haul away available.', price: '$50-150' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Installers', description: 'Jacksonville appliance installers with careful handling and tidy jobs.' },
  { icon: ClockIcon, title: 'On-Time Windows', description: 'Accurate scheduling and communication on delivery day.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Proper hookups with testing for leaks, level, and operation.' },
  { icon: StarIcon, title: 'Warranty-Friendly', description: 'Installs per manufacturer requirements to protect warranties.' },
  { icon: CheckCircleIcon, title: 'All Brands', description: 'Experienced with major brands and built-in trim kits.' },
  { icon: HomeIcon, title: 'Kitchen & Laundry', description: 'Safe, clean installs for both kitchens and laundry rooms.' },
]

const faqs = [
  { question: 'Do you disconnect and take away old appliances?', answer: 'Yes. We offer removal and haul away—please request at booking for pricing.' },
  { question: 'Do I need new hoses or cords?', answer: 'We recommend new hoses and cords. We can provide or install parts you supply.' },
  { question: 'Do you handle gas connections?', answer: 'Yes. Licensed installers handle gas connections with leak checks when required.' },
]

export default function ApplianceInstallationServicesPage() {
  const pagePath = '/services/appliance-installation'
  const serviceName = 'Appliance Installation'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Appliance Installation in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Dishwashers, ovens, microwaves, washers, and dryers—installed correctly with proper hookups and testing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/appliance-installation" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><WrenchScrewdriverIcon className="w-5 h-5 mr-2" />View All Appliance Installers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Installation Services</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Safe, clean installs per manufacturer specs to protect warranties and ensure performance.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local installers, careful handling, and code-compliant hookups.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items.center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common appliance installation questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Appliances Installed?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville installers for kitchens and laundry rooms.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/appliance-installation" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><WrenchScrewdriverIcon className="w-5 h-5 mr-2" />View All Appliance Installers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
