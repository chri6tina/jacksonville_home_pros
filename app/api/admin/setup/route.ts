import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    console.log('Admin setup POST - Starting...')
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
    console.log('DATABASE_URL preview:', process.env.DATABASE_URL?.substring(0, 50))
    
    // Test database connection first
    await prisma.$connect()
    console.log('Database connection successful')
    
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: 'admin@jacksonvillehomepros.com',
        role: 'ADMIN'
      }
    })

    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.id)
      return NextResponse.json({
        success: true,
        message: 'Admin user already exists',
        user: {
          id: existingAdmin.id,
          email: existingAdmin.email,
          name: existingAdmin.name,
          role: existingAdmin.role
        }
      })
    }

    console.log('Creating new admin user...')
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@jacksonvillehomepros.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date()
      }
    })

    console.log('Admin user created successfully:', adminUser.id)
    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      }
    })

  } catch (error) {
    console.error('Admin setup error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to setup admin user',
        details: error instanceof Error ? error.message : 'Unknown error',
        environment: process.env.NODE_ENV,
        hasDatabaseUrl: !!process.env.DATABASE_URL
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET(request: NextRequest) {
  try {
    // Test database connection and check for admin user
    const adminUser = await prisma.user.findFirst({
      where: {
        email: 'admin@jacksonvillehomepros.com',
        role: 'ADMIN'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    })

    if (adminUser) {
      return NextResponse.json({
        success: true,
        message: 'Database connected and admin user exists',
        user: adminUser
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Database connected but no admin user found'
      })
    }

  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
