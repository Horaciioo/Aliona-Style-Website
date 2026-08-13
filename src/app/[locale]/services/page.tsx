import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { CallToActionSection } from '@/components/sections/CallToActionSection'
import { FeatureSection } from '@/components/sections/FeatureSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { PageHeader } from '@/components/structures/layout/PageHeader'
import { Breadcrumb } from '@/components/structures/navigation/Breadcrumb'
import { NavigationService } from '@/services/NavigationService'
import { Page } from '@/structures/Page'
import type { PageRenderContext } from '@/structures/Page'

export interface ServicesPageProps {
  params: Promise<{ locale: string }>
}

class ServicesPage extends Page {
  constructor() {
    super('services')
  }

  render({ translate, breadcrumb }: PageRenderContext): ReactNode {
    return (
      <>
        <PageHeader
          title={translate('label')}
          description={translate('metaDescription')}
          breadcrumb={breadcrumb}
        />
        <FeatureSection />
        <PricingSection />
        <CallToActionSection />
      </>
    )
  }
}

const page = new ServicesPage()

/**
 * Generate page metadata
 * @param {ServicesPageProps} props - Page props
 * @return {Promise<Metadata>} - Metadata for the page
 */

export const generateMetadata = async ({ params }: ServicesPageProps): Promise<Metadata> => {
  const { locale } = await params

  return page.metadata({ locale, translate: await getTranslations() })
}

/**
 * Services page
 * @return {Promise<JSX.Element>} - Rendered page
 */

export default async function ServicesPageRoute() {
  const navigationTranslate = await getTranslations()

  return page.render({
    translate: await getTranslations('routes.services'),
    breadcrumb: (
      <Breadcrumb
        entries={NavigationService.breadcrumbOf('services', navigationTranslate)}
        label={navigationTranslate('navigation.breadcrumb')}
      />
    ),
  })
}
