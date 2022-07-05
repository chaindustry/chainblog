/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "chainblog-backend.herokuapp.com",
      "chainblog-api.herokuapp.com",
      // "chainblog-api.herokuapp.comhttps",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
