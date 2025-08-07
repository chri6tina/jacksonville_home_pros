import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    const email = process.argv[2] || 'admin@jacksonvillehomepros.com'
    const password = process.argv[3] || 'admin123'
    const name = process.argv[4] || 'Admin User'

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log(`User with email ${email} already exists`)
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date()
      }
    })

    console.log('Admin user created successfully:')
    console.log(`Email: ${adminUser.email}`)
    console.log(`Name: ${adminUser.name}`)
    console.log(`Role: ${adminUser.role}`)
    console.log(`ID: ${adminUser.id}`)

  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser() 