# Deployment Guide - Jacksonville Home Pros

## 🚀 **Deploy to Production**

### **Step 1: Prepare Your Repository**

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Jacksonville Home Pros"
   ```

2. **Create GitHub Repository**:
   - Go to GitHub.com
   - Create new repository: `jacksonville-home-pros`
   - Don't initialize with README (we already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/jacksonville-home-pros.git
   git branch -M main
   git push -u origin main
   ```

### **Step 2: Set Up Square Account**

1. **Create Square Developer Account**:
   - Go to [Square Developer Dashboard](https://developer.squareup.com/)
   - Sign up for a developer account
   - Create a new application

2. **Get Square Credentials**:
   - **Application ID**: Found in your Square app dashboard
   - **Access Token**: Generate in the Square dashboard
   - **Location ID**: Get from Square Dashboard → Locations
   - **Webhook Signature Key**: Generate for webhook verification

3. **Environment Setup**:
   - **Sandbox**: For testing (use sandbox credentials)
   - **Production**: For live payments (use production credentials)

### **Step 3: Deploy to Vercel**

1. **Connect to Vercel**:
   - Go to [Vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import your `jacksonville-home-pros` repository

2. **Configure Environment Variables**:
   ```env
   # Database
   DATABASE_URL="your-production-database-url"
   
   # NextAuth
   NEXTAUTH_SECRET="your-production-secret"
   NEXTAUTH_URL="https://your-domain.vercel.app"
   
   # Square
   SQUARE_ACCESS_TOKEN="your-square-access-token"
   SQUARE_ENVIRONMENT="production"
   SQUARE_APPLICATION_ID="your-square-application-id"
   SQUARE_LOCATION_ID="your-square-location-id"
   SQUARE_WEBHOOK_SIGNATURE_KEY="your-webhook-signature-key"
   
   # Google Places
   GOOGLE_PLACES_API_KEY="your-google-places-api-key"
   ```

3. **Deploy**:
   - Vercel will automatically deploy on push to main branch
   - Your site will be live at: `https://your-domain.vercel.app`

### **Step 4: Set Up Database**

1. **Production Database**:
   - Use Supabase, Railway, or any PostgreSQL provider
   - Update `DATABASE_URL` in Vercel environment variables

2. **Run Migrations**:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

3. **Seed Data** (optional):
   ```bash
   npm run db:seed
   ```

### **Step 5: Configure Square Webhooks**

1. **Set Webhook URL**:
   - Go to Square Developer Dashboard
   - Add webhook URL: `https://your-domain.vercel.app/api/payments/square`
   - Select events: `payment.created`, `payment.updated`, `payment.completed`, `payment.failed`

2. **Test Webhooks**:
   - Use Square's webhook testing tool
   - Verify events are received correctly

## 🔧 **Square Integration Setup**

### **Square Payment Flow**

1. **Client-Side Payment**:
   ```javascript
   // Create checkout session
   const response = await fetch('/api/payments/square', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       type: 'checkout_session',
       amount: 100.00,
       lineItems: [{
         name: 'Plumbing Service',
         quantity: '1',
         basePriceMoney: { amount: 10000, currency: 'USD' }
       }],
       successUrl: 'https://your-domain.vercel.app/payment/success',
       cancelUrl: 'https://your-domain.vercel.app/payment/cancel'
     })
   })
   ```

2. **Server-Side Payment**:
   ```javascript
   // Direct payment with saved card
   const response = await fetch('/api/payments/square', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       type: 'direct_payment',
       sourceId: 'card_token',
       amount: 100.00,
       bookingId: 'booking_123'
     })
   })
   ```

### **Square Features Available**

✅ **Payment Processing**
- Credit/debit card payments
- Digital wallets (Apple Pay, Google Pay)
- ACH bank transfers
- Gift cards

✅ **Checkout Experience**
- Customizable checkout pages
- Mobile-optimized payments
- Multi-language support

✅ **Business Management**
- Inventory tracking
- Customer management
- Sales reporting
- Tax calculations

## 🌐 **Domain Setup**

### **Custom Domain**

1. **Purchase Domain**:
   - Recommended: `jacksonvillehomepros.com`
   - Or: `jaxhomepros.com`, `jaxpros.com`

2. **Configure DNS**:
   - Point to Vercel's nameservers
   - Or add CNAME record pointing to your Vercel domain

3. **SSL Certificate**:
   - Vercel provides automatic SSL
   - No additional configuration needed

## 📱 **Mobile Optimization**

### **Progressive Web App (PWA)**

1. **Add PWA Manifest**:
   ```json
   {
     "name": "Jacksonville Home Pros",
     "short_name": "JaxPros",
     "description": "Find trusted home service providers in Jacksonville",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#3b82f6"
   }
   ```

2. **Service Worker**:
   - Offline functionality
   - Push notifications
   - Background sync

## 🔒 **Security Checklist**

✅ **Environment Variables**
- All secrets stored in Vercel
- No hardcoded credentials
- Production vs development separation

✅ **Authentication**
- NextAuth.js configured
- Role-based access control
- Secure session management

✅ **Database Security**
- Connection string encrypted
- Row-level security (if using Supabase)
- Regular backups

✅ **Payment Security**
- PCI compliance (handled by Square)
- Webhook signature verification
- Idempotency keys

## 📊 **Analytics & Monitoring**

### **Google Analytics**
```javascript
// Add to _app.tsx
import { GoogleAnalytics } from 'nextjs-google-analytics'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  )
}
```

### **Error Monitoring**
- Vercel Analytics (built-in)
- Sentry integration (optional)
- Custom error logging

## 🚀 **Launch Checklist**

### **Pre-Launch**
- [ ] All environment variables set
- [ ] Database migrated and seeded
- [ ] Square account configured
- [ ] Webhooks tested
- [ ] SSL certificate active
- [ ] Custom domain configured
- [ ] Analytics tracking enabled
- [ ] Error monitoring set up

### **Post-Launch**
- [ ] Test payment flow end-to-end
- [ ] Verify admin dashboard access
- [ ] Test provider claiming system
- [ ] Check mobile responsiveness
- [ ] Monitor error logs
- [ ] Set up backup procedures

## 📞 **Support & Maintenance**

### **Regular Tasks**
- Monitor payment processing
- Review error logs
- Update dependencies
- Backup database
- Review analytics

### **Emergency Contacts**
- **Square Support**: [Square Support](https://squareup.com/help)
- **Vercel Support**: [Vercel Support](https://vercel.com/support)
- **Database Support**: Depends on your provider

---

**Your website is now ready for production!** 🎉

The Jacksonville Home Pros platform is fully integrated with Square payments and ready to serve customers and providers in Jacksonville. 