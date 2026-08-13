'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Picture } from '@/components/elements/media/Picture'
import { Heading } from '@/components/elements/typography/Heading'
import { Text } from '@/components/elements/typography/Text'
import { Container } from '@/components/structures/layout/Container'
import { Tabs } from '@/components/structures/navigation/Tabs'
import type { TabEntry } from '@/components/structures/navigation/Tabs'
import { SECTION_ANCHORS } from '@/declarations/routes'
import { SECTION_SPACING } from '@/declarations/ui/tokens'
import { EDITORIAL_STYLES, OFFER_STYLES } from '@/declarations/ui/variants'
import { ConfigurationService } from '@/services/ConfigurationService'
import { FormatService } from '@/services/FormatService'
import type { Formatter } from '@/services/FormatService'
import type { Styleable } from '@/types/common'
import type { PricingBlock, PricingEntry, PricingGroup, PricingRate } from '@/types/content'
import { cn } from '@/utils/classnames'

const { lengths, groups: CATALOGUE } = ConfigurationService.pricing
const { media, viewport } = ConfigurationService

// Below this, a group reads better as one centred column
const COLUMN_THRESHOLD = 2

// Translate function of the section
type Translate = (key: string, values?: Record<string, string>) => string

// A block without entries is one priced line, named by the block itself
const rowsOf = (block: PricingBlock): PricingEntry[] =>
  block.entries ?? [{ id: block.id, rates: block.rates, amountCents: block.amountCents }]

const isByLength = (block: PricingBlock): boolean =>
  Boolean(block.rates) || Boolean(block.entries?.some((entry) => entry.rates))

const renderRate = (rate: PricingRate | undefined, format: Formatter, t: Translate): string => {
  if (rate === undefined) return FormatService.emptyValue
  if (typeof rate === 'number') return format.currency(rate)

  // An open range keeps its lower bound bare, the currency closes the line
  if (rate.toCents !== undefined) {
    return t('range', {
      from: format.currencyParts(rate.fromCents).amount,
      to: format.currency(rate.toCents),
    })
  }

  return t('from', { amount: format.currency(rate.fromCents) })
}

export interface PricingSectionProps extends Styleable {
  groups?: PricingGroup[]
}

/**
 * Price list
 * @param {PricingSectionProps} props - Pricing section props
 * @return {JSX.Element} - Rendered section
 */

export const PricingSection = ({ groups = CATALOGUE, className }: PricingSectionProps) => {
  const t = useTranslations('sections.pricing')
  const format = FormatService.for(useLocale())

  const renderRates = (entry: PricingEntry) => (
    <span className={OFFER_STYLES.rates}>
      {entry.rates
        ? lengths.map((length) => (
            <span key={length} className={OFFER_STYLES.rate}>
              {renderRate(entry.rates?.[length], format, t)}
            </span>
          ))
        : entry.amountCents !== undefined && (
            <span className={OFFER_STYLES.rate}>{format.currency(entry.amountCents)}</span>
          )}
    </span>
  )

  const renderRow = (entry: PricingEntry) => (
    <div key={entry.id} className={OFFER_STYLES.row}>
      <span className={OFFER_STYLES.rowLabel}>{t(`entries.${entry.id}`)}</span>
      <span className={OFFER_STYLES.leader} aria-hidden="true" />
      {renderRates(entry)}
    </div>
  )

  // A titleless block borrows the name of its single line
  const titleOf = (block: PricingBlock): string =>
    block.entries ? t(`blocks.${block.id}.title`) : t(`entries.${block.id}`)

  const renderBlock = (block: PricingBlock) => {
    const rows = rowsOf(block)
    // One priced line reads better against the title than under it
    const [only] = block.entries ? [] : rows

    return (
      <section key={block.id} className={OFFER_STYLES.block}>
        <header className={OFFER_STYLES.blockHead}>
          <h3 className={OFFER_STYLES.blockTitle}>
            {titleOf(block)}
            {t.has(`blocks.${block.id}.note`) && (
              <span className={OFFER_STYLES.blockNote}>{t(`blocks.${block.id}.note`)}</span>
            )}
          </h3>

          <div className={OFFER_STYLES.rateColumn}>
            {isByLength(block) && (
              <div className={OFFER_STYLES.lengths} aria-hidden="true">
                {lengths.map((length) => (
                  <span key={length} className={OFFER_STYLES.lengthCell}>
                    {t(`lengths.${length}`)}
                  </span>
                ))}
              </div>
            )}
            {only && renderRates(only)}
          </div>
        </header>

        {!only && <div className={OFFER_STYLES.rows}>{rows.map(renderRow)}</div>}

        {block.extras && (
          <div className={OFFER_STYLES.extras}>
            {block.extras.map((extra) => (
              <p key={extra.id} className={OFFER_STYLES.extraRow}>
                <span className={OFFER_STYLES.extraLabel}>{t(`entries.${extra.id}`)}</span>
                <span className={OFFER_STYLES.extraRates}>
                  {lengths
                    .filter((length) => extra.rates?.[length] !== undefined)
                    .map((length) => (
                      <span key={length}>
                        <span className={OFFER_STYLES.extraLength}>{t(`lengths.${length}`)}</span>
                        {renderRate(extra.rates?.[length], format, t)}
                      </span>
                    ))}
                </span>
              </p>
            ))}
          </div>
        )}
      </section>
    )
  }

  // One tab per audience, so a single list never runs the whole page
  const tabs: TabEntry[] = groups.map((group) => ({
    id: group.id,
    label: t(`groups.${group.id}`),
    content: (
      <div
        className={
          group.blocks.length > COLUMN_THRESHOLD ? OFFER_STYLES.blocks : OFFER_STYLES.blocksNarrow
        }>
        {group.blocks.map(renderBlock)}
      </div>
    ),
  }))

  return (
    <section id={SECTION_ANCHORS.pricing} className={cn(SECTION_SPACING.lg, className)}>
      <Container width="wide">
        <div className={EDITORIAL_STYLES.frame}>
          <div className={EDITORIAL_STYLES.body}>
            <Heading level={2}>{t('title')}</Heading>
            <Text appearance="lead">{t('description')}</Text>
          </div>

          <Picture
            src={media.colour.src}
            alt={t('imageAlt')}
            ratio="landscape"
            sizes={`(max-width: ${viewport.breakpoints.lg}px) 100vw, 50vw`}
            className={cn(EDITORIAL_STYLES.figure, EDITORIAL_STYLES.figureReversed)}
          />
        </div>

        <Tabs entries={tabs} name="pricing" className={cn(OFFER_STYLES.tabs, 'mt-24')} />
      </Container>
    </section>
  )
}
