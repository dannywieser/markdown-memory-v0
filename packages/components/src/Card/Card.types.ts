import { ReactNode } from 'react'

export interface CardProps {
  title: string
  href?: string
  children: ReactNode | ReactNode[]
}
