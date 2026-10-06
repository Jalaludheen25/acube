import type { ImageKey } from './images'

export type Industry = { name: string; licence: string; image: ImageKey }

export const industriesIntro = {
  eyebrow: 'Who We Help',
  title: "We help businesses establish themselves across the UAE's key sectors.",
  homeTitle: 'The sectors we help businesses enter and grow across the UAE.',
  footnote: "Don't see your sector? We help entrepreneurs set up across the UAE.",
}

export const industries: Industry[] = [
  { name: 'Trading', licence: 'Trade Licence', image: 'dhowCargo' },
  { name: 'Real Estate', licence: 'Property Docs', image: 'palmFrondsDay' },
  { name: 'Construction', licence: 'Building Permit', image: 'indConstruction' },
  { name: 'Hospitality & F&B', licence: 'Health Permit', image: 'madinatDay' },
  { name: 'Retail', licence: 'Trade Licence', image: 'indRetail' },
  { name: 'Professional Services', licence: 'Practice Licence', image: 'indProfessional' },
  { name: 'Technology', licence: 'Tech Licence', image: 'officeModern' },
  { name: 'Healthcare', licence: 'Medical Licence', image: 'hospitalCorridor' },
  { name: 'Manufacturing', licence: 'Industrial Permit', image: 'warehouseBright' },
  { name: 'Import & Export', licence: 'Customs Docs', image: 'cargoPortDay' },
  { name: 'Education', licence: 'Accreditation', image: 'indEducation' },
  { name: 'Media', licence: 'Media Licence', image: 'studioWhite' },
]
