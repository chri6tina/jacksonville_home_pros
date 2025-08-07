# Jacksonville Home Pros

A comprehensive directory website for home service providers in the Jacksonville, Florida metro area. Homeowners can find and book local professionals for maintenance, repairs, remodeling, and other home services.

## 🏠 Features

### For Homeowners
- **Search & Discovery**: Find providers by service type, location, and ratings
- **Geolocation**: See nearby providers with interactive maps
- **Booking System**: Schedule appointments with real-time availability
- **Reviews & Ratings**: Read verified reviews from multiple platforms
- **Quote Requests**: Get estimates from multiple providers
- **User Dashboard**: Manage bookings, save favorites, and track service history

### For Service Providers
- **Profile Management**: Create and manage detailed business profiles
- **Booking Management**: Handle appointments and availability
- **Review Management**: Respond to reviews and manage reputation
- **Analytics Dashboard**: Track profile views, bookings, and leads
- **Service Area Management**: Define exact service coverage areas
- **Premium Features**: Enhanced visibility and marketing tools

### Core Functionality
- **Three-Level Category System**: Primary, secondary, and tertiary service categories
- **Advanced Search & Filters**: Location, service type, rating, availability, price range
- **Mobile-First Design**: Fully responsive with touch-friendly controls
- **SEO Optimized**: Schema.org structured data and location-specific landing pages
- **Secure Authentication**: User accounts with role-based access
- **Payment Integration**: Stripe for deposits and full payments

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Headless UI, Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Maps**: Mapbox GL JS
- **Payments**: Stripe
- **File Storage**: Cloudinary
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
jacksonville_home_pros/
├── app/                    # Next.js 14 app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API routes
│   ├── providers/         # Provider listing pages
│   ├── categories/        # Category pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   ├── maps/             # Map-related components
│   └── layout/           # Layout components
├── lib/                  # Utility functions and configurations
├── prisma/               # Database schema and migrations
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Mapbox API key
- Stripe account
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jacksonville_home_pros
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   MAPBOX_ACCESS_TOKEN="your-mapbox-token"
   STRIPE_SECRET_KEY="your-stripe-secret"
   STRIPE_PUBLISHABLE_KEY="your-stripe-publishable"
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses a comprehensive database schema with the following main entities:

- **Users**: Homeowners and service providers
- **Providers**: Business profiles with service areas
- **Categories**: Three-level service taxonomy
- **Reviews**: Multi-platform review aggregation
- **Bookings**: Appointment scheduling system
- **Locations**: Jacksonville neighborhoods and zip codes
- **Payments**: Transaction tracking

## 🎨 Design System

The design uses Jacksonville-inspired coastal colors:
- Primary: Ocean Blue (#0066CC)
- Secondary: Sand Beige (#F5F5DC)
- Accent: Coral Orange (#FF6B35)
- Neutral: Charcoal Gray (#2C3E50)

## 📱 Mobile Responsiveness

The site is built mobile-first with:
- Touch-friendly navigation
- Optimized map controls
- Tap-to-call functionality
- Responsive image galleries
- Accessible form controls

## 🔒 Security & Compliance

- SSL/TLS encryption
- Password hashing with bcrypt
- GDPR/CCPA compliance
- Data retention policies
- Secure payment processing
- Input validation and sanitization

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📈 SEO & Marketing

- Schema.org structured data
- Location-specific landing pages
- Blog with seasonal content
- NAP consistency across listings
- Meta tags optimization
- Sitemap generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@jacksonvillehomepros.com or create an issue in the repository.

---

Built with ❤️ for Jacksonville homeowners and service providers. 