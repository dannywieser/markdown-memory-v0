import { JSX, ReactNode } from 'react'

import useStyles from './Text.styles'
import { TextProps } from './Text.types'

const getTag = (variant: string): keyof JSX.IntrinsicElements => {
  const spanVariants = ['text', 'codespan', 'escape']
  return (
    spanVariants.includes(variant) ? 'span' : variant
  ) as keyof JSX.IntrinsicElements
}

const hasWhiteSpace = (s: string) => s.indexOf(' ') >= 0

const isTextAHashTag = (child: ReactNode | ReactNode[]) => {
  const isString = typeof child === 'string'
  return isString &&
    child.startsWith('#') &&
    !hasWhiteSpace(child) &&
    child.length > 1 // ignore strings that are only "#"
    ? true
    : false
}

export default function Text(props: TextProps) {
  const { variant = 'text', children, className } = props
  const styles = useStyles()

  const Tag = getTag(variant)
  const classes = [className, styles.base, styles[variant]]
  if (isTextAHashTag(children)) {
    classes.push(styles.hashtag)
  }
  const classnames = classes.filter(Boolean).join(' ')

  return <Tag className={classnames}>{children}</Tag>
}
