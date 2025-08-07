import { NextResponse } from 'next/server'

export async function GET() {
  // Temporarily allow access for debugging (remove this later)
  // const isDev = process.env.NODE_ENV === 'development'
  // const debugKey = process.env.DEBUG_KEY
  
  // if (!isDev && debugKey !== 'debug123') {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }

  return NextResponse.json({
    NODE_ENV: process.env.NODE_ENV,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    databaseUrlPreview: process.env.DATABASE_URL ? 
      process.env.DATABASE_URL.substring(0, 50) + '...' : 'NOT SET',
    vercelEnv: process.env.VERCEL_ENV,
    vercelUrl: process.env.VERCEL_URL,
    timestamp: new Date().toISOString()
  })
}
