# Vercel Deployment Fix Guide

## 🔧 Common Vercel Deployment Issues & Solutions

### Issue 1: Build Fails with MongoDB Error

**Error:** `MongoServerSelectionError` or `Connection timeout` during build

**Solution:**
1. ✅ Code already fixed - MongoDB connection won't fail during build
2. Make sure all environment variables are set in Vercel Dashboard

### Issue 2: Environment Variables Missing

**Error:** `process.env.MONGODB_URI is undefined`

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add ALL these variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/care?retryWrites=true&w=majority

NEXTAUTH_URL=https://your-app-name.vercel.app

NEXTAUTH_SECRET=your-random-secret-key-here

GOOGLE_CLIENT_ID=your-google-client-id

GOOGLE_CLIENT_SECRET=your-google-client-secret

EMAIL_HOST=smtp.gmail.com

EMAIL_PORT=587

EMAIL_USER=your-email@gmail.com

EMAIL_PASS=your-gmail-app-password
```

**Important:**
- Select **ALL environments**: Production, Preview, Development
- `NEXTAUTH_URL` = Your exact Vercel URL (e.g., `https://care-xyz.vercel.app`)
- No extra spaces or quotes

### Issue 3: Build Timeout

**Error:** `Build exceeded maximum time`

**Solution:**
- Already fixed with `--legacy-peer-deps` in vercel.json
- If still fails, upgrade to Vercel Pro plan

### Issue 4: TypeScript Errors

**Error:** `Type error` or `Module not found`

**Solution:**
1. Test locally first:
   ```bash
   npm run build
   ```
2. If local build works, Vercel will work too
3. Check for any TypeScript errors in terminal

### Issue 5: NextAuth Configuration Error

**Error:** `NEXTAUTH_URL is not set` or `Invalid callback URL`

**Solution:**
1. Vercel Dashboard → Environment Variables
2. Set `NEXTAUTH_URL` = `https://your-app.vercel.app` (exact URL)
3. Update Google OAuth redirect URI:
   - Google Cloud Console → OAuth credentials
   - Add: `https://your-app.vercel.app/api/auth/callback/google`

## 📋 Step-by-Step Deployment

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Fix Vercel deployment"
git push origin main
```

### Step 2: Vercel Dashboard Setup

1. **Go to Vercel Dashboard**
   - https://vercel.com
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select `istiaq-71/care-xyz`
   - Click "Import"

3. **Configure Project**
   - Framework: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables** ⚠️ **CRITICAL**
   - Click "Environment Variables"
   - Add all variables from above
   - Select ALL environments (Production, Preview, Development)
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Step 3: After Deployment

1. **Get Your Vercel URL**
   - After deployment, you'll get: `https://your-app.vercel.app`

2. **Update NEXTAUTH_URL**
   - Vercel Dashboard → Settings → Environment Variables
   - Update `NEXTAUTH_URL` = `https://your-app.vercel.app`
   - Redeploy

3. **Update Google OAuth**
   - Google Cloud Console → OAuth credentials
   - Add redirect URI: `https://your-app.vercel.app/api/auth/callback/google`

4. **Seed Database**
   - Visit: `https://your-app.vercel.app/api/seed`
   - Services will be created

## 🧪 Test Locally Before Deploy

```bash
# Test build
npm run build

# Test production build
npm start

# Visit http://localhost:3000
```

If local build works, Vercel will work too!

## 🔍 Check Deployment Logs

If deployment fails:

1. **Vercel Dashboard** → Your Project → Deployments
2. Click on failed deployment
3. Check "Build Logs" tab
4. Look for error messages
5. Fix errors and redeploy

## ✅ Success Checklist

- [ ] Code pushed to GitHub
- [ ] All environment variables added in Vercel
- [ ] `NEXTAUTH_URL` set to Vercel URL
- [ ] Google OAuth redirect URI updated
- [ ] MongoDB Atlas IP whitelist: `0.0.0.0/0`
- [ ] Build completes successfully
- [ ] Site loads at Vercel URL
- [ ] Database seeded (`/api/seed`)

## 🆘 Still Not Working?

1. **Check Build Logs:**
   - Vercel Dashboard → Deployments → Latest → Build Logs

2. **Check Function Logs:**
   - Vercel Dashboard → Deployments → Latest → Function Logs

3. **Common Mistakes:**
   - Environment variables have extra spaces
   - `NEXTAUTH_URL` has trailing slash (shouldn't)
   - MongoDB password has special characters (URL encode)
   - Google OAuth redirect URI doesn't match exactly

4. **Redeploy:**
   - Vercel Dashboard → Deployments → Latest → "Redeploy"

## 🎉 Success!

Once deployed, you'll have:
- ✅ Live URL: `https://your-app.vercel.app`
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-deploy on git push

**Congratulations! 🚀**


