import type { Metadata } from 'next'
import {
  HomeIcon,
  PaintBrushIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Window Coverings Jacksonville FL | Blinds, Shades & Curtains',
  description: 'Professional window coverings in Jacksonville, FL. Blinds, shades, shutters, and curtains. Measurement, installation, and motorization options.',
  keywords: [
    'window coverings Jacksonville FL',
    'blinds Jacksonville',
    'shades Jacksonville',
    'window treatments Jacksonville',
    'curtains Jacksonville',
    'plantation shutters Jacksonville'
  ],
  openGraph: {
    title: 'Window Coverings Jacksonville FL | Blinds, Shades & Curtains',
    description: 'Blinds, shades, shutters, and curtains with professional measurement and installation in Jacksonville, FL.',
    type: 'website',
  },
}

const services = [
  { icon: PaintBrushIcon, title: 'Blinds & Shades', description: 'Faux wood, cellular, roller, solar, and blackout shades.', price: '$200-1,500' },
  { icon: HomeIcon, title: 'Shutters', description: 'Plantation shutters in composite and wood with custom fits.', price: '$500-3,500' },
  { icon: CheckCircleIcon, title: 'Curtains & Drapery', description: 'Custom rods, panels, sheers, and layered treatments.', price: '$150-2,000' },
  { icon: WrenchScrewdriverIcon, title: 'Measurement & Install', description: 'Precise measurement and professional installation.', price: 'Included/Varies' },
  { icon: ShieldCheckIcon, title: 'Motorization', description: 'Remote and app-controlled shades with smart home integration.', price: '$250-1,500' },
  { icon: CheckCircleIcon, title: 'Repairs & Adjustments', description: 'Cord repairs, tilters, track alignment, and replacements.', price: '$75-400' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Experts', description: 'Jacksonville installers with precise measurement and clean finishes.' },
  { icon: ClockIcon, title: 'Timely Service', description: 'On-time appointments and quick turnarounds.' },
  { icon: ShieldCheckIcon, title: 'Licensed & Insured', description: 'Proper hardware and secure mounting for long-lasting results.' },
  { icon: StarIcon, title: 'Design Guidance', description: 'Help selecting styles, fabrics, and light control options.' },
  { icon: CheckCircleIcon, title: 'Smart Options', description: 'Motorized solutions compatible with common smart home platforms.' },
  { icon: HomeIcon, title: 'Whole-Home', description: 'Coordinated treatments across rooms for a cohesive look.' },
]

const faqs = [
  { question: 'Do you provide in-home consultations?', answer: 'Yes. We measure, bring samples, and provide recommendations and quotes.' },
  { question: 'Can you integrate with smart home systems?', answer: 'Yes. Many products support motorization and integrations via hubs or apps.' },
  { question: 'Do you handle repairs?', answer: 'We repair or replace broken slats, cords, tilters, and tracks when feasible.' },
]

export default function WindowCoveringsServicesPage() {
  const pagePath = '/services/window-coverings'
  const serviceName = 'Window Coverings'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Window Coverings in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Blinds, shades, shutters, and curtains—measured and installed by licensed pros. Motorization available.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/window-coverings" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><PaintBrushIcon className="w-5 h-5 mr-2" />View All Window Coverings Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Window Coverings</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Beautiful, functional treatments with precise fit, clean installs, and smart control options.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local measurement expertise, clean installs, and stylish results.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common window covering questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Window Coverings?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville installers for blinds, shades, shutters, and curtains.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/window-coverings" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><PaintBrushIcon className="w-5 h-5 mr-2" />View All Window Coverings Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
