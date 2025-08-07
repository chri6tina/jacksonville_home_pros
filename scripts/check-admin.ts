import { prisma } from '../lib/db'

async function checkAdmin() {
  try {
    const admin = await prisma.user.findUnique({
      where: {
        email: 'admin@jacksonvillehomepros.com'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })

    console.log('Admin user:', admin)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAdmin()
