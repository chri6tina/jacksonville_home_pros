const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data (with error handling for missing tables)
  try {
    await prisma.analytics.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.payment.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.quoteResponse.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.quoteRequest.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.favorite.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.reviewReply.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.reviewImage.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.review.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.booking.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.providerImage.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.operatingHours.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.serviceArea.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.providerService.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.provider.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.category.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.location.deleteMany()
  } catch (e) {}
  
  try {
    await prisma.user.deleteMany()
  } catch (e) {}

  console.log('🗑️  Cleared existing data')

  // Create Jacksonville locations
  const locations = [
    { name: 'Jacksonville Beach', type: 'NEIGHBORHOOD' as const, zipCode: '32250', latitude: 30.2949, longitude: -81.3931 },
    { name: 'San Marco', type: 'NEIGHBORHOOD' as const, zipCode: '32207', latitude: 30.3158, longitude: -81.6557 },
    { name: 'Riverside', type: 'NEIGHBORHOOD' as const, zipCode: '32205', latitude: 30.3294, longitude: -81.6598 },
    { name: 'Avondale', type: 'NEIGHBORHOOD' as const, zipCode: '32205', latitude: 30.3187, longitude: -81.6737 },
    { name: 'Murray Hill', type: 'NEIGHBORHOOD' as const, zipCode: '32205', latitude: 30.3087, longitude: -81.6737 },
    { name: 'Springfield', type: 'NEIGHBORHOOD' as const, zipCode: '32206', latitude: 30.3294, longitude: -81.6598 },
    { name: 'Arlington', type: 'NEIGHBORHOOD' as const, zipCode: '32211', latitude: 30.3294, longitude: -81.6598 },
    { name: 'Mandarin', type: 'NEIGHBORHOOD' as const, zipCode: '32223', latitude: 30.1595, longitude: -81.6598 },
    { name: 'Southside', type: 'NEIGHBORHOOD' as const, zipCode: '32216', latitude: 30.2595, longitude: -81.6598 },
    { name: 'Orange Park', type: 'CITY' as const, zipCode: '32073', latitude: 30.1669, longitude: -81.7065 },
    { name: 'Fleming Island', type: 'CITY' as const, zipCode: '32003', latitude: 30.0930, longitude: -81.7187 },
    { name: 'Ponte Vedra Beach', type: 'CITY' as const, zipCode: '32082', latitude: 30.2394, longitude: -81.3856 },
  ]

  for (const location of locations) {
    await prisma.location.create({
      data: location
    })
  }

  console.log('📍 Created Jacksonville locations')

  // Create primary categories with specific sort orders
  const primaryCategories = [
    { name: 'Plumbing', slug: 'plumbing', description: 'Plumbing installation and repair', icon: '🔧', level: 'PRIMARY' as const, sortOrder: 1 },
    { name: 'Electrical', slug: 'electrical', description: 'Electrical installation and repair', icon: '⚡', level: 'PRIMARY' as const, sortOrder: 2 },
    { name: 'HVAC & Air Conditioning', slug: 'hvac', description: 'Heating and cooling systems', icon: '❄️', level: 'PRIMARY' as const, sortOrder: 3 },
    { name: 'Painting', slug: 'painting', description: 'Interior and exterior painting services', icon: '🎨', level: 'PRIMARY' as const, sortOrder: 4 },
    { name: 'General Handyman & Maintenance', slug: 'handyman', description: 'General repair and maintenance', icon: '🔧', level: 'PRIMARY' as const, sortOrder: 5 },
    { name: 'Landscaping & Yard Work', slug: 'landscaping', description: 'Landscape design and maintenance', icon: '🌿', level: 'PRIMARY' as const, sortOrder: 6 },
    { name: 'Cleaning & Housekeeping', slug: 'cleaning', description: 'House cleaning services', icon: '🧹', level: 'PRIMARY' as const, sortOrder: 7 },
    { name: 'Roofing & Gutters', slug: 'roofing', description: 'Roof repair and gutter services', icon: '🏠', level: 'PRIMARY' as const, sortOrder: 8 },
    { name: 'Remodeling & Home Improvement', slug: 'remodeling', description: 'Home renovation services', icon: '🏗️', level: 'PRIMARY' as const, sortOrder: 9 },
    { name: 'Carpentry', slug: 'carpentry', description: 'Custom woodwork and repairs', icon: '🔨', level: 'PRIMARY' as const, sortOrder: 10 },
    { name: 'Moving & Storage', slug: 'moving', description: 'Moving and storage services', icon: '📦', level: 'PRIMARY' as const, sortOrder: 11 },
    { name: 'Pest Control & Inspections', slug: 'pest-control', description: 'Pest control and inspections', icon: '🐜', level: 'PRIMARY' as const, sortOrder: 12 },
    { name: 'Pressure Washing', slug: 'pressure-washing', description: 'Exterior cleaning services', icon: '💧', level: 'PRIMARY' as const, sortOrder: 13 },
    { name: 'Tiling', slug: 'tiling', description: 'Tile installation and repair', icon: '🧱', level: 'PRIMARY' as const, sortOrder: 14 },
    { name: 'Drywall & Wall Finishing', slug: 'drywall', description: 'Wall installation and finishing', icon: '🧱', level: 'PRIMARY' as const, sortOrder: 15 },
    { name: 'Fences & Gates', slug: 'fences', description: 'Fence installation and repair', icon: '🚪', level: 'PRIMARY' as const, sortOrder: 16 },
    { name: 'Door Repair & Installation', slug: 'doors', description: 'Door installation and repair', icon: '🚪', level: 'PRIMARY' as const, sortOrder: 17 },
    { name: 'Window Coverings & Treatments', slug: 'window-coverings', description: 'Blinds, curtains, and treatments', icon: '🪟', level: 'PRIMARY' as const, sortOrder: 18 },
    { name: 'Smart Home & Technology', slug: 'smart-home', description: 'Smart home installation', icon: '🏠', level: 'PRIMARY' as const, sortOrder: 19 },
    { name: 'Furniture Assembly', slug: 'furniture-assembly', description: 'Furniture assembly services', icon: '🪑', level: 'PRIMARY' as const, sortOrder: 20 },
    { name: 'Small Appliance Installation', slug: 'appliance-installation', description: 'Appliance installation', icon: '📺', level: 'PRIMARY' as const, sortOrder: 21 },
    { name: 'Senior Home Modifications', slug: 'senior-modifications', description: 'Accessibility modifications', icon: '👴', level: 'PRIMARY' as const, sortOrder: 22 },
    { name: 'Baby-proofing', slug: 'baby-proofing', description: 'Child safety installations', icon: '👶', level: 'PRIMARY' as const, sortOrder: 23 },
  ]

  const createdPrimaryCategories = []
  for (const category of primaryCategories) {
    const created = await prisma.category.create({
      data: category
    })
    createdPrimaryCategories.push(created)
  }

  console.log('📂 Created primary categories')

  // Create secondary categories for Plumbing
  const plumbingCategory = createdPrimaryCategories.find(c => c.slug === 'plumbing')
  if (plumbingCategory) {
    const plumbingSubCategories = [
      { name: 'Faucet Replacement', slug: 'faucet-replacement', description: 'Kitchen and bathroom faucet installation', icon: '🚰', level: 'SECONDARY' as const, parentId: plumbingCategory.id, sortOrder: 1 },
      { name: 'Drain Cleaning', slug: 'drain-cleaning', description: 'Clogged drain cleaning services', icon: '🛁', level: 'SECONDARY' as const, parentId: plumbingCategory.id, sortOrder: 2 },
      { name: 'Toilet Repair', slug: 'toilet-repair', description: 'Toilet installation and repair', icon: '🚽', level: 'SECONDARY' as const, parentId: plumbingCategory.id, sortOrder: 3 },
      { name: 'Water Heater Installation', slug: 'water-heater-installation', description: 'Water heater installation and repair', icon: '🔥', level: 'SECONDARY' as const, parentId: plumbingCategory.id, sortOrder: 4 },
      { name: 'Pipe Repair', slug: 'pipe-repair', description: 'Leaky pipe repair services', icon: '🔧', level: 'SECONDARY' as const, parentId: plumbingCategory.id, sortOrder: 5 },
    ]

    for (const subCategory of plumbingSubCategories) {
      await prisma.category.create({
        data: subCategory
      })
    }
  }

  // Create secondary categories for Electrical
  const electricalCategory = createdPrimaryCategories.find(c => c.slug === 'electrical')
  if (electricalCategory) {
    const electricalSubCategories = [
      { name: 'Light Fixture Installation', slug: 'light-fixture-installation', description: 'Light fixture installation and repair', icon: '💡', level: 'SECONDARY' as const, parentId: electricalCategory.id, sortOrder: 1 },
      { name: 'Outlet Installation', slug: 'outlet-installation', description: 'Electrical outlet installation', icon: '🔌', level: 'SECONDARY' as const, parentId: electricalCategory.id, sortOrder: 2 },
      { name: 'Ceiling Fan Installation', slug: 'ceiling-fan-installation', description: 'Ceiling fan installation and repair', icon: '🌀', level: 'SECONDARY' as const, parentId: electricalCategory.id, sortOrder: 3 },
      { name: 'Electrical Panel Upgrade', slug: 'electrical-panel-upgrade', description: 'Electrical panel upgrades', icon: '⚡', level: 'SECONDARY' as const, parentId: electricalCategory.id, sortOrder: 4 },
      { name: 'Wiring Installation', slug: 'wiring-installation', description: 'New electrical wiring installation', icon: '🔌', level: 'SECONDARY' as const, parentId: electricalCategory.id, sortOrder: 5 },
    ]

    for (const subCategory of electricalSubCategories) {
      await prisma.category.create({
        data: subCategory
      })
    }
  }

  console.log('📂 Created secondary categories')

  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 12)

  const users = [
    {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: hashedPassword,
      phone: '(904) 555-0101',
      role: 'HOMEOWNER' as const,
    },
    {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: hashedPassword,
      phone: '(904) 555-0102',
      role: 'HOMEOWNER' as const,
    },
    {
      email: 'mike.johnson@plumbingpros.com',
      name: 'Mike Johnson',
      password: hashedPassword,
      phone: '(904) 555-0201',
      role: 'PROVIDER' as const,
    },
    {
      email: 'sarah.wilson@coastalelectric.com',
      name: 'Sarah Wilson',
      password: hashedPassword,
      phone: '(904) 555-0202',
      role: 'PROVIDER' as const,
    },
  ]

  const createdUsers = []
  for (const user of users) {
    const created = await prisma.user.create({
      data: user
    })
    createdUsers.push(created)
  }

  console.log('👥 Created sample users')

  // Create sample providers with different positioning
  const providers = [
    {
      userId: createdUsers[2].id,
      businessName: 'Jacksonville Plumbing Pros',
      slug: 'jacksonville-plumbing-pros',
      description: 'Licensed and insured plumbing services for residential and commercial properties. We specialize in emergency repairs, installations, and maintenance.',
      phone: '(904) 555-0201',
      website: 'https://jacksonvilleplumbingpros.com',
      address: '123 Beach Blvd',
      zipCode: '32250',
      latitude: 30.2949,
      longitude: -81.3931,
      serviceRadius: 25,
      licenseNumber: 'FL123456789',
      insuranceStatus: true,
      verified: true,
      premium: true,
      featured: true,
      sortOrder: 1, // #1 position
    },
    {
      userId: createdUsers[3].id,
      businessName: 'Coastal Electric Solutions',
      slug: 'coastal-electric-solutions',
      description: 'Professional electrical services with 15+ years of experience in Jacksonville. Licensed, bonded, and insured for your peace of mind.',
      phone: '(904) 555-0202',
      website: 'https://coastalelectricsolutions.com',
      address: '456 San Marco Blvd',
      zipCode: '32207',
      latitude: 30.3158,
      longitude: -81.6557,
      serviceRadius: 30,
      licenseNumber: 'FL987654321',
      insuranceStatus: true,
      verified: true,
      premium: true,
      featured: true,
      sortOrder: 2, // #2 position
    },
    {
      userId: createdUsers[0].id, // Reuse existing user
      businessName: 'Sparkle Clean Pro',
      slug: 'sparkle-clean-pro',
      description: 'Professional cleaning services for homes and offices in Jacksonville. We offer regular cleaning, deep cleaning, and move-in/move-out services.',
      phone: '(904) 555-0203',
      website: 'https://sparklecleanpro.com',
      address: '789 Riverside Ave',
      zipCode: '32205',
      latitude: 30.3294,
      longitude: -81.6598,
      serviceRadius: 20,
      licenseNumber: 'FL111222333',
      insuranceStatus: true,
      verified: true,
      premium: false,
      featured: false,
      sortOrder: 3, // #3 position
    },
  ]

  const createdProviders = []
  for (const provider of providers) {
    const created = await prisma.provider.create({
      data: provider
    })
    createdProviders.push(created)
  }

  console.log('🏢 Created sample providers')

  // Create provider services
  const plumbingServices = [
    { providerId: createdProviders[0].id, categoryId: plumbingCategory!.id, description: 'General plumbing services' },
  ]

  const electricalServices = [
    { providerId: createdProviders[1].id, categoryId: electricalCategory!.id, description: 'General electrical services' },
  ]

  // Find cleaning category
  const cleaningCategory = createdPrimaryCategories.find(c => c.slug === 'cleaning')
  const cleaningServices = cleaningCategory ? [
    { providerId: createdProviders[2].id, categoryId: cleaningCategory.id, description: 'Professional cleaning services' },
  ] : []

  for (const service of [...plumbingServices, ...electricalServices, ...cleaningServices]) {
    await prisma.providerService.create({
      data: service
    })
  }

  console.log('🔧 Created provider services')

  // Create sample reviews
  const reviews = [
    {
      providerId: createdProviders[0].id,
      userId: createdUsers[0].id,
      rating: 5,
      title: 'Excellent Plumbing Service',
      content: 'Mike and his team were professional, on-time, and did excellent work. Fixed our leaky faucet quickly and cleaned up after themselves.',
      quality: 5,
      timeliness: 5,
      value: 5,
      verified: true,
      source: 'ONSITE' as const,
    },
    {
      providerId: createdProviders[1].id,
      userId: createdUsers[1].id,
      rating: 5,
      title: 'Great Electrical Work',
      content: 'Sarah was knowledgeable and professional. Installed our new ceiling fan perfectly and the price was fair.',
      quality: 5,
      timeliness: 5,
      value: 4,
      verified: true,
      source: 'ONSITE' as const,
    },
  ]

  for (const review of reviews) {
    await prisma.review.create({
      data: review
    })
  }

  console.log('⭐ Created sample reviews')

  // Create sample bookings
  const bookings = [
    {
      providerId: createdProviders[0].id,
      userId: createdUsers[0].id,
      date: new Date('2024-01-15'),
      startTime: '09:00',
      endTime: '11:00',
      duration: 120,
      status: 'COMPLETED' as const,
      notes: 'Faucet replacement in kitchen',
      address: '123 Main St, Jacksonville Beach, FL 32250',
      totalPrice: 170,
    },
    {
      providerId: createdProviders[1].id,
      userId: createdUsers[1].id,
      date: new Date('2024-01-20'),
      startTime: '14:00',
      endTime: '16:00',
      duration: 120,
      status: 'CONFIRMED' as const,
      notes: 'Ceiling fan installation in living room',
      address: '456 Oak Ave, San Marco, FL 32207',
      totalPrice: 190,
    },
  ]

  for (const booking of bookings) {
    await prisma.booking.create({
      data: booking
    })
  }

  console.log('📅 Created sample bookings')

  console.log('✅ Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 