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
  let url = ensureSslParam(raw)
  // Use PgBouncer transaction pooler only in production (serverless)
  if (process.env.NODE_ENV === 'production') {
    // Ensure 6543 (transaction pooling) is used
    let pooled = url.includes(':6543') ? url : url.replace(':5432', ':6543')
    const params = 'pgbouncer=true&connection_limit=1&pool_timeout=20'
    if (pooled.includes('?')) {
      if (!pooled.includes('pgbouncer=true')) {
        pooled = pooled + (pooled.endsWith('?') || pooled.endsWith('&') ? '' : '&') + params
      }
    } else {
      pooled = pooled + '?' + params
    }
    return pooled
  }
  // In development, connect directly to 5432 for reliability
  return url
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