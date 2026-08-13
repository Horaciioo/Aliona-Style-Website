import { MARBLE_STYLES } from '@/declarations/ui/variants'

/**
 * Veined marble page backdrop
 * @return {JSX.Element} - Rendered backdrop
 */

export const MarbleBackdrop = () => (
  <div aria-hidden="true">
    <div className={MARBLE_STYLES.frame} />
    <div className={MARBLE_STYLES.grain} />
  </div>
)
