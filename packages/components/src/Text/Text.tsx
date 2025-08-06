import { JSX } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { TextProps } from './Text.types'
import { processChildForSpecialTokens } from './Text.util'

const determineTextElement = (variant: string): keyof JSX.IntrinsicElements => {
  const spanVariants = ['text', 'codespan', 'escape']
  return (
    spanVariants.includes(variant) ? 'span' : variant
  ) as keyof JSX.IntrinsicElements
}

export default function Text(props: TextProps) {
  const { children, variant = 'text' } = props

  // which HTML element is used is calculated based on the variant
  const TextElement = determineTextElement(variant)

  // if the child text has hashtags, those are extracted and rendered components
  const text = processChildForSpecialTokens(children)

  return <TextElement key={uuidv4()}>{text}</TextElement>
}
