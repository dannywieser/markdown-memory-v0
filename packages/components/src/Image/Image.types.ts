export interface ImageProps {
  h?: number
  href: string
  key?: string
  op?: op
  w?: number
}

export type op = 'noop' | 'resize'
