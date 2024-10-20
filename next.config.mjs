// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

  images: {
    domains: [process.env.NEXT_PUBLIC_CDN_DOMAIN],
  },
}

export default nextConfig
