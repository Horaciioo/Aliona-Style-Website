'use client'

import { useLocale, useTranslations } from 'next-intl'

import { FormRenderer } from '@/components/elements/forms/FormRenderer'
import { Icon } from '@/components/elements/media/Icon'
import { Container } from '@/components/structures/layout/Container'
import { SECTION_ANCHORS } from '@/declarations/routes'
import type { IconName } from '@/declarations/ui/icons'
import { SECTION_SPACING } from '@/declarations/ui/tokens'
import { CONTACT_STYLES } from '@/declarations/ui/variants'
import { AppointmentService } from '@/services/AppointmentService'
import { ConfigurationService } from '@/services/ConfigurationService'
import { FormatService } from '@/services/FormatService'
import { NavigationService } from '@/services/NavigationService'
import type { Styleable } from '@/types/common'
import { cn } from '@/utils/classnames'

const { identity } = ConfigurationService

// Reachable channels, address last since it carries no link
const CHANNELS: { id: string; icon: IconName; value: string; href?: string }[] = [
  {
    id: 'phone',
    icon: 'phone',
    value: identity.phoneDisplay,
    href: NavigationService.telOf(identity.phone),
  },
  {
    id: 'email',
    icon: 'mail',
    value: identity.email,
    href: NavigationService.mailtoOf(identity.email),
  },
  {
    id: 'address',
    icon: 'location',
    value: `${identity.address.street}, ${identity.address.postalCode} ${identity.address.city}`,
  },
]

/**
 * Contact section
 * @param {Styleable} props - Contact section props
 * @return {JSX.Element} - Rendered section
 */

export const ContactSection = ({ className }: Styleable) => {
  const t = useTranslations('sections.contact')
  const actions = useTranslations('actions')

  const order = AppointmentService.weekdayOrder()
  const weekdays = FormatService.for(useLocale()).weekdays('long')
  const nameOf = (day?: number): string =>
    day === undefined ? '' : (weekdays[order.indexOf(day)] ?? '')

  return (
    <section id={SECTION_ANCHORS.contact} className={cn(SECTION_SPACING.md, className)}>
      <Container width="wide">
        <div className={CONTACT_STYLES.frame}>
          {ConfigurationService.isEnabled('contactForm') && (
            <div className={CONTACT_STYLES.form}>
              <FormRenderer id="contact" />
            </div>
          )}

          <aside className={CONTACT_STYLES.aside}>
            <div className={CONTACT_STYLES.panel}>
              <p className={CONTACT_STYLES.panelTitle}>{t('title')}</p>
              <ul className={CONTACT_STYLES.channels}>
                {CHANNELS.map((channel) => (
                  <li key={channel.id} className={CONTACT_STYLES.channel}>
                    <span className={CONTACT_STYLES.channelIcon} aria-hidden="true">
                      <Icon name={channel.icon} size="sm" />
                    </span>
                    <span className={CONTACT_STYLES.channelBody}>
                      <span className={CONTACT_STYLES.channelLabel}>
                        {t(`channels.${channel.id}`)}
                      </span>
                      {channel.href ? (
                        <a href={channel.href} className={CONTACT_STYLES.channelValue}>
                          {channel.value}
                        </a>
                      ) : (
                        <span className={CONTACT_STYLES.channelValue}>{channel.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={CONTACT_STYLES.panel}>
              <p className={CONTACT_STYLES.panelTitle}>{t('hours.title')}</p>
              <dl className={CONTACT_STYLES.hours}>
                {AppointmentService.openingSchedule().map((group) => (
                  <div key={group.days[0]} className={CONTACT_STYLES.hoursRow}>
                    <dt className={CONTACT_STYLES.hoursDays}>
                      {group.days.length === 1
                        ? nameOf(group.days[0])
                        : t('hours.days', {
                            from: nameOf(group.days[0]),
                            to: nameOf(group.days.at(-1)),
                          })}
                    </dt>
                    <dd
                      className={
                        group.opensAt ? CONTACT_STYLES.hoursRange : CONTACT_STYLES.hoursClosed
                      }>
                      {group.opensAt
                        ? t('hours.range', {
                            opensAt: group.opensAt,
                            closesAt: group.closesAt ?? '',
                          })
                        : t('hours.closed')}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {ConfigurationService.isEnabled('locationMap') && (
              <div className={CONTACT_STYLES.mapPanel}>
                <div className={CONTACT_STYLES.map}>
                  <iframe
                    src={NavigationService.mapEmbedUrlOf(identity.address)}
                    title={t('map.title')}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className={CONTACT_STYLES.mapFrame}
                  />
                </div>
                <a
                  href={NavigationService.mapDirectionsUrlOf(identity.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={CONTACT_STYLES.directions}>
                  {actions('getDirections')}
                  <Icon name="arrowRight" size="xs" />
                </a>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </section>
  )
}
