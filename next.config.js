/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'randomuser.me',
      'www.gstatic.com',
      'upload.wikimedia.org',
      `${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com`,
    ],
  },
}

module.exports = nextConfig
