export type PackageTier = {
  slug: 'starter' | 'professional' | 'enterprise'
  number: string
  name: string
  tagline: string
  description?: string
  audience: string
  recommended?: boolean
  highlights: string[]
}

export const packagesIntro = {
  title: 'Business Setup Packages',
  lede: 'From your first licence to a full corporate partnership — tailored on a free consultation.',
  pricing: 'Tailored',
  pricingNote: 'Final quote on your free consultation',
  compareTitle: 'Every package, side by side.',
  compareNote:
    'Final inclusions are confirmed on your free consultation — every setup is scoped to your activity, jurisdiction, and visas.',
}

export const packages: PackageTier[] = [
  {
    slug: 'starter',
    number: '01',
    name: 'Starter',
    tagline: 'Everything you need to get licensed.',
    description:
      'The essentials, handled end-to-end — your company formed, licensed, and legally ready to operate in the UAE.',
    audience: 'First-time founders & solo entrepreneurs',
    highlights: [
      'Company formation & trade licence',
      'Memorandum of Association drafting',
      'Registered virtual office address',
      'Document typing & clearing',
    ],
  },
  {
    slug: 'professional',
    number: '02',
    name: 'Professional',
    tagline: 'Launch the business and the people behind it.',
    audience: 'Startups & growing SMEs',
    recommended: true,
    highlights: [
      'Everything in Starter',
      'Immigration paperwork & visa processing',
      'Emirates ID & medical applications',
      'Sponsorship assistance',
      'Company stamp & seal',
    ],
  },
  {
    slug: 'enterprise',
    number: '03',
    name: 'Enterprise',
    tagline: 'A corporate partner, not just a setup.',
    audience: 'Established companies & investors',
    highlights: [
      'Everything in Professional',
      'Corporate & legal services',
      'Power of Attorney & court applications',
      'Istidama compliance',
      'Renewals, amendments & ongoing support',
      'Dedicated personal consultant',
    ],
  },
]

/** Feature rows for the comparison table; `tiers` lists which packages include the row. */
export const packageFeatures: { label: string; tiers: PackageTier['slug'][] }[] = [
  { label: 'Company formation & trade licence', tiers: ['starter', 'professional', 'enterprise'] },
  { label: 'Memorandum of Association drafting', tiers: ['starter', 'professional', 'enterprise'] },
  { label: 'Registered virtual office address', tiers: ['starter', 'professional', 'enterprise'] },
  { label: 'Document typing & clearing', tiers: ['starter', 'professional', 'enterprise'] },
  { label: 'Visas, immigration & Emirates ID', tiers: ['professional', 'enterprise'] },
  { label: 'Sponsorship assistance', tiers: ['professional', 'enterprise'] },
  { label: 'Company stamp & seal', tiers: ['professional', 'enterprise'] },
  { label: 'Corporate & legal (POA, court, Istidama)', tiers: ['enterprise'] },
  { label: 'Renewals, amendments & ongoing support', tiers: ['enterprise'] },
  { label: 'Dedicated personal consultant', tiers: ['enterprise'] },
]
