// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

Copy/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Required for static site generation
  basePath: '/project-nextjs', // Should match your repository name
  images: {
    unoptimized: true // Required for static export
  }
}

module.exports = nextConfig
