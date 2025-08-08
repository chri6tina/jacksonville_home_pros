import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/auth/',
        '/dashboard/',
        '/_next/',
        '/private/',
      ],
    },
    sitemap: 'https://www.jacksonvillehomeprofessionals.com/sitemap.xml',
  }
} 