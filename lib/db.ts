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

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '?pgbouncer=true&connection_limit=1&pool_timeout=20',
    },
  },
  // Log settings
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  // Improve error formatting
  errorFormat: 'pretty',
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 