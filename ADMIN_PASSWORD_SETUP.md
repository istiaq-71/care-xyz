# Admin Password Setup Guide

## 🔐 Admin Password System

Admin user তৈরি করার জন্য এখন **admin password** প্রয়োজন হবে।

---

## 📋 Step 1: Environment Variable Set করুন

`.env.local` file-এ এই line add করুন:

```env
ADMIN_PASSWORD=your-secure-password-here
```

**উদাহরণ:**
```env
ADMIN_PASSWORD=admin123
```

**⚠️ Production-এ strong password ব্যবহার করুন!**

---

## 📋 Step 2: Admin User তৈরি করুন

### Method 1: API Route (Password সহ) ⭐

**Postman/Thunder Client:**
```
POST http://localhost:3000/api/admin/make-admin
Content-Type: application/json

{
  "email": "your-email@example.com",
  "adminPassword": "admin123"
}
```

**Terminal (curl):**
```bash
curl -X POST http://localhost:3000/api/admin/make-admin \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"your-email@example.com\", \"adminPassword\": \"admin123\"}"
```

### Method 2: Setup API (Password সহ)

**Browser-এ visit করুন:**
```
http://localhost:3000/api/setup?email=your-email@example.com&makeAdmin=true&adminPassword=admin123
```

**উদাহরণ:**
```
http://localhost:3000/api/setup?email=istiaqhossain71@gmail.com&makeAdmin=true&adminPassword=admin123
```

---

## 🔒 Default Password

**Default admin password:** `admin123`

**⚠️ Production-এ অবশ্যই change করুন!**

---

## ✅ Verification

1. **Environment variable set করুন:**
   ```env
   ADMIN_PASSWORD=admin123
   ```

2. **API call করুন password সহ:**
   ```json
   {
     "email": "your-email@example.com",
     "adminPassword": "admin123"
   }
   ```

3. **Response পাবেন:**
   ```json
   {
     "message": "User is now admin",
     "email": "your-email@example.com"
   }
   ```

4. **Logout করুন এবং আবার Login করুন**

5. **Admin Panel Access করুন:** `http://localhost:3000/admin`

---

## 🆘 Troubleshooting

### Error: "Invalid admin password"
- **Solution:** `.env.local`-এ `ADMIN_PASSWORD` সঠিক আছে কিনা check করুন
- Default password: `admin123`
- Server restart করুন (`npm run dev`)

### Error: "User not found"
- **Solution:** User account আগে create করুন (`/register`)

### Password কাজ করছে না
- **Solution:** 
  1. `.env.local` file check করুন
  2. Server restart করুন
  3. Environment variable exact match আছে কিনা verify করুন

---

## 🔐 Security Best Practices

1. **Production-এ strong password ব্যবহার করুন:**
   ```
   ADMIN_PASSWORD=YourStrongPassword123!@#
   ```

2. **Password environment variable-এ store করুন** (never in code)

3. **Vercel-এ environment variable add করুন:**
   - Vercel Dashboard → Settings → Environment Variables
   - `ADMIN_PASSWORD` add করুন

4. **Regular password change করুন**

---

## 📝 Quick Reference

**Default Password:** `admin123`

**API Call:**
```json
POST /api/admin/make-admin
{
  "email": "user@example.com",
  "adminPassword": "admin123"
}
```

**Setup URL:**
```
/api/setup?email=user@example.com&makeAdmin=true&adminPassword=admin123
```

---

## 🎉 Success!

এখন admin user তৈরি করতে admin password প্রয়োজন হবে। এটি security improve করবে!

