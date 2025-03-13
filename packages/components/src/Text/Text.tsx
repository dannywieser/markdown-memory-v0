import styled from '@emotion/styled'

import { TextProps } from './Text.types'

export default function Text(props: TextProps) {
  const { variant = 'body', children } = props
  const tag = variant === 'body' ? 'span' : variant
  if (variant === 'strong') {
    console.log(variant)
  }
  // add bottom margin only for headers
  const margin = tag.includes('h') ? 1.5 : 0

  // TODO: switch away from emotion to fix these stupid styles

  const other = styled[tag]`
    white-space: pre-line;
    font-family: ${(props) => props.theme.fonts.primary};
    font-size: ${(props) => props.theme.text[variant].fontSize};
    font-weight: ${(props) => props.theme.text[variant].fontWeight};
    margin-top: ${(props) => props.theme.grid * margin}px;
    margin-bottom: ${(props) => props.theme.grid * margin}px;
    line-height: ${(props) => props.theme.text.lineHeight}em;
  `

  const header = styled['h1']`
    font-family: ${(props) => props.theme.fonts.primary};
    font-size: ${(props) => props.theme.text[variant].fontSize};
    font-weight: ${(props) => props.theme.text[variant].fontWeight};
    margin-top: ${(props) => props.theme.grid * margin}px;
    margin-bottom: ${(props) => props.theme.grid * margin}px;
    line-height: ${(props) => props.theme.text.lineHeight}em;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.contrastText};
  `

  const Tag = variant === 'h1' ? header : other

  return <Tag>{children}</Tag>
}
