import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  
  console.log('Middleware - Path:', request.nextUrl.pathname, 'IsAdminRoute:', isAdminRoute)
  
  // Skip admin login page itself
  if (request.nextUrl.pathname === '/admin/login') {
    console.log('Middleware - Skipping admin login page')
    return NextResponse.next()
  }
  
  // If accessing admin routes, check for admin session
  if (isAdminRoute) {
    const adminSession = request.cookies.get('admin-session')?.value
    
    console.log('Middleware - Admin session exists:', !!adminSession)
    
    if (!adminSession) {
      console.log('Middleware - No admin session, redirecting to login')
      // No admin session, redirect to admin login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    console.log('Middleware - Admin session found, allowing access')
    // Admin session exists, allow access (JWT verification will be done in API routes)
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 