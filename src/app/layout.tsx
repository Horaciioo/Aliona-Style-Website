import type { ReactNode } from 'react'

export interface RootLayoutProps {
  children: ReactNode
}

// Root layout
export default function RootLayout({ children }: RootLayoutProps) {
  return children
}
