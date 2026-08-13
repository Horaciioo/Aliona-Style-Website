import Image from 'next/image'

import { ConfigurationService } from '@/services/ConfigurationService'
import type { Styleable } from '@/types/common'
import { cn } from '@/utils/classnames'

const { logo, name } = ConfigurationService.site

// Declared logo files, intrinsic size included
const LOGO_SOURCES = { mark: logo.mark, wordmark: logo.wordmark } as const

export type LogoVariant = keyof typeof LOGO_SOURCES

export interface LogoProps extends Styleable {
  variant?: LogoVariant
  priority?: boolean
}

/**
 * Site logo
 * @param {LogoProps} props - Logo props
 * @return {JSX.Element} - Rendered logo
 */

export const Logo = ({ variant = 'wordmark', priority = false, className }: LogoProps) => {
  const source = LOGO_SOURCES[variant]

  return (
    <Image
      src={source.src}
      alt={name}
      width={source.width}
      height={source.height}
      priority={priority}
      className={cn('h-10 w-auto object-contain', className)}
    />
  )
}
