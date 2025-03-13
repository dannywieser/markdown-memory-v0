import styled from '@emotion/styled'

import { TextProps } from './Text.types'

export default function Text(props: TextProps) {
  const { variant = 'body', children } = props
  const tag = variant === 'body' ? 'span' : variant

  // add bottom margin only for headers
  const margin = tag.includes('h') ? 1.5 : 0

  const Tag = styled[tag]`
    font-family: ${(props) => props.theme.fonts.primary};
    font-size: ${(props) => props.theme.text[variant].fontSize};
    font-weight: ${(props) => props.theme.text[variant].fontWeight};
    margin-top: ${(props) => props.theme.grid * margin}px;
    margin-bottom: ${(props) => props.theme.grid * margin}px;
    line-height: ${(props) => props.theme.text.lineHeight}em;
  `

  return <Tag>{children}</Tag>
}
