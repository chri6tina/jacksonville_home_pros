import type { Metadata } from 'next'
import {
  ShieldCheckIcon,
  PhoneIcon,
  ClockIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Baby-Proofing Jacksonville FL | Home Safety & Childproofing',
  description: 'Professional baby-proofing in Jacksonville, FL. Safety gates, cabinet locks, outlet covers, furniture anchoring, and window guards. Home safety assessments.',
  keywords: [
    'baby proofing Jacksonville FL',
    'childproofing Jacksonville',
    'home safety Jacksonville',
    'furniture anchoring Jacksonville',
    'safety gates Jacksonville'
  ],
  openGraph: {
    title: 'Baby-Proofing Jacksonville FL | Home Safety & Childproofing',
    description: 'Childproofing assessments, gates, cabinet locks, outlet covers, and anchoring by professionals.',
    type: 'website',
  },
}

const services = [
  { icon: ShieldCheckIcon, title: 'Home Safety Assessment', description: 'Room-by-room hazard review with prioritized recommendations.', price: '$100-250' },
  { icon: CheckCircleIcon, title: 'Gates & Barriers', description: 'Pressure-mounted and hardware-mounted gates installed correctly.', price: '$100-300' },
  { icon: WrenchScrewdriverIcon, title: 'Cabinet & Drawer Locks', description: 'Magnetic and mechanical latches for kitchens and baths.', price: '$75-250' },
  { icon: HomeIcon, title: 'Outlet & Cord Safety', description: 'Outlet covers, cord management, and blind cord safety.', price: '$50-200' },
  { icon: CheckCircleIcon, title: 'Furniture & TV Anchoring', description: 'Anti-tip brackets for TVs, dressers, and bookcases.', price: '$25-100/item' },
  { icon: ExclamationTriangleIcon, title: 'Window & Door Safety', description: 'Window guards, door stops, and pinch guards.', price: '$75-250' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Pros', description: 'Jacksonville childproofing professionals with practical solutions.' },
  { icon: ClockIcon, title: 'Fast Appointments', description: 'Convenient scheduling and efficient installs around nap times.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Secure installations and reliable products for peace of mind.' },
  { icon: StarIcon, title: 'Parent-Approved', description: 'Trusted by local families with great reviews and referrals.' },
  { icon: CheckCircleIcon, title: 'Custom Plans', description: 'Tailored recommendations based on layout and age ranges.' },
  { icon: HomeIcon, title: 'Whole-Home Safety', description: 'Nursery, kitchen, bath, stairs, windows, and living areas.' },
]

const faqs = [
  { question: 'How long does baby-proofing take?', answer: 'Most homes can be assessed and installed within 2-4 hours depending on scope.' },
  { question: 'Do you provide products?', answer: 'We carry professional-grade products or can install items you provide.' },
  { question: 'Can you return for follow-up as children grow?', answer: 'Yes. We offer follow-up visits to adjust safety as mobility increases.' },
]

export default function BabyProofingServicesPage() {
  const pagePath = '/services/baby-proofing'
  const serviceName = 'Baby-Proofing'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Baby-Proofing in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Home safety assessments and childproofing installs—gates, locks, covers, anchoring, and window safety.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/baby-proofing" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><ShieldCheckIcon className="w-5 h-5 mr-2" />View All Baby-Proofing Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Childproofing Services</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Practical safety upgrades that look clean and function reliably.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local pros, parent-approved products, and reliable installs.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common childproofing questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Make Your Home Safer for Kids</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville childproofing professionals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/baby-proofing" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><ShieldCheckIcon className="w-5 h-5 mr-2" />View All Baby-Proofing Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
