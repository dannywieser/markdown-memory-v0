import styled from '@emotion/styled'

import Text from '../Text/Text'
import { BlockquoteProps } from './Blockquote.types'

const BlockquoteStyled = styled.blockquote`
  white-space: pre-line;
  background-color: ${(props) => props.theme.colors.grey};
  border-left-style: solid;
  border-left-width: ${(props) => props.theme.grid * 2}px;
  border-left-color: ${(props) => props.theme.colors.primary};
  margin: 0;
  padding-left: ${(props) => props.theme.grid * 4}px;
`

export default function Blockquote({ text }: BlockquoteProps) {
  return (
    <BlockquoteStyled>
      <Text>{text}</Text>
    </BlockquoteStyled>
  )
}
