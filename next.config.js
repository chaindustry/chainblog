/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "chainblog-backend.herokuapp.com",
      "chainblog-api.herokuapp.com",
    ],
  },
};

module.exports = nextConfig;
