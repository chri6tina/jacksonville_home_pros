import type { Metadata } from 'next'
import {
  HomeIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  CogIcon,
  BoltIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Remodeling Services Jacksonville FL | Kitchen, Bathroom & Home Renovations',
  description: 'Full-service remodeling in Jacksonville, FL. Kitchen and bathroom remodels, home additions, flooring, and design-build. Licensed, insured, and trusted pros.',
  keywords: [
    'remodeling services Jacksonville FL',
    'kitchen remodel Jacksonville',
    'bathroom remodel Jacksonville',
    'home renovation Jacksonville',
    'home additions Jacksonville',
    'design build Jacksonville'
  ],
  openGraph: {
    title: 'Remodeling Services Jacksonville FL | Kitchen, Bathroom & Home Renovations',
    description: 'Kitchen, bathroom, and whole-home remodels by licensed Jacksonville contractors.',
    type: 'website',
  },
}

const services = [
  { icon: PaintBrushIcon, title: 'Kitchen Remodeling', description: 'Cabinets, countertops, appliances, lighting, and layout updates.', price: '$8,000-45,000+' },
  { icon: HomeIcon, title: 'Bathroom Remodeling', description: 'Showers, tubs, tile, vanities, and waterproofing for spa-like bathrooms.', price: '$6,000-30,000+' },
  { icon: CogIcon, title: 'Design-Build', description: 'Concept to completion: design, permits, and construction under one team.', price: 'Varies' },
  { icon: WrenchScrewdriverIcon, title: 'Flooring & Tile', description: 'Luxury vinyl plank, hardwood, tile, and subfloor repair.', price: '$2,000-15,000+' },
  { icon: BoltIcon, title: 'Electrical & Plumbing', description: 'Upgrades, relocations, and code-compliant system changes for remodels.', price: 'Varies' },
  { icon: CheckCircleIcon, title: 'Additions & Conversions', description: 'Room additions, garage conversions, and open-concept wall removal.', price: '$20,000-120,000+' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Remodeling Pros', description: 'Jacksonville contractors who know local codes, permits, and coastal conditions.' },
  { icon: ClockIcon, title: 'Clear Timelines', description: 'Transparent schedules with milestone updates and clean work sites.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Fully licensed and insured teams with warranties on workmanship.' },
  { icon: StarIcon, title: 'Top-Rated Work', description: 'Great reviews, detailed finishes, and quality materials that last.' },
  { icon: CheckCircleIcon, title: 'Design Support', description: 'Selections help for cabinets, tile, fixtures, and layouts that fit your budget.' },
  { icon: HomeIcon, title: 'End-to-End', description: 'We manage permits, inspections, subs, and delivery logistics.' },
]

const scopes = [
  { category: 'Kitchen Remodels', items: ['Cabinets & refacing', 'Countertops & backsplashes', 'Appliance installation', 'Lighting & electrical', 'Plumbing updates'] },
  { category: 'Bathroom Remodels', items: ['Walk-in showers & tubs', 'Waterproofing & tile', 'Vanities & storage', 'Ventilation & lighting', 'Accessibility upgrades'] },
  { category: 'Whole-Home', items: ['Open-concept reconfiguration', 'Flooring throughout', 'Interior painting', 'Doors & trim', 'Energy efficiency upgrades'] },
]

const faqs = [
  { question: 'Do you provide permits and plans?', answer: 'Yes. We handle permits and provide plans as needed. Design-build services streamline approvals and construction.' },
  { question: 'How are budgets managed?', answer: 'We provide detailed estimates, allowances for selections, and written change orders for transparency.' },
  { question: 'Do you offer financing?', answer: 'Some providers offer financing options or can recommend financing partners for larger projects.' },
]

export default function RemodelingServicesPage() {
  const pagePath = '/services/remodeling'
  const serviceName = 'Remodeling Services'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Remodeling Services in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Kitchen, bathroom, and whole-home renovations by licensed, insured pros. Design-build options available.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/remodeling" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><HomeIcon className="w-5 h-5 mr-2" />View All Remodeling Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Remodeling Services</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">From design to final walkthrough, Jacksonville remodelers deliver quality craftsmanship and clear communication.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3>
                <p className="text-neutral-600 mb-4">{service.description}</p>
                <div className="text-primary-600 font-semibold">{service.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local expertise, licensed pros, and streamlined remodeling with clear timelines.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          {scopes.map((scope, i) => (
            <div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center"><WrenchScrewdriverIcon className="w-6 h-6 text-primary-600 mr-3" />{scope.category}</h3>
              <ul className="space-y-3">{scope.items.map((item, j) => (<li key={j} className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" /><span className="text-neutral-700">{item}</span></li>))}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common remodeling questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Remodel?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville remodeling contractors for kitchens, bathrooms, and more.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify:center">
            <Link href="/categories/remodeling" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><HomeIcon className="w-5 h-5 mr-2" />View All Remodeling Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
