import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkSlugs() {
  try {
    const providers = await prisma.provider.findMany({
      select: {
        id: true,
        businessName: true,
        slug: true
      }
    })

    console.log('Provider slugs:')
    providers.forEach(provider => {
      console.log(`${provider.businessName} -> /providers/${provider.slug}`)
    })
  } catch (error) {
    console.error('Error checking slugs:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkSlugs() 