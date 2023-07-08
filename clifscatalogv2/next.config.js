/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "spoonacular.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
