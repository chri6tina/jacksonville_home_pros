import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  StarIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="container-responsive py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Search Home Service Providers
            </h1>
            <p className="text-xl text-neutral-600">
              Find trusted professionals in Jacksonville, Florida
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-neutral-100 mb-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-neutral-700 mb-2">
                    What service do you need?
                  </label>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="e.g., plumbing, electrical, painting"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Jacksonville, FL"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-medium transition-colors"
                  >
                    <MagnifyingGlassIcon className="w-5 h-5 inline mr-2" />
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Popular Categories */}
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-neutral-100">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Popular Service Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Plumbing', icon: '🔧', slug: 'plumbing' },
                { name: 'Electrical', icon: '⚡', slug: 'electrical' },
                { name: 'HVAC', icon: '❄️', slug: 'hvac' },
                { name: 'Landscaping', icon: '🌿', slug: 'landscaping' },
                { name: 'Painting', icon: '🎨', slug: 'painting' },
                { name: 'Handyman', icon: '🔨', slug: 'handyman' },
                { name: 'Roofing', icon: '🏠', slug: 'roofing' },
                { name: 'Cleaning', icon: '🧹', slug: 'cleaning' }
              ].map((category) => (
                <a
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="flex flex-col items-center p-4 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  <span className="text-2xl mb-2">{category.icon}</span>
                  <span className="text-sm font-medium text-neutral-700 text-center">{category.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 