import type { FaqItem, FeatureItem, TestimonialItem, TransformationItem } from '@/types/content'

// Highest star a review can carry
export const MAX_RATING = 5

/**
 * Signature services
 * @type {FeatureItem[]}
 */

export const FEATURES: FeatureItem[] = [
  { id: 'colorimetry', translationKey: 'colorimetry', icon: 'palette', tone: 'primary' },
  { id: 'airTouch', translationKey: 'airTouch', icon: 'wind', tone: 'accent' },
  { id: 'cut', translationKey: 'cut', icon: 'scissors', tone: 'neutral' },
  { id: 'bridal', translationKey: 'bridal', icon: 'crown', tone: 'primary' },
  { id: 'care', translationKey: 'care', icon: 'flower', tone: 'success' },
  { id: 'diagnosis', translationKey: 'diagnosis', icon: 'droplet', tone: 'info' },
]

/**
 * Diplomas and certificates
 * @type {FeatureItem[]}
 */

export const CREDENTIALS: FeatureItem[] = [
  { id: 'cap', translationKey: 'cap', icon: 'graduation', tone: 'primary' },
  { id: 'professionalCertificate', translationKey: 'professionalCertificate', icon: 'award' },
  { id: 'bioAesthetics', translationKey: 'bioAesthetics', icon: 'flower', tone: 'accent' },
]

/**
 * Reviews left on Google
 * @type {TestimonialItem[]}
 */

export const TESTIMONIALS: TestimonialItem[] = [
  { id: 'colourHold', translationKey: 'colourHold', rating: 5 },
  { id: 'airTouch', translationKey: 'airTouch', rating: 5 },
  { id: 'bridal', translationKey: 'bridal', rating: 5 },
  { id: 'listening', translationKey: 'listening', rating: 5 },
  { id: 'firstVisit', translationKey: 'firstVisit', rating: 5 },
  { id: 'kids', translationKey: 'kids', rating: 4 },
]

/**
 * Before and after pairs, drawn until the photographs arrive
 * @type {TransformationItem[]}
 */

export const TRANSFORMATIONS: TransformationItem[] = [
  { id: 'brownToBlonde', translationKey: 'brownToBlonde' },
  { id: 'regrowth', translationKey: 'regrowth' },
  { id: 'bobCut', translationKey: 'bobCut' },
  { id: 'bridalUpdo', translationKey: 'bridalUpdo' },
]

/**
 * FAQ items
 * @type {FaqItem[]}
 */

export const FAQ: FaqItem[] = [
  { id: 'duration', translationKey: 'duration' },
  { id: 'colorChange', translationKey: 'colorChange' },
  { id: 'payment', translationKey: 'payment' },
  { id: 'cancel', translationKey: 'cancel' },
  { id: 'access', translationKey: 'access' },
]

/**
 * Legal page sections
 * @type {Object}
 */

export const LEGAL_SECTIONS = {
  legalNotice: ['publisher', 'hosting', 'property', 'liability'],
  privacyPolicy: ['collection', 'purpose', 'retention', 'rights', 'cookies', 'contact'],
} as const

/**
 * Legal page name
 * @typedef {keyof typeof LEGAL_SECTIONS} LegalPage
 */

export type LegalPage = keyof typeof LEGAL_SECTIONS
