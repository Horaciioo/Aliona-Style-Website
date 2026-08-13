'use client'

import { useTranslations } from 'next-intl'

import { Picture } from '@/components/elements/media/Picture'
import { Heading } from '@/components/elements/typography/Heading'
import { Text } from '@/components/elements/typography/Text'
import { Container } from '@/components/structures/layout/Container'
import { CREDENTIALS } from '@/declarations/content'
import { SECTION_ANCHORS } from '@/declarations/routes'
import { SECTION_SPACING } from '@/declarations/ui/tokens'
import { CREDENTIAL_STYLES, EDITORIAL_STYLES } from '@/declarations/ui/variants'
import { ConfigurationService } from '@/services/ConfigurationService'
import type { Styleable } from '@/types/common'
import type { FeatureItem } from '@/types/content'
import { cn } from '@/utils/classnames'

const { media, viewport } = ConfigurationService

export interface CredentialSectionProps extends Styleable {
  items?: FeatureItem[]
}

/**
 * Diploma section
 * @param {CredentialSectionProps} props - Credential section props
 * @return {JSX.Element} - Rendered section
 */

export const CredentialSection = ({ items = CREDENTIALS, className }: CredentialSectionProps) => {
  const t = useTranslations('sections.credentials')

  return (
    <section id={SECTION_ANCHORS.credentials} className={cn(SECTION_SPACING.lg, className)}>
      <Container>
        <div className={EDITORIAL_STYLES.frame}>
          <div className={EDITORIAL_STYLES.body}>
            <Heading level={2}>{t('title')}</Heading>
            <Text appearance="lead">{t('description')}</Text>
          </div>

          <Picture
            src={media.blowDry.src}
            alt={t('imageAlt')}
            ratio="landscape"
            sizes={`(max-width: ${viewport.breakpoints.lg}px) 100vw, 50vw`}
            className={cn(EDITORIAL_STYLES.figure, EDITORIAL_STYLES.figureReversed)}
          />
        </div>

        <ul className={cn(CREDENTIAL_STYLES.list, 'mt-24')}>
          {items.map((item) => (
            <li key={item.id} className={CREDENTIAL_STYLES.item}>
              <p className={CREDENTIAL_STYLES.label}>{t(`items.${item.translationKey}.label`)}</p>
              <h3 className={CREDENTIAL_STYLES.title}>{t(`items.${item.translationKey}.title`)}</h3>
              <Text appearance="description">{t(`items.${item.translationKey}.description`)}</Text>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
