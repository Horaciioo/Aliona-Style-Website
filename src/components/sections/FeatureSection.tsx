'use client'

import { useTranslations } from 'next-intl'

import { Picture } from '@/components/elements/media/Picture'
import { Heading } from '@/components/elements/typography/Heading'
import { Text } from '@/components/elements/typography/Text'
import { Container } from '@/components/structures/layout/Container'
import { FEATURES } from '@/declarations/content'
import { SECTION_ANCHORS } from '@/declarations/routes'
import { SECTION_SPACING } from '@/declarations/ui/tokens'
import { CRAFT_STYLES, EDITORIAL_STYLES } from '@/declarations/ui/variants'
import { ConfigurationService } from '@/services/ConfigurationService'
import type { Styleable } from '@/types/common'
import type { FeatureItem } from '@/types/content'
import { cn } from '@/utils/classnames'

const { media, viewport } = ConfigurationService

const INDEX_PAD = 2

export interface FeatureSectionProps extends Styleable {
  items?: FeatureItem[]
}

/**
 * Craft section
 * @param {FeatureSectionProps} props - Feature section props
 * @return {JSX.Element} - Rendered section
 */

export const FeatureSection = ({ items = FEATURES, className }: FeatureSectionProps) => {
  const t = useTranslations('sections.features')

  return (
    <section id={SECTION_ANCHORS.features} className={cn(SECTION_SPACING.lg, className)}>
      <Container width="wide">
        <div className={EDITORIAL_STYLES.frame}>
          <Picture
            src={media.cut.src}
            alt={t('imageAlt')}
            ratio="landscape"
            sizes={`(max-width: ${viewport.breakpoints.lg}px) 100vw, 50vw`}
            className={EDITORIAL_STYLES.figure}
          />

          <div className={EDITORIAL_STYLES.body}>
            <p className={EDITORIAL_STYLES.label}>
              <span className={EDITORIAL_STYLES.labelRule} aria-hidden="true" />
              {t('overline')}
            </p>
            <Heading level={2}>{t('title')}</Heading>
            <Text appearance="lead">{t('description')}</Text>
          </div>
        </div>

        <ol className={cn(CRAFT_STYLES.list, 'mt-24')}>
          {items.map((item, index) => (
            <li key={item.id} className={CRAFT_STYLES.item}>
              <span className={CRAFT_STYLES.index} aria-hidden="true">
                {String(index + 1).padStart(INDEX_PAD, '0')}
              </span>
              <div className={CRAFT_STYLES.body}>
                <Text appearance="blockTitle" as="h3">
                  {t(`items.${item.translationKey}.title`)}
                </Text>
                <Text appearance="description">
                  {t(`items.${item.translationKey}.description`)}
                </Text>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
