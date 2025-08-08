import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  console.log('Admin login attempt starting...');
  
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('Looking for admin user:', email);

    // Find the admin user
    const user = await prisma.user.findFirst({
      where: {
        email,
        role: 'ADMIN'
      }
    });

    if (!user) {
      console.log('Admin user not found');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password exists
    if (!user.password) {
      console.log('User has no password set');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password matches
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.log('Password verification failed');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Password verified, creating token...');

    // Create admin session token
    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set admin session cookie
    const cookieStore = cookies();
    await cookieStore.set('admin-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 hours
    });

    console.log('Login successful');

    return NextResponse.json({
      status: 'success',
      message: 'Logged in successfully'
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}