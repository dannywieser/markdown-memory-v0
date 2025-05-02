export interface ImageProps {
  centerFit?: boolean
  h?: number
  href: string
  op?: op
  w?: number
}

export type op = 'noop' | 'resize'
