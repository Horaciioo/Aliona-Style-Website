'use client'

import { useTranslations } from 'next-intl'

import { ActionLink } from '@/components/elements/actions/ActionLink'
import { Picture } from '@/components/elements/media/Picture'
import { Heading } from '@/components/elements/typography/Heading'
import { Text } from '@/components/elements/typography/Text'
import { Container } from '@/components/structures/layout/Container'
import { SECTION_ANCHORS } from '@/declarations/routes'
import { MEDIA_FRAME } from '@/declarations/ui/tokens'
import { CALL_TO_ACTION_STYLES } from '@/declarations/ui/variants'
import { ConfigurationService } from '@/services/ConfigurationService'
import { NavigationService } from '@/services/NavigationService'
import type { Styleable } from '@/types/common'
import type { RouteId } from '@/types/navigation'
import { cn } from '@/utils/classnames'

const { media } = ConfigurationService

export interface CallToActionSectionProps extends Styleable {
  route?: RouteId
}

/**
 * Call-to-action
 * @param {CallToActionSectionProps} props - CTA section props
 * @return {JSX.Element} - Rendered section
 */

export const CallToActionSection = ({ route, className }: CallToActionSectionProps) => {
  const t = useTranslations('sections.callToAction')
  const actions = useTranslations('actions')
  const target = route ?? NavigationService.callToActionRoute()

  return (
    <section
      id={SECTION_ANCHORS.callToAction}
      className={cn(CALL_TO_ACTION_STYLES.frame, className)}>
      <Picture
        src={media.blowDry.src}
        alt=""
        stretch
        sizes="100vw"
        className={cn(MEDIA_FRAME, CALL_TO_ACTION_STYLES.backdrop)}
      />
      <span className={CALL_TO_ACTION_STYLES.veil} aria-hidden="true" />

      <Container width="wide">
        <div className={CALL_TO_ACTION_STYLES.body}>
          <Heading level={2} className={CALL_TO_ACTION_STYLES.title}>
            {t('title')}
          </Heading>
          <span className={CALL_TO_ACTION_STYLES.rule} aria-hidden="true" />
          <Text appearance="lead" className="max-w-lg">
            {t('description')}
          </Text>
          <ActionLink route={target} size="lg" icon="arrowRight" iconPosition="right">
            {actions(NavigationService.ctaActionOf(target))}
          </ActionLink>
        </div>
      </Container>
    </section>
  )
}
