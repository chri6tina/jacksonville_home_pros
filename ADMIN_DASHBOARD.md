# Admin Dashboard Documentation

## Overview

The Jacksonville Home Pros admin dashboard provides comprehensive management tools for administrators to oversee the platform. It includes user management, provider oversight, category administration, and review moderation.

## Features

### 🔐 Authentication & Security
- **Role-based access control**: Only users with `ADMIN` role can access
- **Protected routes**: All admin routes are protected by middleware
- **Session management**: Secure authentication using NextAuth.js

### 📊 Dashboard Overview
- **Real-time statistics**: Live data from the database
- **Provider metrics**: Total, active, and pending providers
- **Review analytics**: Average ratings and total reviews
- **Recent activity**: Latest providers and category performance

### 👥 User Management (`/admin/users`)
- **User listing**: View all users (homeowners, providers, admins)
- **Search & filtering**: Find users by name, email, or role
- **User details**: View user information and associated data
- **Role management**: Manage user roles and permissions
- **Account status**: Monitor email verification status

### 🏢 Provider Management (`/admin/providers`)
- **Provider listing**: View all service providers
- **Profile management**: Edit provider information
- **Status tracking**: Monitor provider approval status
- **Business details**: Manage business profiles and services

### 📂 Category Management (`/admin/categories`)
- **Category hierarchy**: Manage three-level category system
- **Provider assignment**: Assign providers to categories
- **Performance metrics**: Track category statistics

### ⭐ Review Management (`/admin/reviews`)
- **Review moderation**: Approve, reject, or delete reviews
- **Content filtering**: Search reviews by content or business
- **Status management**: Track review approval status
- **Provider responses**: Monitor provider replies to reviews

## Getting Started

### 1. Create an Admin User

First, create an admin user account:

```bash
# Create admin with default credentials
npm run create-admin

# Or specify custom credentials
npm run create-admin admin@example.com mypassword "Admin Name"
```

Default credentials:
- Email: `admin@jacksonvillehomepros.com`
- Password: `admin123`
- Name: `Admin User`

### 2. Access the Dashboard

1. Navigate to `/admin` in your browser
2. Sign in with your admin credentials
3. You'll be redirected to the dashboard if authentication is successful

### 3. Environment Setup

Ensure these environment variables are set:

```env
# Database
DATABASE_URL="your-database-url"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## API Endpoints

### Dashboard Statistics
- `GET /api/admin/dashboard` - Get dashboard statistics and recent activity

### User Management
- `GET /api/admin/users` - List users with pagination and filtering
- `PUT /api/admin/users` - Update user information
- `DELETE /api/admin/users?userId=id` - Delete user account

### Review Management
- `GET /api/admin/reviews` - List reviews with pagination and filtering
- `PATCH /api/admin/reviews/[id]` - Update review status
- `DELETE /api/admin/reviews/[id]` - Delete review

## Security Features

### Middleware Protection
All admin routes are protected by middleware that:
- Verifies user authentication
- Checks for admin role
- Redirects unauthorized users to sign-in page

### API Security
All admin API endpoints:
- Validate admin role before processing requests
- Sanitize input data
- Return appropriate error responses

### Data Validation
- Input validation on all forms
- SQL injection protection via Prisma ORM
- XSS protection through React's built-in escaping

## User Roles

### ADMIN
- Full access to all admin features
- Can manage all users, providers, and content
- Can create other admin accounts

### PROVIDER
- Can manage their own business profile
- Can respond to reviews
- Limited access to admin features

### HOMEOWNER
- Can create reviews and bookings
- Can manage their own account
- No access to admin features

## Troubleshooting

### Common Issues

1. **"Unauthorized" Error**
   - Ensure you're signed in with an admin account
   - Check that your user has the `ADMIN` role
   - Verify your session is valid

2. **Database Connection Issues**
   - Check your `DATABASE_URL` environment variable
   - Ensure your database is running
   - Run `npx prisma db push` to sync schema

3. **Missing Data**
   - Run `npm run db:seed` to populate sample data
   - Check that your database has the required tables

### Support

For technical issues:
1. Check the browser console for errors
2. Review server logs for API errors
3. Verify environment variables are set correctly
4. Ensure database migrations are up to date

## Development

### Adding New Features

1. **Create new admin pages** in `app/admin/`
2. **Add API endpoints** in `app/api/admin/`
3. **Update navigation** in `components/layout/admin-layout.tsx`
4. **Add middleware protection** if needed

### Styling

The admin dashboard uses:
- **Tailwind CSS** for styling
- **Heroicons** for icons
- **Consistent design patterns** across all pages

### Testing

Test the admin dashboard by:
1. Creating test users with different roles
2. Adding sample providers and reviews
3. Testing all CRUD operations
4. Verifying role-based access control

## Roadmap

### Planned Features
- [ ] **Analytics Dashboard**: Advanced metrics and reporting
- [ ] **Bulk Operations**: Mass user/provider management
- [ ] **Audit Logs**: Track admin actions
- [ ] **Export Features**: Data export capabilities
- [ ] **Notification System**: Admin alerts and notifications

### Performance Optimizations
- [ ] **Caching**: Implement Redis caching for dashboard stats
- [ ] **Pagination**: Optimize large data sets
- [ ] **Search**: Add full-text search capabilities
- [ ] **Real-time Updates**: WebSocket integration for live data 