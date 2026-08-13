import type { RouteDeclaration } from '@/types/navigation'

/**
 * Site routes
 * @type {Object}
 */

export const ROUTES = {
  home: { path: '/', icon: 'home' },
  services: { path: '/services', icon: 'scissors' },
  about: { path: '/about', icon: 'sparkles' },
  works: { path: '/works', icon: 'gallery' },
  appointment: { path: '/appointment', icon: 'calendar', ctaAction: 'bookAppointment' },
  contact: { path: '/contact', icon: 'mail', ctaAction: 'contact' },
  thankYou: { path: '/thank-you', icon: 'success', indexable: false },
  legalNotice: { path: '/legal-notice', icon: 'scale' },
  privacyPolicy: { path: '/privacy-policy', icon: 'shield' },
} as const satisfies Record<string, RouteDeclaration>

/**
 * Section anchors
 * @type {Object}
 */

export const SECTION_ANCHORS = {
  hero: 'hero',
  features: 'savoir-faire',
  pricing: 'prestations',
  credentials: 'parcours',
  faq: 'questions',
  callToAction: 'rendez-vous',
  contact: 'contact',
  booking: 'reservation',
  testimonials: 'avis',
  transformations: 'avant-apres',
} as const
