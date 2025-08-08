import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import JsonLd from '@/components/seo/json-ld'
import { SeoBaseUrl } from '@/lib/seo'
import { Providers } from '@/components/providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'Jacksonville Home Pros - Find Local Home Service Providers',
    template: '%s | Jacksonville Home Pros'
  },
  description: 'Find and book trusted home service providers in Jacksonville, Florida. From plumbing and electrical to landscaping and remodeling - connect with local professionals.',
  keywords: [
    'Jacksonville home services',
    'Jacksonville contractors',
    'Jacksonville plumbers',
    'Jacksonville electricians',
    'Jacksonville landscapers',
    'Jacksonville handyman',
    'Jacksonville home improvement',
    'Jacksonville home repair',
    'Jacksonville remodeling',
    'Jacksonville HVAC',
    'Jacksonville roofing',
    'Jacksonville cleaning services'
  ],
  authors: [{ name: 'Jacksonville Home Pros' }],
  creator: 'Jacksonville Home Pros',
  publisher: 'Jacksonville Home Pros',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.jacksonvillehomeprofessionals.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jacksonvillehomeprofessionals.com',
    title: 'Jacksonville Home Pros - Find Local Home Service Providers',
    description: 'Find and book trusted home service providers in Jacksonville, Florida. From plumbing and electrical to landscaping and remodeling - connect with local professionals.',
    siteName: 'Jacksonville Home Pros',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jacksonville Home Pros - Local Home Service Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jacksonville Home Pros - Find Local Home Service Providers',
    description: 'Find and book trusted home service providers in Jacksonville, Florida.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0066CC" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.mapbox.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />

        {/* Organization & WebSite JSON-LD */}
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Jacksonville Home Pros',
            url: SeoBaseUrl,
            logo: `${SeoBaseUrl}/favicon.ico`,
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: '+1-904-555-1234',
                email: 'hello@jacksonvillehomeprofessionals.com',
                contactType: 'customer service',
                areaServed: 'US',
                availableLanguage: 'en',
              },
            ],
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Jacksonville Home Pros',
            url: SeoBaseUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SeoBaseUrl}/search?search={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white text-neutral-900`}>
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22C55E',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
} 