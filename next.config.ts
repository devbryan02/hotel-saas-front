import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard',
        missing: [
          {
            type: 'cookie',
            key: 'catin_auth',
          },
        ],
        destination: '/login',
        permanent: false,
      },
      {
        source: '/dashboard/:path*',
        missing: [
          {
            type: 'cookie',
            key: 'catin_auth',
          },
        ],
        destination: '/login',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;