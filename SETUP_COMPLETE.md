# 🎉 Setup Complete Guide

## Quick Setup (Everything in One Go)

### Step 1: Update Services with Images
Visit this URL in your browser:
```
http://localhost:3000/api/seed
```
This will add images to all services.

### Step 2: Complete Setup (Services + Make Admin)
Visit this URL to do everything at once:
```
http://localhost:3000/api/setup?email=YOUR_EMAIL&makeAdmin=true
```

Replace `YOUR_EMAIL` with your registered email address.

**Example:**
```
http://localhost:3000/api/setup?email=admin@example.com&makeAdmin=true
```

This will:
- ✅ Update all services with images
- ✅ Make your user admin (if no admin exists)

### Step 3: Access Admin Panel
1. Logout and login again (to refresh session)
2. You'll see "Admin" link in the navbar
3. Click it or go to: `http://localhost:3000/admin`

## Alternative: Manual Admin Setup

If you prefer to do it manually:

### Option A: Using API
```bash
POST http://localhost:3000/api/admin/make-admin
Body: { "email": "your-email@example.com" }
```

### Option B: Using Setup Route
```
GET http://localhost:3000/api/setup?email=your-email@example.com&makeAdmin=true
```

### Option C: Direct Database
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## What's Included

✅ **Service Images**: All services now have beautiful relevant images
✅ **Admin Panel**: Full dashboard with payment history
✅ **Admin Navigation**: Admin link appears in navbar for admin users
✅ **Booking Management**: Update booking statuses from admin panel
✅ **Statistics**: View total bookings, revenue, and status breakdown

## Features Available

### For Users:
- Browse services with images
- Book services
- View booking history
- Receive email invoices

### For Admins:
- View all bookings
- See payment history
- Manage booking statuses
- View statistics dashboard

## Next Steps

1. ✅ Services have images
2. ✅ You're set as admin
3. ✅ Admin panel is accessible
4. 🎉 Everything is ready!

Enjoy your Care.xyz platform! 🚀


