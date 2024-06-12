/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost:8000',
        port: '',
        pathname: '/files/**',
      },
    ],
  },
};

module.exports = {
  images: {
    domains: ['static.netski.com'],
  },
}

export default nextConfig;
