import { JSX } from 'react'
import { v4 as uuidv4 } from 'uuid'

import useStyles from './Text.styles'
import { TextProps } from './Text.types'
import { processChildForSpecialTokens } from './Text.util'

const getTag = (variant: string): keyof JSX.IntrinsicElements => {
  const spanVariants = ['text', 'codespan', 'escape']
  return (
    spanVariants.includes(variant) ? 'span' : variant
  ) as keyof JSX.IntrinsicElements
}

export default function Text(props: TextProps) {
  const { variant = 'text', children, className } = props
  const styles = useStyles()

  const Tag = getTag(variant)
  const classes = [className, styles.base, styles[variant]]
  const classnames = classes.filter(Boolean).join(' ')

  // if the child text has hashtags, those are extracted and rendered components
  const text = processChildForSpecialTokens(children)

  return (
    <Tag className={classnames} key={uuidv4()}>
      {text}
    </Tag>
  )
}
