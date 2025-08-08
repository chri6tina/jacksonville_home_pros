import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Attempt a simple query to test database connection
    const result = await prisma.$queryRaw`SELECT 1`;
    
    // Log the success and connection details 
    console.log('Database health check succeeded:', {
      result,
      dbUrl: process.env.DATABASE_URL?.split('@')[1], // Log only host part for security
    });

    return NextResponse.json({
      status: 'healthy',
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    // Log the error details
    console.error('Database health check failed:', {
      error: error.message,
      code: error.code,
      dbUrl: process.env.DATABASE_URL?.split('@')[1], // Log only host part for security
    });

    return NextResponse.json({
      status: 'unhealthy',
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
