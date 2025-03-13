import styled from '@emotion/styled'

import Text from '../Text/Text'
import { CodeProps } from './Code.types'

const Pre = styled.pre`
  background-color: ${(props) => props.theme.colors.grey};
  padding: ${(props) => props.theme.grid}px;
  margin: 0;
`

export default function Code({ code, language }: CodeProps) {
  return (
    <Pre>
      <Text variant="code">{code}</Text>
    </Pre>
  )
}
