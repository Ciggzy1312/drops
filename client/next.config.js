/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://drops-backend.onrender.com/api/:path*'
      }
    ]
  }
}

module.exports = nextConfig
