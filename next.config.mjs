/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // Required for static site generation
  basePath: '/project-nextjs', // Should match your repository name
  images: {
    unoptimized: true}
};

export default nextConfig;
