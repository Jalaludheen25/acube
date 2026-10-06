import type { MetadataRoute } from 'next'

import { services } from '@/content/services'
import { absoluteUrl } from '@/lib/utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const pages: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/services', priority: 0.9 },
    { path: '/packages', priority: 0.8 },
    { path: '/industries', priority: 0.7 },
    { path: '/about', priority: 0.7 },
    { path: '/why-acube', priority: 0.6 },
    { path: '/contact', priority: 0.8 },
    { path: '/faq', priority: 0.6 },
    { path: '/privacy', priority: 0.2 },
    { path: '/terms', priority: 0.2 },
  ]

  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), lastModified, changeFrequency: 'monthly' as const, priority: p.priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}
