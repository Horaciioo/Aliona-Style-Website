'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { ActionLink } from '@/components/elements/actions/ActionLink'
import { IconButton } from '@/components/elements/actions/IconButton'
import { Icon } from '@/components/elements/media/Icon'
import { Logo } from '@/components/elements/media/Logo'
import { Container } from '@/components/structures/layout/Container'
import { NavigationList } from '@/components/structures/navigation/NavigationList'
import { ThemeSwitcher } from '@/components/structures/navigation/ThemeSwitcher'
import { Drawer } from '@/components/structures/overlays/Drawer'
import type { IconName } from '@/declarations/ui/icons'
import { LAYERS } from '@/declarations/ui/tokens'
import { NAVIGATION_STYLES } from '@/declarations/ui/variants'
import { Link, usePathname } from '@/i18n/routing'
import { ConfigurationService } from '@/services/ConfigurationService'
import { NavigationService } from '@/services/NavigationService'
import { ScrollService } from '@/services/ScrollService'
import { cn } from '@/utils/classnames'

const { identity } = ConfigurationService

// Reachable in one tap, straight from the bar
const CHANNELS: { id: string; icon: IconName; value: string; href: string }[] = [
  {
    id: 'email',
    icon: 'mail',
    value: identity.email,
    href: NavigationService.mailtoOf(identity.email),
  },
  {
    id: 'phone',
    icon: 'phone',
    value: identity.phoneDisplay,
    href: NavigationService.telOf(identity.phone),
  },
]

/**
 * Site header
 * @return {JSX.Element} - Rendered header
 */

export const SiteHeader = () => {
  const pathname = usePathname()
  const t = useTranslations()
  const navigation = useTranslations('navigation')
  const actions = useTranslations('actions')
  const { isScrolled } = ScrollService.use()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const entries = NavigationService.headerEntries({ pathname, translate: t })
  const callToAction = NavigationService.callToActionRoute()
  const socials = ConfigurationService.socialLinks()

  return (
    <header
      className={cn(
        NAVIGATION_STYLES.header,
        isScrolled && NAVIGATION_STYLES.headerScrolled,
        LAYERS.header
      )}>
      <Container width="wide">
        <div className={NAVIGATION_STYLES.top}>
          <Link href={NavigationService.pathOf('home')} className={NAVIGATION_STYLES.brand}>
            <Logo priority className={NAVIGATION_STYLES.brandLogo} />
            <span className={NAVIGATION_STYLES.brandRule} aria-hidden="true" />
            <span className={NAVIGATION_STYLES.brandCraft}>{navigation('craft')}</span>
          </Link>

          <div className={NAVIGATION_STYLES.actions}>
            {ConfigurationService.isEnabled('themeSwitcher') && <ThemeSwitcher />}
            <ActionLink
              route={callToAction}
              variant="secondary"
              size="sm"
              className="hidden md:inline-flex">
              {actions(NavigationService.ctaActionOf(callToAction))}
            </ActionLink>
            <IconButton
              icon="menu"
              label={actions('open')}
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
            />
          </div>
        </div>

        <div className={NAVIGATION_STYLES.bottom}>
          <nav aria-label={navigation('primary')}>
            <NavigationList entries={entries} />
          </nav>

          <div className={NAVIGATION_STYLES.channels}>
            {CHANNELS.map((channel) => (
              <a key={channel.id} href={channel.href} className={NAVIGATION_STYLES.channel}>
                <Icon name={channel.icon} size="xs" className="text-primary" />
                {channel.value}
              </a>
            ))}

            {socials.length > 0 && (
              <div className={NAVIGATION_STYLES.socials}>
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.id}
                    className={NAVIGATION_STYLES.social}>
                    <Icon name={social.id as IconName} size="sm" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      <Drawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        name="navigation"
        title={navigation('primary')}
        closeLabel={actions('close')}>
        <NavigationList
          entries={entries}
          direction="vertical"
          withIcons
          onNavigate={() => setIsMenuOpen(false)}
        />
        <div className="mt-8 flex flex-col gap-6">
          <ActionLink route={callToAction} fullWidth>
            {actions(NavigationService.ctaActionOf(callToAction))}
          </ActionLink>

          <div className="flex flex-col gap-3">
            {CHANNELS.map((channel) => (
              <a key={channel.id} href={channel.href} className={NAVIGATION_STYLES.channel}>
                <Icon name={channel.icon} size="xs" className="text-primary" />
                {channel.value}
              </a>
            ))}
          </div>
        </div>
      </Drawer>
    </header>
  )
}
