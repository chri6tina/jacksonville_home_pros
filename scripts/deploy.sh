#!/bin/bash

echo "🚀 Jacksonville Home Pros - Deployment Script"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Jacksonville Home Pros"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "🔗 Please set up your GitHub repository:"
    echo "1. Go to https://github.com/new"
    echo "2. Create repository: jacksonville-home-pros"
    echo "3. Don't initialize with README (we already have one)"
    echo ""
    echo "Then run:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/jacksonville-home-pros.git"
    echo "git branch -M main"
    echo "git push -u origin main"
else
    echo "✅ Remote origin already configured"
fi

echo ""
echo "🔧 Next Steps:"
echo "=============="
echo ""
echo "1. 📦 Install Square SDK:"
echo "   npm install square"
echo ""
echo "2. 🔑 Set up Square Account:"
echo "   - Go to https://developer.squareup.com/"
echo "   - Create developer account"
echo "   - Get Application ID, Access Token, Location ID"
echo ""
echo "3. 🌐 Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Set environment variables (see DEPLOYMENT.md)"
echo ""
echo "4. 🗄️ Set up Production Database:"
echo "   - Use Supabase, Railway, or any PostgreSQL provider"
echo "   - Update DATABASE_URL in Vercel"
echo ""
echo "5. 🔗 Configure Domain:"
echo "   - Purchase domain (recommended: jacksonvillehomepros.com)"
echo "   - Point to Vercel"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🎉 Your website will be live at: https://your-domain.vercel.app" 