import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixAdminRole() {
  try {
    // Update admin user to ensure ADMIN role
    const updatedUser = await prisma.user.update({
      where: {
        email: 'admin@jacksonvillehomepros.com'
      },
      data: {
        role: 'ADMIN'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })

    console.log('Updated admin user:', updatedUser)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixAdminRole()
