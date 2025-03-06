import styled from '@emotion/styled'

import { TextProps } from './Text.types'

export default function Text(props: TextProps) {
  const { variant = 'p', children } = props

  const Tag = styled[variant]`
    font-family: ${(props) => props.theme.fonts.primary};
  `

  return <Tag>{children}</Tag>
}
