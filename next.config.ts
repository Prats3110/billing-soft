import type { NextConfig } from 'next'
import nextPWA from '@ducanh2912/next-pwa'

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

// Apply PWA only in production to avoid Turbopack/webpack conflict
const config = process.env.NODE_ENV === 'development'
  ? nextConfig
  : nextPWA({
      dest: 'public',
      cacheOnFrontEndNav: true,
      aggressiveFrontEndNavCaching: true,
      reloadOnOnline: true,
    })(nextConfig)

export default config