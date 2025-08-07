import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret'

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
    
    try {
      // Verify admin session token
      const decoded = verify(adminSession, JWT_SECRET) as any
      
      console.log('Middleware - Decoded token:', { role: decoded?.role, email: decoded?.email })
      
      if (!decoded || decoded.role !== 'ADMIN') {
        console.log('Middleware - Invalid role, redirecting to login')
        // Invalid or non-admin session, redirect to admin login
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      
      console.log('Middleware - Valid admin session, allowing access')
      // Valid admin session, allow access
      return NextResponse.next()
    } catch (error) {
      console.log('Middleware - JWT verification error:', error)
      // Invalid token, redirect to admin login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 