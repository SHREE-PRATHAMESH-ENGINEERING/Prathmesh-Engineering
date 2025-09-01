/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prathmeshengineering.com',
        port: ""
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: ""
      }
    ],
  },
};

export default nextConfig;