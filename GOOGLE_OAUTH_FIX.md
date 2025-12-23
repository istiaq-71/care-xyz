# Google OAuth Redirect URI Fix

## 🔴 Error: redirect_uri_mismatch

এই error হয় যখন Google Cloud Console-এ configured redirect URI এবং actual request-এ যাওয়া redirect URI match করে না।

## ✅ Solution: Google Cloud Console-এ Redirect URI Add করুন

### Step 1: Google Cloud Console-এ যান
1. https://console.cloud.google.com/ এ যান
2. আপনার project select করুন
3. **APIs & Services** → **Credentials** এ যান

### Step 2: OAuth 2.0 Client ID খুলুন
1. আপনার OAuth client (যেটা আগে তৈরি করেছিলেন) click করুন
2. **Authorized redirect URIs** section-এ যান

### Step 3: Redirect URIs Add করুন

**Local Development-এর জন্য:**
```
http://localhost:3000/api/auth/callback/google
```

**Vercel Production-এর জন্য (আপনার Vercel URL):**
```
https://your-app-name.vercel.app/api/auth/callback/google
```

**উদাহরণ:**
যদি আপনার Vercel app URL হয় `https://care-xyz.vercel.app`, তাহলে add করুন:
```
https://care-xyz.vercel.app/api/auth/callback/google
```

### Step 4: Save করুন
1. **Save** button click করুন
2. **5-10 minutes** অপেক্ষা করুন (Google-এর settings update হতে সময় লাগে)

### Step 5: Test করুন
1. Local development-এ test করুন: `http://localhost:3000/login`
2. Google sign in button click করুন
3. এখন কাজ করা উচিত!

---

## 🔍 আপনার Vercel URL খুঁজে বের করুন

1. Vercel Dashboard-এ যান: https://vercel.com/dashboard
2. আপনার project select করুন
3. **Settings** → **Domains** section-এ আপনার URL দেখতে পাবেন
4. সাধারণত format: `https://your-project-name.vercel.app`

---

## ⚠️ Important Notes

1. **দুইটি URI add করুন:**
   - Local development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-vercel-url.vercel.app/api/auth/callback/google`

2. **NEXTAUTH_URL check করুন:**
   - Local: `.env.local`-এ `NEXTAUTH_URL=http://localhost:3000`
   - Vercel: Environment Variables-এ `NEXTAUTH_URL=https://your-vercel-url.vercel.app`

3. **Settings update হতে সময় লাগে:**
   - Google-এর settings update হতে 5-10 minutes লাগতে পারে
   - যদি এখনও কাজ না করে, কিছুক্ষণ অপেক্ষা করুন

---

## 🆘 Still Not Working?

1. **Browser cache clear করুন**
2. **Incognito/Private window-এ test করুন**
3. **Google Cloud Console-এ redirect URI exact match আছে কিনা check করুন** (no trailing slash, exact URL)
4. **Vercel-এ NEXTAUTH_URL সঠিক আছে কিনা verify করুন**

---

## 📝 Quick Checklist

- [ ] Google Cloud Console-এ OAuth credentials খোলা হয়েছে
- [ ] `http://localhost:3000/api/auth/callback/google` add করা হয়েছে
- [ ] Vercel URL-এর জন্য redirect URI add করা হয়েছে (যদি Vercel-এ deploy করা থাকে)
- [ ] Save button click করা হয়েছে
- [ ] 5-10 minutes অপেক্ষা করা হয়েছে
- [ ] `.env.local`-এ `NEXTAUTH_URL` সঠিক আছে
- [ ] Vercel-এ `NEXTAUTH_URL` environment variable সঠিক আছে

