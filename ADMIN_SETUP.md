# Admin Panel Setup Guide

## 🎯 Quick Setup (সবচেয়ে সহজ পদ্ধতি)

### Method 1: Browser থেকে (Recommended) ⭐

1. **User account তৈরি করুন** (`/register`)
2. **Browser-এ এই URL visit করুন:**
   ```
   http://localhost:3000/api/setup?email=your-email@example.com&makeAdmin=true
   ```
   **উদাহরণ:**
   ```
   http://localhost:3000/api/setup?email=istiaqhossain71@gmail.com&makeAdmin=true
   ```
3. **Logout করুন এবং আবার Login করুন**
4. **Admin Panel-এ যান:** `http://localhost:3000/admin`

---

### Method 2: API Route ব্যবহার করে

**Postman/Thunder Client:**
- Method: `POST`
- URL: `http://localhost:3000/api/admin/make-admin`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "email": "your-email@example.com"
}
```

**Terminal (curl):**
```bash
curl -X POST http://localhost:3000/api/admin/make-admin \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com"}'
```

---

### Method 3: MongoDB Database থেকে

1. MongoDB Atlas-এ যান
2. `care` database → `users` collection
3. User document edit করুন
4. `role: "admin"` add করুন

---

## 📋 Step-by-Step

1. **User Account তৈরি করুন** (`/register`)
2. **User-কে Admin বানান** (উপরের methods-এর যেকোনো একটি)
3. **Logout করুন**
4. **Login করুন**
5. **Admin Panel Access করুন:** `/admin`

## Admin Features

- ✅ View All Bookings
- ✅ Update Booking Status
- ✅ View Revenue Statistics
- ✅ Payment History

## 🔒 Security Note

⚠️ Production-এ API routes protect করুন!

**Detailed guide:** See `ADMIN_SETUP_GUIDE.md`


