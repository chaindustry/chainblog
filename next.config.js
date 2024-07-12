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
      "chainblog-strapi-aws-s3-images-bucket.s3.eu-north-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
