import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { CallToActionSection } from '@/components/sections/CallToActionSection'
import { CredentialSection } from '@/components/sections/CredentialSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { PageHeader } from '@/components/structures/layout/PageHeader'
import { Breadcrumb } from '@/components/structures/navigation/Breadcrumb'
import { NavigationService } from '@/services/NavigationService'
import { Page } from '@/structures/Page'
import type { PageRenderContext } from '@/structures/Page'

export interface AboutPageProps {
  params: Promise<{ locale: string }>
}

class AboutPage extends Page {
  constructor() {
    super('about')
  }

  render({ translate, breadcrumb }: PageRenderContext): ReactNode {
    return (
      <>
        <PageHeader
          title={translate('label')}
          description={translate('metaDescription')}
          breadcrumb={breadcrumb}
        />
        <CredentialSection />
        <FaqSection />
        <CallToActionSection />
      </>
    )
  }
}

const page = new AboutPage()

/**
 * Generate page metadata
 * @param {AboutPageProps} props - Page props
 * @return {Promise<Metadata>} - Metadata for the page
 */

export const generateMetadata = async ({ params }: AboutPageProps): Promise<Metadata> => {
  const { locale } = await params

  return page.metadata({ locale, translate: await getTranslations() })
}

/**
 * About page
 * @return {Promise<JSX.Element>} - Rendered page
 */

export default async function AboutPageRoute() {
  const navigationTranslate = await getTranslations()

  return page.render({
    translate: await getTranslations('routes.about'),
    breadcrumb: (
      <Breadcrumb
        entries={NavigationService.breadcrumbOf('about', navigationTranslate)}
        label={navigationTranslate('navigation.breadcrumb')}
      />
    ),
  })
}
