import styled from '@emotion/styled'
import { ExternalLink } from 'lucide-react'
import { Tooltip } from 'react-tooltip'

import { theme } from '../theme/theme'
import { OpenExternalProps } from './OpenExternal.types'

const IconHeight = 24

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.contrastText};
  :visited: {
    color: ${(props) => props.theme.colors.contrastText};
  }
  height: ${IconHeight}px;
  width: ${IconHeight}px;
`
// TODO: ability to use theme colors for tooltip!

export default function OpenExternal(props: OpenExternalProps) {
  const { source, url, noteId } = props
  const tooltipId = `open-external-${noteId}`
  const tooltipText =
    source === 'bear' ? 'Open in Bear' : 'Open in External Editor'

  return (
    <StyledLink
      href={url}
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltipText}
    >
      <ExternalLink />
      <Tooltip
        id={tooltipId}
        style={{
          backgroundColor: theme.colors.primary,
          color: theme.colors.contrastText,
          fontFamily: theme.fonts.primary,
        }}
      />
    </StyledLink>
  )
}
