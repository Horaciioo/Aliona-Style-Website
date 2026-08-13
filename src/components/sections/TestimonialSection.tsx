'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Avatar } from '@/components/elements/data/Avatar'
import { Icon } from '@/components/elements/media/Icon'
import { Heading } from '@/components/elements/typography/Heading'
import { Text } from '@/components/elements/typography/Text'
import { Container } from '@/components/structures/layout/Container'
import { MAX_RATING, TESTIMONIALS } from '@/declarations/content'
import { SECTION_ANCHORS } from '@/declarations/routes'
import { SECTION_SPACING } from '@/declarations/ui/tokens'
import { EDITORIAL_STYLES, TESTIMONIAL_STYLES } from '@/declarations/ui/variants'
import { FormatService } from '@/services/FormatService'
import type { Styleable } from '@/types/common'
import type { TestimonialItem } from '@/types/content'
import { cn } from '@/utils/classnames'

// One decimal is enough for a star average
const SCORE_DECIMALS = 1

const averageOf = (items: TestimonialItem[]): number =>
  items.reduce((total, item) => total + (item.rating ?? MAX_RATING), 0) / (items.length || 1)

export interface TestimonialSectionProps extends Styleable {
  items?: TestimonialItem[]
}

/**
 * Endless band of published reviews
 * @param {TestimonialSectionProps} props - Testimonial section props
 * @return {JSX.Element} - Rendered section
 */

export const TestimonialSection = ({
  items = TESTIMONIALS,
  className,
}: TestimonialSectionProps) => {
  const t = useTranslations('sections.testimonials')
  const format = FormatService.for(useLocale())

  // The track holds the list twice so the loop never shows a seam
  const band = [...items, ...items]

  const renderCard = (item: TestimonialItem, index: number) => {
    const author = t(`items.${item.translationKey}.author`)
    const rating = item.rating ?? MAX_RATING

    return (
      <li key={`${item.id}-${index}`} className={TESTIMONIAL_STYLES.card}>
        <div className={TESTIMONIAL_STYLES.head}>
          <span className={TESTIMONIAL_STYLES.stars} aria-label={t('rating', { rating })}>
            {Array.from({ length: MAX_RATING }, (_, star) => (
              <Icon
                key={star}
                name="star"
                size="xs"
                className={star < rating ? TESTIMONIAL_STYLES.star : TESTIMONIAL_STYLES.starMuted}
              />
            ))}
          </span>
          <Icon name="quote" size="sm" className={TESTIMONIAL_STYLES.mark} />
        </div>

        <p className={TESTIMONIAL_STYLES.quote}>{t(`items.${item.translationKey}.quote`)}</p>

        <div className={TESTIMONIAL_STYLES.author}>
          <Avatar name={author} src={item.avatar} size="sm" />
          <div>
            <p className={TESTIMONIAL_STYLES.authorName}>{author}</p>
            <p className={TESTIMONIAL_STYLES.source}>{t('source')}</p>
          </div>
        </div>
      </li>
    )
  }

  return (
    <section id={SECTION_ANCHORS.testimonials} className={cn(SECTION_SPACING.md, className)}>
      <Container width="wide">
        <div className={cn(EDITORIAL_STYLES.body, 'pb-16')}>
          <p className={EDITORIAL_STYLES.label}>
            <span className={EDITORIAL_STYLES.labelRule} aria-hidden="true" />
            {t('overline')}
          </p>
          <Heading level={2}>{t('title')}</Heading>
          <Text appearance="lead" className="max-w-2xl">
            {t('description')}
          </Text>
        </div>

        <div className={TESTIMONIAL_STYLES.summary}>
          <span className={TESTIMONIAL_STYLES.score}>
            {format.number(averageOf(items), SCORE_DECIMALS)}
          </span>
          <span className={TESTIMONIAL_STYLES.scoreNote}>
            {t('summary', { count: String(items.length) })}
          </span>
        </div>
      </Container>

      <div className={TESTIMONIAL_STYLES.viewport}>
        <ul className={TESTIMONIAL_STYLES.track}>{band.map(renderCard)}</ul>
      </div>
    </section>
  )
}
