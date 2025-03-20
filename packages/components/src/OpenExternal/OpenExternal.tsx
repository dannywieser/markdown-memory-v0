import styled from '@emotion/styled'
import { ExternalLink } from 'lucide-react'

import { OpenExternalProps } from './OpenExternal.types'

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.contrastText};
  :visited: {
    color: ${(props) => props.theme.colors.contrastText};
  }
  height: 24px;
  width: 24px;
`

export default function OpenExternal(props: OpenExternalProps) {
  const { source, url } = props

  return (
    <StyledLink href={url}>
      <ExternalLink />
    </StyledLink>
  )
}
