# Vercel Deployment Guide for CleanConnect

## Common Deployment Errors and Solutions

### 1. **Missing Environment Variables** ⚠️ (Most Common)

Vercel requires you to set environment variables in the dashboard. Missing variables will cause build or runtime errors.

#### Required Environment Variables:

Go to your Vercel project → Settings → Environment Variables and add:

```env
# Firebase Configuration (Public - available in browser)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key (Private - server-side only)
CLOUDINARY_API_SECRET=your_api_secret (Private - server-side only)

# App URL
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**Important:**
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Variables without `NEXT_PUBLIC_` are server-side only
- Set these for **Production**, **Preview**, and **Development** environments

---

### 2. **Build Errors**

#### ESLint Errors During Build

If you see ESLint errors during build:

1. **Option A: Fix the errors** (Recommended)
   ```bash
   npm run lint
   # Fix all errors
   ```

2. **Option B: Temporarily disable ESLint during build** (Not recommended for production)
   Create `next.config.ts`:
   ```typescript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     eslint: {
       ignoreDuringBuilds: true,
     },
   };
   
   export default nextConfig;
   ```

#### TypeScript Errors

TypeScript errors will fail the build. Always fix TypeScript errors:
```bash
npx tsc --noEmit
```

---

### 3. **Image Optimization Configuration**

If using Next.js Image component with external URLs (Cloudinary), you need to configure it:

Add to `next.config.ts`:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    unoptimized: false, // Set to true if you want to disable optimization
  },
};

export default nextConfig;
```

---

### 4. **Node Version Compatibility**

Vercel uses Node.js 18.x by default. To specify a different version:

Create `.nvmrc` in project root:
```
18.20.0
```

Or set in Vercel Dashboard:
- Settings → General → Node.js Version → Select version

---

### 5. **API Route Issues**

#### Cloudinary Configuration Error

If you see `Cloudinary credentials not configured`:

1. Check that `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` are set (NOT `NEXT_PUBLIC_*`)
2. These must be set in Vercel Environment Variables
3. They are server-side only and won't be exposed to the browser

#### CORS Issues

If API routes fail with CORS errors, Vercel handles CORS automatically. No additional configuration needed.

---

### 6. **Build Command Issues**

Ensure `package.json` has correct build script:

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

Vercel automatically detects Next.js and runs `npm run build`, so this should work by default.

---

### 7. **Firebase Configuration Issues**

#### Firestore Rules

Make sure your Firestore rules allow public read/write during development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /pickupRequests/{requestId} {
      allow read, write: if request.auth != null;
    }
    match /recyclers/{recyclerId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

#### Firebase Authentication

Enable Email/Password and Google Sign-In providers in Firebase Console:
- Firebase Console → Authentication → Sign-in method
- Enable Email/Password
- Enable Google

---

### 8. **Deployment Checklist**

Before deploying to Vercel:

- [ ] All environment variables set in Vercel Dashboard
- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Local build succeeds (`npm run build`)
- [ ] Firebase Authentication enabled
- [ ] Firestore database created
- [ ] Cloudinary account configured
- [ ] `next.config.ts` configured for images (if using external images)

---

### 9. **Troubleshooting Steps**

1. **Check Vercel Build Logs**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on failed deployment
   - Check "Build Logs" for specific error

2. **Verify Environment Variables**
   - Settings → Environment Variables
   - Ensure all variables are set
   - Check that private variables don't have `NEXT_PUBLIC_` prefix

3. **Test Locally with Production Build**
   ```bash
   npm run build
   npm run start
   ```

4. **Check Function Logs**
   - Vercel Dashboard → Functions → View logs
   - Look for API route errors

5. **Verify Firebase Configuration**
   - Check Firebase Console → Project Settings
   - Ensure all config values match environment variables

---

### 10. **Common Error Messages and Fixes**

#### "Module not found"
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### "Environment variable not found"
- Add the variable in Vercel Dashboard
- Redeploy after adding variables

#### "Build exceeded maximum build time"
- Optimize your build process
- Consider using ISR (Incremental Static Regeneration)
- Split large pages into smaller chunks

#### "Function exceeded maximum execution time"
- Optimize API routes
- Add timeout configurations
- Consider serverless function optimization

---

### 11. **Quick Fix Script**

If deployment keeps failing, try this cleanup:

```bash
# Clean build artifacts
rm -rf .next
rm -rf node_modules
rm package-lock.json

# Fresh install
npm install

# Test build locally
npm run build

# If successful, commit and push
git add .
git commit -m "Fix deployment issues"
git push
```

---

### 12. **Vercel-Specific Configuration**

Create `vercel.json` (optional) for advanced configuration:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

---

## Still Having Issues?

1. Check Vercel's [Next.js documentation](https://vercel.com/docs/frameworks/nextjs)
2. Review [Vercel deployment logs](https://vercel.com/docs/concepts/deployments/logs)
3. Check [Next.js deployment documentation](https://nextjs.org/docs/deployment)

---

**Note:** Always test your production build locally before deploying:
```bash
npm run build
npm run start
```

