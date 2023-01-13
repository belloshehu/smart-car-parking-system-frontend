/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ignoreDuringBuild: true,
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value:
  //             "default-src *; script-src *; style-src * ",
  //         },
  //       ]
  //     }
  //   ]
  // },
}

module.exports = nextConfig
