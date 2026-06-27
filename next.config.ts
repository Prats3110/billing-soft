// // next.config.ts
// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   images: {
//     unoptimized: true, // Required for static PWA icons/assets
//   },
// }

// // Only apply PWA in production to avoid Turbopack/webpack conflict in dev
// const isDev = process.env.NODE_ENV === 'development'

// const config = isDev
//   ? nextConfig
//   : (await import('@ducanh2912/next-pwa')).default({
//       dest: 'public',
//       register: true,
//       //skipWaiting: true,
//       cacheOnFrontEndNav: true,
//       aggressiveFrontEndNavCaching: true,
//       reloadOnOnline: true,
//     })(nextConfig)

// export default config

// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
}

export default nextConfig