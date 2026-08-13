'use client'

import { useLocale, useTranslations } from 'next-intl'

import { ActionLink } from '@/components/elements/actions/ActionLink'
import { Picture } from '@/components/elements/media/Picture'
import { Heading } from '@/components/elements/typography/Heading'
import { Container } from '@/components/structures/layout/Container'
import { SECTION_ANCHORS } from '@/declarations/routes'
import { MOTION } from '@/declarations/ui/tokens'
import { HERO_STYLES } from '@/declarations/ui/variants'
import { AppointmentService } from '@/services/AppointmentService'
import { ConfigurationService } from '@/services/ConfigurationService'
import { FormatService } from '@/services/FormatService'
import { NavigationService } from '@/services/NavigationService'
import type { Styleable } from '@/types/common'
import { cn } from '@/utils/classnames'

const { identity, media, viewport } = ConfigurationService

/**
 * Hero section
 * @param {Styleable} props - Hero section props
 * @return {JSX.Element} - Rendered hero
 */

export const HeroSection = ({ className }: Styleable) => {
  const t = useTranslations('sections.hero')
  const actions = useTranslations('actions')
  const callToAction = NavigationService.callToActionRoute()

  // Compact opening line, the day by day table lives in the contact section
  const order = AppointmentService.weekdayOrder()
  const weekdays = FormatService.for(useLocale()).weekdays('long')
  const nameOf = (day?: number): string =>
    day === undefined ? '' : (weekdays[order.indexOf(day)] ?? '')
  const [opening] = AppointmentService.openingSchedule()

  const facts = [
    {
      id: 'address',
      value: `${identity.address.street}, ${identity.address.postalCode} ${identity.address.city}`,
    },
    {
      id: 'hours',
      value: t('facts.hours.value', {
        from: nameOf(opening?.days[0]),
        to: nameOf(opening?.days.at(-1)),
        opensAt: opening?.opensAt ?? '',
        closesAt: opening?.closesAt ?? '',
      }),
    },
    { id: 'phone', value: identity.phoneDisplay },
  ]

  return (
    <section id={SECTION_ANCHORS.hero} className={cn(HERO_STYLES.frame, className)}>
      <Container width="wide">
        <div className={HERO_STYLES.grid}>
          <div className={HERO_STYLES.body}>
            <p className={cn(HERO_STYLES.label, MOTION.rise)}>{t('overline')}</p>

            <Heading level={1} className={HERO_STYLES.title}>
              {t('title')}
            </Heading>

            <div className={HERO_STYLES.actions}>
              <ActionLink route={callToAction} size="lg" icon="arrowRight" iconPosition="right">
                {actions(NavigationService.ctaActionOf(callToAction))}
              </ActionLink>
              <ActionLink href={NavigationService.anchorOf('pricing')} variant="link">
                {t('secondary')}
              </ActionLink>
            </div>
          </div>

          <Picture
            src={media.portrait.src}
            alt={t('imageAlt')}
            ratio="portrait"
            priority
            sizes={`(max-width: ${viewport.breakpoints.lg}px) 100vw, 45vw`}
            className={HERO_STYLES.figure}
          />
        </div>

        <dl className={cn(HERO_STYLES.facts, MOTION.revealSoft)}>
          {facts.map((fact) => (
            <div key={fact.id} className={HERO_STYLES.fact}>
              <dt className={HERO_STYLES.factLabel}>{t(`facts.${fact.id}.label`)}</dt>
              <dd className={HERO_STYLES.factValue}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
