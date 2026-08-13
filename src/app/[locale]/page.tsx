import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { HeroSection } from '@/components/sections/HeroSection'
import { Page } from '@/structures/Page'

export interface HomePageProps {
  params: Promise<{ locale: string }>
}

class HomePage extends Page {
  constructor() {
    super('home')
  }

  // A single screen: the rest of the site lives behind the navigation
  render(): ReactNode {
    return <HeroSection />
  }
}

const page = new HomePage()

/**
 * Generate page metadata
 * @param {HomePageProps} props - Page props
 * @return {Promise<Metadata>} - Metadata for the page
 */

export const generateMetadata = async ({ params }: HomePageProps): Promise<Metadata> => {
  const { locale } = await params

  return page.metadata({ locale, translate: await getTranslations() })
}

/**
 * Landing page
 * @return {ReactNode} - Page
 */

export default function HomePageRoute() {
  return page.render()
}
