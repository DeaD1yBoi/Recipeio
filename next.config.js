/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = { images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img001.prntscr.com',
        pathname: '**',
      },
    ],
  }, }
