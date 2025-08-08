import type { Metadata } from 'next'
import {
  LightBulbIcon,
  CogIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon,
  BoltIcon,
  HomeIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import JsonLd from '@/components/seo/json-ld'
import { getBreadcrumbJsonLd, getFaqPageJsonLd, getLocalBusinessJsonLd, getServiceJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Smart Home Services Jacksonville FL | Installation & Automation',
  description: 'Smart home installation in Jacksonville, FL. Smart lighting, thermostats, security, voice control, and home automation. Professional setup and integration.',
  keywords: [
    'smart home Jacksonville FL',
    'home automation Jacksonville',
    'smart thermostat Jacksonville',
    'smart lighting Jacksonville',
    'home security Jacksonville'
  ],
  openGraph: {
    title: 'Smart Home Services Jacksonville FL | Installation & Automation',
    description: 'Smart lighting, thermostats, security, and voice control installed and configured by professionals.',
    type: 'website',
  },
}

const services = [
  { icon: LightBulbIcon, title: 'Smart Lighting', description: 'Switches, dimmers, scenes, and schedules for whole-home control.', price: '$200-1,500' },
  { icon: CogIcon, title: 'Thermostats & HVAC', description: 'Smart thermostats and integrations for comfort and efficiency.', price: '$200-800' },
  { icon: ShieldCheckIcon, title: 'Security & Cameras', description: 'Doorbell cams, smart locks, sensors, and professional configuration.', price: '$300-1,800' },
  { icon: BoltIcon, title: 'Voice & Hubs', description: 'Alexa, Google, and HomeKit setup with automations and routines.', price: '$150-600' },
  { icon: CheckCircleIcon, title: 'Home Theater & Media', description: 'Universal remotes, streaming devices, and speaker setups.', price: '$200-2,500' },
  { icon: HomeIcon, title: 'Whole-Home Automation', description: 'Centralized scenes, schedules, and remote access across devices.', price: 'Varies' },
]

const whyChooseUs = [
  { icon: MapPinIcon, title: 'Local Integrators', description: 'Jacksonville techs with experience across major smart home ecosystems.' },
  { icon: ClockIcon, title: 'Clean Setup', description: 'Neat wiring, labeled devices, and clear app configurations.' },
  { icon: ShieldCheckIcon, title: 'Secure Config', description: 'Proper account permissions, network settings, and device hardening.' },
  { icon: StarIcon, title: 'Reliable Results', description: 'Automations that work consistently, with documented setups.' },
  { icon: CheckCircleIcon, title: 'Training Included', description: 'Hands-on walkthroughs and quick-reference guides for your devices.' },
  { icon: LightBulbIcon, title: 'Expand Over Time', description: 'Add devices later with consistent naming and scenes.' },
]

const faqs = [
  { question: 'Can you work with my existing devices?', answer: 'Yes. We integrate with most mainstream devices and advise on compatibility gaps.' },
  { question: 'Do I need a hub?', answer: 'Some platforms benefit from hubs for local control and reliability. We recommend based on your devices.' },
  { question: 'Is my network secure enough?', answer: 'We assess Wi‑Fi coverage, recommend enhancements, and configure best practices for IoT security.' },
]

export default function SmartHomeServicesPage() {
  const pagePath = '/services/smart-home'
  const serviceName = 'Smart Home Services'
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Smart Home Services in <span className="text-primary-200">Jacksonville, FL</span></h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">Smart lighting, thermostats, security, and voice control—installed and configured by professionals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/smart-home" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><LightBulbIcon className="w-5 h-5 mr-2" />View All Smart Home Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Get Free Estimate</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Comprehensive Smart Home Services</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Setups that are reliable, secure, and easy to use—tailored to your home.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6"><service.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3><p className="text-neutral-600 mb-4">{service.description}</p><div className="text-primary-600 font-semibold">{service.price}</div></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why Choose Jacksonville Home Pros?</h2><p className="text-lg text-neutral-600 max-w-3xl mx-auto">Local expertise, secure configurations, and dependable automations.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{whyChooseUs.map((feature, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6"><feature.icon className="w-6 h-6 text-primary-600" /></div><h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3><p className="text-neutral-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2><p className="text-lg text-neutral-600">Answers to common smart home questions in Jacksonville.</p></div>
          <div className="space-y-8">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"><h3 className="text-xl font-semibold text-neutral-900 mb-4">{faq.question}</h3><p className="text-neutral-600">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Automate Your Home?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with trusted Jacksonville smart home installers for reliable automations.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/smart-home" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"><LightBulbIcon className="w-5 h-5 mr-2" />View All Smart Home Providers</Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"><PhoneIcon className="w-5 h-5 mr-2" />Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
