import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/media/**',
      },
      {
        // Vercel / production domain (update before deploy)
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/media/**',
      },
    ],
  },
}

export default withPayload(nextConfig)
