/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      // Redirect patio-cleaning to patio-decking (correct service name)
      {
        source: '/services/patio-cleaning',
        destination: '/services/patio-decking',
        permanent: true, // 301 instead of 307
      },
      // Redirect powerup (singular) to powerups (plural)
      {
        source: '/services/powerup',
        destination: '/powerups',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
