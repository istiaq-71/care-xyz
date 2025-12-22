# Care.xyz - Complete Setup Instructions

This document provides step-by-step instructions to set up and run the Care.xyz application.

## Prerequisites

Before you begin, make sure you have:
- Node.js 18+ installed ([Download](https://nodejs.org/))
- MongoDB database (local or MongoDB Atlas)
- Gmail account (for email functionality)
- Google Cloud Console account (for OAuth)

## Step 1: Install Dependencies

1. Open your terminal/command prompt
2. Navigate to the project directory:
   ```bash
   cd care
   ```
3. Install all dependencies:
   ```bash
   npm install
   ```

## Step 2: Set Up MongoDB Database

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier is fine)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)
6. Replace `<password>` with your actual password
7. Add `care` as the database name at the end: `...mongodb.net/care?retryWrites=true&w=majority`

### Option B: Local MongoDB

1. Install MongoDB locally ([Download](https://www.mongodb.com/try/download/community))
2. Start MongoDB service
3. Your connection string will be: `mongodb://localhost:27017/care`

## Step 3: Set Up Environment Variables

1. Create a file named `.env.local` in the root directory (copy from `.env.example`)
2. Fill in all the required values:

```env
# Database
MONGODB_URI=your_mongodb_connection_string_here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### How to Get Each Value:

#### NEXTAUTH_SECRET
Generate a random string. You can use:
- Online generator: https://generate-secret.vercel.app/32
- Or run: `openssl rand -base64 32` in terminal

#### Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Choose "Web application"
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy the Client ID and Client Secret

#### Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to "App passwords" (https://myaccount.google.com/apppasswords)
4. Generate a new app password for "Mail"
5. Copy the 16-character password (use this as EMAIL_PASS)

## Step 4: Seed Initial Data

1. Start the development server:
   ```bash
   npm run dev
   ```

2. In a new terminal, seed the database with initial services:
   ```bash
   # Visit this URL in your browser or use curl:
   curl http://localhost:3000/api/seed
   ```
   
   Or simply visit: `http://localhost:3000/api/seed` in your browser

   This will create 3 default services:
   - Baby Care
   - Elderly Care
   - Special Care

## Step 5: Run the Application

1. Make sure the development server is running:
   ```bash
   npm run dev
   ```

2. Open your browser and visit: `http://localhost:3000`

3. You should see the homepage!

## Step 6: Test the Application

1. **Register a new account:**
   - Click "Sign Up"
   - Fill in the registration form
   - You'll be redirected to login

2. **Login:**
   - Use your credentials or Google OAuth
   - You should stay logged in even after page refresh

3. **Browse Services:**
   - View services on the homepage
   - Click "View Details" on any service

4. **Book a Service:**
   - Click "Book Service Now"
   - Fill in duration and location details
   - Confirm booking
   - Check your email for the invoice!

5. **View Bookings:**
   - Go to "My Bookings" from the navbar
   - See all your bookings with status

## Project Structure

```
care/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication (NextAuth)
│   │   ├── bookings/     # Booking CRUD
│   │   ├── services/     # Service data
│   │   └── seed/         # Database seeding
│   ├── (auth)/           # Auth pages (login, register)
│   ├── booking/          # Booking page
│   ├── service/          # Service detail pages
│   ├── my-bookings/      # User bookings
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ServiceCard.tsx
│   └── PrivateRoute.tsx
├── lib/                  # Utilities
│   ├── db.ts            # MongoDB connection
│   ├── models.ts        # Database models & functions
│   ├── auth.ts          # NextAuth configuration
│   ├── email.ts         # Email functionality
│   └── locations.ts     # Location data
└── types/               # TypeScript types
```

## Common Issues & Solutions

### Issue: "MongoDB connection failed"
- **Solution:** Check your MONGODB_URI in `.env.local`
- Make sure MongoDB is running (if local)
- Check network access (if using Atlas)

### Issue: "NextAuth secret missing"
- **Solution:** Add NEXTAUTH_SECRET to `.env.local`
- Generate a new secret key

### Issue: "Email not sending"
- **Solution:** 
  - Use Gmail App Password (not regular password)
  - Enable "Less secure app access" or use App Password
  - Check EMAIL_USER and EMAIL_PASS in `.env.local`

### Issue: "Google OAuth not working"
- **Solution:**
  - Check redirect URI matches exactly: `http://localhost:3000/api/auth/callback/google`
  - Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
  - Make sure Google+ API is enabled

### Issue: "Services not showing"
- **Solution:** Run the seed script: Visit `http://localhost:3000/api/seed`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add all environment variables in Vercel dashboard
5. Deploy!

**Important:** Update these environment variables for production:
- `NEXTAUTH_URL` = your production URL (e.g., `https://yourdomain.com`)
- Google OAuth redirect URI = `https://yourdomain.com/api/auth/callback/google`

## Next Steps (Optional Features)

1. **Stripe Payment Integration:**
   - Add Stripe keys to `.env.local`
   - Implement payment in booking flow
   - Update booking status after payment

2. **Admin Dashboard:**
   - Create admin user role
   - Add admin routes
   - Show payment histories
   - Manage bookings

## Support

If you encounter any issues:
1. Check the error message in the terminal
2. Verify all environment variables are set correctly
3. Make sure all dependencies are installed
4. Check MongoDB connection

## Features Implemented

✅ User Authentication (Email/Password + Google OAuth)
✅ User Registration with validation
✅ Service Listing & Details
✅ Dynamic Booking System
✅ Location Selection (Division, District, City, Area)
✅ Cost Calculation
✅ Booking Status Tracking
✅ My Bookings Page
✅ Email Invoice on Booking
✅ Responsive Design
✅ Metadata for SEO
✅ 404 Error Page
✅ Private Routes

Enjoy building with Care.xyz! 🚀

