import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PowerWash Bros',
    short_name: 'PowerWash Bros',
    description: "Dorset's Leading Property Maintenance Experts",
    start_url: '/',
    display: 'standalone',
    background_color: '#0B1E3F',
    theme_color: '#0B1E3F',
    icons: [
      {
        src: '/images/pwb-logo-circle.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/pwb-logo-full.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
