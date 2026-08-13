'use client'

import { useTranslations } from 'next-intl'

import { Heading } from '@/components/elements/typography/Heading'
import { Container } from '@/components/structures/layout/Container'
import { Accordion } from '@/components/structures/overlays/Accordion'
import { FAQ } from '@/declarations/content'
import { SECTION_ANCHORS } from '@/declarations/routes'
import { MOTION, SECTION_SPACING } from '@/declarations/ui/tokens'
import { EDITORIAL_STYLES } from '@/declarations/ui/variants'
import type { Styleable } from '@/types/common'
import type { FaqItem } from '@/types/content'
import { cn } from '@/utils/classnames'

export interface FaqSectionProps extends Styleable {
  items?: FaqItem[]
}

/**
 * FAQ section
 * @param {FaqSectionProps} props - FAQ section props
 * @return {JSX.Element} - Rendered section
 */

export const FaqSection = ({ items = FAQ, className }: FaqSectionProps) => {
  const t = useTranslations('sections.faq')

  return (
    <section id={SECTION_ANCHORS.faq} className={cn(SECTION_SPACING.lg, className)}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1fr] lg:gap-24">
          <div className={cn(EDITORIAL_STYLES.body, 'lg:sticky lg:top-32 lg:self-start')}>
            <p className={EDITORIAL_STYLES.label}>
              <span className={EDITORIAL_STYLES.labelRule} aria-hidden="true" />
              {t('overline')}
            </p>
            <Heading level={2}>{t('title')}</Heading>
          </div>

          <Accordion
            name="faq"
            className={MOTION.reveal}
            entries={items.map((item) => ({
              id: item.id,
              title: t(`items.${item.translationKey}.question`),
              content: t(`items.${item.translationKey}.answer`),
            }))}
          />
        </div>
      </Container>
    </section>
  )
}
