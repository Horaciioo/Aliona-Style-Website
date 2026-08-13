import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { BookingSection } from '@/components/sections/BookingSection'
import { PageHeader } from '@/components/structures/layout/PageHeader'
import { Breadcrumb } from '@/components/structures/navigation/Breadcrumb'
import { NavigationService } from '@/services/NavigationService'
import { Page } from '@/structures/Page'
import type { PageRenderContext } from '@/structures/Page'

export interface AppointmentPageProps {
  params: Promise<{ locale: string }>
}

class AppointmentPage extends Page {
  constructor() {
    super('appointment')
  }

  render({ translate, breadcrumb }: PageRenderContext): ReactNode {
    return (
      <>
        <PageHeader
          title={translate('label')}
          description={translate('metaDescription')}
          breadcrumb={breadcrumb}
        />
        <BookingSection />
      </>
    )
  }
}

const page = new AppointmentPage()

/**
 * Generate page metadata
 * @param {AppointmentPageProps} props - Page props
 * @return {Promise<Metadata>} - Metadata for the page
 */

export const generateMetadata = async ({ params }: AppointmentPageProps): Promise<Metadata> => {
  const { locale } = await params

  return page.metadata({ locale, translate: await getTranslations() })
}

/**
 * Appointment page
 * @return {Promise<JSX.Element>} - Rendered page
 */

export default async function AppointmentPageRoute() {
  const navigationTranslate = await getTranslations()

  return page.render({
    translate: await getTranslations('routes.appointment'),
    breadcrumb: (
      <Breadcrumb
        entries={NavigationService.breadcrumbOf('appointment', navigationTranslate)}
        label={navigationTranslate('navigation.breadcrumb')}
      />
    ),
  })
}
