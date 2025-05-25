/** @type {import('next').NextConfig} */

// const isProd = process.env.NODE_ENV === 'production'
const isProd = true

const nextConfig = {
  output: 'export',
  basePath: '',
  assetPrefix: isProd ? '' : '',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
