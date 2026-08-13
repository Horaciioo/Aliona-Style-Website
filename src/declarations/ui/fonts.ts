import { Fraunces, Manrope } from 'next/font/google'

// Body typeface
const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Editorial serif
const display = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

/**
 * Font CSS variables
 * @type {string}
 */

export const FONT_VARIABLES = `${sans.variable} ${display.variable}`
