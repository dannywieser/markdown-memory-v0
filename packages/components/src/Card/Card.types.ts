import { ReactNode } from 'react'

export interface CardProps {
  children: ReactNode | ReactNode[]
  href?: string
  icon?: string
  title: string
}
