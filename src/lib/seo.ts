import type { Metadata } from 'next'

import { site } from '@/content/site'
import { absoluteUrl, siteUrl } from '@/lib/utils'

type PageMetaInput = {
  title?: string
  description?: string
  path: string
}

/** Per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description = site.description, path }: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.title
  return {
    title: title ? title : { absolute: site.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_AE',
      url: path,
      title: fullTitle,
      description,
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: site.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/og.jpg'],
    },
  }
}

const orgId = `${siteUrl}/#organization`

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': orgId,
        name: site.name,
        legalName: site.legalName,
        description: site.description,
        url: absoluteUrl('/'),
        logo: absoluteUrl('/brand/acube-logo.svg'),
        image: absoluteUrl('/og.jpg'),
        email: site.email,
        telephone: site.phones[0].tel,
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${site.address.shop}, ${site.address.building}, ${site.address.landmark}`,
          addressLocality: `${site.address.area}, ${site.address.city}`,
          addressRegion: site.address.city,
          addressCountry: site.address.countryCode,
        },
        areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
        contactPoint: site.phones.map((p) => ({
          '@type': 'ContactPoint',
          telephone: p.tel,
          contactType: 'customer service',
          areaServed: 'AE',
          availableLanguage: ['English'],
        })),
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: absoluteUrl('/'),
        name: site.name,
        publisher: { '@id': orgId },
        inLanguage: 'en',
      },
    ],
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function serviceJsonLd(service: { title: string; description: string; path: string; category: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    serviceType: service.category,
    url: absoluteUrl(service.path),
    provider: { '@id': orgId },
    areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}
