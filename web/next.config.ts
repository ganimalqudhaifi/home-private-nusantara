import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Juga ditambahkan untuk memastikan MOCK_DATA yang ada sebelumnya tidak error
      }
    ],
  },
};

export default nextConfig;
