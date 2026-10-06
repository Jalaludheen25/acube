import type { ImageKey } from './images'

/** Copy sourced from the existing ACUBE website (Home, About, Why ACUBE, Services, Packages pages). */

export const hero = {
  eyebrow: 'Business Setup & Corporate Consultancy',
  lines: ['Build Your Business.', 'Grow With Confidence.', 'In The UAE.'],
  lede: 'Helping entrepreneurs establish and grow successful businesses across the UAE — with expert consultation, company formation, and end-to-end corporate services.',
}

export const intro = {
  statement:
    'ACUBE helps entrepreneurs establish and grow successful businesses across the UAE — with expert consultation, company formation, and end-to-end corporate services.',
  pillars: [
    { word: 'Establish.', caption: 'Company formation, licensing and approvals — handled end-to-end.' },
    { word: 'Structure.', caption: 'Mainland, free zone, or offshore — the structure that fits how you plan to operate.' },
    { word: 'Grow.', caption: 'Support that continues long after your license is issued.' },
  ],
}

export const mission = {
  title: 'To help businesses establish themselves confidently across the UAE.',
  body: 'We handle the complexity of setup so founders can focus on building — one partner, from your first question to a fully operational business.',
}

export const vision = {
  title: 'To be the partner entrepreneurs trust at every step of their UAE journey.',
  body: 'From first licence to long-term growth — a relationship that outlasts the paperwork.',
}

export const story = {
  title: 'Built to make UAE setup simple.',
  paragraphs: [
    'ACUBE Documents Services provides business setup, company formation, and corporate & government document services in Bur Dubai, Dubai, United Arab Emirates.',
    'From our base in Bur Dubai, we guide entrepreneurs through every step of establishing and running a business in the Emirates — so the paperwork never gets in the way of the plan.',
  ],
}

export const trust = {
  eyebrow: 'Trust',
  title: 'Built on guidance. Made to last.',
  body: 'With 20+ years of experience, we believe every business deserves careful guidance and a foundation built to last — the standard we hold ourselves to on every setup we handle.',
  signature: '— ACUBE',
}

export type Principle = { title: string; description: string }

export const principles: Principle[] = [
  { title: 'End-to-End Support', description: 'One partner from your first question to a fully operational business.' },
  { title: 'Personal Guidance', description: 'Direct access to an experienced consultant who handles your setup personally.' },
  { title: 'Local & Government Knowledge', description: 'Deep familiarity with UAE procedures, licensing, and approvals.' },
  { title: 'Transparency', description: 'Clear communication and honest advice at every step.' },
  { title: 'A Long-Term Partner', description: 'Support that continues long after your license is issued.' },
]

export const values: Principle[] = [
  { title: 'Transparency', description: 'Clear communication and honest advice at every step.' },
  { title: 'Personal Guidance', description: 'Direct access to an experienced consultant who handles your setup personally.' },
  { title: 'A Long-Term Partner', description: 'Support that continues long after your license is issued.' },
]

export type Step = { title: string; description: string }

/** Homepage "The Journey". */
export const journey: Step[] = [
  { title: 'Consultation', description: 'We understand your goals, activity, and budget.' },
  { title: 'Planning', description: 'We choose the right jurisdiction, structure, and license.' },
  { title: 'Documentation', description: 'We prepare and process everything your application needs.' },
  { title: 'Government Process', description: 'We handle approvals, licensing, and official procedures.' },
  { title: 'Business Ready', description: 'Your company is established — ready to operate and grow.' },
]

/** About page "How we work". */
export const howWeWork: Step[] = [
  { title: 'Consult', description: 'We start with a free conversation to understand your goals, activity, and where you want to operate.' },
  { title: 'Structure', description: 'We recommend the right setup — mainland, free zone, or offshore — for how you actually plan to work.' },
  { title: 'Documentation', description: "We prepare and submit the paperwork, coordinating approvals so you don't have to chase them." },
  { title: 'Licence', description: 'We secure your trade licence and get your business legally ready to operate in the UAE.' },
  { title: 'Beyond', description: "We stay on as your partner — renewals, amendments, and everyday documentation after you're live." },
]

/** Why ACUBE page "What to expect". */
export const expectations: Step[] = [
  { title: 'Free consultation', description: 'We listen first — your goals, activity, and where you want to operate.' },
  { title: 'A tailored plan', description: 'We recommend the structure and licence that actually fit your business.' },
  { title: 'We handle it', description: 'Paperwork, approvals, and government liaison — managed end-to-end.' },
  { title: "You're operational", description: "Your licence is issued and you're ready to trade — with us still on call." },
]

export const handledForYou = [
  'Company formation & licensing',
  'Documentation & attestation',
  'Government liaison & approvals',
  'Renewals & amendments',
  'Corporate & structural changes',
  'Ongoing support after launch',
]

export const howWeWorkQualities = [
  'Transparent advice',
  'One personal consultant',
  'Local & government knowledge',
  'Long-term partnership',
]

export type Structure = {
  slug: 'mainland' | 'free-zone' | 'offshore'
  title: string
  tagline: string
  description: string
  summary: string
  image: ImageKey
}

export const structures: Structure[] = [
  {
    slug: 'mainland',
    title: 'Mainland',
    tagline: 'Trade anywhere in the UAE',
    description:
      "A licence issued by the emirate's Department of Economic Development — trade across the local market and bid for government work.",
    summary: 'Designed for businesses trading directly across the UAE market.',
    image: 'szrDay',
  },
  {
    slug: 'free-zone',
    title: 'Free Zone',
    tagline: '100% ownership, streamlined setup',
    description:
      'Set up inside a designated free zone with full ownership, a simplified process, and facilities suited to your activity.',
    summary: 'Full ownership and tax advantages, with a fast, streamlined setup.',
    image: 'marinaDay',
  },
  {
    slug: 'offshore',
    title: 'Offshore',
    tagline: 'For holding & international business',
    description:
      'An offshore structure for holding assets and conducting business internationally, without a physical UAE office requirement.',
    summary: 'A cost-efficient structure for holding assets and international operations.',
    image: 'palmCoastDay',
  },
]

/** Services page — "The complexity is ours. The business is yours." */
export const differentiators = [
  {
    label: 'End-to-end',
    summary: 'One team from your first question to a fully licensed, operational business.',
    title: 'One journey, one team.',
    points: ['A single engagement, start to finish', 'No handoffs between departments', 'One file to track, not five'],
  },
  {
    label: 'One point of contact',
    summary: 'A single consultant who owns your file — no being passed around.',
    title: 'Your dedicated consultant.',
    points: ['A direct line, not a call centre', 'The same person from day one', 'Reachable for follow-ups after launch'],
  },
  {
    label: 'UAE-savvy',
    summary: 'Deep familiarity with local procedures, jurisdictions, and approvals.',
    title: 'Local expertise, applied.',
    points: ['Mainland and free zone fluency', 'Current with local procedures', 'Relationships that keep paperwork moving'],
  },
  {
    label: 'Transparent',
    summary: 'Clear steps and honest advice at every stage — no surprises.',
    title: 'No surprises, ever.',
    points: ['Costs explained upfront', 'Plain-language guidance at each step', 'Honest timelines, not sales pressure'],
  },
]

/** Services page — "Let's find your starting point." */
export const startingPoint = {
  eyebrow: 'Where to start',
  title: "Let's find your starting point.",
  lede: "Answer a few quick questions and we'll tailor your free consultation — no obligation.",
  questions: [
    {
      id: 'intent',
      legend: 'What brings you here?',
      options: [
        { id: 'start', label: 'Start a new business' },
        { id: 'formation', label: 'Company formation & licensing' },
        { id: 'documents', label: 'Documentation & government services' },
        { id: 'unsure', label: 'Not sure yet' },
      ],
    },
    {
      id: 'location',
      legend: 'Where would you set up?',
      options: [
        { id: 'mainland', label: 'Mainland' },
        { id: 'freezone', label: 'Free zone' },
        { id: 'unsure', label: 'Not sure yet' },
      ],
    },
    {
      id: 'timing',
      legend: 'How soon?',
      options: [
        { id: 'asap', label: 'As soon as possible' },
        { id: 'months', label: 'In the next few months' },
        { id: 'exploring', label: 'Just exploring' },
      ],
    },
  ],
} as const

export const ctaCopy = {
  title: 'Ready to build your business in the UAE?',
  body: "Tell us where you are — we'll take it from there. No pressure, no obligation.",
  points: ['Free consultation', 'No obligation', 'One personal consultant'],
}
