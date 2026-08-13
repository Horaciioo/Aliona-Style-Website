import { TRANSFORMATION_STYLES } from '@/declarations/ui/variants'
import type { Styleable } from '@/types/common'
import { cn } from '@/utils/classnames'

// Flat lengths, nothing done yet
const Before = () => (
  <>
    <path
      d="M46 62c0-19 12-31 30-31s30 12 30 31v10c0 8-4 14-11 17-6 3-13 3-19 3s-13 0-19-3c-7-3-11-9-11-17z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.85"
    />
    <path
      d="M46 66c-4 26-6 52-6 78M106 66c4 26 6 52 6 78"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M58 78c-3 24-4 46-4 66M94 78c3 24 4 46 4 66"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.3"
    />
    <path
      d="M64 122c-6 4-10 11-11 18h94c-1-7-5-14-11-18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.35"
    />
  </>
)

// Lengths shaped, movement added
const After = () => (
  <>
    <path
      d="M46 60c0-19 12-32 30-32s30 13 30 32v12c0 8-4 14-11 17-6 3-13 3-19 3s-13 0-19-3c-7-3-11-9-11-17z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.9"
    />
    <path
      d="M46 64c-9 18-14 38-9 57 3 12 1 20-6 27M106 64c9 18 14 38 9 57-3 12-1 20 6 27"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.65"
    />
    <path
      d="M58 76c-6 18-9 37-5 54 2 10 1 16-3 22M94 76c6 18 9 37 5 54-2 10-1 16 3 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
    />
    <path
      d="M64 40c8-7 20-10 30-7M60 52c5-6 12-9 19-10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.35"
    />
    <path
      d="M126 44l3 9 9 3-9 3-3 9-3-9-9-3 9-3zM30 96l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"
      fill="currentColor"
      opacity="0.55"
    />
  </>
)

const STAGES = { before: Before, after: After } as const

/**
 * Stage of a transformation
 * @typedef {keyof typeof STAGES} TransformationStage
 */

export type TransformationStage = keyof typeof STAGES

export interface TransformationFigureProps extends Styleable {
  stage: TransformationStage
}

/**
 * Drawn stand-in for a missing photograph
 * @param {TransformationFigureProps} props - Figure props
 * @return {JSX.Element} - Rendered figure
 */

export const TransformationFigure = ({ stage, className }: TransformationFigureProps) => {
  const Drawing = STAGES[stage]

  return (
    <svg
      viewBox="0 0 152 190"
      fill="none"
      aria-hidden="true"
      className={cn(TRANSFORMATION_STYLES.figure, className)}>
      <Drawing />
    </svg>
  )
}
