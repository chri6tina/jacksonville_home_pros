import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  
  console.log('Middleware - Path:', request.nextUrl.pathname, 'IsAdminRoute:', isAdminRoute)
  
  // Skip admin login page itself and any debug pages
  if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname.startsWith('/debug-admin')) {
    console.log('Middleware - Skipping admin login/debug page')
    return NextResponse.next()
  }
  
  // TEMPORARY: Less strict middleware for debugging
  // Only redirect if accessing specific admin pages, not the main /admin route initially
  if (isAdminRoute && request.nextUrl.pathname !== '/admin') {
    const adminSession = request.cookies.get('admin-session')?.value
    
    console.log('Middleware - Admin session exists:', !!adminSession)
    
    if (!adminSession) {
      console.log('Middleware - No admin session, redirecting to login')
      // No admin session, redirect to admin login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  console.log('Middleware - Allowing access')
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 