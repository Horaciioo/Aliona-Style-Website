import type { IconName } from '@/declarations/ui/icons'
import type { Identifiable, Tone, TranslationKey } from '@/types/common'

/**
 * Declared picture, intrinsic size included
 * @typedef ImageAsset
 * @property {string} src - Public path
 * @property {number} width - Intrinsic width
 * @property {number} height - Intrinsic height
 */

export interface ImageAsset {
  src: string
  width: number
  height: number
}

/**
 * Feature item
 * @typedef FeatureItem
 * @property {TranslationKey} translationKey - Title key
 * @property {IconName} icon - Display icon
 * @property {Tone} [tone] - Icon tone
 */

export interface FeatureItem extends Identifiable {
  translationKey: TranslationKey
  icon: IconName
  tone?: Tone
}

/**
 * Review left on an external platform
 * @typedef TestimonialItem
 * @property {TranslationKey} translationKey - Quote key
 * @property {number} [rating] - Star rating
 * @property {string} [avatar] - Author picture
 */

export interface TestimonialItem extends Identifiable {
  translationKey: TranslationKey
  rating?: number
  avatar?: string
}

/**
 * Before and after pair
 * @typedef TransformationItem
 * @property {TranslationKey} translationKey - Caption key
 * @property {ImageAsset} [before] - Starting picture, drawn figure while missing
 * @property {ImageAsset} [after] - Finished picture, drawn figure while missing
 */

export interface TransformationItem extends Identifiable {
  translationKey: TranslationKey
  before?: ImageAsset
  after?: ImageAsset
}

/**
 * FAQ item
 * @typedef FaqItem
 * @property {TranslationKey} translationKey - Answer key
 */

export interface FaqItem extends Identifiable {
  translationKey: TranslationKey
}

/**
 * Timeline item
 * @typedef TimelineItem
 * @property {TranslationKey} translationKey - Event description key
 * @property {string} date - Event date
 * @property {IconName} [icon] - Milestone icon
 */

export interface TimelineItem extends Identifiable {
  translationKey: TranslationKey
  date: string
  icon?: IconName
}

/**
 * Price of one length
 * @typedef {number | { fromCents: number, toCents?: number }} PricingRate
 */

export type PricingRate = number | { fromCents: number; toCents?: number }

/**
 * Rates per declared length
 * @typedef {Partial<Record<string, PricingRate>>} PricingRates
 */

export type PricingRates = Partial<Record<string, PricingRate>>

/**
 * Priced line inside a block
 * @typedef PricingEntry
 * @property {PricingRates} [rates] - Price per length
 * @property {number} [amountCents] - Single price, length independent
 */

export interface PricingEntry extends Identifiable {
  rates?: PricingRates
  // Single price, length independent
  amountCents?: number
}

/**
 * Priced block of a group
 * @typedef PricingBlock
 * @property {PricingEntry[]} [entries] - Several priced lines
 * @property {PricingEntry[]} [extras] - Options added to the block
 */

export interface PricingBlock extends PricingEntry {
  entries?: PricingEntry[]
  // Options added to the block
  extras?: PricingEntry[]
}

/**
 * Audience group of the price list
 * @typedef PricingGroup
 * @property {PricingBlock[]} blocks - Priced blocks
 */

export interface PricingGroup extends Identifiable {
  blocks: PricingBlock[]
}

/**
 * Whole price list
 * @typedef PricingCatalogue
 * @property {string[]} lengths - Declared hair lengths
 * @property {PricingGroup[]} groups - Audience groups
 */

export interface PricingCatalogue {
  lengths: string[]
  groups: PricingGroup[]
}
