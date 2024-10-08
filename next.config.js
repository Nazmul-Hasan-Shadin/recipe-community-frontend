/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // experimental: {
  //   turbo: false, // Ensure Turbopack is disabled
  // },
};

module.exports = nextConfig;
