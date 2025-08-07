'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { 
  Bars3Icon, 
  XMarkIcon, 
  MagnifyingGlassIcon,
  UserIcon,
  HomeIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { SearchBar } from '@/components/search/search-bar'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/categories' },
  { name: 'Providers', href: '/providers' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-40">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <HomeIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">
                Jacksonville Home Pros
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>

            {/* User Menu */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700">
                    {session.user?.name || 'Account'}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-large border border-neutral-200 py-2">
                    <Link
                      href={session.user?.role === 'ADMIN' ? '/admin' : '/dashboard'}
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Cog6ToothIcon className="w-4 h-4 mr-3" />
                      {session.user?.role === 'ADMIN' ? 'Admin Dashboard' : 'Dashboard'}
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <UserIcon className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        signOut()
                        setUserMenuOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/signin" className="nav-link">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Provider Registration */}
            <Link href="/providers/register" className="btn-outline">
              <BuildingOfficeIcon className="w-4 h-4 mr-2" />
              List Your Business
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 text-neutral-400 hover:text-neutral-600"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu md:hidden">
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <HomeIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">
                Jacksonville Home Pros
              </span>
            </Link>
            <button
              type="button"
              className="p-2 text-neutral-400 hover:text-neutral-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="px-4 py-6 space-y-6">
            {/* Mobile Search */}
            <div className="mb-6">
              <SearchBar />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-lg font-medium text-neutral-700 hover:text-primary-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <hr className="border-neutral-200" />

            {/* Mobile User Menu */}
            {session ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">
                      {session.user?.name || 'Account'}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link
                    href={session.user?.role === 'ADMIN' ? '/admin' : '/dashboard'}
                    className="flex items-center p-3 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Cog6ToothIcon className="w-5 h-5 mr-3" />
                    {session.user?.role === 'ADMIN' ? 'Admin Dashboard' : 'Dashboard'}
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center p-3 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserIcon className="w-5 h-5 mr-3" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center w-full p-3 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/auth/signin"
                  className="block w-full text-center py-2 px-4 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block w-full text-center py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}

            <hr className="border-neutral-200" />

            {/* Provider Registration */}
            <Link
              href="/providers/register"
              className="flex items-center justify-center w-full py-3 px-4 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BuildingOfficeIcon className="w-5 h-5 mr-2" />
              List Your Business
            </Link>
          </div>
        </div>
      )}
    </header>
  )
} 