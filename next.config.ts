import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization for Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // Optional: Disable image optimization if you encounter issues
  // unoptimized: true,
  // Ignore ESLint during builds due to eslint-plugin-react dependency issue
  // This is safe since:
  // 1. TypeScript checking still happens (typescript.ignoreBuildErrors: false)
  // 2. We can run ESLint separately with `npm run lint`
  // 3. The es-abstract module issue is a known ESLint 9 compatibility problem
  eslint: {
    ignoreDuringBuilds: true, // Prevents build failures from ESLint plugin dependency issues
  },
  typescript: {
    // Ensure TypeScript errors fail the build (more important than ESLint)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
