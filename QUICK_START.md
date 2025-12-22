# Quick Start Guide - Care.xyz

## 🚀 Quick Setup (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Create `.env.local` File
Copy the example and fill in your values:
```bash
# Copy this structure to .env.local
MONGODB_URI=your_mongodb_uri
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-random-secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 3. Seed Database
```bash
npm run dev
# Then visit: http://localhost:3000/api/seed
```

### 4. Start Development Server
```bash
npm run dev
```

Visit: **http://localhost:3000**

## 📋 What You Need

1. **MongoDB**: 
   - Local: Install MongoDB
   - Cloud: MongoDB Atlas (free tier)

2. **Gmail Account**: For sending emails
   - Enable 2-Step Verification
   - Generate App Password

3. **Google OAuth** (Optional but recommended):
   - Google Cloud Console
   - Create OAuth credentials

## 🎯 Key Features

✅ User Registration & Login
✅ Google OAuth Login
✅ Service Booking System
✅ Location-based Selection
✅ Automatic Cost Calculation
✅ Email Invoice
✅ Booking Management
✅ Responsive Design

## 📖 Full Documentation

See `SETUP_INSTRUCTIONS.md` for detailed setup guide.

## 🐛 Troubleshooting

**Can't connect to MongoDB?**
- Check MONGODB_URI in `.env.local`
- Ensure MongoDB is running

**Email not sending?**
- Use Gmail App Password (not regular password)
- Check EMAIL_USER and EMAIL_PASS

**Google Login not working?**
- Verify redirect URI: `http://localhost:3000/api/auth/callback/google`
- Check credentials in Google Cloud Console

## 📝 Next Steps

1. Register a user account
2. Browse services
3. Book a service
4. Check email for invoice
5. View bookings in "My Bookings"

Happy coding! 🎉

