'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  CheckIcon, 
  StarIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  CalendarIcon,
  PhoneIcon
} from '@heroicons/react/24/solid'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState('monthly')

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Premium',
      price: '$29.99',
      period: 'month',
      popular: false,
      features: [
        'Accept online bookings from customers',
        'Priority listing in search results',
        'Enhanced profile with more photos',
        'Customer review management',
        'Booking calendar integration',
        'Email notifications for new bookings'
      ]
    },
    {
      id: 'annual',
      name: 'Annual Premium',
      price: '$299.99',
      period: 'year',
      popular: true,
      features: [
        'All monthly features',
        '2 months free (save $59.98)',
        'Featured provider badge',
        'Advanced analytics dashboard',
        'Priority customer support',
        'Custom booking forms'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="container-responsive py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Upgrade Your Provider Profile
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Get more bookings and grow your business with our premium provider features. 
            Accept online bookings and stand out from the competition.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Online Bookings</h3>
            <p className="text-neutral-600">Accept bookings 24/7 and never miss a potential customer.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <StarIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Priority Listing</h3>
            <p className="text-neutral-600">Get featured at the top of search results and category pages.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneIcon className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Enhanced Profile</h3>
            <p className="text-neutral-600">Showcase your work with more photos and detailed information.</p>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-xl shadow-soft border-2 p-8 ${
                  plan.popular 
                    ? 'border-primary-500 ring-2 ring-primary-100' 
                    : 'border-neutral-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-neutral-900">{plan.price}</span>
                    <span className="text-neutral-600">/{plan.period}</span>
                  </div>
                  {plan.popular && (
                    <p className="text-sm text-green-600 font-medium">Save $59.98 annually</p>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl shadow-soft p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Ready to Get More Bookings?
            </h2>
            <p className="text-neutral-600 mb-6">
              Join hundreds of successful providers who trust Jacksonville Home Pros to grow their business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                Start Premium Trial
              </button>
              <Link 
                href="/"
                className="border border-neutral-300 text-neutral-700 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 