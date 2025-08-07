# Jacksonville Home Pros - Quick Start Guide

Get Jacksonville Home Pros up and running on your local machine in under 10 minutes!

## 🚀 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database
- **Git**

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd jacksonville_home_pros
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment template and configure your variables:

```bash
cp env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/jacksonville_home_pros"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Maps (Optional for development)
MAPBOX_ACCESS_TOKEN="your-mapbox-token"

# File Storage (Optional for development)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 4. Database Setup

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma db push
```

### 5. Seed the Database

Populate the database with sample data:

```bash
npx prisma db seed
```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 🧪 Sample Data

The seed script creates the following test data:

### Users
- **Homeowners**: john.doe@example.com, jane.smith@example.com
- **Providers**: mike.johnson@plumbingpros.com, sarah.wilson@coastalelectric.com
- **Password**: `password123` for all accounts

### Categories
- 24 primary service categories
- Secondary categories for Plumbing and Electrical
- Complete three-level taxonomy

### Providers
- Jacksonville Plumbing Pros (Jacksonville Beach)
- Coastal Electric Solutions (San Marco)

### Reviews & Bookings
- Sample reviews and ratings
- Test bookings with different statuses

## 🛠 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Database
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma db push   # Push schema changes
npx prisma db seed   # Seed database
npx prisma generate  # Generate Prisma client

# Testing (when implemented)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests
```

## 📁 Project Structure

```
jacksonville_home_pros/
├── app/                    # Next.js 14 app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API routes
│   ├── providers/         # Provider pages
│   ├── categories/        # Category pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   ├── providers/        # Provider components
│   ├── categories/       # Category components
│   ├── search/           # Search components
│   └── testimonials/     # Testimonial components
├── lib/                  # Utility functions
│   ├── db.ts            # Database client
│   └── utils.ts         # Helper functions
├── prisma/               # Database schema
│   ├── schema.prisma     # Prisma schema
│   └── seed.ts          # Seed script
├── types/                # TypeScript types
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🔧 Key Features Implemented

### ✅ Completed
- [x] Next.js 14 with TypeScript setup
- [x] Tailwind CSS with custom design system
- [x] Complete database schema with Prisma
- [x] Responsive homepage with hero section
- [x] Search functionality with autocomplete
- [x] Category and provider card components
- [x] Header and footer components
- [x] Jacksonville-inspired design system
- [x] Sample data and seed script
- [x] Basic routing structure

### 🚧 In Progress
- [ ] Authentication system (NextAuth.js)
- [ ] Provider registration flow
- [ ] Search results page
- [ ] Provider detail pages
- [ ] Booking system

### 📋 Planned
- [ ] Maps integration
- [ ] Review system
- [ ] Payment processing
- [ ] Admin dashboard
- [ ] Mobile optimization

## 🎨 Design System

The project uses a Jacksonville-inspired coastal color palette:

- **Primary Blue**: #0066CC (Ocean Blue)
- **Secondary Beige**: #F5F5DC (Sand Beige)
- **Accent Orange**: #FF6B35 (Coral Orange)
- **Neutral Gray**: #2C3E50 (Charcoal Gray)

## 🔍 Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Make sure PostgreSQL is running
sudo service postgresql start

# Check your DATABASE_URL in .env.local
# Format: postgresql://username:password@localhost:5432/database_name
```

**Prisma Client Error**
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset
```

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Port Already in Use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Getting Help

1. Check the [README.md](./README.md) for detailed documentation
2. Review the [ROADMAP.md](./ROADMAP.md) for implementation plan
3. Check existing issues in the repository
4. Create a new issue with detailed error information

## 🚀 Next Steps

1. **Set up authentication** - Implement NextAuth.js
2. **Create provider pages** - Build detailed provider profiles
3. **Add search functionality** - Implement advanced search and filters
4. **Integrate maps** - Add Mapbox for location services
5. **Build booking system** - Create appointment scheduling

## 📞 Support

For questions or issues:

- **Email**: support@jacksonvillehomepros.com
- **Documentation**: Check the README.md file
- **Issues**: Create an issue in the repository

---

Happy coding! 🏠✨ 