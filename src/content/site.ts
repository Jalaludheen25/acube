/**
 * Company facts and contact details — sourced from the existing ACUBE website.
 * Do not add figures, offices or claims here that ACUBE has not confirmed.
 */

export const site = {
  name: 'ACUBE',
  legalName: 'ACUBE Documents Services',
  title: 'ACUBE — Business Setup & Corporate Consultancy in the UAE',
  description:
    'ACUBE Documents Services provides business setup, company formation, and corporate & government document services in Bur Dubai, Dubai, United Arab Emirates.',
  positioning: 'Business Setup & Corporate Consultancy',
  tagline: 'Helping businesses establish themselves confidently across the UAE.',
  yearsOfExperience: 20,
  email: 'acubedubai@gmail.com',
  phones: [
    { display: '+971 4 39 33 826', tel: '+97143933826', label: 'Office' },
    { display: '+971 55 775 4101', tel: '+971557754101', label: 'Mobile' },
    { display: '+971 50 531 7272', tel: '+971505317272', label: 'Mobile' },
  ],
  whatsapp: {
    display: '+971 55 775 4101',
    number: '971557754101',
    greeting: "Hello ACUBE, I'd like to ask about your services.",
  },
  address: {
    shop: 'Shop No. 09',
    building: 'Saeyed Building',
    landmark: 'Opp. Old Al Madeena Super Market',
    area: 'Bur Dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    formatted:
      'Shop No. 09, Saeyed Building, Opp. Old Al Madeena Super Market, Bur Dubai, Dubai, United Arab Emirates',
  },
} as const

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Saeyed Building, Old Al Madeena Super Market, Bur Dubai, Dubai',
)}`

export function whatsappUrl(text: string = site.whatsapp.greeting) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`
}

export type NavItem = { label: string; href: string }

export const mainNav: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Packages', href: '/packages' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Why ACUBE', href: '/why-acube' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export const legalNav: NavItem[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

export const primaryCta = { label: 'Book Free Consultation', href: '/contact' } as const
