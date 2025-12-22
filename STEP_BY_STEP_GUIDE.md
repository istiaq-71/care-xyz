# Step-by-Step Setup Guide for Care.xyz

This guide will walk you through setting up your Care.xyz application from scratch.

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] Node.js 18+ installed
- [ ] A code editor (VS Code recommended)
- [ ] A MongoDB database (local or Atlas)
- [ ] A Gmail account
- [ ] A Google Cloud account (for OAuth - optional)

---

## Step 1: Install Dependencies ⚙️

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all required packages. Wait for it to complete.

---

## Step 2: Set Up MongoDB Database 🗄️

### Option A: MongoDB Atlas (Cloud - Recommended for Beginners)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create an account
3. Create a new project (name it "Care")
4. Create a free cluster (choose the free M0 tier)
5. Wait for cluster to be created (2-3 minutes)
6. Click "Connect" → "Connect your application"
7. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/`)
8. Replace `<password>` with your database password
9. Add `care` at the end: `...mongodb.net/care?retryWrites=true&w=majority`
10. **Save this connection string** - you'll need it in Step 3

### Option B: Local MongoDB

1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install it on your computer
3. Start MongoDB service
4. Your connection string will be: `mongodb://localhost:27017/care`

---

## Step 3: Create Environment Variables File 🔐

1. In the project root folder, create a new file named `.env.local`
2. Copy the following template and fill in your values:

```env
# Database - Paste your MongoDB connection string here
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/care?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key-here

# Google OAuth (Optional - for Google login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration (for sending invoices)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### How to Get Each Value:

#### NEXTAUTH_SECRET
Generate a random secret key:
- Visit: https://generate-secret.vercel.app/32
- Or run in terminal: `openssl rand -base64 32`
- Copy the generated string

#### Google OAuth Credentials (Optional)

1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Go to "APIs & Services" → "Library"
4. Search for "Google+ API" and enable it
5. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
6. Choose "Web application"
7. Name it "Care.xyz"
8. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
9. Click "Create"
10. Copy the Client ID and Client Secret

**Note:** If you skip Google OAuth, users can still register with email/password.

#### Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click "Security" in the left menu
3. Enable "2-Step Verification" (if not already enabled)
4. Go to "App passwords": https://myaccount.google.com/apppasswords
5. Select "Mail" and "Other (Custom name)"
6. Enter "Care.xyz" as the name
7. Click "Generate"
8. Copy the 16-character password (this is your EMAIL_PASS)
9. **Important:** Use this App Password, NOT your regular Gmail password

---

## Step 4: Seed the Database 🌱

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Wait for the server to start (you'll see "Ready" message)

3. Open your browser and visit:
   ```
   http://localhost:3000/api/seed
   ```

4. You should see a message: `{"message":"Services seeded successfully","count":3}`

5. This creates 3 default services:
   - Baby Care (৳500/hour)
   - Elderly Care (৳800/hour)
   - Special Care (৳1000/hour)

---

## Step 5: Test the Application 🧪

1. Make sure the server is running (`npm run dev`)

2. Open your browser: `http://localhost:3000`

3. You should see the homepage with:
   - Hero banner
   - About section
   - 3 services
   - Testimonials

4. **Test Registration:**
   - Click "Sign Up"
   - Fill in the form:
     - NID No: (any number, e.g., 1234567890)
     - Name: Your name
     - Email: Your email
     - Contact: Your phone number
     - Password: (must have 6+ chars, 1 uppercase, 1 lowercase)
     - Confirm Password: Same as password
   - Click "Create Account"
   - You'll be redirected to login

5. **Test Login:**
   - Enter your email and password
   - Click "Sign in"
   - You should be logged in

6. **Test Booking:**
   - Click on any service card
   - Click "Book Service Now"
   - Fill in:
     - Duration: 2 hours
     - Division: Select "Dhaka"
     - District: Select "Dhaka"
     - City: Select "Gulshan"
     - Area: Enter "Gulshan-2"
     - Address: Enter your address
   - See the total cost calculated automatically
   - Click "Confirm Booking"
   - Check your email for the invoice!

7. **Test My Bookings:**
   - Click "My Bookings" in the navbar
   - You should see your booking with status "PENDING"

---

## Step 6: Verify Everything Works ✅

Checklist:
- [ ] Homepage loads correctly
- [ ] Can register a new account
- [ ] Can login with email/password
- [ ] Can view service details
- [ ] Can create a booking
- [ ] Received email invoice
- [ ] Can view bookings in "My Bookings"
- [ ] Can cancel a booking
- [ ] 404 page works (visit a random URL)

---

## 🐛 Troubleshooting

### Problem: "MongoDB connection failed"
**Solution:**
- Check your MONGODB_URI in `.env.local`
- Make sure there are no extra spaces
- If using Atlas, check your IP is whitelisted (or allow all IPs for testing)
- Test connection string in MongoDB Compass

### Problem: "Email not sending"
**Solution:**
- Make sure you're using Gmail App Password (not regular password)
- Check EMAIL_USER and EMAIL_PASS in `.env.local`
- Verify 2-Step Verification is enabled on Gmail

### Problem: "Google login not working"
**Solution:**
- Check redirect URI matches exactly: `http://localhost:3000/api/auth/callback/google`
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Make sure Google+ API is enabled

### Problem: "Services not showing"
**Solution:**
- Run the seed script: Visit `http://localhost:3000/api/seed`
- Check MongoDB connection
- Verify database name is "care"

### Problem: "Can't login after registration"
**Solution:**
- Make sure password meets requirements (6+ chars, uppercase, lowercase)
- Check if user exists in MongoDB
- Try registering again with a different email

---

## 🎉 Success!

If everything works, congratulations! Your Care.xyz application is ready.

## 📝 Next Steps

1. **Customize the design:**
   - Edit colors in `tailwind.config.ts`
   - Modify components in `components/` folder

2. **Add more services:**
   - Manually add to MongoDB
   - Or create an admin panel

3. **Deploy to production:**
   - Push to GitHub
   - Deploy on Vercel (recommended)
   - Update environment variables in Vercel dashboard

4. **Optional enhancements:**
   - Add Stripe payment
   - Create admin dashboard
   - Add caretaker profiles
   - Add reviews/ratings

---

## 📞 Need Help?

- Check `SETUP_INSTRUCTIONS.md` for detailed information
- Check `PROJECT_SUMMARY.md` for feature overview
- Review error messages in terminal
- Check browser console for errors

---

**You're all set! Happy coding! 🚀**

