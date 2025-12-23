# Vercel Deployment Guide - Care.xyz

## 🚀 Vercel-এ Deploy করার Step-by-Step Guide

### Step 1: Vercel Account তৈরি করুন
1. https://vercel.com এ যান
2. "Sign Up" করুন (GitHub account দিয়ে easiest)
3. GitHub account connect করুন

### Step 2: Project Import করুন
1. Vercel Dashboard-এ "Add New" → "Project" ক্লিক করুন
2. GitHub repository select করুন: `istiaq-71/care-xyz`
3. "Import" ক্লিক করুন

### Step 3: Environment Variables যোগ করুন ⚠️ **সবচেয়ে গুরুত্বপূর্ণ**

Vercel Dashboard-এ "Environment Variables" section-এ এই variables যোগ করুন:

```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/care?retryWrites=true&w=majority

NEXTAUTH_URL=https://your-app-name.vercel.app
(বা আপনার custom domain)

NEXTAUTH_SECRET=your-random-secret-key-here

GOOGLE_CLIENT_ID=your-google-client-id

GOOGLE_CLIENT_SECRET=your-google-client-secret

EMAIL_HOST=smtp.gmail.com

EMAIL_PORT=587

EMAIL_USER=your-email@gmail.com

EMAIL_PASS=your-gmail-app-password
```

**⚠️ গুরুত্বপূর্ণ:**
- `NEXTAUTH_URL` = আপনার Vercel URL (deploy হওয়ার পর পাবেন)
- সব variables "Production", "Preview", "Development" সব environment-এ add করুন

### Step 4: Google OAuth Redirect URI Update করুন ⚠️ **খুবই গুরুত্বপূর্ণ**

1. Google Cloud Console-এ যান: https://console.cloud.google.com/
2. আপনার project select করুন
3. **APIs & Services** → **Credentials** এ যান
4. আপনার OAuth 2.0 Client ID click করুন
5. **Authorized redirect URIs** section-এ **দুইটি URI add করুন:**

   **Local Development:**
   ```
   http://localhost:3000/api/auth/callback/google
   ```

   **Vercel Production (আপনার Vercel URL):**
   ```
   https://your-app-name.vercel.app/api/auth/callback/google
   ```

6. **Save** button click করুন
7. **5-10 minutes** অপেক্ষা করুন (Google-এর settings update হতে সময় লাগে)

**⚠️ গুরুত্বপূর্ণ:** 
- দুটো URI-ই add করতে হবে (localhost এবং Vercel URL)
- Exact URL match করতে হবে (no trailing slash, no extra spaces)
- Settings save করার পর কিছুক্ষণ অপেক্ষা করতে হবে

### Step 5: Deploy করুন
1. "Deploy" বাটন ক্লিক করুন
2. Build process complete হওয়ার জন্য অপেক্ষা করুন

---

## 🔧 Common Issues & Solutions

### Issue 1: Build Failed
**Error:** `Module not found` বা `Type error`

**Solution:**
- Vercel Dashboard → Settings → General
- "Node.js Version" = `18.x` বা `20.x` set করুন
- "Build Command" = `npm run build` (default)
- "Install Command" = `npm install` (default)

### Issue 2: MongoDB Connection Error
**Error:** `MongoServerError` বা `Connection timeout`

**Solution:**
1. MongoDB Atlas-এ যান
2. Network Access → "Add IP Address"
3. "Allow Access from Anywhere" (0.0.0.0/0) add করুন
4. Vercel-এ `MONGODB_URI` variable সঠিক আছে কিনা check করুন

### Issue 3: NextAuth Error
**Error:** `NEXTAUTH_URL is not set` বা `Invalid callback URL`

**Solution:**
1. Vercel Dashboard → Settings → Environment Variables
2. `NEXTAUTH_URL` = `https://your-app.vercel.app` (exact URL)
3. Google OAuth redirect URI update করুন

### Issue 4: Environment Variables Not Working
**Error:** `process.env.MONGODB_URI is undefined`

**Solution:**
1. Vercel Dashboard → Settings → Environment Variables
2. সব variables আছে কিনা check করুন
3. "Redeploy" করুন (Settings → Deployments → Redeploy)

### Issue 5: Build Timeout
**Error:** `Build exceeded maximum time`

**Solution:**
- `package.json`-এ unnecessary dependencies remove করুন
- Vercel Pro plan use করুন (free plan-এ timeout কম)

---

## 📋 Pre-Deployment Checklist

- [ ] সব environment variables Vercel-এ add করা হয়েছে
- [ ] `NEXTAUTH_URL` = production URL set করা হয়েছে
- [ ] Google OAuth redirect URI update করা হয়েছে
- [ ] MongoDB Atlas-এ IP whitelist করা হয়েছে (0.0.0.0/0)
- [ ] Code GitHub-এ push করা হয়েছে
- [ ] Build locally test করা হয়েছে (`npm run build`)

---

## 🧪 Build Test Locally

Deploy করার আগে locally test করুন:

```bash
npm run build
npm start
```

যদি locally build হয়, তাহলে Vercel-এও হবে।

---

## 🔄 Redeploy After Changes

1. Code change করুন
2. GitHub-এ push করুন
3. Vercel automatically redeploy করবে
4. অথবা manually: Vercel Dashboard → Deployments → "Redeploy"

---

## 📧 Database Seeding After Deploy

Deploy হওয়ার পর:
1. আপনার Vercel URL-এ যান: `https://your-app.vercel.app/api/seed`
2. Browser-এ visit করুন
3. Services automatically seed হবে

---

## 🆘 Still Not Working?

1. **Vercel Logs Check করুন:**
   - Vercel Dashboard → Deployments → Latest deployment → "View Function Logs"

2. **Build Logs Check করুন:**
   - Deployment page → "Build Logs" tab

3. **Common Mistakes:**
   - Environment variables-এ extra spaces আছে
   - `NEXTAUTH_URL` wrong format
   - MongoDB connection string-এ password wrong
   - Google OAuth redirect URI match করছে না

---

## ✅ Success!

Deploy successful হলে আপনি পাবেন:
- Live URL: `https://your-app.vercel.app`
- Automatic HTTPS
- Global CDN
- Auto deployments on git push

**Congratulations! 🎉**

