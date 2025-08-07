import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { sign } from 'jsonwebtoken'

// Use a consistent secret
const JWT_SECRET = process.env.NEXTAUTH_SECRET || "jacksonville-home-pros-secret-key-2024"

export async function POST(request: NextRequest) {
  try {
    console.log('Admin login attempt starting...')
    
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    console.log('Looking for admin user:', email)

    // First, ensure we have an admin user (create if doesn't exist)
    let user = await prisma.user.findFirst({
      where: {
        email: email,
        role: 'ADMIN'
      }
    })

    // If no admin user exists, create one
    if (!user && email === 'admin@jacksonvillehomepros.com') {
      console.log('Creating admin user...')
      const hashedPassword = await bcrypt.hash('admin123', 12)
      
      user = await prisma.user.create({
        data: {
          email: 'admin@jacksonvillehomepros.com',
          name: 'Admin User',
          password: hashedPassword,
          role: 'ADMIN',
          emailVerified: new Date()
        }
      })
      console.log('Admin user created successfully')
    }

    if (!user || !user.password) {
      console.log('Invalid user or missing password')
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      console.log('Invalid password')
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('Password verified, creating token...')

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
    )

    // Set admin session cookie
    const cookieStore = await cookies()
    cookieStore.set('admin-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    console.log('Login successful')

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Admin login error:', error)
    
    // Enhanced error details
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error details:', errorMessage)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}