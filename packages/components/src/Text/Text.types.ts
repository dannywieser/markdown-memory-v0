import { ReactNode } from 'react'

export interface TextProps {
  children: ReactNode | ReactNode[]
  className?: string
  container?: string
  variant?: TextVariant
}
export type TextVariant =
  | 'code'
  | 'codespan'
  | 'del'
  | 'em'
  | 'escape'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'strong'
  | 'text'
