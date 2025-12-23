# Admin Setup Guide - Care.xyz

## 🎯 Admin Panel Setup করার সহজ পদ্ধতি

Admin panel access করার জন্য আপনাকে প্রথমে একটি user account তৈরি করতে হবে, তারপর সেই user-কে admin role দিতে হবে।

---

## 📋 Step-by-Step Instructions

### Step 1: User Account তৈরি করুন

1. **Registration করুন:**
   - Browser-এ যান: `http://localhost:3000/register`
   - NID No, Name, Email, Contact, Password দিয়ে account তৈরি করুন
   - আপনার email address মনে রাখুন (এটা পরে লাগবে)

2. **Login করুন:**
   - `http://localhost:3000/login` এ যান
   - আপনার credentials দিয়ে login করুন

---

### Step 2: User-কে Admin বানান

আপনার কাছে **3টি option** আছে:

#### **Method 1: API Route ব্যবহার করে (সবচেয়ে সহজ)** ⭐

1. **Browser-এ এই URL visit করুন:**
   ```
   http://localhost:3000/api/admin/make-admin
   ```
   এটি একটি POST request, তাই browser-এ directly কাজ করবে না।

2. **Postman বা Thunder Client ব্যবহার করুন:**
   - **Method:** `POST`
   - **URL:** `http://localhost:3000/api/admin/make-admin`
   - **Headers:** 
     ```
     Content-Type: application/json
     ```
   - **Body (JSON):**
     ```json
     {
       "email": "your-email@example.com"
     }
     ```
   - **Send** করুন
   - Response পাবেন: `{"message": "User is now admin", "email": "your-email@example.com"}`

3. **Terminal/Command Prompt থেকে (curl ব্যবহার করে):**
   ```bash
   curl -X POST http://localhost:3000/api/admin/make-admin \
     -H "Content-Type: application/json" \
     -d "{\"email\": \"your-email@example.com\"}"
   ```

#### **Method 2: Setup API ব্যবহার করে (Services + Admin একসাথে)** ⭐⭐

এই method-এ services seed হবে এবং user admin হবে একসাথে:

1. **Browser-এ এই URL visit করুন:**
   ```
   http://localhost:3000/api/setup?email=your-email@example.com&makeAdmin=true
   ```
   
   **উদাহরণ:**
   ```
   http://localhost:3000/api/setup?email=istiaqhossain71@gmail.com&makeAdmin=true
   ```

2. **Response দেখবেন:**
   ```json
   {
     "success": true,
     "services": {
       "total": 3,
       "updated": 3,
       "message": "Services updated with images"
     },
     "admin": {
       "message": "User is now admin",
       "email": "your-email@example.com"
     },
     "message": "Setup completed successfully"
   }
   ```

#### **Method 3: MongoDB Database থেকে Direct Update (Advanced)**

1. **MongoDB Atlas-এ যান:**
   - https://cloud.mongodb.com/ এ login করুন
   - আপনার cluster select করুন
   - **Browse Collections** → `care` database → `users` collection

2. **User document খুঁজুন:**
   - Email দিয়ে search করুন
   - User document খুলুন

3. **Role update করুন:**
   - **Edit Document** click করুন
   - `role` field add করুন (যদি না থাকে)
   - Value set করুন: `admin`
   - **Update** করুন

   **অথবা MongoDB Shell ব্যবহার করে:**
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

---

### Step 3: Admin Panel Access করুন

1. **Logout করুন** (যদি login থাকেন)
2. **আবার Login করুন** (session refresh করার জন্য)
3. **Admin Panel-এ যান:**
   ```
   http://localhost:3000/admin
   ```
4. **Admin Dashboard দেখবেন:**
   - Total Bookings
   - Total Revenue
   - Booking Status Counts
   - All Bookings Table
   - Status Update Options

---

## ✅ Verification

Admin সঠিকভাবে setup হয়েছে কিনা check করতে:

1. **Login করুন** আপনার account দিয়ে
2. **Navbar-এ "Admin" link দেখবেন** (যদি admin হন)
3. **`/admin` page-এ যান** - Access পাবেন
4. **Non-admin user হলে** redirect হবে login page-এ

---

## 🔒 Security Notes

⚠️ **Production-এ এই API routes protect করুন:**

1. **Environment variable check করুন:**
   ```typescript
   // Only allow in development or with special token
   if (process.env.NODE_ENV === 'production' && !request.headers.get('admin-token')) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
   }
   ```

2. **Admin token ব্যবহার করুন:**
   - `.env.local`-এ `ADMIN_SECRET_TOKEN` add করুন
   - API route-এ verify করুন

3. **IP whitelist করুন** (optional)

---

## 🆘 Troubleshooting

### Problem: "User not found"
- **Solution:** Email address সঠিক আছে কিনা check করুন
- User account আগে create হয়েছে কিনা verify করুন

### Problem: Admin panel access পাচ্ছি না
- **Solution:** 
  1. Logout করুন
  2. আবার Login করুন (session refresh)
  3. Browser cache clear করুন
  4. Incognito window-এ test করুন

### Problem: API route কাজ করছে না
- **Solution:**
  1. Server running আছে কিনা check করুন (`npm run dev`)
  2. URL সঠিক আছে কিনা verify করুন
  3. Email address exact match আছে কিনা check করুন

---

## 📝 Quick Reference

### Make User Admin (Postman/Thunder Client):
```
POST http://localhost:3000/api/admin/make-admin
Content-Type: application/json

{
  "email": "your-email@example.com"
}
```

### Setup Services + Make Admin (Browser):
```
GET http://localhost:3000/api/setup?email=your-email@example.com&makeAdmin=true
```

### Admin Panel:
```
http://localhost:3000/admin
```

---

## 🎉 Success!

এখন আপনি admin panel access করতে পারবেন এবং:
- ✅ সব bookings দেখতে পারবেন
- ✅ Booking status update করতে পারবেন
- ✅ Revenue statistics দেখতে পারবেন
- ✅ Payment history track করতে পারবেন

**Happy Admin-ing! 🚀**

