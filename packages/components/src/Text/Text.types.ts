import { ReactNode } from 'react'

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'strong'
  | 'code'
export interface TextProps {
  variant?: TextVariant
  children: ReactNode | ReactNode[]
  container?: string
}
