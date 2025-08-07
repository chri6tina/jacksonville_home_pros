import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret'

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  
  // Skip admin login page itself
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }
  
  // If accessing admin routes, check for admin session
  if (isAdminRoute) {
    const adminSession = request.cookies.get('admin-session')?.value
    
    if (!adminSession) {
      // No admin session, redirect to admin login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    try {
      // Verify admin session token
      const decoded = verify(adminSession, JWT_SECRET) as any
      
      if (!decoded || decoded.role !== 'ADMIN') {
        // Invalid or non-admin session, redirect to admin login
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      
      // Valid admin session, allow access
      return NextResponse.next()
    } catch (error) {
      // Invalid token, redirect to admin login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 
} 