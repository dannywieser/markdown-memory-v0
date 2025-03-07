import styled from '@emotion/styled'

import { BoxProps } from './Box.types'

export default function Box({ b = 0, p = 0, children }: BoxProps) {
  const Box = styled.div`
    padding: ${(props) => props.theme.grid * p}px;
    border-width: ${b}px;
    border-color: ${(props) => props.theme.colors.primary};
    border-style: solid;
  `
  return <Box>{children}</Box>
}
