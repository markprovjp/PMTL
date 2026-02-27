/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // UI components copied from shadcn have some unused deps — safe to ignore
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      // External media
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      // Strapi local uploads (dev)
      { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/uploads/**' },
      // Strapi production (update hostname when deploying)
      { protocol: 'https', hostname: 'api.phapmontamlinh.vn', pathname: '/uploads/**' },
    ],
  },
};

export default nextConfig;
