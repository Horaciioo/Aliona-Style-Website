'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { IconButton } from '@/components/elements/actions/IconButton'
import { Picture } from '@/components/elements/media/Picture'
import { TransformationFigure } from '@/components/elements/media/TransformationFigure'
import type { TransformationStage } from '@/components/elements/media/TransformationFigure'
import { Heading } from '@/components/elements/typography/Heading'
import { Text } from '@/components/elements/typography/Text'
import { Container } from '@/components/structures/layout/Container'
import { TRANSFORMATIONS } from '@/declarations/content'
import { SECTION_ANCHORS } from '@/declarations/routes'
import { SECTION_SPACING } from '@/declarations/ui/tokens'
import { EDITORIAL_STYLES, TRANSFORMATION_STYLES } from '@/declarations/ui/variants'
import { ConfigurationService } from '@/services/ConfigurationService'
import { ViewportService } from '@/services/ViewportService'
import type { Styleable } from '@/types/common'
import type { ImageAsset, TransformationItem } from '@/types/content'
import { cn } from '@/utils/classnames'

const { carouselIntervalMs } = ConfigurationService.timings

// Ordered pair of every slide
const STAGES: TransformationStage[] = ['before', 'after']

export interface TransformationSectionProps extends Styleable {
  items?: TransformationItem[]
}

/**
 * Before and after carousel
 * @param {TransformationSectionProps} props - Transformation section props
 * @return {JSX.Element} - Rendered section
 */

export const TransformationSection = ({
  items = TRANSFORMATIONS,
  className,
}: TransformationSectionProps) => {
  const t = useTranslations('sections.transformations')
  const actions = useTranslations('actions')
  const prefersReducedMotion = ViewportService.usePrefers('reducedMotion')

  const viewportRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Slides all share a width, the offset alone gives the active one
  const goTo = useCallback(
    (next: number) => {
      const viewport = viewportRef.current
      if (!viewport || items.length === 0) return

      const target = ((next % items.length) + items.length) % items.length
      viewport.scrollTo({ left: target * viewport.clientWidth })
      setIndex(target)
    },
    [items.length]
  )

  // A swipe moves the scroller, the dots follow it back
  const handleScroll = () => {
    const viewport = viewportRef.current
    if (!viewport || viewport.clientWidth === 0) return

    setIndex(Math.round(viewport.scrollLeft / viewport.clientWidth))
  }

  useEffect(() => {
    if (prefersReducedMotion || isPaused || items.length < 2) return undefined

    const timer = window.setInterval(() => goTo(index + 1), carouselIntervalMs)

    return () => window.clearInterval(timer)
  }, [goTo, index, isPaused, items.length, prefersReducedMotion])

  const renderPanel = (item: TransformationItem, stage: TransformationStage) => {
    const picture: ImageAsset | undefined = item[stage]

    return (
      <div key={stage} className={cn(TRANSFORMATION_STYLES.panel, 'group')}>
        <span className={TRANSFORMATION_STYLES.panelLabel}>{t(stage)}</span>
        {picture ? (
          <Picture
            src={picture.src}
            alt={t(`items.${item.translationKey}.${stage}Alt`)}
            stretch
            className="absolute inset-0"
          />
        ) : (
          <TransformationFigure stage={stage} />
        )}
      </div>
    )
  }

  return (
    <section id={SECTION_ANCHORS.transformations} className={cn(SECTION_SPACING.md, className)}>
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

        <div
          className={TRANSFORMATION_STYLES.frame}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}>
          <div
            ref={viewportRef}
            onScroll={handleScroll}
            aria-label={t('title')}
            className={TRANSFORMATION_STYLES.viewport}>
            {items.map((item, slide) => (
              <div
                key={item.id}
                role="group"
                aria-label={t('position', {
                  position: String(slide + 1),
                  total: String(items.length),
                })}
                className={TRANSFORMATION_STYLES.slide}>
                <article className={TRANSFORMATION_STYLES.card}>
                  <div className={TRANSFORMATION_STYLES.pair}>
                    {STAGES.map((stage) => renderPanel(item, stage))}
                  </div>

                  <div className={TRANSFORMATION_STYLES.caption}>
                    <h3 className={TRANSFORMATION_STYLES.captionTitle}>
                      {t(`items.${item.translationKey}.title`)}
                    </h3>
                    <Text appearance="description">
                      {t(`items.${item.translationKey}.description`)}
                    </Text>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className={TRANSFORMATION_STYLES.controls}>
            <div className={TRANSFORMATION_STYLES.dots}>
              {items.map((item, slide) => (
                <button
                  key={item.id}
                  type="button"
                  aria-current={slide === index}
                  aria-label={t('position', {
                    position: String(slide + 1),
                    total: String(items.length),
                  })}
                  className={cn(
                    TRANSFORMATION_STYLES.dot,
                    slide === index && TRANSFORMATION_STYLES.dotActive
                  )}
                  onClick={() => goTo(slide)}
                />
              ))}
            </div>

            <p className={TRANSFORMATION_STYLES.counter}>
              {t('position', {
                position: String(index + 1),
                total: String(items.length),
              })}
            </p>

            <div className={TRANSFORMATION_STYLES.arrows}>
              <IconButton
                icon="chevronLeft"
                variant="secondary"
                size="sm"
                label={actions('previous')}
                onClick={() => goTo(index - 1)}
              />
              <IconButton
                icon="chevronRight"
                variant="secondary"
                size="sm"
                label={actions('next')}
                onClick={() => goTo(index + 1)}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
