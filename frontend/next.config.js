/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Static export için gerekli
  trailingSlash: true,  // GitHub Pages için önerilen
  images: {
    unoptimized: true,  // Static export için gerekli
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // GitHub Pages base path (eğer custom domain kullanacaksanız boş bırakın)
  basePath: '',
}

module.exports = nextConfig
