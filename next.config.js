/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable strict mode during build to prevent MongoDB connection issues
  reactStrictMode: true,
  
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Environment variables that should be available at build time
  env: {
    // These will be available in the browser
    // Server-side env vars should be in .env.local or Vercel dashboard
  },
}

module.exports = nextConfig
