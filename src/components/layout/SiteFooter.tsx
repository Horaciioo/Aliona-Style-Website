'use client'

import { useTranslations } from 'next-intl'

import { Icon } from '@/components/elements/media/Icon'
import { Logo } from '@/components/elements/media/Logo'
import { Text } from '@/components/elements/typography/Text'
import { Container } from '@/components/structures/layout/Container'
import { LanguageSwitcher } from '@/components/structures/navigation/LanguageSwitcher'
import type { IconName } from '@/declarations/ui/icons'
import { GILDING } from '@/declarations/ui/tokens'
import { FOOTER_STYLES } from '@/declarations/ui/variants'
import { Link, usePathname } from '@/i18n/routing'
import { ConfigurationService } from '@/services/ConfigurationService'
import { ConsentService } from '@/services/ConsentService'
import { NavigationService } from '@/services/NavigationService'

const { identity } = ConfigurationService
const hasAnalytics =
  ConfigurationService.isEnabled('analytics') && ConfigurationService.environment.analytics.enabled

// Reachable channels, address last
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
 * Site footer
 * @return {JSX.Element} - Rendered footer
 */

export const SiteFooter = () => {
  const pathname = usePathname()
  const t = useTranslations()
  const navigation = useTranslations('navigation')
  const actions = useTranslations('actions')
  const columns = NavigationService.footerColumns({ pathname, translate: t })
  const socials = ConfigurationService.socialLinks()

  return (
    <footer className={FOOTER_STYLES.frame}>
      <Container>
        <div className={FOOTER_STYLES.motto}>
          <p className={FOOTER_STYLES.mottoText}>{navigation('motto')}</p>
          <span className={`mx-auto mt-7 block w-40 ${GILDING.rule}`} aria-hidden="true" />
        </div>

        <div className={FOOTER_STYLES.grid}>
          <div className="flex flex-col items-start gap-4">
            <Logo className="h-10 w-auto" />
            <Text appearance="description">{navigation('tagline')}</Text>
            {socials.length > 0 && (
              <div className={FOOTER_STYLES.socials}>
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.id}
                    className={FOOTER_STYLES.link}>
                    <Icon name={social.id as IconName} size="sm" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {columns.map((column) => (
            <nav key={column.id} aria-label={navigation(`footer.${column.id}`)}>
              <p className={FOOTER_STYLES.columnTitle}>{navigation(`footer.${column.id}`)}</p>
              <ul className={FOOTER_STYLES.list}>
                {column.entries.map((entry) => (
                  <li key={entry.id}>
                    <Link href={entry.href} className={FOOTER_STYLES.link}>
                      {entry.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className={FOOTER_STYLES.columnTitle}>{navigation('footer.contact')}</p>
            <ul className={FOOTER_STYLES.list}>
              {CHANNELS.map((channel) => (
                <li key={channel.id} className="flex items-start gap-2.5">
                  <Icon name={channel.icon} size="xs" className="mt-1 text-primary" />
                  {channel.href ? (
                    <a href={channel.href} className={FOOTER_STYLES.link}>
                      {channel.value}
                    </a>
                  ) : (
                    <Text appearance="description">{channel.value}</Text>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={FOOTER_STYLES.bottom}>
          <Text appearance="meta">
            {navigation('copyright', {
              years: ConfigurationService.copyrightYears(),
              name: ConfigurationService.site.name,
            })}
          </Text>

          <div className={FOOTER_STYLES.bottomActions}>
            {hasAnalytics && (
              <button type="button" onClick={ConsentService.reset} className={FOOTER_STYLES.link}>
                {actions('manageCookies')}
              </button>
            )}
            {ConfigurationService.isEnabled('languageSwitcher') && <LanguageSwitcher />}
          </div>
        </div>
      </Container>
    </footer>
  )
}
