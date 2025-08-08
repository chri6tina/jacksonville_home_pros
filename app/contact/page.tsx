import type { Metadata } from 'next'
import { 
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us - Jacksonville Home Pros',
  description: 'Get in touch with Jacksonville Home Pros. Contact our team for support, questions, or to learn more about our services. We\'re here to help!',
  keywords: [
    'contact Jacksonville Home Pros',
    'customer support Jacksonville',
    'home service help Jacksonville',
    'Jacksonville Home Pros contact',
    'support team Jacksonville'
  ],
  openGraph: {
    title: 'Contact Us - Jacksonville Home Pros',
    description: 'Get in touch with our team for support, questions, or to learn more about our services.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We're here to help! Get in touch with our team for support, questions, or to learn more about our services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="(904) 555-1234"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="provider">Provider Registration</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                We're here to help you find the perfect service provider for your home. 
                Reach out to us through any of the channels below.
              </p>
              
              <div className="space-y-8">
                {/* Office Location */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPinIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Office Location</h3>
                    <p className="text-neutral-600">
                      123 Main Street<br />
                      Jacksonville, FL 32202<br />
                      United States
                    </p>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <PhoneIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Phone</h3>
                    <p className="text-neutral-600">
                      <a href="tel:+19045551234" className="hover:text-primary-600 transition-colors">
                        (904) 555-1234
                      </a>
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">
                      Monday - Friday: 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <EnvelopeIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Email</h3>
                    <p className="text-neutral-600">
                      <a href="mailto:hello@jacksonvillehomeprofessionals.com" className="hover:text-primary-600 transition-colors">
                        hello@jacksonvillehomeprofessionals.com
                      </a>
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
                
                {/* Hours */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <ClockIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Business Hours</h3>
                    <div className="text-neutral-600 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="mt-12 bg-neutral-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link 
                    href="/how-it-works"
                    className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
                  >
                    <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                    How It Works
                  </Link>
                  <Link 
                    href="/about"
                    className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
                  >
                    <UserGroupIcon className="w-4 h-4 mr-2" />
                    About Us
                  </Link>
                  <Link 
                    href="/providers"
                    className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
                  >
                    <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                    For Providers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600">
              Find quick answers to common questions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                How quickly do you respond to inquiries?
              </h3>
              <p className="text-neutral-600">
                We typically respond to all inquiries within 24 hours during business days. 
                For urgent matters, please call us directly.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Can I visit your office?
              </h3>
              <p className="text-neutral-600">
                Yes! We welcome visitors during business hours. Please call ahead to schedule 
                an appointment to ensure someone is available to assist you.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Do you offer emergency support?
              </h3>
              <p className="text-neutral-600">
                For urgent home service needs, we can help connect you with emergency service 
                providers. Call us anytime for immediate assistance.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                How can providers join your platform?
              </h3>
              <p className="text-neutral-600">
                Service providers can apply to join our platform through our provider registration 
                process. Visit our "For Providers" page to learn more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of Jacksonville homeowners who trust us to connect them with 
            reliable, local service providers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/search"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-neutral-100 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <MapPinIcon className="w-5 h-5 mr-2" />
              Find a Provider
            </Link>
            <Link 
              href="/how-it-works"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
