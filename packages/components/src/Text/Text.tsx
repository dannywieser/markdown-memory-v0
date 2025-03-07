import styled from '@emotion/styled'

import { TextProps } from './Text.types'

export default function Text(props: TextProps) {
  const { variant = 'body', children } = props
  const tag = variant === 'body' ? 'span' : variant

  const Tag = styled[tag]`
    font-family: ${(props) => props.theme.fonts.primary};
    font-size: ${(props) => props.theme.text[variant].fontSize};
    font-weight: ${(props) => props.theme.text[variant].fontWeight};
    margin: 0;
  `

  return <Tag>{children}</Tag>
}
