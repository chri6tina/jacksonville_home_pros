import { NextResponse } from 'next/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { validateConnection } from './db';

export async function withErrorHandling(action: () => Promise<any>) {
  try {
    // Check database connection first
    const dbStatus = await validateConnection();
    if (!dbStatus.success) {
      console.error('Database connection failed:', dbStatus);
      return NextResponse.json(
        {
          error: 'Database connection error',
          details: 'Unable to connect to the database. Please try again later.',
        },
        { status: 503 }
      );
    }

    // Execute the action
    const result = await action();
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);

    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 });
    }

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          error: 'Database operation failed',
          details: error.message,
          code: error.code
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
