import { ReactNode } from 'react'

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'strong'
  | 'del'
  | 'em'
  | 'code'
  | 'codespan'
  | 'text'
export interface TextProps {
  variant?: TextVariant
  children: ReactNode | ReactNode[]
  container?: string
  className?: string
}
