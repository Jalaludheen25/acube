import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Instrument_Serif, Plus_Jakarta_Sans, Sora } from 'next/font/google'
import type { ReactNode } from 'react'

import { CustomCursor } from '@/components/layout/CustomCursor'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageTransitionProvider } from '@/components/transition/PageTransition'
import { site } from '@/content/site'
import { organizationJsonLd } from '@/lib/seo'
import { siteUrl } from '@/lib/utils'

import './globals.css'

/** Headlines — modern geometric sans. */
const display = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

/** Body and UI text. */
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

/** Italic accent words only (the blue gradient highlights in headlines). */
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument-serif',
  display: 'swap',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'business setup Dubai',
    'company formation UAE',
    'business setup Bur Dubai',
    'mainland company formation',
    'free zone company setup',
    'offshore company UAE',
    'PRO services Dubai',
    'visa services Dubai',
    'document attestation Dubai',
    'corporate services UAE',
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_AE',
    url: '/',
    title: site.title,
    description: site.description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: site.title }],
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: ['/og.jpg'] },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#f7f9fc',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll>
            <PageTransitionProvider>
              <ScrollProgress />
              <Navbar />
              <main id="main" tabIndex={-1} className="outline-none">
                {children}
              </main>
              <Footer />
              <WhatsAppFab />
              <CustomCursor />
            </PageTransitionProvider>
          </SmoothScroll>
        </MotionProvider>
        <div className="grain" aria-hidden="true" />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  )
}
