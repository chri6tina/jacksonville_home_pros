import { PrismaClient } from '@prisma/client'

// Enhanced database connection validation
export async function validateConnection() {
  try {
    const testClient = new PrismaClient()
    await testClient.$queryRaw`SELECT 1`
    await testClient.$disconnect()
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
      url: process.env.DATABASE_URL,
    },
  },
  // Serverless configuration for Vercel
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  // Connection pooling and retry settings
  errorFormat: 'pretty',
  transactionOptions: {
    maxWait: 5000, // 5 seconds
    timeout: 10000, // 10 seconds
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 