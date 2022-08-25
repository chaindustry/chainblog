/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/sitemap.xml",
  //       destination: "/api/sitemap",
  //     },
  //   ];
  // },
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
