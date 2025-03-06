import { ReactNode } from 'react'

export interface TextProps {
  variant?: 'h1' | 'h2'
  children: ReactNode | ReactNode[]
}
