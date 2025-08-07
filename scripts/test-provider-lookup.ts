import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testProviderLookup() {
  try {
    console.log('Testing provider lookup by slug...')
    
    // Test lookup by slug
    const provider = await prisma.provider.findUnique({
      where: { slug: 'david-gray-plumbing' },
      include: {
        services: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        },
        images: true
      }
    })

    if (provider) {
      console.log('✅ Provider found by slug:')
      console.log(`- Business Name: ${provider.businessName}`)
      console.log(`- Slug: ${provider.slug}`)
      console.log(`- Services: ${provider.services.length}`)
      console.log(`- Images: ${provider.images.length}`)
    } else {
      console.log('❌ Provider not found by slug')
    }

    // Test lookup by ID
    const providerById = await prisma.provider.findUnique({
      where: { id: 'cme0p6vzt000311rscvwn4onf' }
    })

    if (providerById) {
      console.log('✅ Provider found by ID:')
      console.log(`- Business Name: ${providerById.businessName}`)
      console.log(`- Slug: ${providerById.slug}`)
    } else {
      console.log('❌ Provider not found by ID')
    }

  } catch (error) {
    console.error('Error testing provider lookup:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testProviderLookup() 