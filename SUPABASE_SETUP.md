# Supabase Setup Guide for Jacksonville Home Pros

## 🚀 **Step-by-Step Setup Instructions**

### **Step 1: Create Supabase Account**
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign Up"
3. Create an account (GitHub, Google, or email)

### **Step 2: Create New Project**
1. Click "New Project"
2. **Organization**: Create new or select existing
3. **Project Name**: `jacksonville-home-pros`
4. **Database Password**: Create a strong password (save this!)
5. **Region**: Choose closest to Jacksonville (US East or US West)
6. Click "Create new project"

### **Step 3: Get Connection Details**
Once your project is created:

1. **Go to Settings → Database**
2. **Copy the connection string** (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

3. **Go to Settings → API**
4. **Copy these values**:
   - Project URL: `https://[PROJECT-REF].supabase.co`
   - anon/public key: `[ANON-KEY]`
   - service_role key: `[SERVICE-ROLE-KEY]`

### **Step 4: Update Environment Variables**
1. Create `.env.local` file in your project root
2. Add your Supabase credentials:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### **Step 5: Run Database Migrations**
After updating the environment variables:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database
npx prisma db seed
```

### **Step 6: Test the Connection**
Start your development server:
```bash
npm run dev
```

Visit:
- `/auth/signup` - Test user registration
- `/auth/signin` - Test user login
- `/dashboard` - Test protected routes

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **Connection Error**: Make sure your DATABASE_URL is correct
2. **Migration Error**: Check if the database password is correct
3. **Auth Error**: Verify NEXTAUTH_SECRET is set

### **Useful Commands:**
```bash
# Check database connection
npx prisma db pull

# Reset database (careful!)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

## 📊 **Supabase Dashboard Features**

Once set up, you can use the Supabase dashboard for:

- **Table Editor**: View and edit data directly
- **SQL Editor**: Run custom queries
- **Authentication**: Manage users
- **Storage**: Upload provider photos
- **Logs**: Monitor API calls

## 🎯 **Next Steps After Setup**

1. **Test Authentication**: Create test users
2. **Add Sample Data**: Seed providers and categories
3. **Build Provider Features**: Registration and profiles
4. **Implement Search**: Category and location filtering

---

**Need Help?** Check the [Supabase Documentation](https://supabase.com/docs) or ask for assistance! 