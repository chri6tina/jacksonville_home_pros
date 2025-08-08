# Environment Variables Guide

## Production Environment (Vercel)

### Essential Variables

```env
# NextAuth Configuration
NEXTAUTH_URL="https://www.jacksonvillehomeprofessionals.com"
NEXTAUTH_SECRET="your-secret-key"

# Database Configuration
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.lsgzubfbmwyrgkmdsfwc.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1&pool_timeout=20"

# Environment
NODE_ENV="production"
```

### Development Environment

For local development, use these values instead:

```env
# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-dev-secret"

# Database Configuration
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.lsgzubfbmwyrgkmdsfwc.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1&pool_timeout=20"

# Environment
NODE_ENV="development"
```

## Important Notes

1. **NEXTAUTH_URL**: 
   - Production: Must be your actual domain
   - Development: Use localhost:3000
   - Must include protocol (http:// or https://)

2. **DATABASE_URL**:
   - Always use port 6543 for Supabase connection pooling
   - Include pgbouncer and connection settings
   - URL encode special characters in password (e.g., $ becomes %24)

3. **NEXTAUTH_SECRET**:
   - Must be a secure random string
   - Keep this secret and never commit to git
   - Can be different between production and development

## Setting Up in Vercel

1. Go to your project settings in Vercel
2. Navigate to the Environment Variables section
3. Add or update these variables
4. Redeploy your application after any changes
