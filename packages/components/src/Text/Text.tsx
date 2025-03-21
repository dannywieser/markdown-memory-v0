import styled from '@emotion/styled'

import { TextProps } from './Text.types'

export default function Text(props: TextProps) {
  const { variant = 'body', children, container, className } = props
  const Tag = variant === 'body' ? 'span' : variant

  // add bottom margin only for headers
  const margin = Tag.includes('h') ? 1.5 : 0

  // TODO: switch away from emotion to fix these stupid styles
  // const Tag = styled[tag]`
  //   white-space: pre-line;
  //   font-family: ${(props) => props.theme.fonts.primary};
  //   font-size: ${(props) => props.theme.text[variant].fontSize};
  //   margin-top: ${(props) => props.theme.grid * margin}px;
  //   margin-bottom: ${(props) => props.theme.grid * margin}px;
  //   line-height: ${(props) => props.theme.text.lineHeight}em;
  // `

  // const Strong = styled[tag]`
  //   white-space: pre-line;
  //   font-family: ${(props) => props.theme.fonts.primary};
  //   font-size: ${(props) => props.theme.text[variant].fontSize};
  //   font-weight: 800;
  //   margin-top: ${(props) => props.theme.grid * margin}px;
  //   margin-bottom: ${(props) => props.theme.grid * margin}px;
  //   line-height: ${(props) => props.theme.text.lineHeight}em;
  // `

  // const Em = styled[tag]`
  //   white-space: pre-line;
  //   font-family: ${(props) => props.theme.fonts.primary};
  //   font-size: ${(props) => props.theme.text[variant].fontSize};
  //   font-style: italic;
  //   margin-top: ${(props) => props.theme.grid * margin}px;
  //   margin-bottom: ${(props) => props.theme.grid * margin}px;
  //   line-height: ${(props) => props.theme.text.lineHeight}em;
  // `

  // const Del = styled.s`
  //   white-space: pre-line;
  //   font-family: ${(props) => props.theme.fonts.primary};
  //   font-size: ${(props) => props.theme.text[variant].fontSize};
  //   margin-top: ${(props) => props.theme.grid * margin}px;
  //   margin-bottom: ${(props) => props.theme.grid * margin}px;
  //   line-height: ${(props) => props.theme.text.lineHeight}em;
  // `

  if (container === 'strong') {
    return <em>{children}</em>
  }

  if (container === 'del') {
    return <s>{children}</s>
  }

  if (container === 'em') {
    return <em>{children}</em>
  }

  return <Tag className={className}>{children}</Tag>
}
