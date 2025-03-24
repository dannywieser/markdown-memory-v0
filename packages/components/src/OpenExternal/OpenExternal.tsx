import { ExternalLink } from 'lucide-react'
import { Tooltip } from 'react-tooltip'

import { theme } from '../theme/theme'
import useStyles from './OpenExternal.styles'
import { OpenExternalProps } from './OpenExternal.types'

export default function OpenExternal(props: OpenExternalProps) {
  const { source, url, noteId } = props
  const { root } = useStyles()
  const tooltipId = `open-external-${noteId}`
  const tooltipText =
    source === 'bear' ? 'Open in Bear' : 'Open in External Editor'

  // TODO: how to use useStyles for the tooltip component?
  return (
    <a
      className={root}
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
    </a>
  )
}
