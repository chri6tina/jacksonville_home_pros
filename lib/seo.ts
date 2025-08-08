const BASE_URL = 'https://www.jacksonvillehomeprofessionals.com'

export type FaqItem = { question: string; answer: string }

export function getBreadcrumbJsonLd(
  pageUrlPath: string,
  serviceName: string
) {
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: `${BASE_URL}/services`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: serviceName,
      item: `${BASE_URL}${pageUrlPath}`,
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }
}

export function getFaqPageJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}

export function getLocalBusinessJsonLd() {
  // Represent the platform as a local service directory business
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Jacksonville Home Pros',
    url: BASE_URL,
    areaServed: {
      '@type': 'City',
      name: 'Jacksonville',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jacksonville',
        addressRegion: 'FL',
        addressCountry: 'US',
      },
    },
  }
}

export function getServiceJsonLd(
  serviceName: string,
  pageUrlPath: string,
  description: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description,
    areaServed: {
      '@type': 'City',
      name: 'Jacksonville',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jacksonville',
        addressRegion: 'FL',
        addressCountry: 'US',
      },
    },
    provider: {
      '@type': 'LocalBusiness',
      name: 'Jacksonville Home Pros',
      url: BASE_URL,
    },
    url: `${BASE_URL}${pageUrlPath}`,
    serviceType: serviceName,
    brand: {
      '@type': 'Brand',
      name: 'Jacksonville Home Pros',
    },
  }
}

export const SeoBaseUrl = BASE_URL


