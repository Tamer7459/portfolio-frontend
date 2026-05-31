import type { NextConfig } from 'next'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const nextConfig: NextConfig = {
    turbopack: {
        root: path.dirname(fileURLToPath(import.meta.url))
    },
    images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
}


export default nextConfig
