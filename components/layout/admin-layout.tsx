'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  StarIcon,
  UsersIcon,
  ChartBarIcon,
  PlusIcon,
  HomeIcon,
  ArrowLeftIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  showBackButton?: boolean
  backUrl?: string
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: ChartBarIcon },
  { name: 'Providers', href: '/admin/providers', icon: BuildingOfficeIcon },
  { name: 'Categories', href: '/admin/categories', icon: WrenchScrewdriverIcon },
  { name: 'Reviews', href: '/admin/reviews', icon: StarIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
]

export default function AdminLayout({ 
  children, 
  title, 
  subtitle, 
  showBackButton = false,
  backUrl = '/admin'
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = []
    
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      const path = '/' + segments.slice(0, i + 1).join('/')
      
      if (segment === 'admin') {
        breadcrumbs.push({ name: 'Admin', href: path })
      } else if (segment === 'providers') {
        breadcrumbs.push({ name: 'Providers', href: path })
      } else if (segment === 'categories') {
        breadcrumbs.push({ name: 'Categories', href: path })
      } else if (segment === 'new') {
        breadcrumbs.push({ name: 'New', href: path })
      } else if (segment === 'edit') {
        breadcrumbs.push({ name: 'Edit', href: path })
      } else if (segment === 'reviews') {
        breadcrumbs.push({ name: 'Reviews', href: path })
      } else if (segment === 'users') {
        breadcrumbs.push({ name: 'Users', href: path })
      }
    }
    
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              {/* Breadcrumbs */}
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                  {breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.href}>
                      <div className="flex items-center">
                        {index > 0 && (
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                          </svg>
                        )}
                        <Link
                          href={breadcrumb.href}
                          className={`ml-4 text-sm font-medium ${
                            index === breadcrumbs.length - 1
                              ? 'text-gray-500 cursor-default'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {breadcrumb.name}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Logout button */}
              <button
                onClick={() => {
                  // Clear admin session cookie
                  document.cookie = 'admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
                  // Redirect to admin login
                  window.location.href = '/admin/login'
                }}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Logout
              </button>
              
              {/* Back to main site */}
              <Link
                href="/"
                className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center"
              >
                <HomeIcon className="h-4 w-4 mr-1" />
                Back to Site
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Page header */}
            {(title || showBackButton) && (
              <div className="mb-6">
                {showBackButton && (
                  <Link
                    href={backUrl}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
                  >
                    <ArrowLeftIcon className="h-4 w-4 mr-1" />
                    Back
                  </Link>
                )}
                {title && (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    {subtitle && (
                      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Page content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 