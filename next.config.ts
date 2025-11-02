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
};

export default nextConfig;
