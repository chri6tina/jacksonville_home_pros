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

function buildPooledDatabaseUrl(raw?: string): string | undefined {
  if (!raw) return undefined
  // Ensure 6543 (transaction pooling) is used
  let pooled = raw.includes(':6543') ? raw : raw.replace(':5432', ':6543')
  const params = 'pgbouncer=true&connection_limit=1&pool_timeout=20'
  // Append params correctly whether or not a query already exists
  if (pooled.includes('?')) {
    // Avoid duplicating params if already present
    if (!pooled.includes('pgbouncer=true')) {
      pooled = pooled + (pooled.endsWith('?') || pooled.endsWith('&') ? '' : '&') + params
    }
  } else {
    pooled = pooled + '?' + params
  }
  return pooled
}

const pooledUrl = buildPooledDatabaseUrl(process.env.DATABASE_URL)

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: pooledUrl,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error', 'warn'],
  errorFormat: 'pretty',
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 