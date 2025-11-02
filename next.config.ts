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
  // Temporarily ignore ESLint warnings during build for Vercel
  // This is safe since we check TypeScript separately
  eslint: {
    // Warning: This allows production builds to complete even if ESLint has errors
    // Only use this if ESLint errors are non-critical (like the es-abstract warning)
    ignoreDuringBuilds: false, // Set to true if ESLint plugin issues persist on Vercel
  },
  typescript: {
    // Ensure TypeScript errors fail the build (more important than ESLint)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
