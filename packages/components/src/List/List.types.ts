import { ReactNode } from 'react'

export interface ListProps {
  ordered?: boolean
  children: ReactNode | ReactNode[]
}
