import { PrismaClient } from '@prisma/client'

// Enhanced database connection validation using existing client
export async function validateConnection() {
  try {
    // Use the existing prisma client instead of creating a new one
    await prisma.$queryRaw`SELECT 1`
    return { success: true }
  } catch (error: any) {
    console.error('Database connection failed:', error)
    return {
      success: false,
      error: error.message,
      code: error.code,
      meta: error.meta
    }
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function ensureSslParam(url: string): string {
  if (!url.includes('sslmode=')) {
    url += (url.includes('?') ? '&' : '?') + 'sslmode=require'
  }
  return url
}

function buildDatabaseUrl(raw?: string): string | undefined {
  if (!raw) return undefined

  // Always ensure sslmode=require
  let urlString = ensureSslParam(raw)

  // Prefer robust URL mutation; fall back to string ops if parsing fails
  try {
    const parsed = new URL(urlString)

    if (process.env.NODE_ENV === 'production') {
      // Force pooled port 6543 even if the original URL had no explicit port
      parsed.port = '6543'
      // Required params for transaction pooling
      parsed.searchParams.set('pgbouncer', 'true')
      parsed.searchParams.set('connection_limit', '1')
      parsed.searchParams.set('pool_timeout', '20')
    }

    // Ensure sslmode=require (again, in case URL parsing normalized it)
    if (parsed.searchParams.get('sslmode') !== 'require') {
      parsed.searchParams.set('sslmode', 'require')
    }

    return parsed.toString()
  } catch {
    // Fallback: original behavior with safer replacements
    if (process.env.NODE_ENV === 'production') {
      let pooled = urlString
      if (!pooled.includes(':6543')) {
        // Insert :6543 after host if no explicit port is present
        pooled = pooled.includes(':5432')
          ? pooled.replace(':5432', ':6543')
          : pooled.replace('.supabase.co', '.supabase.co:6543')
      }
      const extras = ['pgbouncer=true', 'connection_limit=1', 'pool_timeout=20']
      const hasQuery = pooled.includes('?')
      const separator = hasQuery ? (pooled.endsWith('?') || pooled.endsWith('&') ? '' : '&') : '?'
      const missing = extras.filter((e) => !pooled.includes(e)).join('&')
      if (missing) pooled = pooled + separator + missing
      return pooled
    }
    return urlString
  }
}

const databaseUrl = buildDatabaseUrl(process.env.DATABASE_URL)

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error', 'warn'],
  errorFormat: 'pretty',
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 