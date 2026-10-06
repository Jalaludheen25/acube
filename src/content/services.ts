import type { ImageKey } from './images'

export type ServiceCategory = {
  slug: string
  number: string
  title: string
  shortTitle: string
  summary: string
}

export type Service = {
  slug: string
  category: ServiceCategory['slug']
  title: string
  description: string
  idealFor?: string
  /** Inclusions as published on the current ACUBE service pages. Empty when none were listed. */
  includes: string[]
  image: ImageKey
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'business-setup-company-formation',
    number: '01',
    title: 'Business Setup & Company Formation',
    shortTitle: 'Business Setup',
    summary: 'Company formation, visas, licensing and government approvals — mainland, free zone, or offshore.',
  },
  {
    slug: 'corporate-legal-services',
    number: '02',
    title: 'Corporate & Legal Services',
    shortTitle: 'Corporate & Legal',
    summary: 'Documentation, compliance, amendments and legal support for companies at every stage.',
  },
  {
    slug: 'documentation-government-services',
    number: '03',
    title: 'Documentation & Government Services',
    shortTitle: 'Documentation & Government',
    summary: 'Emirates ID, medical, immigration, typing, clearing and company stamps — handled for you.',
  },
]

export const services: Service[] = [
  // ── 01 Business Setup & Company Formation ──────────────────────────
  {
    slug: 'business-setup',
    category: 'business-setup-company-formation',
    title: 'Business Setup',
    description: 'End-to-end company setup in the UAE — mainland, free zone, or offshore.',
    idealFor: 'New entrepreneurs & investors',
    includes: [
      'Mainland Company Formation',
      'Free Zone Company Formation',
      'Offshore Company Formation',
      'Branch Office Setup',
      'Business License Registration',
      'Trade License Renewal',
      'License Amendment',
      'License Cancellation',
      'Company Liquidation',
    ],
    image: 'museumFutureDay',
  },
  {
    slug: 'visa-services',
    category: 'business-setup-company-formation',
    title: 'Visa Services',
    description: 'Residency, employment, and family visas processed from start to finish.',
    idealFor: 'Employers & families',
    includes: [
      'Employment Visa',
      'Investor Visa',
      'Partner Visa',
      'Family Visa',
      'Dependent Visa',
      'Visit Visa Assistance',
      'Visa Renewal',
      'Visa Cancellation',
      'Status Change',
      'Emirates ID Processing',
    ],
    image: 'burjPalmsDay',
  },
  {
    slug: 'instant-license',
    category: 'business-setup-company-formation',
    title: 'Instant License',
    description: 'Fast-track licensing plus the labour and immigration steps that follow.',
    idealFor: 'Time-sensitive launches',
    includes: [
      'Labour & Immigration',
      'Work Permit Processing',
      'Labour Contract Registration',
      'Labour Card Services',
      'MOHRE Services',
      'Immigration Services (ICP/GDRFA)',
      'Quota Approval',
      'Establishment Card Services',
      'Employee Visa Quota Management',
    ],
    image: 'boulevardDay',
  },
  {
    slug: 'government-approvals',
    category: 'business-setup-company-formation',
    title: 'Government Approvals',
    description: 'Approvals and submissions handled across the relevant UAE authorities.',
    idealFor: 'Mainland setups',
    includes: [
      'DED Services',
      'Municipality Approvals',
      'Chamber of Commerce Services',
      'Ministry Approvals',
      'Economic Department Services',
      'Document Submission & Follow-up',
    ],
    image: 'dubaiFrameDay',
  },
  {
    slug: 'bank-labour-inspection',
    category: 'business-setup-company-formation',
    title: 'Bank Inspection / Labour Inspection',
    description: 'Inspection preparation and support for bank and labour requirements.',
    idealFor: 'Established companies',
    includes: [],
    image: 'towersUpDay',
  },

  // ── 02 Corporate & Legal Services ──────────────────────────────────
  {
    slug: 'document-services',
    category: 'corporate-legal-services',
    title: 'Document Services',
    description: 'Attestation, translation, notary, and corporate tax compliance support.',
    idealFor: 'All businesses',
    includes: [
      'Document Attestation',
      'Legal Translation',
      'Notary Public Services',
      'Certificate Attestation',
      'Power of Attorney Processing',
      'Document Typing',
      'Arabic Typing',
      'Embassy Attestation',
      'Corporate Tax Registration',
      'VAT Registration',
      'VAT Deregistration',
      'Corporate Tax Filing Assistance',
      'UBO Filing',
      'ESR Compliance (if applicable)',
      'AML Compliance Assistance',
    ],
    image: 'signing',
  },
  {
    slug: 'corporate-services',
    category: 'corporate-legal-services',
    title: 'Corporate Services',
    description: 'Ongoing corporate, tax, and compliance support for established businesses.',
    idealFor: 'Growing companies',
    includes: [
      'Corporate Tax Registration',
      'VAT Registration',
      'VAT Deregistration',
      'Corporate Tax Filing Assistance',
      'UBO Filing',
      'ESR Compliance (if applicable)',
      'AML Compliance Assistance',
    ],
    image: 'businessBayDay',
  },
  {
    slug: 'memorandum-of-association',
    category: 'corporate-legal-services',
    title: 'Memorandum of Association',
    description: 'Drafting, processing, and amending your Memorandum of Association.',
    idealFor: 'New & restructuring companies',
    includes: [
      'Company Amendments',
      'Shareholder Changes',
      'Manager Changes',
      'Office Address Updates',
      'Activity Addition/Removal',
      'Memorandum (MOA) Amendments',
    ],
    image: 'windTower',
  },
  {
    slug: 'power-of-attorney',
    category: 'corporate-legal-services',
    title: 'Power of Attorney',
    description: 'Preparation, attestation, and translation of Power of Attorney documents.',
    idealFor: 'Delegated authority',
    includes: [
      'Legal Translation',
      'Notary Public Services',
      'Certificate Attestation',
      'Power of Attorney Processing',
      'Document Typing',
      'Arabic Typing',
      'Embassy Attestation',
    ],
    image: 'heritageDoor',
  },
  {
    slug: 'company-liquidation',
    category: 'corporate-legal-services',
    title: 'Company Liquidation',
    description: 'Orderly closure and deregistration of companies, end to end.',
    idealFor: 'Businesses winding down',
    includes: [
      'Company Closure Consultation',
      'Board Resolution & Shareholder Resolution',
      'Preparation of Liquidation Report',
      'Trade License Cancellation',
      'Establishment Card Cancellation',
      'Immigration File Closure',
      'MOHRE Labour File Closure',
    ],
    image: 'burjHaze',
  },
  {
    slug: 'cases-court-applications',
    category: 'corporate-legal-services',
    title: 'Cases & Court Applications',
    description: 'Support with case filing, documentation, and court applications.',
    idealFor: 'Legal matters',
    includes: [
      'Commercial Case Documentation',
      'Labour Case Support',
      'Legal Notice Preparation',
      'Court Document Typing',
      'Case Filing Assistance',
      'Court Fee Payment Assistance',
      'Police Clearance Certificate Assistance',
    ],
    image: 'heritageFacade',
  },

  // ── 03 Documentation & Government Services ─────────────────────────
  {
    slug: 'emirates-id-applications',
    category: 'documentation-government-services',
    title: 'Emirates ID Applications',
    description: 'Emirates ID application processing.',
    includes: [],
    image: 'burjBlue',
  },
  {
    slug: 'medical-applications',
    category: 'documentation-government-services',
    title: 'Medical Applications',
    description: 'Medical fitness application processing.',
    includes: [],
    image: 'clinicRoom',
  },
  {
    slug: 'immigration-paperwork',
    category: 'documentation-government-services',
    title: 'Immigration Paperwork',
    description: 'Immigration document preparation and processing.',
    includes: [],
    image: 'burjAlArabAerial',
  },
  {
    slug: 'typing-photocopying',
    category: 'documentation-government-services',
    title: 'Typing & Photocopying',
    description: 'Professional typing and photocopying services.',
    includes: [],
    image: 'officeBright',
  },
  {
    slug: 'document-clearing',
    category: 'documentation-government-services',
    title: 'Document Clearing',
    description: 'Document clearing and attestation support.',
    includes: [],
    image: 'burDubaiStreet',
  },
  {
    slug: 'stamp-seal-making',
    category: 'documentation-government-services',
    title: 'Stamp & Seal Making',
    description: 'Company stamp and seal production.',
    includes: [],
    image: 'frameDetail',
  },
]

/** Services shown in the homepage's interactive presentation. */
export const featuredServiceSlugs = [
  'business-setup',
  'visa-services',
  'instant-license',
  'government-approvals',
  'corporate-services',
  'document-services',
] as const

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}

export function getCategory(slug: string) {
  return serviceCategories.find((c) => c.slug === slug)
}

export function servicesInCategory(categorySlug: string) {
  return services.filter((s) => s.category === categorySlug)
}

/** Global running number for a service, e.g. "07". */
export function serviceNumber(slug: string) {
  return String(services.findIndex((s) => s.slug === slug) + 1).padStart(2, '0')
}
