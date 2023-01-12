/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ignoreDuringBuild: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self' 'ws://broker.emqx.io:8083/mqtt' 'https://smart-car-parking-system-api-backend.onrender.com'",
          },
        ]
      }
    ]
  },
}

module.exports = nextConfig
