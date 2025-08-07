'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { 
  UserIcon, 
  BuildingOfficeIcon, 
  ClockIcon, 
  StarIcon,
  CalendarIcon,
  HeartIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const isProvider = session.user.role === 'PROVIDER'

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Welcome back, {session.user.name}!
          </h1>
          <p className="text-neutral-600">
            {isProvider ? 'Manage your business and services' : 'Find and book home services'}
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-soft border border-neutral-100">
                <div className="flex items-center">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <CalendarIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral-600">Recent Activity</p>
                    <p className="text-2xl font-bold text-neutral-900">
                      {isProvider ? '12' : '3'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border border-neutral-100">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <StarIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral-600">
                      {isProvider ? 'Reviews' : 'Favorites'}
                    </p>
                    <p className="text-2xl font-bold text-neutral-900">
                      {isProvider ? '24' : '8'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border border-neutral-100">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ClockIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral-600">
                      {isProvider ? 'Pending' : 'Upcoming'}
                    </p>
                    <p className="text-2xl font-bold text-neutral-900">
                      {isProvider ? '5' : '2'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-soft border border-neutral-100">
              <div className="p-6 border-b border-neutral-100">
                <h2 className="text-xl font-semibold text-neutral-900">
                  Recent Activity
                </h2>
              </div>
              <div className="p-6">
                {isProvider ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <StarIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">
                          New 5-star review from Sarah M.
                        </p>
                        <p className="text-sm text-neutral-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <CalendarIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">
                          New booking request for plumbing service
                        </p>
                        <p className="text-sm text-neutral-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <CalendarIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">
                          Scheduled appointment with Coastal Electric
                        </p>
                        <p className="text-sm text-neutral-500">Tomorrow at 2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <HeartIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">
                          Added Sunshine Painting to favorites
                        </p>
                        <p className="text-sm text-neutral-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Claim Business Section - Only for non-providers */}
            {!isProvider && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-soft border border-blue-200">
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-blue-900 mb-2">
                        Own a Business?
                      </h2>
                      <p className="text-blue-800 mb-4">
                        Claim your existing business profile or create a new one to start managing your services.
                      </p>
                      <div className="flex space-x-3">
                        <Link
                          href="/dashboard/claim-business"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
                        >
                          <PlusIcon className="w-4 h-4 mr-2" />
                          Claim Business
                        </Link>
                        <Link
                          href="/providers/register"
                          className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-sm"
                        >
                          Create New
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Info */}
            <div className="bg-white rounded-xl p-6 shadow-soft border border-neutral-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  {isProvider ? (
                    <BuildingOfficeIcon className="w-6 h-6 text-primary-600" />
                  ) : (
                    <UserIcon className="w-6 h-6 text-primary-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{session.user.name}</h3>
                  <p className="text-sm text-neutral-500">{session.user.email}</p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                    {isProvider ? 'Service Provider' : 'Customer'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-soft border border-neutral-100">
              <div className="p-6 border-b border-neutral-100">
                <h3 className="text-lg font-semibold text-neutral-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                {isProvider ? (
                  <>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                      <p className="font-medium text-neutral-900">Update Profile</p>
                      <p className="text-sm text-neutral-500">Edit business information</p>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                      <p className="font-medium text-neutral-900">Manage Services</p>
                      <p className="text-sm text-neutral-500">Add or edit services</p>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                      <p className="font-medium text-neutral-900">View Bookings</p>
                      <p className="text-sm text-neutral-500">Check upcoming appointments</p>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                      <p className="font-medium text-neutral-900">Find Services</p>
                      <p className="text-sm text-neutral-500">Search for providers</p>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                      <p className="font-medium text-neutral-900">My Bookings</p>
                      <p className="text-sm text-neutral-500">View appointments</p>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                      <p className="font-medium text-neutral-900">Favorites</p>
                      <p className="text-sm text-neutral-500">Saved providers</p>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 