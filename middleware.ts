import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log('Middleware - Path:', path)
  
  // Handle admin routes with simple authentication
  if (path.startsWith('/admin')) {
    console.log('Middleware - Admin route detected')
    
    // Always allow admin login pages
    if (path === '/admin/login' || path === '/admin/simple-login') {
      console.log('Middleware - Allowing admin login page')
      return NextResponse.next()
    }
    
    // Check for admin session on other admin routes
    const adminSession = request.cookies.get('admin-session')?.value
    console.log('Middleware - Admin session exists:', !!adminSession)
    
    if (!adminSession) {
      console.log('Middleware - No admin session, redirecting to simple login')
      const loginUrl = new URL('/admin/simple-login', request.url)
      return NextResponse.redirect(loginUrl)
    }
    
    console.log('Middleware - Admin session found, allowing access')
    return NextResponse.next()
  }
  
  // For non-admin routes, let NextAuth handle them
  console.log('Middleware - Non-admin route, allowing NextAuth to handle')
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 