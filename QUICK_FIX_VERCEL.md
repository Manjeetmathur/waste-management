# Quick Fix for Vercel Deployment Errors

## Most Common Issue: Missing Environment Variables

### Step 1: Go to Vercel Dashboard
1. Open your project on Vercel
2. Click **Settings** → **Environment Variables**

### Step 2: Add All Required Variables

Copy and paste these (replace with your actual values):

#### Firebase (Public - can be exposed to browser)
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAI1MQCfZituVzv2E2YLyiuW2QQD4JCtK8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=temp-733fe.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=temp-733fe
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=temp-733fe.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=434384750625
NEXT_PUBLIC_FIREBASE_APP_ID=1:434384750625:web:9f80a31460cb2cf7f77b60
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-C6GZS5PWVW
```

#### Cloudinary (Important: NO NEXT_PUBLIC_ prefix for secret keys)
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### App URL
```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Step 3: Set for All Environments
- ✅ **Production**
- ✅ **Preview** 
- ✅ **Development**

### Step 4: Redeploy
- Go to **Deployments** tab
- Click **Redeploy** on the latest deployment
- Or push a new commit to trigger automatic deployment

---

## If Still Getting Errors

### Check Build Logs
1. Vercel Dashboard → Your Project → **Deployments**
2. Click on failed deployment
3. Check **Build Logs** tab
4. Look for specific error message

### Common Error Messages:

#### ❌ "NEXT_PUBLIC_FIREBASE_API_KEY is not defined"
**Fix:** Add the environment variable in Vercel Dashboard

#### ❌ "Cloudinary credentials not configured"
**Fix:** 
- Ensure `CLOUDINARY_API_KEY` is set (NOT `NEXT_PUBLIC_CLOUDINARY_API_KEY`)
- Ensure `CLOUDINARY_API_SECRET` is set (NOT `NEXT_PUBLIC_CLOUDINARY_API_SECRET`)
- These are server-side only variables

#### ❌ "Module not found"
**Fix:**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
git add .
git commit -m "Fix dependencies"
git push
```

#### ❌ "Build exceeded maximum build time"
**Fix:** 
- Check `next.config.ts` for any heavy operations
- Consider optimizing imports

#### ❌ "Function exceeded maximum execution time"
**Fix:**
- Optimize API routes in `src/app/api/`
- Check for infinite loops or heavy processing

---

## Test Locally First

Before deploying, test production build locally:

```bash
# Set environment variables locally
# Copy .env.local with all values

# Build and test
npm run build
npm run start
```

If local build works but Vercel fails → **Environment variables issue**

---

## Still Stuck?

Share the exact error message from Vercel build logs, and I can help you fix it!

Common places to check:
- 🔍 Vercel Dashboard → Deployments → Build Logs
- 🔍 Vercel Dashboard → Settings → Environment Variables
- 🔍 Firebase Console → Project Settings
- 🔍 Cloudinary Dashboard → Settings → API Keys

