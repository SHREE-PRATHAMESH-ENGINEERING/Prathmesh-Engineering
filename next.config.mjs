/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'prathmeshengineering.com',
            port: ""
          }
        ],
      },
    };

export default nextConfig;
