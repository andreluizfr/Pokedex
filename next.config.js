/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
            port: '',
            pathname: '/PokeAPI/**',
          },
          {
            protocol: 'https',
            hostname: 'assets.pokemon.com',
            port: '',
            pathname: '/assets/cms2/img/pokedex/full/**',
          }
        ],
      },
    reactStrictMode: false,
    output: "export",
}

module.exports = nextConfig
