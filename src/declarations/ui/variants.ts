import {
  DISABLED,
  FOCUS_RING,
  GILDING,
  MEDIA_FRAME,
  MOTION,
  SURFACES,
  TONE_SOFT,
  TRANSITION,
  TRANSITION_ALL,
  UNDERLINE,
  UNDERLINE_ACTIVE,
} from '@/declarations/ui/tokens'
import type { Size, Tone } from '@/types/common'

/**
 * Button base styles
 * @type {string}
 */

export const BUTTON_BASE = `inline-flex items-center justify-center gap-2.5 rounded-sm font-medium uppercase tracking-[0.16em] whitespace-nowrap ${TRANSITION_ALL} ${FOCUS_RING} ${DISABLED}`

/**
 * Button sizes
 * @type {Record<Size, string>}
 */

export const BUTTON_SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.6875rem]',
  md: 'h-11 px-6 text-xs',
  lg: 'h-14 px-8 text-sm',
}

/**
 * Button variants
 * @type {Object}
 */

export const BUTTON_VARIANTS = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover hover:shadow-glow',
  secondary: 'border border-border-strong text-foreground hover:border-primary hover:text-primary',
  outline: 'border border-primary/45 text-primary hover:bg-primary/10',
  ghost: 'text-foreground-muted hover:bg-surface-strong/60 hover:text-foreground',
  link: 'text-primary normal-case tracking-normal underline-offset-[6px] decoration-primary/40 underline hover:decoration-primary px-0 h-auto',
  danger: 'bg-danger text-background hover:opacity-90',
} as const

/**
 * Button variant name
 * @typedef {keyof typeof BUTTON_VARIANTS} ButtonVariant
 */

export type ButtonVariant = keyof typeof BUTTON_VARIANTS

/**
 * Button size name
 * @typedef {Size} ButtonSize
 */

export type ButtonSize = Size

/**
 * Icon button sizes
 * @type {Record<Size, string>}
 */

export const ICON_BUTTON_SIZES: Record<Size, string> = {
  sm: 'h-9 w-9 p-0',
  md: 'h-11 w-11 p-0',
  lg: 'h-14 w-14 p-0',
}

/**
 * Action icon size
 * @type {Record<Size, 'xs' | 'sm' | 'md'>}
 */

export const ACTION_ICON_SIZES: Record<Size, 'xs' | 'sm' | 'md'> = { sm: 'xs', md: 'sm', lg: 'md' }

/**
 * Icon button size
 * @type {Record<Size, 'sm' | 'md'>}
 */

export const ICON_BUTTON_ICON_SIZES: Record<Size, 'sm' | 'md'> = { sm: 'sm', md: 'sm', lg: 'md' }

/**
 * Badge base styles
 * @type {string}
 */

export const BADGE_BASE =
  'inline-flex items-center gap-1.5 rounded-sm font-medium uppercase tracking-[0.14em] whitespace-nowrap'

/**
 * Badge sizes
 * @type {Record<Size, string>}
 */

export const BADGE_SIZES: Record<Size, string> = {
  sm: 'px-2 py-0.5 text-[0.6875rem]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
}

/**
 * Badge variants
 * @type {Object}
 */

export const BADGE_VARIANTS = {
  soft: TONE_SOFT,
  outline: {
    neutral: 'border border-border text-foreground-muted',
    primary: 'border border-primary/40 text-primary',
    accent: 'border border-accent/40 text-accent',
    success: 'border border-success/40 text-success',
    warning: 'border border-warning/40 text-warning',
    danger: 'border border-danger/40 text-danger',
    info: 'border border-info/40 text-info',
  },
} as const satisfies Record<string, Record<Tone, string>>

/**
 * Badge variant name
 * @typedef {keyof typeof BADGE_VARIANTS} BadgeVariant
 */

export type BadgeVariant = keyof typeof BADGE_VARIANTS

/**
 * Text styles
 * @type {Object}
 */

export const TEXT_STYLES = {
  pageTitle:
    'font-display text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.97] font-light tracking-[-0.035em] text-foreground',
  sectionTitle:
    'font-display text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.02] font-light tracking-[-0.03em] text-foreground',
  blockTitle:
    'font-display text-[clamp(1.375rem,2.1vw,1.875rem)] font-normal leading-[1.15] tracking-[-0.02em] text-foreground',
  lead: 'text-[1rem] font-light leading-[1.75] text-foreground-muted sm:text-[1.0625rem]',
  body: 'text-[0.875rem] leading-[1.7] text-foreground',
  description: 'text-[0.875rem] leading-[1.75] text-foreground-muted',
  meta: 'text-xs text-foreground-subtle',
  label: 'text-sm font-medium text-foreground',
  overline: 'text-[0.6875rem] font-medium uppercase tracking-[0.4em] text-primary',
  code: 'font-mono text-xs text-foreground-muted',
} as const

/**
 * Text style name
 * @typedef {keyof typeof TEXT_STYLES} TextStyle
 */

export type TextStyle = keyof typeof TEXT_STYLES

/**
 * Heading styles
 * @type {Object}
 */

export const HEADING_STYLES = {
  1: TEXT_STYLES.pageTitle,
  2: TEXT_STYLES.sectionTitle,
  3: TEXT_STYLES.blockTitle,
  4: 'font-display text-lg font-medium tracking-[-0.01em] text-foreground',
} as const

/**
 * Heading level name
 * @typedef {keyof typeof HEADING_STYLES} HeadingLevel
 */

export type HeadingLevel = keyof typeof HEADING_STYLES

/**
 * Field styles
 * @type {Object}
 */

export const FIELD_STYLES = {
  wrapper: 'flex flex-col gap-1.5',
  label: `${TEXT_STYLES.label} flex items-center gap-1`,
  required: 'text-danger',
  control: `w-full rounded-md border border-border bg-surface/60 px-3 text-sm text-foreground placeholder:text-foreground-subtle ${TRANSITION} ${FOCUS_RING} ${DISABLED} hover:border-primary/40`,
  controlHeight: 'h-11',
  controlWithIcon: 'pl-10',
  textarea: 'min-h-32 py-2.5 resize-y',
  invalid: 'border-danger focus-visible:ring-danger/40',
  icon: 'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle',
  hint: TEXT_STYLES.meta,
  error: 'text-xs text-danger',
  choice: `flex items-start gap-2.5 text-sm text-foreground cursor-pointer ${DISABLED}`,
  checkbox: `h-4 w-4 mt-0.5 shrink-0 rounded-xs border border-border-strong text-primary accent-primary ${FOCUS_RING}`,
  switchTrack: `relative h-6 w-11 shrink-0 rounded-pill border border-transparent bg-border-strong ${TRANSITION} ${FOCUS_RING} ${DISABLED} data-[checked=true]:bg-primary`,
  switchThumb:
    'block h-5 w-5 translate-x-0.5 rounded-pill bg-background shadow-xs transition-transform duration-base data-[checked=true]:translate-x-[1.375rem]',
  grid: 'grid grid-cols-1 gap-4 sm:grid-cols-2',
  wide: 'sm:col-span-2',
} as const

/**
 * Skeleton base styles
 * @type {string}
 */

export const SKELETON_BASE = 'surface-shimmer animate-shimmer rounded-md'

/**
 * Skeleton shapes
 * @type {Object}
 */

export const SKELETON_SHAPES = {
  line: 'h-3 w-full',
  title: 'h-6 w-2/5',
  text: 'h-3 w-3/4',
  row: 'h-12 w-full',
  card: 'h-40 w-full rounded-lg',
  avatar: 'h-10 w-10 rounded-pill',
  button: 'h-10 w-28',
} as const

/**
 * Skeleton shape name
 * @typedef {keyof typeof SKELETON_SHAPES} SkeletonShape
 */

export type SkeletonShape = keyof typeof SKELETON_SHAPES

/**
 * Page skeleton styles
 * @type {Object}
 */

export const PAGE_SKELETON_STYLES = {
  header: 'flex flex-col gap-3',
  title: 'h-8 w-1/3',
  description: 'h-4 w-2/3',
  block: `${SURFACES.card} p-5`,
} as const

/**
 * Empty state styles
 * @type {Object}
 */

export const EMPTY_STATE_STYLES = {
  frame: 'flex flex-col items-center justify-center gap-3 rounded-lg px-6 py-12 text-center',
  start: {
    frame: `${SURFACES.card} border-dashed`,
    iconTile: `flex h-12 w-12 items-center justify-center rounded-pill ${TONE_SOFT.primary}`,
    icon: 'h-6 w-6',
    figure: 'h-28 w-28 text-primary/70',
  },
  filter: {
    frame: SURFACES.inset,
    iconTile: `flex h-12 w-12 items-center justify-center rounded-pill ${TONE_SOFT.neutral}`,
    icon: 'h-6 w-6',
    figure: 'h-28 w-28 text-foreground-subtle',
  },
} as const

/**
 * Empty state variant name
 * @typedef {Exclude<keyof typeof EMPTY_STATE_STYLES, 'frame'>} EmptyStateVariant
 */

export type EmptyStateVariant = Exclude<keyof typeof EMPTY_STATE_STYLES, 'frame'>

/**
 * Alert styles
 * @type {Object}
 */

export const ALERT_STYLES = {
  frame: 'flex items-start gap-3 rounded-lg border p-4',
  icon: 'mt-0.5 h-5 w-5 shrink-0',
  content: 'flex flex-col gap-1',
  title: 'text-sm font-semibold',
  description: 'text-sm opacity-90',
} as const

/**
 * Spinner sizes
 * @type {Record<Size, string>}
 */

export const SPINNER_SIZES: Record<Size, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-9 w-9',
}

/**
 * Avatar sizes
 * @type {Record<Size, string>}
 */

export const AVATAR_SIZES: Record<Size, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
}

/**
 * Avatar pixel sizes
 * @type {Record<Size, number>}
 */

export const AVATAR_PIXELS: Record<Size, number> = { sm: 32, md: 40, lg: 56 }

/**
 * Avatar styles
 * @type {Object}
 */

export const AVATAR_STYLES = {
  frame: `flex shrink-0 items-center justify-center overflow-hidden rounded-pill font-semibold ${TONE_SOFT.primary}`,
  image: 'h-full w-full object-cover',
} as const

/**
 * Progress bar styles
 * @type {Object}
 */

export const PROGRESS_STYLES = {
  track: 'h-2 w-full overflow-hidden rounded-pill bg-surface-strong',
  bar: 'h-full rounded-pill transition-[width] duration-slow ease-out',
} as const

/**
 * Overlay styles
 * @type {Object}
 */

export const OVERLAY_STYLES = {
  backdrop: 'fixed inset-0 bg-overlay/50 backdrop-blur-sm animate-fade-in',
  centered: 'fixed inset-0 flex items-end justify-center p-4 sm:items-center',
  panel: `relative w-full ${SURFACES.raised} shadow-lg animate-slide-up`,
  panelSizes: {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
  } satisfies Record<Size, string>,
  header: 'flex items-start justify-between gap-4 border-b border-border px-5 py-4',
  body: 'px-5 py-4',
  footer: 'flex flex-wrap justify-end gap-2 border-t border-border px-5 py-4',
} as const

/**
 * Drawer styles
 * @type {Object}
 */

export const DRAWER_STYLES = {
  panel: `fixed inset-y-0 right-0 flex w-full max-w-sm flex-col bg-background shadow-lg animate-slide-left`,
  header: OVERLAY_STYLES.header,
  body: 'flex-1 overflow-y-auto px-5 py-4',
} as const

/**
 * Tooltip styles
 * @type {Object}
 */

export const TOOLTIP_STYLES = {
  wrapper: 'relative inline-flex',
  bubble:
    'pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 shadow-md transition-opacity duration-fast group-hover:opacity-100 group-focus-within:opacity-100',
} as const

/**
 * Tab styles
 * @type {Object}
 */

export const TABS_STYLES = {
  list: 'flex justify-center gap-2 overflow-x-auto border-b border-border/60 sm:gap-6',
  // Same grown-from-the-left gold underline as the header navigation
  trigger: `${UNDERLINE} after:-bottom-px shrink-0 px-5 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-foreground-subtle ${TRANSITION_ALL} ${FOCUS_RING} hover:text-foreground`,
  triggerActive: `text-primary ${UNDERLINE_ACTIVE}`,
  panel: 'pt-12 animate-fade-in sm:pt-16',
} as const

/**
 * Accordion styles
 * @type {Object}
 */

export const ACCORDION_STYLES = {
  list: 'divide-y divide-border/70 border-y border-border/70',
  item: 'group',
  trigger: `flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-light text-foreground ${TRANSITION} ${FOCUS_RING} hover:text-primary`,
  indicator: `h-4 w-4 shrink-0 text-primary/70 ${TRANSITION_ALL} data-[open=true]:rotate-180`,
  panel: 'max-w-2xl pb-7 text-sm leading-[1.75] text-foreground-muted animate-fade-in',
} as const

/**
 * Table styles
 * @type {Object}
 */

export const TABLE_STYLES = {
  scroller: 'w-full overflow-x-auto',
  table: 'w-full border-collapse text-left text-sm',
  headCell:
    'border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-wide text-foreground-subtle',
  row: `border-b border-border last:border-0 ${TRANSITION} hover:bg-surface`,
  cell: 'px-4 py-3 text-foreground',
  empty: 'px-4 py-10 text-center',
} as const

/**
 * Pagination styles
 * @type {Object}
 */

export const PAGINATION_STYLES = {
  frame: 'flex flex-wrap items-center justify-between gap-3 pt-1',
  actions: 'flex gap-2',
} as const

/**
 * Navigation header styles
 * @type {Object}
 */

export const NAVIGATION_STYLES = {
  // Always on its own frosted band, so it never reads as floating over the hero
  header: `fixed inset-x-0 top-0 w-full border-b border-border/50 bg-background/80 pt-3 backdrop-blur-xl sm:pt-5 ${TRANSITION_ALL}`,
  headerScrolled: 'pt-0 shadow-md sm:pt-0',
  // Brand and call to action on top, the rest sits on the line below
  top: 'flex h-16 items-center justify-between gap-8 md:h-[4.25rem]',
  bottom: 'hidden h-12 items-center justify-between gap-10 border-t border-border/40 md:flex',
  list: 'flex items-center gap-10 lg:gap-14',
  // The gold underline grows from the left on hover and stays put when active
  link: `${UNDERLINE} after:-bottom-0.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-foreground-muted ${TRANSITION} ${FOCUS_RING} hover:text-foreground`,
  linkActive: `text-foreground ${UNDERLINE_ACTIVE}`,
  actions: 'flex items-center gap-3',
  mobileList: 'flex flex-col',
  mobileLink: `border-b border-border/60 py-5 font-display text-3xl font-light text-foreground-muted ${TRANSITION} hover:text-primary`,
  brand: `flex items-center gap-5 ${FOCUS_RING} rounded-sm`,
  // Filling the bar's own height, never pushing it taller
  brandLogo: 'h-12 w-auto sm:h-16',
  brandRule: 'hidden h-8 w-px bg-border/70 lg:block',
  brandCraft:
    'hidden text-[0.625rem] font-medium uppercase tracking-[0.32em] text-foreground-subtle lg:block',
  channels: 'flex items-center gap-8',
  channel: `inline-flex items-center gap-2.5 text-xs tracking-[0.02em] text-foreground-muted ${TRANSITION} ${FOCUS_RING} rounded-sm hover:text-primary`,
  socials: 'flex items-center gap-4 border-l border-border/50 pl-8',
  social: `text-foreground-subtle ${TRANSITION} ${FOCUS_RING} rounded-sm hover:text-primary`,
} as const

/**
 * Language select styles
 * @type {Object}
 */

export const LANGUAGE_SWITCHER_STYLES = {
  frame: `relative inline-flex items-center gap-2.5 rounded-sm border border-border/70 bg-surface/50 pl-3 pr-8 ${TRANSITION} hover:border-primary/40`,
  flag: 'text-base leading-none',
  // Transparent native control, the frame around it carries the styling
  select: `cursor-pointer appearance-none bg-transparent py-2 text-xs uppercase tracking-[0.18em] text-foreground-muted ${FOCUS_RING} hover:text-foreground`,
  indicator: 'pointer-events-none absolute right-3 text-foreground-subtle',
} as const

/**
 * Footer styles
 * @type {Object}
 */

export const FOOTER_STYLES = {
  frame: 'relative mt-32 border-t border-border/50 bg-surface/30',
  motto: 'py-24 text-center',
  mottoText: `font-display text-[clamp(1.625rem,3.4vw,2.75rem)] font-light italic leading-[1.15] tracking-[-0.02em] ${GILDING.text}`,
  grid: 'grid gap-14 border-t border-border/50 py-20 sm:grid-cols-2 lg:grid-cols-4',
  columnTitle: 'text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-foreground-subtle',
  list: 'mt-6 flex flex-col gap-3.5',
  link: `text-sm text-foreground-muted ${TRANSITION} hover:text-primary`,
  bottom:
    'flex flex-col gap-6 border-t border-border/50 py-10 sm:flex-row sm:items-center sm:justify-between',
  socials: 'flex gap-3',
} as const

/**
 * Toast styles
 * @type {Object}
 */

export const TOAST_STYLES = {
  region:
    'pointer-events-none fixed inset-x-0 bottom-0 flex flex-col items-center gap-2 p-4 sm:items-end',
  toast: `pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-md animate-slide-up`,
} as const

/**
 * Card styles
 * @type {Object}
 */

export const CARD_STYLES = {
  frame: `relative overflow-hidden rounded-xl border border-border/70 bg-surface/60 shadow-card ${TRANSITION_ALL}`,
  interactive: 'hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift',
  body: 'flex flex-col gap-4 p-6 sm:p-8',
  media: 'relative aspect-[4/3] w-full overflow-hidden bg-surface-strong',
  mediaImage: `h-full w-full object-cover ${TRANSITION_ALL} group-hover:scale-105`,
} as const

/**
 * Stat tile styles
 * @type {Object}
 */

export const STAT_STYLES = {
  frame: `${SURFACES.card} flex flex-col gap-1 p-5`,
  value: 'font-display text-3xl font-semibold tracking-tight text-foreground',
  iconTile: `mb-2 flex h-10 w-10 items-center justify-center rounded-md`,
} as const

/**
 * Section styles
 * @type {Object}
 */

export const SECTION_STYLES = {
  header: `flex max-w-3xl flex-col gap-6 ${MOTION.reveal}`,
  headerCentered: 'mx-auto items-center text-center',
  body: 'mt-16 sm:mt-24',
} as const

/**
 * Marble backdrop styles
 * @type {Object}
 */

export const MARBLE_STYLES = {
  frame: 'marble-frame',
  grain: 'marble-grain',
} as const

/**
 * Layout utilities
 * @type {Object}
 */

export const LAYOUT = {
  page: 'flex min-h-screen flex-col',
  // Clears the floating header, which loses its second line on mobile
  main: 'flex-1 pt-24 md:pt-[calc(var(--layout-header)+2.5rem)]',
  container: 'mx-auto w-full px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28',
  sectionStack: 'flex flex-col gap-8',
  stack: 'flex flex-col',
  row: 'flex items-center',
  between: 'flex items-center justify-between gap-4',
  center: 'flex items-center justify-center',
  grid: 'grid',
  divider: 'h-px w-full bg-border',
  dividerVertical: 'w-px self-stretch bg-border',
  srOnly: 'sr-only',
} as const

/**
 * Button class generator
 * @param {Object} [options] - Requested appearance
 * @param {ButtonVariant} [options.variant] - Variant declared above
 * @param {Size} [options.size] - Size declared above
 * @param {boolean} [options.fullWidth] - Stretch flag
 * @return {string} - Class list
 */

export const buttonClass = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}: { variant?: ButtonVariant; size?: Size; fullWidth?: boolean } = {}): string =>
  [BUTTON_BASE, BUTTON_SIZES[size], BUTTON_VARIANTS[variant], fullWidth ? 'w-full' : '']
    .filter(Boolean)
    .join(' ')

/**
 * Floating corner rail
 * @type {Object}
 */

export const FLOATING_RAIL = {
  // Kept off the edge, and clear of the sticky action bar on mobile
  frame: 'fixed right-5 bottom-24 sm:right-8 md:bottom-8',
  // Second slot, stacked clear of the cookie bubble below it
  raised: 'bottom-[10.75rem] md:bottom-[6.75rem]',
} as const

/**
 * Scroll-to-top button styles
 * @type {Object}
 */

export const SCROLL_TO_TOP_STYLES = {
  // No surface, just the arrow, matching the cookie bubble beneath it
  button: `${FLOATING_RAIL.frame} ${FLOATING_RAIL.raised} text-primary drop-shadow-md ${TRANSITION_ALL} hover:scale-105 hover:bg-transparent hover:text-primary-hover`,
  hidden: 'pointer-events-none translate-y-3 opacity-0',
} as const

/**
 * Sticky action bar styles
 * @type {Object}
 */

export const STICKY_ACTION_BAR_STYLES = {
  frame:
    'fixed inset-x-0 bottom-0 border-t border-border bg-background/95 p-3 backdrop-blur pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden',
} as const

/**
 * Consent manager styles
 * @type {Object}
 */

export const CONSENT_STYLES = {
  // No surface of its own, only the cookie - set off the corner, never glued to it
  trigger: `${FLOATING_RAIL.frame} flex h-16 w-16 items-center justify-center rounded-pill ${TRANSITION_ALL} ${FOCUS_RING} hover:scale-105`,
  triggerImage: 'h-full w-full object-contain drop-shadow-md',
  body: 'flex flex-col gap-6',
  categories: 'flex flex-col divide-y divide-border/60 border-y border-border/60',
  category: 'flex items-center gap-4 py-5',
  categoryIcon: `flex h-10 w-10 shrink-0 items-center justify-center rounded-pill ${TONE_SOFT.primary}`,
  categoryBody: 'flex flex-1 flex-col gap-1',
  categoryLabel: 'text-sm font-medium text-foreground',
  lock: 'text-[0.5625rem] uppercase tracking-[0.24em] text-primary',
} as const

/**
 * Editorial band
 * @type {Object}
 */

export const EDITORIAL_STYLES = {
  frame: 'grid items-center gap-16 lg:grid-cols-[1fr_0.95fr] lg:gap-28',
  figure: `${MEDIA_FRAME} w-full rounded-lg shadow-lift ${MOTION.revealPicture}`,
  figureReversed: 'lg:order-2',
  body: `flex flex-col items-start gap-7 ${MOTION.revealRight}`,
  caption:
    'absolute bottom-6 left-6 right-6 text-[0.625rem] uppercase tracking-[0.3em] text-ivory/70',
} as const

/**
 * Immersive call-to-action band
 * @type {Object}
 */

export const CALL_TO_ACTION_STYLES = {
  frame: 'relative flex min-h-[70vh] items-center overflow-hidden py-32 sm:py-44',
  // The photograph sits behind the whole band, not inside a box
  backdrop: 'absolute inset-0',
  veil: 'absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40',
  body: `relative flex max-w-2xl flex-col items-start gap-8 ${MOTION.reveal}`,
  title: `max-w-[14ch] ${GILDING.text}`,
  rule: `w-24 ${GILDING.rule}`,
} as const

/**
 * Hero styles
 * @type {Object}
 */

export const HERO_STYLES = {
  // Pulled back under the transparent header, and held to a single screen
  frame:
    'relative -mt-24 flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-28 md:-mt-[calc(var(--layout-header)+2.5rem)] md:pb-14 md:pt-[calc(var(--layout-header)+3rem)]',
  grid: 'grid flex-1 items-center gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20',
  body: 'flex flex-col items-start gap-5 sm:gap-7',
  label: 'text-[0.6875rem] font-medium uppercase tracking-[0.4em] text-primary',
  title: 'max-w-[15ch] text-[clamp(2.25rem,4.8vw,4.25rem)]',
  lead: 'max-w-[46ch]',
  actions: 'flex flex-wrap items-center gap-6 pt-1',
  figure: `${MEDIA_FRAME} max-h-[34svh] w-full rounded-lg shadow-lift lg:max-h-[58svh] ${MOTION.revealZoom}`,
  facts: `mt-8 grid gap-x-14 gap-y-3 border-t border-border/60 pt-6 sm:grid-cols-3 sm:gap-y-6 ${MOTION.revealStagger}`,
  fact: 'flex items-baseline justify-between gap-5 sm:flex-col sm:items-start sm:gap-2',
  factLabel:
    'shrink-0 text-[0.625rem] font-medium uppercase tracking-[0.32em] text-foreground-subtle',
  factValue: 'text-right font-display text-base font-light text-foreground sm:text-left sm:text-lg',
  factPhone: `inline-flex items-center gap-2 text-primary ${TRANSITION} ${FOCUS_RING} rounded-sm hover:text-primary-hover`,
} as const

/**
 * Craft list styles
 * @type {Object}
 */

export const CRAFT_STYLES = {
  list: `grid gap-x-20 gap-y-14 sm:grid-cols-2 ${MOTION.revealStagger}`,
  // The whole block links through to the pricing table below
  item: `group flex gap-7 border-t border-border/60 pt-9 ${TRANSITION_ALL} ${FOCUS_RING} rounded-sm hover:border-primary/50`,
  index: `font-display text-lg font-light text-primary/70 tabular-nums ${TRANSITION} group-hover:text-primary`,
  body: 'flex flex-col gap-3',
} as const

/**
 * Offer card styles
 * @type {Object}
 */

export const OFFER_STYLES = {
  tabs: 'mx-auto w-full max-w-[88rem]',
  // Blocks flow into columns once the panel is wide enough
  blocks: `columns-1 gap-x-10 lg:columns-2 2xl:columns-3 ${MOTION.reveal}`,
  // A short group would leave the rest of the row empty
  blocksNarrow: `mx-auto max-w-3xl ${MOTION.reveal}`,
  block: `mb-9 break-inside-avoid ${SURFACES.glass} p-6 sm:p-7`,
  blockHead: 'flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3',
  blockTitle: 'font-display text-lg font-light leading-tight text-foreground',
  blockNote: 'ml-3 text-[0.5625rem] uppercase tracking-[0.2em] text-foreground-subtle',
  rateColumn: 'flex shrink-0 flex-col items-end gap-1',
  lengths: 'flex shrink-0 items-baseline justify-end gap-2',
  lengthCell:
    'min-w-[4.5rem] text-right text-[0.5625rem] uppercase tracking-[0.2em] text-foreground-subtle',
  rows: 'mt-5 flex flex-col divide-y divide-border/50 border-t border-border/50',
  row: `flex items-baseline gap-3 py-3.5 ${TRANSITION} hover:text-primary`,
  rowLabel: 'text-sm text-foreground',
  leader: 'mb-1.5 flex-1 border-b border-dotted border-border-strong/40',
  rates: 'flex shrink-0 items-baseline justify-end gap-2',
  rate: 'min-w-[4.5rem] text-right font-display text-base font-normal whitespace-nowrap tabular-nums text-primary',
  extras: 'mt-5 flex flex-col gap-2.5 border-l-2 border-primary/25 py-1 pl-4',
  extraRow: 'flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1',
  extraLabel: 'text-xs uppercase tracking-[0.14em] text-foreground-subtle',
  extraRates: 'flex items-baseline gap-4 text-xs tabular-nums text-primary/90',
  extraLength: 'mr-1.5 uppercase tracking-[0.18em] text-foreground-subtle',
} as const

/**
 * Diploma styles
 * @type {Object}
 */

export const CREDENTIAL_STYLES = {
  list: 'grid gap-px overflow-hidden border border-border/70 bg-border/40 sm:grid-cols-3',
  item: `flex flex-col gap-3 bg-background/60 p-7 ${TRANSITION_ALL} hover:bg-surface/60`,
  label: 'text-[0.625rem] font-medium uppercase tracking-[0.3em] text-primary',
  title: 'font-display text-xl font-light text-foreground',
} as const

/**
 * Review band styles
 * @type {Object}
 */

export const TESTIMONIAL_STYLES = {
  // Full bleed, the band ignores the container gutters
  frame: 'relative',
  viewport: MOTION.marqueeViewport,
  track: `${MOTION.marquee} gap-6 py-2`,
  card: `flex w-[21rem] shrink-0 flex-col gap-4 sm:w-[24rem] ${SURFACES.glass} p-7`,
  head: 'flex items-center justify-between gap-4',
  stars: 'flex gap-1',
  star: 'fill-current text-primary',
  starMuted: 'fill-none text-border-strong',
  mark: 'text-foreground-subtle/70',
  quote: 'flex-1 text-[0.9375rem] leading-[1.8] text-foreground-muted',
  author: 'flex items-center gap-3 border-t border-border/50 pt-4',
  authorName: 'text-sm text-foreground',
  source: 'text-[0.5625rem] uppercase tracking-[0.24em] text-foreground-subtle',
  summary: 'flex flex-wrap items-center justify-center gap-4 pb-14',
  score: 'font-display text-3xl font-light tabular-nums text-primary',
  scoreNote: 'text-[0.625rem] uppercase tracking-[0.3em] text-foreground-subtle',
} as const

/**
 * Before and after carousel styles
 * @type {Object}
 */

export const TRANSFORMATION_STYLES = {
  frame: 'flex flex-col gap-8',
  viewportWrapper: 'relative',
  // Padding shows a sliver of the next pair, so the eye anticipates it
  viewport:
    'flex snap-x snap-mandatory scroll-smooth overflow-x-auto px-[7%] [scrollbar-width:none] sm:px-[18%] [&::-webkit-scrollbar]:hidden',
  slide: 'w-[86%] shrink-0 snap-center px-1.5 sm:w-[64%]',
  card: `mx-auto max-w-4xl ${SURFACES.glass} p-6 sm:p-10 ${TRANSITION_ALL}`,
  // Only the centred pair reads at full scale
  cardActive: 'scale-100 opacity-100',
  cardInactive: 'scale-[0.94] opacity-55',
  pair: 'grid gap-5 sm:grid-cols-2 sm:gap-8',
  panel: `${MEDIA_FRAME} flex aspect-[3/4] items-center justify-center rounded-lg border border-border/60 bg-surface/40`,
  panelLabel:
    'absolute left-5 top-5 text-[0.5625rem] font-medium uppercase tracking-[0.3em] text-foreground-subtle',
  figure: `h-3/5 w-auto text-primary/45 ${TRANSITION_ALL} group-hover:text-primary/70`,
  caption: 'mt-8 flex flex-col gap-3 border-t border-border/50 pt-7',
  captionTitle: 'font-display text-xl font-light text-foreground',
  controls: 'flex items-center justify-between gap-6',
  dots: 'flex flex-1 items-center gap-2.5',
  dot: `h-px flex-1 bg-border-strong/60 ${TRANSITION_ALL} ${FOCUS_RING} rounded-pill hover:bg-primary/60`,
  dotActive: 'h-0.5 bg-primary',
  counter: 'text-[0.625rem] uppercase tracking-[0.28em] tabular-nums text-foreground-subtle',
  // Floats over the pair itself, not in the control row below
  arrow: `${SURFACES.glass} absolute top-1/2 z-10 -translate-y-1/2 rounded-pill text-primary hover:bg-surface/80 hover:text-primary-hover ${TRANSITION_ALL}`,
  arrowLeft: 'left-2 sm:left-4',
  arrowRight: 'right-2 sm:right-4',
} as const

/**
 * Contact block styles
 * @type {Object}
 */

export const CONTACT_STYLES = {
  // The form leads, everything reachable stacks in the column beside it
  frame: 'grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:gap-16',
  form: `${SURFACES.glass} p-6 sm:p-10`,
  aside: 'flex flex-col gap-8',
  panel: `${SURFACES.glass} p-6 sm:p-8`,
  panelTitle: 'pb-5 text-[0.625rem] font-medium uppercase tracking-[0.3em] text-foreground-subtle',
  channels: 'flex flex-col divide-y divide-border/50 border-t border-border/50',
  channel: 'flex items-center gap-4 py-4',
  channelIcon: `flex h-9 w-9 shrink-0 items-center justify-center rounded-pill ${TONE_SOFT.primary}`,
  channelBody: 'flex min-w-0 flex-col gap-0.5',
  channelLabel: 'text-[0.5625rem] font-medium uppercase tracking-[0.28em] text-foreground-subtle',
  channelValue: `truncate font-display text-base font-light text-foreground ${TRANSITION} hover:text-primary`,
  hours: 'flex flex-col divide-y divide-border/50 border-t border-border/50',
  hoursRow: 'flex items-baseline justify-between gap-4 py-3',
  hoursDays: 'text-sm capitalize text-foreground',
  hoursRange: 'text-sm tabular-nums text-primary',
  hoursClosed: 'text-sm text-foreground-subtle',
  mapPanel: 'flex flex-col overflow-hidden rounded-lg border border-border/70',
  map: `${MEDIA_FRAME} h-64 w-full`,
  // Desaturated, the embed stops fighting the ivory page
  mapFrame: 'h-full w-full grayscale-[0.85] contrast-[0.95] sepia-[0.12]',
  directions: `inline-flex items-center justify-between gap-2 bg-surface/60 px-5 py-4 text-xs uppercase tracking-[0.24em] text-primary ${TRANSITION} ${FOCUS_RING} hover:bg-surface hover:text-accent`,
} as const

/**
 * Booking calendar styles
 * @type {Object}
 */

export const BOOKING_STYLES = {
  // Capped width, so the calendar stays compact next to the wider slot grid
  frame: 'grid items-start gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]',
  calendar: 'flex flex-col gap-5',
  panel: `${SURFACES.glass} p-5 sm:p-7`,
  monthBar: 'flex items-center justify-between gap-3 pb-6',
  monthLabel: 'font-display text-lg font-light capitalize tracking-tight text-foreground',
  weekdays: 'grid grid-cols-7 gap-1 pb-3',
  weekday:
    'py-1 text-center text-[0.5625rem] font-medium uppercase tracking-[0.2em] text-foreground-subtle',
  days: 'grid grid-cols-7 gap-1',
  day: `flex aspect-square items-center justify-center rounded-sm text-sm tabular-nums text-foreground ${TRANSITION_ALL} ${FOCUS_RING} hover:bg-primary/20`,
  dayClosed: 'cursor-not-allowed text-foreground-subtle/35 hover:bg-transparent',
  daySelected: 'bg-primary text-primary-foreground hover:bg-primary',
  dayToday: 'ring-1 ring-inset ring-primary/50',
  // Fewer, larger cells - a schedule grid, not a dense keypad
  slots: 'grid grid-cols-2 gap-3 sm:grid-cols-3',
  slot: `rounded-md border border-border py-3.5 text-sm font-medium tabular-nums text-foreground ${TRANSITION_ALL} ${FOCUS_RING} hover:border-primary hover:text-primary`,
  slotSelected: 'border-primary bg-primary text-primary-foreground hover:text-primary-foreground',
  summary:
    'border-b border-border/60 pb-4 font-display text-lg font-light capitalize text-foreground',
} as const
